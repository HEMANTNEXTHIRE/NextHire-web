'use client'

import { WEIGHT, SERIF } from '@/constants/typography'

/* ─── Colour tokens ──────────────────────────────────────── */
const C = {
  bg:      '#edf5f1',
  surface: '#ffffff',
  mint:    '#e4f0eb',
  sage:    '#c8dfd6',
  accent:  '#2e7d4f',
  dark:    '#111827',
  mid:     '#4b5563',
  muted:   '#9ca3af',
  border:  '#d1e8dc',
  logo:    '#9db4af',
}

const PRODUCTS = [
  'AI Outreach Agent', 'AI Auto Apply', 'AI Interview Coach',
  'Resume Builder', 'AI Interviewer', 'Job Tracker',
  'Recruiter InMail', 'Portal Optimization',
]


export default function HeroSection() {
  return (
    <section
      id="home-s1"
      style={{ position: 'relative', overflow: 'hidden', background: '#ffffff' }}
    >
      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(72px, 12vw, 120px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 100px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Trust badges — tight spacing to headline */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '100px',
            padding: '8px 20px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%', background: '#9ca3af', display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{
              color: '#374151', fontSize: 13, fontWeight: WEIGHT.medium, letterSpacing: '0.01em', lineHeight: 1.4,
            }}>Join 1 million professionals</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '100px',
            padding: '8px 20px',
            boxShadow: '0 1px 2px rgba(46, 125, 79, 0.08)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%', background: C.accent, display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{
              color: '#166534', fontSize: 13, fontWeight: WEIGHT.semi, letterSpacing: '0.01em', lineHeight: 1.4,
            }}>CASA Level 3 Certified</span>
          </div>
        </div>

        {/* ── Headline ── */}
        <div style={{ width: '100%', margin: '0 0 32px', paddingBottom: '0.15em' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            margin: 0,
            letterSpacing: '-0.5px',
            lineHeight: 1.22,
            fontSynthesis: 'none',
          }}>
          {/* First line */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            color: C.dark,
            lineHeight: 1.22,
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}>
            Skip application queues
          </span>
          {/* Second line */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            color: C.accent,
            lineHeight: 1.22,
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}>
            Connect hiring managers instantly
          </span>
        </h1>
        </div>

        {/* Sub-headline — matches reference: centered gray, ~17-18px */}
        <p style={{
          color: '#6b7280',
          fontSize: '17px',
          lineHeight: 1.72,
          margin: '0 0 10px',
          maxWidth: '560px',
          fontWeight: WEIGHT.normal,
          fontFamily: 'inherit',
        }}>
          Escape the apply and pray cycle. AI scans millions of jobs, applies on
          your behalf, and introduces you to hiring managers directly
        </p>

        {/* Feature checkmarks — matches reference row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '28px',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '48px', marginTop: '20px',
        }}>
          {[
            'AI applies to jobs for you',
            'Reach hiring managers directly',
            'Land interviews on autopilot',
          ].map((item) => (
            <span key={item} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontSize: '14px', fontWeight: WEIGHT.medium, color: C.accent,
              fontFamily: 'inherit',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5l3.5 3.5 6.5-7" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#374151' }}>{item}</span>
            </span>
          ))}
        </div>

        {/* CTA — pill-shaped */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '60px',
        }}>
          <a
            href="https://app.nexthireconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 28px',
              borderRadius: '9999px',
              background: '#1de9b6',
              color: C.dark,
              fontSize: '16px',
              fontWeight: WEIGHT.bold,
              textDecoration: 'none',
              fontFamily: 'inherit',
              border: 'none',
            }}
          >
            Get Your AI Agent →
          </a>
        </div>

        {/* What's inside — same style as "Find jobs at companies like" */}
        <div style={{ marginTop: '36px', paddingTop: '8px', width: '100%' }}>
          <p style={{ fontSize: '11px', color: C.muted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: WEIGHT.semi, fontFamily: 'inherit', textAlign: 'center' }}>
            What&apos;s inside
          </p>
          <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 36px)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {PRODUCTS.map((name) => (
              <span key={name} style={{ fontSize: '17px', fontWeight: WEIGHT.bold, color: '#9ca3af', letterSpacing: '-0.3px', fontFamily: SERIF }}>
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

