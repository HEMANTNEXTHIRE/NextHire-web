'use client'

import { useState, useEffect, useRef } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

/* ─── Shared palette (matches HireSection) ───────────────────────────────── */
const P = {
  surface: '#ffffff',
  bg:      '#f5faf7',
  mint:    '#e8f5ee',
  sage:    '#c8dfd6',
  border:  '#e0ece6',
  accent:  '#338632',
  dark:    '#132128',
  mid:     '#424D53',
  muted:   '#8aada8',
  green:   '#338632',
}

/* ─── Shared sub-components ──────────────────────────────────────────────── */
const Dot = ({ color }: { color: string }) => (
  <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
)

const StatusPill = ({ label, color, bg }: { label: string; color: string; bg: string }) => (
  <span style={{
    fontSize: FONT.xs, fontWeight: WEIGHT.semi, color, background: bg,
    borderRadius: 20, padding: '2px 9px', whiteSpace: 'nowrap' as const,
  }}>{label}</span>
)

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: P.surface, borderRadius: 10,
    border: `1px solid ${P.border}`,
    boxShadow: '0 1px 4px rgba(19,33,40,0.06)',
    ...style,
  }}>{children}</div>
)

/* ─── Illustration 1: Job boards → AI bypass → direct connection ──────────── */

function JobBoardBypassIllustration() {
  const boards = [
    { logo: '/Image/logo-linkedin.svg',  name: 'LinkedIn',  role: 'Senior Software Engineer', status: 'No response', sBg: '#f3f4f6', sColor: P.muted },
    { logo: '/Image/logo-indeed.png',    name: 'Indeed',    role: 'Full Stack Developer',     status: 'Rejected',    sBg: '#fef2f2', sColor: '#dc2626' },
    { logo: '/Image/logo-glassdoor.png', name: 'Glassdoor', role: 'Software Engineer',        status: 'Ghosted',     sBg: '#f3f4f6', sColor: P.muted },
  ]
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.muted, letterSpacing: 1.2, textTransform: 'uppercase' as const }}>
          Your Applications
        </span>
        <span style={{ fontSize: FONT.xs, color: P.muted }}>3 sent</span>
      </div>

      {/* Job board rows */}
      {boards.map((b) => (
        <Card key={b.name} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.logo} alt={b.name} style={{ width: 30, height: 30, borderRadius: 8, objectFit: 'contain', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.dark }}>{b.name}</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>{b.role}</div>
          </div>
          <StatusPill label={b.status} color={b.sColor} bg={b.sBg} />
        </Card>
      ))}

      {/* Bypass divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
        <div style={{ flex: 1, height: 1, background: P.sage }} />
        <span style={{
          fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.accent,
          background: P.mint, padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5,
        }}>AI BYPASSES ↓</span>
        <div style={{ flex: 1, height: 1, background: P.sage }} />
      </div>

      {/* Direct connection */}
      <Card style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `1.5px solid ${P.sage}` }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${P.muted}, ${P.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: '#fff',
        }}>SC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.dark }}>Sarah Chen · Head of Engineering</div>
          <div style={{ fontSize: FONT.xs, color: P.accent, marginTop: 2 }}>Google · Direct introduction sent ✓</div>
        </div>
      </Card>
    </div>
  )
}

/* ─── Illustration 2: Gmail compose to hiring manager ───────────────────── */

