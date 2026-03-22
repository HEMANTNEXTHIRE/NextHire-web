'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

/* ─── Palette ────────────────────────────────────────────────── */
const P = {
  surface: '#ffffff',
  bg:      '#edf5f1',
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

/* ─── Card data ─────────────────────────────────────────────── */
const CARDS = [
  {
    bg: P.surface,
    tag: '01 · AI Auto Apply',
    title: 'Apply to hundreds of jobs while you sleep',
    desc: 'Your agent submits applications across every major portal on your behalf — each one with a role-specific resume tuned to the job description.',
    features: [
      { title: 'ATS-Optimised Resumes', desc: 'AI matches keywords and structure to every JD before sending.' },
      { title: 'Portal Coverage', desc: 'LinkedIn, Indeed, Naukri, Greenhouse, Lever and 60+ more.' },
      { title: 'Quality Guardrails', desc: 'Human experts review before the first batch goes out.' },
      { title: 'Auto Job Tracker', desc: 'Every application logged, every follow-up scheduled automatically.' },
    ],
    stat1: { n: '40×', l: 'more reach vs manual' },
    stat2: { n: '82%', l: 'ATS pass rate' },
    imgContent: 'autoapply',
  },
  {
    bg: '#f7faf9',
    tag: '02 · AI Outreach Agent',
    title: 'Reach hiring managers before the role goes live',
    desc: 'Personalised emails sent from your own Gmail to HRs, founders, and hiring managers based on real hiring signals. CASA Level 3 certified privacy.',
    features: [
      { title: 'Signal-Based Targeting', desc: 'Detects team growth, tenure gaps, and LinkedIn hiring activity.' },
      { title: 'Direct Recruiter InMail', desc: 'Reaches decision-makers directly, not through application portals.' },
      { title: 'Your Identity, Always', desc: 'Sent from your Gmail — not a third-party system.' },
      { title: 'Career Page Monitoring', desc: 'Tracks company career pages for new posts before they spread.' },
    ],
    stat1: { n: '64%', l: 'avg email open rate' },
    stat2: { n: '31%', l: 'reply rate' },
    imgContent: 'outreach',
  },
  {
    bg: P.surface,
    tag: '03 · Resume Builder',
    title: 'A new resume for every role — in seconds',
    desc: 'AI generates a tailored, ATS-optimised resume matched to the exact job description. Our experts review and refine it. Nothing generic ever goes out.',
    features: [
      { title: 'JD-Matched Keywords', desc: 'Every resume aligned to the role\'s required skills and language.' },
      { title: 'Expert Human Review', desc: 'Advisors check structure, tone, and impact before delivery.' },
      { title: 'Portal Optimisation', desc: 'Formatted for ATS, Google Hire, and recruiter scanning tools.' },
      { title: 'Version Library', desc: 'Every variant saved — swap and reuse for similar roles.' },
    ],
    stat1: { n: '82%', l: 'ATS pass rate' },
    stat2: { n: '12s', l: 'avg resume generation' },
    imgContent: 'resume',
  },
  {
    bg: '#f7faf9',
    tag: '04 · Interview Coach',
    title: 'Walk into every interview already prepared',
    desc: 'Practice with AI mock interviewers calibrated to your target company and role. Get real-time coaching during live calls and a detailed score breakdown after every session.',
    features: [
      { title: 'Role-Specific Mock Rounds', desc: 'Scenarios built from real interview patterns at your target companies.' },
      { title: 'Live Call Copilot', desc: 'The AI listens in and surfaces answers and examples in real time.' },
      { title: 'Simulate Full Rounds', desc: 'Voice, turn-taking, and pressure — just like the real thing.' },
      { title: 'Score & Debrief', desc: 'Structured feedback on clarity, confidence, and answer quality.' },
    ],
    stat1: { n: '3×', l: 'more offers after coaching' },
    stat2: { n: '500+', l: 'interview scenarios' },
    imgContent: 'interview',
  },
  {
    bg: P.surface,
    tag: '05 · AI Interviewer',
    title: 'Full interview simulation — voice, pressure, feedback',
    desc: 'Step into a realistic AI-conducted interview tailored to your target company, role seniority, and interview style. No notes. No pausing. Just the real thing.',
    features: [
      { title: 'Company-Calibrated', desc: 'Questions drawn from real interview loops at Stripe, Google, Notion and more.' },
      { title: 'Voice & Turn-Taking', desc: 'Speaks, listens, and adapts — mimicking a real interviewer\'s pacing.' },
      { title: 'Pressure Mode', desc: 'Intentionally challenging follow-ups to stress-test your answers.' },
      { title: 'Instant Transcript', desc: 'Full recording and transcript with per-answer commentary.' },
    ],
    stat1: { n: '91%', l: 'confidence improvement' },
    stat2: { n: '200+', l: 'company profiles' },
    imgContent: 'aiinterviewer',
  },
  {
    bg: '#f7faf9',
    tag: '06 · Job Tracker',
    title: 'Never lose track of where you stand',
    desc: 'A unified pipeline view across every application your agent has filed, every outreach sent, and every interview booked. Nothing slips through the cracks.',
    features: [
      { title: 'Pipeline Board', desc: 'Kanban-style view: Applied → Screening → Interview → Offer.' },
      { title: 'Auto-Populated', desc: 'Every agent action logged automatically — no manual input needed.' },
      { title: 'Follow-Up Reminders', desc: 'Nudges sent before ghosting windows close.' },
      { title: 'Offer Comparison', desc: 'Side-by-side comp, role, and team breakdown to help you decide.' },
    ],
    stat1: { n: '0', l: 'missed follow-ups' },
    stat2: { n: '100%', l: 'applications tracked' },
    imgContent: 'jobtracker',
  },
]

/* ─────────────────────────────────────────────────────────────
   Mockup components — clean white UI panels, no dark surfaces
───────────────────────────────────────────────────────────── */

/* Shared micro-components */
const Badge = ({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) => (
  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color, background: bg, borderRadius: 5, padding: '2px 8px', whiteSpace: 'nowrap' }}>
    {children}
  </span>
)
const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.accent, letterSpacing: 1.4, textTransform: 'uppercase' as const, marginBottom: 10 }}>
    {children}
  </div>
)
const Divider = () => <div style={{ height: 1, background: P.border, margin: '4px 0' }} />

