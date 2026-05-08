'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { FONT, WEIGHT } from '@/constants/typography'


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
    href: 'https://app.nexthireconsulting.com/auto-apply',
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
    href: 'https://app.nexthireconsulting.com/ai-outreach',
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
    href: 'https://app.nexthireconsulting.com/resume/builder',
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
    tag: 'Job Portal Optimization',
    href: 'https://app.nexthireconsulting.com/portal-optimization',
    title: 'More visibility,\nmore interviews',
    features: [
      'AI-optimises your LinkedIn, Indeed, and Naukri profiles for recruiter search algorithms',
      'Keyword-tuned headlines and summaries matched to your target roles and companies',
      'Weekly reports on profile views, search appearances, and direct recruiter outreach',
    ],
    stat1: { n: '5×', l: 'more profile views' },
    stat2: { n: '64%', l: 'more interviews booked' },
    imgContent: 'portalopt',
  },
  {
    bg: '#eef7f3',
    tag: 'Job Tracker',
    href: 'https://app.nexthireconsulting.com/tracker',
    title: 'Never lose track of\nwhere you stand',
    features: [
      'Kanban pipeline: Applied → Screening → Interview → Offer, auto-populated',
      'Nudges sent before ghosting windows close so no follow ups get missed',
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
  <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color, background: bg, borderRadius: 7, padding: '4px 11px', whiteSpace: 'nowrap' }}>
    {children}
  </span>
)
const Divider = () => <div style={{ height: 1, background: P.border, margin: '4px 0' }} />

/* Mockup panel header — replaces the old tiny Label */
const PanelHeader = ({ dot, label, right }: { dot?: boolean; label: string; right?: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: `1px solid ${P.border}`, marginBottom: 6 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {dot && <div style={{ width: 9, height: 9, borderRadius: '50%', background: P.green, boxShadow: `0 0 0 3px rgba(51,134,50,0.18)`, flexShrink: 0 }} />}
      <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.green, letterSpacing: 1.1, textTransform: 'uppercase' as const }}>{label}</span>
    </div>
    {right}
  </div>
)

