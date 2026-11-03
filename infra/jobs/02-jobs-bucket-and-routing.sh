#!/bin/bash
# Job pages bucket + CloudFront routing for /jobs and /jobs/*.
#
#  - Creates s3://nexthire-jobs-pages (us-east-1, private, SSE-S3). Nothing else
#    ever goes in it, so the site deploy's `sync --delete` can never touch job pages.
#  - Lets only distribution E1DAWM7LX3U7AX read it (same OAC as the site origin).
#  - Lets the prod box role (nexthire-ssm) write and delete under jobs/.
#  - Adds the bucket as a second origin and routes /jobs and /jobs/* to it, copying
#    the default behaviour (cache policy, HTTPS redirect, nexthire-legacy-redirects
#    function that rewrites /x/ to /x/index.html).
#
# Run 01-fix-soft-404.sh first, or a missing job page shows the homepage with 200.
# Saves the previous distribution config for rollback.
set -euo pipefail
AWS="aws --profile ${AWS_PROFILE_NAME:-prod}"
ACCOUNT=011774422657
DIST=E1DAWM7LX3U7AX
BUCKET=nexthire-jobs-pages
ROLE=nexthire-ssm
DIR=$(cd "$(dirname "$0")" && pwd)
TS=$(date -u +%Y%m%dT%H%M%SZ)

echo "1/5 bucket"
if $AWS --region us-east-1 s3api head-bucket --bucket $BUCKET 2>/dev/null; then
  echo "    exists"
else
  $AWS --region us-east-1 s3api create-bucket --bucket $BUCKET
fi
$AWS --region us-east-1 s3api put-public-access-block --bucket $BUCKET --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
$AWS --region us-east-1 s3api put-bucket-encryption --bucket $BUCKET --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

echo "2/5 bucket policy: CloudFront read only"
$AWS --region us-east-1 s3api put-bucket-policy --bucket $BUCKET --policy "$(cat <<JSON
{"Version":"2012-10-17","Statement":[{
  "Sid":"AllowSiteDistributionRead","Effect":"Allow",
  "Principal":{"Service":"cloudfront.amazonaws.com"},
  "Action":"s3:GetObject","Resource":"arn:aws:s3:::$BUCKET/jobs/*",
  "Condition":{"ArnLike":{"AWS:SourceArn":"arn:aws:cloudfront::$ACCOUNT:distribution/$DIST"}}}]}
JSON
)"

echo "3/5 writer permission on role $ROLE"
$AWS iam put-role-policy --role-name $ROLE --policy-name nexthire-jobs-pages-writer --policy-document "$(cat <<JSON
{"Version":"2012-10-17","Statement":[
 {"Effect":"Allow","Action":["s3:PutObject","s3:DeleteObject","s3:GetObject"],"Resource":"arn:aws:s3:::$BUCKET/jobs/*"},
 {"Effect":"Allow","Action":"s3:ListBucket","Resource":"arn:aws:s3:::$BUCKET","Condition":{"StringLike":{"s3:prefix":"jobs/*"}}}]}
JSON
)"

echo "4/5 CloudFront origin + behaviours"
$AWS cloudfront get-distribution-config --id $DIST > "$DIR/cf-before-$TS.json"
ETAG=$(python3 -c "import json;print(json.load(open('$DIR/cf-before-$TS.json'))['ETag'])")
python3 - "$DIR/cf-before-$TS.json" "$DIR/cf-new-$TS.json" "$BUCKET" <<'PY'
import copy, json, sys
src, dst, bucket = sys.argv[1:4]
c = json.load(open(src))['DistributionConfig']
origin_id = f'{bucket}-jobs'
site = c['Origins']['Items'][0]
if not any(o['Id'] == origin_id for o in c['Origins']['Items']):
    o = copy.deepcopy(site)
    o['Id'] = origin_id
    o['DomainName'] = f'{bucket}.s3.us-east-1.amazonaws.com'
    o['OriginPath'] = ''
    c['Origins']['Items'].append(o)
    c['Origins']['Quantity'] = len(c['Origins']['Items'])
items = c['CacheBehaviors'].get('Items', []) or []
have = {b['PathPattern'] for b in items}
for pattern in ['/jobs', '/jobs/*']:
    if pattern in have:
        continue
    b = copy.deepcopy(c['DefaultCacheBehavior'])
    b['PathPattern'] = pattern
    b['TargetOriginId'] = origin_id
    items.append(b)
c['CacheBehaviors'] = {'Quantity': len(items), 'Items': items}
json.dump(c, open(dst, 'w'), indent=2)
print('    behaviours:', [(b['PathPattern'], b['TargetOriginId']) for b in items])
PY
$AWS cloudfront update-distribution --id $DIST --if-match "$ETAG" \
  --distribution-config "file://$DIR/cf-new-$TS.json" --query 'Distribution.Status' --output text
echo "    saved previous config: $DIR/cf-before-$TS.json"

echo "5/5 waiting for deployment"
$AWS cloudfront wait distribution-deployed --id $DIST
echo "Check: put a test page, fetch it, delete it, expect 200 then 404."
echo "<!doctype html><title>probe</title>" > /tmp/nh-jobs-probe.html
$AWS --region us-east-1 s3 cp /tmp/nh-jobs-probe.html s3://$BUCKET/jobs/probe-$TS/index.html \
  --content-type "text/html; charset=utf-8" --cache-control "public,max-age=0" >/dev/null
curl -s -o /dev/null -w "    /jobs/probe-$TS/ -> %{http_code}\n" "https://www.nexthireconsulting.com/jobs/probe-$TS/"
$AWS --region us-east-1 s3 rm s3://$BUCKET/jobs/probe-$TS/index.html >/dev/null
curl -s -o /dev/null -w "    /jobs/never-existed-$TS/ -> %{http_code}\n" "https://www.nexthireconsulting.com/jobs/never-existed-$TS/"
