'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const C = {
  dark:    '#111827',
  subtext: '#6b7280',
  accent:  '#2e7d4f',
  accentD: '#3d7a72',
  green:   '#22c55e',
}

/* ─── Logo definitions ───────────────────────────────────── */
interface IconDef {
  id: number
  name: string
  logo: string
  top?: string; bottom?: string; left?: string; right?: string
}

const ICONS: IconDef[] = [
  { id: 1,  name: 'Greenhouse',      logo: '/logos/integrations/greenhouse.png',       top: '8%',     left: '8%'   },
  { id: 2,  name: 'Lever',           logo: '/logos/integrations/lever.png',            top: '5%',     right: '9%'  },
  { id: 3,  name: 'Ashby',           logo: '/logos/integrations/ashby.png',            top: '28%',    left: '16%'  },
  { id: 4,  name: 'Workable',        logo: '/logos/integrations/workable.png',         top: '32%',    right: '18%' },
  { id: 5,  name: 'Workday',         logo: '/logos/integrations/workday.png',          top: '56%',    left: '9%'   },
  { id: 6,  name: 'Bullhorn',        logo: '/logos/integrations/bullhorn.png',         top: '52%',    right: '10%' },
  { id: 7,  name: 'SmartRecruiters', logo: '/logos/integrations/smartrecruiters.png',  bottom: '14%', left: '16%'  },
  { id: 9,  name: 'HiBob',           logo: '/logos/integrations/hibob.png',            bottom: '5%',  left: '7%'   },
  { id: 10, name: 'HubSpot',         logo: '/logos/integrations/hubspot.png',          bottom: '4%',  right: '7%'  },
  { id: 11, name: 'Recruit CRM',     logo: '/logos/integrations/recruitcrm.png',       top: '6%',     left: '27%'  },
  { id: 12, name: 'Zoho Recruit',    logo: '/logos/integrations/zoho.png',             top: '4%',     right: '27%' },
  { id: 13, name: 'Gmail',           logo: '/logos/integrations/gmail.png',            bottom: '5%',  left: '26%'  },
  { id: 14, name: 'Outlook',         logo: '/logos/integrations/outlook.webp',         bottom: '7%',  right: '28%' },
  { id: 15, name: 'Slack',           logo: '/logos/integrations/slack.png',            top: '3%',     left: '46%'  },
]

/* ─── Single floating icon ───────────────────────────────── */
function FloatingIcon({
  icon, mouseX, mouseY, index,
}: {
  icon: IconDef
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  index: number
}) {
  const ref        = useRef<HTMLDivElement>(null)
  const [imgFailed, setImgFailed] = useState(false)
  const mx   = useMotionValue(0)
  const my   = useMotionValue(0)
  const smx  = useSpring(mx, { stiffness: 180, damping: 18 })
  const smy  = useSpring(my, { stiffness: 180, damping: 18 })

  useEffect(() => {
    const onMove = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      const dist = Math.sqrt((mouseX.current - cx) ** 2 + (mouseY.current - cy) ** 2)
      if (dist < 260) {
        const angle = Math.atan2(mouseY.current - cy, mouseX.current - cx)
        const force = (1 - dist / 260) * 120
        mx.set(-Math.cos(angle) * force)
        my.set(-Math.sin(angle) * force)
      } else {
        mx.set(0)
        my.set(0)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, mouseX, mouseY])

  const { top, bottom, left, right } = icon
  const posStyle: React.CSSProperties = {
    position: 'absolute',
    ...(top    && { top }),
    ...(bottom && { bottom }),
    ...(left   && { left }),
    ...(right  && { right }),
  }

  const floatDur = 4.2 + (index % 6) * 0.65

  return (
    <motion.div
      ref={ref}
      style={{ ...posStyle, x: smx, y: smy, zIndex: 2 }}
      initial={{ opacity: 0, scale: 0.55 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={{
          width:              68,
          height:             68,
          borderRadius:       18,
          background:         'rgba(255,255,255,0.88)',
          backdropFilter:     'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:             '1px solid rgba(200,223,214,0.55)',
          boxShadow:          '0 8px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
          display:            'flex',
          alignItems:         'center',
          justifyContent:     'center',
          padding:            14,
        }}
        animate={{ y: [0, -7, 0, 7, 0], x: [0, 5, 0, -5, 0], rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' }}
      >
        {imgFailed ? (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${C.accent}18`, color: C.accentD,
            fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {icon.name[0]}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon.logo}
            alt={icon.name}
            width={36}
            height={36}
            style={{ width: 36, height: 36, objectFit: 'contain' }}
            onError={() => setImgFailed(true)}
          />
        )}
      </motion.div>

      {/* Name label under card */}
      <div style={{
        textAlign:    'center',
        fontSize:     10,
        fontWeight:   600,
        color:        '#6b7280',
        marginTop:    5,
        letterSpacing: '-0.01em',
        whiteSpace:   'nowrap',
        maxWidth:     80,
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {icon.name}
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export function FloatingIntegrations() {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  return (
    <section
      id="companies-integrations"
      onMouseMove={(e) => { mouseX.current = e.clientX; mouseY.current = e.clientY }}
      style={{
        position:       'relative',
        overflow:       'hidden',
        minHeight:      'max(700px, 78vh)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'linear-gradient(168deg, #f6fbf9 0%, #ffffff 42%, #f3faf7 100%)',
        padding:        '48px clamp(20px, 5vw, 40px)',
      }}
    >
      {/* Aurora depth orbs */}
      <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(95,168,158,0.13) 0%, transparent 68%)', top: '-12%', right: '-8%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,122,114,0.08) 0%, transparent 65%)', bottom: '-18%', left: '-6%', pointerEvents: 'none' }} />

      {/* Floating logo cards */}
      {ICONS.map((icon, i) => (
        <FloatingIcon key={icon.id} icon={icon} mouseX={mouseX} mouseY={mouseY} index={i} />
      ))}

      {/* Center content */}
      <div style={{
        position:       'relative',
        zIndex:         10,
        textAlign:      'center',
        maxWidth:       500,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            20,
      }}>
        {/* Heading — bold sans-serif matching reference */}
        <h2 style={{
          fontFamily:    'inherit',
          fontSize:      'clamp(38px, 5.5vw, 68px)',
          fontWeight:    700,
          color:         C.dark,
          margin:        0,
          letterSpacing: '-0.04em',
          lineHeight:    1.1,
        }}>
          Works with your existing stack.
        </h2>

        {/* Sub-description */}
        <p style={{ fontSize: 17, color: C.subtext, margin: 0, maxWidth: 400, lineHeight: 1.65 }}>
          Shortlists, transcripts, and scores sync directly with no need for manual data entry.
        </p>
      </div>
    </section>
  )
}
