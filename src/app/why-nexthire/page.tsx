'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT } from '@/constants/typography'

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

const INTEGRATIONS = [
  'Greenhouse','Lever','Ashby','Workable','Workday',
  'Bullhorn','Recruit CRM','Zoho Recruit','SmartRecruiters','HiBob',
  'Salesforce','HubSpot','Gmail','Outlook','Slack',
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
@keyframes fcMarq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes fcGlow    { 0%,100%{box-shadow:0 0 0 0 rgba(95,168,158,0)} 50%{box-shadow:0 0 0 10px rgba(95,168,158,0.15)} }
@keyframes fcBarFill { from{width:0} to{width:var(--bw)} }
@keyframes fcRipple  { from{transform:scale(0.8);opacity:1} to{transform:scale(2);opacity:0} }
@keyframes fcBlink   { 0%,45%{opacity:1} 50%,95%{opacity:0} 100%{opacity:1} }
@keyframes fcWave    { 0%{d:path("M0 15 Q180 5 360 15 Q540 25 720 15 Q900 5 1080 15 Q1260 25 1440 15")} 50%{d:path("M0 15 Q180 25 360 15 Q540 5 720 15 Q900 25 1080 15 Q1260 5 1440 15")} 100%{d:path("M0 15 Q180 5 360 15 Q540 25 720 15 Q900 5 1080 15 Q1260 25 1440 15")} }
@keyframes fcTypeIn  { from{max-width:0;opacity:0} to{max-width:600px;opacity:1} }
@keyframes fcCountUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

.fc-card { transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease !important; }
.fc-card:hover { transform: translateY(-5px) !important; box-shadow: 0 18px 56px rgba(37,62,66,0.12) !important; }
.fc-int-pill { transition: all 0.18s ease !important; }
.fc-int-pill:hover { background: ${C.dark} !important; color: ${C.white} !important; transform: scale(1.05) !important; border-color: ${C.dark} !important; }
.fc-feature-card { transition: border-color 0.2s, background 0.2s !important; }
.fc-feature-card:hover { border-color: ${C.accent} !important; background: ${C.mint} !important; }
.fc-compare-row { transition: background 0.15s ease !important; }
.fc-compare-row:hover { background: ${C.mint} !important; }
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
    <span style={{ color: C.accent }}>
      {displayed}
      <span style={{ display: 'inline-block', width: 2, height: '0.85em', background: C.accent, verticalAlign: 'text-bottom', marginLeft: 2, animation: 'fcBlink 1s step-end infinite' }} />
    </span>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function ForCompaniesPage() {
  const [activeFeature, setActiveFeature] = useState(0)

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
        <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.sage}`, boxShadow: '0 8px 32px rgba(37,62,66,0.08)' }}>
          <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.sage}`, display: 'flex', alignItems: 'center', gap: 8, background: C.white }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[C.dark, C.muted, C.accent].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
            </div>
            <span style={{ fontSize: FONT.xs, color: C.muted, marginLeft: 6, fontWeight: WEIGHT.medium }}>AI Sourcing Agent · Live</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'fcPulse 2s ease infinite', display: 'inline-block', boxShadow: `0 0 6px ${C.green}` }} />
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.green }}>SCANNING</span>
            </span>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ background: C.mint, border: `1px solid ${C.sage}`, borderRadius: 8, padding: '9px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: FONT.sm }}>🔍</span>
              <span style={{ fontSize: FONT.xs, color: C.accentD, fontWeight: WEIGHT.medium }}>&quot;Senior Product Manager, fintech, Series B+, remote&quot;</span>
            </div>
            {[
              { name: 'Priya Mehta',   role: 'Senior PM · Razorpay',   score: 98, delay: '0s' },
              { name: 'Arjun Sharma',  role: 'Product Lead · CRED',     score: 94, delay: '0.1s' },
              { name: 'Nisha Kapoor',  role: 'Group PM · PhonePe',      score: 91, delay: '0.2s' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', background: C.white, border: `1px solid ${C.sage}`, borderRadius: 8, marginBottom: 7, animation: `fcSlideL 0.4s ease ${p.delay} both` }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, flexShrink: 0 }}>{p.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.dark }}>{p.name}</div>
                  <div style={{ fontSize: FONT.xs, color: C.muted, marginTop: 1 }}>{p.role}</div>
                </div>
                <div style={{ background: `${C.accent}18`, border: `1px solid ${C.sage}`, borderRadius: 5, padding: '2px 7px', fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent }}>{p.score}%</div>
              </div>
            ))}
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[{ n: '428', l: 'Profiles found' }, { n: '4h', l: 'Shortlist ready' }].map(s => (
                <div key={s.l} style={{ background: C.mint, border: `1px solid ${C.sage}`, borderRadius: 8, padding: '10px', textAlign: 'center' }}>
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
        <div style={{ background: C.light, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.sage}`, boxShadow: '0 8px 32px rgba(37,62,66,0.08)' }}>
          <div style={{ background: C.dark, padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, letterSpacing: '1px' }}>AI PHONE SCREEN · LIVE</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'fcPulse 1.8s ease infinite', display: 'inline-block' }} />
              <span style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.55)', fontWeight: WEIGHT.semi }}>In progress</span>
            </span>
          </div>
          <div style={{ padding: '16px' }}>
            {[
              { q: 'Tell me about your most impactful product launch.', score: 92, tag: 'Strong', c: C.green },
              { q: 'How do you prioritise between engineering debt and features?', score: 87, tag: 'Strong', c: C.green },
              { q: 'Describe a time you disagreed with a stakeholder.', score: 74, tag: 'Good', c: C.accentD },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10, padding: '11px 13px', background: C.white, borderRadius: 10, border: `1px solid ${C.sage}` }}>
                <div style={{ fontSize: FONT.xs, color: C.mid, lineHeight: 1.5, marginBottom: 7 }}>{item.q}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ flex: 1, height: 4, background: C.sage, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.score}%`, background: item.c, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: item.c, minWidth: 22 }}>{item.score}</span>
                  <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, background: `${item.c}15`, color: item.c, padding: '1px 6px', borderRadius: 4 }}>{item.tag}</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, padding: '10px 13px', background: C.mint, border: `1px solid ${C.sage}`, borderRadius: 8 }}>
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
        <div style={{ background: C.white, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.sage}`, boxShadow: '0 8px 32px rgba(37,62,66,0.08)' }}>
          <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.sage}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${C.accentD}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm }}>✉️</div>
            <div>
              <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.dark }}>Outreach preview</div>
              <div style={{ fontSize: FONT.xs, color: C.mid }}>Sent from your own Gmail · Auto-personalised</div>
            </div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: FONT.xs, color: C.mid, marginBottom: 3 }}>To: priya@razorpay.com</div>
            <div style={{ fontSize: FONT.sm, color: C.dark, lineHeight: 1.65, padding: '11px', background: C.light, borderRadius: 8, marginBottom: 12 }}>
              Hi Priya, I noticed Razorpay&apos;s PM team expanded 22% this quarter — usually a signal you&apos;re scaling a new product surface. I&apos;ve been working with teams at that stage and would love to share what we&apos;ve seen work…
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[{ n: '64%', l: 'Open rate', c: C.accentD }, { n: '31%', l: 'Reply rate', c: C.green }].map(s => (
                <div key={s.l} style={{ padding: '10px', background: C.light, borderRadius: 8, textAlign: 'center', border: `1px solid ${C.sage}` }}>
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
          HERO — split with typewriter + animated orbs
      ════════════════════════════════════════════════════════ */}
      <section id="why-nexthire-hero" style={{ background: C.light, padding: '110px 40px 110px', position: 'relative', overflow: 'hidden', minHeight: 'auto', display: 'flex', alignItems: 'center' }}>

        {/* Animated dot march */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.sage} 1.2px, transparent 1.2px)`, backgroundSize: '30px 30px', animation: 'fcMarch 10s linear infinite', opacity: 0.45, zIndex: 0 }} />

        {/* Drift orbs */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${C.sage}70 0%, transparent 65%)`, top: -200, right: -100, animation: 'fcDrift 16s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${C.mint} 0%, transparent 65%)`, bottom: 100, left: -80, animation: 'fcDrift 20s ease-in-out infinite reverse', zIndex: 0 }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left text */}
            <div style={{ paddingBottom: 80 }}>
              <Reveal dir="left">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${C.accent}18`, border: `1px solid ${C.accent}35`, borderRadius: 100, padding: '5px 14px', marginBottom: 28 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, display: 'inline-block', boxShadow: `0 0 8px ${C.accent}`, animation: 'fcPulse 1.8s ease infinite' }} />
                  <span style={{ color: C.accentD, fontSize: FONT.sm, fontWeight: WEIGHT.bold, letterSpacing: '0.5px' }}>NextHire for Companies</span>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.07}>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', margin: '0 0 22px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
                  <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>Hire the right people.</span>
                  <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>
                    <Typewriter texts={['In days, not months.', 'At 10× the speed.', 'With zero wasted hours.']} />
                  </span>
                </h1>
              </Reveal>

              <Reveal dir="left" delay={0.14}>
                <p style={{ color: C.mid, fontSize: FONT.md, lineHeight: 1.75, margin: '0 0 40px', maxWidth: 500 }}>
                  Five AI agents — sourcing, phone screening, SMS engagement, video interviewing, and personalised outreach — running in parallel so your team only meets pre-qualified finalists.
                </p>
              </Reveal>

              <Reveal dir="left" delay={0.2}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.dark, color: C.white, fontWeight: WEIGHT.bold, fontSize: FONT.sm, textDecoration: 'none', padding: '13px 28px', borderRadius: 10, transition: 'all 0.2s ease', boxShadow: `0 4px 20px ${C.dark}30` }}>
                    Start hiring free →
                  </a>
                  <a href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.white, color: C.mid, fontWeight: WEIGHT.semi, fontSize: FONT.sm, textDecoration: 'none', padding: '13px 24px', borderRadius: 10, border: `1px solid ${C.sage}`, transition: 'all 0.2s ease' }}>
                    Book a demo
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right — animated stats card */}
            <Reveal dir="right" delay={0.1}>
              <div style={{ position: 'relative', paddingBottom: 60 }}>
                <div style={{ background: C.white, border: `1px solid ${C.sage}`, borderRadius: 24, padding: 36, boxShadow: '0 8px 48px rgba(37,62,66,0.09)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, position: 'relative', zIndex: 2 }}>
                  {STATS.map((s, i) => (
                    <div key={s.l} style={{ textAlign: 'center', padding: '16px 10px', background: i % 2 === 0 ? C.surface : C.mint, borderRadius: 14, border: `1px solid ${C.sage}`, animation: `fcCountUp 0.5s ease ${0.15 + i * 0.1}s both` }}>
                      <div style={{ fontSize: FONT.md, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: WEIGHT.extra, color: C.accent, lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: FONT.xs, color: C.mid, marginTop: 8, lineHeight: 1.4, fontWeight: WEIGHT.medium }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Floating speed badge */}
                <div style={{ position: 'absolute', bottom: 10, left: -28, background: C.dark, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(26,51,56,0.22)', animation: 'fcFloat 4.5s ease-in-out infinite', zIndex: 3 }}>
                  <span style={{ fontSize: FONT.md }}>⚡</span>
                  <div>
                    <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.white }}>First shortlist in 4 hrs</div>
                    <div style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.45)' }}>vs 2–3 weeks traditional</div>
                  </div>
                </div>

                {/* Floating certification badge */}
                <div style={{ position: 'absolute', top: -20, right: -16, background: C.white, border: `1px solid ${C.sage}`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(37,62,66,0.08)', animation: 'fcFloat 5.5s ease-in-out 1.2s infinite', zIndex: 3 }}>
                  <span style={{ fontSize: FONT.base }}>🔒</span>
                  <div>
                    <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.dark }}>CASA Level 3</div>
                    <div style={{ fontSize: FONT.xs, color: C.muted }}>Privacy certified</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Wave separator */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 70" fill="none" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0 20 Q360 70 720 30 Q1080 0 1440 50 L1440 70 L0 70 Z" fill={C.white} />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          INTEGRATION MARQUEE
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: C.white, padding: '18px 0', borderBottom: `1px solid ${C.sage}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'fcMarq 20s linear infinite', width: 'max-content', gap: 0 }}>
          {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 32px', borderRight: `1px solid ${C.sage}`, whiteSpace: 'nowrap' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, display: 'inline-block', opacity: 0.5 }} />
              <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.mid }}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PLATFORM TABS — Sticky selector + content
      ════════════════════════════════════════════════════════ */}
      <section id="why-nexthire-platform" style={{ background: C.white, padding: '110px 40px 110px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>

          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-block', background: `${C.accent}12`, color: C.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                The Platform
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
                Five agents. One pipeline.
              </h2>
            </div>
          </Reveal>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 52, flexWrap: 'wrap' }}>
            {PLATFORM_FEATURES.map((f, i) => (
              <button
                key={f.tag}
                onClick={() => setActiveFeature(i)}
                style={{
                  padding: '10px 22px', borderRadius: 10, border: `1px solid ${activeFeature === i ? f.color : C.sage}`,
                  background: activeFeature === i ? `${f.color}12` : C.white,
                  color: activeFeature === i ? f.color : C.muted,
                  fontWeight: WEIGHT.bold, fontSize: FONT.sm, cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <span>{f.icon}</span>
                <span>{f.tag}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          {PLATFORM_FEATURES.map((feat, idx) => idx === activeFeature && (
            <div key={feat.tag} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', animation: 'fcSlideUp 0.35s ease' }}>
              {/* Text */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: feat.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: `${feat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm }}>{feat.icon}</div>
                  {feat.tag}
                </div>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 18px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
                  {feat.heading}
                </h2>
                <p style={{ fontSize: FONT.base, color: C.mid, lineHeight: 1.78, margin: '0 0 36px', maxWidth: 460 }}>
                  {feat.body}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {feat.features.map(f => (
                    <div key={f.title} className="fc-feature-card" style={{ padding: '16px', background: C.surface, borderRadius: 12, border: `1px solid ${C.sage}`, cursor: 'default' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: feat.color, flexShrink: 0 }} />
                        <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: C.dark }}>{f.title}</div>
                      </div>
                      <div style={{ fontSize: FONT.xs, color: C.mid, lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mockup */}
              <div style={{ animation: 'fcSlideR 0.4s ease' }}>
                {feat.mockup}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COMPARISON TABLE — animated rows
      ════════════════════════════════════════════════════════ */}
      <section id="why-nexthire-compare" style={{ background: C.surface, padding: '110px 40px 110px' }}>
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
            <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.sage}`, boxShadow: '0 4px 32px rgba(37,62,66,0.06)' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: C.mint, padding: '14px 24px', borderBottom: `1px solid ${C.sage}` }}>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.muted, letterSpacing: '1px', textTransform: 'uppercase' }}>Metric</div>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: C.muted, letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Traditional</div>
                <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: C.accent, letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>NextHire ✓</div>
              </div>
              {COMPARE_ROWS.map((row, i) => (
                <div key={row.feature} className="fc-compare-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 24px', background: i % 2 === 0 ? C.white : C.surface, borderBottom: i < COMPARE_ROWS.length - 1 ? `1px solid ${C.sage}` : 'none', alignItems: 'center' }}>
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
      <section style={{ background: C.dark, padding: '72px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,223,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,223,214,0.04) 1px,transparent 1px)`, backgroundSize: '40px 40px', animation: 'fcMarch 14s linear infinite' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}15 0%, transparent 65%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { target: 800, suffix: 'M+', label: 'Profiles in talent graph', icon: '🌐', color: C.accent },
              { target: 70, suffix: '%', label: 'Reduction in recruiter hours', icon: '⏱️', color: C.green },
              { target: 10, suffix: '×', label: 'Faster shortlist delivery', icon: '⚡', color: C.accentD },
              { target: 80, suffix: '%', label: 'Interview completion rate', icon: '🎯', color: C.accentD },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} dir="scale">
                <div style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,223,214,0.1)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
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
          INTEGRATIONS — animated hover pills
      ════════════════════════════════════════════════════════ */}
      <section id="why-nexthire-integrations" style={{ background: C.white, padding: '110px 40px 110px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{ display: 'inline-block', background: `${C.accent}12`, color: C.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
              Integrations
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              Works with your existing stack.
            </h2>
            <p style={{ fontSize: FONT.base, color: C.mid, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>Shortlists, transcripts, and scores sync directly — no manual data entry.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {INTEGRATIONS.map(name => (
                <div key={name} className="fc-int-pill" style={{ padding: '9px 18px', background: C.light, borderRadius: 8, border: `1px solid ${C.sage}`, fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.mid, cursor: 'pointer', transition: 'all 0.18s ease' }}>
                  {name}
                </div>
              ))}
              <div style={{ padding: '9px 18px', background: C.surface, borderRadius: 8, border: `1px solid ${C.sage}`, fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: C.muted }}>
                + 35 more
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA — full-width mint with concentric rings
      ════════════════════════════════════════════════════════ */}
      <section id="why-nexthire-cta" style={{ background: C.light, padding: '110px 40px 110px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Concentric animated rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 0 }}>
          {[280, 420, 560, 700].map((size, i) => (
            <div key={size} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid ${C.sage}`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 - i * 0.05, animation: `fcSpin ${20 + i * 8}s linear infinite${i % 2 ? ' reverse' : ''}` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.sage} 1px, transparent 1px)`, backgroundSize: '32px 32px', opacity: 0.4 }} />

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal dir="scale">
            <div style={{ display: 'inline-block', background: `${C.accent}12`, color: C.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 18 }}>
              Get Started
            </div>
            <h2 className="why-nexthire-cta-headline" style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 5.5vw, 72px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 18px', letterSpacing: '-0.5px', lineHeight: 1.22, fontSynthesis: 'none' }}>
              <span style={{ display: 'block', fontFamily: SERIF }}>Your next great hire</span>
              <span style={{ display: 'block', fontFamily: SERIF }}>is already in the pipeline.</span>
            </h2>
            <p style={{ fontSize: FONT.base, color: C.mid, lineHeight: 1.72, margin: '0 auto 36px', maxWidth: 420 }}>
              Set up your AI sourcing agent in under 10 minutes. First shortlist typically ready within 4 hours.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.dark, color: C.white, fontWeight: WEIGHT.bold, fontSize: FONT.sm, textDecoration: 'none', padding: '14px 30px', borderRadius: 10, transition: 'all 0.2s ease', boxShadow: `0 6px 24px ${C.dark}30`, animation: 'fcGlow 3s ease-in-out infinite' }}>
                Start hiring free →
              </a>
              <a href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.white, color: C.mid, fontWeight: WEIGHT.semi, fontSize: FONT.sm, textDecoration: 'none', padding: '14px 26px', borderRadius: 10, border: `1px solid ${C.sage}`, transition: 'all 0.2s ease' }}>
                Book a demo
              </a>
            </div>
            <p style={{ fontSize: FONT.xs, color: C.muted, marginTop: 22, letterSpacing: '0.3px' }}>
              Fixed pricing · CASA Level 3 certified · 50+ ATS integrations
            </p>
          </Reveal>
        </div>
      </section>

      <DualActionCTA
        leftTitle="GET STARTED"
        leftSubtitle="Build a team that wins"
        leftLabel="Start hiring free"
        leftHref="https://app.nexthireconsulting.com"
        rightTitle="TALK TO AN EXPERT"
        rightSubtitle="Let our team walk you through the platform"
        rightLabel="Book a demo"
        rightHref="/contact-us"
      />
    </>
  )
}
