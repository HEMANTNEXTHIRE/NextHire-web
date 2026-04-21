'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'motion/react'
import { Zap, FileText, ListChecks, Mic2, Mail, Search, SendHorizonal, Video, Building2, Layers, Grid3X3 } from 'lucide-react'
import OrbitalFeatureMap from '@/components/ui/OrbitalFeatureMap'

/* ─── Types ──────────────────────────────────────────────── */
type ViewMode   = 'stack' | 'grid' | 'orbital'
type PlanFilter = 'lite'  | 'pro'  | 'max'

interface CardData {
  id: string
  title: string
  subtitle: string
  description: string
  icon: ReactNode
  accentColor: string
  plans: PlanFilter[]   // which plans include this feature
}

/* ─── Tokens ─────────────────────────────────────────────── */
const C = {
  accent:  '#2e7d4f',
  accentM: '#3d7a72',
  accentL: '#5fa89e',
  dark:    '#111827',
  mid:     '#374151',
  muted:   '#6b7280',
  border:  '#e5e7eb',
  white:   '#ffffff',
}

/* ─── Feature cards — exact content as OrbitalFeatureMap ─── */
const ALL_CARDS: CardData[] = [
  {
    id: '1', plans: ['lite', 'pro', 'max'],
    title: 'AI Auto Apply',
    subtitle: 'Apply while you sleep',
    description: 'AI scans millions of jobs matching your profile and submits tailored applications 24/7, so you wake up to interview requests, not rejections.',
    icon: <Zap size={18} />, accentColor: C.accent,
  },
  {
    id: '2', plans: ['lite', 'pro', 'max'],
    title: 'Resume Builder',
    subtitle: 'A resume that gets read',
    description: 'AI builds and continuously optimizes your resume for ATS systems, tailoring keywords and formatting to each job description automatically.',
    icon: <FileText size={18} />, accentColor: C.accentM,
  },
  {
    id: '3', plans: ['lite', 'pro', 'max'],
    title: 'Job Tracker',
    subtitle: 'Never lose track',
    description: 'Track every application, interview stage, and follow-up in one clean dashboard. Know exactly where you stand with every company.',
    icon: <ListChecks size={18} />, accentColor: C.accentL,
  },
  {
    id: '4', plans: ['pro', 'max'],
    title: 'AI Interview Coach',
    subtitle: 'Ace every interview',
    description: 'Get real-time AI support during live interviews. It listens to questions as they are asked and helps you respond with relevant answers.',
    icon: <Mic2 size={18} />, accentColor: C.accent,
  },
  {
    id: '5', plans: ['lite', 'pro', 'max'],
    title: 'Recruiter InMail',
    subtitle: 'Skip the queue',
    description: 'Message hiring managers directly with personalized outreach and improve your chances of getting noticed.',
    icon: <Mail size={18} />, accentColor: C.accentM,
  },
  {
    id: '6', plans: ['lite', 'pro', 'max'],
    title: 'Job Portal Optimization',
    subtitle: 'Stand Out on Job Portals',
    description: 'Optimize your profiles on LinkedIn, Indeed, Naukri, and other job platforms to get seen by more recruiters and improve your chances of getting the right opportunities.',
    icon: <Search size={18} />, accentColor: C.accentL,
  },
  {
    id: '7', plans: ['max'],
    title: 'AI Outreach Agent',
    subtitle: "Don't wait to be found",
    description: 'Our AI finds companies that are hiring and sends personalized emails from your email, helping you reach hiring teams directly and get noticed earlier.',
    icon: <SendHorizonal size={18} />, accentColor: C.accent,
  },
  {
    id: '8', plans: ['max'],
    title: 'AI Interviewer',
    subtitle: 'Practice until perfect',
    description: 'Practice with AI interview rounds and get feedback on your answers, so you know what to improve.',
    icon: <Video size={18} />, accentColor: C.accentM,
  },
  {
    id: '9', plans: ['lite', 'pro', 'max'],
    title: 'Career Page Jobs',
    subtitle: 'All Jobs. Not Just Portal Jobs',
    description: 'Most job portals show only a fraction of jobs. We bring openings directly from company career pages and ATS systems, giving you access to many more roles beyond traditional job boards.',
    icon: <Building2 size={18} />, accentColor: C.accentL,
  },
]

const SWIPE_THRESHOLD = 50

/* ─── Plan → orbital node ids mapping ───────────────────── */
const PLAN_IDS: Record<PlanFilter, number[]> = {
  lite: [1, 2, 3, 5, 6, 9],
  pro:  [1, 2, 3, 4, 5, 6, 9],
  max:  [1, 2, 3, 4, 5, 6, 7, 8, 9],
}

/* ─── Orbital SVG icon for view toggle ──────────────────── */
const OrbitalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="1.6" fill="currentColor"/>
    <circle cx="8" cy="8" r="4"   stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
    <circle cx="8" cy="8" r="7"   stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>
)