/* 01 — Auto Apply */
function AutoApplyMockup() {
  const rows = [
    { company: 'Stripe',  role: 'Senior Engineer',    status: 'Applied',   statusColor: P.green,  statusBg: P.mint },
    { company: 'Notion',  role: 'AI Product Manager', status: 'Applying…', statusColor: P.accent, statusBg: P.mint   },
    { company: 'Linear',  role: 'Staff Frontend',     status: 'In Queue',  statusColor: P.muted,  statusBg: P.mint },
    { company: 'Figma',   role: 'Design Systems',     status: 'In Queue',  statusColor: P.muted,  statusBg: P.mint },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <Label>Agent Applying · Live</Label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map(r => (
          <div key={r.company} style={{
            background: P.surface, border: `1px solid ${P.border}`,
            borderRadius: 10, padding: '10px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.dark }}>{r.company}</div>
              <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>{r.role}</div>
            </div>
            <Badge color={r.statusColor} bg={r.statusBg}>{r.status}</Badge>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1 }}>847</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 3 }}>Jobs scanned</div>
          </div>
          <div style={{ width: 1, background: P.border }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.accent, lineHeight: 1 }}>312</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 3 }}>Applications sent</div>
          </div>
          <div style={{ width: 1, background: P.border }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.green, lineHeight: 1 }}>82%</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 3 }}>ATS pass rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 02 — Outreach */
function OutreachMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <Label>Outreach Preview</Label>

      {/* Email card */}
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 12, padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontSize: FONT.xs, color: P.muted }}>To: <span style={{ color: P.dark, fontWeight: WEIGHT.semi }}>marcus@stripe.com</span></div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>Head of Engineering · Stripe</div>
          </div>
          <Badge color={P.accent} bg={P.mint}>Auto-deleted after send</Badge>
        </div>
        <Divider />
        {/* Body */}
        <div style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65 }}>
          Hi Marcus, I noticed Stripe&apos;s infra team grew 18% in 60 days — usually a signal for a Platform Engineer hire before it&apos;s posted publicly.
        </div>
        <div style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65 }}>
          I&apos;ve led distributed systems at two Series B companies. Happy to connect if timing works.
        </div>
        {/* Signal tag */}
        <div style={{ marginTop: 'auto', background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 8, padding: '8px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: P.green, flexShrink: 0, boxShadow: `0 0 6px ${P.green}` }} />
          <span style={{ fontSize: FONT.xs, color: P.mid }}>Signal: <strong>Team +18% in 60 days</strong> · hiring likely pre-posting</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[{ l: 'Open Rate', v: '64%', c: P.accent }, { l: 'Reply Rate', v: '31%', c: P.green }].map(s => (
          <div key={s.l} style={{ background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 10, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 03 — Resume Builder */
function ResumeMockup() {
  const skills = [
    { label: 'Distributed Systems', match: 98 },
    { label: 'System Design',       match: 95 },
    { label: 'TypeScript / Go',     match: 92 },
  ]
  const sections = ['Experience', 'Skills', 'Impact Metrics', 'Projects']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <Label>Resume Builder · Generating</Label>

      <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 12, padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Target row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark }}>Tailored for: Stripe · Senior Engineer</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>Generated in 12s · 3 variants ready</div>
          </div>
          <Badge color={P.accentD} bg={P.mint}>Expert reviewing</Badge>
        </div>
        <Divider />
        {/* Keyword match bars */}
        {skills.map(kw => (
          <div key={kw.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: FONT.xs }}>
              <span style={{ color: P.mid, fontWeight: WEIGHT.medium }}>{kw.label}</span>
              <span style={{ color: P.accent, fontWeight: WEIGHT.bold }}>{kw.match}% match</span>
            </div>
            <div style={{ height: 5, background: P.mint, borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${kw.match}%`, background: P.accent, borderRadius: 4 }} />
            </div>
          </div>
        ))}
        <Divider />
        {/* Section checklist */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sections.map(s => (
            <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: FONT.xs, color: P.mid, background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 6, padding: '3px 9px' }}>
              <span style={{ color: P.green, fontWeight: WEIGHT.bold }}>✓</span> {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* 04 — Interview Coach */
function InterviewMockup() {
  const scores = [
    { l: 'Structure',   v: 88, color: P.accent },
    { l: 'Clarity',     v: 74, color: P.accentD  },
    { l: 'Confidence',  v: 91, color: P.green  },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <Label>Mock Interview · Stripe PM</Label>

      {/* Question card */}
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 12, padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: P.green, boxShadow: `0 0 6px ${P.green}` }} />
          <span style={{ fontSize: FONT.xs, color: P.muted }}>Round 2 of 3 · Behavioural</span>
        </div>
        <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.accent, letterSpacing: 0.5 }}>Q2</div>
        <div style={{ fontSize: FONT.sm, color: P.dark, lineHeight: 1.6, fontWeight: WEIGHT.medium }}>
          &quot;Tell me about a product you launched from 0→1.&quot;
        </div>
        <div style={{ background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.accent, marginBottom: 5 }}>Coaching Tip</div>
          <div style={{ fontSize: FONT.xs, color: P.mid, lineHeight: 1.55 }}>Use STAR format — lead with the constraint, not the solution. Mention tradeoffs explicitly.</div>
        </div>
      </div>

      {/* Score bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {scores.map(s => (
          <div key={s.l} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 10, padding: '12px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginBottom: 6 }}>
              <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: s.color, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: FONT.xs, color: P.muted, paddingBottom: 2 }}>/100</div>
            </div>
            <div style={{ height: 3, background: P.mint, borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${s.v}%`, background: s.color, borderRadius: 2 }} />
            </div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 5 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 05 — AI Interviewer */
function AIInterviewerMockup() {
  const questions = [
    { q: 'Q1', text: 'Tell me about a product you launched from 0→1.', active: true  },
    { q: 'Q2', text: 'How do you prioritise when everything is urgent?',  active: false },
    { q: 'Q3', text: 'Describe a time you used data to change direction.', active: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <Label>AI Interviewer · Product Manager</Label>

      {/* Interviewer card */}
      <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: P.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: FONT.md }}>🤖</span>
        </div>
        <div>
          <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark }}>AI Interviewer</div>
          <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>Calibrated to: Stripe · PM · Senior</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {[3,5,4,6,3,5,4].map((h,i) => (
            <div key={i} style={{ width: 3, height: h * 3, background: i === 3 ? P.accent : P.sage, borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {questions.map(q => (
          <div key={q.q} style={{
            background: q.active ? P.mint : P.surface,
            border: `1px solid ${q.active ? P.sage : P.border}`,
            borderRadius: 10, padding: '10px 14px',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: q.active ? P.accent : P.muted, minWidth: 16 }}>{q.q}</span>
            <span style={{ fontSize: FONT.sm, color: q.active ? P.dark : P.muted, lineHeight: 1.5 }}>{q.text}</span>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
        <div style={{ flex: 1, height: 4, background: P.mint, borderRadius: 4 }}>
          <div style={{ width: `${(1/5)*100}%`, height: '100%', background: P.accent, borderRadius: 4 }} />
        </div>
        <span style={{ fontSize: FONT.xs, color: P.muted, marginLeft: 12 }}>1 / 5</span>
      </div>
    </div>
  )
}

/* 06 — Job Tracker */
function JobTrackerMockup() {
  const cols = [
    { label: 'Applied',    color: P.accent, jobs: ['Stripe · Eng',   'Notion · PM'  ] },
    { label: 'Screening',  color: P.muted,  jobs: ['Linear · Design'               ] },
    { label: 'Interview',  color: P.accentD, jobs: ['Figma · Systems'              ] },
    { label: 'Offer',      color: P.green,  jobs: ['Vercel · Staff'                ] },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      <Label>Job Tracker · Pipeline</Label>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, flex: 1 }}>
        {cols.map(col => (
          <div key={col.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Column header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: col.color }} />
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.mid }}>{col.label}</span>
            </div>
            {/* Cards */}
            {col.jobs.map(j => (
              <div key={j} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, color: P.dark, lineHeight: 1.4 }}>{j.split(' · ')[0]}</div>
                <div style={{ fontSize: FONT.xs, color: P.muted }}>{j.split(' · ')[1]}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Divider />

      {/* Summary stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {[
          { n: '312', l: 'Applied',     c: P.accent },
          { n: '28',  l: 'Screening',   c: P.muted  },
          { n: '11',  l: 'Interviews',  c: P.accentD },
          { n: '3',   l: 'Offers',      c: P.green  },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKUPS: Record<string, React.ReactNode> = {
  autoapply:    <AutoApplyMockup />,
  outreach:     <OutreachMockup />,
  resume:       <ResumeMockup />,
  interview:    <InterviewMockup />,
  aiinterviewer:<AIInterviewerMockup />,
  jobtracker:   <JobTrackerMockup />,
}

/* ─── Component ─────────────────────────────────────────────── */
export default function HireSection() {
  const wrapperRef     = useRef<HTMLDivElement>(null)
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([])
  const nextSiblingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Helper: strip only GSAP-managed styles (height, transform) — NOT position/top (those are in JSX/CSS)
    const resetCardStyles = () => {
      cardRefs.current.forEach(card => {
        if (!card) return
        card.style.removeProperty('height')
        card.style.removeProperty('transform')
      })
      const wrapper = wrapperRef.current
      if (wrapper) {
        wrapper.style.removeProperty('transform')
        wrapper.style.removeProperty('height')
      }
    }

    const init = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (cards.length === 0) return

      // GSAP only handles desktop height normalisation
      // position:sticky and top values are in JSX (desktop) and CSS (mobile override)
      const isMobileView = window.matchMedia('(max-width: 860px)').matches
      // These match the JSX top values (desktop) and CSS overrides (mobile)
      const topBase = isMobileView ? 68 : 100
      const topGap  = isMobileView ? 44 : 88

      ScrollTrigger.getAll().forEach(t => t.kill())

      // Desktop only: normalise all card heights to the tallest card
      if (!isMobileView) {
        const maxH = Math.max(...cards.map(c => c.offsetHeight))
        cards.forEach(c => { c.style.height = `${maxH}px` })
      }

      const wrapperH = wrapper.offsetHeight
      wrapper.setAttribute('data-height', String(wrapperH))

      cards.forEach((card, i) => {
        const topOffset   = topGap * i + topBase
        const endDistance = i === cards.length - 1 ? 0 : card.offsetHeight
        gsap.to(card, {
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: `top ${topOffset}`,
            end: `+=${endDistance}`,
            scrub: 0.8,
            onLeave: () => {
              if (i === cards.length - 1) {
                wrapper.classList.add('nh-sticky-remove')
                wrapper.style.height = `${wrapperH}px`
              }
            },
            onEnterBack: () => {
              if (i === cards.length - 1) {
                wrapper.classList.remove('nh-sticky-remove')
                wrapper.style.height = 'auto'
              }
            },
            onEnter: () => {
              if (i > 2) {
                const shift = topGap * (i - 2)
                wrapper.style.transform = `translateY(-${shift}px)`
                if (nextSiblingRef.current) nextSiblingRef.current.style.marginTop = `-${shift}px`
                if (cards[i - 3]) cards[i - 3].classList.add('nh-card-moveup')
              }
            },
            onLeaveBack: () => {
              if (i > 2) {
                const shift = topGap * (i - 3)
                wrapper.style.transform = `translateY(-${shift}px)`
                if (nextSiblingRef.current) nextSiblingRef.current.style.marginTop = `-${shift}px`
                if (cards[i - 3]) cards[i - 3].classList.remove('nh-card-moveup')
              }
            },
          },
        })
      })

      ScrollTrigger.refresh()
    }

    // Initial run: wait for fonts + paint
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => requestAnimationFrame(init))
      })
    } else {
      requestAnimationFrame(() => requestAnimationFrame(init))
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      resetCardStyles()
    }
  }, [])

  return (
    <section id="features" style={{ background: P.bg, padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 80px' }}>
          <div style={{ marginBottom: 20, height: 32 }} aria-hidden="true" />
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            margin: '0 0 20px',
            lineHeight: 1.22,
            letterSpacing: '-0.5px',
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>While you focus on</span>
            <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>what matters.</span>
          </h2>
          <p style={{ fontSize: FONT.md, color: P.mid, lineHeight: 1.7, margin: 0, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Six tools. One agent. Running around the clock so your job search never pauses.
          </p>
        </div>

        {/* Sticky stacked cards */}
        <div ref={wrapperRef} className="nh-hire-wrapper" style={{ transition: 'transform 1s, height 1s' }}>
          {CARDS.map((card, i) => (
            <div
              key={card.tag}
              ref={el => { cardRefs.current[i] = el }}
              className="nh-sticky-card"
              style={{
                background: card.bg,
                border: `1px solid ${P.border}`,
                borderRadius: 20,
                minHeight: 480,
                marginBottom: 40,
                padding: '44px 44px 44px 48px',
                display: 'flex',
                gap: 56,
                alignItems: 'flex-start',
                position: 'sticky',
                top: `${88 * i + 100}px`,   /* desktop; CSS overrides for mobile */
                boxShadow: '0 4px 32px rgba(37,62,66,0.07)',
                transition: 'opacity 1s',
              }}
            >
              {/* ── Left: text ── */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: 1.8, color: P.accent, textTransform: 'uppercase', marginBottom: 14 }}>
                  {card.tag}
                </div>
                <h3 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.dark, margin: '0 0 14px', lineHeight: 1.22, letterSpacing: '-0.4px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: FONT.base, color: P.mid, lineHeight: 1.72, margin: '0 0 28px' }}>
                  {card.desc}
                </p>
                <div className="nh-card-features" style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
                  {card.features.map(f => (
                    <div key={f.title} style={{ flex: '0 0 calc(50% - 9px)', borderLeft: `2px solid ${P.sage}`, paddingLeft: 16, paddingTop: 2 }}>
                      <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark, marginBottom: 5, lineHeight: 1.3 }}>{f.title}</div>
                      <div style={{ fontSize: FONT.sm, color: P.muted, lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: mockup + stats ── */}
              <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* Mockup panel — always white */}
                <div className="nh-card-mockup" style={{
                  background: P.surface,
                  borderRadius: 16,
                  padding: 24,
                  border: `1px solid ${P.border}`,
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 16px rgba(37,62,66,0.06)',
                }}>
                  {MOCKUPS[card.imgContent]}
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 32, marginTop: 22, paddingTop: 16 }}>
                  {[card.stat1, card.stat2].map(s => (
                    <div key={s.l}>
                      <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 5 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={nextSiblingRef} style={{ height: 0 }} />
      </div>
    </section>
  )
}
