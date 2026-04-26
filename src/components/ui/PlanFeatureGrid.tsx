'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type PlanTier = 'max' | 'pro' | 'lite'

interface TileLayout {
  x: number
  y: number
  w: number
  h: number
}

interface Feature {
  id: string
  title: string
  desc: string
}

const GAP = 2

function equalGrid(cols: number, rows: number): TileLayout[] {
  const w = (100 - (cols - 1) * GAP) / cols
  const h = (100 - (rows - 1) * GAP) / rows
  const tiles: TileLayout[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push({ x: c * (w + GAP), y: r * (h + GAP), w, h })
    }
  }
  return tiles
}

function proGrid(): TileLayout[] {
  const cw = (100 - 2 * GAP) / 3
  const ch = (100 - 2 * GAP) / 3
  const step = cw + GAP
  return [
    { x: 0, y: 0, w: cw * 2 + GAP, h: ch },
    { x: step * 2, y: 0, w: cw, h: ch },
    { x: 0, y: ch + GAP, w: cw, h: ch },
    { x: step, y: ch + GAP, w: cw, h: ch },
    { x: step * 2, y: ch + GAP, w: cw, h: ch },
    { x: 0, y: (ch + GAP) * 2, w: cw, h: ch },
    { x: step, y: (ch + GAP) * 2, w: cw * 2 + GAP, h: ch },
  ]
}

const GRIDS: Record<PlanTier, TileLayout[]> = {
  max: equalGrid(3, 3),
  pro: proGrid(),
  lite: equalGrid(2, 3),
}

const ALL_FEATURES: Feature[] = [
  { id: 'f1', title: 'AI Auto Apply', desc: 'AI scans millions of jobs matching your profile and submits tailored applications 24/7, so you wake up to interview requests, not rejections.' },
  { id: 'f2', title: 'Resume Builder', desc: 'AI builds and continuously optimizes your resume for ATS systems, tailoring keywords and formatting to each job description automatically.' },
  { id: 'f3', title: 'Job Tracker', desc: 'Track every application, interview stage, and follow-up in one clean dashboard. Know exactly where you stand with every company.' },
  { id: 'f4', title: 'AI Interview Coach', desc: 'Get real-time AI support during live interviews. It listens to questions as they are asked and helps you respond with relevant answers.' },
  { id: 'f5', title: 'Recruiter InMail', desc: 'Message hiring managers directly with personalized outreach and improve your chances of getting noticed.' },
  { id: 'f6', title: 'Job Portal Optimization', desc: 'Optimize your profiles on LinkedIn, Indeed, Naukri, and other job platforms to get seen by more recruiters.' },
  { id: 'f7', title: 'AI Outreach Agent', desc: 'Our AI finds companies that are hiring and sends personalized emails from your email, helping you reach hiring teams directly.' },
  { id: 'f8', title: 'AI Interviewer', desc: 'Practice with AI interview rounds and get feedback on your answers, so you know what to improve before the real thing.' },
  { id: 'f9', title: 'Career Page Jobs', desc: 'We bring openings directly from company career pages and ATS systems, giving you access to many more roles.' },
]

const PLAN_FEATURES: Record<PlanTier, Feature[]> = {
  max: ALL_FEATURES,
  pro: [ALL_FEATURES[0], ALL_FEATURES[1], ALL_FEATURES[2], ALL_FEATURES[3], ALL_FEATURES[4], ALL_FEATURES[5], ALL_FEATURES[8]],
  lite: [ALL_FEATURES[0], ALL_FEATURES[1], ALL_FEATURES[2], ALL_FEATURES[4], ALL_FEATURES[5], ALL_FEATURES[8]],
}

const IMAGES: Record<PlanTier, string> = {
  max: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  pro: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  lite: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
}

const MENU: { key: PlanTier; num: string; line1: string; line2: string }[] = [
  { key: 'max', num: '01', line1: 'Max', line2: 'Plan' },
  { key: 'pro', num: '02', line1: 'Pro', line2: 'Plan' },
  { key: 'lite', num: '03', line1: 'Lite', line2: 'Plan' },
]

