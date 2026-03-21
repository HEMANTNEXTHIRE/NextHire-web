import type { Metadata } from 'next'
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
  { color: '#5fa89e', icon: '⚡', label: 'AI Auto Apply',         desc: 'Applies to hundreds of matched roles with a tailored resume per application.' },
  { color: '#3d7a72', icon: '📨', label: 'AI Outreach Agent',     desc: 'Personalised emails to hiring managers from your own Gmail. Auto-deleted after send.' },
  { color: '#5fa89e', icon: '📄', label: 'Resume Builder',        desc: 'ATS-optimised resume drafted by AI, reviewed by experts, tuned to each role.' },
  { color: '#5fa89e', icon: '🎧', label: 'AI Interview Coach',    desc: 'Real-time coaching on live calls. Surface answers and flag gaps as they happen.' },
  { color: '#22c55e', icon: '🤖', label: 'AI Interviewer',        desc: 'Mock interviews calibrated to your target company. Scored feedback on every answer.' },
  { color: '#8aada8', icon: '📊', label: 'Job Tracker',           desc: 'Every application, reply, and interview stage in one dashboard with reminders.' },
  { color: '#3d7a72', icon: '🔍', label: 'Portal Optimization',   desc: 'Ranks your profile across major job portals so recruiters find you first.' },
  { color: '#5fa89e', icon: '✉️', label: 'Direct Recruiter InMail', desc: 'Targeted InMail to recruiters in your space, personalised and privacy-safe.' },
]

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
      <section style={{ background: '#ffffff', padding: '110px 40px 110px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-block', background: 'rgba(95,168,158,0.08)', color: '#3d7a72', padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 16 }}>
              The 4-step loop
            </div>
            <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.6px' }}>
              What the agent does while you sleep
            </h2>
            <p style={{ fontSize: FONT.base, color: '#3d5a56', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
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
                  <h3 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
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

      {/* ── TOOL SUITE ───────────────────────────────────────────── */}
      <section style={{ background: '#f7faf9', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56, maxWidth: 500 }}>
            <div style={{ display: 'inline-block', background: 'rgba(95,168,158,0.1)', color: '#3d7a72', padding: '4px 14px', borderRadius: 100, fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 16 }}>
              8 AI tools
            </div>
            <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 14px', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
              Every tool you need,<br />under one roof.
            </h2>
            <p style={{ fontSize: FONT.base, color: '#3d5a56', lineHeight: 1.65, margin: 0 }}>
              No separate subscriptions. No stitching tools together. One platform does it all.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }} className="tools-grid">
            {TOOLS.map((t) => (
              <div key={t.label} style={{
                background: '#fff', border: '1px solid #c8dfd6',
                borderRadius: 16, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', gap: 10,
                boxShadow: '0 2px 12px rgba(37,62,66,0.04)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
              }} className="tool-card">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${t.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.md }}>
                  {t.icon}
                </div>
                <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: '#1a3338' }}>{t.label}</div>
                <div style={{ fontSize: FONT.sm, color: '#3d5a56', lineHeight: 1.6 }}>{t.desc}</div>
                <div style={{ marginTop: 'auto', width: '100%', height: 2, background: '#ddeae4', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg,${t.color},${t.color}40)`, borderRadius: 2, transform: 'translateX(-100%)', animation: 'toolSlide 3s ease forwards 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────── */}
      <section style={{ background: '#edf5f1', padding: '100px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
              Old way vs. NextHire way
            </h2>
            <p style={{ fontSize: FONT.base, color: '#7a9e99', margin: 0 }}>Same goal. Completely different experience.</p>
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
      <section style={{ background: '#fff', padding: '100px 40px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 12px', letterSpacing: '-0.4px' }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: 0 }}>Everything you need to know before you start.</p>
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