function DirectOutreachIllustration() {
  return (
    <div style={{ width: '100%' }}>
      <Card style={{ overflow: 'hidden' }}>
        {/* Window bar */}
        <div style={{
          background: '#f7f7f7', padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          borderBottom: `1px solid ${P.border}`,
        }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ flex: 1, textAlign: 'center', fontSize: FONT.xs, color: P.muted, fontWeight: WEIGHT.medium }}>
            New Message
          </div>
        </div>

        {/* Fields */}
        <div style={{ padding: '0 14px' }}>
          {/* From */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${P.border}` }}>
            <span style={{ fontSize: FONT.xs, color: P.muted, width: 36, flexShrink: 0 }}>From</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: WEIGHT.bold, color: '#fff',
              }}>A</div>
              <span style={{ fontSize: FONT.xs, color: P.dark, fontWeight: WEIGHT.medium }}>alex@gmail.com</span>
            </div>
          </div>

          {/* To */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${P.border}` }}>
            <span style={{ fontSize: FONT.xs, color: P.muted, width: 36, flexShrink: 0 }}>To</span>
            <div style={{
              background: '#e8f0fe', borderRadius: 20, padding: '2px 10px',
              fontSize: FONT.xs, color: '#1a73e8', fontWeight: WEIGHT.semi,
            }}>sarah.chen@google.com</div>
          </div>

          {/* Subject */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${P.border}` }}>
            <span style={{ fontSize: FONT.xs, color: P.muted, width: 36, flexShrink: 0 }}>Sub</span>
            <span style={{ fontSize: FONT.xs, color: P.dark, fontWeight: WEIGHT.medium }}>
              Re: Staff Engineer opportunity at Google
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '12px 14px 10px' }}>
          <p style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65, margin: 0 }}>
            Hi Sarah, I noticed Google&apos;s Infra team has grown significantly this quarter.
            I&apos;ve been building ML pipeline systems at scale and think there could be a strong fit for the open role...
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '8px 14px 14px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{
            background: P.accent, color: '#fff', borderRadius: 20,
            padding: '6px 20px', fontSize: FONT.sm, fontWeight: WEIGHT.semi,
          }}>Send</div>
          <span style={{ fontSize: 10, color: P.muted }}>🔒 CASA L3 · Auto-deleted after delivery</span>
        </div>
      </Card>

      <div style={{ marginTop: 10, textAlign: 'center', fontSize: FONT.xs, color: P.accent, fontWeight: WEIGHT.semi }}>
        ✓ Sent from your own Gmail — no third-party platform
      </div>
    </div>
  )
}

/* ─── Illustration 3: Pipeline stats + live activity ───────────────────── */

function InterviewPipelineIllustration() {
  const stats = [
    { value: '247', label: 'Sent',       color: P.dark },
    { value: '18%', label: 'Reply Rate', color: P.accent },
    { value: '12',  label: 'Interviews', color: P.accent },
  ]
  const activities = [
    { dot: P.accent,  text: 'Reply from Marcus @ Stripe',      time: '2m ago' },
    { dot: '#3b82f6', text: 'Interview booked: Meta Engineering', time: '1h ago' },
    { dot: '#f59e0b', text: 'Outreach sent: 8 companies',      time: '3h ago' },
    { dot: P.accent,  text: 'Reply from Emma @ Airbnb',        time: '5h ago' },
  ]
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ flex: 1, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 5 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Activity feed */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{
          padding: '9px 14px', borderBottom: `1px solid ${P.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.dark }}>Live Activity</span>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: P.accent,
            boxShadow: `0 0 0 3px ${P.mint}`,
          }} />
        </div>
        {activities.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 14px',
            borderBottom: i < activities.length - 1 ? `1px solid ${P.border}` : 'none',
          }}>
            <Dot color={a.dot} />
            <span style={{ fontSize: FONT.sm, color: P.mid, flex: 1 }}>{a.text}</span>
            <span style={{ fontSize: FONT.xs, color: P.muted, flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

/* ─── Role data ──────────────────────────────────────────────────────────── */

interface RoleItem {
  id: string
  title: string
  pill: string
  description: string
  cardBg: string
  illustration: React.ReactNode
}

const ROLES: RoleItem[] = [
  {
    id: 'builders',
    title: 'Escape the Apply & Pray Trap',
    pill: 'BYPASS JOB BOARDS',
    description:
      'Job boards create unnecessary friction between you and your next role. Stop relying only on endless application queues. Your AI agent optimizes your profiles across job portals, bypasses the ATS, and connects you with the people who actually make hiring decisions.',
    cardBg: '#ecf7ec',
    illustration: <JobBoardBypassIllustration />,
  },
  {
    id: 'integrators',
    title: 'Proactive, Direct Outreach',
    pill: 'TARGETED INTRODUCTIONS',
    description:
      'Your agent discovers hidden roles and sends hyper-personalized emails to hiring managers directly from your own email address. There are no third-party platforms or spam, just strategic, targeted introductions that put you first in line.',
    cardBg: '#f0fafb',
    illustration: <DirectOutreachIllustration />,
  },
  {
    id: 'scalers',
    title: 'Land Interviews on Autopilot',
    pill: '24/7 JOB HUNTING',
    description:
      'Turn job hunting from a passive waiting game into a predictable pipeline. As your agent works 24/7 to reach out to target companies, replies hit your inbox directly. You spend your time talking to managers and interviewing, not filling out forms.',
    cardBg: '#f5f5f5',
    illustration: <InterviewPipelineIllustration />,
  },
]

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function RoleLifecycleSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex = 0
      let closestDist = Infinity

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elCenter = rect.top + rect.height / 2
        const dist = Math.abs(elCenter - viewportCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home-roles" style={{ background: '#ffffff', padding: '96px 0 0' }}>
      <div className="nh-container">

        {/* Intro heading */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 4.5vw, 54px)',
            fontWeight: 400,
            margin: '0 0 22px',
            lineHeight: 1.2,
            letterSpacing: '-1.2px',
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: P.dark }}>Not a job board.</span>
            <span style={{ display: 'block', color: P.dark }}>Your personal AI agent.</span>
          </h2>
          <p style={{ fontSize: FONT.md, color: P.mid, maxWidth: '520px', margin: '0 auto', lineHeight: '27px', letterSpacing: '-0.3px' }}>
            The agent works 24/7, discovering opportunities, reaching decision makers, and tracking every touchpoint
          </p>
        </div>

        <div className="nh-lc-grid">

          {/* Left: scrolling content items */}
          <div className="nh-lc-content-wrapper">
            {ROLES.map((role, i) => (
              <div
                key={role.id}
                ref={el => { itemRefs.current[i] = el }}
                className={`nh-lc-item${activeIndex === i ? ' nh-lc-item--active' : ''}`}
              >
                <h4 className="nh-lc-title">{role.title}</h4>
                <div className="nh-lc-pill">{role.pill}</div>
                <p className="nh-lc-desc">{role.description}</p>
              </div>
            ))}
          </div>

          {/* Right: sticky card with illustration swap */}
          <div className="nh-lc-card-wrapper">
            <div className="nh-lc-card-sticky">
              <div
                className="nh-lc-card"
                style={{ backgroundColor: ROLES[activeIndex].cardBg }}
              >
                {ROLES.map((role, i) => (
                  <div
                    key={role.id}
                    className="nh-lc-illustration"
                    style={{ opacity: activeIndex === i ? 1 : 0 }}
                  >
                    {role.illustration}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
