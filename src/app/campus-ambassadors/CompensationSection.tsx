'use client'

import { useState } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

const DARK_TEXT = '#1a3338'
const BODY_TEXT = '#3d5a56'
const SAGE_BORDER = '#c8dfd6'
const TEAL = '#5fa89e'
const ACCENT_GREEN = '#2e7d4f'
const DARK_PANEL = '#132128'
const MINT = '#edf5f1'

type Point = {
  id: string
  badge: string
  title: string
  tagline: string
  bullets: string[]
}

const POINTS: Point[] = [
  {
    id: 'performance',
    badge: '01',
    title: 'Performance based',
    tagline: 'Your output decides the upside.',
    bullets: [
      'Every paid signup is credited to you',
      'No caps on how many signups you can drive',
      'Quarterly signups carry a higher incentive',
    ],
  },
  {
    id: 'payouts',
    badge: '02',
    title: 'Fast payouts',
    tagline: 'Verified payouts processed within two weeks.',
    bullets: [
      'Submit proof of paid signups any time',
      'Team verifies and approves quickly',
      'No long approval queues',
    ],
  },
  {
    id: 'recognition',
    badge: '03',
    title: 'Recognition for top performers',
    tagline: 'Standout partners get more than incentives.',
    bullets: [
      'Leaderboard placement across NextHire channels',
      'Letter of Recommendation for top performers',
      'Direct support on your own job search',
    ],
  },
]

/* ─── shared infographic primitives ─── */
function AppDots() {
  return (
    <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexShrink: 0 }}>
      {['#f87171', '#fbbf24', '#4ade80'].map(c => (
        <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
      ))}
    </div>
  )
}

function FloatingBadge({ icon, title, sub, style }: { icon: string; title: string; sub: string; style?: React.CSSProperties }) {
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
        <div style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
          {title}
        </div>
        <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
          {sub}
        </div>
      </div>
    </div>
  )
}

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
      background: MINT,
      borderRadius: 12,
      padding: '50px 10px 50px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 220,
    }}>
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

      {badges.map((b, i) => (
        <FloatingBadge key={i} icon={b.icon} title={b.title} sub={b.sub} style={b.style} />
      ))}
    </div>
  )
}

/* ─── per-point visuals ─── */

function PerformanceVisual() {
  const rates = [
    { type: 'Paid monthly signup',    sub: 'per paid sale', amount: '₹500'   },
    { type: 'Paid quarterly signup',  sub: 'per paid sale', amount: '₹1,500' },
  ]
  return (
    <InfographicShell badges={[
      { icon: '📈', title: 'Performance based', sub: 'Every signup credited',  style: { top: 10, left: 10 } },
      { icon: '🎯', title: '8 this week',       sub: 'Signups via your code',  style: { top: 10, right: 10 } },
      { icon: '🏷', title: 'COLLEGE1000',       sub: 'Applied at checkout',    style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>
          Current incentive rates
        </span>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', background: '#f3f4f6', padding: '2px 8px', borderRadius: 20, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
          Subject to change
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10, justifyContent: 'center' }}>
        {rates.map((r) => (
          <div
            key={r.type}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              background: '#ffffff',
              border: `1px solid ${SAGE_BORDER}`,
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(37,62,66,0.05)',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>
                {r.type}
              </div>
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                {r.sub}
              </div>
            </div>
            <div style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 26, fontWeight: 700, color: ACCENT_GREEN,
              letterSpacing: '-0.6px', lineHeight: 1,
            }}>
              {r.amount}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 4,
          padding: '10px 14px',
          background: 'linear-gradient(165deg, #e6f4ea 0%, #f3f8f6 100%)',
          borderRadius: 10,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: DARK_PANEL, letterSpacing: '-0.1px' }}>
            Paid within two weeks of verification
          </span>
        </div>
      </div>
    </InfographicShell>
  )
}

