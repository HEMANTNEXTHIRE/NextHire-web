#!/bin/bash
# Anti-scraping rules for /jobs/* on the existing web ACL of distribution E1DAWM7LX3U7AX.
#
#   ./03-waf-jobs-rules.sh            validate only (check-capacity), prints the rules
#   ./03-waf-jobs-rules.sh --apply    add them to the web ACL (saves the old rules first)
#
# What the rules do, in order (all scoped to URIs starting with /jobs/):
#   1. AWS Bot Control (Common) in COUNT mode: only adds labels, blocks nothing itself.
#      Its "verified bot" label covers Googlebot, Bingbot and other verified crawlers.
#   2. AWS Anonymous IP list in COUNT mode: labels hosting providers, VPNs, Tor.
#   3. Sitemaps (/jobs/sitemaps/) are BLOCKED unless the request is a verified crawler.
#   4. Job pages: more than 300 requests in 5 minutes from one IP is BLOCKED,
#      more than 100 gets a CAPTCHA, unless verified crawler.
#   5. Hosting provider / anonymous IPs get a CAPTCHA on job pages, unless verified crawler.
# "Verified crawler" = Bot Control verified label OR an IP in the AI search crawler IP
# set (OpenAI GPTBot + OAI-SearchBot + ChatGPT-User, PerplexityBot + Perplexity-User,
# Anthropic ClaudeBot + Claude-SearchBot + Claude-User), built from their published lists.
# robots.txt lets these crawlers in; without their IPs here they would get a CAPTCHA.
#
# Cost: Bot Control and CAPTCHA are paid add-ons. Check current AWS WAF pricing before
# applying; the scope-down keeps Bot Control to /jobs/ requests only.
# The AI crawler IP lists change: re-run this script monthly to refresh the IP set.
set -euo pipefail
AWS="aws --profile ${AWS_PROFILE_NAME:-prod} --region us-east-1 --cli-binary-format raw-in-base64-out"
ACL_NAME=CreatedByCloudFront-9eacc9ff
ACL_ID=ce8a62fc-abe2-410f-8e0d-9d0ab229e400
IPSET=nexthire-ai-search-crawlers
DIR=$(cd "$(dirname "$0")" && pwd)
TS=$(date -u +%Y%m%dT%H%M%SZ)
APPLY=${1:-}

echo "1/4 AI search crawler IP ranges from the operators' published lists"
python3 - > "$DIR/ai-crawler-cidrs-$TS.txt" <<'PY'
import json, urllib.request
urls = ["https://openai.com/gptbot.json", "https://openai.com/searchbot.json",
        "https://openai.com/chatgpt-user.json", "https://www.perplexity.ai/perplexitybot.json",
        "https://www.perplexity.ai/perplexity-user.json", "https://claude.com/crawling/bots.json"]
cidrs = set()
for u in urls:
    data = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "nexthire-waf-setup"}), timeout=20))
    for p in data.get("prefixes", []):
        c = p.get("ipv4Prefix")
        if c: cidrs.add(c)
print("\n".join(sorted(cidrs)))
PY
n=$(wc -l < "$DIR/ai-crawler-cidrs-$TS.txt" | tr -d ' ')
echo "    $n IPv4 ranges"
[ "$n" -gt 0 ] || { echo "ABORT: no crawler ranges fetched"; exit 1; }

echo "2/4 IP set $IPSET"
if [ "$APPLY" = "--apply" ]; then
  existing=$($AWS wafv2 list-ip-sets --scope CLOUDFRONT --query "IPSets[?Name=='$IPSET'].[Id,LockToken]" --output text)
  addrs=$(paste -sd' ' "$DIR/ai-crawler-cidrs-$TS.txt")
  if [ -z "$existing" ]; then
    $AWS wafv2 create-ip-set --scope CLOUDFRONT --name $IPSET --ip-address-version IPV4 --addresses $addrs >/dev/null
  else
    set -- $existing
    $AWS wafv2 update-ip-set --scope CLOUDFRONT --name $IPSET --id "$1" --lock-token "$2" --addresses $addrs >/dev/null
  fi
  IPSET_ARN=$($AWS wafv2 list-ip-sets --scope CLOUDFRONT --query "IPSets[?Name=='$IPSET'].ARN" --output text)
else
  # Validation only: any well-formed ARN is fine for check-capacity? No, it must exist,
  # so validate without the IP set term when the set has not been created yet.
  IPSET_ARN=$($AWS wafv2 list-ip-sets --scope CLOUDFRONT --query "IPSets[?Name=='$IPSET'].ARN" --output text)
fi

echo "3/4 build rules"
$AWS wafv2 get-web-acl --scope CLOUDFRONT --name $ACL_NAME --id $ACL_ID > "$DIR/waf-before-$TS.json"
python3 - "$DIR/waf-before-$TS.json" "$DIR/waf-rules-$TS.json" "$IPSET_ARN" <<'PY'
import json, sys
before, out, ipset_arn = sys.argv[1], sys.argv[2], sys.argv[3]
acl = json.load(open(before))["WebACL"]
ours = {"jobs-bot-control-labels", "jobs-anonymous-ip-labels", "jobs-sitemaps-verified-only",
        "jobs-rate-block", "jobs-rate-captcha", "jobs-hosting-captcha"}
rules = [r for r in acl["Rules"] if r["Name"] not in ours]
base = max([r["Priority"] for r in rules] + [-1]) + 1

