'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ─── Tokens ─────────────────────────────────────────────── */
const T = {
  accent:  '#5fa89e',
  accentGlow: 'rgba(95,168,158,0.55)',
  dark:    '#0f1117',
  nodeBg:  '#0c1218',
  muted:   '#9ca3af',
  white:   '#ffffff',
  pill:    'rgba(10,14,22,0.84)',
  grid:    'rgba(0,0,0,0.032)',
}

/* ─── Particle layout (% within node) ───────────────────── */
const PARTICLES = [
  { x: 24, y: 26, s: 2.2, d: 0.00 },
  { x: 58, y: 18, s: 1.8, d: 0.55 },
  { x: 74, y: 50, s: 2.4, d: 1.05 },
  { x: 38, y: 70, s: 2.0, d: 0.75 },
  { x: 66, y: 74, s: 1.6, d: 1.35 },
  { x: 16, y: 57, s: 1.8, d: 0.90 },
  { x: 80, y: 29, s: 1.4, d: 0.20 },
]

/* ─── SVG icons ─────────────────────────────────────────── */
const IZap = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <path d="M9.5 2L4 9.5h5L7.5 15l6.5-7.5H9L9.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IFile = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <path d="M9.5 2H4.5A1.5 1.5 0 003 3.5v10A1.5 1.5 0 004.5 15h8A1.5 1.5 0 0014 13.5V6.5L9.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 2v4.5H14M5.5 10h6M5.5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IList = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <circle cx="3" cy="5" r="1.2" fill="currentColor"/>
    <circle cx="3" cy="8.5" r="1.2" fill="currentColor"/>
    <circle cx="3" cy="12" r="1.2" fill="currentColor"/>
    <path d="M6.5 5h8M6.5 8.5h8M6.5 12h5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IMic = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <rect x="6" y="2" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9.5A5.5 5.5 0 0014 9.5M8.5 15v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IMail = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <rect x="2" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const ISearch = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <circle cx="7.5" cy="7.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const ISend = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <path d="M14.5 2.5L7 9.5M14.5 2.5L9.5 14.5l-2.5-5-5-2.5 12.5-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IVideo = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <rect x="1.5" y="5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 8l5-2.5v6l-5-2.5V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)
const IBuilding = () => (
  <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
    <path d="M2 15V5.5l5.5-3V15M7.5 15h8V8L7.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3.5" y="7" width="2" height="2" rx="0.4" fill="currentColor"/>
    <rect x="3.5" y="11" width="2" height="2" rx="0.4" fill="currentColor"/>
    <rect x="9.5" y="10" width="2" height="2" rx="0.4" fill="currentColor"/>
  </svg>
)

/* ─── Feature data ──────────────────────────────────────── */
interface Feature {
  id: number
  title: string
  subtitle: string
  description: string
  plan: string
  orbit: 0 | 1 | 2
  posInOrbit: 0 | 1 | 2
  icon: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 1, orbit: 0, posInOrbit: 0,
    title: 'AI Auto Apply',
    subtitle: 'Apply while you sleep',
    description: 'AI scans millions of jobs matching your profile and submits tailored applications 24/7, so you wake up to interview requests, not rejections.',
    plan: 'Free (5/day) · Lite+ Unlimited',
    icon: <IZap />,
  },
  {
    id: 2, orbit: 0, posInOrbit: 1,
    title: 'Resume Builder',
    subtitle: 'A resume that gets read',
    description: 'AI builds and continuously optimizes your resume for ATS systems, tailoring keywords and formatting to each job description automatically.',
    plan: 'All plans',
    icon: <IFile />,
  },
  {
    id: 3, orbit: 0, posInOrbit: 2,
    title: 'Job Tracker',
    subtitle: 'Never lose track',
    description: 'Track every application, interview stage, and follow-up in one clean dashboard. Know exactly where you stand with every company.',
    plan: 'All plans',
    icon: <IList />,
  },
  {
    id: 4, orbit: 1, posInOrbit: 0,
    title: 'AI Interview Coach',
    subtitle: 'Ace every interview',
    description: 'Get real-time AI support during live interviews. It listens to questions as they are asked and helps you respond with relevant answers.',
    plan: 'Free (30 min) · Pro (20 hrs/mo + live)',
    icon: <IMic />,
  },
  {
    id: 5, orbit: 1, posInOrbit: 1,
    title: 'Recruiter InMail',
    subtitle: 'Skip the queue',
    description: 'Message hiring managers directly with personalized outreach and improve your chances of getting noticed.',
    plan: 'Lite 50/mo · Pro 200/mo · Max Unlimited',
    icon: <IMail />,
  },
  {
    id: 6, orbit: 1, posInOrbit: 2,
    title: 'Job Portal Optimization',
    subtitle: 'Stand Out on Job Portals',
    description: 'Optimize your profiles on LinkedIn, Indeed, Naukri, and other job platforms to get seen by more recruiters and improve your chances of getting the right opportunities.',
    plan: 'Pro & Max plans',
    icon: <ISearch />,
  },
  {
    id: 7, orbit: 2, posInOrbit: 0,
    title: 'AI Outreach Agent',
    subtitle: "Don't wait to be found",
    description: 'Our AI finds companies that are hiring and sends personalized emails from your email, helping you reach hiring teams directly and get noticed earlier.',
    plan: 'Max plan · 3,000 credits/mo',
    icon: <ISend />,
  },
  {
    id: 8, orbit: 2, posInOrbit: 1,
    title: 'AI Interviewer',
    subtitle: 'Practice until perfect',
    description: 'Practice with AI interview rounds and get feedback on your answers, so you know what to improve.',
    plan: 'Pro & Max plans',
    icon: <IVideo />,
  },
  {
    id: 9, orbit: 2, posInOrbit: 2,
    title: 'Career Page Jobs',
    subtitle: 'All Jobs. Not Just Portal Jobs',
    description: 'Most job portals show only a fraction of jobs. We bring openings directly from company career pages and ATS systems, giving you access to many more roles beyond traditional job boards.',
    plan: 'Lite+ plans',
    icon: <IBuilding />,
  },
]

