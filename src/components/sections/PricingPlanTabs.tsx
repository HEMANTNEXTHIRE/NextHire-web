'use client'

import { useState } from 'react'

/* ── Types ──────────────────────────────────────────────────── */
interface PlanFeature {
  label: string
  included: boolean
}

interface Plan {
  id: string
  name: string
  monthly: number
  badge: string | null
  icon: string
  description: string
  tagline: string
  color: string
  cta: string
  ctaHref: string
  features: PlanFeature[]
}

interface PricingPlanTabsProps {
  plans: Plan[]
  cycle: 'monthly' | 'quarterly'
}

/* ── Check/cross icons ──────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M10.2003 14.8518L18.4731 6.57812L19.7466 7.85073L10.2003 17.397L4.47266 11.6694L5.74526 10.3968L10.2003 14.8518Z" fill="#338632" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M18 6L6 18M6 6l12 12" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════
   DASHBOARD VISUAL PRIMITIVES
════════════════════════════════════════════════════════════════ */

/* macOS-style traffic lights */
function AppDots() {
  return (
    <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexShrink: 0 }}>
      {['#f87171', '#fbbf24', '#4ade80'].map(c => (
        <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
      ))}
    </div>
  )
}

/* Floating badge card — positioned absolutely inside InfographicShell */
function FloatingBadge({
  icon, title, sub, style,
}: {
  icon: string
  title: string
  sub: string
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      position: 'absolute',
      background: '#ffffff',
      borderRadius: 10,
      padding: '9px 12px',
      boxShadow: '0 6px 24px rgba(19,33,40,0.13), 0 1px 4px rgba(19,33,40,0.07)',
      border: '1px solid rgba(200,223,214,0.55)',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      zIndex: 10,
      ...style,
    }}>
      <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#132128', letterSpacing: '-0.2px', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
          {title}
        </div>
        <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
          {sub}
        </div>
      </div>
    </div>
  )
}

