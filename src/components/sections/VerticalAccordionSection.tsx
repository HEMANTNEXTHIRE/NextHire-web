'use client'

import { useEffect, useRef, useState, type JSX } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

/* ─── CSS keyframes ───────────────────────────────────────────── */
const EASE_OUT = 'cubic-bezier(0.33, 1, 0.68, 1)'

const STYLES = `
@keyframes nhFadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
@keyframes nhPulse  { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
@keyframes nhPop    { 0%{opacity:0;transform:scale(0.97) translateY(5px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
@keyframes nhSlideIn{ 0%{opacity:0;transform:translateX(-10px)} 100%{opacity:1;transform:translateX(0)} }
`

/* ─── Design tokens ───────────────────────────────────────────── */
const T = {
  white:   '#ffffff',
  bg:      '#f7faf9',
  mint:    '#e4f0eb',
  sage:    '#c8dfd6',
  border:  '#ddeae4',
  divider: '#edf5f1',
  rowBg:   '#f3f8f6',
  rowHi:   '#dff0ea',
  accent:  '#5fa89e',
  accentD: '#3d7a72',
  dark:    '#1a3338',
  mid:     '#3d5a56',
  muted:   '#8aada8',
  green:   '#22c55e',
}

/* ─── Shared status badge colors ──────────────────────────────── */
const STATUS: Record<string, { color: string; bg: string }> = {
  Replied:    { color: T.green,   bg: 'rgba(34,197,94,0.10)'    },
  Opened:     { color: T.accent,  bg: 'rgba(95,168,158,0.12)'   },
  Sent:       { color: T.mid,     bg: 'rgba(61,90,86,0.08)'     },
  Sending:    { color: T.accent,  bg: 'rgba(95,168,158,0.12)'   },
  Queued:     { color: T.muted,   bg: 'rgba(138,173,168,0.10)'  },
  Applied:    { color: T.green,   bg: 'rgba(34,197,94,0.10)'    },
  'Applying…':{ color: T.accent,  bg: 'rgba(95,168,158,0.12)'   },
  'In Queue': { color: T.muted,   bg: 'rgba(138,173,168,0.10)'  },
}

/* ─── Shared micro-components ─────────────────────────────────── */

const Dot = ({ color, pulse }: { color: string; pulse?: boolean }) => (
  <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0, ...(pulse ? { animation: 'nhPulse 1.2s ease infinite' } : {}) }} />
)

const Chip = ({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) => (
  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color, background: bg, borderRadius: 20, padding: '2px 8px', whiteSpace: 'nowrap' as const, letterSpacing: 0.3 }}>
    {children}
  </span>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: T.muted, letterSpacing: '0.8px', textTransform: 'uppercase' as const }}>{children}</span>
)

/* Standard list row — same shape used in every mockup */
const CardRow = ({
  avatar, name, sub, status, active, style,
}: {
  avatar: string; name: string; sub: string; status: string; active?: boolean; style?: React.CSSProperties
}) => {
  const s = STATUS[status] ?? { color: T.muted, bg: 'rgba(138,173,168,0.10)' }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      background: active ? T.rowHi : T.rowBg,
      borderRadius: 12, padding: '10px 12px',
      transition: 'background 0.35s ease', flexShrink: 0, ...style,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: active ? T.accent : T.border,
        color: active ? T.white : T.muted,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: WEIGHT.extra, transition: 'all 0.35s',
      }}>{avatar}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 2, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: s.color, background: s.bg, borderRadius: 20, padding: '2px 7px', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>{status}</span>
    </div>
  )
}

/* Standard stat box */
const StatBox = ({ value, label, color }: { value: string; label: string; color?: string }) => (
  <div style={{ background: T.rowBg, borderRadius: 10, padding: '10px 8px', textAlign: 'center' as const, flex: 1 }}>
    <div style={{ fontSize: 20, fontWeight: WEIGHT.extra, color: color ?? T.accent, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, color: T.muted, marginTop: 4, lineHeight: 1.3 }}>{label}</div>
  </div>
)

/* ─── FEATURE DATA ─────────────────────────────────────────────── */
const FEATURES = [
  { key: 'autoapply', label: 'AI Auto Apply',          color: T.accent  },
  { key: 'outreach',  label: 'AI Outreach Agent',       color: T.dark    },
  { key: 'resume',    label: 'Resume Builder',          color: T.accentD },
  { key: 'portal',    label: 'Job Portal Optimization', color: T.accent  },
  { key: 'tracker',   label: 'Job Tracker',             color: T.accentD },
]

