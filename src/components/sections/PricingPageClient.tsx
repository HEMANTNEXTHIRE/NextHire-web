'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FONT, WEIGHT } from '@/constants/typography'
import AccordionFaq from '@/components/ui/AccordionFaq'
import PricingPlanTabs from '@/components/sections/PricingPlanTabs'
import WithWithoutSection from '@/components/sections/WithWithoutSection'


/* ── Palette ──────────────────────────────────────────────────── */
const P = {
  bg:      '#edf5f1',
  white:   '#ffffff',
  surface: '#f7faf9',
  mint:    '#e4f0eb',
  sage:    '#c8dfd6',
  border:  '#ddeae4',
  accent:  '#5fa89e',
  accentD: '#3d7a72',
  dark:    '#1a3338',
  mid:     '#3d5a56',
  muted:   '#8aada8',
  green:   '#22c55e',
}

/* ── Types ──────────────────────────────────────────────────────── */
type PricingTab = 'candidates' | 'companies'
type BillingCycle = 'monthly' | 'quarterly'

/* ── Plan data — dual INR / USD pricing (from app repo) ────────── */
const CANDIDATE_PLANS_BASE = [
  {
    id: 'free', name: 'Free', badge: null, popular: false,
    color: P.muted, cta: 'Get started free', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Join the talent network',
    tagline: 'Get visible to top recruiters for free',
    icon: '🔓',
    inr:  { monthly: 0, quarterly: 0, quarterlyTotal: 0 },
    usd:  { monthly: 0, quarterly: 0, quarterlyTotal: 0 },
    features: [
      { label: 'Resume and cover letter builders', included: true },
      { label: 'Job Tracker and profile optimization', included: true },
      { label: 'Try AI tools and automate your job search', included: true },
    ],
  },
  {
    id: 'lite', name: 'Lite', badge: null, popular: true,
    color: P.accent, cta: 'Start Lite', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Speed up your job search',
    tagline: 'Let AI apply to jobs for you',
    icon: '⚡',
    inr:  { monthly: 1850, quarterly: 1665, quarterlyTotal: 4995 },
    usd:  { monthly: 19.99, quarterly: 17.99, quarterlyTotal: 53.97 },
    features: [
      { label: 'Unlimited AI Auto Apply for career page jobs', included: true },
      { label: 'Optimize your portals for better visibility', included: true },
      { label: '2 hours of AI Interview Coach', included: true },
    ],
  },
  {
    id: 'pro', name: 'Pro', badge: null, popular: false,
    color: P.accentD, cta: 'Start Pro', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Master every job interview',
    tagline: 'AI helps you clear your interviews',
    icon: '🚀',
    inr:  { monthly: 4500, quarterly: 4050, quarterlyTotal: 12150 },
    usd:  { monthly: 49.99, quarterly: 44.99, quarterlyTotal: 134.97 },
    features: [
      { label: 'Real-time AI Interview Coach', included: true },
      { label: 'Unlimited AI Auto Apply to all platforms', included: true },
      { label: 'Direct recruiter Inmails to get noticed', included: true },
    ],
  },
  {
    id: 'max', name: 'Max', badge: null, popular: false,
    color: P.accentD, cta: 'Start Max', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Put everything on autopilot',
    tagline: 'AI finds and messages companies for you',
    icon: '🔥',
    inr:  { monthly: 12000, quarterly: 10800, quarterlyTotal: 32400 },
    usd:  { monthly: 349.99, quarterly: 314.99, quarterlyTotal: 944.97 },
    features: [
      { label: 'Autonomous AI Outreach Agent', included: true },
      { label: 'Exclusive access to hidden job markets', included: true },
      { label: 'Unlimited AI Auto Apply and Interview Coach', included: true },
    ],
  },
]

