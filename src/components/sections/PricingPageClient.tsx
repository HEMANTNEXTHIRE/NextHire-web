'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

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

/* ── Animated counter ──────────────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let start = 0
      const duration = 1400
      const step = Math.ceil(target / (duration / 16))
      const id = setInterval(() => {
        start = Math.min(start + step, target)
        setVal(start)
        if (start >= target) clearInterval(id)
      }, 16)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ── CSS injected once ─────────────────────────────────────────── */
const STYLES = `
@keyframes pFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes pPulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
@keyframes pSlideUp{ from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes pOrb    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.05)} }
@keyframes pSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes pShimmer{ 0%{background-position:200% 0} 100%{background-position:-200% 0} }

.pricing-card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease !important; }
.pricing-card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(37,62,66,0.12) !important; }

.p-tab-btn { transition: all 0.2s ease; }
.p-tab-btn:hover { opacity: 1 !important; }

.p-cta-solid:hover { filter: brightness(1.08); transform: translateY(-1px); }
.p-cta-outline:hover { background: var(--plan-color) !important; color: #fff !important; }

.faq-item { transition: background 0.15s ease; }
.faq-item:hover { background: #f7faf9; border-radius: 12px; }

@keyframes pBarFill { from{width:0} to{width:var(--bar-w)} }
`

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function PricingPageClient() {
  const [tab, setTab] = useState<PricingTab>('candidates')
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: P.white, minHeight: '100vh', fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
      <style suppressHydrationWarning>{STYLES}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — full-width mint with floating infographic
      ══════════════════════════════════════════════════════ */}
      <section id="pricing-hero" style={{ background: P.bg, padding: '110px 40px 110px', position: 'relative', overflow: 'hidden' }}>

        {/* Animated decorative orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${P.sage}90 0%, transparent 65%)`, top: -150, right: '5%', animation: 'pOrb 12s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: `radial-gradient(circle, ${P.mint} 0%, transparent 65%)`, bottom: 0, left: '8%', animation: 'pOrb 16s ease-in-out infinite reverse' }} />
          {/* dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${P.sage} 1.2px, transparent 1.2px)`, backgroundSize: '30px 30px', opacity: 0.55 }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }} className="hero-grid">

            {/* Left: headline — centered, Playfair like first page */}
            <div style={{ paddingBottom: 72, textAlign: 'center' }}>
              {/* pill */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(95,168,158,0.12)', border: `1px solid ${P.sage}`, borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: P.accent, display: 'inline-block', animation: 'pPulse 1.6s ease-in-out infinite', boxShadow: `0 0 8px ${P.accent}` }} />
                <span style={{ color: P.accentD, fontSize: FONT.sm, fontWeight: WEIGHT.bold, letterSpacing: '0.5px' }}>Simple, transparent pricing</span>
              </div>

              <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', margin: '0 0 20px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
                <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>Pick your plan.</span>
                <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>Start in minutes.</span>
              </h1>
              <p style={{ fontSize: FONT.md, color: P.mid, lineHeight: 1.72, margin: '0 auto 40px', maxWidth: 460 }}>
                Whether you&apos;re a professional landing your next role or a company building your next team — there&apos;s a plan built for you.
              </p>

              {/* Audience toggle */}
              <div style={{ display: 'inline-flex', background: P.white, border: `1px solid ${P.border}`, borderRadius: 14, padding: 4, boxShadow: '0 2px 12px rgba(37,62,66,0.08)', margin: '0 auto' }}>
                {(['candidates', 'companies'] as PricingTab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="p-tab-btn"
                    style={{
                      padding: '10px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      fontSize: FONT.base, fontWeight: WEIGHT.bold,
                      background: tab === t ? P.dark : 'transparent',
                      color: tab === t ? P.white : P.muted,
                      boxShadow: tab === t ? '0 2px 12px rgba(26,51,56,0.18)' : 'none',
                      transition: 'all 0.22s ease',
                    }}
                  >
                    {t === 'candidates' ? '👤 For Candidates' : '🏢 For Companies'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: animated infographic panel */}
            <div style={{ position: 'relative', paddingBottom: 0, animation: 'pSlideUp 0.6s ease 0.1s both' }}>
              {/* Main stats card */}
              <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 24, padding: 32, boxShadow: '0 8px 48px rgba(37,62,66,0.10)' }}>
                <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.muted, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 20 }}>Platform overview</div>

                {/* Stat rows */}
                {[
                  { label: 'Professionals onboarded', value: 1000000, suffix: '+', color: P.accent, pct: 100 },
                  { label: 'Jobs scanned daily', value: 14000000, suffix: '', color: P.accentD, pct: 88 },
                  { label: 'Avg email open rate', value: 64, suffix: '%', color: P.green, pct: 64 },
                  { label: 'Offer rate with Copilot', value: 75, suffix: '%', color: P.accent, pct: 75 },
                ].map((s, i) => (
                  <div key={s.label} style={{ marginBottom: i < 3 ? 18 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: FONT.sm, color: P.mid, fontWeight: WEIGHT.medium }}>{s.label}</span>
                      <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: s.color }}>
                        <Counter target={s.value} suffix={s.suffix} />
                      </span>
                    </div>
                    <div style={{ height: 5, background: P.mint, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', background: s.color, borderRadius: 4,
                        // @ts-expect-error CSS variable
                        '--bar-w': `${s.pct}%`,
                        width: `${s.pct}%`,
                        animation: 'pBarFill 1.4s ease forwards',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating trust badge */}
              <div style={{ position: 'absolute', bottom: -24, left: -24, background: P.dark, borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(26,51,56,0.2)', animation: 'pFloat 4s ease-in-out infinite' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${P.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.base }}>🔒</div>
                <div>
                  <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: P.white, lineHeight: 1.2 }}>CASA Level 3</div>
                  <div style={{ fontSize: FONT.xs, color: `rgba(255,255,255,0.5)` }}>Privacy certified</div>
                </div>
              </div>

              {/* Floating review badge */}
              <div style={{ position: 'absolute', top: -20, right: -16, background: P.white, border: `1px solid ${P.border}`, borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(37,62,66,0.08)', animation: 'pFloat 5s ease-in-out 1s infinite' }}>
                <span style={{ fontSize: FONT.base }}>⭐</span>
                <div>
                  <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.dark }}>4.8 / 5</div>
                  <div style={{ fontSize: FONT.xs, color: P.muted }}>from 2,400+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave into white */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 48, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" fill="none" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0 32 Q240 0 480 32 Q720 64 960 32 Q1200 0 1440 32 L1440 64 L0 64 Z" fill={P.white} />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PLAN CARDS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: P.white, padding: '0 40px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Billing toggle — candidates */}
          {tab === 'candidates' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 48, paddingTop: 4 }}>
              <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.semi, color: cycle === 'monthly' ? P.dark : P.muted, transition: 'color 0.2s' }}>Monthly</span>
              <button
                onClick={() => setCycle(c => c === 'monthly' ? 'quarterly' : 'monthly')}
                style={{ width: 52, height: 28, borderRadius: 100, border: 'none', cursor: 'pointer', background: cycle === 'quarterly' ? P.accent : P.border, position: 'relative', transition: 'background 0.25s ease', padding: 0 }}
                aria-label="Toggle billing cycle"
              >
                <span style={{ position: 'absolute', top: 4, left: cycle === 'quarterly' ? 28 : 4, width: 20, height: 20, borderRadius: '50%', background: P.white, boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s ease', display: 'block' }} />
              </button>
              <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.semi, color: cycle === 'quarterly' ? P.dark : P.muted, transition: 'color 0.2s' }}>
                Quarterly
                <span style={{ display: 'inline-block', marginLeft: 8, background: '#e4f0eb', color: '#3d7a72', fontSize: FONT.sm, fontWeight: WEIGHT.extra, padding: '3px 10px', borderRadius: 100, verticalAlign: 'middle' }}>
                  Save 20%
                </span>
              </span>
            </div>
          )}

          {/* ── Candidate plan grid ── */}
          {tab === 'candidates' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="pricing-grid-candidates">
              {CANDIDATE_PLANS.map((plan, idx) => {
                const p = priceFmt(plan.monthly, cycle)
                return (
                  <div
                    key={plan.id}
                    className="pricing-card-hover"
                    style={{
                      borderRadius: 20,
                      border: plan.popular ? `2px solid ${plan.color}` : `1px solid ${P.border}`,
                      background: plan.popular ? `linear-gradient(160deg,${plan.color}08 0%,${P.white} 55%)` : P.white,
                      padding: '28px 22px 22px',
                      display: 'flex', flexDirection: 'column',
                      position: 'relative', overflow: 'hidden',
                      boxShadow: plan.popular ? `0 8px 40px ${plan.color}22` : '0 2px 12px rgba(37,62,66,0.04)',
                      animation: `pSlideUp 0.5s ease ${idx * 0.07}s both`,
                    }}
                  >
                    {/* Decorative circle bg on popular */}
                    {plan.popular && (
                      <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: `${plan.color}06`, top: -60, right: -40, pointerEvents: 'none' }} />
                    )}

                    {/* Badge */}
                    {plan.badge && (
                      <div style={{ position: 'absolute', top: 14, right: 14, background: plan.popular ? plan.color : `${plan.color}15`, color: plan.popular ? P.white : plan.color, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '0.8px', padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase' }}>
                        {plan.badge}
                      </div>
                    )}

                    {/* Icon + name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${plan.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.md }}>
                        {plan.icon}
                      </div>
                      <span style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: P.dark, letterSpacing: '-0.3px' }}>{plan.name}</span>
                    </div>

                    <p style={{ fontSize: FONT.base, color: P.mid, lineHeight: 1.6, margin: '0 0 18px', minHeight: 36 }}>{plan.description}</p>

                    {/* Price */}
                    <div style={{ marginBottom: 22, padding: '14px 0', borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                        <span style={{ fontSize: FONT.xl, fontWeight: WEIGHT.extra, color: plan.monthly === 0 ? P.dark : plan.color, lineHeight: 1, letterSpacing: '-1px' }}>{p.display}</span>
                      </div>
                      <div style={{ fontSize: FONT.sm, color: P.muted, marginTop: 3, fontWeight: WEIGHT.medium }}>{p.sub}</div>
                      {cycle === 'quarterly' && plan.monthly > 0 && (
                        <div style={{ fontSize: FONT.sm, color: '#22c55e', marginTop: 4, fontWeight: WEIGHT.bold }}>
                          Save ${(plan.monthly * 3 * 0.2).toFixed(0)} this quarter
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div style={{ flex: 1, marginBottom: 20 }}>
                      {plan.features.map(f => (
                        <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9 }}>
                          <div style={{ width: 17, height: 17, borderRadius: '50%', flexShrink: 0, marginTop: 1, background: f.included ? `${plan.color}18` : P.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.xs, color: f.included ? plan.color : P.muted, fontWeight: WEIGHT.extra }}>
                            {f.included ? '✓' : '–'}
                          </div>
                          <span style={{ fontSize: FONT.base, color: f.included ? P.mid : P.muted, lineHeight: 1.5, fontWeight: f.included ? WEIGHT.medium : WEIGHT.normal }}>{f.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={plan.popular ? 'p-cta-solid' : 'p-cta-outline'}
                      style={{
                        display: 'block', textAlign: 'center', textDecoration: 'none',
                        padding: '12px 20px', borderRadius: 10, fontWeight: WEIGHT.bold, fontSize: FONT.sm,
                        background: plan.popular ? plan.color : 'transparent',
                        color: plan.popular ? P.white : plan.color,
                        border: `2px solid ${plan.popular ? 'transparent' : plan.color}`,
                        transition: 'all 0.2s ease',
                        // @ts-expect-error CSS variable
                        '--plan-color': plan.color,
                      }}
                    >
                      {plan.cta} →
                    </a>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Company plans ── */}
          {tab === 'companies' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 860, margin: '8px auto 0' }} className="pricing-grid-companies">
                {COMPANY_PLANS.map((plan, idx) => (
                  <div
                    key={plan.id}
                    className="pricing-card-hover"
                    style={{
                      borderRadius: 24, padding: '32px 28px',
                      border: plan.id === 'enterprise' ? `2px solid ${plan.color}` : `1px solid ${P.border}`,
                      background: plan.id === 'enterprise' ? `linear-gradient(160deg,${plan.color}07 0%,${P.white} 60%)` : P.white,
                      display: 'flex', flexDirection: 'column',
                      boxShadow: plan.id === 'enterprise' ? `0 8px 48px ${plan.color}18` : '0 2px 20px rgba(37,62,66,0.04)',
                      position: 'relative', overflow: 'hidden',
                      animation: `pSlideUp 0.5s ease ${idx * 0.1}s both`,
                    }}
                  >
                    {/* Decorative bg arc */}
                    {plan.id === 'enterprise' && (
                      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: `${plan.color}05`, top: -80, right: -60, pointerEvents: 'none' }} />
                    )}

                    {/* Icon + badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${plan.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.lg }}>{plan.icon}</div>
                        <span style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.dark }}>{plan.name}</span>
                      </div>
                      <div style={{ background: `${plan.color}15`, color: plan.color, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '0.8px', padding: '3px 12px', borderRadius: 100, textTransform: 'uppercase' }}>
                        {plan.badge}
                      </div>
                    </div>

                    <p style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65, margin: '0 0 20px' }}>{plan.description}</p>

                    {/* Price */}
                    <div style={{ marginBottom: 24, padding: '16px 0', borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
                      <div style={{ fontSize: FONT.xl, fontWeight: WEIGHT.extra, color: plan.id === 'enterprise' ? plan.color : P.dark, lineHeight: 1, letterSpacing: '-2px' }}>{plan.priceLine}</div>
                      <div style={{ fontSize: FONT.sm, color: P.muted, marginTop: 5, fontWeight: WEIGHT.medium }}>{plan.priceSub}</div>
                    </div>

                    {/* Features */}
                    <div style={{ flex: 1, marginBottom: 24 }}>
                      {plan.id === 'enterprise' && (
                        <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: plan.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
                          Everything in Starter, plus:
                        </div>
                      )}
                      <div style={{ display: 'grid', gridTemplateColumns: plan.id === 'enterprise' ? '1fr 1fr' : '1fr', gap: '0 12px' }}>
                        {plan.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 9 }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1, background: `${plan.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.xs, color: plan.color, fontWeight: WEIGHT.extra }}>
                              ✓
                            </div>
                            <span style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.5, fontWeight: WEIGHT.medium }}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    {plan.id === 'enterprise' ? (
                      <Link
                        href={plan.ctaHref}
                        className="p-cta-solid"
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '14px 20px', borderRadius: 10, fontWeight: WEIGHT.bold, fontSize: FONT.base, background: plan.color, color: P.white, transition: 'all 0.2s ease' }}
                      >
                        {plan.cta} →
                      </Link>
                    ) : (
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-cta-outline"
                        style={{
                          display: 'block', textAlign: 'center', textDecoration: 'none',
                          padding: '14px 20px', borderRadius: 10, fontWeight: WEIGHT.bold, fontSize: FONT.base,
                          background: 'transparent', color: plan.color, border: `2px solid ${plan.color}`,
                          transition: 'all 0.2s ease',
                          // @ts-expect-error CSS variable
                          '--plan-color': plan.color,
                        }}
                      >
                        {plan.cta} →
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <p style={{ fontSize: FONT.sm, color: P.muted, margin: '0 0 16px' }}>
                  Enterprise includes all agents — sourcing, phone screening, SMS, video interviewer, and outreach sequences.
                </p>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['CASA Level 3 certified', 'SOC 2 ready', '50+ ATS integrations', 'Dedicated account manager'].map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: FONT.sm, color: P.mid, fontWeight: 600 }}>
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
      <section id="pricing-numbers" style={{ background: P.surface, padding: '110px 40px 110px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="pricing-infographic-grid">

            {/* Card 1 — Time saved */}
            <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28, overflow: 'hidden', position: 'relative' }}>
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
            <div style={{ background: P.dark, border: 'none', borderRadius: 20, padding: 28, overflow: 'hidden', position: 'relative' }}>
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
            <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28, overflow: 'hidden', position: 'relative' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>

            {/* Cost comparison */}
            <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.accentD, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>Cost comparison</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Recruiter agency fee (avg)', cost: '$8,000–15,000', note: 'per hire', color: P.mid },
                  { label: 'Job board subscriptions', cost: '$200–600', note: '/month', color: P.muted },
                  { label: 'Resume writing service', cost: '$300–800', note: 'one-time', color: P.muted },
                  { label: 'NextHire Lite plan', cost: '$19.90', note: '/month — all tools included', color: P.accent },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: r.label.includes('NextHire') ? `${P.accent}08` : P.surface, border: `1px solid ${r.label.includes('NextHire') ? P.sage : P.border}`, borderRadius: 10 }}>
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
            <div style={{ background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 20, padding: 28 }}>
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
        <section id="pricing-included" style={{ background: P.white, padding: '110px 40px 110px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              What&apos;s included at a glance
            </h2>
            <div style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${P.border}` }}>
              {/* header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', background: P.surface, borderBottom: `1px solid ${P.border}`, padding: '14px 20px' }}>
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
                <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '13px 20px', alignItems: 'center', background: i % 2 === 1 ? P.surface : P.white, borderBottom: `1px solid ${P.border}` }}>
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
          FAQ — accordion with animations
      ══════════════════════════════════════════════════════ */}
      <section id="pricing-faq" style={{ background: P.surface, padding: '110px 40px 110px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', textAlign: 'center', margin: '0 0 44px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
            Pricing questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(tab === 'candidates' ? [
              { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. Change your plan at any time from your dashboard. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
              { q: 'What happens when I hit my InMail or Apply limit?', a: "On Free you'll be prompted to upgrade. On Lite and Pro, you can purchase additional credits as add-ons at any time." },
              { q: 'Is the quarterly discount applied automatically?', a: 'Yes — toggle to Quarterly billing at checkout or in account settings. The 20% discount is applied to every month in the quarter.' },
              { q: 'What is an AI Outreach Agent credit?', a: 'Each credit powers one personalised outreach email sent to a hiring manager or recruiter from your own Gmail, via the AI Outreach Agent. The Max plan includes 3,000 credits per month.' },
              { q: 'Do I need a credit card for the Free plan?', a: 'No credit card required. Sign up, connect your account, and start using the free tools immediately.' },
            ] : [
              { q: "What's included in 1 sourcing credit?", a: 'One sourcing credit runs a full AI search query — scanning 800M+ profiles and returning an enriched, scored shortlist of up to 20 candidates for your role.' },
              { q: 'Can I try before committing to Enterprise?', a: 'Yes. The Starter plan lets you run one sourcing search and send five outreach emails at no cost. No credit card required.' },
              { q: 'How is Enterprise pricing structured?', a: 'Enterprise is custom-priced based on your hiring volume, number of seats, and which agents you need. Talk to our sales team for a tailored quote.' },
              { q: 'Does Enterprise include all agents?', a: 'Yes — AI Talent Sourcing, AI Phone Screening, SMS Agent, AI Video Interviewer, and AI Outreach Sequences, plus 50+ ATS/CRM integrations and a dedicated account manager.' },
            ]).map((faq, i) => (
              <div
                key={faq.q}
                className="faq-item"
                style={{ padding: '18px 16px', borderBottom: `1px solid ${P.border}`, cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: P.dark, lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: P.accent, fontSize: FONT.md, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block', lineHeight: 1 }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.75, marginTop: 12, animation: 'pSlideUp 0.2s ease' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
