'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { FONT, WEIGHT, SERIF } from '@/constants/typography'


/* ─── Palette ────────────────────────────────────────────────── */
const P = {
  surface: '#ffffff',
  bg:      '#f5faf7',
  mint:    '#e8f5ee',
  sage:    '#c8dfd6',
  border:  '#e0ece6',
  accent:  '#338632',
  accentD: '#338632',
  dark:    '#132128',
  mid:     '#424D53',
  muted:   '#8aada8',
  green:   '#338632',
  cardBg:  '#eef7f3',
}

/* ─── Card data ─────────────────────────────────────────────── */
const CARDS = [
  {
    bg: '#eef7f3',
    tag: 'AI Auto Apply',
    title: 'Apply to hundreds of\njobs while you sleep',
    features: [
      'ATS-optimised resumes tailored to every job description before sending',
      'Covers LinkedIn, Indeed, Naukri, Greenhouse, Lever and 60+ portals',
      'AI powered job recommendations tailored to your skills, experience, and career goals',
    ],
    stat1: { n: '40×', l: 'more reach vs manual' },
    stat2: { n: '82%', l: 'ATS pass rate' },
    imgContent: 'autoapply',
  },
  {
    bg: '#eef7f3',
    tag: 'AI Outreach Agent',
    title: 'Reach hiring managers\nbefore roles go live',
    features: [
      'Detects team growth, tenure gaps, and LinkedIn hiring signals in real time',
      'Hyper-personalised emails sent directly from your own Gmail address',
      'Tracks company career pages for new posts before they spread publicly',
    ],
    stat1: { n: '64%', l: 'avg email open rate' },
    stat2: { n: '31%', l: 'reply rate' },
    imgContent: 'outreach',
  },
  {
    bg: '#eef7f3',
    tag: 'Resume Builder',
    title: 'A new resume for\nevery role in seconds',
    features: [
      'Every resume aligned to the role\'s exact required skills and language',
      'Expert advisors check structure, tone, and impact before delivery',
      'Every variant saved — swap and reuse for similar future roles',
    ],
    stat1: { n: '82%', l: 'ATS pass rate' },
    stat2: { n: '12s', l: 'avg generation time' },
    imgContent: 'resume',
  },
  {
    bg: '#eef7f3',
    tag: 'Interview Coach',
    title: 'Walk into every interview\nalready prepared',
    features: [
      'Mock rounds built from real interview patterns at your target companies',
      'Live call copilot surfaces the right answers and examples in real time',
      'Structured score and debrief after every session — clarity, confidence, quality',
    ],
    stat1: { n: '3×', l: 'more offers after coaching' },
    stat2: { n: '500+', l: 'interview scenarios' },
    imgContent: 'interview',
  },
  {
    bg: '#eef7f3',
    tag: 'AI Interviewer',
    title: 'Full interview simulation —\nvoice, pressure, feedback',
    features: [
      'Questions calibrated to real interview loops at Stripe, Google, Notion and more',
      'Speaks, listens, and adapts — mimicking a real interviewer\'s pacing',
      'Intentionally challenging follow-ups to stress-test your answers under pressure',
    ],
    stat1: { n: '91%', l: 'confidence improvement' },
    stat2: { n: '200+', l: 'company profiles' },
    imgContent: 'aiinterviewer',
  },
  {
    bg: '#eef7f3',
    tag: 'Job Tracker',
    title: 'Never lose track of\nwhere you stand',
    features: [
      'Kanban pipeline: Applied → Screening → Interview → Offer, auto-populated',
      'Nudges sent before ghosting windows close — zero missed follow-ups',
      'Side-by-side offer comparison on comp, role, and team to help you decide',
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
const OUTREACH_LOGOS: Record<string, string> = {
  'Stripe':    '/company-logos/stripe.png',
  'Paypal':    '/company-logos/paypal.svg',
  'Revolut':   '/company-logos/revolut.png',
  'Paytm':     '/company-logos/paytm.png',
  'Razorpay':  '/company-logos/razorpay.png',
  'Visa':      '/company-logos/visa.png',
  'Mastercard':'/company-logos/mastercard.svg',
  'Ramp':      '/company-logos/ramp.png',
  'Brex':      '/company-logos/brex.png',
  'Coinbase':  '/company-logos/coinbase.svg',
}

const OUTREACH_ROWS = [
  { name: 'James Smith',       company: 'Stripe',     title: 'Talent Acquisition Manager', status: 'Replied',  statusColor: '#338632', statusBg: '#e8f5ee' },
  { name: 'Maria Martinez',    company: 'Paypal',     title: 'Talent Acquisition Specialist', status: 'Opened', statusColor: '#1d6fb8', statusBg: '#e8f0fb' },
  { name: 'Charles Wilson',    company: 'Razorpay',   title: 'HR Business Partner',        status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Atul Chaturvedi',   company: 'Visa',       title: 'Executive Manager HR',       status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Adhishree Gupta',   company: 'Ramp',       title: 'Senior Talent Acquisition',  status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Manish Sharma',     company: 'Brex',       title: 'Manager HRBP',               status: 'Sending', statusColor: '#b45309', statusBg: '#fef3c7' },
  { name: 'Linda Jones',       company: 'Coinbase',   title: 'AVP - HRBP',                 status: 'Queued',  statusColor: '#8aada8', statusBg: '#f0f6f4' },
]

function OutreachMockup() {
  const li = '/company-logos/linkedin.svg'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>

      {/* Header */}
      <div style={{ padding: '0 0 12px', borderBottom: `1px solid ${P.border}`, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.green, letterSpacing: 1.4, textTransform: 'uppercase' as const }}>
            Agent Outreach · Live
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: P.green, boxShadow: `0 0 6px ${P.green}` }} />
            <span style={{ fontSize: FONT.xs, color: P.muted }}>50 contacts found</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {OUTREACH_ROWS.map((r) => (
          <div key={r.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px',
            background: P.surface, border: `1px solid ${P.border}`,
            borderRadius: 10,
          }}>
            {/* Avatar initial */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: P.mint, border: `1px solid ${P.sage}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: WEIGHT.bold, color: P.green,
            }}>
              {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>

            {/* Name + title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, color: P.dark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={li} alt="LinkedIn" width={11} height={11} style={{ flexShrink: 0, opacity: 0.7 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                {OUTREACH_LOGOS[r.company] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={OUTREACH_LOGOS[r.company]} alt={r.company} height={10} style={{ objectFit: 'contain', flexShrink: 0, maxWidth: 32, opacity: 0.75 }} />
                )}
                <span style={{ fontSize: '10px', color: P.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</span>
              </div>
            </div>

            {/* Status badge */}
            <span style={{
              fontSize: '10px', fontWeight: WEIGHT.bold,
              color: r.statusColor, background: r.statusBg,
              borderRadius: 5, padding: '2px 7px', flexShrink: 0, whiteSpace: 'nowrap',
            }}>{r.status}</span>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${P.border}` }}>
        {[
          { v: '50', l: 'Contacted',  c: P.dark },
          { v: '64%', l: 'Open rate', c: '#1d6fb8' },
          { v: '31%', l: 'Reply rate', c: P.green },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: '10px', color: P.muted, marginTop: 3 }}>{s.l}</div>
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

/* ─── Scroll state (all DOM-imperative, no React re-renders on scroll) ── */
interface ScrollState {
  thresholds: Array<{ enterY: number; leaveY: number }>
  topGap: number
  wrapperH: number
}

/* Walk offsetParent chain to get absolute document top (unaffected by sticky) */
function absoluteTop(el: HTMLElement): number {
  let top = 0
  let curr: HTMLElement | null = el
  while (curr) {
    top += curr.offsetTop
    curr = curr.offsetParent as HTMLElement | null
  }
  return top
}

/* ─── Component ─────────────────────────────────────────────── */
export default function HireSection() {
  const wrapperRef     = useRef<HTMLDivElement>(null)
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([])
  const nextSiblingRef = useRef<HTMLDivElement>(null)
  const stateRef       = useRef<ScrollState>({ thresholds: [], topGap: 0, wrapperH: 0 })

  const { scrollY } = useScroll()

  const init = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cards.length) return

    const isMobileView = window.matchMedia('(max-width: 860px)').matches
    const topBase = isMobileView ? 68 : 100
    const topGap  = isMobileView ? 44 : 0

    // Reset heights before measuring
    cards.forEach(c => c.style.removeProperty('height'))

    // Desktop: all cards same height, capped so each card has a ~50px bottom gap
    let maxH = 0
    if (!isMobileView) {
      const naturalMax = Math.max(...cards.map(c => c.offsetHeight))
      maxH = Math.min(naturalMax, Math.max(window.innerHeight - topBase - 50, 480))
      cards.forEach(c => { c.style.height = `${maxH}px` })
    }

    // Extend wrapper by maxH so the last card's containing block is tall enough to stick
    if (nextSiblingRef.current) {
      nextSiblingRef.current.style.height = isMobileView ? '0px' : `${maxH}px`
    }

    const wrapperH = wrapper.offsetHeight

    const thresholds = cards.map((card, i) => {
      const topOffset   = topGap * i + topBase
      // absoluteTop uses offsetParent chain — correct for sticky elements
      const cardAbsTop  = absoluteTop(card)
      const enterY      = cardAbsTop - topOffset
      const endDistance = card.offsetHeight
      return { enterY, leaveY: enterY + endDistance }
    })

    stateRef.current = { thresholds, topGap, wrapperH }
  }, [])

  useEffect(() => {
    const run = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(init)))
      } else {
        requestAnimationFrame(() => requestAnimationFrame(init))
      }
    }

    run()

    const onResize = () => {
      // Reset all imperative styles before re-init
      const wrapper = wrapperRef.current
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      cards.forEach(c => {
        c.style.removeProperty('height')
        c.classList.remove('nh-card-moveup')
      })
      if (wrapper) {
        wrapper.style.removeProperty('transform')
        wrapper.style.removeProperty('height')
        wrapper.classList.remove('nh-sticky-remove')
      }
      if (nextSiblingRef.current) nextSiblingRef.current.style.height = '0px'
      run()
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      // Cleanup on unmount
      const wrapper = wrapperRef.current
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      cards.forEach(c => {
        c.style.removeProperty('height')
        c.classList.remove('nh-card-moveup')
      })
      if (wrapper) {
        wrapper.style.removeProperty('transform')
        wrapper.style.removeProperty('height')
        wrapper.classList.remove('nh-sticky-remove')
      }
    }
  }, [init])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const { thresholds, topGap, wrapperH } = stateRef.current
    if (!thresholds.length) return

    const wrapper = wrapperRef.current
    const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    // Highest-index card whose enterY has been crossed
    let maxActive = -1
    thresholds.forEach(({ enterY }, i) => { if (latest >= enterY) maxActive = i })

    // Wrapper translateY shift
    const shift = maxActive > 2 ? topGap * (maxActive - 2) : 0
    if (wrapper) {
      wrapper.style.transform = shift > 0 ? `translateY(-${shift}px)` : ''
    }
    if (nextSiblingRef.current && shift > 0) {
      nextSiblingRef.current.style.marginTop = `-${shift}px`
    }

    // Dim cards that are 3+ positions behind the frontmost active card
    cards.forEach((card, i) => {
      if (i <= maxActive - 3) {
        card.classList.add('nh-card-moveup')
      } else {
        card.classList.remove('nh-card-moveup')
      }
    })

    // Unpin wrapper when user scrolls past the last card's enter point
    const last = thresholds[thresholds.length - 1]
    if (wrapper && last) {
      if (latest >= last.leaveY) {
        wrapper.classList.add('nh-sticky-remove')
        wrapper.style.height = `${wrapperH}px`
      } else {
        wrapper.classList.remove('nh-sticky-remove')
        wrapper.style.height = 'auto'
      }
    }
  })

  return (
    <section id="features" style={{ background: '#f5faf7', padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

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
            <span style={{ display: 'block', color: '#132128', fontFamily: SERIF }}>While you focus on</span>
            <span style={{ display: 'block', color: '#132128', fontFamily: SERIF }}>what matters.</span>
          </h2>
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
                border: 'none',
                borderRadius: 28,
                minHeight: 600,
                marginBottom: 400,
                padding: '0',
                display: 'flex',
                gap: 0,
                alignItems: 'stretch',
                position: 'sticky',
                top: '100px',
                boxShadow: '0 8px 48px rgba(19,33,40,0.10)',
                transition: 'opacity 1s',
                overflow: 'hidden',
              }}
            >
              {/* ── Left: text ── */}
              <div style={{
                flex: '0 0 50%', minWidth: 0,
                paddingLeft: 72, paddingRight: 64, paddingTop: 72, paddingBottom: 72,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                {/* Tag */}
                <div style={{
                  fontSize: '12px', fontWeight: WEIGHT.bold, letterSpacing: 1.8,
                  color: P.green, textTransform: 'uppercase',
                  marginBottom: 18,
                }}>
                  {card.tag}
                </div>

                {/* Title — exact specs: 32px #132128 -0.3px */}
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: WEIGHT.extra,
                  color: '#132128',
                  margin: '0 0 36px',
                  lineHeight: 1.3,
                  letterSpacing: '-0.3px',
                  whiteSpace: 'pre-line',
                }}>
                  {card.title}
                </h3>

                {/* Checklist — exact: 16px #424D53 */}
                <div className="nh-card-features" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 44 }}>
                  {card.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        color: '#338632', fontSize: '16px',
                        lineHeight: '24px', flexShrink: 0, fontWeight: WEIGHT.bold,
                      }}>✓</span>
                      <span style={{
                        fontSize: '16px', color: '#424D53',
                        lineHeight: '24px', letterSpacing: '-0.3px',
                      }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Learn more */}
                <a
                  href="https://app.nexthireconsulting.com"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: '16px', fontWeight: WEIGHT.semi, letterSpacing: '-0.3px',
                    color: '#338632', textDecoration: 'none', width: 'fit-content',
                  }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#338632" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* ── Right: white panel, flush to card edge ── */}
              <div style={{
                flex: '0 0 50%', position: 'relative',
                borderRadius: '0 28px 28px 0',
                overflow: 'hidden',
                background: card.imgContent === 'autoapply' ? '#EEF7ED' : '#ffffff',
                boxShadow: '-12px 0 48px rgba(19,33,40,0.08)',
              }}>
                {card.imgContent === 'autoapply' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/hire-autoapply.png"
                    alt="AI Auto Apply"
                    style={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      transform: 'translate(-60%, -50%) scale(1.2)',
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div className="nh-card-mockup" style={{ position: 'absolute', inset: 0, padding: 32, display: 'flex', flexDirection: 'column' }}>
                    {MOCKUPS[card.imgContent]}
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Spacer — keeps the wrapper tall enough for the last card to stick */}
          <div ref={nextSiblingRef} style={{ height: 0 }} />
        </div>
      </div>
    </section>
  )
}
