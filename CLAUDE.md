# NextHire Web — Claude Code Guide

## Project Overview

NextHire is a Next.js 14 marketing and product site for NextHire Consulting, a career-services platform. It uses the App Router with static export (`output: 'export'`), TypeScript, and custom Webflow-derived CSS — **no Tailwind**.

---

## Design Thesis

### Color Palette (use these tokens, not arbitrary hex values)

| Role | Hex | Usage |
|---|---|---|
| Background / mint | `#edf5f1` | Hero sections, summary cards |
| Accent green | `#2e7d4f` | Borders, badges, accents |
| Dark green | `#166534` | High-emphasis badges |
| Teal / sage | `#5fa89e` | Interactive accents |
| Light sage border | `#c8dfd6` | Card and input borders |
| Mint | `#e4f0eb` | Subtle section fills |
| Dark text | `#1a3338` | Primary headings |
| Near-black | `#111827` | Body text |
| Mid grey | `#4b5563` | Secondary text |
| Muted grey | `#9ca3af` | Captions, labels |
| Bright green CTA | `#22c55e` | Primary action buttons |
| White | `#ffffff` | Card surfaces |

### Typography

Defined in `/src/constants/typography.ts`. Always use these scales — do not hardcode arbitrary font sizes.

| Name | Size | Use |
|---|---|---|
| `xs` | 11px | Badges, labels |
| `sm` | 13px | Secondary / meta text |
| `base` | 15px | Body copy |
| `md` | 18px | Lead paragraphs |
| `lg` | 24px | Card titles |
| `xl` | 40px | Page heroes |
| `xlClamp` | clamp | Responsive hero titles |

- **Primary font:** "Noto Sans" (system-ui fallback)
- **Serif accent:** "Playfair Display" — for hero titles and section headers only
- **Weights:** 400 normal · 500 medium · 600 semi-bold · 700 bold · 800 extra-bold

### Spacing & Shape

- Card border-radius: `10px` (inputs, cards) — `12px` (larger panels)
- Borders: `2px solid #c8dfd6` (sage) for form fields and cards
- Section padding: `80px 0` desktop, `48px 0` mobile
- Max content width: `1200px` (centered)

---

## Architecture

### Routing

All pages live under `/src/app/`. Static export means no server-side rendering — every page must be statically renderable.

| Type | Pattern | Example |
|---|---|---|
| Marketing | `/src/app/<name>/page.tsx` | `/candidates/page.tsx` |
| Legal/policy | `/src/app/<name>/page.tsx` + entry in `legalData.ts` | `/privacy-policy/page.tsx` |
| Blog | `/src/app/blog/[slug]/page.tsx` | Dynamic with `generateStaticParams` |
| Org | `/src/app/organization/[slug]/page.tsx` | Dynamic with `generateStaticParams` |

### Legal Pages

All policy/legal pages share `LegalPageShell` (`/src/components/layout/LegalPageShell.tsx`). Content is managed in **`/src/lib/legalData.ts`** — add a new entry there, then create the page file. Do not write HTML prose directly in page components.

Current legal pages: `privacy-policy`, `terms-of-service`, `cancellation-policy`, `refund-policy`, `data-processing-agreement`, `marketing-disclosure`, `extension-privacy-policy`.

### Key Directories

```
src/
  app/                  — Next.js App Router pages
  components/
    layout/             — Header, Footer, LegalPageShell
    ui/                 — DualActionCTA, Notification, CalBookingButton
    sections/           — HeroSection, ProductShowcase, PricingPageClient, etc.
    forms/              — ContactForm, ExpertForm
  constants/
    typography.ts       — Font scale tokens
    footerLinks.ts      — Footer nav data
  lib/
    legalData.ts        — Legal page CMS (single source of truth)
    blogData.ts         — Blog post metadata and content
    forms.ts            — Google Apps Script submission helper
  store/                — Redux slices (nav, form, notification)
  styles/
    globals.css         — Global CSS, animations, legal prose styles
    style.css           — Button animations, layout tweaks
```

### State Management

Redux Toolkit is used for three slices only:
- `navSlice` — mobile menu open/close, active dropdown, scroll state
- `formSlice` — form submission loading/success/error
- `notificationSlice` — toast notifications queue

Do not add Redux for local component state — use `useState`/`useReducer`.

### CSS Approach

- **No Tailwind.** Styles are in `/src/styles/globals.css` and `/src/styles/style.css`.
- Webflow base CSS is in `/public/styles/e25-algotale.min.css` — loaded via `<link>` tag, never edit.
- Use BEM-style class names prefixed with `nh-` for new components.
- Animations: GSAP for complex sequences; CSS `@keyframes` for simple loops (marquee, float).
- Icon sprites at `/Image/sprite_file-v17.svg` (accessed via `background-position`).

---

## Development Rules

1. **No Tailwind** — add styles to `globals.css` or `style.css` using the `nh-` prefix.
2. **Legal content lives in `legalData.ts`** — never hardcode policy HTML in page files.
3. **Static export** — every dynamic route needs `generateStaticParams`. No `getServerSideProps`.
4. **Color tokens** — use the palette table above. Never introduce arbitrary hex values.
5. **Typography tokens** — use `typography.ts` constants, not raw `px` values in components.
6. **No new Redux slices** unless the state genuinely needs to be shared across distant components.
7. **Forms submit to Google Apps Script** — see `/src/lib/forms.ts` for the helper pattern.
8. **DualActionCTA** is the standard page-bottom CTA — reuse it, don't create one-off CTAs.

---

## External Integrations

| Service | Purpose | Config |
|---|---|---|
| Google Tag Manager | Analytics | Injected in `layout.tsx` via Next.js Script |
| Google Apps Script | Form submissions | URL in `/src/lib/forms.ts` |
| Cal.com (or similar) | Expert booking | `CalBookingButton` component |
| Swiper | Carousels/sliders | Imported in page-level client components |
| GSAP | Complex animations | Used in hero and product showcase sections |

---

## Contact & Copyright

NextHire Consulting — support@nexthireconsulting.com  
Web app: https://app.nexthireconsulting.com  
© 2026 NextHire Consulting. All rights reserved.