export function PlanFeatureGrid() {
  const [plan, setPlan] = useState<PlanTier>('max')
  const [expanded, setExpanded] = useState<string | null>(null)

  const tiles = GRIDS[plan]
  const features = PLAN_FEATURES[plan]
  const image = IMAGES[plan]

  return (
    <div className="nh-plan-mosaic">
      {/* LEFT — plan menu */}
      <nav className="nh-plan-mosaic__menu">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 10vw, 100px)' }}>
          {MENU.map(p => (
            <li
              key={p.key}
              onMouseEnter={() => { setPlan(p.key); setExpanded(null) }}
              onClick={() => { setPlan(p.key); setExpanded(null) }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px, 1.5vw, 16px)' }}>
                <span style={{
                  fontSize: 'clamp(16px, 2vw, 26px)',
                  fontWeight: 700,
                  color: plan === p.key ? '#2e7d4f' : '#9ca3af',
                  transition: 'color 0.4s ease',
                  marginTop: 'clamp(2px, 0.4vw, 6px)',
                }}>
                  {p.num}
                </span>
                <h3 style={{
                  margin: 0,
                  fontSize: 'clamp(28px, 4.5vw, 52px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  transition: 'all 0.5s ease',
                  color: plan === p.key ? '#111827' : 'transparent',
                  WebkitTextStroke: plan === p.key ? '0' : '1.5px #d1d5db',
                  transform: plan === p.key ? 'translateX(8px)' : 'translateX(0)',
                  opacity: plan === p.key ? 1 : 0.45,
                }}>
                  {p.line1}<br />{p.line2}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT — image mosaic */}
      <div className="nh-plan-mosaic__grid" style={{ position: 'relative' }}>
        <div style={{ width: '100%', aspectRatio: '1 / 1', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={plan}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {tiles.map((tile, i) => {
                const feat = features[i]
                if (!feat) return null
                return (
                  <motion.div
                    key={feat.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setExpanded(feat.id)}
                    style={{
                      position: 'absolute',
                      left: `${tile.x}%`,
                      top: `${tile.y}%`,
                      width: `${tile.w}%`,
                      height: `${tile.h}%`,
                      overflow: 'hidden',
                      borderRadius: 'clamp(6px, 1.2vw, 12px)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                    whileHover={{ scale: 1.04, zIndex: 2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Image slice — sized to full container, offset so tiles form one image */}
                    <div style={{
                      position: 'absolute',
                      left: `${-(tile.x / tile.w) * 100}%`,
                      top: `${-(tile.y / tile.h) * 100}%`,
                      width: `${(100 / tile.w) * 100}%`,
                      height: `${(100 / tile.h) * 100}%`,
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    {/* Gradient + title */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 'clamp(8px, 1.4vw, 16px)',
                    }}>
                      <span style={{
                        fontSize: 'clamp(10px, 1.15vw, 14px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.25,
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                      }}>
                        {feat.title}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Zoom overlay */}
          <AnimatePresence>
            {expanded && (() => {
              const f = ALL_FEATURES.find(feat => feat.id === expanded)
              if (!f) return null
              return (
                <motion.div
                  key="zoom-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpanded(null)}
                  style={{
                    position: 'absolute',
                    inset: -16,
                    background: 'rgba(0,0,0,0.35)',
                    borderRadius: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                      background: '#ffffff',
                      borderRadius: 20,
                      padding: 'clamp(24px, 3vw, 36px)',
                      width: '82%',
                      maxWidth: 400,
                      boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
                      cursor: 'default',
                      position: 'relative',
                    }}
                  >
                    <button
                      onClick={() => setExpanded(null)}
                      aria-label="Close"
                      style={{
                        position: 'absolute', top: 14, right: 16,
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 22, color: '#9ca3af', fontFamily: 'inherit', lineHeight: 1,
                      }}
                    >&times;</button>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 10px', letterSpacing: '-0.4px', lineHeight: 1.25 }}>
                      {f.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
                      {f.desc}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