/* 01 — Auto Apply */
function AutoApplyMockup() {
  const jobs = [
    { company: 'Stripe',  role: 'Senior Engineer',    status: 'Applied',   sc: P.green,  sb: P.mint   },
    { company: 'Notion',  role: 'AI Product Manager', status: 'Applying…', sc: P.accent, sb: P.mint   },
    { company: 'Linear',  role: 'Staff Frontend',     status: 'In Queue',  sc: P.muted,  sb: '#f3f4f6' },
    { company: 'Figma',   role: 'Design Systems',     status: 'In Queue',  sc: P.muted,  sb: '#f3f4f6' },
  ]
  const r = 34, circ = 2 * Math.PI * r, ats = 82

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 14 }}>
      <PanelHeader dot label="AI Auto Apply · Live"
        right={<Badge color={P.accentD} bg={P.mint}>847 scanned</Badge>}
      />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, overflow: 'hidden', minHeight: 0 }}>

        {/* Left column: feature cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Features</span>

          <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark, marginBottom: 3 }}>ATS-Tailored Resumes</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, lineHeight: 1.45 }}>AI creates custom resumes for each JD.</div>
          </div>

          <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark, marginBottom: 3 }}>Portal Coverage</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, lineHeight: 1.45 }}>LinkedIn, Indeed, Naukri, and 60+ portals.</div>
          </div>

          <div style={{ background: P.mint, border: `1.5px solid ${P.sage}`, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.green, marginBottom: 3 }}>Auto Job Tracker</div>
            <div style={{ fontSize: FONT.xs, color: P.mid, lineHeight: 1.45 }}>Every application logged, every follow-up scheduled, automatically.</div>
          </div>
        </div>

        {/* Right column: performance + job list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden', minHeight: 0 }}>
          <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Global Performance</span>

          {/* Stats row with ring */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: '20px', fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1 }}>847</div>
              <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2, lineHeight: 1.3 }}>Jobs scanned</div>
            </div>
            <svg width="76" height="76" viewBox="0 0 76 76" style={{ flexShrink: 0 }}>
              <circle cx="38" cy="38" r={r} fill="none" stroke={P.mint} strokeWidth="7" />
              <circle cx="38" cy="38" r={r} fill="none" stroke={P.accent} strokeWidth="7"
                strokeDasharray={`${(ats / 100) * circ} ${circ}`} strokeLinecap="round"
                transform="rotate(-90 38 38)" />
              <text x="38" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={P.dark}>{ats}%</text>
              <text x="38" y="48" textAnchor="middle" fontSize="8" fill={P.muted}>ATS pass</text>
            </svg>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: '20px', fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1 }}>40×</div>
              <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2, lineHeight: 1.3 }}>More reach</div>
            </div>
          </div>

          <Divider />

          <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.green, flexShrink: 0 }}>Agent Applying · Live</div>

          {/* Job rows */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
            {jobs.map(j => (
              <div key={j.company} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: P.surface, border: `1px solid ${P.border}`, borderRadius: 8, padding: '7px 10px',
              }}>
                <div>
                  <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, color: P.dark }}>{j.company}</div>
                  <div style={{ fontSize: 10, color: P.muted }}>{j.role}</div>
                </div>
                <Badge color={j.sc} bg={j.sb}>{j.status}</Badge>
              </div>
            ))}
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
  { name: 'James Smith',       company: 'Stripe',     title: 'Talent Acquisition Manager',    status: 'Replied',  statusColor: '#338632', statusBg: '#e8f5ee' },
  { name: 'Maria Martinez',    company: 'Paypal',     title: 'Talent Acquisition Specialist',  status: 'Opened',   statusColor: '#1d6fb8', statusBg: '#e8f0fb' },
  { name: 'Charles Wilson',    company: 'Razorpay',   title: 'HR Business Partner',            status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Atul Chaturvedi',   company: 'Visa',       title: 'Executive Manager HR',           status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Adhishree Gupta',   company: 'Ramp',       title: 'Senior Talent Acquisition',      status: 'Sent',     statusColor: '#8aada8', statusBg: '#f0f6f4' },
  { name: 'Manish Sharma',     company: 'Brex',       title: 'Manager HRBP',                   status: 'Sending',  statusColor: '#b45309', statusBg: '#fef3c7' },
  { name: 'Linda Jones',       company: 'Coinbase',   title: 'AVP - HRBP',                     status: 'Queued',   statusColor: '#8aada8', statusBg: '#f0f6f4' },
]

