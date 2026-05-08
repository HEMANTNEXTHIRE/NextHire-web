'use client'

import Link from 'next/link'

interface DualActionCTAProps {
  leftTitle?: string
  leftSubtitle?: string
  leftDesc?: string
  leftLabel?: string
  leftHref?: string
  rightTitle?: string
  rightSubtitle?: string
  rightDesc?: string
  rightLabel?: string
  rightHref?: string
}

const APP_URL = 'https://app.nexthireconsulting.com'

const descStyle: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '27px',
  letterSpacing: '-0.3px',
  color: '#424d53',
  margin: '0 0 40px',
}

export default function DualActionCTA({
  leftTitle = 'GET STARTED',
  leftSubtitle = 'Kickstart Your Career Journey',
  leftDesc = 'AI that searches, applies, and coaches while you focus on landing the offer.',
  leftLabel = 'Try for free',
  leftHref = APP_URL,
  rightTitle = 'TALK TO AN EXPERT',
  rightSubtitle = 'Build a team that wins',
  rightDesc = 'AI agents run sourcing, screening, and outreach so your team only meets the best.',
  rightLabel = 'Schedule Now',
  rightHref = '/contact-us',
}: DualActionCTAProps) {
  const isExternalLeft = leftHref.startsWith('http')
  const isExternalRight = rightHref.startsWith('http')

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#132128',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.3px',
    padding: '14px 28px',
    borderRadius: '9999px',
    border: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'background 0.2s ease',
    marginTop: 'auto',
  }

  return (
    <section
      id="dual-action-cta"
      style={{
        background: '#162127',
        padding: 'clamp(72px, 10vw, 110px) 0 0',
      }}
    >
      {/* Wrapper aligned to nav (1320px / 30px) */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 2.5vw, 30px)' }}>

      {/* One card, two halves */}
      <div className="nh-dual-action-card" style={{
        background: '#eef7f3',
        borderRadius: '28px',
        boxShadow: '0 8px 48px rgba(19,33,40,0.10)',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}>

        {/* ── Left half ── */}
        <div style={{
          flex: '1 1 50%',
          minWidth: 0,
          padding: 'clamp(32px, 6vw, 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRight: '1px solid rgba(19,33,40,0.08)',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: '16px', fontWeight: 600, lineHeight: '24px', letterSpacing: '0px',
            color: '#424d53', textTransform: 'uppercase',
            background: '#E8E9EA', borderRadius: '10px', padding: '8px 18px',
            marginBottom: '18px',
          }}>
            {leftTitle}
          </div>

          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-1.2px',
            color: '#132128', margin: '0 0 16px',
          }}>
            {leftSubtitle}
          </h2>

          <p style={descStyle}>{leftDesc}</p>

          {isExternalLeft ? (
            <a href={leftHref} target="_blank" rel="noopener noreferrer" style={btnStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
            >{leftLabel}</a>
          ) : (
            <Link href={leftHref} style={btnStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
            >{leftLabel}</Link>
          )}
        </div>

        {/* ── Right half ── */}
        <div style={{
          flex: '1 1 50%',
          minWidth: 0,
          padding: 'clamp(32px, 6vw, 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          background: '#E4F3F5',
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: '16px', fontWeight: 600, lineHeight: '24px', letterSpacing: '0px',
            color: '#424d53', textTransform: 'uppercase',
            background: '#E8E9EA', borderRadius: '10px', padding: '8px 18px',
            marginBottom: '18px',
          }}>
            {rightTitle}
          </div>

          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-1.2px',
            color: '#132128', margin: '0 0 16px',
          }}>
            {rightSubtitle}
          </h2>

          <p style={descStyle}>{rightDesc}</p>

          {isExternalRight ? (
            <a href={rightHref} target="_blank" rel="noopener noreferrer" style={btnStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
            >{rightLabel}</a>
          ) : (
            <Link href={rightHref} style={btnStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
            >{rightLabel}</Link>
          )}
        </div>

      </div>{/* end card */}
      </div>{/* end 1320px wrapper */}
    </section>
  )
}
