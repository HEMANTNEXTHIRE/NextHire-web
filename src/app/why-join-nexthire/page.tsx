'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT } from '@/constants/typography'

/* ── Palette ──────────────────────────────────────────────────── */
const P = {
  bg:      '#edf5f1',
  white:   '#ffffff',
  surface: '#f7faf9',
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

/* ── Data ─────────────────────────────────────────────────────── */
const BENEFITS = [
  { icon: '💰', title: 'Competitive Compensation', desc: 'Market-leading salaries with performance bonuses and equity packages.', color: P.accentD },
  { icon: '🌍', title: 'Remote-First Culture', desc: 'Work from anywhere in the world with flexible hours and async communication.', color: P.accent },
  { icon: '📈', title: 'Career Growth', desc: 'Clear career ladders, mentorship programs, and learning budget for every team member.', color: P.green },
  { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive health insurance, mental wellness support, and fitness allowances.', color: P.accentD },
  { icon: '🤝', title: 'Inclusive Environment', desc: 'A diverse and inclusive workplace where every voice is heard and respected.', color: P.muted },
  { icon: '🚀', title: 'High Impact Work', desc: "Work on products that directly impact millions of professionals' career journeys.", color: P.accent },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Apply', desc: 'Submit your application with your resume and portfolio. Our team reviews every application personally.', color: P.accent },
  { num: '02', title: 'Screen', desc: 'A quick 30-minute call with our talent team to understand your background and goals.', color: P.accentD },
  { num: '03', title: 'Interview', desc: 'Technical and cultural fit interviews with the team you would be working with.', color: P.muted },
  { num: '04', title: 'Offer', desc: 'Fast decisions. If you are a great fit, we move quickly and make competitive offers.', color: P.green },
]

const ROLES = [
  { dept: 'Engineering', icon: '⚙️', roles: ['Senior Full-Stack Engineer', 'ML Engineer', 'DevOps Engineer'], color: P.accentD },
  { dept: 'Product', icon: '🎯', roles: ['Senior Product Manager', 'UX Designer', 'Product Analyst'], color: P.muted },
  { dept: 'Growth', icon: '📊', roles: ['Growth Marketer', 'Content Strategist', 'SEO Manager'], color: P.accentD },
  { dept: 'Operations', icon: '🤝', roles: ['Career Advisor', 'Customer Success Manager', 'Talent Sourcer'], color: P.green },
]

const STATS = [
  { n: '140+', label: 'Team members worldwide', icon: '👥' },
  { n: '28', label: 'Countries represented', icon: '🌍' },
  { n: '4.9★', label: 'Glassdoor rating', icon: '⭐' },
  { n: '2wk', label: 'Avg hiring process', icon: '⚡' },
]

/* ── Keyframes injected once ──────────────────────────────────── */
const CSS = `
@keyframes wjFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes wjDrift   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-8px)} }
@keyframes wjPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.92)} }
@keyframes wjSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes wjSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes wjSlideR  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
@keyframes wjSlideL  { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
@keyframes wjScale   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
@keyframes wjMarch   { from{background-position:0 0} to{background-position:32px 32px} }
@keyframes wjMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes wjGlow    { 0%,100%{box-shadow:0 0 0 0 rgba(95,168,158,0)} 50%{box-shadow:0 0 0 8px rgba(95,168,158,0.2)} }
@keyframes wjType    { from{width:0} to{width:100%} }
@keyframes wjBlink   { 0%,100%{opacity:1} 49%{opacity:1} 50%{opacity:0} 99%{opacity:0} }
@keyframes wjCountUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes wjOrbit   { from{transform:rotate(0deg) translateX(90px) rotate(0deg)} to{transform:rotate(360deg) translateX(90px) rotate(-360deg)} }

.wj-card-hover {
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease !important;
}
.wj-card-hover:hover {
  transform: translateY(-6px) scale(1.015) !important;
  box-shadow: 0 20px 60px rgba(37,62,66,0.13) !important;
}
.wj-role-row {
  transition: all 0.18s ease;
}
.wj-role-row:hover {
  background: ${P.mint} !important;
  padding-left: 20px !important;
}
.wj-process-step {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.wj-process-step:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(37,62,66,0.10) !important;
}
`

/* ── Scroll reveal wrapper ────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const anim = direction === 'left' ? 'wjSlideR' : direction === 'right' ? 'wjSlideL' : direction === 'scale' ? 'wjScale' : 'wjSlideUp'
  return (
    <div ref={ref} style={{ animation: vis ? `${anim} 0.55s cubic-bezier(.22,.68,0,1.2) ${delay}s both` : 'none', opacity: vis ? undefined : 0 }}>
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function WhyJoinNexthirePage() {
  const [activeRole, setActiveRole] = useState<string | null>(null)

  return (
    <>
      <style suppressHydrationWarning>{CSS}</style>

      {/* ════════════════════════════════════════════════════════
          HERO — split with orbiting elements + typewriter
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.bg, padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) 0', position: 'relative', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>

        {/* Animated marching dots background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${P.sage} 1.2px, transparent 1.2px)`, backgroundSize: '30px 30px', animation: 'wjMarch 8s linear infinite', opacity: 0.5, zIndex: 0 }} />

        {/* Large drifting orb */}
        <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${P.sage}80 0%, transparent 65%)`, top: -160, right: -80, animation: 'wjDrift 14s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${P.mint} 0%, transparent 65%)`, bottom: 80, left: -60, animation: 'wjDrift 18s ease-in-out infinite reverse', zIndex: 0 }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="wj-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

            {/* Left — text */}
            <div style={{ paddingBottom: 80 }}>
              <Reveal direction="left">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(95,168,158,0.12)', border: `1px solid ${P.sage}`, borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: P.accent, display: 'inline-block', animation: 'wjPulse 1.6s ease-in-out infinite', boxShadow: `0 0 8px ${P.accent}` }} />
                  <span style={{ color: P.accentD, fontSize: FONT.sm, fontWeight: WEIGHT.bold, letterSpacing: '0.5px' }}>We&apos;re hiring · {new Date().getFullYear()}</span>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.07}>
                <h1 style={{ fontSize: FONT.xlClamp, fontWeight: WEIGHT.extra, color: P.dark, lineHeight: 1.04, margin: '0 0 22px', letterSpacing: '-2.5px' }}>
                  Build the Future<br />
                  of <span style={{ color: P.accent, position: 'relative', display: 'inline-block' }}>
                    Career
                    <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }} viewBox="0 0 200 10" fill="none">
                      <path d="M0 8 Q50 2 100 6 Q150 10 200 4" stroke={P.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                    </svg>
                  </span>{' '}
                  Transformation
                </h1>
              </Reveal>

              <Reveal direction="left" delay={0.14}>
                <p style={{ fontSize: FONT.md, color: P.mid, lineHeight: 1.72, margin: '0 0 40px', maxWidth: 480 }}>
                  Join a team that is rewriting the rules of hiring. We move fast, think big, and genuinely care about helping people build better careers.
                </p>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: P.dark, color: P.white, fontWeight: WEIGHT.bold, fontSize: FONT.sm, textDecoration: 'none', padding: '13px 28px', borderRadius: 10, transition: 'all 0.2s ease', boxShadow: `0 4px 20px ${P.dark}30` }}>
                    View Open Roles →
                  </Link>
                  <Link href="/about-nexthire" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: P.white, color: P.mid, fontWeight: WEIGHT.semi, fontSize: FONT.sm, textDecoration: 'none', padding: '13px 24px', borderRadius: 10, border: `1px solid ${P.border}`, transition: 'all 0.2s ease' }}>
                    Our Story
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right — animated culture visual */}
            <Reveal direction="right" delay={0.1}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: 80 }}>

                {/* Central hub card */}
                <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 24, padding: 32, boxShadow: '0 12px 60px rgba(37,62,66,0.1)', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: P.muted, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 20 }}>Life at NextHire</div>

                  {/* Team presence row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, padding: '14px 16px', background: P.surface, borderRadius: 12, border: `1px solid ${P.border}` }}>
                    <div style={{ display: 'flex' }}>
                      {['#5fa89e','#3d7a72','#5fa89e','#8aada8','#22c55e'].map((c, i) => (
                        <div key={c} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: '2px solid white', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm, color: 'white', fontWeight: WEIGHT.bold }}>
                          {['P','J','S','A','M'][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: P.dark }}>140+ team members</div>
                      <div style={{ fontSize: FONT.xs, color: P.muted }}>across 28 countries</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: P.green, display: 'inline-block', animation: 'wjPulse 2s ease infinite' }} />
                      <span style={{ fontSize: FONT.xs, color: P.green, fontWeight: 700 }}>12 online</span>
                    </div>
                  </div>

                  {/* Perks row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                    {[
                      { icon: '🌍', label: 'Remote-first', color: P.accent },
                      { icon: '💰', label: 'Equity grants', color: P.accentD },
                      { icon: '📚', label: '$2k learning budget', color: P.accent },
                      { icon: '🏥', label: 'Full health cover', color: P.green },
                    ].map(p => (
                      <div key={p.label} style={{ padding: '10px 12px', background: `${p.color}0d`, border: `1px solid ${p.color}25`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: FONT.base }}>{p.icon}</span>
                        <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.mid }}>{p.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent update */}
                  <div style={{ padding: '12px 14px', background: `${P.accent}10`, border: `1px solid ${P.sage}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: FONT.base }}>🎉</span>
                    <div>
                      <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: P.dark }}>We just closed our Series A</div>
                      <div style={{ fontSize: FONT.xs, color: P.muted }}>18 new roles opening this quarter</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge — Glassdoor */}
                <div style={{ position: 'absolute', bottom: 20, left: -24, background: P.white, border: `1px solid ${P.border}`, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(37,62,66,0.10)', animation: 'wjFloat 4.5s ease-in-out infinite', zIndex: 3 }}>
                  <span style={{ fontSize: FONT.md }}>⭐</span>
                  <div>
                    <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.dark }}>4.9 / 5</div>
                    <div style={{ fontSize: FONT.xs, color: P.muted }}>Glassdoor · 240+ reviews</div>
                  </div>
                </div>

                {/* Floating badge — offer */}
                <div style={{ position: 'absolute', top: -18, right: -18, background: P.dark, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 28px rgba(26,51,56,0.2)', animation: 'wjFloat 5.5s ease-in-out 1s infinite', zIndex: 3 }}>
                  <span style={{ fontSize: FONT.base }}>🚀</span>
                  <div>
                    <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: P.white }}>Offer in &lt;2 weeks</div>
                    <div style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.45)' }}>avg. process time</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Wave separator */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 70" fill="none" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0 40 Q360 0 720 35 Q1080 70 1440 20 L1440 70 L0 70 Z" fill={P.white} />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS MARQUEE BAR
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.white, padding: '20px 0', borderBottom: `1px solid ${P.border}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'wjMarquee 18s linear infinite', width: 'max-content', gap: 0 }}>
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 48px', borderRight: `1px solid ${P.border}`, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: FONT.md }}>{s.icon}</span>
              <span style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: P.accent, letterSpacing: '-0.5px' }}>{s.n}</span>
              <span style={{ fontSize: FONT.sm, color: P.mid, fontWeight: WEIGHT.medium }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BENEFITS — Staggered card grid with glow on hover
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.white, padding: 'clamp(60px,8vw,96px) clamp(20px,5vw,40px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ display: 'inline-block', background: `${P.accent}12`, color: P.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                Why people love it here
              </div>
              <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: P.dark, margin: '0', letterSpacing: '-1px', lineHeight: 1.1 }}>
                More than a job. A mission.
              </h2>
            </div>
          </Reveal>

          <div className="wj-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07} direction="scale">
                <div
                  className="wj-card-hover"
                  style={{ padding: '32px 28px', border: `1px solid ${P.border}`, borderRadius: 20, background: P.white, position: 'relative', overflow: 'hidden', height: '100%' }}
                >
                  {/* Corner color accent */}
                  <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: `${b.color}12`, top: -30, right: -20 }} />

                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${b.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.lg, marginBottom: 18, position: 'relative' }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontSize: FONT.base, fontWeight: WEIGHT.extra, color: P.dark, margin: '0 0 10px', letterSpacing: '-0.2px' }}>{b.title}</h3>
                  <p style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65, margin: 0 }}>{b.desc}</p>

                  {/* Bottom border accent */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${b.color}, transparent)`, borderRadius: '0 0 20px 20px' }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROCESS — Animated connected timeline with progress
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.bg, padding: 'clamp(60px,8vw,96px) clamp(20px,5vw,40px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${P.sage} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.4 }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', background: `${P.accent}12`, color: P.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                Our hiring process
              </div>
              <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: P.dark, margin: '0 0 14px', letterSpacing: '-1px', lineHeight: 1.1 }}>
                From apply to offer.<br />Under 2 weeks.
              </h2>
              <p style={{ fontSize: FONT.base, color: P.mid, maxWidth: 460, margin: '0 auto', lineHeight: 1.65 }}>
                We respect your time. Most candidates move through our process in under 2 weeks.
              </p>
            </div>
          </Reveal>

          {/* Timeline — horizontal connector */}
          <div style={{ position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 2, background: `linear-gradient(90deg, ${P.accent}, ${P.accentD}, ${P.muted}, ${P.green})`, zIndex: 0, borderRadius: 1 }} />

            <div className="wj-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, position: 'relative', zIndex: 1 }}>
              {PROCESS_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.1} direction="scale">
                  <div className="wj-process-step" style={{ background: P.white, borderRadius: 20, padding: '28px 22px', boxShadow: '0 4px 24px rgba(37,62,66,0.06)', border: `1px solid ${P.border}`, textAlign: 'center', cursor: 'default' }}>
                    {/* Number circle */}
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${s.color}15`, border: `2px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', position: 'relative' }}>
                      <span style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: s.color }}>{s.num}</span>
                      {/* Spinning ring */}
                      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px dashed ${s.color}35`, animation: 'wjSpin 8s linear infinite' }} />
                    </div>
                    <h3 style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: P.dark, margin: '0 0 10px', letterSpacing: '-0.2px' }}>{s.title}</h3>
                    <p style={{ fontSize: FONT.sm, color: P.mid, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VALUES / CULTURE INFOGRAPHIC — full-width dark band
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.dark, padding: 'clamp(60px,8vw,88px) clamp(20px,5vw,40px)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,223,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,223,214,0.04) 1px,transparent 1px)`, backgroundSize: '48px 48px', animation: 'wjMarch 12s linear infinite' }} />

        {/* Orbiting glow */}
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${P.accent}18 0%, transparent 65%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="wj-culture-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            <Reveal direction="left">
              <div>
                <div style={{ display: 'inline-block', background: `${P.accent}20`, color: P.accent, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 18 }}>
                  Our culture
                </div>
                <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: P.white, margin: '0 0 18px', letterSpacing: '-1px', lineHeight: 1.1 }}>
                  A team that ships,<br />
                  <span style={{ color: P.accent }}>cares, and wins</span><br />
                  together.
                </h2>
                <p style={{ fontSize: FONT.base, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 32px', maxWidth: 420 }}>
                  We don&apos;t hire for seats. We hire for impact. Every person on our team can draw a direct line between their work and the careers they&apos;ve changed.
                </p>
                {[
                  { label: 'Candidate NPS', value: 78, color: P.accent },
                  { label: 'Employee retention', value: 91, color: P.green },
                  { label: 'Internal promotion rate', value: 63, color: P.accent },
                ].map(r => (
                  <div key={r.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: FONT.sm, color: 'rgba(255,255,255,0.6)', fontWeight: WEIGHT.medium }}>{r.label}</span>
                      <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: r.color }}>{r.value}%</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: `${r.value}%`, background: r.color, borderRadius: 4, transition: 'width 1.2s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { icon: '🧠', title: 'First-principles thinking', desc: 'We question everything and build from scratch when the standard solution isn\'t good enough.' },
                  { icon: '⚡', title: 'Bias for action', desc: 'We ship fast, learn faster. Done beats perfect when learning is the goal.' },
                  { icon: '❤️', title: 'Radical candor', desc: 'We give direct feedback with empathy. Honest > comfortable.' },
                  { icon: '🌱', title: 'Long-term thinking', desc: 'We build for decades, not quarters. We hire people who want to grow with us.' },
                ].map((v, i) => (
                  <div key={v.title} style={{ padding: '22px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,223,214,0.1)', borderRadius: 16, animation: `wjSlideUp 0.5s ease ${0.1 + i * 0.07}s both` }}>
                    <div style={{ fontSize: FONT.lg, marginBottom: 10 }}>{v.icon}</div>
                    <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.white, marginBottom: 6 }}>{v.title}</div>
                    <div style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          OPEN ROLES — interactive department grid
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: P.white, padding: 'clamp(60px,8vw,96px) clamp(20px,5vw,40px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-block', background: `${P.accent}12`, color: P.accentD, padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 14 }}>
                Open roles
              </div>
              <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: P.dark, margin: '0', letterSpacing: '-1px' }}>
                Find your place on the team.
              </h2>
            </div>
          </Reveal>

          <div className="wj-roles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {ROLES.map((dept, i) => (
              <Reveal key={dept.dept} delay={i * 0.08} direction="scale">
                <div
                  className="wj-card-hover"
                  style={{ borderRadius: 20, border: `1px solid ${P.border}`, background: P.white, overflow: 'hidden' }}
                >
                  {/* Dept header */}
                  <div style={{ padding: '20px 24px', background: `${dept.color}08`, borderBottom: `1px solid ${dept.color}20`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${dept.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.md }}>
                      {dept.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: P.dark, letterSpacing: '-0.2px' }}>{dept.dept}</div>
                      <div style={{ fontSize: FONT.xs, color: dept.color, fontWeight: WEIGHT.semi }}>{dept.roles.length} open roles</div>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: P.green, animation: 'wjPulse 2s ease infinite' }} />
                  </div>
                  {/* Roles list */}
                  <div>
                    {dept.roles.map((role, j) => (
                      <div
                        key={role}
                        className="wj-role-row"
                        style={{ padding: '14px 24px', borderBottom: j < dept.roles.length - 1 ? `1px solid ${P.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.18s ease', background: activeRole === role ? P.surface : 'transparent' }}
                        onMouseEnter={() => setActiveRole(role)}
                        onMouseLeave={() => setActiveRole(null)}
                      >
                        <div>
                          <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: activeRole === role ? dept.color : P.dark }}>{role}</div>
                          <div style={{ fontSize: FONT.xs, color: P.muted, marginTop: 2 }}>Full-time · Remote</div>
                        </div>
                        <Link
                          href="/contact-us"
                          style={{ fontSize: FONT.sm, color: dept.color, fontWeight: WEIGHT.bold, textDecoration: 'none', background: `${dept.color}12`, padding: '6px 14px', borderRadius: 8, border: `1px solid ${dept.color}25`, transition: 'all 0.15s ease', whiteSpace: 'nowrap' }}
                          onClick={e => e.stopPropagation()}
                        >
                          Apply →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Not seeing your role */}
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 40, padding: '28px', background: P.surface, border: `1px solid ${P.border}`, borderRadius: 16 }}>
              <p style={{ fontSize: FONT.sm, color: P.mid, margin: '0 0 14px' }}>
                Don&apos;t see your role? We&apos;re always looking for exceptional people.
              </p>
              <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: P.dark, color: P.white, fontWeight: WEIGHT.bold, fontSize: FONT.sm, textDecoration: 'none', padding: '11px 24px', borderRadius: 9, transition: 'all 0.2s ease' }}>
                Send us your profile →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <DualActionCTA
        leftTitle="READY TO JOIN?"
        leftSubtitle="Join a team transforming career growth for millions"
        leftLabel="Apply Now"
        leftHref="/contact-us"
        rightTitle="HAVE QUESTIONS?"
        rightSubtitle="Talk to someone on our team"
        rightLabel="Schedule Now"
        rightHref="/contact-us"
      />
    </>
  )
}
