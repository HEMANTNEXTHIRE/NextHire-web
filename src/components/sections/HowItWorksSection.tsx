'use client'

import { useState } from 'react'
import { WEIGHT, SERIF } from '@/constants/typography'


type StepKey = 'discover' | 'outreach' | 'land'

const STEPS: {
  key: StepKey
  label: string
  subtitle: string
  description: string
  detail: string
}[] = [
  {
    key: 'discover',
    label: 'Agent Discovers',
    subtitle: 'Hidden roles & live hiring signals',
    description:
      'Your AI agent scans millions of live jobs daily — including hidden, unposted, and unadvertised roles. It builds targeted lists of companies, hiring managers, HRs, and founders, then detects real hiring signals like team growth, skill gaps, and role tenure patterns.',
    detail: "You do not search manually. The agent does it for you",
  },
  {
    key: 'outreach',
    label: 'Agent Reaches Out',
    subtitle: 'Personalised, from your own email',
    description:
      'The agent sends hyper-personalised emails to hiring managers and founders — from your own email address. Recruiter contacts are never exposed publicly.',
    detail: 'Privacy-first. CASA Level 3 certified.',
  },
  {
    key: 'land',
    label: 'You Land the Role',
    subtitle: 'Full pipeline visibility, offer to close',
    description:
      'All agent activity — every outreach, every reply, every lead — is visible in your dashboard. The built-in AI Interview Coach preps you for every call, and your dedicated advisor helps close the offer.',
    detail: 'Every activity tracked. Every follow-up handled.',
  },
]

/* ─── Visual panels ──────────────────────────────────────────── */

function DiscoverVisual() {
  const rows = [
    { action: 'Scanning hiring signals', company: 'Stripe Engineering',  signal: 'Team +18% in 60 days' },
    { action: 'Identified gap match',    company: 'Notion Product',       signal: 'No PM for AI features' },
    { action: 'Found unposted role',     company: 'Linear Growth',        signal: 'Founder posted on LinkedIn' },
    { action: 'Building contact list',   company: 'Figma Design Ops',     signal: '3 HRs + 1 Founder mapped' },
  ]
  return (
    <div className="hiw-panel">
      <div className="hiw-panel-header">
        <span className="hiw-live-dot" />
        <span className="hiw-panel-label">Agent Activity</span>
        <span className="hiw-badge">LIVE</span>
      </div>
      <div className="hiw-rows">
        {rows.map((row, i) => (
          <div key={i} className="hiw-row" style={{ animationDelay: `${i * 48}ms` }}>
            <span className="hiw-row-dot" />
            <div className="hiw-row-body">
              <div className="hiw-row-action">{row.action}</div>
              <div className="hiw-row-company">{row.company}</div>
            </div>
            <div className="hiw-row-signal">{row.signal}</div>
          </div>
        ))}
      </div>
      <div className="hiw-panel-footer">
        <span>847 roles scanned today</span>
        <span>14 new signals detected</span>
      </div>
    </div>
  )
}

function OutreachVisual() {
  return (
    <div className="hiw-panel">
      <div className="hiw-panel-header">
        <span className="hiw-panel-label">Outreach Preview</span>
        <span className="hiw-badge">Sent from your Gmail</span>
      </div>
      <div className="hiw-email hiw-anim" style={{ animationDelay: '40ms' }}>
        <div className="hiw-email-meta">
          <span>From: you@gmail.com</span>
          <span className="hiw-tag">Auto-deleted after send</span>
        </div>
        <div className="hiw-email-to">To: marcus@stripe.com (CTO)</div>
        <div className="hiw-email-body">
          Hi Marcus, I noticed Stripe&apos;s infra team grew 18% in 60 days — usually a signal for a Platform Engineer hire before it&apos;s posted. I&apos;ve led distributed systems at scale at two Series B companies. Happy to share specifics if the timing makes sense.
        </div>
      </div>
      <div className="hiw-stats hiw-anim" style={{ animationDelay: '110ms' }}>
        {[
          { label: 'Open Rate',  value: '64%', sub: 'vs 18% industry avg' },
          { label: 'Reply Rate', value: '31%', sub: 'vs 4% cold avg'      },
        ].map((s) => (
          <div key={s.label} className="hiw-stat">
            <div className="hiw-stat-value">{s.value}</div>
            <div className="hiw-stat-label">{s.label}</div>
            <div className="hiw-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LandVisual() {
  return (
    <div className="hiw-panel">
      <div className="hiw-panel-header">
        <span className="hiw-panel-label">Your Dashboard</span>
      </div>
      <div className="hiw-counters hiw-anim" style={{ animationDelay: '32ms' }}>
        {[
          { n: '12', l: 'Outreaches Sent' },
          { n: '4',  l: 'Replies'         },
          { n: '2',  l: 'Interviews'      },
        ].map((s) => (
          <div key={s.l} className="hiw-counter">
            <div className="hiw-counter-n">{s.n}</div>
            <div className="hiw-counter-l">{s.l}</div>
          </div>
        ))}
      </div>
      {[
        { company: 'Stripe', role: 'Senior Engineer',        status: 'Interview Scheduled', type: 'interview' },
        { company: 'Linear', role: 'Staff Product Engineer', status: 'Awaiting Reply',       type: 'awaiting'  },
        { company: 'Notion', role: 'AI PM',                  status: 'Offer Stage 🎉',       type: 'offer'     },
      ].map((r, i) => (
        <div key={r.company} className="hiw-pipeline-row hiw-anim" style={{ animationDelay: `${65 + i * 48}ms` }}>
          <div className="hiw-pipeline-info">
            <span className="hiw-pipeline-company">{r.company}</span>
            <span className="hiw-pipeline-role">{r.role}</span>
          </div>
          <span className={`hiw-status hiw-status-${r.type}`}>{r.status}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Main section ───────────────────────────────────────────── */

export default function HowItWorksSection() {
  const [active, setActive] = useState<StepKey>('discover')
  const currentStep = STEPS.find((s) => s.key === active)!

  return (
    <section id="how-it-works" style={{ background: '#f7faf9', padding: '120px 40px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* ── Heading ───────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400,
            fontStyle: 'normal',
            margin: '0 0 22px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            fontSynthesis: 'none',
          }}>
            <span style={{ display: 'block', color: '#111827' }}>Not a job board.</span>
            <span style={{ display: 'block', color: '#2e7d4f' }}>Your personal AI agent.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
            The agent works 24/7 — discovering opportunities, reaching decision-makers, and tracking every touchpoint.
          </p>
        </div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="hiw-grid">

          {/* LEFT: accordion nav */}
          <div className="hiw-nav">
            {STEPS.map((step) => {
              const isActive = active === step.key
              return (
                <button
                  key={step.key}
                  onClick={() => setActive(step.key)}
                  className={`hiw-nav-item${isActive ? ' hiw-nav-item--active' : ''}`}
                >
                  <div className="hiw-nav-label" style={{ fontFamily: SERIF }}>{step.label}</div>
                  <div className="hiw-nav-subtitle">{step.subtitle}</div>
                  {isActive && (
                    <div className="hiw-nav-body">
                      <p className="hiw-nav-desc">{currentStep.description}</p>
                      <div className="hiw-nav-detail">
                        <span style={{ color: '#5fa89e', fontWeight: WEIGHT.bold }}>→</span>
                        {currentStep.detail}
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* RIGHT: animated visual card */}
          <div className="hiw-visual-wrap">
            <div key={active} className="hiw-card-enter">
              {active === 'discover'  && <DiscoverVisual />}
              {active === 'outreach'  && <OutreachVisual />}
              {active === 'land'      && <LandVisual />}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
