import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import ContactForm from '@/components/forms/ContactForm'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT, SERIF } from '@/constants/typography'


const HOME = {
  bg: '#ffffff',
  dark: '#111827',
  accent: '#2e7d4f',
  subtext: '#6b7280',
  muted: '#9ca3af',
  ctaMint: '#1de9b6',
  hairline: '#e5e7eb',
}

const NH_PANEL = {
  inner: '#f3f8f6',
}

export const metadata: Metadata = {
  title: 'Contact Us | NextHire',
  description:
    'Get in touch with NextHire. Job seekers, hiring teams, partnerships, or careers — we respond within one business day.',
  openGraph: {
    title: 'Contact Us | NextHire',
    description: 'Reach the NextHire team — we’re here to help.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/contact-us' },
}

function IconMap() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width={20} height={16} x={2} y={4} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const CONTACT_ROWS: {
  title: string
  detail: string
  href?: string
  external?: boolean
  icon: ReactNode
}[] = [
  { title: 'Visit us', detail: 'Bengaluru, Karnataka, India', icon: <IconMap /> },
  {
    title: 'Email',
    detail: 'info@nexthireconsulting.com',
    href: 'mailto:info@nexthireconsulting.com',
    icon: <IconMail />,
  },
  {
    title: 'LinkedIn',
    detail: 'Company updates & open roles',
    href: 'https://www.linkedin.com/company/nexthire-technologies/',
    external: true,
    icon: <IconLinkedIn />,
  },
]

export default function ContactUsPage() {
  return (
    <main className="contact-page">
      {/* Hero — matches candidates /candidates hero (How It Works block) */}
      <section
        id="contact-hero"
        style={{
          background: '#edf5f1',
          padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              width: 700,
              height: 700,
              background: 'radial-gradient(circle,rgba(95,168,158,0.18) 0%,transparent 65%)',
              borderRadius: '50%',
              top: -200,
              right: -100,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#c8dfd6 1px,transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.5,
            }}
          />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(95,168,158,0.12)',
              border: '1px solid rgba(95,168,158,0.3)',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#5fa89e',
                display: 'inline-block',
                boxShadow: '0 0 8px #5fa89e',
              }}
            />
            <span style={{ color: '#3d7a72', fontSize: FONT.sm, fontWeight: WEIGHT.semi, letterSpacing: '0.5px' }}>
              Contact
            </span>
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              color: '#111827',
              fontSize: 'clamp(36px, 6vw, 76px)',
              fontWeight: 400,
              lineHeight: 1.22,
              margin: '0 0 24px',
              letterSpacing: '-0.5px',
              fontSynthesis: 'none',
            }}
          >
            <span style={{ display: 'block', fontFamily: SERIF }}>We&apos;re here to help.</span>
            <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>Tell us what you need.</span>
          </h1>

          <p
            style={{
              color: '#3d5a56',
              fontSize: FONT.base,
              lineHeight: 1.7,
              margin: '0 auto 0',
              maxWidth: 620,
            }}
          >
            We reply within one business day — demos, pricing, support, or careers.
          </p>
        </div>
      </section>

      {/* Single unified card: form | sidebar (fixes Webflow block layout + huge gaps) */}
      <section
        style={{
          background: '#eef4f1',
          padding: '0 clamp(16px, 4vw, 32px) clamp(56px, 8vw, 80px)',
        }}
      >
        <div className="contact-shell">
          <div className="contact-shell__form">
            <p
              style={{
                margin: '0 0 6px',
                fontSize: FONT.xs,
                fontWeight: WEIGHT.semi,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: HOME.muted,
              }}
            >
              Send a message
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(22px, 2.8vw, 28px)',
                fontWeight: 400,
                color: HOME.dark,
                margin: '0 0 8px',
                letterSpacing: '-0.3px',
                lineHeight: 1.2,
                fontSynthesis: 'none',
              }}
            >
              Write to us
            </h2>
            <p
              style={{
                fontSize: FONT.sm,
                color: HOME.subtext,
                margin: '0 0 20px',
                lineHeight: 1.55,
              }}
            >
              Fields marked * are required.
            </p>
            <ContactForm />
          </div>

          <aside className="contact-shell__aside" aria-label="Contact options">
            <div>
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: FONT.xs,
                  fontWeight: WEIGHT.semi,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: HOME.muted,
                }}
              >
                Direct lines
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(20px, 2.4vw, 24px)',
                  fontWeight: 400,
                  color: HOME.dark,
                  margin: 0,
                  letterSpacing: '-0.25px',
                  lineHeight: 1.25,
                  fontSynthesis: 'none',
                }}
              >
                Reach us directly
              </h2>
            </div>

            <ul className="contact-shell__aside-list">
              {CONTACT_ROWS.map((row) => (
                <li key={row.title} className="contact-shell__row">
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: NH_PANEL.inner,
                      color: '#3d5a56',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: WEIGHT.bold,
                        color: HOME.dark,
                        marginBottom: 2,
                      }}
                    >
                      {row.title}
                    </div>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external ? '_blank' : undefined}
                        rel={row.external ? 'noopener noreferrer' : undefined}
                        style={{
                          fontSize: FONT.sm,
                          color: '#2e7d4f',
                          textDecoration: 'none',
                          fontWeight: WEIGHT.medium,
                          wordBreak: 'break-word',
                          lineHeight: 1.45,
                        }}
                      >
                        {row.detail}
                      </a>
                    ) : (
                      <div style={{ fontSize: FONT.sm, color: HOME.subtext, lineHeight: 1.45 }}>{row.detail}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-shell__cta">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: FONT.base,
                  fontWeight: 400,
                  margin: '0 0 6px',
                  color: HOME.dark,
                }}
              >
                Prefer to self-serve?
              </h3>
              <p style={{ fontSize: 12, color: HOME.subtext, margin: '0 0 14px', lineHeight: 1.5 }}>
                Try the app or compare plans — no call needed.
              </p>
              <a
                href="https://app.nexthireconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '11px 18px',
                  borderRadius: 9999,
                  background: HOME.ctaMint,
                  color: HOME.dark,
                  fontSize: FONT.sm,
                  fontWeight: WEIGHT.bold,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(29, 233, 182, 0.35)',
                  marginBottom: 12,
                }}
              >
                Try for free →
              </a>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: 12, fontWeight: WEIGHT.semi }}>
                <Link href="/pricing" style={{ color: '#2e7d4f', textDecoration: 'none' }}>
                  Pricing
                </Link>
                <span style={{ color: HOME.hairline }}>|</span>
                <Link href="/talk-to-an-expert" style={{ color: '#2e7d4f', textDecoration: 'none' }}>
                  Talk to an expert
                </Link>
              </div>
            </div>
          </aside>
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
        rightHref="/talk-to-an-expert"
      />
    </main>
  )
}
