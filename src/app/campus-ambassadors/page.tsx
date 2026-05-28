import type { Metadata } from 'next'
import { FONT, WEIGHT } from '@/constants/typography'
import CompensationSection from './CompensationSection'
import PlansSection from './PlansSection'
import ScriptSection from './ScriptSection'

const APPLY_URL = 'https://form.jotform.com/261442144477053'
const WHATSAPP_URL = 'https://chat.whatsapp.com/GJm9LtR2AXUEfTgh62RLE7?s=cl&p=i&mlu=1'

export const metadata: Metadata = {
  title: 'Campus Ambassador Program | NextHire',
  description:
    'Become a NextHire Founding Campus Partner. Real sales, community, and product feedback experience at an early stage AI career platform built by an IIT Dhanbad team with 6 years in recruitment.',
  openGraph: {
    title: 'Campus Ambassador Program | NextHire',
    description:
      'Become a Founding Campus Partner for NextHire. Built by IIT Dhanbad alumni with 6 years in recruitment.',
    url: 'https://www.nexthireconsulting.com/campus-ambassadors',
  },
  twitter: {
    title: 'NextHire Campus Ambassador Program',
    description:
      'Founding cohort 2026. Apply to become a campus partner.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/campus-ambassadors' },
}

/* tokens */
const MINT = '#edf5f1'
const SAGE_BORDER = '#c8dfd6'
const TEAL = '#5fa89e'
const ACCENT_GREEN = '#2e7d4f'
const DARK_TEXT = '#1a3338'
const BODY_TEXT = '#3d5a56'
const MUTED = '#8aada8'
const LIME = '#d4ff4a'
const DARK_PANEL = '#132128'

/* data */

const WHO = [
  'Students in their final or prefinal year',
  'Training and Placement cell members',
  'GDSC and developer community organisers',
  'E Cell and entrepreneurship clubs',
  'Coding clubs and tech societies',
  'Fest committees and student councils',
  'Department clubs and placement prep groups',
]

type Pillar = {
  tag: string
  heading: string
  body: string
  features: string[]
  accent: string
}

const PILLARS: Pillar[] = [
  {
    tag: 'PROMOTE',
    heading: 'Spread the word on your campus.',
    body: 'Be the first voice introducing NextHire to your peers, your placement cell, and the clubs you already lead.',
    features: [
      'Drop product links and offers in active student groups',
      'Run quick walkthroughs and demos for interested peers',
      'Share with T&P, GDSC, E Cell, and coding clubs',
      'Coordinate with placement and community leads',
    ],
    accent: '#3d7a72',
  },
  {
    tag: 'DRIVE SIGNUPS',
    heading: 'Help peers level up their job search.',
    body: 'Walk students through the right plan for where they are in placements, and close the loop with the COLLEGE1000 coupon.',
    features: [
      'Explain how NextHire helps in live interviews',
      'Walk students through Free, Lite, Pro, and Max',
      'Apply the COLLEGE1000 coupon at checkout',
      'Track who signed up through your code',
    ],
    accent: '#2e7d4f',
  },
  {
    tag: 'REPRESENT',
    heading: 'Be the eyes and ears on the ground.',
    body: 'Bring back what students actually feel about NextHire. Your feedback shapes the next versions of the product.',
    features: [
      'Collect feedback from students using NextHire',
      'Pass insights back to the NextHire team',
      'Spot active job seekers and placement prep groups',
      'Build relationships across campus leaders',
    ],
    accent: '#5fa89e',
  },
]

const STEPS = [
  { n: '01', title: 'Apply',          body: 'Fill out the application form. Takes under two minutes.',                      href: APPLY_URL,    cta: 'Open application →' },
  { n: '02', title: 'Join the group', body: 'Connect with the team and other ambassadors in the cohort WhatsApp group.',     href: WHATSAPP_URL, cta: 'Open WhatsApp →' },
  { n: '03', title: 'Share',          body: 'Drop links and the COLLEGE1000 coupon in your campus groups and communities.',  href: null,         cta: null },
  { n: '04', title: 'Get verified',   body: 'Share proof of paid signups when you request a payout. Payouts arrive within two weeks.', href: null, cta: null },
]

const TIME_ACTIVITIES = [
  'Sharing offers and product links in relevant groups',
  'Running short demos or walkthroughs',
  'Speaking to active job seekers on campus',
  'Coordinating with club, placement, and community leads',
  'Following up with interested students',
]

