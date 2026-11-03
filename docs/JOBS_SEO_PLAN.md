# Public Jobs section: SEO, AEO and GEO plan

Written 3 Nov 2026. Status: plan only, nothing built.

Goal: a **Jobs** item in the site nav next to Candidates and Companies. Every live job gets a public page. New jobs get a page automatically; closed jobs lose theirs. Apply sends the candidate to app.nexthireconsulting.com, and the original job link is never shown. Target: search and AI answer traffic worldwide (US, India, UK, EU, Gulf, SEA, LatAm), turning into sign-ups.

Every claim below is tagged **[verified]** (checked in code, on the live site or in a primary source, with the link), **[reported]** (secondary source) or **[assumption]**. Numbers we still need are in section 11.

---

## 1. What exists today

| Fact | Evidence |
|---|---|
| The marketing site is a Next.js static export (`output: 'export'`) synced to S3 and served through CloudFront. | `next.config.mjs`, `.github/workflows/deploy.yml` [verified] |
| **Every missing URL returns the homepage with status 200** (a soft 404). `/jobs/`, `/candidates/`, `/about-nexthire/`, `/why-join-nexthire/` and `/talk-to-an-expert/` all return 288,529 bytes, the same as `/`. | `curl` on 3 Nov [verified] |
| `sitemap.xml` lists `/candidates/`, which does not exist. `llms.txt` lists `/jobs/`, `/about-nexthire/`, `/why-join-nexthire/` and `/talk-to-an-expert/`, none of which exist. | `src/app/sitemap.ts`, `public/llms.txt` [verified] |
| The deploy runs `aws s3 sync --delete` on a bucket that also holds candidate résumés (`user/*`, `portal-imports/*`). Anything written to that bucket by another process is deleted on the next deploy unless excluded. | `deploy.yml` comments; earlier résumé wipe incident [verified] |
| `JobsBoardClient.tsx` and `jobsMockData.ts` exist with mock data, but no route uses them. | `grep` [verified] |
| The backend has no public job API; every job endpoint requires a login. | `SecurityConfig.java` permitAll list [verified] |
| Job IDs reveal the source: `li-<linkedin id>`, `ceipal-…`, `breezy-…`. | adapters in `scraper/` [verified] |
| A job leaves the live set when it is gone upstream after 2 missed runs (`GONE`, row purged 90 days later), or when `last_seen_at` is older than 180 days (`AGED_OUT`, row kept). AGED_OUT jobs can come back to life. | `NormalizedJob.java`, `JobRetentionSweeper.java`, `JobReconciler.java` [verified] |
| Every new, changed, revived and deleted job writes a row to `job_index_events`. The Vespa embedder already reads it with its own cursor. Events older than 7 days are pruned. The legacy `JobSyncService` path writes no events, but it is off by default. | `JobIndexOutboxDrainer.java`, `JobEmbeddingScheduler.java`, `JobSyncService.java:154` [verified] |
| Full scans of the 38 GB `jobs` table are not acceptable. An unindexed query on `first_seen_at` / `content_updated_at` was a parallel sequential scan. | `JobEmbeddingScheduler` javadoc [verified] |
| After sign-in, `AuthCallback` takes and clears the saved return URL. Onboarding is mandatory and redirects new users first, so **a new user who clicks Apply probably lands on onboarding and loses the job**. | `sessionReturn.js`, `AuthCallback.jsx`, `ProtectedRoute.jsx:80` [verified code; the end-to-end outcome is an assumption until tested in a browser] |

## 2. What the research says (sources in the research notes at the end)

**Google rules for job pages** [verified, developers.google.com/search/docs/appearance/structured-data/job-posting]
- The description must be readable **without login**. Requiring sign-up to *apply* is not forbidden.
- There must be "a way to apply" on the page. Postings that "require payment from applicants" are not allowed.
- Expired jobs must be removed: 404/410, a past `validThrough`, or remove the markup.
- One posting per page. Duplicates must be canonicalised. Third parties keep the employer's title as received.
- `baseSalary` only from the employer, never an estimate.
- `directApply` does not apply if the user has to sign in, so we omit it.
- Misrepresentation clause: postings "on behalf of an organization… without authorization." Our model of applying on the candidate's behalf to jobs the employer did not list with us is the closest fit. No enforcement case is known.

**Spam policies** [verified]
- Scaled content abuse covers "stitching or combining content from different web pages without adding value."
- Doorway abuse covers city pages that funnel users to one page.
- These are the main risks for scraped descriptions and role × city pages.

**Indexing API** [verified + reported]
- Allowed for JobPosting pages. The default quota is 200 a day.
- In 2026, job sites report quota requests going unanswered for months. **Plan on sitemaps, not the API.**

