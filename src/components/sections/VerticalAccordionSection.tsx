'use client'

import { useEffect, useRef, useState } from 'react'
import { FONT, WEIGHT, SERIF } from '@/constants/typography'

/* ─── CSS keyframes ───────────────────────────────────────────── */
const EASE_OUT = 'cubic-bezier(0.33, 1, 0.68, 1)'

const STYLES = `
@keyframes nhFadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
@keyframes nhPulse  { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
@keyframes nhPop    { 0%{opacity:0;transform:scale(0.97) translateY(5px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
@keyframes nhSlideIn{ 0%{opacity:0;transform:translateX(-10px)} 100%{opacity:1;transform:translateX(0)} }
@keyframes nhBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes nhWave   { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
`


/* ─── Design tokens ───────────────────────────────────────────── */
const T = {
  white:   '#ffffff',
  bg:      '#f7faf9',
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

/* ─── FEATURE DATA ─────────────────────────────────────────────── */
const FEATURES = [
  { key: 'autoapply',   label: 'AI Auto Apply',     color: T.accent  },
  { key: 'outreach',    label: 'AI Outreach Agent', color: T.dark    },
  { key: 'resume',      label: 'Resume Builder',    color: T.accentD   },
  { key: 'interview',   label: 'Interview Coach',   color: T.accent  },
  { key: 'interviewer', label: 'AI Interviewer',    color: T.dark    },
  { key: 'tracker',     label: 'Job Tracker',       color: T.accentD },
]

/* ─── Shared micro-components ─────────────────────────────────── */
const Chip = ({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) => (
  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color, background: bg, borderRadius: 20, padding: '2px 8px', whiteSpace: 'nowrap' as const, letterSpacing: 0.3 }}>
    {children}
  </span>
)

const Row = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', ...style }}>{children}</div>
)

const Dot = ({ color, pulse }: { color: string; pulse?: boolean }) => (
  <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0, ...(pulse ? { animation: 'nhPulse 1.2s ease infinite' } : {}) }} />
)

