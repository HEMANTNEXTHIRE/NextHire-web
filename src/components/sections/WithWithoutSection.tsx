'use client'

import { Gravity, MatterBody } from '@/components/ui/gravity'

/* ── Chips — big, dark backgrounds, white text ───────────────── */
const CHIPS: Array<{ text: string; x: string; y: string; angle?: number; bg: string }> = [
  { text: 'Job Boards',       x: '25%',  y: '4%',  angle: -4, bg: '#1a3338' },
  { text: 'Cold Emails',      x: '60%',  y: '3%',  angle:  3, bg: '#2e7d4f' },
  { text: 'LinkedIn DMs',     x: '42%',  y: '8%',  angle: -6, bg: '#132128' },
  { text: 'Spreadsheets',     x: '75%',  y: '5%',  angle:  5, bg: '#3d7a72' },
  { text: 'Interview Prep',   x: '18%',  y: '14%', angle: -7, bg: '#5fa89e' },
  { text: 'Resume Rewrites',  x: '55%',  y: '16%', angle:  4, bg: '#166534' },
  { text: 'Follow-ups',       x: '35%',  y: '20%', angle: -3, bg: '#1a3338' },
  { text: 'Ghosted 👻',       x: '70%',  y: '18%', angle:  6, bg: '#132128' },
  { text: 'Rejections',       x: '28%',  y: '28%', angle: -5, bg: '#3d7a72' },
  { text: 'Cover Letters',    x: '62%',  y: '26%', angle:  3, bg: '#2e7d4f' },
]

/* ── Right panel items ───────────────────────────────────────── */
const WITH_ITEMS = [
  { num: '01', icon: '🔍', text: 'AI finds roles before they\'re even posted' },
  { num: '02', icon: '🤖', text: 'Talk directly to hiring managers, skip the line'},
  { num: '03', icon: '💬', text: 'Real-time coaching through every interview'},
  { num: '04', icon: '🎯', text: 'Multiple offers. You pick the best one.'},
]

export default function WithWithoutSection() {
  return (
    <section style={{ background: '#ffffff', padding: '80px 0 0' }}>
      <div className="nh-container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, color: '#3d7a72',
            background: 'rgba(95,168,158,0.10)',
            padding: '5px 16px', borderRadius: 100,
            letterSpacing: '1.2px', textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            The difference
          </div>
          <h2 style={{
            fontFamily: "'Droid Serif', Georgia, serif",
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 500,
            color: '#132128', margin: 0,
            letterSpacing: '-1.1px', lineHeight: 1.15,
          }}>
            The old way vs. the NextHire way
          </h2>
        </div>

        {/* Card */}
        <div className="nh-with-without-card" style={{
          background: '#eef7f3',
          borderRadius: 28,
          boxShadow: '0 8px 48px rgba(19,33,40,0.10)',
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden',
          minHeight: 600,
        }}>

          {/* ── LEFT: Without NextHire ────────────────────────── */}
          <div className="nh-ww-left" style={{
            flex: '1 1 50%',
            minWidth: 0,
            position: 'relative',
            backgroundImage: 'radial-gradient(circle, rgba(19,33,40,0.09) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            backgroundColor: '#f4f9f7',
            borderRight: '1px solid rgba(19,33,40,0.08)',
            /* clip anything that reaches the edge */
            overflow: 'hidden',
          }}>

            {/* Label — centered at top */}
            <div style={{
              position: 'absolute', top: 28, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
              zIndex: 20, pointerEvents: 'none',
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: 11, fontWeight: 700, color: '#6b7280',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(0,0,0,0.09)',
                borderRadius: 9999,
                padding: '7px 18px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
              }}>
                Without NextHire
              </span>
            </div>

            {/* Physics world — desktop/tablet only. Inset so pills can't clip the panel edges */}
            <div className="nh-ww-physics" style={{
              position: 'absolute',
              /* inset 20px on every side — physics walls live here, not at the raw edge */
              top: 20, left: 20, right: 20, bottom: 20,
              overflow: 'hidden',
            }}>
              <Gravity gravity={{ x: 0, y: 0.8 }} grabCursor addTopWall={false} autoStart>
                {CHIPS.map((chip) => (
                  <MatterBody
                    key={chip.text}
                    x={chip.x}
                    y={chip.y}
                    angle={chip.angle ?? 0}
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.003 }}
                    bodyType="rectangle"
                    isDraggable
                  >
                    <div className="nh-ww-chip" style={{
                      background: chip.bg,
                      borderRadius: 9999,
                      padding: '16px 32px',
                      fontSize: 17,
                      fontWeight: 600,
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 16px rgba(19,33,40,0.20)',
                      userSelect: 'none',
                      cursor: 'grab',
                      letterSpacing: '-0.3px',
                      lineHeight: 1,
                    }}>
                      {chip.text}
                    </div>
                  </MatterBody>
                ))}
              </Gravity>
            </div>

            {/* Mobile static chips — flex-wrap arrangement, no physics dependency.
                Always renders so users never see an empty dotted panel. */}
            <div className="nh-ww-static" aria-hidden="true">
              {CHIPS.map((chip) => (
                <span
                  key={chip.text}
                  style={{
                    background: chip.bg,
                    borderRadius: 9999,
                    padding: '8px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(19,33,40,0.20)',
                    letterSpacing: '-0.3px',
                    lineHeight: 1,
                    transform: `rotate(${chip.angle ?? 0}deg)`,
                    display: 'inline-block',
                  }}
                >
                  {chip.text}
                </span>
              ))}
            </div>

            {/* Drag hint — only relevant for the physics layout (desktop) */}
            <div className="nh-ww-draghint" style={{
              position: 'absolute', bottom: 22, left: 0, right: 0,
              textAlign: 'center', zIndex: 20, pointerEvents: 'none',
            }}>
              <span style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.3px' }}>
                drag to interact
              </span>
            </div>
          </div>

          {/* ── RIGHT: With NextHire ──────────────────────────── */}
          <div className="nh-ww-right" style={{
            flex: '1 1 50%',
            minWidth: 0,
            background: '#132128',
            padding: 'clamp(40px, 6vw, 56px) clamp(24px, 6vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, color: '#5fa89e',
              background: 'rgba(95,168,158,0.15)',
              borderRadius: 9999, padding: '7px 18px',
              letterSpacing: '0.6px', textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              With NextHire
            </span>

            <h3 style={{
              fontFamily: "'Droid Serif', Georgia, serif",
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              fontWeight: 400, color: '#ffffff',
              margin: '0 0 36px',
              letterSpacing: '-0.8px', lineHeight: 1.25,
            }}>
              Everything handled.<br />You just show up.
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 420 }}>
              {WITH_ITEMS.map((item) => (
                <div key={item.num} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: '18px 22px',
                  textAlign: 'left',
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(95,168,158,0.20)',
                    border: '1px solid rgba(95,168,158,0.30)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: '#5fa89e', letterSpacing: '0.5px',
                  }}>
                    {item.num}
                  </span>
                  <span style={{
                    flex: 1, fontSize: 15, fontWeight: 500,
                    color: 'rgba(255,255,255,0.88)',
                    letterSpacing: '-0.3px', lineHeight: 1.4,
                  }}>
                    {item.text}
                  </span>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