const COMPANY_PLANS = [
  {
    id: 'starter', name: 'Starter', badge: 'Free forever', color: P.accent,
    priceLine: '$0', priceSub: 'No credit card needed',
    cta: 'Start for free', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Explore the platform before you commit.',
    icon: '🌱',
    features: [
      { label: '1 AI Sourcing credit', included: true },
      { label: '5 Outreach email credits', included: true },
      { label: 'Basic candidate profiles', included: true },
      { label: 'CSV export', included: true },
      { label: 'Phone screening agent', included: false },
      { label: 'SMS engagement agent', included: false },
      { label: 'Video interviewer', included: false },
      { label: 'ATS integrations', included: false },
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise', badge: 'Full platform', color: P.accentD,
    priceLine: 'Custom', priceSub: 'Tailored to your hiring volume',
    cta: 'Talk to sales', ctaHref: '/contact-us',
    description: 'Every agent, every integration, at any scale.',
    icon: '🏢',
    features: [
      'AI Talent Sourcing (800M+ profiles)',
      'AI Phone Screening Agent',
      'SMS Engagement Agent',
      'AI Video Interviewer',
      'AI Outreach Sequences',
      'ATS / CRM integrations (50+)',
      'Candidate enrichment & scoring',
      'Multi-step email + LinkedIn sequences',
      'Transcript + body language scoring',
      'Dedicated account manager',
      'Custom AI interviewer per role',
      'CASA Level 3 certified privacy',
      'SLA-backed uptime guarantee',
      'Team collaboration workspace',
    ].map(label => ({ label, included: true })),
  },
]

/* ── Helpers ───────────────────────────────────────────────────── */
type PlanBase = typeof CANDIDATE_PLANS_BASE[number]

function priceFmt(plan: PlanBase, cycle: BillingCycle, isIndia: boolean) {
  const tier = isIndia ? plan.inr : plan.usd
  const sym  = isIndia ? '₹' : '$'
  if (tier.monthly === 0) return { display: `${sym}0`, sub: 'Free forever', note: ' ' }
  if (cycle === 'quarterly') {
    const q = isIndia ? tier.quarterly.toLocaleString('en-IN') : tier.quarterly.toFixed(2)
    const t = isIndia ? tier.quarterlyTotal.toLocaleString('en-IN') : tier.quarterlyTotal.toFixed(2)
    return { display: `${sym}${q}`, sub: '/mo · billed quarterly', note: `${sym}${t} billed quarterly` }
  }
  const m = isIndia ? tier.monthly.toLocaleString('en-IN') : tier.monthly.toFixed(2)
  return { display: `${sym}${m}`, sub: '/mo · billed monthly', note: ' ' }
}

/* Flatten base plans for PricingPlanTabs (it only needs non-price fields) */
const CANDIDATE_PLANS = CANDIDATE_PLANS_BASE.map(p => ({ ...p, monthly: p.usd.monthly }))

/* ── Hero palette ──────────────────────────────────────────────── */
const HOME = {
  bg: '#ffffff',
  dark: '#132128',
  accent: '#338632',
  subtext: '#6b7280',
  muted: '#9ca3af',
  hairline: '#e5e7eb',
}

/* ── Panel constants — used by ROI / table sections below ─────── */


const STYLES = `
.nh-plans-grid-4 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 640px) {
  .nh-plans-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (min-width: 1024px) {
  .nh-plans-grid-4 { grid-template-columns: repeat(4, 1fr); gap: 20px; }
}
.nh-plans-grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 640px) {
  .nh-plans-grid-2 { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
.nh-plans-section-label {
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: -0.04em;
  line-height: 1.3;
  margin: 0 0 20px;
  text-align: center;
}
@media (min-width: 1280px) {
  .nh-plans-section-label { text-align: left; font-size: 24px; margin-bottom: 40px; }
}
.nh-plan-cta:hover { opacity: 0.88; }
.faq-item { transition: background 0.15s ease; }
.faq-item:hover { background: #f9fafb; }
@keyframes pSlideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
`

/* ── Per-tier card themes ─────────────────────────────────────── */
const CARD_THEMES: Record<string, {
  bg: string; border: string; badgeBg: string; badgeColor: string;
  nameColor: string; descColor: string; priceColor: string; priceMuted: string;
  ctaBg: string; ctaColor: string; ctaBorder: string;
  divider: string; labelColor: string; featureColor: string; checkColor: string;
}> = {
  free: {
    bg: '#f9faf9',
    border: '1px solid rgba(19,33,40,0.12)',
    badgeBg: 'rgba(19,33,40,0.07)',
    badgeColor: '#6b7280',
    nameColor: '#132128',
    descColor: '#6b7280',
    priceColor: '#132128',
    priceMuted: '#9ca3af',
    ctaBg: 'transparent',
    ctaColor: '#132128',
    ctaBorder: '1.5px solid rgba(19,33,40,0.28)',
    divider: 'rgba(19,33,40,0.10)',
    labelColor: '#9ca3af',
    featureColor: 'rgba(19,33,40,0.62)',
    checkColor: '#5fa89e',
  },
  lite: {
    bg: '#e8f5ee',
    border: '1.5px solid rgba(46,125,79,0.45)',
    badgeBg: 'rgba(46,125,79,0.14)',
    badgeColor: '#2e7d4f',
    nameColor: '#132128',
    descColor: '#4b5563',
    priceColor: '#132128',
    priceMuted: '#6b7280',
    ctaBg: '#338632',
    ctaColor: '#ffffff',
    ctaBorder: 'none',
    divider: 'rgba(19,33,40,0.12)',
    labelColor: '#6b7280',
    featureColor: 'rgba(19,33,40,0.68)',
    checkColor: '#338632',
  },
  pro: {
    bg: '#eef7f3',
    border: '1px solid rgba(46,125,79,0.28)',
    badgeBg: 'rgba(61,122,114,0.12)',
    badgeColor: '#3d7a72',
    nameColor: '#132128',
    descColor: '#4b5563',
    priceColor: '#132128',
    priceMuted: '#6b7280',
    ctaBg: '#132128',
    ctaColor: '#ffffff',
    ctaBorder: 'none',
    divider: 'rgba(19,33,40,0.10)',
    labelColor: '#6b7280',
    featureColor: 'rgba(19,33,40,0.68)',
    checkColor: '#2e7d4f',
  },
  max: {
    bg: '#132128',
    border: '1px solid rgba(95,168,158,0.20)',
    badgeBg: 'rgba(255,255,255,0.10)',
    badgeColor: '#5fa89e',
    nameColor: 'rgba(255,255,255,0.55)',
    descColor: 'rgba(255,255,255,0.40)',
    priceColor: '#ffffff',
    priceMuted: 'rgba(255,255,255,0.40)',
    ctaBg: 'rgba(255,255,255,0.90)',
    ctaColor: '#132128',
    ctaBorder: 'none',
    divider: 'rgba(255,255,255,0.10)',
    labelColor: 'rgba(255,255,255,0.38)',
    featureColor: 'rgba(255,255,255,0.72)',
    checkColor: '#5fa89e',
  },
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function PricingPageClient() {
  const [tab, setTab] = useState<PricingTab>('candidates')
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const [isIndia, setIsIndia] = useState(false)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then((d: { country_code?: string }) => { if (d.country_code === 'IN') setIsIndia(true) })
      .catch(() => {/* default USD */})
  }, [])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style suppressHydrationWarning>{STYLES}</style>

      {/* ════════════════════════════════════════════════════════
          PRICING HERO + PLANS & BILLING
      ════════════════════════════════════════════════════════ */}
      <section id="pricing-hero" style={{ background: HOME.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px clamp(20px, 5vw, 40px) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>


          {/* H1 */}
          <div style={{ width: '100%', margin: '0 0 24px' }}>
            <h1 style={{ fontFamily: "'Droid Serif', Georgia, serif", margin: 0, letterSpacing: '-1.9px', lineHeight: 1.1, fontSynthesis: 'none' }}>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 500, color: HOME.dark }}>Pick your plan</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 500, color: HOME.dark }}>Start in minutes</span>
            </h1>
          </div>

          {/* Description */}
          <p style={{ color: HOME.subtext, fontSize: 17, lineHeight: 1.7, margin: 0, maxWidth: 520, fontWeight: WEIGHT.normal, letterSpacing: '-0.2px' }}>
            Whether you&apos;re a professional landing your next role or a company building your next team, there&apos;s a plan built for you.
          </p>

          {/* Plans & billing label + toggles */}
          <div style={{ marginTop: 56, paddingTop: 8, width: '100%' }}>
            <p style={{ fontSize: 11, color: HOME.muted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 28, fontWeight: WEIGHT.semi, textAlign: 'center' }}>Plans &amp; billing</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

          {/* Tab toggle: For Candidates / For Companies */}
          <div style={{
            display: 'inline-flex',
            borderRadius: 9999,
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            padding: 5,
          }}>
            {(['candidates', 'companies'] as PricingTab[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                style={{
                  position: 'relative',
                  borderRadius: 9999,
                  padding: '11px 28px',
                  fontSize: 16,
                  fontWeight: WEIGHT.semi,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  letterSpacing: '-0.3px',
                }}
              >
                {tab === t && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 9999,
                    background: '#000000',
                  }} />
                )}
                <span style={{ position: 'relative', color: tab === t ? '#ffffff' : '#6b7280' }}>
                  {t === 'candidates' ? 'For Candidates' : 'For Companies'}
                </span>
              </button>
            ))}
          </div>

          {/* Billing toggle: Monthly / Quarterly — candidates only */}
          {tab === 'candidates' && (
            <div style={{
              display: 'inline-flex',
              borderRadius: 9999,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              padding: 5,
            }}>
              {(['monthly', 'quarterly'] as BillingCycle[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  style={{
                    position: 'relative',
                    borderRadius: 9999,
                    padding: '11px 28px',
                    fontSize: 16,
                    fontWeight: WEIGHT.semi,
                    border: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    letterSpacing: '-0.3px',
                  }}
                >
                  {cycle === c && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: '#000000',
                    }} />
                  )}
                  <span style={{ position: 'relative', color: cycle === c ? '#ffffff' : '#6b7280' }}>
                    {c === 'monthly' ? 'Monthly' : 'Quarterly'}
                  </span>
                </button>
              ))}
            </div>
          )}

            </div>{/* end flex column */}
          </div>{/* end Plans & billing wrapper */}
        </div>{/* end maxWidth 900 hero wrapper */}

        {/* ── Plan grids ── */}
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 2.5vw, 30px) 80px' }}>

          {/* Candidate plans */}
          {tab === 'candidates' && (
            <div>
              <h3 className="nh-plans-section-label"></h3>
              <div className="nh-plans-grid-4">
                {CANDIDATE_PLANS_BASE.map(plan => {
                  const p = priceFmt(plan, cycle, isIndia)
                  const t = CARD_THEMES[plan.id] ?? CARD_THEMES.free
                  return (
                    <div
                      key={plan.id}
                      style={{
                        background: t.bg,
                        borderRadius: 20,
                        border: t.border,
                        padding: '28px 24px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Badge */}
                      {plan.badge && (
                        <div style={{ marginBottom: 10 }}>
                          <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.7px',
                            textTransform: 'uppercase',
                            background: t.badgeBg, color: t.badgeColor,
                            borderRadius: 9999, padding: '4px 11px',
                            display: 'inline-block',
                          }}>
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      {/* Plan name + description */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{
                          fontSize: 18, fontWeight: 600, color: t.nameColor,
                          letterSpacing: '-0.4px', lineHeight: 1, marginBottom: 6,
                        }}>
                          {plan.name}
                        </div>
                        <div style={{ fontSize: 13, color: t.descColor, lineHeight: 1.4, letterSpacing: '-0.1px' }}>
                          {plan.description}
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ marginBottom: 4 }}>
                        <span style={{
                          fontSize: 36, fontWeight: 700, color: t.priceColor,
                          letterSpacing: '-0.04em', lineHeight: 1,
                        }}>
                          {p.display}
                        </span>
                        {plan.usd.monthly > 0 && (
                          <span style={{ fontSize: 15, color: t.priceMuted, marginLeft: 4 }}>
                            /month
                          </span>
                        )}
                      </div>

                      {/* Billing note — invisible placeholder preserves height */}
                      <div style={{
                        fontSize: 12, color: t.priceMuted, lineHeight: 1.4,
                        marginBottom: 20,
                        visibility: p.note.trim() === '' ? 'hidden' : 'visible',
                      }}>
                        {p.note.trim() === '' ? ' ' : p.note}
                      </div>

                      {/* CTA */}
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nh-plan-cta"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          padding: '13px 0',
                          borderRadius: 40,
                          border: t.ctaBorder,
                          background: t.ctaBg,
                          color: t.ctaColor,
                          fontSize: 15,
                          fontWeight: 600,
                          textDecoration: 'none',
                          letterSpacing: '-0.3px',
                          marginBottom: 22,
                          boxSizing: 'border-box',
                          transition: 'opacity 0.15s ease',
                        }}
                      >
                        {plan.cta}
                      </a>

                      {/* Divider */}
                      <div style={{ height: 1, background: t.divider, marginBottom: 14, flexShrink: 0 }} />

                      {/* Key features label */}
                      <div style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: '0.8px',
                        textTransform: 'uppercase', color: t.labelColor,
                        marginBottom: 12,
                      }}>
                        Key features
                      </div>

                      {/* Feature list */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                        {plan.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                            {f.included ? (
                              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                                <path d="M1.5 5L5 8.5L12.5 1.5" stroke={t.checkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <span style={{ color: t.priceMuted, fontSize: 14, lineHeight: 1, flexShrink: 0, marginTop: 3 }}>–</span>
                            )}
                            <span style={{
                              fontSize: 14, fontWeight: 400, lineHeight: 1.45,
                              letterSpacing: '-0.2px', color: t.featureColor,
                            }}>
                              {f.label}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Company plans */}
          {tab === 'companies' && (
            <div>
              <h3 className="nh-plans-section-label"></h3>
              <div className="nh-plans-grid-2" style={{ maxWidth: 860, margin: '0 auto' }}>
                {COMPANY_PLANS.map(plan => {
                  const isDark = plan.id === 'enterprise'
                  return (
                    <div
                      key={plan.id}
                      style={{
                        background: isDark ? '#132128' : '#f9faf9',
                        borderRadius: 20,
                        border: isDark ? '1px solid rgba(95,168,158,0.20)' : '1px solid rgba(19,33,40,0.12)',
                        padding: '28px 24px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Badge */}
                      {plan.badge && (
                        <div style={{ marginBottom: 10 }}>
                          <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.7px',
                            textTransform: 'uppercase',
                            background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(46,125,79,0.12)',
                            color: isDark ? '#5fa89e' : '#2e7d4f',
                            borderRadius: 9999, padding: '4px 11px',
                            display: 'inline-block',
                          }}>
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      {/* Plan name + description */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{
                          fontSize: 18, fontWeight: 600,
                          color: isDark ? 'rgba(255,255,255,0.55)' : '#132128',
                          letterSpacing: '-0.4px', lineHeight: 1, marginBottom: 6,
                        }}>
                          {plan.name}
                        </div>
                        <div style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.40)' : '#6b7280', lineHeight: 1.4 }}>
                          {plan.description}
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ marginBottom: 4 }}>
                        <span style={{
                          fontSize: 36, fontWeight: 700,
                          color: isDark ? '#ffffff' : '#132128',
                          letterSpacing: '-0.04em', lineHeight: 1,
                        }}>
                          {plan.priceLine}
                        </span>
                      </div>

                      {/* Price sub */}
                      <div style={{
                        fontSize: 12,
                        color: isDark ? 'rgba(255,255,255,0.40)' : '#9ca3af',
                        lineHeight: 1.4, marginBottom: 20,
                      }}>
                        {plan.priceSub}
                      </div>

                      {/* CTA */}
                      {plan.id === 'enterprise' ? (
                        <Link
                          href={plan.ctaHref}
                          className="nh-plan-cta"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: '13px 0', borderRadius: 40,
                            background: 'rgba(255,255,255,0.90)', color: '#132128',
                            border: 'none',
                            fontSize: 15, fontWeight: 600,
                            textDecoration: 'none', letterSpacing: '-0.3px',
                            marginBottom: 22, boxSizing: 'border-box',
                            transition: 'opacity 0.15s ease',
                          }}
                        >
                          {plan.cta}
                        </Link>
                      ) : (
                        <a
                          href={plan.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nh-plan-cta"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: '13px 0', borderRadius: 40,
                            background: 'transparent', color: '#132128',
                            border: '1.5px solid rgba(19,33,40,0.28)',
                            fontSize: 15, fontWeight: 600,
                            textDecoration: 'none', letterSpacing: '-0.3px',
                            marginBottom: 22, boxSizing: 'border-box',
                            transition: 'opacity 0.15s ease',
                          }}
                        >
                          {plan.cta}
                        </a>
                      )}

                      {/* Divider */}
                      <div style={{ height: 1, background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(19,33,40,0.10)', marginBottom: 14, flexShrink: 0 }} />

                      {/* Key features label */}
                      <div style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        color: isDark ? 'rgba(255,255,255,0.38)' : '#9ca3af',
                        marginBottom: 12,
                      }}>
                        Key features
                      </div>

                      {/* Features */}
                      <div style={{ display: 'grid', gridTemplateColumns: plan.id === 'enterprise' ? '1fr 1fr' : '1fr', gap: '10px 12px', flex: 1 }}>
                        {plan.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                            {f.included ? (
                              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                                <path d="M1.5 5L5 8.5L12.5 1.5" stroke={isDark ? '#5fa89e' : '#2e7d4f'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <span style={{ color: isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.3)', fontSize: 14, lineHeight: 1, flexShrink: 0, marginTop: 3 }}>–</span>
                            )}
                            <span style={{
                              fontSize: 14, fontWeight: 400, lineHeight: 1.45,
                              letterSpacing: '-0.2px',
                              color: isDark ? 'rgba(255,255,255,0.72)' : 'rgba(19,33,40,0.62)',
                            }}>
                              {f.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Trust badges */}
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['CASA Level 3 certified', 'SOC 2 ready', '50+ ATS integrations', 'Dedicated account manager'].map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: FONT.sm, color: P.mid, fontWeight: WEIGHT.semi }}>
                      <span style={{ color: P.accent, fontSize: FONT.xs }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WITHOUT vs WITH NEXTHIRE — gravity comparison
      ══════════════════════════════════════════════════════ */}
      <WithWithoutSection />

      {/* ══════════════════════════════════════════════════════
          PLAN TABS — Free → Lite → Pro → Max accordion
      ══════════════════════════════════════════════════════ */}
      {tab === 'candidates' && (
        <section style={{ background: '#ffffff', padding: '80px 0 48px' }}>
          <div className="nh-container">
            <PricingPlanTabs
              plans={CANDIDATE_PLANS}
              cycle={cycle}
            />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE — candidates
      ══════════════════════════════════════════════════════ */}
      {tab === 'candidates' && (
        <section id="pricing-included" style={{ background: '#fbfaf4', padding: '32px 0 90px' }}>
          <div className="ct-scroll-wrap">
            <div className="ct-table" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 30px' }}>

              {/* ── Sticky header: heading left + plan cols right ── */}
              <div className="ct-row" style={{ display: 'flex', flexFlow: 'row', alignItems: 'flex-end', gap: 22, paddingBottom: 20 }}>

                {/* Heading */}
                <div className="ct-row-label" style={{ flex: '2 0 0' }}>
                  <h2 style={{ fontFamily: "'Droid Serif', Georgia, serif", fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 400, color: '#091717', letterSpacing: '-0.042em', lineHeight: 1.15, margin: 0 }}>
                    Features
                  </h2>
                </div>

                {/* Plan columns */}
                <div className="ct-row-values" style={{ flex: '4 0 0', display: 'flex', flexFlow: 'row', gap: 12, alignItems: 'flex-end' }}>

                  {/* Free */}
                  <div className="ct-plan-col" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <span className="ct-plan-name" style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: '#091717', letterSpacing: '-0.027em', lineHeight: 1.2 }}>Free</span>
                    </div>
                    <a className="ct-plan-cta" href="https://app.nexthireconsulting.com" style={{ display: 'block', width: '80%', padding: '10px 0', borderRadius: 8, fontSize: 15, fontWeight: 500, letterSpacing: '-0.013em', textDecoration: 'none', textAlign: 'center', background: 'transparent', color: '#091717', border: '1.5px solid rgba(9,23,23,0.28)', transition: 'opacity 0.15s' }}>Get started</a>
                  </div>

                  {/* Lite */}
                  <div className="ct-plan-col" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <span className="ct-plan-name" style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: '#091717', letterSpacing: '-0.027em', lineHeight: 1.2 }}>Lite</span>
                    </div>
                    <a className="ct-plan-cta" href="https://app.nexthireconsulting.com" style={{ display: 'block', width: '80%', padding: '10px 0', borderRadius: 8, fontSize: 15, fontWeight: 500, letterSpacing: '-0.013em', textDecoration: 'none', textAlign: 'center', background: 'transparent', color: '#091717', border: '1.5px solid rgba(9,23,23,0.28)', transition: 'opacity 0.15s' }}>Start Lite</a>
                  </div>

                  {/* Pro — BEST VALUE */}
                  <div className="ct-plan-col" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <span className="ct-plan-name" style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: '#091717', letterSpacing: '-0.027em', lineHeight: 1.2 }}>Pro</span>
                    </div>
                    <a className="ct-plan-cta" href="https://app.nexthireconsulting.com" style={{ display: 'block', width: '80%', padding: '10px 0', borderRadius: 8, fontSize: 15, fontWeight: 500, letterSpacing: '-0.013em', textDecoration: 'none', textAlign: 'center', background: '#338632', color: '#fbfaf4', border: 'none', transition: 'opacity 0.15s' }}>Start Pro</a>
                  </div>

                  {/* Max */}
                  <div className="ct-plan-col" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <span className="ct-plan-name" style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: '#091717', letterSpacing: '-0.027em', lineHeight: 1.2 }}>Max</span>
                    </div>
                    <a className="ct-plan-cta" href="https://app.nexthireconsulting.com" style={{ display: 'block', width: '80%', padding: '10px 0', borderRadius: 8, fontSize: 15, fontWeight: 500, letterSpacing: '-0.013em', textDecoration: 'none', textAlign: 'center', background: '#091717', color: '#fbfaf4', border: 'none', transition: 'opacity 0.15s' }}>Start Max</a>
                  </div>

                </div>
              </div>

              {/* ── Header divider — 2px, 30% opacity ── */}
              <div style={{ height: 2, background: 'rgba(9,23,23,0.3)', marginBottom: 0 }} />

              {/* ── Feature rows ── */}
              {([
                { label: 'Resume Builder',          vals: [{ v: true }, { v: true }, { v: true }, { v: true }] },
                { label: 'Job Tracker',              vals: [{ v: true }, { v: true }, { v: true }, { v: true }] },
                { label: 'Interview Coach',          vals: [{ v: '30 min' }, { v: '30 min' }, { v: '20 hrs / mo', note: 'AI listens & answers in real time' }, { v: '20 hrs / mo' }] },
                { label: 'AI Auto Apply',            vals: [{ v: '5 / day' }, { v: 'Unlimited' }, { v: 'Unlimited' }, { v: 'Unlimited' }] },
                { label: 'Direct Recruiter InMail',  vals: [{ v: false }, { v: '50 / mo' }, { v: '200 / mo' }, { v: 'Unlimited' }] },
                { label: 'AI Outreach Agent',        vals: [{ v: false }, { v: false }, { v: false }, { v: '3,000 / mo', note: "Don't wait to be found" }] },
              ] as Array<{ label: string; vals: Array<{ v: boolean | string; note?: string }> }>).map((row, rowIdx, arr) => (
                <div key={row.label}>
                  <div className="ct-row" style={{ display: 'flex', flexFlow: 'row', gap: 22, padding: '22px 0', alignItems: 'stretch' }}>

                    {/* Feature label */}
                    <div className="ct-row-label" style={{ flex: '2 0 0', display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: WEIGHT.medium, color: '#091717', letterSpacing: '-0.038em', lineHeight: 1.4 }}>{row.label}</span>
                    </div>

                    {/* Value cells */}
                    <div className="ct-row-values" style={{ flex: '4 0 0', display: 'flex', flexFlow: 'row', gap: 10, alignItems: 'stretch' }}>
                      {[0, 1, 2, 3].map((colIdx) => {
                        const cell = row.vals[colIdx]
                        const isPro = colIdx === 2
                        return (
                          <div key={colIdx} style={{ flex: '1 0 0', display: 'flex', flexFlow: 'row', gap: 12, alignItems: 'center', justifyContent: 'center', minHeight: 52 }}>
                            {cell.v === true ? (
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="14" fill={isPro ? '#338632' : '#1FB8CD'} />
                                <path d="M8 14.5l4.5 4.5 7.5-9" stroke="#FBFAF4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : cell.v === false ? (
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="14" fill="#091717" fillOpacity=".1" />
                                <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#FBFAF4" strokeWidth="1.75" strokeLinecap="round" />
                              </svg>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <span style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 'clamp(13px,1.4vw,16px)', fontWeight: isPro ? WEIGHT.semi : 300, color: isPro ? P.accentD : '#3d5a56', letterSpacing: '-0.025em', lineHeight: 1.4, textAlign: 'center' }}>{cell.v as string}</span>
                                {cell.note && <span style={{ fontSize: 10, color: isPro ? P.accentD : '#7a9a96', lineHeight: 1.4, maxWidth: 110, textAlign: 'center', fontStyle: 'italic' }}>{cell.note}</span>}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Row divider — 2px, 10% opacity */}
                  {rowIdx < arr.length - 1 && <div style={{ height: 2, background: 'rgba(9,23,23,0.1)' }} />}
                </div>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          FAQ — AccordionFaq (Luma-style bordered cards)
      ══════════════════════════════════════════════════════ */}
      <section id="pricing-faq" style={{ background: '#ffffff', padding: '96px 0' }}>
        <AccordionFaq
          title="Frequently asked questions"
          items={tab === 'candidates' ? [
            { question: 'Can I upgrade or downgrade anytime?', answer: 'Yes. Change your plan at any time from your dashboard. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
            { question: 'What happens when I hit my InMail or Apply limit?', answer: "On Free you'll be prompted to upgrade. On Lite and Pro, you can purchase additional credits as add-ons at any time." },
            { question: 'Is the quarterly discount applied automatically?', answer: 'Yes — toggle to Quarterly billing at checkout or in account settings. The 20% discount is applied to every month in the quarter.' },
            { question: 'What is an AI Outreach Agent credit?', answer: 'Each credit powers one personalised outreach email sent to a hiring manager or recruiter from your own Gmail, via the AI Outreach Agent. The Max plan includes 3,000 credits per month.' },
            { question: 'Do I need a credit card for the Free plan?', answer: 'No credit card required. Sign up, connect your account, and start using the free tools immediately.' },
          ] : [
            { question: "What's included in 1 sourcing credit?", answer: 'One sourcing credit runs a full AI search query — scanning 800M+ profiles and returning an enriched, scored shortlist of up to 20 candidates for your role.' },
            { question: 'Can I try before committing to Enterprise?', answer: 'Yes. The Starter plan lets you run one sourcing search and send five outreach emails at no cost. No credit card required.' },
            { question: 'How is Enterprise pricing structured?', answer: 'Enterprise is custom-priced based on your hiring volume, number of seats, and which agents you need. Talk to our sales team for a tailored quote.' },
            { question: 'Does Enterprise include all agents?', answer: 'Yes — AI Talent Sourcing, AI Phone Screening, SMS Agent, AI Video Interviewer, and AI Outreach Sequences, plus 50+ ATS/CRM integrations and a dedicated account manager.' },
          ]}
        />
      </section>
    </div>
  )
}