/* shared styles */
const pillStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: 'rgba(95,168,158,0.12)', border: `1px solid rgba(95,168,158,0.3)`,
  borderRadius: 100, padding: '6px 16px',
  color: '#3d7a72', fontSize: FONT.sm, fontWeight: WEIGHT.semi, letterSpacing: '0.5px',
}

/* matches the "Book a discovery call" pill on /companies */
const ctaPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 36px',
  borderRadius: 9999,
  background: DARK_PANEL,
  color: '#ffffff',
  fontSize: 17,
  fontWeight: WEIGHT.bold,
  textDecoration: 'none',
  border: 'none',
  letterSpacing: '-0.2px',
}

const ctaSecondary: React.CSSProperties = {
  ...ctaPrimary,
  background: '#ffffff',
  color: DARK_PANEL,
  border: `1px solid ${DARK_PANEL}`,
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: `1px solid ${SAGE_BORDER}`,
  borderRadius: 16,
  padding: 'clamp(20px, 3vw, 28px)',
  display: 'flex', flexDirection: 'column', gap: 12,
  boxShadow: '0 2px 16px rgba(37,62,66,0.05)',
}

const sectionTitle: React.CSSProperties = {
  fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: DARK_TEXT,
  margin: '0 0 12px', letterSpacing: '-0.5px',
}

const sectionSub: React.CSSProperties = {
  fontSize: FONT.base, color: BODY_TEXT, margin: 0, maxWidth: 680,
}

/* ─── pillar mockups ─── */

const MOCKUP_PANEL_INNER = '#f3f8f6'

function PillarMockupPromote({ accent }: { accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 8, background: MOCKUP_PANEL_INNER, borderBottom: `1px solid ${SAGE_BORDER}` }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: DARK_PANEL, display: 'inline-block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: MUTED, display: 'inline-block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: accent, display: 'inline-block' }} />
        </div>
        <span style={{ fontSize: FONT.xs, color: MUTED, marginLeft: 6, fontWeight: WEIGHT.medium }}>Campus share · Active</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'caPulse 1.8s ease infinite' }} />
          <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: '#22c55e' }}>LIVE</span>
        </span>
      </div>

      {/* message preview */}
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: MOCKUP_PANEL_INNER, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${accent}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: accent }}>H</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: DARK_PANEL }}>Hemant · Campus Ambassador</div>
            <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 1 }}>Posted to IIT Dhanbad · Placements 2026</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: `1px solid ${SAGE_BORDER}`, borderRadius: 14, padding: '14px 16px', fontSize: FONT.sm, color: DARK_PANEL, lineHeight: 1.65 }}>
          Hey everyone, NextHire&apos;s AI Interview Coach is now live for placements. Use code <strong>COLLEGE1000</strong> for ₹1,000 off Pro and ₹3,000 off the quarterly plan. Link in comments.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ padding: '12px', background: MOCKUP_PANEL_INNER, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: accent }}>147</div>
            <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 2, fontWeight: WEIGHT.semi }}>views</div>
          </div>
          <div style={{ padding: '12px', background: MOCKUP_PANEL_INNER, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: '#22c55e' }}>12</div>
            <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 2, fontWeight: WEIGHT.semi }}>clicks</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PillarMockupDriveSignups({ accent }: { accent: string }) {
  const PLAN_ROWS = [
    { name: 'Free', price: '₹0',     sub: 'forever',  selected: false },
    { name: 'Lite', price: '₹1,850', sub: 'per month', selected: false },
    { name: 'Pro',  price: '₹4,500', sub: 'per month', selected: true  },
    { name: 'Max',  price: '₹12,000', sub: 'per month', selected: false },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: DARK_PANEL, padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: LIME, letterSpacing: '1px' }}>CHOOSE YOUR PLAN</span>
        <span style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.55)', fontWeight: WEIGHT.semi }}>Step 2 of 3</span>
      </div>

      <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PLAN_ROWS.map((row) => (
          <div
            key={row.name}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px',
              background: row.selected ? '#ffffff' : MOCKUP_PANEL_INNER,
              border: row.selected ? `2px solid ${accent}` : `1px solid ${SAGE_BORDER}`,
              borderRadius: 12,
            }}
          >
            <div>
              <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: DARK_PANEL }}>{row.name}</div>
              <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 2 }}>{row.sub}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: DARK_PANEL }}>{row.price}</span>
              {row.selected && (
                <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, background: `${accent}22`, color: accent, padding: '3px 8px', borderRadius: 8 }}>Selected</span>
              )}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px',
          background: `linear-gradient(165deg, #edf5f1 0%, ${MOCKUP_PANEL_INNER} 100%)`,
          borderRadius: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: "'Inter', monospace",
              fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: DARK_PANEL,
              background: '#ffffff', border: `1px dashed ${accent}`,
              padding: '4px 10px', borderRadius: 8, letterSpacing: '1.5px',
            }}>COLLEGE1000</span>
            <span style={{ fontSize: FONT.xs, color: MUTED, fontWeight: WEIGHT.semi }}>coupon code</span>
          </div>
          <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, background: '#22c55e22', color: '#338632', padding: '4px 10px', borderRadius: 8 }}>Applied</span>
        </div>
      </div>
    </div>
  )
}

