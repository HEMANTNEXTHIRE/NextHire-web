'use client'

import { useState } from 'react'
import { CANDIDATE_TIERS, CHECKOUT_URL, type CandidateTier } from '@/lib/pricing'
import { FONT, WEIGHT } from '@/constants/typography'

type BillingCycle = 'monthly' | 'quarterly'

type PlanTheme = {
  bg: string; border: string; badgeBg: string; badgeColor: string;
  nameColor: string; descColor: string; priceColor: string; priceMuted: string;
  ctaBg: string; ctaColor: string; ctaBorder: string;
  divider: string; labelColor: string; featureColor: string; checkColor: string;
}

const PLAN_THEMES: Record<CandidateTier['id'], PlanTheme> = {
  free: {
    bg: '#f9faf9',
    border: '1px solid rgba(19,33,40,0.12)',
    badgeBg: 'rgba(19,33,40,0.07)', badgeColor: '#6b7280',
    nameColor: '#132128', descColor: '#6b7280',
    priceColor: '#132128', priceMuted: '#9ca3af',
    ctaBg: 'transparent', ctaColor: '#132128',
    ctaBorder: '1.5px solid rgba(19,33,40,0.28)',
    divider: 'rgba(19,33,40,0.10)', labelColor: '#9ca3af',
    featureColor: 'rgba(19,33,40,0.62)', checkColor: '#5fa89e',
  },
  lite: {
    bg: '#f9faf9',
    border: '1px solid rgba(19,33,40,0.12)',
    badgeBg: 'rgba(61,122,114,0.12)', badgeColor: '#3d7a72',
    nameColor: '#132128', descColor: '#6b7280',
    priceColor: '#132128', priceMuted: '#9ca3af',
    ctaBg: 'transparent', ctaColor: '#132128',
    ctaBorder: '1.5px solid rgba(19,33,40,0.28)',
    divider: 'rgba(19,33,40,0.10)', labelColor: '#9ca3af',
    featureColor: 'rgba(19,33,40,0.62)', checkColor: '#5fa89e',
  },
  /* "Focus plan": punchy green emphasis so it reads as the recommended tier */
  pro: {
    bg: '#e8f5ee',
    border: '2px solid #2e7d4f',
    badgeBg: '#2e7d4f', badgeColor: '#ffffff',
    nameColor: '#132128', descColor: '#3d5a56',
    priceColor: '#132128', priceMuted: '#6b7280',
    ctaBg: '#338632', ctaColor: '#ffffff', ctaBorder: 'none',
    divider: 'rgba(46,125,79,0.22)', labelColor: '#3d5a56',
    featureColor: 'rgba(19,33,40,0.78)', checkColor: '#338632',
  },
  max: {
    bg: '#132128',
    border: '1px solid rgba(95,168,158,0.20)',
    badgeBg: 'rgba(255,255,255,0.10)', badgeColor: '#5fa89e',
    nameColor: 'rgba(255,255,255,0.55)', descColor: 'rgba(255,255,255,0.40)',
    priceColor: '#ffffff', priceMuted: 'rgba(255,255,255,0.40)',
    ctaBg: 'rgba(255,255,255,0.90)', ctaColor: '#132128', ctaBorder: 'none',
    divider: 'rgba(255,255,255,0.10)', labelColor: 'rgba(255,255,255,0.38)',
    featureColor: 'rgba(255,255,255,0.72)', checkColor: '#5fa89e',
  },
}

/* INR-only display strings (campus audience is India) */
function priceFor(tier: CandidateTier, cycle: BillingCycle) {
  const t = tier.inr
  if (t.monthly === 0) return { display: '₹0', sub: 'Free forever', note: ' ' }
  if (cycle === 'quarterly') {
    const perMo = t.quarterly.toLocaleString('en-IN')
    const total = t.quarterlyTotal.toLocaleString('en-IN')
    return {
      display: `₹${perMo}`,
      sub: '/mo · billed quarterly',
      note: `₹${total} billed quarterly`,
    }
  }
  const m = t.monthly.toLocaleString('en-IN')
  return { display: `₹${m}`, sub: '/mo · billed monthly', note: ' ' }
}

const FEATURE_OVERRIDES: Partial<Record<CandidateTier['id'], string[]>> = {
  /* override the source string that contains a hyphen ("Real-time...") */
  pro: [
    'Live AI Interview Coach',
    'Unlimited AI Auto Apply to all platforms',
    'Direct recruiter InMails to get noticed',
  ],
}

const BADGES: Partial<Record<CandidateTier['id'], string>> = {
  pro: 'Focus plan',
}

const CTAS: Record<CandidateTier['id'], string> = {
  free: 'Get started free',
  lite: 'Start Lite',
  pro:  'Start Pro',
  max:  'Start Max',
}

const DARK_TEXT = '#1a3338'
const MUTED = '#8aada8'
const SECTION_TITLE: React.CSSProperties = {
  fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: DARK_TEXT,
  margin: '0 0 12px', letterSpacing: '-0.5px',
}
const SECTION_SUB: React.CSSProperties = {
  fontSize: FONT.base, color: '#3d5a56', margin: 0, maxWidth: 680,
}

