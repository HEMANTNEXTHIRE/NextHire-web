'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FONT, WEIGHT, SERIF } from '@/constants/typography'
import AccordionFaq from '@/components/ui/AccordionFaq'
// SERIF is used in the ROI / table sections below


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

/* ── Plan data ─────────────────────────────────────────────────── */
const CANDIDATE_PLANS = [
  {
    id: 'free', name: 'Free', monthly: 0, badge: null, popular: false,
    color: P.muted, cta: 'Get started free', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Try the core tools. Zero commitment.',
    icon: '🔓',
    features: [
      { label: 'Resume Builder', included: true },
      { label: 'Job Tracker', included: true },
      { label: '30 min — Interview Coach', included: true },
      { label: '5 AI Auto Apply per day', included: true },
      { label: 'Direct Recruiter InMail', included: false },
      { label: 'AI Outreach Agent credits', included: false },
    ],
  },
  {
    id: 'lite', name: 'Lite', monthly: 19.9, badge: 'Most popular', popular: true,
    color: P.accent, cta: 'Start Lite', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'For active job seekers who need reach at scale.',
    icon: '⚡',
    features: [
      { label: 'Resume Builder', included: true },
      { label: 'Job Tracker', included: true },
      { label: '30 min — Interview Coach', included: true },
      { label: 'Unlimited AI Auto Apply', included: true },
      { label: '50 Direct Recruiter InMails / mo', included: true },
      { label: 'AI Outreach Agent credits', included: false },
    ],
  },
  {
    id: 'pro', name: 'Pro', monthly: 49, badge: 'Best value', popular: false,
    color: P.accentD, cta: 'Start Pro', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Serious candidates who want every edge.',
    icon: '🚀',
    features: [
      { label: 'Resume Builder', included: true },
      { label: 'Job Tracker', included: true },
      { label: '20 hrs / mo — Interview Coach', included: true },
      { label: 'Unlimited AI Auto Apply', included: true },
      { label: '200 Direct Recruiter InMails / mo', included: true },
      { label: 'AI Outreach Agent credits', included: false },
    ],
  },
  {
    id: 'max', name: 'Max', monthly: 135, badge: null, popular: false,
    color: P.accentD, cta: 'Start Max', ctaHref: 'https://app.nexthireconsulting.com',
    description: 'Full-stack AI job search. Maximum firepower.',
    icon: '🔥',
    features: [
      { label: 'Resume Builder', included: true },
      { label: 'Job Tracker', included: true },
      { label: '20 hrs / mo — Interview Coach', included: true },
      { label: 'Unlimited AI Auto Apply', included: true },
      { label: 'Unlimited Direct Recruiter InMails', included: true },
      { label: '3,000 AI Outreach Agent credits / mo', included: true },
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
function priceFmt(monthly: number, cycle: BillingCycle) {
  if (monthly === 0) return { display: '$0', sub: 'Free forever' }
  if (cycle === 'quarterly') {
    return { display: `$${(monthly * 0.8).toFixed(0)}`, sub: '/mo · billed quarterly' }
  }
  return { display: `$${monthly}`, sub: '/mo · billed monthly' }
}

/* ── Hero palette ──────────────────────────────────────────────── */
const HOME = {
  bg: '#ffffff',
  dark: '#111827',
  accent: '#2e7d4f',
  subtext: '#6b7280',
  muted: '#9ca3af',
  hairline: '#e5e7eb',
}

/* ── Panel constants — used by ROI / table sections below ─────── */
const NH_PANEL = {
  r: 28,
  shadow: '0 16px 56px rgba(37, 62, 66, 0.10), 0 2px 10px rgba(37, 62, 66, 0.05)' as const,
  shadowPopular: '0 18px 58px rgba(95, 168, 158, 0.12), 0 2px 10px rgba(37, 62, 66, 0.05), 0 0 0 1px rgba(95, 168, 158, 0.18)' as const,
  shadowEnterprise: '0 18px 58px rgba(61, 122, 114, 0.12), 0 2px 10px rgba(37, 62, 66, 0.05), 0 0 0 1px rgba(61, 122, 114, 0.2)' as const,
  inner: '#f3f8f6',
  innerR: 16,
  rowR: 14,
}

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

/* ── Luma-style check icon ─────────────────────────────────────── */
function PlanCheckIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="16" viewBox="0 0 16 16" style={{ height: 16, fill: 'none', flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill={dark ? '#ffffff' : '#000000'} />
      <path d="M5 8L7 10L11 6" stroke={dark ? '#000000' : '#ffffff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function PricingPageClient() {
  const [tab, setTab] = useState<PricingTab>('candidates')
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
      <style suppressHydrationWarning>{STYLES}</style>

      {/* ════════════════════════════════════════════════════════
          PRICING HERO + PLANS & BILLING
      ════════════════════════════════════════════════════════ */}
      <section id="pricing-hero" style={{ background: HOME.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px clamp(20px, 5vw, 40px) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: HOME.bg, border: `1px solid ${HOME.hairline}`, borderRadius: 100, padding: '8px 20px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: HOME.accent, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: '#374151', fontSize: 13, fontWeight: WEIGHT.medium, letterSpacing: '0.01em', lineHeight: 1.4 }}>Simple, transparent pricing</span>
          </div>

          {/* H1 */}
          <div style={{ width: '100%', margin: '0 0 32px', paddingBottom: '0.15em' }}>
            <h1 style={{ fontFamily: SERIF, margin: 0, letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: HOME.dark, fontFamily: SERIF }}>Pick your plan</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: HOME.accent, fontFamily: SERIF }}>Start in minutes</span>
            </h1>
          </div>

          {/* Description */}
          <p style={{ color: HOME.subtext, fontSize: 17, lineHeight: 1.72, margin: '0 0 0', maxWidth: 560, fontWeight: WEIGHT.normal }}>
            Whether you&apos;re a professional landing your next role or a company building your next team &mdash; there&apos;s a plan built for you.
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
            padding: 4,
          }}>
            {(['candidates', 'companies'] as PricingTab[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                style={{
                  position: 'relative',
                  borderRadius: 9999,
                  padding: '8px 20px',
                  fontSize: FONT.base,
                  fontWeight: WEIGHT.medium,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  letterSpacing: '-0.4px',
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
              padding: 4,
            }}>
              {(['monthly', 'quarterly'] as BillingCycle[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  style={{
                    position: 'relative',
                    borderRadius: 9999,
                    padding: '8px 20px',
                    fontSize: FONT.base,
                    fontWeight: WEIGHT.medium,
                    border: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    letterSpacing: '-0.4px',
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
                    {c === 'quarterly' && cycle !== 'quarterly' && (
                      <span style={{ marginLeft: 6, fontSize: FONT.sm, color: '#6b7280' }}>Save 20%</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

            </div>{/* end flex column */}
          </div>{/* end Plans & billing wrapper */}
        </div>{/* end maxWidth 900 hero wrapper */}

        {/* ── Plan grids ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 32px) 80px' }}>

          {/* Candidate plans */}
          {tab === 'candidates' && (
            <div>
              <h3 className="nh-plans-section-label"></h3>
              <div className="nh-plans-grid-4">
                {CANDIDATE_PLANS.map(plan => {
                  const isDark = plan.popular
                  const p = priceFmt(plan.monthly, cycle)
                  const billingNote = (cycle === 'quarterly' && plan.monthly > 0)
                    ? `$${(plan.monthly * 3 * 0.8).toFixed(0)} billed quarterly`
                    : '\u00a0'
                  return (
                    <div
                      key={plan.id}
                      style={{
                        background: isDark ? '#000000' : '#e5e7eb',
                        color: isDark ? '#ffffff' : '#000000',
                        borderRadius: 16,
                        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                        padding: '20px 20px 56px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {/* Plan name — no emoji, muted */}
                      <div style={{
                        fontSize: FONT.base,
                        fontWeight: WEIGHT.medium,
                        color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                        lineHeight: 1,
                        letterSpacing: '-0.4px',
                      }}>
                        {plan.name}
                      </div>

                      {/* Price block */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ margin: 0, lineHeight: 1 }}>
                          <span style={{
                            fontSize: 28,
                            fontWeight: WEIGHT.semi,
                            letterSpacing: '-0.04em',
                            lineHeight: 1.3,
                          }}>
                            {p.display}
                          </span>
                          <span style={{
                            fontSize: FONT.sm,
                            fontWeight: WEIGHT.medium,
                            color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                            lineHeight: 1.4,
                          }}>
                            {plan.monthly > 0 ? '/month' : ''}
                          </span>
                        </p>
                        {/* Invisible placeholder preserves height when not needed */}
                        <p style={{
                          margin: 0,
                          fontSize: FONT.sm,
                          lineHeight: 1.4,
                          color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
                          visibility: billingNote === '\u00a0' ? 'hidden' : 'visible',
                        }}>
                          {billingNote}
                        </p>
                      </div>

                      {/* CTA — white pill on all cards */}
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nh-plan-cta"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 36,
                          borderRadius: 9999,
                          border: '1px solid transparent',
                          background: '#ffffff',
                          color: '#000000',
                          fontSize: FONT.sm,
                          fontWeight: WEIGHT.medium,
                          textDecoration: 'none',
                          transition: 'opacity 0.15s ease',
                          letterSpacing: '-0.4px',
                        }}
                      >
                        {plan.cta}
                      </a>

                      {/* Divider */}
                      <div style={{
                        height: 1,
                        background: isDark ? '#ffffff' : '#000000',
                        flexShrink: 0,
                      }} />

                      {/* Feature list */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {plan.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            {f.included ? (
                              <PlanCheckIcon dark={isDark} />
                            ) : (
                              <span style={{
                                color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
                                fontSize: 15,
                                lineHeight: 1,
                                flexShrink: 0,
                                marginTop: 2,
                              }}>–</span>
                            )}
                            <span style={{
                              fontSize: FONT.sm,
                              fontWeight: WEIGHT.medium,
                              lineHeight: 1.4,
                              letterSpacing: '-0.4px',
                              color: isDark
                                ? (f.included ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.3)')
                                : (f.included ? '#000000' : 'rgba(0,0,0,0.4)'),
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
                        background: isDark ? '#000000' : '#e5e7eb',
                        color: isDark ? '#ffffff' : '#000000',
                        borderRadius: 16,
                        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                        padding: '20px 20px 56px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {/* Plan name */}
                      <div style={{
                        fontSize: FONT.base,
                        fontWeight: WEIGHT.medium,
                        color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                        lineHeight: 1,
                        letterSpacing: '-0.4px',
                      }}>
                        {plan.name}
                      </div>

                      {/* Price */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ margin: 0, lineHeight: 1 }}>
                          <span style={{ fontSize: 28, fontWeight: WEIGHT.semi, letterSpacing: '-0.04em', lineHeight: 1.3 }}>
                            {plan.priceLine}
                          </span>
                        </p>
                        <p style={{ margin: 0, fontSize: FONT.sm, lineHeight: 1.4, color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280' }}>
                          {plan.priceSub}
                        </p>
                      </div>

                      {/* CTA */}
                      {plan.id === 'enterprise' ? (
                        <Link
                          href={plan.ctaHref}
                          className="nh-plan-cta"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            height: 36, borderRadius: 9999, border: '1px solid transparent',
                            background: '#ffffff', color: '#000000',
                            fontSize: FONT.sm, fontWeight: WEIGHT.medium,
                            textDecoration: 'none', transition: 'opacity 0.15s ease',
                            letterSpacing: '-0.4px',
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
                            height: 36, borderRadius: 9999, border: '1px solid transparent',
                            background: '#ffffff', color: '#000000',
                            fontSize: FONT.sm, fontWeight: WEIGHT.medium,
                            textDecoration: 'none', transition: 'opacity 0.15s ease',
                            letterSpacing: '-0.4px',
                          }}
                        >
                          {plan.cta}
                        </a>
                      )}

                      {/* Divider */}
                      <div style={{ height: 1, background: isDark ? '#ffffff' : '#000000', flexShrink: 0 }} />

                      {/* Features */}
                      <div style={{ display: 'grid', gridTemplateColumns: plan.id === 'enterprise' ? '1fr 1fr' : '1fr', gap: '8px 12px' }}>
                        {plan.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            {f.included ? (
                              <PlanCheckIcon dark={isDark} />
                            ) : (
                              <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: 15, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>–</span>
                            )}
                            <span style={{
                              fontSize: FONT.sm, fontWeight: WEIGHT.medium, lineHeight: 1.4,
                              letterSpacing: '-0.4px',
                              color: isDark ? 'rgba(255,255,255,0.85)' : '#000000',
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
          VISUAL INFOGRAPHIC — "Why pay for NextHire?"
          Andela-style metrics + visual comparisons
      ══════════════════════════════════════════════════════ */}
      <section id="pricing-numbers" style={{ background: P.surface, padding: '96px clamp(20px, 5vw, 40px) 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-block', background: `${P.accent}12`, color: P.accentD, padding: '6px 16px', borderRadius: 100, fontSize: FONT.sm, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
              The ROI of NextHire
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 14px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              Numbers that make the decision easy.
            </h2>
            <p style={{ fontSize: FONT.md, color: P.mid, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              Compare the cost of NextHire against the average time and money lost in a manual job search.
            </p>
          </div>

          {/* Infographic grid — 3 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="pricing-infographic-grid">

            {/* Card 1 — Time saved */}
            <div style={{ background: P.white, border: 'none', borderRadius: NH_PANEL.r, padding: 32, overflow: 'hidden', position: 'relative', boxShadow: NH_PANEL.shadow }}>
              <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: `${P.accent}08`, top: -30, right: -30 }} />
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Time saved</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: FONT.sm, color: P.muted, marginBottom: 6 }}>Manual</div>
                  <div style={{ width: 40, background: `${P.mid}20`, borderRadius: '6px 6px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: 100 }}>
                    <div style={{ width: '100%', background: P.mid, borderRadius: '4px 4px 0 0', height: '100%' }} />
                  </div>
                  <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.extra, color: P.mid, marginTop: 5 }}>40 hrs</div>
                </div>
                <div style={{ fontSize: FONT.md, color: P.muted, paddingBottom: 30 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: FONT.sm, color: P.muted, marginBottom: 6 }}>NextHire</div>
                  <div style={{ width: 40, background: `${P.accent}20`, borderRadius: '6px 6px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: 100 }}>
                    <div style={{ width: '100%', background: P.accent, borderRadius: '4px 4px 0 0', height: '12%' }} />
                  </div>
                  <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.extra, color: P.accent, marginTop: 5 }}>~5 hrs</div>
                </div>
              </div>
              <p style={{ fontSize: FONT.base, color: P.mid, lineHeight: 1.6, margin: 0 }}>Average weekly hours saved vs manual job searching across boards, applications, and outreach.</p>
            </div>

            {/* Card 2 — Application reach */}
            <div style={{ background: P.dark, border: 'none', borderRadius: NH_PANEL.r, padding: 32, overflow: 'hidden', position: 'relative', boxShadow: NH_PANEL.shadow }}>
              <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: `${P.accent}15`, top: -40, right: -40 }} />
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Application reach</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.white, lineHeight: 1, letterSpacing: '-1px' }}>
                  40<span style={{ color: P.accent }}>×</span>
                </div>
                <div style={{ fontSize: FONT.base, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>more roles vs manual applying</div>
              </div>
              {[
                { label: 'Manual (per week)', value: 12, max: 480, color: 'rgba(255,255,255,0.15)' },
                { label: 'NextHire (per week)', value: 480, max: 480, color: P.accent },
              ].map(r => (
                <div key={r.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: FONT.sm, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                    <span>{r.label}</span><span style={{ color: r.color === P.accent ? P.accent : 'rgba(255,255,255,0.6)', fontWeight: WEIGHT.bold }}>{r.value}</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(r.value / r.max) * 100}%`, background: r.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Card 3 — Reply rate */}
            <div style={{ background: P.white, border: 'none', borderRadius: NH_PANEL.r, padding: 32, overflow: 'hidden', position: 'relative', boxShadow: NH_PANEL.shadow }}>
              <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: `${P.green}10`, bottom: -20, right: -20 }} />
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.green, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Reply rate</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center' }}>
                {[{ label: 'Cold email avg', v: 4, c: P.muted }, { label: 'NextHire avg', v: 31, c: P.green }].map(s => (
                  <div key={s.label} style={{ flex: 1 }}>
                    <div style={{ fontSize: FONT.sm, color: P.muted, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ position: 'relative', height: 80 }}>
                      <svg viewBox="0 0 80 80" style={{ width: 80, height: 80 }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke={P.mint} strokeWidth="8" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke={s.c} strokeWidth="8"
                          strokeDasharray={`${(s.v / 100) * 201} 201`}
                          strokeLinecap="round"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                        <text x="40" y="44" textAnchor="middle" fontSize={FONT.base} fontWeight={WEIGHT.extra} fill={s.c}>{s.v}%</text>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: FONT.base, color: P.mid, lineHeight: 1.6, margin: 0 }}>NextHire outreach averages 31% reply rate vs 4% cold email industry average.</p>
            </div>
          </div>

          {/* Second row — 2 wide cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }} className="pricing-roi-bottom">

            {/* Cost comparison */}
            <div style={{ background: P.white, border: 'none', borderRadius: NH_PANEL.r, padding: 32, boxShadow: NH_PANEL.shadow }}>
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.accentD, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>Cost comparison</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Recruiter agency fee (avg)', cost: '$8,000–15,000', note: 'per hire', color: P.mid },
                  { label: 'Job board subscriptions', cost: '$200–600', note: '/month', color: P.muted },
                  { label: 'Resume writing service', cost: '$300–800', note: 'one-time', color: P.muted },
                  { label: 'NextHire Lite plan', cost: '$19.90', note: '/month — all tools included', color: P.accent },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: r.label.includes('NextHire') ? `${P.accent}10` : NH_PANEL.inner, border: 'none', borderRadius: NH_PANEL.rowR }}>
                    <span style={{ fontSize: FONT.base, color: P.mid, fontWeight: WEIGHT.medium }}>{r.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.extra, color: r.color }}>{r.cost}</span>
                      <span style={{ fontSize: FONT.sm, color: P.muted, display: 'block' }}>{r.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline to first offer */}
            <div style={{ background: `linear-gradient(165deg, ${P.mint} 0%, #f3f8f6 100%)`, border: 'none', borderRadius: NH_PANEL.r, padding: 32, boxShadow: NH_PANEL.shadow }}>
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.accentD, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>Timeline to offer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 19, top: 24, bottom: 24, width: 2, background: P.sage }} />
                {[
                  { day: 'Day 1', event: 'Agent starts scanning & applying', color: P.accent },
                  { day: '48–72h', event: 'First outreach replies arrive', color: P.green },
                  { day: 'Week 2', event: 'First interview calls booked', color: P.accentD },
                  { day: 'Week 4–8', event: 'Offer received', color: P.accent },
                ].map((step, i) => (
                  <div key={step.day} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: i < 3 ? 18 : 0, position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${step.color}20`, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: step.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: step.color, letterSpacing: 0.5 }}>{step.day}</div>
                      <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.semi, color: P.dark, lineHeight: 1.4 }}>{step.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE — candidates
      ══════════════════════════════════════════════════════ */}
      {tab === 'candidates' && (
        <section id="pricing-included" style={{ background: '#ffffff', padding: '96px clamp(20px, 5vw, 40px) 96px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              What&apos;s included at a glance
            </h2>
            <div style={{ borderRadius: NH_PANEL.r, overflow: 'hidden', border: 'none', boxShadow: NH_PANEL.shadow, background: P.white }}>
              {/* header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', background: NH_PANEL.inner, padding: '16px 22px' }} className="pricing-table-header">
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.muted, textTransform: 'uppercase', letterSpacing: '1px' }}>Feature</div>
                {CANDIDATE_PLANS.map(p => (
                  <div key={p.id} style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: p.popular ? p.color : P.dark, textAlign: 'center' }}>{p.icon} {p.name}</div>
                ))}
              </div>
              {[
                { label: 'Resume Builder', vals: [true, true, true, true] },
                { label: 'Job Tracker', vals: [true, true, true, true] },
                { label: 'Interview Coach', vals: ['30 min', '30 min', '20 hrs/mo', '20 hrs/mo'] },
                { label: 'AI Auto Apply', vals: ['5/day', 'Unlimited', 'Unlimited', 'Unlimited'] },
                { label: 'Direct Recruiter InMail', vals: [false, '50/mo', '200/mo', 'Unlimited'] },
                { label: 'AI Outreach Agent credits', vals: [false, false, false, '3,000/mo'] },
              ].map((row, i) => (
                <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '14px 22px', alignItems: 'center', background: i % 2 === 1 ? 'rgba(243,248,246,0.65)' : P.white }} className="pricing-table-row">
                  <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.mid }}>{row.label}</div>
                  {row.vals.map((v, j) => (
                    <div key={j} style={{ textAlign: 'center', fontSize: FONT.sm, fontWeight: WEIGHT.semi }}>
                      {v === true
                        ? <span style={{ color: CANDIDATE_PLANS[j].color, fontSize: FONT.base }}>✓</span>
                        : v === false
                        ? <span style={{ color: P.border, fontSize: FONT.base }}>—</span>
                        : <span style={{ color: CANDIDATE_PLANS[j].color, fontSize: FONT.sm, fontWeight: WEIGHT.bold }}>{v}</span>
                      }
                    </div>
                  ))}
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
          title="Pricing questions"
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