/* Outer shell — tinted background + badge slots + central white card */
function InfographicShell({
  children,
  badges,
}: {
  children: React.ReactNode
  badges: Array<{ icon: string; title: string; sub: string; style?: React.CSSProperties }>
}) {
  return (
    <div style={{
      position: 'relative',
      flex: 1,
      width: '100%',
      background: '#edf5f1',
      borderRadius: 12,
      /* vertical padding creates the space badges "float" over */
      padding: '50px 10px 50px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 220,
    }}>
      {/* Central white card */}
      <div style={{
        flex: 1,
        background: '#ffffff',
        borderRadius: 12,
        padding: '14px 14px 12px',
        boxShadow: '0 2px 14px rgba(19,33,40,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>

      {/* Floating badges */}
      {badges.map((b, i) => (
        <FloatingBadge key={i} icon={b.icon} title={b.title} sub={b.sub} style={b.style} />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PER-PLAN VISUALS
════════════════════════════════════════════════════════════════ */

function FreeVisual() {
  const sections = [
    { label: 'Resume Headline', pct: 92 },
    { label: 'Work Experience', pct: 100 },
    { label: 'Skills', pct: 45 },
    { label: 'Projects', pct: 0 },
  ]

  return (
    <InfographicShell badges={[
      { icon: '🔓', title: 'Free forever', sub: 'No credit card needed', style: { top: 10, left: 10 } },
      { icon: '👁', title: '14 companies viewed', sub: 'Your profile this week', style: { top: 10, right: 10 } },
      { icon: '📄', title: 'Resume Builder', sub: 'ATS-optimized templates', style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ fontSize: 11, fontWeight: 700, color: '#132128', marginBottom: 12, letterSpacing: '-0.2px' }}>
        Your Career Dashboard
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {sections.map(s => (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
              <span>{s.label}</span>
              <span style={{
                fontWeight: 700,
                color: s.pct >= 80 ? '#338632' : s.pct > 0 ? '#f59e0b' : '#d1d5db',
              }}>
                {s.pct > 0 ? `${s.pct}%` : 'Not started'}
              </span>
            </div>
            <div style={{ height: 5, background: '#f0f3f2', borderRadius: 4 }}>
              <div style={{
                width: `${s.pct}%`, height: '100%', borderRadius: 4,
                background: s.pct >= 80 ? '#338632' : s.pct > 0 ? '#f59e0b' : 'transparent',
              }} />
            </div>
          </div>
        ))}
      </div>
    </InfographicShell>
  )
}

function LiteVisual() {
  const jobs = [
    { co: 'Stripe', role: 'Product Manager', status: 'Applied', sc: '#338632', sb: '#e6f4ea' },
    { co: 'Notion', role: 'Growth Lead', status: 'Applying…', sc: '#5fa89e', sb: '#e4f0eb' },
    { co: 'Figma', role: 'Design Systems', status: 'Queued', sc: '#8aada8', sb: '#f3f4f6' },
    { co: 'Vercel', role: 'Eng Manager', status: 'Queued', sc: '#8aada8', sb: '#f3f4f6' },
  ]

  return (
    <InfographicShell badges={[
      { icon: '⚡', title: 'Runs 24/7', sub: 'Applies while you sleep', style: { top: 10, left: 10 } },
      { icon: '📊', title: '82% ATS pass', sub: 'AI-tailored per role', style: { top: 10, right: 10 } },
      { icon: '🌐', title: '60+ platforms', sub: 'LinkedIn · Indeed · Glassdoor', style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#132128', letterSpacing: '-0.2px' }}>AI Auto Apply</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#338632', background: '#e6f4ea', padding: '2px 8px', borderRadius: 20 }}>312 today</span>
      </div>

      {/* Table header */}
      <div style={{ display: 'flex', gap: 6, paddingBottom: 6, borderBottom: '1px solid #f0f3f2', marginBottom: 2 }}>
        {['Company', 'Role', 'Status'].map(h => (
          <span key={h} style={{ flex: h === 'Role' ? 1.5 : 1, fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {jobs.map((j, i, arr) => (
          <div key={j.co} style={{
            display: 'flex', gap: 6, alignItems: 'center',
            paddingTop: 6, paddingBottom: 6,
            borderBottom: i < arr.length - 1 ? '1px solid #f7f7f7' : 'none',
          }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#132128', letterSpacing: '-0.2px' }}>{j.co}</span>
            <span style={{ flex: 1.5, fontSize: 10, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.role}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: j.sc, background: j.sb, padding: '1px 7px', borderRadius: 20, whiteSpace: 'nowrap' }}>{j.status}</span>
          </div>
        ))}
      </div>
    </InfographicShell>
  )
}

function ProVisual() {
  return (
    <InfographicShell badges={[
      { icon: '🎯', title: 'Real-time coaching', sub: 'AI answers as you speak', style: { top: 10, left: 10 } },
      { icon: '📬', title: '200 InMails/mo', sub: 'Direct to recruiters', style: { top: 10, right: 10 } },
      { icon: '📈', title: '42% open rate', sub: 'vs 5% industry avg', style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ fontSize: 11, fontWeight: 700, color: '#132128', marginBottom: 10, letterSpacing: '-0.2px' }}>
        Interview Coach — Live Session
      </div>

      {/* Interviewer question */}
      <div style={{
        background: '#f7faf9',
        border: '1px solid #e4f0eb',
        borderRadius: '8px 8px 8px 2px',
        padding: '9px 11px',
        marginBottom: 8,
        fontSize: 11,
        color: '#132128',
        lineHeight: 1.55,
        flexShrink: 0,
      }}>
        "Describe a time you handled a difficult stakeholder."
      </div>

      {/* AI answer */}
      <div style={{
        background: '#132128',
        borderRadius: '8px 8px 2px 8px',
        padding: '10px 11px',
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#5fa89e', letterSpacing: '0.5px', textTransform: 'uppercase' }}>AI Coach</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>
          Lead with the outcome — frame it as a collaboration challenge. Use STAR: situation, task, actions taken, result achieved with data.
        </span>
      </div>
    </InfographicShell>
  )
}

function MaxVisual() {
  const pipeline = [
    { co: 'Stripe', contact: 'Alex R. · Head of Product', status: 'Replied ✓', sc: '#338632', sb: '#e6f4ea' },
    { co: 'Linear', contact: 'Mia T. · Staff Engineer', status: 'Replied ✓', sc: '#338632', sb: '#e6f4ea' },
    { co: 'Vercel', contact: 'Dan K. · Eng Manager', status: 'Sent', sc: '#5fa89e', sb: '#e4f0eb' },
    { co: 'Airbnb', contact: 'Priya S. · PM Lead', status: 'Scheduled', sc: '#8aada8', sb: '#f3f4f6' },
  ]

  return (
    <InfographicShell badges={[
      { icon: '🤖', title: 'Agent runs 24/7', sub: 'Zero manual effort', style: { top: 10, left: 10 } },
      { icon: '✉️', title: '3,000 msgs/mo', sub: 'Personalised per contact', style: { top: 10, right: 10 } },
      { icon: '📈', title: '31% reply rate', sub: 'vs 4% cold email avg', style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#132128', letterSpacing: '-0.2px' }}>Outreach Agent</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#338632', background: '#e6f4ea', padding: '2px 8px', borderRadius: 20 }}>● Live</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {pipeline.map((r, i, arr) => (
          <div key={r.co} style={{
            display: 'flex', gap: 6, alignItems: 'center',
            paddingTop: 6, paddingBottom: 6,
            borderBottom: i < arr.length - 1 ? '1px solid #f7f7f7' : 'none',
          }}>
            <span style={{ flex: '0 0 40px', fontSize: 11, fontWeight: 700, color: '#132128', letterSpacing: '-0.2px' }}>{r.co}</span>
            <span style={{ flex: 1, fontSize: 10, color: '#8aada8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.contact}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: r.sc, background: r.sb, padding: '1px 7px', borderRadius: 20, whiteSpace: 'nowrap' }}>{r.status}</span>
          </div>
        ))}
      </div>
    </InfographicShell>
  )
}

function PlanVisual({ plan }: { plan: Plan }) {
  if (plan.id === 'free') return <FreeVisual />
  if (plan.id === 'lite') return <LiteVisual />
  if (plan.id === 'pro')  return <ProVisual />
  return <MaxVisual />
}

/* ════════════════════════════════════════════════════════════════
   RIGHT PANEL WRAPPER
════════════════════════════════════════════════════════════════ */
function PlanImageWrapper({ plan }: { plan: Plan }) {
  return (
    <div className="matched-image-wrapper" style={{ justifyContent: 'flex-start', padding: '1.75rem' }}>

      {/* Plan name + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, width: '100%' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#132128', letterSpacing: '-0.3px' }}>{plan.name}</span>
        {plan.badge && (
          <span style={{
            fontSize: 11, fontWeight: 700,
            background: `${plan.color}20`, color: plan.color,
            padding: '3px 8px', borderRadius: 6,
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {plan.badge}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5, letterSpacing: '-0.2px', width: '100%' }}>
        {plan.tagline}
      </p>

      {/* Dashboard infographic — fills all remaining height */}
      <PlanVisual plan={plan} />

    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function PricingPlanTabs({ plans }: PricingPlanTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="matched-tabs" id="pricing-plan-tabs">

      {/* Left accordion */}
      <div className="matched-tabs-menu" role="tablist">
        {plans.map((plan, i) => {
          const isActive = i === activeIdx
          const pillBg    = isActive ? 'rgb(236, 247, 236)' : 'rgb(245, 245, 245)'
          const pillColor = isActive ? 'rgb(66, 77, 83)'    : 'rgb(161, 166, 169)'
          const titleColor = isActive ? 'rgb(19, 33, 40)'   : 'rgb(161, 166, 169)'

          return (
            <div
              key={plan.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIdx(i)}
              className={`matched-tab-link${i === plans.length - 1 ? ' border-bottom' : ''}`}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div className="matched-tab-header">
                <p className="matched-pill" style={{ backgroundColor: pillBg, color: pillColor }}>
                  {plan.name.toUpperCase()}
                </p>
                <div className="matched-title-tab" style={{ color: titleColor }}>
                  {plan.description}
                </div>
              </div>

              <div
                className="matched-tab-content"
                style={{ maxHeight: isActive ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}
              >
                <div className="matched-tab-content-inner">
                  <p className="text-l text-dark-green-black">{plan.tagline}</p>
                  <div className="matched-list-wrapper">
                    {plan.features.map(f => (
                      <div key={f.label} className="hero-check-text-wrap">
                        <div className="icon-embed w-embed">
                          {f.included ? <CheckIcon /> : <CrossIcon />}
                        </div>
                        <div style={{ color: f.included ? '#132128' : '#9ca3af' }}>{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right panel */}
      <div className="matched-tabs-content">
        <div className="matched-tab-pane" style={{ display: 'block', height: '100%' }}>
          <PlanImageWrapper plan={plans[activeIdx]} />
        </div>
      </div>

    </div>
  )
}