function PayoutVisual() {
  const steps = [
    { label: 'Submit proof of paid signups',  state: 'Done',     dot: ACCENT_GREEN, sub: 'Screenshot uploaded' },
    { label: 'Team verifies the signups',     state: 'Done',     dot: ACCENT_GREEN, sub: 'Approved in 2 hrs' },
    { label: 'Payout processed to your bank', state: 'Pending',  dot: TEAL,         sub: 'ETA Friday' },
  ]
  return (
    <InfographicShell badges={[
      { icon: '⏱', title: 'Within 2 weeks', sub: 'From submit to paid',     style: { top: 10, left: 10 } },
      { icon: '✅', title: 'Auto verified',  sub: 'Once team approves',      style: { top: 10, right: 10 } },
      { icon: '🏦', title: 'Direct to bank', sub: 'UPI or bank transfer',    style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>
          Payout request · May 24
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: TEAL, background: '#e4f0eb', padding: '2px 8px', borderRadius: 20 }}>
          In progress
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
        {steps.map((s, i, arr) => (
          <div key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', position: 'relative' }}>
            {/* dot + connector line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <span style={{
                width: 14, height: 14, borderRadius: '50%',
                background: s.state === 'Done' ? s.dot : '#ffffff',
                border: `2px solid ${s.dot}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 800, color: '#ffffff',
              }}>
                {s.state === 'Done' ? '✓' : ''}
              </span>
              {i < arr.length - 1 && (
                <span style={{ width: 2, flex: 1, background: s.state === 'Done' ? s.dot : '#e5e7eb', minHeight: 14 }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: DARK_PANEL, letterSpacing: '-0.2px' }}>{s.label}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  color: s.state === 'Done' ? ACCENT_GREEN : TEAL,
                  background: s.state === 'Done' ? '#e6f4ea' : '#e4f0eb',
                  padding: '1px 7px', borderRadius: 20, whiteSpace: 'nowrap',
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                }}>
                  {s.state}
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </InfographicShell>
  )
}

function RecognitionVisual() {
  const board = [
    { rank: 1, name: 'Aarav K.',  campus: 'IIT Dhanbad',  signups: 14, color: '#f5b400', medal: '🥇' },
    { rank: 2, name: 'Priya N.',  campus: 'NIT Trichy',   signups: 11, color: '#a3a3a3', medal: '🥈' },
    { rank: 3, name: 'Rohit S.',  campus: 'IIIT Hyderabad', signups: 9,  color: '#b87333', medal: '🥉' },
  ]
  return (
    <InfographicShell badges={[
      { icon: '🏆', title: 'Top 3 of cohort',  sub: 'Public recognition',   style: { top: 10, left: 10 } },
      { icon: '✍️', title: 'LoR unlocked',     sub: 'Top performers only',   style: { top: 10, right: 10 } },
      { icon: '🤝', title: 'Hiring intros',    sub: 'Direct to managers',    style: { bottom: 10, right: 10 } },
    ]}>
      <AppDots />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>
          Cohort leaderboard
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT_GREEN, background: '#e6f4ea', padding: '2px 8px', borderRadius: 20 }}>
          May 2026
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 6 }}>
        {board.map((row) => (
          <div key={row.rank} style={{
            display: 'flex', gap: 8, alignItems: 'center',
            padding: '8px 10px',
            background: row.rank === 1 ? 'linear-gradient(90deg, #fff7d6 0%, #ffffff 100%)' : '#fafafa',
            border: `1px solid ${row.rank === 1 ? '#f5b40044' : '#f0f3f2'}`,
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 16, lineHeight: 1, width: 24, textAlign: 'center' }}>{row.medal}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>{row.name}</div>
              <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>{row.campus}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: row.color, letterSpacing: '-0.2px', lineHeight: 1 }}>{row.signups}</div>
              <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>signups</div>
            </div>
          </div>
        ))}

        {/* "Your row" sample */}
        <div style={{
          marginTop: 'auto',
          display: 'flex', gap: 8, alignItems: 'center',
          padding: '8px 10px',
          background: '#f7faf9',
          border: `1px dashed ${TEAL}`,
          borderRadius: 8,
        }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: TEAL, width: 24, textAlign: 'center' }}>#7</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.2px' }}>You</div>
            <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>Climb to top 3 for LoR</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: TEAL, letterSpacing: '-0.2px', lineHeight: 1 }}>4</div>
            <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>signups</div>
          </div>
        </div>
      </div>
    </InfographicShell>
  )
}

function PointVisual({ id }: { id: string }) {
  if (id === 'performance') return <PerformanceVisual />
  if (id === 'payouts')     return <PayoutVisual />
  return <RecognitionVisual />
}

function PointImageWrapper({ point }: { point: Point }) {
  return (
    <div className="matched-image-wrapper" style={{ justifyContent: 'flex-start', padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, width: '100%' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: DARK_PANEL, letterSpacing: '-0.3px' }}>{point.title}</span>
      </div>
      <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5, letterSpacing: '-0.2px', width: '100%' }}>
        {point.tagline}
      </p>
      <PointVisual id={point.id} />
    </div>
  )
}

/* ─── inline icons ─── */
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M10.2003 14.8518L18.4731 6.57812L19.7466 7.85073L10.2003 17.397L4.47266 11.6694L5.74526 10.3968L10.2003 14.8518Z" fill={ACCENT_GREEN} />
    </svg>
  )
}

export default function CompensationSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = POINTS[activeIdx]

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(56px, 8vw, 80px) 0' }}>
      <div className="nh-container">
        <div style={{ textAlign: 'center', marginBottom: 36, maxWidth: 720, marginInline: 'auto' }}>
          <h2 style={{
            fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: DARK_TEXT,
            margin: '0 0 12px', letterSpacing: '-0.5px',
          }}>
            How compensation works.
          </h2>
          <p style={{ fontSize: FONT.base, color: BODY_TEXT, margin: '0 auto', maxWidth: 620, lineHeight: 1.65 }}>
            A simple, performance based model. Full details, including current incentive rates, are shared in the application form and onboarding.
          </p>
        </div>

        <div className="matched-tabs" id="ca-compensation-tabs">
          {/* Left accordion */}
          <div className="matched-tabs-menu" role="tablist">
            {POINTS.map((p, i) => {
              const isActive = i === activeIdx
              const pillBg    = isActive ? 'rgb(236, 247, 236)' : 'rgb(245, 245, 245)'
              const pillColor = isActive ? 'rgb(66, 77, 83)'    : 'rgb(161, 166, 169)'
              const titleColor = isActive ? 'rgb(19, 33, 40)'   : 'rgb(161, 166, 169)'
              return (
                <div
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIdx(i)}
                  className={`matched-tab-link${i === POINTS.length - 1 ? ' border-bottom' : ''}`}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  <div className="matched-tab-header">
                    <p className="matched-pill" style={{ backgroundColor: pillBg, color: pillColor }}>
                      {p.badge}
                    </p>
                    <div className="matched-title-tab" style={{ color: titleColor }}>
                      {p.title}
                    </div>
                  </div>

                  <div
                    className="matched-tab-content"
                    style={{ maxHeight: isActive ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}
                  >
                    <div className="matched-tab-content-inner">
                      <p className="text-l text-dark-green-black">{p.tagline}</p>
                      <div className="matched-list-wrapper">
                        {p.bullets.map(b => (
                          <div key={b} className="hero-check-text-wrap">
                            <div className="icon-embed w-embed">
                              <CheckIcon />
                            </div>
                            <div style={{ color: DARK_PANEL }}>{b}</div>
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
              <PointImageWrapper point={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