**Who has won and lost**
- March 2026 core update: Indeed −18 and ZipRecruiter −13 visibility points, while employer career sites gained. "The company that owns the thing" beat the platform. [reported, SISTRIX/Amsive]
- Google for Jobs took 20 to 30% of search traffic from European boards. [reported]
- Durable traffic in India comes from company, salary and interview pages (AmbitionBox: about 52% organic), not job pages. [reported, Semrush estimate]
- Levels.fyi and Indeed Hiring Lab win through original data that the press and AI engines quote. [reported]
- Naukri runs city-split job sitemaps, an `archived-jd-pages` sitemap for expired jobs, `/jobs-in-{city}`, and millions of `{skill}-jobs-in-{city}` pages. [verified via Wayback]
- LinkedIn has `/jobs/{skill}-jobs-{city}` pages with ItemList JSON-LD and country subdomains. The description is readable logged out, and Apply opens a sign-in modal. [verified]

**AI engines** [verified unless marked]
- Google AI Overviews and AI Mode need nothing extra. A page must be indexed and eligible for a snippet.
- ChatGPT search uses OAI-SearchBot and appears to lean on Bing [reported].
- Perplexity runs its own crawler.
- llms.txt gets almost no AI requests [reported, Ahrefs].
- Statistics, quotations and citations raised AI visibility by up to 40% (GEO paper, KDD 2024).
- AI engines favour fresh pages, ChatGPT most of all.

**The opening nobody else has** [verified robots.txt files]
- Naukri blocks GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot and PerplexityBot from all job pages.
- LinkedIn blocks PerplexityBot, GPTBot and ChatGPT-User.
- Glassdoor blocks GPTBot, ClaudeBot and Perplexity.
- So **ChatGPT and Perplexity cannot read Indian job listings from the two biggest Indian sources.** A crawlable, structured, fresh job corpus that allows them can become the source those engines quote for "jobs in Bengaluru" questions. This is the single biggest asymmetric bet in this plan. The effect size is unknown.

**Legal** [verified]
- hiQ v. LinkedIn ended in breach of the LinkedIn User Agreement, a $500k consent judgment and a permanent injunction.
- LinkedIn User Agreement 8.2 bans copying content obtained from the service.
- Publishing LinkedIn-sourced descriptions publicly is the largest single legal exposure in this plan.
- Naukri's terms are not checked [assumption: similar].

## 3. Decisions only you can make (blocking)

**Decided 3 Nov 2026:**
- LinkedIn, Naukri (including the Tsenta relay) and iimjobs get no public page.
- A free user gets the employer link inside the app, and the job is added to Job Tracker.
- **Every** live job may be indexed: no age rule. This overrides 3.4 below.
- Infra changes are prepared as scripts that the owner runs.

**As built:**
- A blank country means no page at all, because no country allowlist can match it.
- No `baseSalary` in the markup: the stored salary is regex-extracted and USD-only, not employer-structured.

1. **LinkedIn- and Naukri-sourced jobs.** Options:
   - (a) No public page.
   - (b) A facts-only page (title, company, location, our own analysis, no copied description) with `noindex`.
   - (c) A full page.

   Recommendation: **(a) until a lawyer signs off**. (c) multiplies the hiQ-style exposure and gains little, since Google ranks LinkedIn's own copy.
2. **Apply must not require payment** (Google policy). A free user clicking Apply on a public page must be able to apply to that job without buying a plan. Decide what the free path is: a free single application, a free Quick Apply, or revealing the employer link inside the app after sign-up.
3. **Jobs the Auto Apply worker cannot submit** (unsupported ATS, captcha, LinkedIn, Naukri). If the button says Apply and nothing is ever submitted, that breaks Google's "way to apply" rule and the candidate's trust. Recommendation: after sign-in, apply automatically when the worker supports that ATS. Otherwise show the employer's apply link **inside the app** (never on the public page) and track it in Job Tracker.
4. **Freshness cut-off for indexing.** A job counts as live for 180 days after it was last seen upstream, so a posting from 2024 can still be live. Recommendation: every live job gets a page, but only jobs with `effective_date` within 90 days are indexable.

## 4. Architecture

### 4.1 Recommended: pre-rendered HTML in a separate bucket, written by the backend

```
scraper → jobs + job_index_events ──► JobPageWriter (mainservice, scheduled)
                                         │ reads events by id with its own cursor
                                         │ looks each job up by primary key only
                                         │ decides indexable / noindex / no page
                                         │ renders HTML, PUT or DELETE to S3
                                         ▼
                              s3://nexthire-jobs-pages  (NEW bucket, nothing else in it)
                                         │
CloudFront (existing www distribution): behaviour  /jobs/*  →  jobs bucket
                                       default    /*       →  site bucket (unchanged)
```

Why this design, and what it rules out:

| Option | Rejected because |
|---|---|
| Next.js SSR or ISR (Vercel or a Node server on EC2) | Googlebot crawling millions of URLs would hit the backend and Postgres on the shared prod box (38 GB jobs table, facet GROUP BYs already hang). It also adds per-request compute cost and moves hosting. |
| Generating job pages in the Next build | Millions of pages per build is impossible, and builds happen on deploys, not when jobs change. |
| Writing pages into the existing site bucket | The deploy's `sync --delete` would wipe them on every deploy, the same failure as the résumé wipe. |
| Client-side rendering (fetch jobs in the browser) | Search engines and most AI crawlers would see an empty page. |

With static HTML behind a CDN, crawl load costs the database nothing, pages are fast worldwide, and a site deploy cannot break them.

**Trade-off we accept:** job pages are plain HTML with a copy of the site header and footer markup and one stable CSS file (`/jobs/assets/site.v1.css`). They do not use Next's hashed chunks, which `sync --delete` removes on every deploy and which would break old pages. The header can drift from the Next header. Keep the template in this repo (`jobs-template/`) so design changes happen in one place, and re-render all pages only when the template version changes.

### 4.2 New table `job_pages` (mainservice Flyway migration; does not touch `jobs`)

| column | why |
|---|---|
| `job_id` PK | links back to `jobs` |
| `public_id` unique, 10 chars | first 10 base32 chars of HMAC-SHA256(secret, job_id). It is opaque, so nobody can derive the LinkedIn ID or source. It stays the same when a job revives. A unique constraint catches collisions. |
| `url_path` | **frozen at first render.** If the title changes later, the URL does not, because S3 behind CloudFront cannot serve redirects for old paths. |
| `state` | `INDEXED`, `NOINDEX`, `NONE` (no page) |
| `reason` | why it is not indexed: `source_linkedin`, `thin_description`, `no_country`, `truncated`, `duplicate_of`, `stale`, `gender_restricted` |
| `canonical_job_id` | duplicate cluster winner |
| `country`, `city_slug`, `role_slug`, `company_slug`, `is_remote_explicit`, `salary_*`, `posted_at` | narrow facet columns, so hub pages GROUP BY this table instead of `jobs` |
| `content_hash`, `rendered_at`, `deleted_at` | skip re-render when nothing changed; history for "time to fill" stats |

This table is also how the app resolves `/apply/<public_id>` to a job.

### 4.3 Writer loop (JobPageWriter)

1. Read `job_index_events` with `id > cursor` in batches of 500, ordered by id. Ordering matters: an update followed by a delete must not bring a job back.
2. For each job: look it up by primary key, run the indexability rules (section 5), render, `PUT` or `DELETE` the S3 object, and upsert `job_pages`.
3. Save the cursor. Add changed URLs to the sitemap shards and the IndexNow queue.
4. **Nightly reconcile** (outside the 18:30 to 21:00 UTC backup window). Compare `job_pages` live rows against `jobs.is_active` by primary key in batches, and find active jobs with no page. This catches:
   - events pruned during writer downtime of more than 7 days;
   - the legacy sync path, which writes no events;
   - S3 failures.
5. Never scan `jobs` by an unindexed column. The weekly "missing pages" check uses the `is_active` index and runs off-peak with `statement_timeout`.

### 4.4 Removing a closed job

- **Fix the sitewide soft 404 first (P0).** Point the CloudFront custom error response for 403 and 404 at `/404.html` with **status 404**, instead of the homepage with 200. A missing S3 key returns 403 to CloudFront (no ListBucket permission), so it is covered.
  - Before switching, check that nothing relies on the homepage fallback. Compare `out/` against the sitemap and test blog slugs published in Sanity between builds; the `repository_dispatch` rebuild should cover those.
- When a job closes, delete its object. The URL then returns 404. Google accepts 404 or 410, and 410 is not worth a Lambda@Edge function.
- Set HTML `Cache-Control: max-age=300`, so a closed job is gone from the CDN within 5 minutes.
- If a job revives, the same URL is re-created.

### 4.5 Instant kill switch

A CloudFront response-headers policy on `/jobs/view/*` that adds `X-Robots-Tag: noindex`. Turning it on de-indexes every job page without re-rendering millions of files. Use it if Search Console shows a manual action or mass "crawled, not indexed".

## 5. Which live jobs get indexed

Every live job is in `job_pages`. Rules run in order; the first match decides.