function OutreachMockup() {
  const li = '/company-logos/linkedin.svg'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <PanelHeader dot label="Agent Outreach · Live"
        right={
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{ fontSize: '28px', fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1 }}>50</span>
            <span style={{ fontSize: FONT.sm, color: P.muted }}>contacts found</span>
          </div>
        }
      />

      {/* Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
        {OUTREACH_ROWS.map((r) => (
          <div key={r.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px',
            background: P.surface, border: `1px solid ${P.border}`,
            borderRadius: 12,
          }}>
            {/* Avatar */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: P.mint, border: `1.5px solid ${P.sage}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.accent,
            }}>
              {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>

            {/* Name + title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.semi, color: P.dark, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={li} alt="LinkedIn" width={13} height={13} style={{ flexShrink: 0, opacity: 0.65 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                {OUTREACH_LOGOS[r.company] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={OUTREACH_LOGOS[r.company]} alt={r.company} height={13} style={{ objectFit: 'contain', flexShrink: 0, maxWidth: 40, opacity: 0.8 }} />
                )}
                <span style={{ fontSize: FONT.sm, color: P.muted, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</span>
              </div>
            </div>

            {/* Status badge */}
            <span style={{
              fontSize: FONT.sm, fontWeight: WEIGHT.bold,
              color: r.statusColor, background: r.statusBg,
              borderRadius: 7, padding: '4px 10px', flexShrink: 0, whiteSpace: 'nowrap' as const,
            }}>{r.status}</span>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${P.border}` }}>
        {[
          { v: '50',  l: 'Contacted',  c: P.dark    },
          { v: '64%', l: 'Open rate',  c: '#1d6fb8' },
          { v: '31%', l: 'Reply rate', c: P.green   },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: FONT.sm, color: P.muted, marginTop: 5 }}>{s.l}</div>
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
  const atsScore = 94
  const r = 44
  const circumference = 2 * Math.PI * r
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>

      <PanelHeader dot label="Resume Builder · Generating"
        right={<Badge color={P.accentD} bg={P.mint}>Expert reviewing</Badge>}
      />

      {/* Target row */}
      <div style={{ background: '#eef7ed', border: `1px solid ${P.border}`, borderRadius: 13, padding: '14px 18px' }}>
        <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: P.dark }}>Tailored for: Stripe · Senior Engineer</div>
        <div style={{ fontSize: FONT.sm, color: P.muted, marginTop: 4 }}>Generated in 12s · 3 variants ready</div>
      </div>

      {/* ATS ring + keyword bars */}
      <div style={{ display: 'flex', gap: 22, alignItems: 'center', flex: 1 }}>

        {/* ATS ring — larger, dominant focal point */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <svg width="112" height="112" viewBox="0 0 112 112">
            <circle cx="56" cy="56" r={r} fill="none" stroke={P.mint} strokeWidth="9" />
            <circle cx="56" cy="56" r={r} fill="none" stroke={P.accent} strokeWidth="9"
              strokeDasharray={`${(atsScore / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 56 56)" />
            <text x="56" y="50" textAnchor="middle" fontSize="28" fontWeight="800" fill={P.dark}>{atsScore}</text>
            <text x="56" y="68" textAnchor="middle" fontSize="12" fill={P.muted}>ATS Score</text>
          </svg>
          <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.green, background: P.mint, borderRadius: 8, padding: '5px 13px' }}>Pass ✓</span>
        </div>

        {/* Keyword bars */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.muted, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>Keyword Match</span>
          {skills.map(kw => (
            <div key={kw.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: FONT.sm, color: P.mid, fontWeight: WEIGHT.medium }}>{kw.label}</span>
                <span style={{ fontSize: FONT.base, color: P.accent, fontWeight: WEIGHT.bold }}>{kw.match}%</span>
              </div>
              <div style={{ height: 10, background: P.mint, borderRadius: 7 }}>
                <div style={{ height: '100%', width: `${kw.match}%`, background: P.accent, borderRadius: 7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Section checklist */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        {sections.map(s => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: FONT.sm, color: P.mid, background: P.mint, border: `1px solid ${P.sage}`, borderRadius: 8, padding: '6px 13px' }}>
            <span style={{ color: P.green, fontWeight: WEIGHT.bold }}>✓</span> {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/* 04 — Job Portal Optimization */
function PortalOptMockup() {
  const platforms = [
    { name: 'LinkedIn',  score: 94, color: '#0a66c2', bg: '#e8f0fb' },
    { name: 'Indeed',    score: 88, color: '#2164f3', bg: '#eef2ff' },
    { name: 'Naukri',    score: 91, color: '#ff7555', bg: '#fff1ee' },
  ]
  const r = 44
  const circumference = 2 * Math.PI * r
  const overallScore = 91

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>

      <PanelHeader dot label="Profile Optimization · Active"
        right={<Badge color={P.accentD} bg={P.mint}>3 portals synced</Badge>}
      />

      {/* Score ring + platform bars */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>

        {/* Overall score ring */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <svg width="112" height="112" viewBox="0 0 112 112">
            <circle cx="56" cy="56" r={r} fill="none" stroke={P.mint} strokeWidth="9" />
            <circle cx="56" cy="56" r={r} fill="none" stroke={P.accent} strokeWidth="9"
              strokeDasharray={`${(overallScore / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 56 56)" />
            <text x="56" y="50" textAnchor="middle" fontSize="28" fontWeight="800" fill={P.dark}>{overallScore}</text>
            <text x="56" y="68" textAnchor="middle" fontSize="11" fill={P.muted}>Visibility</text>
          </svg>
          <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.green, background: P.mint, borderRadius: 8, padding: '5px 13px' }}>Optimised ✓</span>
        </div>

        {/* Platform scores */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {platforms.map(p => (
            <div key={p.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: P.mid }}>{p.name}</span>
                <span style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: p.color }}>{p.score}%</span>
              </div>
              <div style={{ height: 10, background: p.bg, borderRadius: 7 }}>
                <div style={{ height: '100%', width: `${p.score}%`, background: p.color, borderRadius: 7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Weekly impact stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { v: '5×',  l: 'Profile views',       c: P.dark    },
          { v: '64%', l: 'More interviews',      c: '#1d6fb8' },
          { v: '31',  l: 'Recruiter messages',   c: P.green   },
        ].map(s => (
          <div key={s.l} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 13, padding: '14px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: WEIGHT.extra, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Keyword tip */}
      <div style={{ background: P.mint, border: `1.5px solid ${P.sage}`, borderRadius: 12, padding: '14px 16px' }}>
        <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.accent, marginBottom: 6, letterSpacing: 0.3 }}>✦ Latest Suggestion</div>
        <div style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.6 }}>
          Add &quot;cross-functional&quot; and &quot;stakeholder alignment&quot; to your LinkedIn headline — 3× more recruiter hits.
        </div>
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
      <PanelHeader dot label="AI Interviewer · Product Manager" />

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
            <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: q.active ? P.accent : P.muted, minWidth: 22 }}>{q.q}</span>
            <span style={{ fontSize: FONT.base, color: q.active ? P.dark : P.muted, lineHeight: 1.5 }}>{q.text}</span>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
        <div style={{ flex: 1, height: 4, background: P.mint, borderRadius: 4 }}>
          <div style={{ width: `${(1/5)*100}%`, height: '100%', background: P.accent, borderRadius: 4 }} />
        </div>
        <span style={{ fontSize: FONT.sm, color: P.muted, marginLeft: 12 }}>1 / 5</span>
      </div>
    </div>
  )
}

