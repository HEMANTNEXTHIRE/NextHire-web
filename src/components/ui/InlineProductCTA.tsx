'use client'

import Link from 'next/link'

interface InlineProductCTAProps {
  label?: string
  title?: string
  description?: string
  buttonLabel?: string
  href?: string
}

const APP_URL = 'https://app.nexthireconsulting.com'

export default function InlineProductCTA({
  label = 'GET STARTED',
  title = 'Land your next role 5x faster',
  description = 'NextHire AI searches, applies, and coaches you through every step, while you focus on landing the offer.',
  buttonLabel = 'Try NextHire free',
  href = APP_URL,
}: InlineProductCTAProps) {
  const isExternal = href.startsWith('http')

  const card: React.CSSProperties = {
    background: 'linear-gradient(135deg, #edf5f1 0%, #ffffff 100%)',
    border: '1.5px solid #c8dfd6',
    borderRadius: 16,
    padding: 'clamp(22px, 3vw, 32px)',
    margin: '36px 0',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    flexWrap: 'wrap',
  }

  const labelChip: React.CSSProperties = {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.4px',
    color: '#2e7d4f',
    textTransform: 'uppercase',
    marginBottom: 10,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 600,
    color: '#132128',
    margin: '0 0 6px',
    lineHeight: 1.3,
    letterSpacing: '-0.3px',
  }

  const descStyle: React.CSSProperties = {
    fontSize: 15,
    color: '#4b5563',
    margin: 0,
    lineHeight: 1.55,
  }

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#132128',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 500,
    padding: '12px 22px',
    borderRadius: 9999,
    border: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s ease',
    flexShrink: 0,
  }

  const Btn = isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={btnStyle}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
    >
      {buttonLabel} →
    </a>
  ) : (
    <Link
      href={href}
      style={btnStyle}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#338632')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#132128')}
    >
      {buttonLabel} →
    </Link>
  )

  return (
    <aside style={card}>
      <div style={{ flex: '1 1 280px', minWidth: 0 }}>
        <div style={labelChip}>{label}</div>
        <div style={titleStyle}>{title}</div>
        <p style={descStyle}>{description}</p>
      </div>
      {Btn}
    </aside>
  )
}
