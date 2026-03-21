# NextHire Marketing Website

Next.js 14 + TypeScript + Redux Toolkit — static site exported for AWS S3 + CloudFront.

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 App Router | SSG, metadata API, file-system routing |
| Language | TypeScript | Type safety, IDE support |
| State | Redux Toolkit | Global nav/search/form/notification state |
| Styling | Existing Webflow CSS (verbatim) | 100% visual fidelity, no redesign |
| Sliders | swiper/react | Drop-in Swiper wrapper for React |
| Animations | gsap + ScrollTrigger | Scroll-pinned focus sections |
| Counters | react-countup + react-intersection-observer | Viewport-triggered count-up |
| Forms | Fetch → Google Apps Script | Existing endpoints preserved |
| Calendars | Cal.com embed | Float button + inline trigger |
| Deployment | AWS S3 + CloudFront | Static export, global CDN |

---

## Project Structure

```
src/
  app/                   # Next.js App Router pages
    layout.tsx           # Root layout: Header, Footer, GTM, CSS, Redux
    page.tsx             # Home page (/)
    about-nexthire/      # /about-nexthire
    talent-assist/       # /talent-assist
    pricing/             # /pricing
    companies/           # /companies (For Companies; /why-nexthire redirects here)
    why-join-nexthire/   # /why-join-nexthire
    success-story/       # /success-story
    contact-us/          # /contact-us
    talk-to-an-expert/   # /talk-to-an-expert
    blog/
      page.tsx           # Blog listing
      [slug]/page.tsx    # Individual blog post
    privacy-policy/      # Legal pages
    terms-of-service/
    cancellation-policy/
    refund-policy/
    data-processing-agreement/
    marketing-disclosure/
    not-found.tsx        # 404 page
  components/
    layout/              # Header, Footer, SearchPopup
    ui/                  # ButtonArrow, ButtonPrimary, DualActionCTA, Notification, CalBookingButton, CounterBlock
    sections/            # HeroSection, FocusScrollSection, HowItWorksSection, AccordionTabs, PricingCards, TestimonialSlider
    forms/               # HeroForm, ContactForm, ExpertForm
    ReduxProvider.tsx
  store/
    index.ts             # Redux store
    hooks.ts             # useAppDispatch, useAppSelector
    slices/              # navSlice, searchSlice, formSlice, notificationSlice
  lib/
    blogData.ts          # All 5 blog posts as TypeScript objects
    legalData.ts         # All 6 legal pages as TypeScript objects
    forms.ts             # Google Apps Script endpoints + submitToGoogleScript helper
  styles/
    globals.css          # Imports e25-algotale.min.css + style.css
    style.css            # Original Webflow CSS (copied verbatim)
    e25-algotale.min.css # Webflow base CSS (copied verbatim)
public/
  Image/                 # All images copied from original site
  Js/main.min.js        # Original Webflow JS (not used, kept for reference)
  CSS/fancybox.css
```

---

## Development

```bash
npm install
npm run dev       # → http://localhost:3000
```

## Production Build (static export)

```bash
npm run build
# Output in: out/
```

---

## AWS Deployment

### S3 Setup

1. **Create S3 bucket** named `nexthireconsulting.com` (or your domain)
2. **Enable static website hosting** in the bucket properties
3. **Disable "Block public access"** on the bucket
4. Add the following **bucket policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nexthireconsulting.com/*"
    }
  ]
}
```

5. **Upload the `out/` folder** to the bucket:

```bash
aws s3 sync out/ s3://nexthireconsulting.com --delete --cache-control "max-age=31536000,immutable" \
  --exclude "*.html" --exclude "*.json"

aws s3 sync out/ s3://nexthireconsulting.com --delete --cache-control "no-cache" \
  --include "*.html" --include "*.json"
```

### CloudFront Setup

1. **Create a CloudFront distribution**
   - Origin: your S3 bucket (use the static website endpoint, not the S3 REST endpoint)
   - Default root object: `index.html`

2. **Custom error pages** (for SPA/static routing):
   - Error code: 404 → Response page: `/404.html` → HTTP code: 404

3. **Cache settings**:
   - Cache HTML files: TTL 0 (no cache) — they change on every deploy
   - Cache assets (JS, CSS, images): TTL 31536000 (1 year) — they're content-addressed

4. **HTTPS**: Use AWS Certificate Manager to provision a certificate for your domain

5. **DNS**: Point your domain's A/AAAA/CNAME records to the CloudFront distribution URL

### CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: |
          aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} --delete \
            --cache-control "max-age=31536000,immutable" \
            --exclude "*.html" --exclude "*.json"
          aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} \
            --cache-control "no-cache" \
            --include "*.html" --include "*.json"
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## Linking to the Platform App (`/nexthire/frontend`)

The platform app (React + Vite + Tailwind) is a **completely separate deployment** — it lives at `app.nexthireconsulting.com`.

All CTAs on the marketing website that say "Apply Now" point to `/contact-us` (marketing form).
CTAs that say "Try Now" or "Browse Platform" point to `https://app.nexthireconsulting.com` (the platform).

No shared code is needed between the two apps. They communicate via standard hyperlinks.

### Compatibility Summary

| Concern | Marketing Site (this) | Platform App |
|---|---|---|
| Framework | Next.js 14 App Router | React 18 + Vite |
| State | Redux Toolkit | React Context API |
| Styling | Webflow CSS | Tailwind CSS v3 |
| Auth | None (public) | WorkOS / httpOnly cookies |
| Routing | Next.js file-system | React Router DOM v7 |
| Deployment | S3 + CloudFront (static) | Separate deployment |

Both are React 18 — if shared components become necessary in the future, a shared package (npm workspace or separate repo) would be the clean approach.
