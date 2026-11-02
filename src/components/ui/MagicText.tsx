'use client'

import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { FONT } from '@/constants/typography'

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  const reduceMotion = useReducedMotion()
  // The faint "unlit" copy is a CSS ::before fed by data-word (see .nh-magic-word), so the
  // DOM holds each word once and screen readers, crawlers and copy-paste get clean text.
  return (
    <span className="nh-magic-word" data-word={children}>
      <motion.span style={{ opacity: reduceMotion ? 1 : opacity }}>{children}</motion.span>
    </span>
  )
}

interface MagicTextProps {
  text: string
  fontSize?: string
}

export function MagicText({ text, fontSize = FONT.sectionClamp }: MagicTextProps) {
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
        lineHeight:    1.2,
        padding:       0,
        margin:        0,
        fontSize,
        fontFamily:    "'Droid Serif', Georgia, 'Times New Roman', serif",
        fontWeight:    400,
        letterSpacing: '-1.2px',
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
          <React.Fragment key={i}>
            <Word progress={scrollYProgress} range={[start, end]}>
              {token.word}
            </Word>{' '}
          </React.Fragment>
        )
      })}
    </p>
  )
}