| Rule | Result |
|---|---|
| Source is LinkedIn or Naukri (or a relay of them) | per decision 3.1; default `NONE` |
| Not the duplicate-cluster winner (same normalised company + title + city; winner = employer ATS > other sources, then longest description) | `NONE`, recorded as `duplicate_of` |
| `effective_date` older than 90 days | `NOINDEX` |
| Description under 400 characters after cleaning, requirements truncated (`…`), or a junk title (fewer than 3 or more than 120 characters, all caps, a code) | `NOINDEX` |
| Country unknown | `NOINDEX` (Google requires `addressCountry`) |
| `gender_restriction` not `any` | `NOINDEX` (avoids discrimination rules in US and EU markets) |
| otherwise | `INDEXED` with JobPosting JSON-LD |

**Multi-location jobs** get one page with a `jobLocation` array, not one page per city. That is the Workday pattern: one description, many cities.

**JSON-LD fields: only employer-provided facts.**
- `title` as received.
- `datePosted` = `posted_at`, or else `first_seen_at`.
- `hiringOrganization` = name, plus a logo only when it is verified (logo.dev returns junk for generic company names).
- `jobLocation` with `addressCountry`.
- `jobLocationType: TELECOMMUTE` only when the ATS said fully remote. Never infer it: "onsite" in our data means "the ATS did not say".
- `baseSalary` only from the employer's posting, in the original currency and period, and never from `salary_min_usd`.
- `employmentType` when present.
- `identifier` = `public_id`.
- No `validThrough`: we do not know the employer's date, and refreshing it would mean re-rendering daily.
- No `directApply`.

## 6. Page types and URLs

All under `/jobs/` on www. One host and one consistent pattern, per Google's international guidance. Country subfolders are used for hub pages only.

| Page | URL | Created when | Content that makes it worth indexing |
|---|---|---|---|
| Jobs home (nav target) | `/jobs/` | always | live counts by country, top roles, top hiring companies, search box (links to the app), latest data report |
| Country hub | `/jobs/in/`, `/jobs/us/`, `/jobs/ae/` … | at least 200 indexable jobs | counts, cities, roles, salary bands from employer-posted ranges (n shown), remote share (explicit only) |
| City hub | `/jobs/in/bengaluru/` | at least 10 indexable jobs | same, for the city |
| Role × city | `/jobs/in/bengaluru/python-developer/` | at least 10 indexable jobs | count, companies, salary range (n), experience spread, top skills (high confidence only), 30-day trend once history exists |
| Remote | `/jobs/remote/`, `/jobs/remote/<role>/` | at least 10 | explicit remote only |
| Company | `/jobs/company/<slug>/` | at least 3 live jobs | open roles by team and location, new roles per week, median days open (from `job_pages` history) |
| Job | `/jobs/view/<title>-at-<company>-<city>-<public_id>/` | every live job | the description, a facts block, a company block, 10 similar jobs, "check your match" and Apply |
| Data report | `/jobs/reports/2026-11/` | monthly | see 8.1 |