/* ═══════════════════════════════════════════════════════════════
   01 — AI AUTO APPLY
═══════════════════════════════════════════════════════════════ */
function AutoApplyMockup() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % 5), 2000)
    return () => clearInterval(id)
  }, [])

  const jobs = [
    { co: 'Stripe', role: 'Sr. Software Engineer',  match: 97, status: 'Applied'    },
    { co: 'Notion', role: 'AI Product Lead',         match: 94, status: 'Applying…'  },
    { co: 'Linear', role: 'Staff Frontend Engineer', match: 91, status: 'In Queue'   },
    { co: 'Figma',  role: 'Design Systems Eng.',     match: 88, status: 'In Queue'   },
    { co: 'Vercel', role: 'Platform Engineer',        match: 85, status: 'In Queue'   },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.dark }}>Agent Active</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Chip color={T.accent} bg="rgba(95,168,158,0.10)">847 scanned</Chip>
          <Chip color={T.green}  bg="rgba(34,197,94,0.10)">312 applied</Chip>
        </div>
      </div>

      {/* Job rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, overflowY: 'hidden' }}>
        {jobs.map((j, i) => (
          <CardRow
            key={j.co}
            avatar={j.co[0]}
            name={j.co}
            sub={j.role}
            status={j.status}
            active={i === active}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: T.muted }}>Daily limit: <strong style={{ color: T.dark }}>0 / 5 remaining</strong></span>
        <Chip color={T.accentD} bg="rgba(61,122,114,0.09)">82% ATS pass rate</Chip>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   02 — AI OUTREACH AGENT
═══════════════════════════════════════════════════════════════ */
function OutreachMockup() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % 7), 1600)
    return () => clearInterval(id)
  }, [])

  const contacts = [
    { init: 'JS', name: 'James Smith',      sub: 'Stripe · Talent Acquisition Manager',      status: 'Replied'  },
    { init: 'MM', name: 'Maria Martinez',   sub: 'Paypal · Talent Acquisition Specialist',   status: 'Opened'   },
    { init: 'CW', name: 'Charles Wilson',   sub: 'Razorpay · HR Business Partner',           status: 'Sent'     },
    { init: 'AC', name: 'Atul Chaturvedi',  sub: 'Visa · Executive Manager HR',              status: 'Sent'     },
    { init: 'AG', name: 'Adhishree Gupta',  sub: 'Ramp · Senior Talent Acquisition',         status: 'Sent'     },
    { init: 'MS', name: 'Manish Sharma',    sub: 'Brex · Manager HRBP',                      status: 'Sending'  },
    { init: 'LJ', name: 'Linda Jones',      sub: 'Coinbase · AVP - HRBP',                    status: 'Queued'   },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.dark }}>Agent Outreach · Live</span>
        </div>
        <Chip color={T.accent} bg="rgba(95,168,158,0.10)">50 contacts found</Chip>
      </div>

      {/* Contact rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'hidden' }}>
        {contacts.map((c, i) => (
          <CardRow
            key={c.init}
            avatar={c.init}
            name={c.name}
            sub={c.sub}
            status={c.status}
            active={i === active}
          />
        ))}
      </div>

      {/* Stats footer */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <StatBox value="50"  label="Contacted"    color={T.dark}    />
        <StatBox value="64%" label="Open rate"    color={T.accent}  />
        <StatBox value="31%" label="Reply rate"   color={T.green}   />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   03 — RESUME BUILDER
═══════════════════════════════════════════════════════════════ */
function ResumeMockup() {
  const keywords = [
    { label: 'Distributed Systems', pct: 98, color: T.green   },
    { label: 'System Design',       pct: 95, color: T.accent  },
    { label: 'TypeScript / Go',     pct: 92, color: T.accent  },
    { label: 'API Architecture',    pct: 87, color: T.accentD },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
      {/* Target card */}
      <div style={{ background: T.rowHi, borderRadius: 12, padding: '12px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: T.muted }}>Tailored for</span>
          <Chip color={T.accentD} bg="rgba(61,122,114,0.10)">Expert reviewing</Chip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: WEIGHT.bold, color: T.dark }}>Stripe · Senior Engineer</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: WEIGHT.extra, color: T.green, lineHeight: 1 }}>94</span>
            <div>
              <div style={{ fontSize: 9, fontWeight: WEIGHT.bold, color: T.muted, letterSpacing: 0.5 }}>ATS SCORE</div>
              <div style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: T.green }}>Pass ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyword bars */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionLabel>Keyword Match</SectionLabel>
        {keywords.map(k => (
          <div key={k.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: T.mid, fontWeight: WEIGHT.medium }}>{k.label}</span>
              <span style={{ fontSize: 12, fontWeight: WEIGHT.extra, color: k.color }}>{k.pct}%</span>
            </div>
            <div style={{ height: 6, background: T.mint, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${k.pct}%`, background: k.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Sections + footer */}
      <div style={{ borderTop: `1px solid ${T.divider}`, paddingTop: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5, marginBottom: 8 }}>
          {['Experience ✓', 'Skills ✓', 'Impact Metrics ✓', 'Projects ✓'].map(s => (
            <span key={s} style={{ fontSize: 11, fontWeight: WEIGHT.semi, color: T.accentD, background: 'rgba(61,122,114,0.08)', border: `1px solid rgba(61,122,114,0.18)`, borderRadius: 20, padding: '3px 9px' }}>{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.muted }}>
          <span>Generated in <strong style={{ color: T.dark }}>12s</strong></span>
          <span>3 variants ready</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   04 — JOB PORTAL OPTIMIZATION
═══════════════════════════════════════════════════════════════ */
function PortalMockup() {
  const portals = [
    { name: 'LinkedIn', pct: 94, color: T.green   },
    { name: 'Indeed',   pct: 88, color: T.accent  },
    { name: 'Naukri',   pct: 91, color: T.accentD },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.dark }}>Profile Optimization · Active</span>
        </div>
        <Chip color={T.green} bg="rgba(34,197,94,0.10)">Active ✓</Chip>
      </div>

      {/* Portal score rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flexShrink: 0 }}>
        {portals.map(p => (
          <div key={p.name} style={{ background: T.rowBg, borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>{p.name}</span>
              <span style={{ fontSize: 13, fontWeight: WEIGHT.extra, color: p.color }}>{p.pct}%</span>
            </div>
            <div style={{ height: 6, background: T.mint, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <StatBox value="5×"  label="Profile views"     color={T.accent}  />
        <StatBox value="64%" label="More interviews"   color={T.green}   />
        <StatBox value="31"  label="Recruiter messages" color={T.accentD} />
      </div>

      {/* Latest suggestion */}
      <div style={{ flex: 1, background: T.rowHi, borderRadius: 12, padding: '12px 14px', overflow: 'hidden' }}>
        <div style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: T.accentD, letterSpacing: '0.8px', textTransform: 'uppercase' as const, marginBottom: 6 }}>✦ Latest Suggestion</div>
        <div style={{ fontSize: 12, color: T.mid, lineHeight: 1.55 }}>
          Add &quot;cross-functional&quot; and &quot;stakeholder alignment&quot; to your LinkedIn headline — 3× more recruiter hits.
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   05 — JOB TRACKER
═══════════════════════════════════════════════════════════════ */
function JobTrackerMockup() {
  const [highlight, setHighlight] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHighlight(p => (p + 1) % 4), 1800)
    return () => clearInterval(id)
  }, [])

  const columns = [
    { label: 'Applied',   color: T.accent,  jobs: [{ co: 'Stripe', role: 'Eng' }, { co: 'Notion', role: 'PM' }] },
    { label: 'Screening', color: T.accentD, jobs: [{ co: 'Linear', role: 'Design' }]                            },
    { label: 'Interview', color: T.accentD, jobs: [{ co: 'Figma',  role: 'Systems' }]                           },
    { label: 'Offer',     color: T.green,   jobs: [{ co: 'Vercel', role: 'Staff' }]                             },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.dark }}>Application Pipeline</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 11, color: T.muted }}>Auto-tracked</span>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, alignItems: 'start' }} className="vas-kanban-grid">
        {columns.map((col, ci) => (
          <div key={col.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <Dot color={col.color} />
              <span style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: T.mid }}>{col.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: T.muted }}>{col.jobs.length}</span>
            </div>
            {col.jobs.map(j => (
              <div key={j.co} style={{
                background: highlight === ci ? col.color + '18' : T.rowBg,
                borderRadius: 10, padding: '9px 10px',
                transition: 'background 0.4s ease',
              }}>
                <div style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.dark }}>{j.co}</div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{j.role}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Funnel stats */}
      <div style={{ paddingTop: 10, borderTop: `1px solid ${T.divider}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {[
            { n: '312', l: 'Applied',    c: T.accent  },
            { n: '28',  l: 'Screening',  c: T.accentD },
            { n: '11',  l: 'Interviews', c: T.accentD },
            { n: '3',   l: 'Offers',     c: T.green   },
          ].map(s => (
            <div key={s.l} style={{ flex: 1, textAlign: 'center' as const }}>
              <div style={{ fontSize: 16, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 9, color: T.muted, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 5, background: T.mint, borderRadius: 4, overflow: 'hidden', display: 'flex', gap: 2 }}>
          {[100, 9, 3.5, 1].map((w, i) => (
            <div key={i} style={{ height: '100%', flex: w, background: [T.accent, T.accentD, T.mid, T.green][i], borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Mockup map ──────────────────────────────────────────────── */
const MOCKUPS: Record<string, () => JSX.Element> = {
  autoapply: AutoApplyMockup,
  outreach:  OutreachMockup,
  resume:    ResumeMockup,
  portal:    PortalMockup,
  tracker:   JobTrackerMockup,
}

/* ─── Step descriptions ───────────────────────────────────────── */
const FEATURE_DESCS: Record<string, string> = {
  autoapply: 'Scans thousands of listings daily and submits tailored applications on your behalf — 24/7.',
  outreach:  'Detects hiring signals and sends personalised messages to decision-makers before jobs go public.',
  resume:    'Generates a role-specific resume in seconds, scored against the job description keywords.',
  portal:    'AI-optimises your LinkedIn, Indeed, and Naukri profiles so recruiters find you first.',
  tracker:   'Automatically logs every application and moves them through your pipeline as statuses update.',
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════════ */
export default function VerticalAccordionSection() {
  const [active, setActive] = useState('autoapply')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCycle = (key?: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const idx = FEATURES.findIndex(f => f.key === (key ?? prev))
        return FEATURES[(idx + 1) % FEATURES.length].key
      })
    }, 5000)
  }

  useEffect(() => {
    startCycle()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTab = (key: string) => {
    setActive(key)
    startCycle(key)
  }

  const activeIdx = FEATURES.findIndex(f => f.key === active)
  const feat = FEATURES[activeIdx]
  const Mockup = MOCKUPS[active]

  return (
    <section id="full-platform" style={{ background: '#ffffff', padding: 'clamp(72px, 10vw, 110px) 0' }}>
      <style suppressHydrationWarning>{STYLES}</style>

      <div className="nh-container">

        {/* ── Section header ── */}
        <div style={{ marginBottom: 72, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(95,168,158,0.10)', color: T.accentD, padding: '4px 14px', borderRadius: 100, fontSize: 11, fontWeight: WEIGHT.bold, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 18 }}>
            The full platform
          </div>
          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: '54px',
            fontWeight: 400,
            fontStyle: 'normal',
            margin: '0 0 20px',
            lineHeight: '64.8px',
            letterSpacing: '-1.2px',
            maxWidth: 900,
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: '#132128' }}>Everything works for you,</span>
            <span style={{ display: 'block', color: '#132128' }}>while you focus on</span>
            <span style={{ display: 'block', color: '#338632' }}>what matters</span>
          </h2>
          <p style={{ fontSize: 17, color: T.mid, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
            Five AI-powered tools, one platform. Each does its job — together they replace a full recruiting team.
          </p>
        </div>

        {/* ── Main layout: left accordion + right mockup ── */}
        <div className="vas-grid">

          {/* ── Left: accordion ── */}
          <div className="vas-nav-column">
            <div className="vas-nav">
              {FEATURES.map((f) => {
                const isActive = f.key === active
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => handleTab(f.key)}
                    className={`vas-nav-item${isActive ? ' vas-nav-item--active' : ''}`}
                  >
                    <span className="vas-nav-label">{f.label}</span>
                    {isActive && (
                      <p className="vas-nav-desc" style={{ animation: `hiwRowIn 0.26s ${EASE_OUT}` }}>
                        {FEATURE_DESCS[f.key]}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Right: mockup card ── */}
          <div className="vas-visual">
            <div key={active} className="vas-card vas-card-enter">
              <div className="vas-panel-inner">
                <div className="hiw-panel-header">
                  <span className="hiw-live-dot" aria-hidden />
                  <span className="hiw-panel-label">{feat.label}</span>
                  <span className="hiw-badge">LIVE</span>
                </div>
                <div className="vas-panel-mockup">
                  <Mockup />
                </div>
              </div>
            </div>

            {/* Tab strip */}
            <div className="vas-tabs">
              {FEATURES.map(f => (
                <button
                  key={f.key}
                  onClick={() => handleTab(f.key)}
                  className={`vas-tab${f.key === active ? ' vas-tab--active' : ''}`}
                  style={f.key === active ? { borderColor: `${f.color}50`, background: `${f.color}10`, color: f.color } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
