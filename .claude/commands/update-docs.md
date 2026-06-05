Update Confluence documentation for the NextHire Website.

Run the documentation update script:

```bash
python3 scripts/update-confluence-docs.py
```

This requires `CONFLUENCE_API_TOKEN` environment variable to be set.
If the script is not available or you need a richer update, manually analyze the codebase and push to Confluence using the REST API at `https://nexthire.atlassian.net/wiki/rest/api`.

Space key: `N`
Parent page: "Engineering Documentation"
App page: "NextHire Website"

Pages to update:
- NextHire Website (overview)
- Architecture Overview — Website
- Frontend — Next.js Application — Website
- Deployment Guide — Website
- Developer Setup Guide — Website