def starts(path):
    return {"ByteMatchStatement": {"SearchString": path, "FieldToMatch": {"UriPath": {}},
            "TextTransformations": [{"Priority": 0, "Type": "NONE"}], "PositionalConstraint": "STARTS_WITH"}}
def label(key):
    return {"LabelMatchStatement": {"Scope": "LABEL", "Key": key}}
verified_terms = [label("awswaf:managed:aws:bot-control:bot:verified")]
if ipset_arn:
    verified_terms.append({"IPSetReferenceStatement": {"ARN": ipset_arn}})
verified = verified_terms[0] if len(verified_terms) == 1 else {"OrStatement": {"Statements": verified_terms}}
not_verified = {"NotStatement": {"Statement": verified}}
def vis(name):
    return {"SampledRequestsEnabled": True, "CloudWatchMetricsEnabled": True, "MetricName": name}

new = [
  {"Name": "jobs-bot-control-labels", "Priority": base, "OverrideAction": {"Count": {}},
   "Statement": {"ManagedRuleGroupStatement": {"VendorName": "AWS", "Name": "AWSManagedRulesBotControlRuleSet",
     "ManagedRuleGroupConfigs": [{"AWSManagedRulesBotControlRuleSet": {"InspectionLevel": "COMMON"}}],
     "ScopeDownStatement": starts("/jobs/")}},
   "VisibilityConfig": vis("jobs-bot-control-labels")},
  {"Name": "jobs-anonymous-ip-labels", "Priority": base + 1, "OverrideAction": {"Count": {}},
   "Statement": {"ManagedRuleGroupStatement": {"VendorName": "AWS", "Name": "AWSManagedRulesAnonymousIpList",
     "ScopeDownStatement": starts("/jobs/")}},
   "VisibilityConfig": vis("jobs-anonymous-ip-labels")},
  {"Name": "jobs-sitemaps-verified-only", "Priority": base + 2, "Action": {"Block": {}},
   "Statement": {"AndStatement": {"Statements": [starts("/jobs/sitemaps/"), not_verified]}},
   "VisibilityConfig": vis("jobs-sitemaps-verified-only")},
  {"Name": "jobs-rate-block", "Priority": base + 3, "Action": {"Block": {}},
   "Statement": {"RateBasedStatement": {"Limit": 300, "EvaluationWindowSec": 300, "AggregateKeyType": "IP",
     "ScopeDownStatement": {"AndStatement": {"Statements": [starts("/jobs/"), not_verified]}}}},
   "VisibilityConfig": vis("jobs-rate-block")},
  {"Name": "jobs-rate-captcha", "Priority": base + 4, "Action": {"Captcha": {}},
   "Statement": {"RateBasedStatement": {"Limit": 100, "EvaluationWindowSec": 300, "AggregateKeyType": "IP",
     "ScopeDownStatement": {"AndStatement": {"Statements": [starts("/jobs/"), not_verified]}}}},
   "VisibilityConfig": vis("jobs-rate-captcha")},
  {"Name": "jobs-hosting-captcha", "Priority": base + 5, "Action": {"Captcha": {}},
   "Statement": {"AndStatement": {"Statements": [starts("/jobs/"), not_verified,
     {"OrStatement": {"Statements": [label("awswaf:managed:aws:anonymous-ip-list:HostingProviderIPList"),
                                     label("awswaf:managed:aws:anonymous-ip-list:AnonymousIPList")]}}]}},
   "VisibilityConfig": vis("jobs-hosting-captcha")},
]
json.dump({"rules": rules + new, "acl": acl}, open(out, "w"), indent=2)
print("    rules after:", [(r["Priority"], r["Name"]) for r in rules + new])
PY
python3 -c "import json;json.dump(json.load(open('$DIR/waf-rules-$TS.json'))['rules'],open('$DIR/waf-rules-only-$TS.json','w'))"
$AWS wafv2 check-capacity --scope CLOUDFRONT --rules "file://$DIR/waf-rules-only-$TS.json" --query Capacity --output text \
  | sed 's/^/    WCU capacity: /'

if [ "$APPLY" != "--apply" ]; then
  echo "4/4 validated only. Re-run with --apply to change the web ACL."
  exit 0
fi
echo "4/4 applying"
python3 - "$DIR/waf-rules-$TS.json" "$DIR/waf-update-$TS.json" <<'PY'
import json, sys
d = json.load(open(sys.argv[1])); acl = d["acl"]
u = {"Name": acl["Name"], "Scope": "CLOUDFRONT", "Id": acl["Id"], "DefaultAction": acl["DefaultAction"],
     "Rules": d["rules"], "VisibilityConfig": acl["VisibilityConfig"]}
for k in ("Description", "CustomResponseBodies", "CaptchaConfig", "ChallengeConfig", "TokenDomains", "AssociationConfig"):
    if acl.get(k): u[k] = acl[k]
json.dump(u, open(sys.argv[2], "w"), indent=2)
PY
LOCK=$(python3 -c "import json;print(json.load(open('$DIR/waf-before-$TS.json'))['LockToken'])")
$AWS wafv2 update-web-acl --cli-input-json "file://$DIR/waf-update-$TS.json" --lock-token "$LOCK" >/dev/null
echo "    applied. Previous web ACL saved: $DIR/waf-before-$TS.json"
echo "Check: GSC URL Inspection (live test) on a job page, Bing URL Inspection, and from a cloud VM:"
echo "  for i in \$(seq 1 120); do curl -s -o /dev/null -w '%{http_code}\n' https://www.nexthireconsulting.com/jobs/; done | sort | uniq -c"
