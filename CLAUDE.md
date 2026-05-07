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

#### Two-font system — this is the rule, not a preference

Only two fonts exist in this codebase:

| Font | Use |
|---|---|
| **Droid Serif** | All `h1`, `h2`, `h3` + **any text rendered at 50px or above**, regardless of element type |
| **Inter** | Everything else — body copy, `p`, `span`, labels, buttons, captions, `h4`–`h6` |

**The 50px rule:** Any visible text at 50px or larger must use Droid Serif — even if it is a `<div>`, `<p>`, or `<span>`. There is one exception: large numeric stats (e.g. "1M+", "64%", "312") may stay Inter since they are data display, not prose.

**How it is enforced in `globals.css`** (around the "Font foundation" comment):
1. A global `* { font-family: Inter !important }` rule sets the baseline for all elements.
2. A second rule `h1, h1 span, h2, h2 span, h3, h3 span { font-family: Droid Serif !important }` overrides headings globally — no per-section overrides needed.
3. A small exceptions list forces Inter back on the few headings that intentionally stay Inter (success-story hero, contact hero, legal hero, companies-cta h2, candidates-how h3).
4. Non-heading elements at ≥50px get a targeted ID-scoped rule — see `#home-mission p` as the reference pattern.

**What this means when making changes:**
- Adding a new `h1`/`h2`/`h3` anywhere automatically gets Droid Serif — no extra CSS needed.
- Adding body text, labels, or UI copy automatically gets Inter — no extra CSS needed.
- If a heading must be Inter, add it to the exceptions list in `globals.css` under "Exceptions: headings that must stay Inter".
- If a non-heading element is set to ≥50px, add a targeted CSS rule in `globals.css` to give it Droid Serif — inline `fontFamily` alone will lose to the `!important` global rule.
- **Never fight the global rule with inline `fontFamily` alone** — the `!important` in `globals.css` will win. Always add a CSS override when switching fonts on an element that the global rule covers.

- **Weights:** 400 normal · 500 medium · 600 semi-bold · 700 bold · 800 extra-bold

### Spacing & Shape

- Card border-radius: `10px` (inputs, cards) — `12px` (larger panels)
- Borders: `2px solid #c8dfd6` (sage) for form fields and cards
- Section padding: `80px 0` desktop, `48px 0` mobile (vertical only — horizontal padding lives on the inner container)

### Standard Content Container — the layout rule

Every section's outermost content wrapper **must** use the `.nh-container` CSS class (defined near the top of `globals.css`):

```css
.nh-container {
  max-width: 1320px;
  margin: 0 auto;
  padding-left: clamp(20px, 2.5vw, 30px);
  padding-right: clamp(20px, 2.5vw, 30px);
}
```

This makes every section's content left-edge align with the nav logo and right-edge align with the "Try for free" button. The nav bar itself uses `max-width: 1320px; padding: 30px` — `.nh-container` matches this exactly.

**How to apply it:**

```tsx
// Section shell — background spans full viewport
<section style={{ background: '#f7faf9', padding: '80px 0' }}>
  {/* Content container — width-capped and edge-aligned */}
  <div className="nh-container">
    {/* cards, grids, text… */}
  </div>
</section>
```

**Exceptions (do not use `.nh-container` for these):**
- Narrow hero text blocks (e.g., `max-width: 700px` centered headline + description) — these can be a narrower inner div *inside* an `.nh-container` wrapper
- Legal prose columns — use `LegalPageShell` which has its own width
- Full-bleed backgrounds — the `<section>` itself is always full-width; only the inner wrapper uses `.nh-container`

**What this means when adding a new section:**
- Put `padding: 'Xpx 0'` (vertical only) on the `<section>` element
- Wrap all content in `<div className="nh-container">`
- Never put `maxWidth` or horizontal padding on the `<section>` itself

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
9. **`.nh-container` is the standard inner wrapper** — every section's content div must use it so all content edges align with the nav (see "Standard Content Container" above). Never set `maxWidth` or horizontal padding on a `<section>` element directly.

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
