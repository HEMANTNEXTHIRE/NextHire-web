'use client'

import { useState, useEffect, useRef } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

/* Homepage-aligned tokens (HeroSection / pricing) */
const HOME = {
  bg: '#ffffff',
  dark: '#111827',
  accent: '#2e7d4f',
  subtext: '#6b7280',
  muted: '#9ca3af',
  ctaMint: '#1de9b6',
}

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

/* ── Palette ──────────────────────────────────────────────────── */
const C = {
  dark:    '#1a3338',
  mid:     '#3d5a56',
  sage:    '#c8dfd6',
  mint:    '#e4f0eb',
  light:   '#edf5f1',
  surface: '#f7faf9',
  white:   '#ffffff',
  accent:  '#5fa89e',
  accentD: '#3d7a72',
  muted:   '#8aada8',
  green:   '#22c55e',
}

/** Matches homepage `.hiw-panel` / pricing — tapered shell, soft shadow */
const NH_PANEL = {
  r: 28,
  shadow: '0 16px 56px rgba(37, 62, 66, 0.10), 0 2px 10px rgba(37, 62, 66, 0.05)' as const,
  inner: '#f3f8f6',
  innerR: 16,
  rowR: 14,
}

/* ── Data ─────────────────────────────────────────────────────── */
const STATS = [
  { n: '800M+', l: 'Candidate profiles indexed', icon: '🌐' },
  { n: '10×',   l: 'Faster shortlist delivery',  icon: '⚡' },
  { n: '70%',   l: 'Reduction in recruiter hours', icon: '⏱️' },
  { n: '80%',   l: 'AI interview completion rate', icon: '🎯' },
]

const COMPARE_ROWS = [
  { feature: 'Time to first shortlist',       old: '2–3 weeks',               nh: '4 hours'                     },
  { feature: 'Candidate screening',           old: 'Manual recruiter calls',  nh: 'AI phone agent, 24/7'         },
  { feature: 'Outreach personalisation',      old: 'Mail-merge templates',    nh: 'Per-candidate AI copy'        },
  { feature: 'Interview scheduling',          old: 'Back-and-forth emails',   nh: 'SMS agent auto-schedules'     },
  { feature: 'Video interviewing',            old: 'Live Zoom, high no-show', nh: 'Async AI, 80% completion'     },
  { feature: 'Recruiter hours per hire',      old: '40–60 hrs',               nh: 'Under 10 hrs'                 },
  { feature: 'ATS / CRM sync',               old: 'Manual CSV export',       nh: '50+ native integrations'      },
]

/** Bento grid placement (6×4 desktop) — hub top-left, names orbit */
const INTEGRATION_BENTO: { name: string; gc: string; gr: string; tone: 'w' | 'm' | 's' }[] = [
  { name: 'Greenhouse', gc: '3', gr: '1', tone: 'w' },
  { name: 'Lever', gc: '4', gr: '1', tone: 'm' },
  { name: 'Ashby', gc: '5', gr: '1', tone: 's' },
  { name: 'Workable', gc: '6', gr: '1', tone: 'w' },
  { name: 'Workday', gc: '3', gr: '2', tone: 's' },
  { name: 'Bullhorn', gc: '4', gr: '2', tone: 'w' },
  { name: 'Recruit CRM', gc: '5', gr: '2', tone: 'm' },
  { name: 'Zoho Recruit', gc: '6', gr: '2', tone: 'w' },
  { name: 'SmartRecruiters', gc: '1', gr: '3', tone: 'm' },
  { name: 'HiBob', gc: '2', gr: '3', tone: 'w' },
  { name: 'Salesforce', gc: '3', gr: '3', tone: 's' },
  { name: 'HubSpot', gc: '4', gr: '3', tone: 'w' },
  { name: 'Gmail', gc: '5', gr: '3', tone: 'm' },
  { name: 'Outlook', gc: '6', gr: '3', tone: 'w' },
  { name: 'Slack', gc: '3', gr: '4', tone: 's' },
]

