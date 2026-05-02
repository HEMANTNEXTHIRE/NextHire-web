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

export function MagicText({ text, fontSize = '50px' }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.22'],
  })

  // Split on \n first, then words within each line
  type Token = { type: 'word'; word: string } | { type: 'break' }
  const tokens: Token[] = []
  text.split('\n').forEach((line, li) => {
    if (li > 0) tokens.push({ type: 'break' })
    line.split(' ').filter(Boolean).forEach(w => tokens.push({ type: 'word', word: w }))
  })
  const wordCount = tokens.filter(t => t.type === 'word').length
  let wordIdx = 0

  return (
    <p
      ref={container}
      style={{
        display:       'block',
        textAlign:     'center',
        lineHeight:    1.3,
        padding:       0,
        margin:        0,
        fontSize,
        fontFamily:    "'Graphik Web', 'Noto Sans', system-ui, sans-serif",
        fontWeight:    700,
        letterSpacing: '-1.8px',
      }}
    >
      {tokens.map((token, i) => {
        if (token.type === 'break') {
          return <br key={`br-${i}`} />
        }
        const idx   = wordIdx++
        const start = idx / wordCount
        const end   = start + 1 / wordCount
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {token.word}
          </Word>
        )
      })}
    </p>
  )
}
