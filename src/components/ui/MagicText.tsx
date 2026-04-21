'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span style={{
      position:    'relative',
      marginTop:   '10px',
      marginRight: '0.28em',
      display:     'inline-block',
    }}>
      <span style={{ position: 'absolute', opacity: 0.15, userSelect: 'none' }}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

interface MagicTextProps {
  text: string
  fontSize?: string
}

export function MagicText({ text, fontSize = 'clamp(26px, 3.6vw, 48px)' }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.22'],
  })
  const words = text.split(' ')

  return (
    <p
      ref={container}
      style={{
        display:         'flex',
        flexWrap:        'wrap',
        justifyContent:  'center',
        lineHeight:      1.35,
        padding:         0,
        margin:          0,
        fontSize,
        fontWeight:      500,
        letterSpacing:   '-0.03em',
        textWrap:        'balance' as React.CSSProperties['textWrap'],
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end   = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}