/* ── Global animation styles ──────────────────────────────────── */
const STYLES = `
@keyframes fcFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes fcDrift   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,-10px) scale(1.03)} }
@keyframes fcPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.9)} }
@keyframes fcSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes fcSpinRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes fcSlideUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
@keyframes fcSlideL  { from{opacity:0;transform:translateX(-26px)} to{opacity:1;transform:translateX(0)} }
@keyframes fcSlideR  { from{opacity:0;transform:translateX(26px)} to{opacity:1;transform:translateX(0)} }
@keyframes fcScale   { from{opacity:0;transform:scale(0.86)} to{opacity:1;transform:scale(1)} }
@keyframes fcMarch   { from{background-position:0 0} to{background-position:40px 40px} }
@keyframes fcBarFill { from{width:0} to{width:var(--bw)} }
@keyframes fcRipple  { from{transform:scale(0.8);opacity:1} to{transform:scale(2);opacity:0} }
@keyframes fcBlink   { 0%,45%{opacity:1} 50%,95%{opacity:0} 100%{opacity:1} }
@keyframes fcWave    { 0%{d:path("M0 15 Q180 5 360 15 Q540 25 720 15 Q900 5 1080 15 Q1260 25 1440 15")} 50%{d:path("M0 15 Q180 25 360 15 Q540 5 720 15 Q900 25 1080 15 Q1260 5 1440 15")} 100%{d:path("M0 15 Q180 5 360 15 Q540 25 720 15 Q900 5 1080 15 Q1260 25 1440 15")} }
@keyframes fcTypeIn  { from{max-width:0;opacity:0} to{max-width:600px;opacity:1} }
@keyframes fcCountUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

.fc-card { transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease !important; }
.fc-card:hover { transform: translateY(-5px) !important; box-shadow: 0 18px 56px rgba(37,62,66,0.12) !important; }
@keyframes fcIntBob { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-5px); } }
.companies-int-bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; max-width: 920px; margin-left: auto; margin-right: auto; }
@media (max-width: 900px) {
  .companies-int-bento { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; }
  .companies-int-hub { grid-column: 1 / -1 !important; grid-row: auto !important; min-height: 160px !important; }
  .companies-int-cell { grid-column: auto !important; grid-row: auto !important; }
}
.companies-int-cell {
  transition: transform 0.28s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.28s ease !important;
}
.companies-int-cell:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 14px 40px rgba(37, 62, 66, 0.1) !important;
}
.fc-feature-card { transition: transform 0.26s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.26s ease, background 0.2s !important; border: none !important; }
.fc-feature-card:hover { transform: translateY(-3px) !important; box-shadow: 0 18px 48px rgba(37, 62, 66, 0.09), 0 2px 8px rgba(37, 62, 66, 0.04) !important; background: ${NH_PANEL.inner} !important; }
.fc-compare-row { transition: background 0.15s ease !important; }
.fc-compare-row:hover { background: rgba(243,248,246,0.92) !important; }
`