Rules that keep hubs from becoming doorway or thin pages:
- **Hysteresis:** create a hub at 10 or more jobs and remove it only after 7 consecutive days below 5. This stops pages flickering in and out of Google.
- **Pagination:** at most 10 pages deep (Indeed's robots.txt allows the same). Deeper inventory is reached through narrower hubs.
- **No URL parameters:** filters and sorting live in the app, and robots.txt disallows `/jobs/*?*`.
- **Not every role × city combination:** a role needs a normalised `role_slug`. `role_category` exists, but its coverage is unknown; see section 11.
- `/jobs/company/` is not under `/companies/`, because `/companies/` is the B2B product page.

Structured data:
- `BreadcrumbList` on every page.
- `ItemList` on hubs (as LinkedIn does).
- `Dataset` on reports.
- Visible Q&A answered from our data ("How many Python developer jobs are open in Bengaluru?"). Google stopped showing FAQ rich results for most sites in 2023, so the value is as answerable text for AI engines, not as markup.

## 7. The job page and the Apply journey

**Cleaning scraped HTML (security and source hiding)**
- Run every description through an allowlist sanitiser (jsoup `Safelist.basic()`). Scraped HTML on our own domain is a stored-XSS risk.
- Remove all links, email addresses and phone numbers. That removes apply bypasses, recruiter personal data and source branding ("Apply on LinkedIn", "via Naukri").
- Never render `listing_url`, `apply_url`, `external_id`, `source` or `job_id`, or images hotlinked from the source's CDN (for example `media.licdn.com`).

**Apply button** → `https://app.nexthireconsulting.com/apply/<public_id>?utm_source=jobs&utm_medium=organic`

**App work this needs** (nexthire `frontend` plus one public endpoint):
1. A public route `/apply/:publicId` outside `ProtectedRoute`. It shows the job card and a "Sign up to apply" button. If the job has closed, it says so and shows similar jobs.
2. Keep the apply intent across sign-up **and** onboarding. Store `pendingApply` server-side on the user at first sign-in (or in localStorage as a fallback). Redirect to it when onboarding completes. Today the return URL is consumed before onboarding.
3. After onboarding: if the Auto Apply worker supports the ATS, queue the application. Otherwise show the employer link in the app and add the job to Job Tracker (decision 3.3).
4. A free path with no paywall in front of this one application (decision 3.2).
5. A public endpoint `GET /api/public/jobs/{publicId}` returning a minimal card: title, company, city, state. Rate-limit it per IP, and add it to the `permitAll` list.

**Test in a real browser** (scripted, mocked-API harness kept outside the repo, per CLAUDE.md):
- logged-out sign-up through onboarding to the queued application;
- an existing user;
- a job that closed mid-flow;
- an unsupported ATS.

## 8. Winning AI answers (AEO/GEO) and searches that last

### 8.1 Monthly NextHire Hiring Index (the main AEO asset)
- Per country: new postings, top roles, top hiring companies, remote share, salary bands from employer-posted ranges, and changes from last month.
- An HTML page with a CSV download and `Dataset` JSON-LD.
- A methodology page. It must not claim "public employer career sites" if LinkedIn data is in the numbers; describe the sources honestly.
- Quotable sentences with numbers. The GEO paper's best levers were statistics, citations and quotes.
- Distribution: Indian and global business press, LinkedIn and Reddit posts. Levels.fyi and Hiring Lab took years to pay off; treat this as compounding, not a launch spike.

### 8.2 Crawlers and Bing
- Keep allowing OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Bingbot and Googlebot on `/jobs/`. This is the opening Naukri, LinkedIn and Glassdoor leave.
- Keep blocking CCBot. Allowing or blocking the training crawlers (GPTBot, ClaudeBot, Google-Extended) is a brand choice. Google-Extended has no effect on Search ranking [verified].
- Submit sitemaps in **Bing Webmaster Tools** as well as Search Console. ChatGPT search reportedly leans on Bing, and Copilot is Bing.
- The writer pings IndexNow (Bing, Yandex, Naver, Seznam) with new and deleted URLs, in batches of up to 10,000.
- Apply for the Indexing API, but plan as if it is never approved.

### 8.3 llms.txt
- Fix the dead links now.
- Add `/jobs/` and the reports once they exist.
- Low effort and low evidence of impact, so don't spend more time on it.

### 8.4 Later, and highest upside: be the jobs source inside AI assistants
- An MCP server or ChatGPT app ("NextHire Jobs: search live jobs, apply with NextHire") built on the same `job_pages` data.
- It puts the product inside the assistant instead of hoping for a citation.
- Distribution and policy for these app platforms in 2026 are unverified. Research them before building.

## 9. International

- One host. Country subfolders for hubs (`/jobs/in/`, `/jobs/us/`, …). A country gets a hub only when it has inventory (thresholds in section 6).
- English first. Add Spanish, Portuguese and Arabic hubs only for countries where the probe shows real inventory. Hindi later, since English dominates job search in India [assumption].
- **No hreflang on job pages.** A posting has no other language version, and hreflang pointing at expiring URLs is the most common failure: 67% of hreflang sites have errors, 16.9% point at broken pages [reported, Ahrefs]. Use sitemap-based hreflang only on translated hubs.
- Salaries in local currency and local period (₹ lakh per year, AED per month, $ per year), exactly as the employer posted them.
- Region-aware pricing already exists in the app. Check that sign-up and the free apply path work for non-India users and phone numbers before targeting the US (memory: a phone +1 default bug was fixed in September; retest).

## 10. Sitemaps, robots, nav

- The writer outputs `/jobs/sitemaps/index.xml` (a sitemap index) with shards of at most 45,000 URLs, by hash of `public_id`, plus `hubs.xml`.
  - Only `INDEXED` URLs go in.
  - `lastmod` = real content change time, never "now".
  - Only changed shards are rewritten, hourly.
- **A sitemap index cannot contain another index**, so do not nest it in the Next `sitemap.xml`.
- **Do not list it in `robots.txt` either.** A public sitemap hands scrapers the full URL list. Submit it directly in Search Console and Bing Webmaster Tools, and let only verified crawlers fetch it (section 14).
- Remove `/candidates/` from `src/app/sitemap.ts`, or create the page.
- Nav: add `{ key: 'jobs', label: 'Jobs', href: '/jobs/' }` to `NAV_ITEMS` in `Header.tsx`. It must render as a **plain `<a>`**, not `next/link`: `/jobs/` is not a Next route, and client-side navigation would request a Next data file (`/jobs/index.txt`) that does not exist.
- **Never create `src/app/jobs/`.** It would collide with the CloudFront `/jobs/*` behaviour. `JobsBoardClient` and the mock data stay unused, or get deleted in a separate change.
- Associate the existing `legacy-redirects` CloudFront function (which rewrites to index.html) with the `/jobs/*` behaviour as well.

## 11. Prod numbers (probe run 3 Nov 2026)

**Method.**
- A 2% block sample of `jobs` (`TABLESAMPLE SYSTEM (2)`, 119,016 live rows), scaled ×50, so every figure is an **estimate**.
- "Live" means `is_active` and `effective_date` within 180 days.
- "Basic quality" means:
  - description stored size of at least 400 bytes;
  - country known;
  - title of 3 to 120 characters.
- Truncated requirements were **not** checked: reading the text timed out (see the note below).

**Lesson for the writer.** A first, full-table version of this probe read every description and hit its 15-minute timeout on prod. Nothing was written, but it was 15 minutes of heavy disk reads. Any job that touches description text across the table must work in primary-key batches, never one big scan.

**Size**

| | Estimate |
|---|---|
| Live jobs | **~5.95M** |
| Employer ATS sources (top 40, excluding LinkedIn, Naukri, iimjobs) passing basic quality | **~4.5M** (before the 90-day freshness rule and duplicate clustering, neither of which was measured) |
| LinkedIn | 357k live (349k pass quality) |
| Naukri | 478k live, **only 112k pass quality** |
| iimjobs (also a job board, terms not checked) | 24k |
| Gender restricted | ~3.5k (negligible) |
| Exact duplicates (same company + title + city) | 2.5% of the sample. This only catches identical strings, so it understates real duplicates. |

**Largest sources:**
- workday 1.17M
- oraclecloud 691k
- naukri 478k
- linkedin 357k
- icims 298k
- jibe 282k
- successfactors 241k
- smartrecruiters 219k
- adp 210k
- greenhouse 200k

brassring and successfactors fail quality at high rates (32% and 54% pass).

**By country:**
- US 3.28M (55%)
- IN 1.10M
- blank 302k (5%)
- CA 187k
- GB 166k
- DE 107k
- FR 96k
- AU 58k
- MX 42k
- NL 38k
- ES 31k
- SG 29k
- MY 28k
- CN 28k
- PH 27k

**What this changes in the plan:**
1. **Role hubs need a new build step.** `role_category` is set on 87 of 119,016 sampled jobs, so it is effectively empty. Role × city hubs need a title → role normalisation first. Check whether the skill dictionary (V294) or Vespa can supply it. Until then, Phase 2 starts with country, city and company hubs only.
2. **The US is the bigger inventory (3.3M vs 1.1M).** India stays the pilot because the AI-crawler opening (Naukri and LinkedIn block those crawlers) is Indian, and it is the home market. The US comes next in Phase 3, not as a far-off later country.
3. **Excluding LinkedIn and Naukri costs only ~460k quality pages** out of ~5M. Decision 3.1 (recommend excluding them) is cheap to take.
4. **~4.5M candidate pages is far more than a new jobs section will get indexed.** The ramp and stop rule in Phase 1 matter more than page count. Sitemaps should list the freshest and best jobs first.
5. `idx_jobs_effective_date`, `idx_jobs_last_seen_at` and `idx_jobs_source_active` already exist. The weekly reconcile can use them, and no new index on `jobs` is needed.

**Not measured yet:**
- daily new and closed counts (the 25 Aug figure in `scraper/.../application.properties` was ~143k inserts a day);
- the share of jobs older than 90 days;
- the real duplicate rate after normalisation;
- truncated requirements.

Measure these from `job_pages` once the writer runs, rather than with more scans of `jobs`.

Cost shape [assumption, calculated from list prices]:
- First render of ~6M pages: about $30 in S3 PUTs.
- Storage at 30 KB per page: about 180 GB, roughly $4 a month.
- S3 PUTs: $0.005 per 1,000, so 150k new jobs a day costs about $0.75 a day.
- CloudFront egress is the real cost: 1M crawled pages a day at 30 KB is about 0.9 TB a month. The first TB is free, then about $0.085 to $0.11 per GB. Keep pages JS-free and small.

## 12. What can break, and the guard for each

| # | Failure | Guard |
|---|---|---|
| 1 | Soft 404: closed jobs look alive, Google flags "expired jobs". **Live today.** | P0 fix (4.4), then curl a deleted key and expect 404 |
| 2 | Site deploy `sync --delete` wipes job pages | separate bucket (4.1) |
| 3 | Outbox events pruned during more than 7 days of writer downtime; legacy sync writes no events | nightly reconcile (4.3); alert on cursor lag over 1 h |
| 4 | Writer query scans the 38 GB table and stalls prod | primary-key lookups only; `statement_timeout`; EXPLAIN in review |
| 5 | Migration locks `jobs` (Flyway deadlock history) | the new table only; no ALTER on `jobs` |
| 6 | Stored XSS from scraped HTML | allowlist sanitiser and tests with hostile fixtures |
| 7 | Source leaks: `li-` IDs, "via LinkedIn" text, licdn images, listing URL in JSON-LD | `public_id`, scrubber, render tests that grep the output for `linkedin`, `naukri`, `licdn`, `li-` |
| 8 | Apply behind a paywall breaks Google policy | decision 3.2 |
| 9 | Apply on a job we can never submit | decision 3.3 |
| 10 | New users lose the job across onboarding | `pendingApply` (section 7), browser test |
| 11 | Job closes mid-flow | closed state on `/apply/` with similar jobs |
| 12 | Wrong facts in markup (remote, salary, country, logo) mean misrepresentation | employer-provided fields only (section 5) |
| 13 | Duplicate content across sources, and multi-city copies | cluster winner; one page per job with a location array |
| 14 | Site-wide demotion for scaled content (thin or AI pages) | indexable tiers, ramp-up, kill switch (4.5), no AI-written filler |
| 15 | Hubs flicker in and out | hysteresis |
| 16 | Crawl traps (parameters, deep pagination) | robots disallow `?`, depth 10 |
| 17 | Title edit changes the URL and loses its history | URL frozen at first render |
| 18 | `public_id` collision | unique constraint, add a character on conflict |
| 19 | Header drift between the Next site and job pages | template in this repo, versioned CSS |
| 20 | Next `Link` to `/jobs/` fails | plain `<a>` |
| 21 | Employers ask for removal | "Report or remove this job" link, plus a company blocklist the writer honours |
| 22 | CloudFront egress cost grows with crawling | small JS-free pages, monitor the bill weekly |
| 23 | Google for Jobs and aggregator demotion cap what job pages can earn | hubs, company pages and the data report are the durable assets; job pages are the inventory beneath them |
| 24 | LinkedIn legal action | decision 3.1 |

## 13. Phases, each with a pass check

**Phase 0: prerequisites (no new pages)**
1. Fix the soft 404 → check: `curl -sI /does-not-exist/` returns 404; the blog, interview-questions and organization routes still return 200.
2. Fix the sitemap and llms.txt dead links → check: every `<loc>` returns 200 and is not homepage-sized.
3. Run the prod probe → check: section 11 numbers are filled in.
4. Make decisions 3.1 to 3.4 → check: written down here.
5. Search Console and Bing Webmaster Tools: add a property per folder for `/jobs/` → check: verified.

**Phase 1: job pages for one country (India), all live jobs**
1. `job_pages` migration, writer, sanitiser, renderer, new bucket, CloudFront behaviour, IAM grant for the instance role → check: unit tests for the rules and sanitiser; render snapshot tests; leak-grep test; 100 sample pages pass Google's Rich Results Test.
2. App `/apply/:publicId`, public card endpoint, `pendingApply` → check: the four browser-harness flows in section 7.
3. Sitemaps, IndexNow pings, nav item → check: GSC accepts the sitemap; Bing receives the URLs.
3b. WAF (section 14) → check: Googlebot and Bingbot fetches pass (GSC URL Inspection, Bing URL Inspection); a script from a cloud VM gets challenged after the limit; the sitemap returns 403 to a non-verified client.
4. Watch for 4 to 6 weeks: indexed / submitted, "Crawled, currently not indexed" share, soft 404 = 0, manual actions = 0, Apply clicks to sign-up to submitted application (PostHog funnel).
   - **Stop rule:** if over 60% of submitted job URLs are "crawled, not indexed" after 6 weeks, do not expand; tighten section 5 first.

**Phase 2: hubs and company pages, India**, then the first Hiring Index report.
- Check: hub thresholds respected, no hub under 10 jobs is live, the report page validates as a Dataset.

**Phase 3: other countries by inventory** (US, UK, UAE, Singapore …), local currency, then translated hubs where inventory exists.

**Phase 4: AI assistant distribution** (8.4) after research.

**Metrics to watch:**
- organic and AI-referrer sessions on `/jobs/` (referrers chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com);
- Apply click rate;
- sign-up rate from `/apply/`;
- submitted applications;
- paid conversions.

Traffic without conversion is the ZipRecruiter lesson: traffic +22%, revenue −27%.

**Honest expectation:**
- Nobody can promise "lakhs of customers". Job pages alone are a shrinking channel: Google for Jobs and the March 2026 update hit aggregators.
- The compounding assets are company, salary and role hubs, the data report, and being readable by AI engines that Naukri and LinkedIn block.
- Expect months for indexing and a year or more for the brand effects.

## 14. Stopping bulk copying and automation

**The limit, stated plainly.**
- Google, Bing and AI search crawlers must be able to read these pages, or the whole plan fails.
- Serving them different content than people see is cloaking, which Google penalises.
- So anything a person can read in a browser, a patient scraper using a real browser and residential IPs can also read. "Impossible" cannot be achieved.
- What we can achieve is that **bulk copying is slow, expensive and detectable**, and that **the valuable parts are never on the page**: the original apply URL, the source, and the source job ID.

**Layer 1: give nothing that makes enumeration easy**
- Opaque `public_id` (HMAC), so there are no sequential or source IDs to iterate.
- No public JSON API. The app's card endpoint returns one job by ID, rate-limited.
- Hub pagination capped at 10 pages, and no query-parameter URLs.
- Job sitemaps are not in robots.txt and are readable only by verified crawlers (layer 2).
- The original apply link, `listing_url`, `source` and `external_id` are never rendered. Only signed-in users see the employer link, inside the app (decision 3.3).

**Layer 2: AWS WAF on the CloudFront distribution (`/jobs/*` and `/apply/*`)**
- **Verified crawler allowlist.** Googlebot and Bingbot are verified by reverse DNS, or by AWS WAF Bot Control's "verified bot" label. OpenAI (OAI-SearchBot, ChatGPT-User) and Perplexity publish IP ranges; allow those ranges, not the user-agent string, which anyone can fake.
- **Rate limits per IP**, for example 60 job pages per 5 minutes. People read a few jobs; scrapers read thousands. Over the limit, a silent JS challenge, then a CAPTCHA, then a block.
- **Data-centre and hosting ASNs** (AWS, GCP, Azure, OVH, Hetzner, DigitalOcean): challenge every request unless it comes from a verified crawler. Most cheap scraping runs from these networks.
- **AWS Managed Rules:** IP reputation and anonymous IP lists (VPNs, Tor, hosting).
- **Bot Control, targeted level:** detects headless browsers and automation fingerprints, including AI browser agents. Pricing and accuracy against current agents are **not verified**; pilot it on `/jobs/*` and measure false positives first.
- **Sitemap path:** verified crawlers only, with everyone else getting 403.

**Layer 3: detection and response**
- Log WAF and CloudFront requests. Alert on any non-verified IP or ASN reading more than N job pages a day, or reading sitemap-ordered sequences.
- Detect copies of our computed text (hub statistics, our facts block) appearing elsewhere through scheduled searches.
- Terms of use on the site that ban automated collection, so there is a contract basis for takedowns (the same basis LinkedIn used against hiQ).

**What we will NOT do, and why**
- **Obfuscate HTML** (text in images, CSS tricks, encrypted text). It breaks accessibility and AI parsing, and Google may treat it as cloaking.
- **Plant fake "canary" jobs.** Fake postings violate Google's misrepresentation policy and mislead candidates.
- **Remove JobPosting JSON-LD** to make extraction harder. Google for Jobs needs it, so keep it on indexable pages only.
- **Block AI search crawlers.** Being readable by them is our edge over Naukri and LinkedIn (section 2).

**The same exposure inside the app.** Signed-in users can page through the app's job search. Add per-user rate limits on the search endpoints as well, or the public pages are protected while the app is not. Current app limits are not checked.

---

### Research notes (primary sources)
- Google JobPosting: https://developers.google.com/search/docs/appearance/structured-data/job-posting
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Indexing API quota: https://developers.google.com/search/apis/indexing-api/v3/quota-pricing ; approval delays: https://www.searchenginejournal.com/google-indexing-api-approval-job-sites/590316/
- AI features: https://developers.google.com/search/docs/appearance/ai-features ; crawlers: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- Crawl budget: https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget
- Multi-regional: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- March 2026 update: https://beta.searchenginejournal.com/googles-march-core-update-shifted-visibility-away-from-aggregators/573621/
- Naukri robots and sitemaps (Wayback): https://web.archive.org/web/20260503094316/https://www.naukri.com/robots.txt , https://web.archive.org/web/20260504184121/https://www.naukri.com/sitemap/sitemap.xml
- LinkedIn robots: https://www.linkedin.com/robots.txt ; User Agreement: https://www.linkedin.com/legal/user-agreement
- hiQ outcome: https://www.zwillgen.com/alternative-data/hiq-v-linkedin-wrapped-up-web-scraping-lessons-learned/
- GEO paper: https://arxiv.org/abs/2311.09735
- Ahrefs AI/organic overlap: https://ahrefs.com/blog/ai-search-overlap/ ; freshness: https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/ ; hreflang: https://ahrefs.com/blog/hreflang-study
- Semrush AI citations: https://www.semrush.com/blog/most-cited-domains-ai/
- AmbitionBox: https://vi.semrush.com/website/ambitionbox.com/overview
- ZipRecruiter case study: https://developers.google.com/search/case-studies/ziprecruiter-case-study