function PillarMockupRepresent({ accent }: { accent: string }) {
  const NOTES = [
    { who: 'Final year EE',  text: 'Loves the live interview help. Asked about Hindi support.', tag: 'product', tagColor: accent },
    { who: 'T&P lead',       text: '40 students interested in Pro for placement season.',        tag: 'demand',  tagColor: '#2e7d4f' },
    { who: 'GDSC cohort',    text: 'Ran a demo. Seven trials started the same evening.',          tag: 'signal',  tagColor: '#5fa89e' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, background: MOCKUP_PANEL_INNER, borderBottom: `1px solid ${SAGE_BORDER}` }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${accent}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FONT.sm }}>📋</div>
        <div>
          <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: DARK_PANEL }}>Field notes</div>
          <div style={{ fontSize: FONT.xs, color: MUTED }}>Cohort feedback · This week</div>
        </div>
      </div>

      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {NOTES.map((n) => (
          <div key={n.who} style={{ background: '#ffffff', border: `1px solid ${SAGE_BORDER}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, color: DARK_PANEL }}>{n.who}</span>
              <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, background: `${n.tagColor}1f`, color: n.tagColor, padding: '2px 8px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{n.tag}</span>
            </div>
            <div style={{ fontSize: FONT.sm, color: BODY_TEXT, lineHeight: 1.6 }}>{n.text}</div>
          </div>
        ))}

        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ padding: '12px', background: MOCKUP_PANEL_INNER, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: accent }}>12</div>
            <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 2, fontWeight: WEIGHT.semi }}>notes shared</div>
          </div>
          <div style={{ padding: '12px', background: MOCKUP_PANEL_INNER, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: FONT.md, fontWeight: WEIGHT.extra, color: '#2e7d4f' }}>3</div>
            <div style={{ fontSize: FONT.xs, color: MUTED, marginTop: 2, fontWeight: WEIGHT.semi }}>product asks logged</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CampusAmbassadorsPage() {
  return (
    <>
      {/* HERO */}
      <section
        id="ca-hero"
        style={{
          background: MINT,
          padding: 'clamp(72px, 10vw, 110px) 0 clamp(56px, 8vw, 80px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle,rgba(95,168,158,0.22) 0%,transparent 65%)', borderRadius: '50%', top: -260, left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${SAGE_BORDER} 1px,transparent 1px)`, backgroundSize: '32px 32px', opacity: 0.5 }} />
        </div>

        <div className="nh-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            <div style={pillStyle}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL, display: 'inline-block', boxShadow: `0 0 8px ${TEAL}` }} />
              <span>Founding cohort · 2026</span>
            </div>

            <h1
              style={{
                color: DARK_TEXT,
                fontSize: 'clamp(34px, 7vw, 84px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-1.2px',
                margin: '28px 0 18px',
              }}
            >
              <span style={{ display: 'block' }}>Bring NextHire</span>
              <span style={{ display: 'block' }}>to your campus.</span>
            </h1>

            <p style={{ color: BODY_TEXT, fontSize: FONT.md, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 36px' }}>
              Become a <strong style={{ color: DARK_TEXT }}>Founding Campus Partner</strong> for NextHire, the AI first career platform built by an IIT Dhanbad team with 6 years in recruitment. Build real experience in sales, community, product feedback, and startup growth.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
                Apply now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={ctaSecondary}>
                Join WhatsApp group
              </a>
            </div>

            <div style={{ marginTop: 28, color: MUTED, fontSize: FONT.xs, letterSpacing: '0.6px', textTransform: 'uppercase', fontWeight: WEIGHT.semi }}>
              Founding cohort · 6 to 10 hrs / month · Real startup experience
            </div>
          </div>
        </div>
      </section>

      <CompensationSection />

      {/* WHO IT IS FOR */}
      <section style={{ background: '#ffffff', padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <div className="nh-container">
          <div style={{
            background: '#eef7f3', borderRadius: 28,
            padding: 'clamp(36px, 5vw, 56px)',
            textAlign: 'center',
            boxShadow: '0 8px 48px rgba(19,33,40,0.10)',
          }}>
            <div style={{ ...pillStyle, justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL, boxShadow: `0 0 8px ${TEAL}` }} />
              <span>Who it&apos;s for</span>
            </div>

            <h2 style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, lineHeight: 1.2,
              letterSpacing: '-0.8px', color: DARK_PANEL, margin: '18px 0 12px',
            }}>
              High energy student leaders.
            </h2>
            <p style={{ fontSize: FONT.md, color: BODY_TEXT, margin: '0 auto 24px', maxWidth: 620, lineHeight: 1.6 }}>
              If you&apos;re already active in campus communities and comfortable speaking to peers about useful tools, this role is built for you.
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: 8, maxWidth: 760, margin: '0 auto',
            }}>
              {WHO.map((w) => (
                <span
                  key={w}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#ffffff', border: `1px solid ${SAGE_BORDER}`,
                    borderRadius: 9999, padding: '8px 14px',
                    fontSize: FONT.sm, color: DARK_PANEL, fontWeight: WEIGHT.medium,
                    letterSpacing: '-0.1px',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL }} />
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL DO */}
      <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(120px, 18vw, 200px)' }}>
        <style>{`
          @keyframes caPulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
          .ca-pillar-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; align-items: stretch; }
          @media (max-width: 900px) {
            .ca-pillar-row { grid-template-columns: 1fr !important; }
            .ca-pillar-mockup-cell { border-radius: 0 0 28px 28px !important; box-shadow: 0 -8px 28px rgba(19,33,40,0.05) !important; min-height: 360px; }
            .ca-pillar-text-cell { padding: 44px 36px !important; }
          }
        `}</style>

        <div className="nh-container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <h2 style={sectionTitle}>What you&apos;ll do.</h2>
            <p style={{ ...sectionSub, margin: '0 auto' }}>
              Three pillars. Six responsibilities. One simple campus playbook.
            </p>
          </div>

          {PILLARS.map((p, i) => (
            <div
              key={p.tag}
              className="ca-pillar-row"
              style={{
                background: '#eef7f3',
                borderRadius: 28,
                overflow: 'hidden',
                position: 'sticky',
                top: 100,
                marginBottom: i === PILLARS.length - 1 ? 0 : 32,
                zIndex: i + 1,
                boxShadow: '0 16px 56px rgba(37,62,66,0.10), 0 2px 10px rgba(37,62,66,0.05)',
              }}
            >
              {/* LEFT: text */}
              <div
                className="ca-pillar-text-cell"
                style={{
                  paddingLeft: 72, paddingRight: 64, paddingTop: 72, paddingBottom: 72,
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: 16, fontWeight: WEIGHT.semi, lineHeight: '24px',
                    color: '#424d53', textTransform: 'uppercase',
                    background: '#E8E9EA', borderRadius: 10,
                    padding: '8px 18px', marginBottom: 18,
                  }}
                >
                  {String(i + 1).padStart(2, '0')} &nbsp; {p.tag}
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: WEIGHT.normal,
                    color: DARK_PANEL, margin: '0 0 20px', lineHeight: 1.25, letterSpacing: '-0.3px',
                  }}
                >
                  {p.heading}
                </h3>

                <p style={{ margin: '0 0 32px', fontSize: 17, color: BODY_TEXT, lineHeight: 1.65, maxWidth: 460 }}>
                  {p.body}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 8 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: ACCENT_GREEN, fontSize: 18, lineHeight: '27px', flexShrink: 0, fontWeight: WEIGHT.bold }}>✓</span>
                      <span style={{ fontSize: 17, color: DARK_PANEL, lineHeight: '27px', letterSpacing: '-0.3px' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: mockup */}
              <div
                className="ca-pillar-mockup-cell"
                style={{
                  position: 'relative',
                  borderRadius: '0 28px 28px 0',
                  overflow: 'hidden',
                  background: '#f5f5f5',
                  boxShadow: '-12px 0 48px rgba(19,33,40,0.08)',
                  minHeight: 520,
                }}
              >
                <div style={{ position: 'absolute', inset: 0, padding: '44px 56px' }}>
                  <div
                    style={{
                      position: 'relative', width: '100%', height: '100%',
                      overflow: 'hidden', borderRadius: 12,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                      background: '#ffffff',
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    {i === 0 && <PillarMockupPromote accent={p.accent} />}
                    {i === 1 && <PillarMockupDriveSignups accent={p.accent} />}
                    {i === 2 && <PillarMockupRepresent accent={p.accent} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ScriptSection />

      {/* WHAT AMBASSADORS GET — dark bento mosaic */}
      <section style={{ background: '#0d1419', padding: 'clamp(72px, 10vw, 110px) 0', color: '#ffffff' }}>
        <style>{`
          .ca-bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 14px; }
          .ca-bento-card {
            background: #19242b;
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 18px;
            padding: 28px;
            display: flex;
            flex-direction: column;
            min-height: 240px;
          }
          .ca-bento-quote { font-size: clamp(18px, 1.8vw, 23px); font-weight: 400; line-height: 1.45; color: #ffffff; letter-spacing: -0.2px; margin: 0; }
          .ca-bento-chip {
            display: inline-flex; align-items: center; gap: 8px;
            margin-top: auto; padding-top: 16px;
          }
          .ca-bento-chip-dot { width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.06); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; }
          .ca-bento-chip-text { font-size: 11px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
          .ca-bento-visual-top {
            margin: -28px -28px 22px;
            min-height: 180px;
            display: flex; align-items: center; justify-content: center;
            position: relative; overflow: hidden;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
          .ca-bento-card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: #ffffff; line-height: 1.3; letter-spacing: -0.2px; }
          .ca-bento-card-sub { margin: 0; font-size: 13px; color: #9caaaf; line-height: 1.55; }
          .ca-bento-watch {
            position: absolute; left: 18px; bottom: 18px;
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 12px; background: rgba(255,255,255,0.12);
            border-radius: 9999px; color: #ffffff;
            font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase;
            backdrop-filter: blur(6px);
          }
          .ca-bento-logo-overlay {
            position: absolute; left: 22px; top: 20px;
            font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
          }
          @media (max-width: 900px) {
            .ca-bento { grid-template-columns: 1fr; }
            .ca-bento-card { grid-column: 1 / -1 !important; min-height: 220px; }
          }
        `}</style>

        <div className="nh-container">
          {/* Heading */}
          <div style={{ marginBottom: 48, maxWidth: 720 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(212,255,74,0.10)', border: `1px solid rgba(212,255,74,0.25)`,
              borderRadius: 100, padding: '6px 16px',
              color: LIME, fontSize: FONT.sm, fontWeight: WEIGHT.semi, letterSpacing: '0.5px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: LIME, display: 'inline-block', boxShadow: `0 0 8px ${LIME}` }} />
              <span>What ambassadors get</span>
            </div>
            <h2 style={{
              fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#ffffff',
              margin: '18px 0 12px', letterSpacing: '-0.5px', lineHeight: 1.15,
            }}>
              Beyond cash incentives.
            </h2>
            <p style={{ fontSize: FONT.base, color: '#9caaaf', margin: 0, maxWidth: 620, lineHeight: 1.65 }}>
              Career capital, network, and real startup exposure. Every active partner gets the basics. Top performers get the unlocks.
            </p>
          </div>

          {/* BENTO MOSAIC */}
          <div className="ca-bento">

            {/* 01 — Founding Campus Partner (wide quote) */}
            <div className="ca-bento-card" style={{ gridColumn: '1 / 7', minHeight: 280 }}>
              <p className="ca-bento-quote">
                &ldquo;Officially recognised as part of the founding cohort. Your certificate ships when you&rsquo;re activated and stays on your record for life.&rdquo;
              </p>
              <div className="ca-bento-chip">
                <div className="ca-bento-chip-dot" style={{ background: `${TEAL}33`, color: LIME }}>📜</div>
                <div>
                  <div className="ca-bento-chip-text" style={{ color: '#ffffff' }}>Founding Campus Partner</div>
                  <div className="ca-bento-chip-text" style={{ color: TEAL, marginTop: 2 }}>Certificate · 2026 cohort</div>
                </div>
              </div>
            </div>

            {/* 02 — Pro access (visual badge) */}
            <div className="ca-bento-card" style={{ gridColumn: '7 / 10', padding: 0, overflow: 'hidden' }}>
              <div className="ca-bento-visual-top" style={{
                background: `radial-gradient(circle at 30% 30%, ${TEAL}55 0%, transparent 60%), linear-gradient(180deg, #1c2932 0%, #19242b 100%)`,
                margin: 0, minHeight: 200,
              }}>
                <div style={{
                  fontFamily: "'Droid Serif', Georgia, serif",
                  fontSize: 64, fontWeight: 700, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1,
                }}>Pro</div>
                <div className="ca-bento-watch">▷ Unlock</div>
              </div>
              <div style={{ padding: '20px 24px 26px' }}>
                <h3 className="ca-bento-card-title">Pro access, on us</h3>
                <p className="ca-bento-card-sub">Unlock at five paid signups.</p>
              </div>
            </div>

            {/* 03 — Max access (premium badge) */}
            <div className="ca-bento-card" style={{ gridColumn: '10 / 13', padding: 0, overflow: 'hidden' }}>
              <div className="ca-bento-visual-top" style={{
                background: `radial-gradient(circle at 70% 30%, ${LIME}1c 0%, transparent 60%), linear-gradient(180deg, #1f2c33 0%, #19242b 100%)`,
                margin: 0, minHeight: 200,
              }}>
                <div style={{
                  fontFamily: "'Droid Serif', Georgia, serif",
                  fontSize: 64, fontWeight: 700, color: LIME, letterSpacing: '-2px', lineHeight: 1,
                }}>Max</div>
                <div className="ca-bento-logo-overlay" style={{
                  fontSize: 11, color: LIME, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase',
                  background: 'rgba(212,255,74,0.12)', border: `1px solid ${LIME}55`,
                  padding: '4px 10px', borderRadius: 6,
                }}>Top performers</div>
              </div>
              <div style={{ padding: '20px 24px 26px' }}>
                <h3 className="ca-bento-card-title">Max, when you earn it</h3>
                <p className="ca-bento-card-sub">Includes direct intros to hiring managers.</p>
              </div>
            </div>

            {/* 04 — Letter of Recommendation (visual) */}
            <div className="ca-bento-card" style={{ gridColumn: '1 / 5', padding: 0, overflow: 'hidden' }}>
              <div className="ca-bento-visual-top" style={{
                background: `linear-gradient(135deg, #1d2a32 0%, #19242b 70%)`,
                margin: 0, minHeight: 200,
              }}>
                <div style={{
                  width: 110, height: 140, background: '#ffffff',
                  borderRadius: 8, position: 'relative',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                  transform: 'rotate(-4deg)',
                  padding: '14px 12px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ height: 4, background: '#1a3338', borderRadius: 2, width: '40%' }} />
                  <div style={{ height: 3, background: '#9caaaf', borderRadius: 2 }} />
                  <div style={{ height: 3, background: '#9caaaf', borderRadius: 2, width: '85%' }} />
                  <div style={{ height: 3, background: '#9caaaf', borderRadius: 2 }} />
                  <div style={{ height: 3, background: '#9caaaf', borderRadius: 2, width: '60%' }} />
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: ACCENT_GREEN }} />
                    <div style={{ height: 3, background: '#1a3338', borderRadius: 2, flex: 1 }} />
                  </div>
                </div>
                <div className="ca-bento-watch">▷ Earn</div>
              </div>
              <div style={{ padding: '20px 24px 26px' }}>
                <h3 className="ca-bento-card-title">Letter of Recommendation</h3>
                <p className="ca-bento-card-sub">Personalised for top performers. Useful for grad school and jobs.</p>
              </div>
            </div>

            {/* 05 — Founder and recruiter network (quote) */}
            <div className="ca-bento-card" style={{ gridColumn: '5 / 9', minHeight: 280 }}>
              <p className="ca-bento-quote">
                &ldquo;Direct line to a team that has hired for thousands of companies. The kind of network that keeps paying off long after the cohort ends.&rdquo;
              </p>
              <div className="ca-bento-chip">
                <div className="ca-bento-chip-dot" style={{ background: `${ACCENT_GREEN}33`, color: '#ffffff' }}>🤝</div>
                <div>
                  <div className="ca-bento-chip-text" style={{ color: '#ffffff' }}>Founder &amp; recruiter network</div>
                  <div className="ca-bento-chip-text" style={{ color: ACCENT_GREEN, marginTop: 2 }}>IIT alums · 6 yrs in recruitment</div>
                </div>
              </div>
            </div>

            {/* 06 — Leaderboard (visual) */}
            <div className="ca-bento-card" style={{ gridColumn: '9 / 13', padding: 0, overflow: 'hidden' }}>
              <div className="ca-bento-visual-top" style={{
                background: `linear-gradient(180deg, #1c2932 0%, #19242b 100%)`,
                margin: 0, minHeight: 200,
                gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ width: 36, height: 50, background: '#3d7a72', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, fontSize: 11, fontWeight: 700, color: '#ffffff' }}>2</div>
                  <div style={{ width: 36, height: 72, background: LIME, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, fontSize: 12, fontWeight: 800, color: DARK_PANEL }}>1</div>
                  <div style={{ width: 36, height: 38, background: TEAL, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, fontSize: 11, fontWeight: 700, color: '#ffffff' }}>3</div>
                </div>
                <div className="ca-bento-watch">▷ Climb</div>
              </div>
              <div style={{ padding: '20px 24px 26px' }}>
                <h3 className="ca-bento-card-title">Leaderboard recognition</h3>
                <p className="ca-bento-card-sub">Top performers featured publicly across NextHire channels.</p>
              </div>
            </div>

            {/* 07 — Startup exposure (full-width quote) */}
            <div className="ca-bento-card" style={{ gridColumn: '1 / 13', minHeight: 220 }}>
              <p className="ca-bento-quote" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', maxWidth: 920 }}>
                &ldquo;Real go to market experience at an early stage AI company. Sales, community, product feedback, and startup growth, all in one role.&rdquo;
              </p>
              <div className="ca-bento-chip">
                <div className="ca-bento-chip-dot" style={{ background: `${LIME}1f`, color: LIME }}>⚡</div>
                <div>
                  <div className="ca-bento-chip-text" style={{ color: '#ffffff' }}>Startup exposure</div>
                  <div className="ca-bento-chip-text" style={{ color: LIME, marginTop: 2 }}>GTM · community · product</div>
                </div>
              </div>
            </div>
          </div>

          {/* COLLEGE1000 coupon callout (sits on the dark canvas as a final wide row) */}
          <div style={{
            marginTop: 14,
            background: '#19242b',
            border: `1px solid rgba(212,255,74,0.18)`,
            borderRadius: 18,
            padding: 'clamp(24px, 3.5vw, 36px)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 24, alignItems: 'center',
          }}>
            <div style={{
              border: `2px dashed ${LIME}`, borderRadius: 12,
              padding: '18px 22px', textAlign: 'center',
              fontFamily: "'Inter', monospace",
              fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: LIME, letterSpacing: '2px',
              minWidth: 200,
            }}>
              COLLEGE1000
            </div>
            <div>
              <div style={{ fontSize: FONT.xs, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: WEIGHT.semi, color: LIME }}>
                Your coupon code
              </div>
              <p style={{ margin: '8px 0 0', color: '#ffffff', fontSize: FONT.base, lineHeight: 1.65 }}>
                <strong>₹1,000 off</strong> the monthly Pro plan · <strong>₹3,000 off</strong> the quarterly Pro plan. Stacks with the standard 10% quarterly discount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="ca-steps" style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 88px) 0' }}>
        <div className="nh-container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={sectionTitle}>Start in under 60 seconds.</h2>
            <p style={{ ...sectionSub, margin: '0 auto' }}>
              Four simple steps from application to active ambassador.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={cardStyle}>
                <div style={{ fontSize: FONT.xs, letterSpacing: '0.8px', color: ACCENT_GREEN, fontWeight: WEIGHT.extra, textTransform: 'uppercase' }}>
                  STEP {s.n}
                </div>
                <h3 style={{ margin: 0, fontSize: FONT.md, color: DARK_TEXT, fontWeight: WEIGHT.bold }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: FONT.sm, color: BODY_TEXT, lineHeight: 1.65, flex: 1 }}>{s.body}</p>
                {s.href && s.cta && (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 4, fontSize: FONT.sm, fontWeight: WEIGHT.semi,
                      color: ACCENT_GREEN, textDecoration: 'none',
                    }}
                  >
                    {s.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIME COMMITMENT */}
      <section style={{ background: '#f7faf9', padding: 'clamp(64px, 8vw, 88px) 0' }}>
        <div className="nh-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={sectionTitle}>6 to 10 hours per month.</h2>
            <p style={{ ...sectionSub, marginBottom: 18 }}>
              A lightweight campus leadership role designed to fit around classes and placements.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
              {TIME_ACTIVITIES.map((a) => (
                <li key={a} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ marginTop: 8, flex: '0 0 6px', width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
                  <span style={{ fontSize: FONT.base, color: BODY_TEXT, lineHeight: 1.6 }}>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: DARK_PANEL, color: '#ffffff',
            borderRadius: 18, padding: 'clamp(28px, 4vw, 40px)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: FONT.xs, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: WEIGHT.semi, color: LIME }}>
              Time commitment
            </div>
            <div style={{ fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: WEIGHT.extra, lineHeight: 1.05, marginTop: 10, letterSpacing: '-1.2px' }}>
              6 to 10 hrs
            </div>
            <div style={{ fontSize: FONT.md, color: '#cfd6da', marginTop: 4 }}>per month</div>
            <div style={{ marginTop: 22, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: FONT.xs, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: WEIGHT.semi, color: LIME }}>
                Top performer track
              </div>
              <p style={{ margin: '8px 0 0', color: '#cfd6da', fontSize: FONT.sm, lineHeight: 1.65 }}>
                Standout ambassadors get an LoR, leaderboard recognition, and direct intros to hiring managers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PlansSection />

      {/* POSITIONING AND FOUNDERS */}
      <section style={{ background: MINT, padding: 'clamp(64px, 8vw, 88px) 0' }}>
        <div className="nh-container">
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 44px' }}>
            <div style={{ ...pillStyle, justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT_GREEN, boxShadow: `0 0 8px ${ACCENT_GREEN}` }} />
              <span>Why this matters</span>
            </div>
            <h2 style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, lineHeight: 1.15,
              letterSpacing: '-1px', color: DARK_PANEL, margin: '20px 0 16px',
            }}>
              Not a referral role.
            </h2>
            <p style={{ fontSize: FONT.md, color: BODY_TEXT, margin: '0 auto', maxWidth: 640, lineHeight: 1.65 }}>
              This is a chance to become a <strong style={{ color: DARK_TEXT }}>founding campus partner</strong> for an early stage AI career platform. Build real experience in sales, community, product feedback, and startup growth. Top performers also get direct job search support and intros to hiring managers in our network.
            </p>
          </div>

          {/* Credibility stat band */}
          <style>{`
            .ca-stat-band {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              background: #ffffff;
              border: 1px solid ${SAGE_BORDER};
              border-radius: 20px;
              box-shadow: 0 8px 28px rgba(37,62,66,0.06);
              overflow: hidden;
              max-width: 920px;
              margin: 0 auto;
            }
            .ca-stat-cell {
              padding: clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px);
              text-align: center;
              position: relative;
            }
            .ca-stat-cell + .ca-stat-cell::before {
              content: '';
              position: absolute;
              left: 0; top: 18%; bottom: 18%;
              width: 1px;
              background: ${SAGE_BORDER};
            }
            @media (max-width: 720px) {
              .ca-stat-band { grid-template-columns: 1fr; }
              .ca-stat-cell + .ca-stat-cell::before {
                left: 18%; right: 18%; top: 0; bottom: auto;
                width: auto; height: 1px;
              }
            }
          `}</style>

          <div className="ca-stat-band">
            {[
              { value: '6+',     suffix: 'years',     label: 'In recruitment via AlgoTale' },
              { value: '1,000s', suffix: null,        label: 'Of companies hired for' },
              { value: 'IIT',    suffix: null,    label: 'Founding engineering team' },
            ].map(s => (
              <div key={s.label} className="ca-stat-cell">
                <div style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: 8,
                  fontFamily: "'Droid Serif', Georgia, serif",
                  fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700,
                  color: DARK_PANEL, lineHeight: 1, letterSpacing: '-1.6px',
                }}>
                  <span style={{ color: ACCENT_GREEN }}>{s.value}</span>
                  {s.suffix && (
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 'clamp(14px, 1.4vw, 18px)', fontWeight: WEIGHT.semi,
                      color: BODY_TEXT, letterSpacing: '-0.2px',
                    }}>
                      {s.suffix}
                    </span>
                  )}
                </div>
                <div style={{
                  marginTop: 14, fontSize: FONT.xs, color: MUTED,
                  letterSpacing: '0.8px', textTransform: 'uppercase',
                  fontWeight: WEIGHT.semi, lineHeight: 1.5,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: DARK_PANEL, padding: 'clamp(72px, 10vw, 110px) 0' }}>
        <div className="nh-container">
          <div style={{
            background: '#eef7f3', borderRadius: 28,
            padding: 'clamp(40px, 7vw, 80px)',
            textAlign: 'center',
            boxShadow: '0 8px 48px rgba(19,33,40,0.10)',
          }}>
            <div style={{ ...pillStyle, background: 'rgba(34,197,94,0.12)', border: `1px solid rgba(34,197,94,0.3)`, color: ACCENT_GREEN, justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT_GREEN }} />
              <span>Applications open · Founding cohort 2026</span>
            </div>

            <h2 style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 400, lineHeight: 1.15,
              letterSpacing: '-1px', color: DARK_PANEL, margin: '22px 0 14px',
            }}>
              Become a founding<br />campus partner.
            </h2>
            <p style={{ fontSize: FONT.md, color: BODY_TEXT, margin: '0 auto 36px', maxWidth: 540, lineHeight: 1.6 }}>
              Apply through the form, join the WhatsApp group, and start representing NextHire on your campus.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
                Apply now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={ctaSecondary}>
                Join WhatsApp group
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