/* ═══════════════════════════════════════════════════════════════
   01 — AI AUTO APPLY
═══════════════════════════════════════════════════════════════ */
function AutoApplyMockup() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % 3), 2000)
    return () => clearInterval(id)
  }, [])

  const jobs = [
    { co: 'Stripe', role: 'Sr. Engineer',   match: 97, status: 'Applied',   sc: T.green,   sb: 'rgba(34,197,94,0.10)'    },
    { co: 'Notion', role: 'AI Product Lead', match: 94, status: 'Applying…', sc: T.accent,  sb: 'rgba(95,168,158,0.10)'   },
    { co: 'Linear', role: 'Staff Frontend',  match: 91, status: 'In Queue',  sc: T.muted,   sb: 'rgba(138,173,168,0.10)'  },
    { co: 'Figma',  role: 'Design Systems',  match: 88, status: 'In Queue',  sc: T.muted,   sb: 'rgba(138,173,168,0.10)'  },
    { co: 'Vercel', role: 'Platform Eng.',   match: 85, status: 'In Queue',  sc: T.muted,   sb: 'rgba(138,173,168,0.10)'  },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 12 }}>
      {/* Status row — divider matches .hiw-panel-footer */}
      <Row style={{ justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #edf5f1' }}>
        <Row style={{ gap: 7 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>Agent Active</span>
        </Row>
        <Row style={{ gap: 6 }}>
          <Chip color={T.accent} bg="rgba(95,168,158,0.10)">847 scanned</Chip>
          <Chip color={T.green}  bg="rgba(34,197,94,0.10)">312 applied</Chip>
        </Row>
      </Row>

      {/* Job rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, overflowY: 'hidden' }}>
        {jobs.map((j, i) => (
          <div key={j.co} style={{
            display: 'flex', alignItems: 'center', gap: 13,
            background: i === active ? '#dff0ea' : '#f3f8f6',
            borderRadius: 14, padding: '14px 18px',
            transition: 'all 0.35s ease',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: i === active ? T.accent : '#ddeae4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: WEIGHT.extra, color: i === active ? T.white : T.muted, flexShrink: 0, transition: 'all 0.35s' }}>
              {j.co[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: WEIGHT.bold, color: T.dark }}>{j.co}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 1 }}>{j.role}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: WEIGHT.extra, color: T.accent }}>{j.match}%</span>
              <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: j.sc, background: j.sb, borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap' }}>{j.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Row style={{ justifyContent: 'space-between', paddingTop: 12, marginTop: 'auto', borderTop: '1px solid #edf5f1' }}>
        <span style={{ fontSize: 12, color: T.muted }}>Daily limit: <strong style={{ color: T.dark }}>0 / 5 remaining</strong></span>
        <span style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: T.accentD, background: 'rgba(61,122,114,0.09)', borderRadius: 6, padding: '3px 9px' }}>82% ATS pass rate</span>
      </Row>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   02 — AI OUTREACH AGENT
═══════════════════════════════════════════════════════════════ */
function OutreachMockup() {
  const [replies, setReplies] = useState(0)
  useEffect(() => {
    const ids = [0,1,2].map((_, i) => setTimeout(() => setReplies(i + 1), 900 + i * 1500))
    const reset = setTimeout(() => setReplies(0), 7200)
    return () => { ids.forEach(clearTimeout); clearTimeout(reset) }
  }, [])

  const people = [
    { init: 'S', name: 'Sarah Kim',  title: 'VP Eng · Stripe',          msg: '"Impressive. Let\'s connect."',    c: T.green   },
    { init: 'T', name: 'Tom Barnes', title: 'EM Design · Figma',         msg: '"Would love to hear more."',       c: T.accent  },
    { init: 'P', name: 'Priya Shah', title: 'Head of Product · Notion',  msg: '"Great timing — we\'re hiring."', c: T.accentD },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 12 }}>
      {/* Signal card */}
      <div style={{ background: '#dff0ea', borderRadius: 14, padding: '14px 16px' }}>
        <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <Row style={{ gap: 6 }}>
            <Dot color={T.green} pulse />
            <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.accentD, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Signal Detected</span>
          </Row>
          <Chip color={T.green} bg="rgba(34,197,94,0.12)">Live</Chip>
        </Row>
        <div style={{ fontSize: 14, fontWeight: WEIGHT.bold, color: T.dark, marginBottom: 4 }}>
          Stripe Engineering grew 18% in 60 days
        </div>
        <div style={{ fontSize: 12, color: T.muted }}>
          Platform Engineer match · sent from <strong style={{ color: T.mid }}>you@gmail.com</strong>
        </div>
      </div>

      {/* Replies */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'hidden' }}>
        <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Replies · {replies} / 3</span>
        {people.map((p, i) => (
          replies > i ? (
            <div key={p.name} style={{ display: 'flex', gap: 10, animation: `nhSlideIn 0.34s ${EASE_OUT}` }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: p.c + '18', border: `1.5px solid ${p.c}40`, color: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: WEIGHT.extra, flexShrink: 0 }}>{p.init}</div>
              <div style={{ flex: 1, background: '#f3f8f6', borderRadius: 12, padding: '10px 14px' }}>
                <Row style={{ justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>{p.name}</span>
                </Row>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 5 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: p.c, fontStyle: 'italic' as const }}>{p.msg}</div>
              </div>
            </div>
          ) : (
            <div key={p.name} style={{ height: 62, background: '#f3f8f6', borderRadius: 12, border: `1px dashed ${T.border}` }} />
          )
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[{ n: '64%', l: 'Open Rate', c: T.accent }, { n: '31%', l: 'Reply Rate', c: T.green }].map(s => (
          <div key={s.l} style={{ background: '#f3f8f6', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 5 }}>{s.l}</div>
          </div>
        ))}
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 16 }}>
      {/* Target */}
      <div style={{ background: '#dff0ea', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>Tailored resume for</div>
          <div style={{ fontSize: 15, fontWeight: WEIGHT.bold, color: T.dark }}>Stripe · Senior Engineer</div>
        </div>
        <Chip color={T.accentD} bg="rgba(61,122,114,0.10)">Expert reviewing</Chip>
      </div>

      {/* Keyword bars */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Keyword Match Score</span>
        {keywords.map(k => (
          <div key={k.label}>
            <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: T.mid, fontWeight: WEIGHT.medium }}>{k.label}</span>
              <span style={{ fontSize: 13, fontWeight: WEIGHT.extra, color: k.color }}>{k.pct}%</span>
            </Row>
            <div style={{ height: 7, background: '#e4f0eb', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${k.pct}%`, background: k.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ borderTop: '1px solid #edf5f1', paddingTop: 12 }}>
        <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Sections</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {['Experience ✓', 'Skills ✓', 'Impact Metrics ✓', 'Projects ✓', 'Summary ✓'].map(s => (
            <span key={s} style={{ fontSize: 12, fontWeight: WEIGHT.semi, color: T.accentD, background: 'rgba(61,122,114,0.08)', border: `1px solid rgba(61,122,114,0.18)`, borderRadius: 20, padding: '4px 11px' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Row style={{ justifyContent: 'space-between', fontSize: 12, color: T.muted }}>
        <span>Generated in <strong style={{ color: T.dark }}>12s</strong></span>
        <span>3 variants ready</span>
      </Row>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   04 — INTERVIEW COACH
═══════════════════════════════════════════════════════════════ */
function InterviewCoachMockup() {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 900)
    const t2 = setTimeout(() => setStage(2), 2400)
    const t3 = setTimeout(() => setStage(3), 3800)
    const reset = setTimeout(() => setStage(0), 7000)
    return () => [t1, t2, t3, reset].forEach(clearTimeout)
  }, [])

  const scores = [
    { l: 'Structure',  v: 88, c: T.green   },
    { l: 'Clarity',    v: 74, c: T.accentD },
    { l: 'Confidence', v: 91, c: T.accent  },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 12 }}>
      {/* Session bar */}
      <Row style={{ justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #edf5f1' }}>
        <Row style={{ gap: 7 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>Mock Interview · Stripe PM</span>
        </Row>
        <Row style={{ gap: 8 }}>
          <span style={{ fontSize: 12, color: T.muted }}>Round 2 / 3</span>
          <span style={{ fontSize: 12, color: T.muted }}>04:05</span>
        </Row>
      </Row>

      {/* Question */}
      <div style={{ background: '#dff0ea', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.accent, marginBottom: 6, letterSpacing: 0.5 }}>Q2 · Behavioural</div>
        <div style={{ fontSize: 14, fontWeight: WEIGHT.semi, color: T.dark, lineHeight: 1.55 }}>
          &quot;Tell me about a product you launched from 0→1.&quot;
        </div>
      </div>

      {/* Answer */}
      {stage >= 1 && (
        <div style={{ alignSelf: 'flex-end', background: T.dark, color: '#fff', fontSize: 13, lineHeight: 1.6, padding: '10px 14px', borderRadius: '14px 14px 4px 14px', maxWidth: '88%', animation: `nhPop 0.34s ${EASE_OUT}` }}>
          We were building the 0→1 analytics product at Series B. Owned end-to-end: scoped with customers, designed the schema, shipped in 6 weeks.
        </div>
      )}

      {/* Coaching tip */}
      {stage >= 2 && (
        <div style={{ background: '#f3f8f6', borderRadius: 12, padding: '12px 14px', animation: `nhPop 0.34s ${EASE_OUT}` }}>
          <div style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.accentD, marginBottom: 5, letterSpacing: 0.5 }}>AI COACHING TIP</div>
          <div style={{ fontSize: 12, color: T.mid, lineHeight: 1.6 }}>
            <span style={{ color: T.green }}>✓ Strong:</span> Clear ownership + timeline<br />
            <span style={{ color: T.accentD }}>△ Improve:</span> Add a metric — e.g. DAUs, retention lift
          </div>
        </div>
      )}

      {/* Scores */}
      {stage >= 3 && (
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, animation: `nhPop 0.34s ${EASE_OUT}` }}>
          {scores.map(s => (
            <div key={s.l} style={{ background: '#f3f8f6', borderRadius: 12, padding: '13px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{s.l}</div>
              <div style={{ height: 3, background: '#e4f0eb', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.v}%`, background: s.c, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   05 — AI INTERVIEWER
═══════════════════════════════════════════════════════════════ */
function AIInterviewerMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => setPhase(3), 4600)
    const reset = setTimeout(() => setPhase(0), 7500)
    return () => [t1, t2, t3, reset].forEach(clearTimeout)
  }, [])

  const questions = [
    'Tell me about a product you launched from 0→1.',
    'How do you prioritise when everything is urgent?',
    'Describe a time you used data to change direction.',
  ]
  const bars = [3, 5, 7, 5, 8, 4, 6, 4, 7, 5, 3]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 14 }}>
      {/* Interviewer card */}
      <div style={{ background: '#dff0ea', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(95,168,158,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: WEIGHT.bold, color: T.dark }}>AI Interviewer</div>
          <div style={{ fontSize: 12, color: T.muted }}>Calibrated to: Stripe · PM · Senior</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 24 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 3, borderRadius: 2, background: T.accent, height: `${phase > 0 ? h * 3 : 6}px`, transition: 'height 0.3s ease', opacity: phase > 0 ? 1 : 0.35 }} />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {questions.map((q, i) => (
          <div key={q} style={{
            background: phase > i ? '#dff0ea' : '#f3f8f6',
            borderRadius: 12, padding: '12px 14px',
            transition: 'all 0.4s ease',
            ...(phase > i ? { animation: `nhSlideIn 0.34s ${EASE_OUT}` } : {}),
          }}>
            <Row style={{ gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: WEIGHT.extra, color: phase > i ? T.accent : T.muted, minWidth: 22 }}>Q{i + 1}</span>
              <span style={{ fontSize: 13, color: phase > i ? T.dark : T.muted, lineHeight: 1.5 }}>{q}</span>
            </Row>
          </div>
        ))}
      </div>

      {/* Progress */}
      <Row style={{ gap: 12, paddingTop: 10, borderTop: '1px solid #edf5f1' }}>
        <div style={{ flex: 1, height: 5, background: '#e4f0eb', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(phase / 5) * 100}%`, background: T.accent, borderRadius: 4, transition: 'width 0.5s ease' }} />
        </div>
        <span style={{ fontSize: 12, color: T.muted, whiteSpace: 'nowrap' as const }}>{phase} / 5</span>
        {phase >= 3 && (
          <div style={{ background: '#dff0ea', borderRadius: 8, padding: '4px 12px', animation: `nhPop 0.34s ${EASE_OUT}` }}>
            <span style={{ fontSize: 14, fontWeight: WEIGHT.extra, color: T.dark }}>84</span>
            <span style={{ fontSize: 12, color: T.muted }}> /100</span>
          </div>
        )}
      </Row>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   06 — JOB TRACKER
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, gap: 14 }}>
      {/* Header */}
      <Row style={{ justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #edf5f1' }}>
        <span style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>Application Pipeline</span>
        <Row style={{ gap: 6 }}>
          <Dot color={T.green} pulse />
          <span style={{ fontSize: 12, color: T.muted }}>Auto-tracked</span>
        </Row>
      </Row>

      {/* Kanban */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, alignItems: 'start' }} className="vas-kanban-grid">
        {columns.map((col, ci) => (
          <div key={col.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Row style={{ gap: 5, marginBottom: 4 }}>
              <Dot color={col.color} />
              <span style={{ fontSize: 11, fontWeight: WEIGHT.bold, color: T.mid }}>{col.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: T.muted }}>{col.jobs.length}</span>
            </Row>
            {col.jobs.map(j => (
              <div key={j.co} style={{
                background: highlight === ci ? col.color + '16' : '#f3f8f6',
                borderRadius: 10, padding: '10px 10px',
                transition: 'all 0.4s ease',
              }}>
                <div style={{ fontSize: 13, fontWeight: WEIGHT.bold, color: T.dark }}>{j.co}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{j.role}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Funnel */}
      <div style={{ paddingTop: 12, borderTop: '1px solid #edf5f1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 10 }}>
          {[
            { n: '312', l: 'Applied',    c: T.accent  },
            { n: '28',  l: 'Screening',  c: T.accentD },
            { n: '11',  l: 'Interviews', c: T.accentD },
            { n: '3',   l: 'Offers',     c: T.green   },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10, color: T.muted, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 5, background: '#e4f0eb', borderRadius: 4, overflow: 'hidden', display: 'flex', gap: 2 }}>
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
  autoapply:   AutoApplyMockup,
  outreach:    OutreachMockup,
  resume:      ResumeMockup,
  interview:   InterviewCoachMockup,
  interviewer: AIInterviewerMockup,
  tracker:     JobTrackerMockup,
}

/* ─── Step descriptions ───────────────────────────────────────── */
const FEATURE_DESCS: Record<string, string> = {
  autoapply:   'Scans thousands of listings daily and submits tailored applications on your behalf — 24/7.',
  outreach:    'Detects hiring signals and sends personalised messages to decision-makers before jobs go public.',
  resume:      'Generates a role-specific resume in seconds, scored against the job description keywords.',
  interview:   'Practice unlimited mock interviews with AI feedback on structure, clarity, and delivery.',
  interviewer: 'Conducts full structured interviews, scores every answer, and delivers a shortlist with transcripts.',
  tracker:     'Automatically logs every application and moves them through your pipeline as statuses update.',
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
    <section id="full-platform" style={{ background: '#ffffff', padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)' }}>
      <style suppressHydrationWarning>{STYLES}</style>

      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: 72, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(95,168,158,0.10)', color: T.accentD, padding: '4px 14px', borderRadius: 100, fontSize: 11, fontWeight: WEIGHT.bold, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 18 }}>
            The full platform
          </div>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            margin: '0 0 20px',
            lineHeight: 1.22,
            letterSpacing: '-0.5px',
            maxWidth: 900,
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>Everything works for you,</span>
            <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>while you focus on</span>
            <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>what matters</span>
          </h2>
          <p style={{ fontSize: 17, color: T.mid, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
            Six AI-powered tools, one platform. Each does its job — together they replace a full recruiting team.
          </p>
        </div>

        {/* ── Main layout: left accordion + right mockup ── */}
        <div className="vas-grid">

          {/* ── Left: accordion — column min-height matches right so page doesn’t jump ── */}
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
            {/* Window chrome card */}
            <div key={active} className="vas-card vas-card-enter">
              <div className="vas-panel-inner">
                {/* Same header pattern as HowItWorksSection .hiw-panel-header */}
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