export default function PlansSection() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 88px) 0' }}>
      <style>{`
        .ca-plans-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .ca-plans-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (min-width: 1024px) {
          .ca-plans-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
        }
      `}</style>

      <div className="nh-container">
        <div style={{ marginBottom: 36, textAlign: 'center' }}>
          <h2 style={SECTION_TITLE}>The plans you&apos;ll be selling.</h2>
          <p style={{ ...SECTION_SUB, margin: '0 auto' }}>
            Focus on <strong style={{ color: DARK_TEXT }}>Pro</strong> for freshers. Toggle to compare monthly and quarterly pricing.
          </p>
        </div>

        {/* Monthly / Quarterly toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            borderRadius: 9999,
            background: '#efefef',
            padding: 5,
            gap: 0,
          }}>
            {(['monthly', 'quarterly'] as BillingCycle[]).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                style={{
                  position: 'relative',
                  borderRadius: 9999,
                  padding: '14px 52px',
                  fontSize: 17,
                  fontWeight: cycle === c ? WEIGHT.bold : WEIGHT.normal,
                  border: 'none',
                  cursor: 'pointer',
                  background: cycle === c ? '#ffffff' : 'transparent',
                  outline: 'none',
                  transition: 'background 0.18s ease, box-shadow 0.18s ease',
                  letterSpacing: '-0.3px',
                  color: cycle === c ? '#111827' : '#9ca3af',
                  boxShadow: cycle === c ? '0 2px 12px rgba(0,0,0,0.10)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {c === 'monthly' ? 'Monthly' : 'Quarterly'}
                {c === 'quarterly' && (
                  <span style={{
                    fontSize: 13,
                    fontWeight: WEIGHT.semi,
                    color: cycle === 'quarterly' ? '#166534' : '#9ca3af',
                    background: cycle === 'quarterly' ? '#dcfce7' : '#e5e7eb',
                    borderRadius: 9999,
                    padding: '3px 10px',
                    letterSpacing: '0px',
                    transition: 'background 0.18s ease, color 0.18s ease',
                  }}>
                    Save 10%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="ca-plans-grid">
          {CANDIDATE_TIERS.map(tier => {
            const t = PLAN_THEMES[tier.id]
            const p = priceFor(tier, cycle)
            const isFocus = tier.id === 'pro'
            const badge = BADGES[tier.id]
            const features = FEATURE_OVERRIDES[tier.id] ?? tier.features
            return (
              <div
                key={tier.id}
                style={{
                  position: 'relative',
                  background: t.bg,
                  borderRadius: 20,
                  border: t.border,
                  padding: isFocus ? '40px 24px 32px' : '28px 24px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isFocus ? '0 18px 44px rgba(46,125,79,0.22)' : 'none',
                }}
              >
                {/* Badge */}
                {badge && (
                  isFocus ? (
                    <div style={{
                      position: 'absolute',
                      top: -14, left: '50%',
                      transform: 'translateX(-50%)',
                      background: t.badgeBg, color: t.badgeColor,
                      fontSize: 11, fontWeight: 800, letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      borderRadius: 9999,
                      boxShadow: '0 6px 14px rgba(46,125,79,0.30)',
                      whiteSpace: 'nowrap',
                    }}>
                      ★ {badge}
                    </div>
                  ) : (
                    <div style={{ marginBottom: 10 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.7px',
                        textTransform: 'uppercase',
                        background: t.badgeBg, color: t.badgeColor,
                        borderRadius: 9999, padding: '4px 11px',
                        display: 'inline-block',
                      }}>
                        {badge}
                      </span>
                    </div>
                  )
                )}

                {/* Plan name + description */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 18, fontWeight: 600, color: t.nameColor,
                    letterSpacing: '-0.4px', lineHeight: 1, marginBottom: 6,
                  }}>
                    {tier.name}
                  </div>
                  <div style={{ fontSize: 13, color: t.descColor, lineHeight: 1.4, letterSpacing: '-0.1px' }}>
                    {tier.description}
                  </div>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 4 }}>
                  <span style={{
                    fontSize: 36, fontWeight: 700, color: t.priceColor,
                    letterSpacing: '-0.04em', lineHeight: 1,
                  }}>
                    {p.display}
                  </span>
                  {tier.inr.monthly > 0 && (
                    <span style={{ fontSize: 15, color: t.priceMuted, marginLeft: 4 }}>
                      /month
                    </span>
                  )}
                </div>

                {/* Billing sub note */}
                <div style={{
                  fontSize: 12, color: t.priceMuted, lineHeight: 1.4,
                  marginBottom: 20,
                  minHeight: 18,
                  visibility: p.note.trim() === '' ? 'hidden' : 'visible',
                }}>
                  {p.note.trim() === '' ? ' ' : p.note}
                </div>

                {/* CTA */}
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '13px 0',
                    borderRadius: 40,
                    border: t.ctaBorder,
                    background: t.ctaBg,
                    color: t.ctaColor,
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '-0.3px',
                    marginBottom: 22,
                    boxSizing: 'border-box',
                  }}
                >
                  {CTAS[tier.id]}
                </a>

                {/* Divider */}
                <div style={{ height: 1, background: t.divider, marginBottom: 14, flexShrink: 0 }} />

                {/* Key features label */}
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.8px',
                  textTransform: 'uppercase', color: t.labelColor,
                  marginBottom: 12,
                }}>
                  Key features
                </div>

                {/* Feature list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                        <path d="M1.5 5L5 8.5L12.5 1.5" stroke={t.checkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{
                        fontSize: 14, fontWeight: 400, lineHeight: 1.45,
                        letterSpacing: '-0.2px', color: t.featureColor,
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ marginTop: 28, fontSize: FONT.sm, color: MUTED, textAlign: 'center' }}>
          The <strong style={{ color: DARK_TEXT }}>Pro</strong> plan unlocks the AI Interview Coach. Comparable to tools like Cluely or Parakeet AI, but built to be more affordable for students.
        </p>
      </div>
    </section>
  )
}