/* ─── Plan taglines ──────────────────────────────────────── */
const PLAN_TAGLINES: Record<PlanFilter, string> = {
  lite: "You're applying. Algorithms are ghosting you. We fix your profile, beat the ATS, and flood your pipeline automatically.",
  pro:  'Getting to the interview is one skill. Passing it is another. Our AI sits with you in the room.',
  max:  "While others wait for recruiters to find them, you are already in their inbox. Better roles, better offers, faster.",
}

/* ─── Plan pill toggle ───────────────────────────────────── */
const PLANS: { key: PlanFilter; label: string }[] = [
  { key: 'lite', label: 'Lite'  },
  { key: 'pro',  label: 'Pro'   },
  { key: 'max',  label: 'Max'   },
]

function PlanToggle({ active, onChange }: { active: PlanFilter; onChange: (p: PlanFilter) => void }) {
  return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      background:   '#f3f4f6',
      border:       '1px solid #e5e7eb',
      borderRadius: 999,
      padding:      4,
      gap:          2,
    }}>
      {PLANS.map(p => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          style={{
            padding:      '8px 22px',
            borderRadius: 999,
            border:       'none',
            cursor:       'pointer',
            fontSize:     14,
            fontWeight:   active === p.key ? 600 : 400,
            color:        active === p.key ? C.white : C.muted,
            background:   active === p.key ? C.dark  : 'transparent',
            transition:   'all 0.2s ease',
            fontFamily:   'inherit',
            letterSpacing: '-0.01em',
            whiteSpace:   'nowrap',
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

/* ─── View icon toggle ───────────────────────────────────── */
function ViewToggle({ active, onChange }: { active: ViewMode; onChange: (v: ViewMode) => void }) {
  const opts: { key: ViewMode; icon: ReactNode; label: string }[] = [
    { key: 'stack',   icon: <Layers size={16} />,   label: 'Stack'   },
    { key: 'grid',    icon: <Grid3X3 size={16} />,  label: 'Grid'    },
    { key: 'orbital', icon: <OrbitalIcon />,         label: 'Orbital' },
  ]
  return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      background:   '#f3f4f6',
      border:       '1px solid #e5e7eb',
      borderRadius: 999,
      padding:      4,
      gap:          2,
    }}>
      {opts.map(o => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          title={o.label}
          aria-label={o.label}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          36,
            height:         36,
            borderRadius:   999,
            border:         'none',
            cursor:         'pointer',
            background:     active === o.key ? C.dark : 'transparent',
            color:          active === o.key ? C.white : C.muted,
            transition:     'all 0.18s ease',
          }}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}

/* ─── Single feature card ────────────────────────────────── */
function FeatureCard({
  card, view, isTop, isExpanded, stackPos,
  onDragStart, onDragEnd, onClick,
}: {
  card: CardData & { stackPosition: number }
  view: ViewMode
  isTop: boolean
  isExpanded: boolean
  stackPos: number
  onDragStart: () => void
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onClick: () => void
}) {
  const isStack = view === 'stack'
  const headerH = isStack ? 72 : 90

  return (
    <motion.div
      layoutId={card.id}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{
        opacity: 1,
        scale:   isExpanded ? 1.02 : 1,
        rotate:  isStack ? (stackPos - 1) * 1.8 : 0,
        top:     isStack ? stackPos * 10 : 0,
        left:    isStack ? stackPos * 10 : 0,
        zIndex:  isStack ? 9 - stackPos  : 1,
      }}
      exit={{ opacity: 0, scale: 0.85, x: -160 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      drag={isTop && isStack ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.03 }}
      onClick={onClick}
      style={{
        position:     isStack ? 'absolute' : 'relative',
        width:        isStack ? 280 : '100%',
        background:   C.white,
        border:       `1px solid ${isExpanded ? card.accentColor : C.border}`,
        borderRadius: 16,
        cursor:       isTop && isStack ? 'grab' : 'pointer',
        boxShadow:    isExpanded
          ? `0 12px 40px ${card.accentColor}28`
          : stackPos === 0 && isStack
          ? '0 8px 28px rgba(0,0,0,0.10)'
          : '0 2px 8px rgba(0,0,0,0.05)',
        boxSizing:    'border-box',
        outline:      isExpanded ? `2px solid ${card.accentColor}` : 'none',
        outlineOffset: 2,
        display:      'flex',
        flexDirection: 'column',
        overflow:     'hidden',
      } as React.CSSProperties}
    >
      {/* ── Visual header band ── */}
      <div style={{
        height:     headerH,
        background: `linear-gradient(135deg, #0d1a14 0%, ${card.accentColor}70 60%, #0e2318 100%)`,
        position:   'relative',
        overflow:   'hidden',
        flexShrink: 0,
      }}>
        {/* Grid texture overlay */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize:  '20px 20px',
        }} />
        {/* Large ghost icon */}
        <div style={{
          position:  'absolute',
          right:     -8,
          bottom:    -8,
          color:     card.accentColor,
          opacity:   0.18,
          transform: 'scale(4)',
          transformOrigin: 'bottom right',
          pointerEvents: 'none',
        }}>
          {card.icon}
        </div>
        {/* Icon pill bottom-left */}
        <div style={{
          position:       'absolute',
          bottom:         12,
          left:           14,
          display:        'flex',
          alignItems:     'center',
          gap:            7,
          background:     'rgba(255,255,255,0.10)',
          border:         '1px solid rgba(255,255,255,0.15)',
          borderRadius:   999,
          padding:        '5px 10px 5px 8px',
          backdropFilter: 'blur(6px)',
        }}>
          <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>{card.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {card.title}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: isStack ? '11px 14px 13px' : '13px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: card.accentColor, marginBottom: 5, letterSpacing: '0.02em' }}>
          {card.subtitle}
        </div>
        <div style={{
          fontSize: 12, color: C.muted, lineHeight: 1.65,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: isStack ? 2 : 3,
          WebkitBoxOrient: 'vertical' as const,
          flex: 1,
        }}>
          {card.description}
        </div>
        {isTop && isStack && (
          <div style={{ marginTop: 8, textAlign: 'center', fontSize: 10, color: 'rgba(0,0,0,0.22)' }}>
            Swipe to navigate
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export function MorphingCardStack() {
  const [view, setView]         = useState<ViewMode>('grid')
  const [plan, setPlan]         = useState<PlanFilter>('max')
  const [activeIdx, setActiveIdx] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  /* Filter cards by plan */
  const filteredCards = ALL_CARDS.filter(c => c.plans.includes(plan))

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000)
      setActiveIdx(p => (p + 1) % filteredCards.length)
    else if (offset.x > SWIPE_THRESHOLD || swipe > 1000)
      setActiveIdx(p => (p - 1 + filteredCards.length) % filteredCards.length)
    setIsDragging(false)
  }

  /* Stack ordering */
  const getStackOrder = () => {
    const out = []
    for (let i = 0; i < filteredCards.length; i++) {
      const idx = (activeIdx + i) % filteredCards.length
      out.push({ ...filteredCards[idx], stackPosition: i })
    }
    return out.reverse()
  }

  const displayCards = view === 'stack'
    ? getStackOrder()
    : filteredCards.map((c, i) => ({ ...c, stackPosition: i }))

  /* Container layout per view */
  const containerStyle: React.CSSProperties = view === 'stack'
    ? {
        position: 'relative',
        width:    280 + (filteredCards.length - 1) * 10,
        height:   200 + (filteredCards.length - 1) * 10,
        margin:   '0 auto',
      }
    : {
        display:               'grid',
        gridTemplateColumns:   `repeat(${Math.min(filteredCards.length, 3)}, 1fr)`,
        gap:                   16,
      }

  const safeActiveIdx = Math.min(activeIdx, filteredCards.length - 1)

  return (
    <div style={{ width: '100%' }}>
      {/* ── Controls — view toggle on top, plan toggle below ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 36 }}>
        <ViewToggle active={view} onChange={v => { setView(v); setExpandedId(null) }} />
        <PlanToggle active={plan} onChange={p => { setPlan(p); setActiveIdx(0); setExpandedId(null) }} />
        <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={plan}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                margin: 0,
                fontSize: 13,
                color: C.muted,
                maxWidth: 480,
                textAlign: 'center',
                lineHeight: 1.55,
                fontStyle: 'italic',
              }}
            >
              {PLAN_TAGLINES[plan]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Orbital view ── */}
      {view === 'orbital' && (
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <OrbitalFeatureMap activeIds={PLAN_IDS[plan]} />
        </div>
      )}

      {/* ── Stack / Grid views ── */}
      {view !== 'orbital' && (
        <>
          <LayoutGroup>
            <motion.div layout style={containerStyle}>
              <AnimatePresence mode="popLayout">
                {displayCards.map(card => (
                  <FeatureCard
                    key={card.id}
                    card={card}
                    view={view}
                    isTop={view === 'stack' && card.stackPosition === 0}
                    isExpanded={expandedId === card.id}
                    stackPos={card.stackPosition}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      if (isDragging) return
                      setExpandedId(expandedId === card.id ? null : card.id)
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Stack dots */}
          {view === 'stack' && filteredCards.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 28 }}>
              {filteredCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    height: 6, width: i === safeActiveIdx ? 20 : 6,
                    borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
                    background: i === safeActiveIdx ? C.dark : '#d1d5db',
                    transition: 'all 0.22s ease',
                  }}
                  aria-label={`Card ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Feature count badge */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{
              fontSize: 11, fontWeight: 500, color: C.muted,
              background: '#f3f4f6', padding: '4px 12px', borderRadius: 20,
              border: '1px solid #e5e7eb',
            }}>
              {filteredCards.length} features included in {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