/* 06 — Job Tracker */
function JobTrackerMockup() {
  const tabs = [
    { label: 'All Jobs',   count: 4, active: true  },
    { label: 'Bookmarked', count: 1, active: false  },
    { label: 'Applying',   count: 0, active: false  },
    { label: 'Applied',    count: 1, active: false  },
  ]
  const rows = [
    { position: 'SDE 3',                     company: 'Google', salary: 'N/A' },
    { position: 'Senior Software Engineer',  company: 'Stripe', salary: 'N/A' },
    { position: 'Tech Lead',                 company: 'Amazon', salary: 'N/A' },
    { position: 'Member of Technical Staff', company: 'Tesla',  salary: 'N/A' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      <PanelHeader label="Job Tracker"
        right={<Badge color={P.accentD} bg={P.mint}>Auto-tracked</Badge>}
      />

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${P.border}`, marginBottom: 0, flexShrink: 0, gap: 0 }}>
        {tabs.map(t => (
          <div key={t.label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 14px',
            borderBottom: t.active ? `2px solid ${P.dark}` : '2px solid transparent',
            marginBottom: -1, cursor: 'pointer',
          }}>
            <span style={{ fontSize: FONT.sm, fontWeight: t.active ? WEIGHT.semi : WEIGHT.normal, color: t.active ? P.dark : P.muted, whiteSpace: 'nowrap' as const }}>{t.label}</span>
            <span style={{ fontSize: 10, fontWeight: WEIGHT.bold, color: t.active ? '#fff' : P.muted, background: t.active ? P.dark : P.border, borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center' as const }}>{t.count}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 10px', borderBottom: `1px solid ${P.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${P.muted}`, flexShrink: 0 }} />
          <span style={{ fontSize: FONT.sm, color: P.muted }}>Select all</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, border: `1px solid ${P.border}`, borderRadius: 99, padding: '4px 11px', cursor: 'pointer' }}>
            <span style={{ fontSize: FONT.xs, color: P.mid }}>≡ Columns</span>
          </div>
          <div style={{ border: `1px solid ${P.border}`, borderRadius: 99, padding: '4px 10px', cursor: 'pointer' }}>
            <span style={{ fontSize: FONT.xs, color: P.mid }}>···</span>
          </div>
        </div>
      </div>

      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 90px 76px', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${P.border}`, flexShrink: 0 }}>
        <div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${P.muted}` }} />
        <span style={{ fontSize: FONT.xs, color: P.muted, fontWeight: WEIGHT.semi }}>Job Position</span>
        <span style={{ fontSize: FONT.xs, color: P.muted, fontWeight: WEIGHT.semi }}>Company</span>
        <span style={{ fontSize: FONT.xs, color: P.muted, fontWeight: WEIGHT.semi }}>Min Salary</span>
      </div>

      {/* Table rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {rows.map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '24px 1fr 90px 76px', alignItems: 'center',
            padding: '12px 0', borderBottom: `1px solid ${P.border}`,
          }}>
            <div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${P.muted}` }} />
            <span style={{ fontSize: FONT.sm, color: P.dark }}>{row.position}</span>
            <span style={{ fontSize: FONT.sm, color: P.mid }}>{row.company}</span>
            <span style={{ fontSize: FONT.sm, color: P.muted }}>{row.salary}</span>
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
  portalopt:    <PortalOptMockup />,
  aiinterviewer:<AIInterviewerMockup />,
  jobtracker:   <JobTrackerMockup />,
}