/* ─── Orbit constants ────────────────────────────────────── */
const BASE_RADII = [88, 172, 268]     // px at scale 1
const SPEEDS     = [0.30, 0.19, 0.11] // °/tick (50ms)
const PHASE      = [0, 45, 90]        // initial angle stagger

export default function OrbitalFeatureMap() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale]       = useState(1)
  const [angles, setAngles]     = useState<number[]>(PHASE)
  const [paused, setPaused]     = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [dotCount, setDotCount] = useState(1)

  /* Responsive scale */
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setScale(Math.min(1, w / 760))
    })
    if (wrapRef.current) obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  /* Orbital rotation */
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setAngles(prev => prev.map((a, i) => (a + SPEEDS[i]) % 360))
    }, 50)
    return () => clearInterval(id)
  }, [paused])

  /* Center dot animation 1→2→3→1 */
  useEffect(() => {
    const id = setInterval(() => {
      setDotCount(prev => prev === 3 ? 1 : prev + 1)
    }, 640)
    return () => clearInterval(id)
  }, [])

  const getPos = (orbit: 0|1|2, posInOrbit: 0|1|2) => {
    const base  = posInOrbit * 120
    const deg   = (base + angles[orbit]) % 360
    const rad   = (deg * Math.PI) / 180
    const r     = BASE_RADII[orbit] * scale
    const x     = r * Math.cos(rad)
    const y     = r * Math.sin(rad)
    const depth = (Math.sin(rad) + 1) / 2   // 0=top 1=bottom
    const sz    = 0.72 + 0.28 * depth        // depth scale for 3D feel
    return { x, y, depth, sz }
  }

  const handleBg   = () => { setActiveId(null); setPaused(false) }
  const handleNode = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeId === id) { setActiveId(null); setPaused(false) }
    else                  { setActiveId(id);  setPaused(true)  }
  }

  const NODE_D     = 46
  const containerH = Math.max(380, (BASE_RADII[2] * scale + NODE_D / 2 + 96) * 2)

  return (
    <div
      ref={wrapRef}
      onClick={handleBg}
      style={{
        position:  'relative',
        width:     '100%',
        height:    containerH,
        cursor:    'default',
        backgroundColor: T.white,
        backgroundImage: [
          `linear-gradient(${T.grid} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${T.grid} 1px, transparent 1px)`,
        ].join(', '),
        backgroundSize: '32px 32px',
      }}
    >
      {/* ── SVG arc rings (partial circles via stroke-dasharray) ── */}
      <svg
        aria-hidden
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
      >
        {BASE_RADII.map((r, i) => {
          const scaled  = r * scale
          const circ    = 2 * Math.PI * scaled
          const visible = circ * 0.76          // 76% arc visible
          const offset  = -(circ * 0.14)       // rotate gap to lower-right
          return (
            <circle
              key={i}
              cx="50%"
              cy="50%"
              r={scaled}
              fill="none"
              stroke={`rgba(15,17,23,${0.11 - i * 0.02})`}
              strokeWidth={i === 1 ? 1.0 : 0.75}
              strokeDasharray={`${visible} ${circ - visible}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          )
        })}
      </svg>

      {/* ── Ambient center glow ── */}
      <div style={{
        position:     'absolute',
        top: '50%',   left: '50%',
        width:        180,
        height:       180,
        transform:    'translate(-50%, -50%)',
        borderRadius: '50%',
        background:   `radial-gradient(circle, rgba(95,168,158,0.08) 0%, transparent 68%)`,
        pointerEvents: 'none',
      }} />

      {/* ── Center: AI dot indicator ── */}
      <div style={{
        position:       'absolute',
        top: '50%',     left: '50%',
        transform:      'translate(-50%, -50%)',
        width:          52,
        height:         52,
        borderRadius:   '50%',
        background:     T.dark,
        border:         '1px solid rgba(95,168,158,0.22)',
        boxShadow:      `0 0 24px rgba(95,168,158,0.14), 0 2px 14px rgba(0,0,0,0.45)`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            5,
        zIndex:         100,
      }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            width:        5,
            height:       5,
            borderRadius: '50%',
            background:   T.accent,
            opacity:      n <= dotCount ? 1 : 0.16,
            boxShadow:    n <= dotCount ? `0 0 7px ${T.accent}` : 'none',
            transition:   'opacity 0.22s ease, box-shadow 0.22s ease',
          }} />
        ))}
      </div>

      {/* ── Feature nodes ── */}
      {FEATURES.map(f => {
        const pos      = getPos(f.orbit, f.posInOrbit)
        const isActive = activeId === f.id
        const dimmed   = paused && !isActive

        const opacity    = isActive ? 1 : dimmed ? 0.11 : 0.30 + 0.70 * pos.depth
        const blurFilter = dimmed ? 'blur(1.8px)' : 'none'

        /* Card: avoid edge clipping */
        const CARD_W  = 248
        let cardLeft  = -(CARD_W / 2) + NODE_D / 2
        if (pos.x >  BASE_RADII[f.orbit] * scale * 0.52) cardLeft = -(CARD_W - NODE_D * 0.55)
        if (pos.x < -(BASE_RADII[f.orbit] * scale * 0.52)) cardLeft = NODE_D * 0.45
        const cardAbove = pos.y > 20

        /* Pill: outward from center */
        const pillSide = pos.x >= 0
          ? { left: Math.round(NODE_D * pos.sz * 0.52) + 10 }
          : { right: Math.round(NODE_D * pos.sz * 0.52) + 10 }

        const pulseDelay = `${(f.id - 1) * 0.28}s`

        return (
          <div
            key={f.id}
            onClick={e => handleNode(f.id, e)}
            style={{
              position:   'absolute',
              top: '50%', left: '50%',
              transform:  `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              zIndex:     isActive ? 200 : Math.round(8 + 28 * pos.depth),
              opacity,
              filter:     blurFilter,
              transition: 'opacity 0.3s ease, filter 0.3s ease',
              cursor:     'pointer',
            }}
          >
            {/* Sonar pulse ring */}
            {!dimmed && !isActive && (
              <div
                className="nh-orbital-ring-pulse"
                style={{
                  position:     'absolute',
                  top:          '50%',
                  left:         '50%',
                  width:        NODE_D + 20,
                  height:       NODE_D + 20,
                  marginTop:    -((NODE_D + 20) / 2),
                  marginLeft:   -((NODE_D + 20) / 2),
                  borderRadius: '50%',
                  border:       `1.5px solid ${T.accent}`,
                  pointerEvents: 'none',
                  animationDelay: pulseDelay,
                }}
              />
            )}

            {/* Dark sphere node */}
            <div style={{
              width:        NODE_D,
              height:       NODE_D,
              borderRadius: '50%',
              background:   `radial-gradient(circle at 35% 28%, rgba(95,168,158,0.65) 0%, rgba(95,168,158,0.18) 42%, ${T.nodeBg} 70%)`,
              boxShadow:    isActive
                ? `0 0 0 1px rgba(95,168,158,0.45), 0 0 32px ${T.accentGlow}, 0 6px 28px rgba(0,0,0,0.6)`
                : `0 0 0 1px rgba(95,168,158,0.22), 0 0 14px rgba(95,168,158,0.3), 0 4px 18px rgba(0,0,0,0.5)`,
              transform:    `scale(${isActive ? pos.sz * 1.18 : pos.sz})`,
              transition:   'transform 0.24s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.24s ease',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              position:     'relative',
              overflow:     'hidden',
            }}>
              {/* Interior micro-particles */}
              {PARTICLES.map((p, pi) => (
                <div
                  key={pi}
                  className="nh-particle"
                  style={{
                    position:     'absolute',
                    left:         `${p.x}%`,
                    top:          `${p.y}%`,
                    marginLeft:   -(p.s / 2),
                    marginTop:    -(p.s / 2),
                    width:        p.s,
                    height:       p.s,
                    borderRadius: '50%',
                    background:   isActive ? T.accent : 'rgba(255,255,255,0.85)',
                    boxShadow:    `0 0 ${p.s * 2}px ${isActive ? T.accent : 'rgba(255,255,255,0.5)'}`,
                    animationDelay: `${p.d}s`,
                  }}
                />
              ))}

              {/* Icon */}
              <div style={{ color: 'rgba(255,255,255,0.88)', position: 'relative', zIndex: 2, display: 'flex' }}>
                {f.icon}
              </div>
            </div>

            {/* Floating pill label */}
            {!isActive && (
              <div style={{
                position:             'absolute',
                top:                  '50%',
                transform:            'translateY(-50%)',
                ...pillSide,
                display:              'flex',
                alignItems:           'center',
                gap:                  5,
                padding:              '4px 10px 4px 7px',
                background:           T.pill,
                backdropFilter:       'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border:               '1px solid rgba(255,255,255,0.08)',
                borderRadius:         20,
                whiteSpace:           'nowrap',
                pointerEvents:        'none',
                zIndex:               10,
              }}>
                <div
                  className="nh-orbital-dot-pulse"
                  style={{
                    width:        6,
                    height:       6,
                    borderRadius: '50%',
                    background:   T.accent,
                    flexShrink:   0,
                    boxShadow:    `0 0 5px ${T.accent}`,
                    animationDelay: pulseDelay,
                  }}
                />
                <span style={{
                  fontSize:      10.5,
                  fontWeight:    500,
                  color:         'rgba(255,255,255,0.88)',
                  letterSpacing: '-0.01em',
                  fontFamily:    'inherit',
                }}>
                  {f.title}
                </span>
              </div>
            )}

            {/* ── Info card ── */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.88, y: cardAbove ? 8 : -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.90, y: cardAbove ? 6 : -6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    position:        'absolute',
                    [cardAbove ? 'bottom' : 'top']: NODE_D + 18,
                    left:            cardLeft,
                    width:           CARD_W,
                    background:      T.white,
                    border:          '1px solid rgba(0,0,0,0.07)',
                    borderRadius:    16,
                    padding:         '16px 16px 14px',
                    boxShadow:       '0 16px 52px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
                    zIndex:          400,
                    cursor:          'default',
                    transformOrigin: cardAbove ? 'bottom center' : 'top center',
                  }}
                >
                  {/* Connector pip */}
                  <div style={{
                    position:     'absolute',
                    [cardAbove ? 'bottom' : 'top']: -4,
                    left:         CARD_W / 2 - 4 - cardLeft + NODE_D / 2,
                    width:        8,
                    height:       8,
                    borderRadius: '50%',
                    background:   T.accent,
                    boxShadow:    `0 0 0 2px rgba(95,168,158,0.22)`,
                  }} />

                  {/* Tier badge */}
                  <div style={{
                    display:       'inline-flex',
                    alignItems:    'center',
                    padding:       '2px 8px',
                    borderRadius:  20,
                    background:    'rgba(95,168,158,0.1)',
                    border:        '1px solid rgba(95,168,158,0.22)',
                    fontSize:      9,
                    fontWeight:    700,
                    color:         T.accent,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom:  9,
                    fontFamily:    'inherit',
                  }}>
                    {f.orbit === 0 ? 'Core' : f.orbit === 1 ? 'Growth' : 'Power'}
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 700, color: T.dark, letterSpacing: '-0.04em', lineHeight: 1.25, marginBottom: 3 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.accent, letterSpacing: '-0.01em', marginBottom: 9 }}>
                    {f.subtitle}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.65, letterSpacing: '-0.01em', marginBottom: 11 }}>
                    {f.description}
                  </div>

                  <div style={{
                    paddingTop:    9,
                    marginBottom:  11,
                    borderTop:     '1px solid rgba(0,0,0,0.07)',
                    fontSize:      9,
                    fontWeight:    600,
                    color:         '#9ca3af',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {f.plan}
                  </div>

                  <a
                    href="https://app.nexthireconsulting.com"
                    onClick={e => e.stopPropagation()}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            5,
                      padding:        '8px 14px',
                      borderRadius:   9,
                      background:     T.dark,
                      color:          T.white,
                      fontSize:       11,
                      fontWeight:     600,
                      textDecoration: 'none',
                      letterSpacing:  '-0.01em',
                      cursor:         'pointer',
                      transition:     'opacity 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.80')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Get started
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5h7M6 2.5L9 5.5 6 8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
