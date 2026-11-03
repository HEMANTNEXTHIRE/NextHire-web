#!/bin/bash
# Make missing URLs on www.nexthireconsulting.com return a real 404 page with status 404.
#
# Today distribution E1DAWM7LX3U7AX maps 403 and 404 to /index.html with status 200,
# so every unknown URL (including /jobs/ and closed job pages) looks like the homepage
# to Google: a soft 404. This switches both to /404.html (built by Next from
# src/app/not-found.tsx) with status 404.
#
# Safe to re-run. Saves the previous config next to this script for rollback:
#   aws cloudfront update-distribution --id E1DAWM7LX3U7AX --if-match <ETag> \
#     --distribution-config file://<saved>.json
set -euo pipefail
AWS="aws --profile ${AWS_PROFILE_NAME:-prod}"
ID=E1DAWM7LX3U7AX
SITE=https://www.nexthireconsulting.com
DIR=$(cd "$(dirname "$0")" && pwd)
TS=$(date -u +%Y%m%dT%H%M%SZ)

echo "1/4 404.html must exist in the bucket and not be the homepage"
# Checked in S3, not over HTTP: the viewer-request function 301s /404.html to /404/.
home=$(curl -s "$SITE/" | wc -c | tr -d ' ')
nfsize=$($AWS --region us-east-1 s3api head-object --bucket nexthire-prod-resumes --key 404.html \
  --query ContentLength --output text)
echo "    404.html size=$nfsize (homepage size=$home)"
[ -n "$nfsize" ] && [ "$nfsize" != "$home" ] || { echo "ABORT: 404.html missing or same as homepage"; exit 1; }

echo "2/4 every URL in sitemap.xml must already be a real page (so nothing relies on the fallback)"
bad=0
for u in $(curl -s "$SITE/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's#</loc>##'); do
  s=$(curl -s -o /dev/null -w "%{http_code} %{size_download}" "$u")
  code=${s%% *}; size=${s##* }
  if [ "$code" != "200" ] || { [ "$size" = "$home" ] && [ "$u" != "$SITE/" ]; }; then
    echo "    FALLBACK-ONLY: $u ($s)"; bad=$((bad+1))
  fi
done
[ "$bad" = "0" ] || { echo "ABORT: $bad sitemap URL(s) only work through the homepage fallback; fix or remove them first"; exit 1; }

echo "3/4 updating error responses"
$AWS cloudfront get-distribution-config --id $ID > "$DIR/cf-before-$TS.json"
ETAG=$(python3 -c "import json;print(json.load(open('$DIR/cf-before-$TS.json'))['ETag'])")
python3 - "$DIR/cf-before-$TS.json" "$DIR/cf-new-$TS.json" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))['DistributionConfig']
d['CustomErrorResponses'] = {'Quantity': 2, 'Items': [
    {'ErrorCode': 403, 'ResponsePagePath': '/404.html', 'ResponseCode': '404', 'ErrorCachingMinTTL': 10},
    {'ErrorCode': 404, 'ResponsePagePath': '/404.html', 'ResponseCode': '404', 'ErrorCachingMinTTL': 10},
]}
json.dump(d, open(sys.argv[2], 'w'), indent=2)
PY
$AWS cloudfront update-distribution --id $ID --if-match "$ETAG" \
  --distribution-config "file://$DIR/cf-new-$TS.json" --query 'Distribution.Status' --output text
echo "    saved previous config: $DIR/cf-before-$TS.json"

echo "4/4 waiting for deployment, then checking"
$AWS cloudfront wait distribution-deployed --id $ID
for p in /this-page-does-not-exist-xyz/ /jobs/ /; do
  printf "    %s -> " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "$SITE$p"
done
echo "Expect 404, 404 (until job pages launch), 200."