// All cards now rendered via MOCKUPS — no image-based special cases

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
    <section id="features" style={{ background: '#f5faf7', padding: 'clamp(72px, 10vw, 110px) 0' }}>
      <div className="nh-container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 80px' }}>
          <div style={{ marginBottom: 20, height: 32 }} aria-hidden="true" />
          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: '54px',
            fontWeight: 400,
            fontStyle: 'normal',
            margin: '0 0 20px',
            lineHeight: '64.8px',
            letterSpacing: '-1.2px',
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: '#132128' }}>While you focus on</span>
            <span style={{ display: 'block', color: '#132128' }}>what matters.</span>
          </h2>
          <p style={{ fontSize: FONT.md, color: P.mid, maxWidth: '520px', margin: '0 auto', lineHeight: '27px', letterSpacing: '-0.3px' }}>
            The agent works 24/7, discovering opportunities, reaching decision makers, and tracking every touchpoint
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
                zIndex: i + 1,
                transition: 'opacity 1s',
                overflow: 'hidden',
              }}
            >
              {/* ── Left: text ── */}
              <div style={{
                flex: '0 0 50%', minWidth: 0,
                paddingLeft: 72, paddingRight: 64, paddingTop: 72, paddingBottom: 72,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
                {/* Tag */}
                <div style={{
                  display: 'inline-block',
                  fontSize: '16px', fontWeight: WEIGHT.semi, letterSpacing: '0px',
                  lineHeight: '24px', color: '#424d53',
                  textTransform: 'uppercase',
                  background: '#E8E9EA',
                  borderRadius: '10px',
                  padding: '8px 18px',
                  marginBottom: 18,
                }}>
                  {card.tag}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(24px, 3.2vw, 32px)',
                  fontWeight: WEIGHT.normal,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: '#132128',
                  margin: '0 0 36px',
                  lineHeight: 1.25,
                  letterSpacing: '-0.3px',
                  whiteSpace: 'pre-line',
                }}>
                  {card.title}
                </h3>

                {/* Checklist */}
                <div className="nh-card-features" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 44 }}>
                  {card.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        color: '#338632', fontSize: '18px',
                        lineHeight: '27px', flexShrink: 0, fontWeight: WEIGHT.bold,
                      }}>✓</span>
                      <span style={{
                        fontSize: '18px', color: '#132128',
                        lineHeight: '27px', letterSpacing: '-0.3px',
                      }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Learn more */}
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: '16px', fontWeight: WEIGHT.normal, letterSpacing: '-0.3px',
                    lineHeight: '24px', color: '#338632', textDecoration: 'none', width: 'fit-content',
                  }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#338632" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* ── Right: panel — all cards share the same padded-frame treatment ── */}
              <div style={{
                flex: '0 0 50%', position: 'relative',
                borderRadius: '0 28px 28px 0',
                overflow: 'hidden',
                background: '#f5f5f5',
                boxShadow: '-12px 0 48px rgba(19,33,40,0.08)',
              }}>
                <div style={{ position: 'absolute', inset: 0, padding: '44px 56px' }}>
                  <div style={{
                    position: 'relative', width: '100%', height: '100%',
                    overflow: 'hidden', borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                    background: '#ffffff',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
                      {MOCKUPS[card.imgContent]}
                    </div>
                  </div>
                </div>
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