/* ── Scroll reveal wrapper ────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = 'up' }: { children: React.ReactNode; delay?: number; dir?: 'up'|'left'|'right'|'scale' }) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const map = { up: 'fcSlideUp', left: 'fcSlideL', right: 'fcSlideR', scale: 'fcScale' }
  return (
    <div ref={ref} style={{ animation: vis ? `${map[dir]} 0.55s cubic-bezier(.22,.68,0,1.2) ${delay}s both` : 'none', opacity: vis ? undefined : 0 }}>
      {children}
    </div>
  )
}

/* ── Animated integer counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let cur = 0
      const step = Math.ceil(target / 60)
      const id = setInterval(() => { cur = Math.min(cur + step, target); setV(cur); if (cur >= target) clearInterval(id) }, 22)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>
}

/* ── Typewriter ───────────────────────────────────────────────── */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'typing'|'pause'|'deleting'>('typing')
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    const target = texts[idx]
    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55)
        return () => clearTimeout(t)
      } else { const t = setTimeout(() => setPhase('pause'), 1400); return () => clearTimeout(t) }
    } else if (phase === 'pause') {
      const t = setTimeout(() => setPhase('deleting'), 0); return () => clearTimeout(t)
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 28); return () => clearTimeout(t)
      } else { setIdx(i => (i + 1) % texts.length); setPhase('typing') }
    }
  }, [displayed, phase, idx, texts])
  return (
    <span style={{ color: HOME.accent }}>
      {displayed}
      <span style={{ display: 'inline-block', width: 2, height: '0.85em', background: HOME.accent, verticalAlign: 'text-bottom', marginLeft: 2, animation: 'fcBlink 1s step-end infinite' }} />
    </span>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function CompaniesPageClient() {

  const PLATFORM_FEATURES = [
    {
      tag: 'FIND TALENT',
      heading: 'Source anyone in seconds.',
      body: 'Describe the role in plain English. The AI sourcing agent scans 800M+ profiles across 30+ data sources — job boards, professional networks, GitHub, patent databases — building enriched, scored shortlists. Up to 10× faster than manual sourcing.',
      icon: '🔍',
      color: C.accent,
      features: [
        { title: 'Natural-language search', desc: 'No Boolean strings. Just describe who you need and the agent finds them.' },
        { title: 'Signal-based scoring',    desc: 'Profiles ranked by real signals — skills, impact, tenure, team growth indicators.' },
        { title: 'ATS / CRM export',        desc: 'One-click export to Greenhouse, Lever, Ashby, Workday, and 47 more systems.' },
        { title: 'Candidate enrichment',    desc: 'Verified email, LinkedIn, GitHub, and direct contact data appended automatically.' },
      ],
      mockup: (
        <div style={{ background: C.white, borderRadius: NH_PANEL.r, overflow: 'hidden', border: 'none', boxShadow: NH_PANEL.shadow }}>
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 8, background: NH_PANEL.inner }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[C.dark, C.muted, C.accent].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
            </div>
            <span style={{ fontSize: FONT.xs, color: C.muted, marginLeft: 6, fontWeight: WEIGHT.medium }}>AI Sourcing Agent · Live</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'fcPulse 2s ease infinite', display: 'inline-block', boxShadow: `0 0 6px ${C.green}` }} />
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.green }}>SCANNING</span>
            </span>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ background: NH_PANEL.inner, border: 'none', borderRadius: NH_PANEL.rowR, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: FONT.sm }}>🔍</span>
              <span style={{ fontSize: FONT.xs, color: C.accentD, fontWeight: WEIGHT.medium }}>&quot;Senior Product Manager, fintech, Series B+, remote&quot;</span>
            </div>
            {[
              { name: 'Priya Mehta',   role: 'Senior PM · Razorpay',   score: 98, delay: '0s' },
              { name: 'Arjun Sharma',  role: 'Product Lead · CRED',     score: 94, delay: '0.1s' },
              { name: 'Nisha Kapoor',  role: 'Group PM · PhonePe',      score: 91, delay: '0.2s' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: C.white, border: 'none', borderRadius: NH_PANEL.rowR, marginBottom: 8, boxShadow: '0 2px 12px rgba(37,62,66,0.05)', animation: `fcSlideL 0.4s ease ${p.delay} both` }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: NH_PANEL.inner, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, flexShrink: 0 }}>{p.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.dark }}>{p.name}</div>
                  <div style={{ fontSize: FONT.xs, color: C.muted, marginTop: 1 }}>{p.role}</div>
                </div>
                <div style={{ background: `${C.accent}18`, border: 'none', borderRadius: 8, padding: '3px 8px', fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent }}>{p.score}%</div>
              </div>
            ))}
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[{ n: '428', l: 'Profiles found' }, { n: '4h', l: 'Shortlist ready' }].map(s => (
                <div key={s.l} style={{ background: NH_PANEL.inner, border: 'none', borderRadius: NH_PANEL.rowR, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: C.accent }}>{s.n}</div>
                  <div style={{ fontSize: FONT.xs, color: C.muted, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      tag: 'SCREEN AT SCALE',
      heading: 'Interview only the best — automatically.',
      body: 'Every matched candidate gets a live AI phone screen the moment they apply. Structured questions, automatic scoring, full transcript. Your team receives a ranked shortlist with hire/no-hire signals — zero recruiter hours spent on early screening.',
      icon: '📞',
      color: C.accentD,
      features: [
        { title: 'AI phone screening',     desc: 'Outbound call triggered on match or application. Structured, role-calibrated questions.' },
        { title: 'AI video interviewer',   desc: 'Async video interviews with transcript, body language, and confidence scoring.' },
        { title: 'SMS engagement agent',   desc: '7× higher reply rate. Candidates qualify, schedule, and respond via text.' },
        { title: 'Scored transcripts',     desc: 'Every response scored and ranked. Flag red flags automatically before your team reviews.' },
      ],
      mockup: (
        <div style={{ background: C.white, borderRadius: NH_PANEL.r, overflow: 'hidden', border: 'none', boxShadow: NH_PANEL.shadow }}>
          <div style={{ background: C.dark, padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, letterSpacing: '1px' }}>AI PHONE SCREEN · LIVE</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'fcPulse 1.8s ease infinite', display: 'inline-block' }} />
              <span style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.55)', fontWeight: WEIGHT.semi }}>In progress</span>
            </span>
          </div>
          <div style={{ padding: '20px', background: `linear-gradient(180deg, ${NH_PANEL.inner} 0%, #ffffff 45%)` }}>
            {[
              { q: 'Tell me about your most impactful product launch.', score: 92, tag: 'Strong', c: C.green },
              { q: 'How do you prioritise between engineering debt and features?', score: 87, tag: 'Strong', c: C.green },
              { q: 'Describe a time you disagreed with a stakeholder.', score: 74, tag: 'Good', c: C.accentD },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 12, padding: '14px 16px', background: C.white, borderRadius: NH_PANEL.rowR, border: 'none', boxShadow: '0 2px 14px rgba(37,62,66,0.05)' }}>
                <div style={{ fontSize: FONT.xs, color: C.mid, lineHeight: 1.5, marginBottom: 8 }}>{item.q}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 5, background: 'rgba(200,223,214,0.45)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.score}%`, background: item.c, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: item.c, minWidth: 22 }}>{item.score}</span>
                  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, background: `${item.c}18`, color: item.c, padding: '3px 8px', borderRadius: 8 }}>{item.tag}</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, padding: '14px 18px', background: `linear-gradient(165deg, ${C.mint} 0%, ${NH_PANEL.inner} 100%)`, border: 'none', borderRadius: NH_PANEL.rowR, boxShadow: '0 2px 12px rgba(37,62,66,0.04)' }}>
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, color: C.dark }}>Overall score</span>
              <span style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: C.accent }}>84 / 100</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      tag: 'ENGAGE & REACH',
      heading: 'Personalised outreach that actually gets replies.',
      body: 'The outreach agent writes a context-aware message for every candidate — based on their actual experience, projects, and career signals. Multi-step email and LinkedIn sequences run automatically, with open/reply tracking and smart follow-ups.',
      icon: '✉️',
      color: C.accentD,
      features: [
        { title: 'Per-candidate copy',     desc: 'Each message references real work history and signals from their profile.' },
        { title: 'Multi-step sequences',   desc: 'Email + LinkedIn, automatically spaced. Follow-ups triggered on non-response.' },
        { title: 'Open & reply tracking',  desc: 'Real-time visibility on opens, clicks, replies, and opt-outs across every sequence.' },
        { title: 'A/B message testing',    desc: 'Test subject lines and message variants. Agent learns what performs and adapts.' },
      ],
      mockup: (
        <div style={{ background: C.white, borderRadius: NH_PANEL.r, overflow: 'hidden', border: 'none', boxShadow: NH_PANEL.shadow }}>
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, background: NH_PANEL.inner }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.accentD}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm }}>✉️</div>
            <div>
              <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.dark }}>Outreach preview</div>
              <div style={{ fontSize: FONT.xs, color: C.mid }}>Sent from your own Gmail · Auto-personalised</div>
            </div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: FONT.xs, color: C.mid, marginBottom: 4 }}>To: priya@razorpay.com</div>
            <div style={{ fontSize: FONT.sm, color: C.dark, lineHeight: 1.65, padding: '14px 16px', background: NH_PANEL.inner, borderRadius: NH_PANEL.rowR, marginBottom: 14, border: 'none' }}>
              Hi Priya, I noticed Razorpay&apos;s PM team expanded 22% this quarter — usually a signal you&apos;re scaling a new product surface. I&apos;ve been working with teams at that stage and would love to share what we&apos;ve seen work…
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[{ n: '64%', l: 'Open rate', c: C.accentD }, { n: '31%', l: 'Reply rate', c: C.green }].map(s => (
                <div key={s.l} style={{ padding: '12px', background: NH_PANEL.inner, borderRadius: NH_PANEL.rowR, textAlign: 'center', border: 'none' }}>
                  <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: s.c }}>{s.n}</div>
                  <div style={{ fontSize: FONT.xs, color: C.mid, marginTop: 2, fontWeight: WEIGHT.semi }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      <style suppressHydrationWarning>{STYLES}</style>

      {/* ════════════════════════════════════════════════════════
          HERO — same thesis as homepage / pricing (white, centered, no wave)
      ════════════════════════════════════════════════════════ */}
      <section id="companies-hero" style={{ background: HOME.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '120px clamp(20px, 5vw, 40px) 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>

          <Reveal>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: HOME.bg,
              borderRadius: 100,
              padding: '8px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              marginBottom: 16,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: HOME.accent, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: 13, fontWeight: WEIGHT.medium, letterSpacing: '0.01em', lineHeight: 1.4 }}>
                NextHire for Companies
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div style={{ width: '100%', margin: '0 0 32px', paddingBottom: '0.15em' }}>
              <h1 style={{ fontFamily: SERIF, margin: 0, letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
                <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: HOME.dark, fontFamily: SERIF }}>
                  Hire the right people.
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', fontFamily: SERIF }}>
                  <Typewriter texts={['In days, not months.', 'At 10× the speed.', 'With zero wasted hours.']} />
                </span>
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p style={{
              color: HOME.subtext,
              fontSize: 17,
              lineHeight: 1.72,
              margin: 0,
              maxWidth: 560,
              fontWeight: WEIGHT.normal,
            }}>
              Five AI agents — sourcing, phone screening, SMS engagement, video interviewing, and personalised outreach — running in parallel so your team only meets pre-qualified finalists.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 28 }}>
              <a
                href="https://app.nexthireconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 28px',
                  borderRadius: 9999,
                  background: HOME.ctaMint,
                  color: HOME.dark,
                  fontSize: 16,
                  fontWeight: WEIGHT.bold,
                  textDecoration: 'none',
                  border: 'none',
                }}
              >
                Start hiring free →
              </a>
              <a
                href="/contact-us"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 28px',
                  borderRadius: 9999,
                  background: '#f9fafb',
                  color: '#374151',
                  fontSize: 16,
                  fontWeight: WEIGHT.semi,
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                Book a demo
              </a>
            </div>
          </Reveal>

          <div style={{ marginTop: 72, paddingBottom: 72, width: '100%' }}>
            <p style={{
              fontSize: 11,
              color: HOME.muted,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              marginBottom: 36,
              fontWeight: WEIGHT.semi,
              textAlign: 'center',
            }}>
              By the numbers
            </p>
            {/* Full-width 4-col stat tiles — premium editorial layout */}
            <div
              className="companies-hero-stats"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, maxWidth: 900, margin: '0 auto', border: '1px solid rgba(200,223,214,0.5)', borderRadius: 24, overflow: 'hidden', background: C.white, boxShadow: '0 20px 60px rgba(37,62,66,0.08), 0 2px 10px rgba(37,62,66,0.04)' }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    textAlign: 'center',
                    padding: 'clamp(28px, 4vw, 44px) clamp(16px, 2.5vw, 28px)',
                    borderRight: i < STATS.length - 1 ? '1px solid rgba(200,223,214,0.5)' : 'none',
                    background: i % 2 === 0 ? C.white : '#fafcfb',
                    animation: `fcCountUp 0.5s ease ${0.12 + i * 0.08}s both`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.accent}, ${C.accentD})`, opacity: 0.7 }} />
                  <div style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: WEIGHT.extra, color: C.dark, lineHeight: 1, letterSpacing: '-1.5px', marginBottom: 10, fontFamily: SERIF }}>{s.n}</div>
                  <div style={{ fontSize: FONT.sm, color: C.muted, lineHeight: 1.5, fontWeight: WEIGHT.medium }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PLATFORM FEATURES — Structured numbered cards (CEO-grade)
      ════════════════════════════════════════════════════════ */}
      <section id="companies-platform" style={{ background: '#f7faf9', padding: '96px clamp(20px, 5vw, 40px) 96px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>

          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ display: 'inline-block', background: `${C.accent}12`, color: C.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                The Platform
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
                Five agents. One pipeline.
              </h2>
            </div>
          </Reveal>

          {/* Numbered feature cards — big, spacious, structured */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {PLATFORM_FEATURES.map((feat, idx) => (
              <Reveal key={feat.tag} delay={idx * 0.06} dir={idx % 2 === 0 ? 'left' : 'right'}>
                <div
                  className="fc-card fc-feature-card-row"
                  style={{
                    background: C.white,
                    borderRadius: 28,
                    boxShadow: '0 8px 40px rgba(37,62,66,0.07), 0 2px 10px rgba(37,62,66,0.04)',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: idx % 2 === 0 ? '1fr 420px' : '420px 1fr',
                    minHeight: 360,
                  }}
                >
                  {/* Text side */}
                  <div
                    style={{
                      padding: 'clamp(36px, 5vw, 60px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      order: idx % 2 === 0 ? 0 : 1,
                    }}
                  >
                    {/* Number + tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                      <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.muted, background: C.surface, border: `1px solid ${C.sage}`, borderRadius: 8, padding: '4px 10px', letterSpacing: '0.5px' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: feat.color, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {feat.tag}
                      </span>
                    </div>
                    {/* Heading */}
                    <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 400, color: '#111827', margin: '0 0 16px', lineHeight: 1.28, letterSpacing: '-0.3px', fontSynthesis: 'none' }}>
                      {feat.heading}
                    </h3>
                    {/* Body */}
                    <p style={{ fontSize: FONT.base, color: C.mid, lineHeight: 1.78, margin: '0 0 28px', maxWidth: 440 }}>
                      {feat.body}
                    </p>
                    {/* Feature bullets — 2-col grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {feat.features.map(f => (
                        <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ width: 18, height: 18, borderRadius: 6, background: `${feat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: feat.color }} />
                          </div>
                          <div>
                            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: C.dark, marginBottom: 2 }}>{f.title}</div>
                            <div style={{ fontSize: FONT.xs, color: C.muted, lineHeight: 1.55 }}>{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mockup side */}
                  <div
                    style={{
                      background: `linear-gradient(145deg, ${C.light} 0%, ${C.mint} 100%)`,
                      padding: 'clamp(24px, 4vw, 40px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      order: idx % 2 === 0 ? 1 : 0,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Decorative orb */}
                    <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${feat.color}20 0%, transparent 65%)`, top: -60, right: -40, pointerEvents: 'none' }} />
                    <div style={{ width: '100%', maxWidth: 340, position: 'relative', zIndex: 1 }}>
                      {feat.mockup}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COMPARISON TABLE — animated rows
      ════════════════════════════════════════════════════════ */}
      <section id="companies-compare" style={{ background: C.surface, padding: '96px clamp(20px, 5vw, 40px) 96px' }}>
        <div style={{ maxWidth: 940, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ display: 'inline-block', background: `${C.accent}12`, color: C.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                The Difference
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
                Traditional recruiting vs. NextHire
              </h2>
              <p style={{ fontSize: FONT.base, color: C.muted, margin: 0 }}>Same outcome. Completely different experience.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ borderRadius: NH_PANEL.r, overflow: 'hidden', border: 'none', boxShadow: NH_PANEL.shadow, background: C.white }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: NH_PANEL.inner, padding: '16px 24px' }} className="companies-compare-header">
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.muted, letterSpacing: '1px', textTransform: 'uppercase' }}>Metric</div>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.muted, letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Traditional</div>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>NextHire ✓</div>
              </div>
              {COMPARE_ROWS.map((row, i) => (
                <div key={row.feature} className="fc-compare-row companies-compare-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '15px 24px', background: i % 2 === 1 ? 'rgba(243,248,246,0.65)' : C.white, alignItems: 'center' }}>
                  <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.dark }}>{row.feature}</div>
                  <div style={{ fontSize: FONT.sm, color: C.muted, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <span style={{ color: C.muted, fontSize: FONT.xs, fontWeight: WEIGHT.extra }}>✕</span> {row.old}
                  </div>
                  <div style={{ fontSize: FONT.sm, color: C.dark, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <span style={{ color: C.accent, fontSize: FONT.xs, fontWeight: WEIGHT.extra }}>✓</span> <strong>{row.nh}</strong>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VISUAL METRIC ROW — Andela-style large numbers
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: '72px clamp(20px, 5vw, 40px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,223,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,223,214,0.04) 1px,transparent 1px)`, backgroundSize: '40px 40px', animation: 'fcMarch 14s linear infinite' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}15 0%, transparent 65%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="companies-metrics-grid">
            {[
              { target: 800, suffix: 'M+', label: 'Profiles in talent graph', icon: '🌐', color: C.accent },
              { target: 70, suffix: '%', label: 'Reduction in recruiter hours', icon: '⏱️', color: C.green },
              { target: 10, suffix: '×', label: 'Faster shortlist delivery', icon: '⚡', color: C.accentD },
              { target: 80, suffix: '%', label: 'Interview completion rate', icon: '🎯', color: C.accentD },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} dir="scale">
                <div style={{ textAlign: 'center', padding: '28px 18px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: NH_PANEL.innerR, position: 'relative', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${s.color}12 0%, transparent 60%)` }} />
                  <div style={{ fontSize: FONT.lg, marginBottom: 10, position: 'relative' }}>{s.icon}</div>
                  <div style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: s.color, lineHeight: 1, letterSpacing: '-1.5px', position: 'relative' }}>
                    <Counter target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: FONT.sm, color: 'rgba(255,255,255,0.5)', marginTop: 10, lineHeight: 1.4, fontWeight: WEIGHT.medium, position: 'relative' }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          INTEGRATIONS — bento mosaic + hub (no marquee, no harsh grid)
      ════════════════════════════════════════════════════════ */}
      <section
        id="companies-integrations"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '96px clamp(20px, 5vw, 40px) 96px',
          background: 'linear-gradient(168deg, #f6fbf9 0%, #ffffff 42%, #f3faf7 100%)',
        }}
      >
        {/* Soft aurora orbs — depth without lines */}
        <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, rgba(95,168,158,0.14) 0%, transparent 68%)`, top: '-12%', right: '-8%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, rgba(61,122,114,0.08) 0%, transparent 65%)`, bottom: '-18%', left: '-6%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '6px 16px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '2px', textTransform: 'uppercase', color: C.accentD, marginBottom: 18, boxShadow: '0 4px 24px rgba(37,62,66,0.06)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, animation: 'fcPulse 2s ease-in-out infinite' }} />
              Integrations
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: HOME.dark, margin: '0 0 14px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              Works with your existing stack.
            </h2>
            <p style={{ fontSize: 17, color: HOME.subtext, margin: '0 auto 48px', maxWidth: 500, lineHeight: 1.65 }}>
              Shortlists, transcripts, and scores sync directly — no manual data entry.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="companies-int-bento" style={{ textAlign: 'left' as const }}>
              {/* Hub tile — editorial anchor */}
              <div
                className="companies-int-hub companies-int-cell"
                style={{
                  gridColumn: '1 / 3',
                  gridRow: '1 / 3',
                  borderRadius: NH_PANEL.r,
                  padding: '28px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  minHeight: 200,
                  background: `linear-gradient(155deg, ${C.accentD} 0%, #152a2e 52%, #0f1f22 100%)`,
                  color: '#fff',
                  boxShadow: '0 22px 56px rgba(26,51,56,0.28)',
                  animation: 'fcIntBob 8s ease-in-out infinite',
                }}
              >
                <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: '50%', background: `${C.accent}28` }} />
                <div style={{ position: 'absolute', bottom: -40, left: '20%', width: 180, height: 180, borderRadius: '50%', background: 'rgba(95,168,158,0.12)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, boxShadow: `0 0 12px ${C.green}` }} />
                    <span style={{ fontSize: 10, letterSpacing: '2.5px', opacity: 0.65, fontWeight: WEIGHT.bold }}>LIVE SYNC</span>
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(44px, 7vw, 64px)', fontWeight: 400, lineHeight: 1, marginBottom: 10, letterSpacing: '-1px' }}>50+</div>
                  <p style={{ margin: 0, fontSize: FONT.sm, lineHeight: 1.55, opacity: 0.88, maxWidth: 220, fontWeight: WEIGHT.medium }}>
                    Native ATS &amp; CRM links — candidates land where your team already works.
                  </p>
                </div>
              </div>

              {INTEGRATION_BENTO.map((cell, i) => {
                const toneStyle =
                  cell.tone === 'm'
                    ? { background: 'linear-gradient(145deg, #e8f5f0 0%, #ffffff 55%)', boxShadow: '0 4px 20px rgba(95,168,158,0.1)' }
                    : cell.tone === 's'
                      ? { background: C.surface, boxShadow: '0 4px 18px rgba(37,62,66,0.05)' }
                      : { background: '#ffffff', boxShadow: '0 4px 18px rgba(37,62,66,0.06)' }
                const dur = 4.5 + (i % 4) * 0.6
                const delay = i * 0.09
                return (
                  <div
                    key={cell.name}
                    className="companies-int-cell"
                    style={{
                      gridColumn: cell.gc,
                      gridRow: cell.gr,
                      borderRadius: NH_PANEL.innerR,
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center' as const,
                      fontSize: FONT.sm,
                      fontWeight: WEIGHT.semi,
                      color: C.dark,
                      cursor: 'default',
                      animation: `fcIntBob ${dur}s ease-in-out ${delay}s infinite`,
                      ...toneStyle,
                    }}
                  >
                    <span style={{ letterSpacing: '-0.02em' }}>{cell.name}</span>
                  </div>
                )
              })}

              <div
                className="companies-int-cell"
                style={{
                  gridColumn: '1 / 3',
                  gridRow: '4',
                  borderRadius: NH_PANEL.innerR,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(90deg, ${C.accent}12, rgba(95,168,158,0.06))`,
                  color: C.accentD,
                  fontSize: FONT.md,
                  fontWeight: WEIGHT.extra,
                  letterSpacing: '-0.02em',
                  animation: 'fcIntBob 5.5s ease-in-out 0.2s infinite',
                  boxShadow: '0 6px 24px rgba(95,168,158,0.12)',
                }}
              >
                + 35 more
              </div>

              <div
                className="companies-int-cell"
                style={{
                  gridColumn: '4 / 7',
                  gridRow: '4',
                  borderRadius: NH_PANEL.innerR,
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  fontSize: FONT.xs,
                  fontWeight: WEIGHT.semi,
                  color: C.mid,
                  lineHeight: 1.45,
                  animation: 'fcIntBob 6.2s ease-in-out 0.4s infinite',
                  boxShadow: '0 4px 20px rgba(37,62,66,0.05)',
                }}
              >
                SAML · SCIM · Webhooks — enterprise routing when you need it.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA — full-width mint with concentric rings
      ════════════════════════════════════════════════════════ */}
      <section id="companies-cta" style={{ background: HOME.bg, padding: '96px clamp(20px, 5vw, 40px) 96px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal dir="scale">
            <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#166534', border: '1px solid #86efac', padding: '6px 16px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 18 }}>
              Get Started
            </div>
            <h2 className="companies-cta-headline" style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 5.5vw, 72px)', fontWeight: 400, fontStyle: 'normal', color: HOME.dark, margin: '0 0 18px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              <span style={{ display: 'block', fontFamily: SERIF }}>Your next great hire</span>
              <span style={{ display: 'block', fontFamily: SERIF }}>is already in the pipeline.</span>
            </h2>
            <p style={{ fontSize: 17, color: HOME.subtext, lineHeight: 1.72, margin: '0 auto 36px', maxWidth: 480 }}>
              Set up your AI sourcing agent in under 10 minutes. First shortlist typically ready within 4 hours.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 28px', borderRadius: 9999, background: HOME.ctaMint, color: HOME.dark, fontWeight: WEIGHT.bold, fontSize: 16, textDecoration: 'none', border: 'none' }}>
                Start hiring free →
              </a>
              <a href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 28px', borderRadius: 9999, background: '#f9fafb', color: '#374151', fontWeight: WEIGHT.semi, fontSize: 16, textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                Book a demo
              </a>
            </div>
            <p style={{ fontSize: FONT.xs, color: HOME.muted, marginTop: 24, letterSpacing: '0.3px' }}>
              Fixed pricing · CASA Level 3 certified · 50+ ATS integrations
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
