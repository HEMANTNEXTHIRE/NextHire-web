import type { Metadata } from 'next'
import type React from 'react'
import Link from 'next/link'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

export const metadata: Metadata = {
  title: 'How NextHire Works | AI Agent for Job Search',
  description:
    'See how NextHire\'s AI agent discovers hidden roles, reaches hiring managers directly, and coaches you through every interview — on autopilot.',
  openGraph: {
    title: 'How NextHire Works | AI Job Search Agent',
    description: 'An AI agent that scans millions of jobs, applies on your behalf, and introduces you to hiring managers.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/candidates' },
}

/* ── data ── */
const HOW_STEPS = [
  {
    num: '01',
    color: '#5fa89e',
    title: 'Agent scans & discovers',
    desc: 'Your AI agent runs 24/7 — scanning millions of live jobs, monitoring LinkedIn hiring signals, detecting team growth patterns, and mapping decision-makers at every target company. It finds roles that never get posted publicly.',
    detail: 'You don\'t scroll job boards. The agent does.',
    bullets: ['Live job scanning across 14M+ roles', 'Unposted & hidden role detection', 'Hiring signal monitoring (LinkedIn, team growth)', 'Decision-maker mapping — HRs, founders, CTOs'],
  },
  {
    num: '02',
    color: '#3d7a72',
    title: 'Agent applies & reaches out',
    desc: 'For each match, the agent submits a tailored application with a role-specific resume and cover letter. Simultaneously, it sends a personalised outreach email to the hiring manager — from your own Gmail, auto-deleted after delivery.',
    detail: 'CASA Level 3 certified. Contacts never exposed.',
    bullets: ['Tailored resume per application (ATS-optimised)', 'Personalised outreach from your own Gmail', 'Auto-deleted after send via Google API', 'CASA Level 3 certified privacy'],
  },
  {
    num: '03',
    color: '#5fa89e',
    title: 'You prep & interview',
    desc: 'The AI Interview Coach preps you for every call — mock interviews calibrated to your target company, real-time coaching during live calls, and score-by-score feedback. Walk in sharp. Walk out confident.',
    detail: '75% offer rate reported by users after Copilot.',
    bullets: ['Mock interviews calibrated to company & role', 'Real-time AI coaching during live interviews', 'Score-by-score answer feedback', 'Salary negotiation coaching'],
  },
  {
    num: '04',
    color: '#22c55e',
    title: 'You land the offer',
    desc: 'Every outreach, reply, application, and interview stage is tracked in your dashboard. Your advisor helps close the offer. You see everything — zero guesswork, full control.',
    detail: 'Every activity tracked. Every follow-up handled.',
    bullets: ['Full activity dashboard', 'Follow-up reminders', 'Offer negotiation support', 'Advisor-backed closing'],
  },
]

const TOOLS = [
  { color: '#5fa89e', label: 'AI Auto Apply',           desc: 'Applies to hundreds of matched roles with a tailored resume per application.' },
  { color: '#3d7a72', label: 'AI Outreach Agent',       desc: 'Personalised emails to hiring managers from your own Gmail. Auto-deleted after send.' },
  { color: '#5fa89e', label: 'Resume Builder',          desc: 'ATS-optimised resume drafted by AI, reviewed by experts, tuned to each role.' },
  { color: '#5fa89e', label: 'AI Interview Coach',      desc: 'Real-time coaching on live calls. Surface answers and flag gaps as they happen.' },
  { color: '#22c55e', label: 'AI Interviewer',          desc: 'Mock interviews calibrated to your target company. Scored feedback on every answer.' },
  { color: '#8aada8', label: 'Job Tracker',             desc: 'Every application, reply, and interview stage in one dashboard with reminders.' },
  { color: '#3d7a72', label: 'Portal Optimization',     desc: 'Ranks your profile across major job portals so recruiters find you first.' },
  { color: '#5fa89e', label: 'Direct Recruiter InMail', desc: 'Targeted InMail to recruiters in your space, personalised and privacy-safe.' },
]

/* ── Mini-mockup visuals for each tool card ──────────────────── */
function ToolMockup({ label, color }: { label: string; color: string }) {
  const box: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: 14,
    padding: '16px 18px',
    boxShadow: '0 2px 12px rgba(37,62,66,0.07)',
  }
  const row: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: 9, marginBottom: 9,
    borderBottom: '1px solid rgba(200,223,214,0.4)',
  }
  const bar = (pct: number, c: string) => (
    <div style={{ flex: 1, height: 5, background: 'rgba(200,223,214,0.45)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: c, borderRadius: 999 }} />
    </div>
  )
  const chip = (txt: string, c: string) => (
    <span key={txt} style={{ fontSize: 10, fontWeight: 700, color: c, background: `${c}18`, padding: '2px 8px', borderRadius: 100 }}>{txt}</span>
  )

  if (label === 'AI Auto Apply') return (
    <div style={box}>
      {[
        { co: 'Stripe', role: 'Senior PM' },
        { co: 'Razorpay', role: 'Product Lead' },
        { co: 'CRED', role: 'PM II' },
      ].map((r, i) => (
        <div key={r.co} style={{ ...row, ...(i === 2 ? { paddingBottom: 0, marginBottom: 0, borderBottom: 'none' } : {}) }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#1a3338' }}>{r.co} · {r.role}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 9px', borderRadius: 100 }}>Sent ✓</span>
        </div>
      ))}
      <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: color }}>+38 applied today</div>
    </div>
  )

  if (label === 'AI Outreach Agent') return (
    <div style={box}>
      <div style={{ fontSize: 11, color: '#8aada8', marginBottom: 7 }}>To: priya@razorpay.com</div>
      <div style={{ fontSize: 12, color: '#1a3338', lineHeight: 1.55, marginBottom: 12, fontStyle: 'italic' }}>
        &ldquo;Hi Priya, noticed Razorpay&apos;s team expanded 22% this quarter…&rdquo;
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {chip('64% Open', '#3d7a72')}
        {chip('31% Reply', '#22c55e')}
      </div>
    </div>
  )

  if (label === 'Resume Builder') return (
    <div style={box}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#1a3338', marginBottom: 8 }}>Alex Chen · Product Manager</div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const, marginBottom: 12 }}>
        {['Agile', 'Data', 'Growth'].map(s => chip(s, color))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {bar(94, color)}
        <span style={{ fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>94 ATS</span>
      </div>
    </div>
  )

  if (label === 'AI Interview Coach') return (
    <div style={box}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', color: color, textTransform: 'uppercase' as const, marginBottom: 10 }}>Live coaching</div>
      {[
        { type: 'IMPACT', tip: 'Mention your $2M revenue impact' },
        { type: 'TIP',    tip: 'Ask about their Q3 OKRs' },
      ].map((c, i) => (
        <div key={c.type} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', ...(i === 0 ? { marginBottom: 9, paddingBottom: 9, borderBottom: '1px solid rgba(200,223,214,0.4)' } : {}) }}>
          <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}18`, padding: '2px 6px', borderRadius: 5, flexShrink: 0, marginTop: 1 }}>{c.type}</span>
          <span style={{ fontSize: 11, color: '#3d5a56', lineHeight: 1.5 }}>{c.tip}</span>
        </div>
      ))}
    </div>
  )

  if (label === 'AI Interviewer') return (
    <div style={box}>
      <div style={{ fontSize: 11, color: '#8aada8', marginBottom: 7 }}>Mock interview · Q3 of 5</div>
      <div style={{ fontSize: 12, color: '#1a3338', lineHeight: 1.5, marginBottom: 12 }}>
        &ldquo;Tell me about your most impactful product launch.&rdquo;
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {bar(87, '#22c55e')}
        <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', flexShrink: 0 }}>87 Strong</span>
      </div>
    </div>
  )

  if (label === 'Job Tracker') return (
    <div style={box}>
      {[
        { stage: 'Applied',    count: 24, pct: 100, c: '#8aada8' },
        { stage: 'Screening',  count: 7,  pct: 29,  c: color },
        { stage: 'Interviews', count: 3,  pct: 13,  c: '#22c55e' },
      ].map(s => (
        <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#8aada8', width: 62, flexShrink: 0 }}>{s.stage}</span>
          {bar(s.pct, s.c)}
          <span style={{ fontSize: 11, fontWeight: 700, color: s.c, width: 18, textAlign: 'right' as const, flexShrink: 0 }}>{s.count}</span>
        </div>
      ))}
    </div>
  )

  if (label === 'Portal Optimization') return (
    <div style={box}>
      {[
        { portal: 'LinkedIn', rank: 'Top 8%',  pct: 92 },
        { portal: 'Indeed',   rank: 'Top 14%', pct: 86 },
        { portal: 'Naukri',   rank: 'Top 6%',  pct: 94 },
      ].map(p => (
        <div key={p.portal} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#8aada8', width: 50, flexShrink: 0 }}>{p.portal}</span>
          {bar(p.pct, color)}
          <span style={{ fontSize: 11, fontWeight: 700, color, width: 46, textAlign: 'right' as const, flexShrink: 0 }}>{p.rank}</span>
        </div>
      ))}
    </div>
  )

  /* Direct Recruiter InMail */
  return (
    <div style={box}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color, flexShrink: 0 }}>P</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a3338' }}>Priya Mehta · Stripe</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, lineHeight: 1.5 }}>&ldquo;This is exactly what I was looking for…&rdquo;</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {chip('Sent via Gmail', color)}
        {chip('Reply received', '#22c55e')}
      </div>
    </div>
  )
}

const PROOF = [
  { n: '1M+',  l: 'professionals onboarded' },
  { n: '14M',  l: 'jobs scanned daily' },
  { n: '64%',  l: 'avg email open rate' },
  { n: '31%',  l: 'reply rate (vs 4% cold avg)' },
  { n: '75%',  l: 'offer rate with Interview Copilot' },
]

const FAQS = [
  {
    q: 'How is this different from just applying myself?',
    a: 'The agent applies to 40× more roles than you could manually, finds unposted opportunities, and simultaneously reaches out directly to the hiring manager — not just submitting to an ATS black hole.',
  },
  {
    q: 'Is the outreach really from my email?',
    a: 'Yes. Emails are sent from your own Gmail identity using Google APIs, and are automatically deleted from your Sent folder after delivery. Recruiter contacts are never publicly exposed. This approach is CASA Level 3 certified.',
  },
  {
    q: 'When do I pay?',
    a: 'NextHire has simple fixed pricing — no success fees, no hidden charges. You know exactly what you pay upfront, and our team is fully incentivised to get you placed fast.',
  },
  {
    q: 'What roles and industries does this work for?',
    a: 'The platform works across all professional roles — tech, product, design, finance, marketing, operations. The outreach and application strategy is tailored to each industry and seniority level.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most users see their first outreach replies within 48–72 hours. Interview calls typically start appearing in the first 2 weeks. Offers typically come within 4–8 weeks depending on role seniority.',
  },
]

export default function CandidatesPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section id="candidates-hero" style={{
        background: '#edf5f1',
        padding: '110px 40px 110px', position: 'relative', overflow: 'hidden',
      }}>
        {/* bg orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle,rgba(95,168,158,0.18) 0%,transparent 65%)', borderRadius: '50%', top: -200, right: -100 }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#c8dfd6 1px,transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(95,168,158,0.12)', border: '1px solid rgba(95,168,158,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 32 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#5fa89e', display: 'inline-block', boxShadow: '0 0 8px #5fa89e' }} />
            <span style={{ color: '#3d7a72', fontSize: FONT.sm, fontWeight: WEIGHT.semi, letterSpacing: '0.5px' }}>How It Works</span>
          </div>

          <h1 style={{
            fontFamily: SERIF, color: '#111827', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400,
            lineHeight: 1.22, margin: '0 0 24px', letterSpacing: '-0.5px',
          }}>
            <span style={{ display: 'block', fontFamily: SERIF }}>Your AI agent runs the job search.</span>
            <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>You show up for the offer.</span>
          </h1>

          <p style={{ color: '#3d5a56', fontSize: FONT.base, lineHeight: 1.7, margin: '0 auto 48px', maxWidth: 620 }}>
            From discovery to outreach to interviews — every step automated, tracked, and optimised. You don&apos;t apply to jobs. Your AI agent does.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
            <a href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer"
              className="button-primary w-button">
              Start for free →
            </a>
            <Link href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              color: '#3d5a56', fontSize: FONT.sm, fontWeight: WEIGHT.medium,
              textDecoration: 'none', border: '1px solid #c8dfd6',
              borderRadius: 8, padding: '11px 22px', background: '#ffffff',
            }}>
              See pricing
            </Link>
          </div>

          {/* stat strip */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, paddingTop: 16, flexWrap: 'wrap' }}>
            {PROOF.map((p) => (
              <div key={p.l} style={{
                padding: '0 20px', textAlign: 'center', flex: '1 1 120px', minWidth: 100,
              }}>
                <div style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#5fa89e', lineHeight: 1, marginBottom: 6 }}>{p.n}</div>
                <div style={{ fontSize: FONT.xs, color: '#7a9e99', fontWeight: WEIGHT.medium, letterSpacing: '0.3px', lineHeight: 1.4 }}>{p.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="candidates-how" style={{ background: '#ffffff', padding: '110px 40px 110px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-block', background: 'rgba(46,125,79,0.08)', color: '#2e7d4f', padding: '6px 18px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: 22 }}>
              The 4-step loop
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 20px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
              What the agent does while you sleep
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.72, fontWeight: 400 }}>
              A continuous loop that finds, applies, reaches out, and prepares — without you lifting a finger.
            </p>
          </div>

          {/* steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {HOW_STEPS.map((step, i) => (
              <div key={step.num} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr',
                gap: '0 40px', padding: '40px 0',
                borderBottom: i < HOW_STEPS.length - 1 ? '1px solid #ddeae4' : 'none',
              }} className="how-step-row">
                {/* left: number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `${step.color}12`, border: `2px solid ${step.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: FONT.base, fontWeight: WEIGHT.extra, color: step.color, flexShrink: 0,
                  }}>{step.num}</div>
                  {i < HOW_STEPS.length - 1 && (
                    <div style={{ flex: 1, width: 2, background: '#ddeae4', marginTop: 12, marginBottom: 0, minHeight: 20 }} />
                  )}
                </div>

                {/* right: content */}
                <div style={{ paddingBottom: 8 }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 12px', letterSpacing: '-0.3px', lineHeight: 1.25, fontSynthesis: 'none' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: FONT.base, color: '#3d5a56', lineHeight: 1.75, margin: '0 0 20px', maxWidth: 620 }}>
                    {step.desc}
                  </p>
                  {/* bullets */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', marginBottom: 16 }}>
                    {step.bullets.map(b => (
                      <span key={b} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: step.color,
                        background: `${step.color}10`, border: `1px solid ${step.color}25`,
                        borderRadius: 6, padding: '4px 10px',
                      }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: step.color, display: 'inline-block' }} />
                        {b}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: `${step.color}08`, borderRadius: 8, border: `1px solid ${step.color}20` }}>
                    <span style={{ color: step.color, fontSize: FONT.sm }}>→</span>
                    <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: '#1a3338' }}>{step.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOL SUITE ─────────────────────────────────────────────── */}
      <section
        id="candidates-tools"
        style={{
          background: '#ffffff',
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* heading */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(52px, 7vw, 72px)' }}>
            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(36px, 6vw, 76px)',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#111827',
              margin: '0 0 20px',
              lineHeight: 1.22,
              letterSpacing: '-0.5px',
              fontSynthesis: 'none',
            }}>
              Every tool you need,
              <br />
              under one roof.
            </h2>
            <p style={{
              fontSize: 17,
              color: '#6b7280',
              lineHeight: 1.75,
              margin: '0 auto',
              maxWidth: 500,
              fontWeight: WEIGHT.normal,
            }}>
              No separate subscriptions. No stitching tools together. One platform does it all.
            </p>
          </div>

          {/* ─── Row 1: 2 large hero cards ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 18, marginBottom: 18 }} className="tools-hero-row">

            {/* Left — text-only hero card */}
            <div className="tool-card" style={{
              background: '#f0f7f4',
              borderRadius: 24,
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: 420,
              border: 'none',
              boxShadow: '0 1px 4px rgba(37,62,66,0.04)',
              transition: 'transform 0.24s cubic-bezier(0.33,1,0.68,1), box-shadow 0.24s ease',
            }}>
              <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: WEIGHT.extra, color: '#111827', lineHeight: 1.28, letterSpacing: '-0.4px', marginBottom: 16 }}>
                {TOOLS[0].label}
              </div>
              <div style={{ fontSize: FONT.base, color: '#4b5563', lineHeight: 1.72, marginBottom: 24, maxWidth: 300 }}>
                {TOOLS[0].desc}
              </div>
              <Link href="/pricing" style={{ color: '#2e7d4f', fontSize: FONT.sm, fontWeight: WEIGHT.semi, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                See how it works <span style={{ fontSize: 16 }}>→</span>
              </Link>
            </div>

            {/* Right — big mockup card */}
            <div className="tool-card" style={{
              background: '#f0f7f4',
              borderRadius: 24,
              padding: '32px 32px 0',
              minHeight: 420,
              display: 'flex',
              flexDirection: 'column',
              border: 'none',
              boxShadow: '0 1px 4px rgba(37,62,66,0.04)',
              overflow: 'hidden',
              transition: 'transform 0.24s cubic-bezier(0.33,1,0.68,1), box-shadow 0.24s ease',
            }}>
              <div style={{ flex: 1 }} />
              {/* Floating white UI */}
              <div style={{
                background: '#fff',
                borderRadius: '18px 18px 0 0',
                padding: '28px 28px 0',
                boxShadow: '0 -4px 32px rgba(37,62,66,0.08)',
              }}>
                <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 18, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: '#111827' }}>AI Outreach Agent</div>
                      <div style={{ fontSize: FONT.xs, color: '#9ca3af', marginTop: 3 }}>Personalised emails from your Gmail</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '4px 12px', borderRadius: 100 }}>Live</span>
                  </div>
                </div>
                {[
                  { co: 'Stripe', role: 'Senior PM', status: 'Opened', sc: '#3d7a72' },
                  { co: 'Razorpay', role: 'Product Lead', status: 'Replied', sc: '#22c55e' },
                ].map(r => (
                  <div key={r.co} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: '#111827' }}>{r.co} · {r.role}</div>
                      <div style={{ fontSize: FONT.xs, color: '#9ca3af', marginTop: 2 }}>priya@{r.co.toLowerCase()}.com</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: r.sc, background: `${r.sc}14`, padding: '3px 10px', borderRadius: 100 }}>{r.status}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 16, padding: '18px 0 24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: WEIGHT.extra, color: '#3d7a72' }}>64%</div>
                    <div style={{ fontSize: FONT.xs, color: '#9ca3af', marginTop: 2 }}>Open rate</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: WEIGHT.extra, color: '#22c55e' }}>31%</div>
                    <div style={{ fontSize: FONT.xs, color: '#9ca3af', marginTop: 2 }}>Reply rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Row 2: 3 feature cards ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 18 }} className="tools-grid-3">
            {[TOOLS[2], TOOLS[3], TOOLS[4]].map(t => (
              <div key={t.label} className="tool-card" style={{
                background: '#ffffff',
                borderRadius: 22,
                padding: '36px 32px 0',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'transform 0.24s cubic-bezier(0.33,1,0.68,1), box-shadow 0.24s ease',
              }}>
                <div style={{ fontSize: 20, fontWeight: WEIGHT.extra, color: '#111827', lineHeight: 1.28, letterSpacing: '-0.3px', marginBottom: 10 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: FONT.sm, color: '#6b7280', lineHeight: 1.72, marginBottom: 28 }}>
                  {t.desc}
                </div>
                <div style={{ marginTop: 'auto', background: '#fafbfc', borderRadius: '16px 16px 0 0', padding: '20px 20px 0', marginLeft: -32, marginRight: -32, boxShadow: '0 -2px 16px rgba(37,62,66,0.04)' }}>
                  <ToolMockup label={t.label} color={t.color} />
                </div>
              </div>
            ))}
          </div>

          {/* ─── Row 3: 3 feature cards ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="tools-grid-3">
            {[TOOLS[5], TOOLS[6], TOOLS[7]].map(t => (
              <div key={t.label} className="tool-card" style={{
                background: '#ffffff',
                borderRadius: 22,
                padding: '36px 32px 0',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                transition: 'transform 0.24s cubic-bezier(0.33,1,0.68,1), box-shadow 0.24s ease',
              }}>
                <div style={{ fontSize: 20, fontWeight: WEIGHT.extra, color: '#111827', lineHeight: 1.28, letterSpacing: '-0.3px', marginBottom: 10 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: FONT.sm, color: '#6b7280', lineHeight: 1.72, marginBottom: 28 }}>
                  {t.desc}
                </div>
                <div style={{ marginTop: 'auto', background: '#fafbfc', borderRadius: '16px 16px 0 0', padding: '20px 20px 0', marginLeft: -32, marginRight: -32, boxShadow: '0 -2px 16px rgba(37,62,66,0.04)' }}>
                  <ToolMockup label={t.label} color={t.color} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────── */}
      <section id="candidates-compare" style={{ background: '#edf5f1', padding: '100px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-block', background: 'rgba(46,125,79,0.08)', color: '#2e7d4f', padding: '6px 18px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: 22 }}>
              The comparison
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 20px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
              Old way vs. NextHire way
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280', margin: 0, fontWeight: 400, lineHeight: 1.72 }}>Same goal. Completely different experience.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="comparison-grid">
            {/* old */}
            <div style={{ background: '#ffffff', border: '1px solid #ddeae4', borderRadius: 16, padding: '32px 28px' }}>
              <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.5px', color: '#8aada8', textTransform: 'uppercase', marginBottom: 20 }}>Without NextHire</div>
              {[
                'Spend 3–5 hours a day on job boards',
                'Send the same resume to every job',
                'Applications vanish into ATS black holes',
                'Cold apply and hope someone responds',
                'Prep for interviews without feedback',
                'Lose salary negotiation for lack of data',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#8aada8', fontSize: FONT.sm, flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ fontSize: FONT.sm, color: '#7a9e99', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* new */}
            <div style={{ background: '#ffffff', border: '1px solid #c8dfd6', borderRadius: 16, padding: '32px 28px', boxShadow: '0 4px 24px rgba(95,168,158,0.08)' }}>
              <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.5px', color: '#5fa89e', textTransform: 'uppercase', marginBottom: 20 }}>With NextHire</div>
              {[
                'Agent runs 24/7 — you check results',
                'Tailored resume per application, auto-built',
                'Direct outreach to the hiring manager',
                '31% reply rate vs 4% cold email average',
                'AI Interview Coach on every call',
                'Salary data + negotiation script ready',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#5fa89e', fontSize: FONT.sm, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: FONT.sm, color: '#3d5a56', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section id="candidates-faq" style={{ background: '#fff', padding: '100px 40px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(46,125,79,0.08)', color: '#2e7d4f', padding: '6px 18px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.extra, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: 22 }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', color: '#111827', margin: '0 0 20px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280', margin: 0, fontWeight: 400, lineHeight: 1.72 }}>Everything you need to know before you start.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={faq.q} style={{
                padding: '24px 0',
                borderBottom: i < FAQS.length - 1 ? '1px solid #ddeae4' : 'none',
              }}>
                <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: '#1a3338', marginBottom: 10, lineHeight: 1.4 }}>
                  {faq.q}
                </div>
                <div style={{ fontSize: FONT.sm, color: '#3d5a56', lineHeight: 1.75 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DualActionCTA />
    </>
  )
}
