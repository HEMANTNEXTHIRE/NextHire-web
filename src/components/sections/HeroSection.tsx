'use client'

import React, { useState, useRef, useCallback } from 'react'
import { WEIGHT, SERIF } from '@/constants/typography'

/* ─── Colour tokens ──────────────────────────────────────── */
const C = {
  bg:      '#edf5f1',
  surface: '#ffffff',
  mint:    '#e4f0eb',
  sage:    '#c8dfd6',
  accent:  '#2e7d4f',
  dark:    '#111827',
  mid:     '#4b5563',
  muted:   '#9ca3af',
  border:  '#d1e8dc',
  logo:    '#9db4af',
}



function DreamInput() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    window.location.href = 'https://app.nexthireconsulting.com'
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '620px',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: focused
          ? '0 0 0 2px #2e7d4f, 0 8px 40px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)',
        padding: '20px 64px 20px 20px',
        transition: 'box-shadow 0.2s ease',
        border: '1px solid #e5e7eb',
        cursor: 'text',
        boxSizing: 'border-box',
      }}
      onClick={() => textareaRef.current?.focus()}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={`Ghosted after applying? No callbacks?\nTell us your biggest job search struggle...`}
        rows={3}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          resize: 'none',
          background: 'transparent',
          fontFamily: 'inherit',
          fontSize: '15px',
          lineHeight: 1.6,
          color: '#111827',
          display: 'block',
          overflowY: 'hidden',
          minHeight: '72px',
        }}
      />
      <button
        onClick={(e) => { e.stopPropagation(); handleSubmit() }}
        aria-label="Submit"
        style={{
          position: 'absolute',
          bottom: '14px',
          right: '14px',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: '#111827',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.15s ease, transform 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2e7d4f' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#111827' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="home-s1"
      style={{ position: 'relative', overflowX: 'hidden', background: '#ffffff' }}
    >
      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(72px, 12vw, 120px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 100px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* ── Headline ── */}
        <div style={{ width: '100%', margin: '0 0 32px', paddingBottom: '0.15em' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            margin: 0,
            letterSpacing: '-0.5px',
            lineHeight: 1.22,
            fontSynthesis: 'none',
          }}>
          {/* First line */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            color: C.dark,
            lineHeight: 1.22,
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}>
            Skip application queues
          </span>
          {/* Second line */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            color: C.accent,
            lineHeight: 1.22,
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}>
            Connect hiring managers instantly
          </span>
        </h1>
        </div>

        {/* Sub-headline — matches reference: centered gray, ~17-18px */}
        <p style={{
          color: '#6b7280',
          fontSize: '17px',
          lineHeight: 1.72,
          margin: '0 0 10px',
          maxWidth: '560px',
          fontWeight: WEIGHT.normal,
          fontFamily: 'inherit',
        }}>
          Escape the apply and pray cycle. AI scans millions of jobs, applies on
          your behalf, and introduces you to hiring managers directly
        </p>

        {/* Feature checkmarks — matches reference row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '28px',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '48px', marginTop: '20px',
        }}>
          {[
            'AI applies to jobs for you',
            'Reach hiring managers directly',
            'Land interviews on autopilot',
          ].map((item) => (
            <span key={item} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontSize: '14px', fontWeight: WEIGHT.medium, color: C.accent,
              fontFamily: 'inherit',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5l3.5 3.5 6.5-7" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#374151' }}>{item}</span>
            </span>
          ))}
        </div>

        {/* CTA — Dream Machine input */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', marginBottom: '60px',
        }}>
          <DreamInput />
        </div>


      </div>

      {/* ── Our Product Differentiation — full-width, outside the 900px container ── */}
      <div style={{
        padding: '0 clamp(20px, 4vw, 60px) clamp(60px, 10vw, 100px)',
        textAlign: 'center',
      }}>

        <h2 style={{
          fontFamily: SERIF,
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 500,
          color: C.dark,
          letterSpacing: '-0.8px',
          lineHeight: 1.15,
          margin: '0 0 40px',
          fontSynthesis: 'none',
        }}>
          Our Product Differentiation
        </h2>

        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#000000',
          aspectRatio: '16 / 9',
          width: '100%',
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', display: 'block' }}
          >
            <source src="/videos/ai-agent-demo.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  )
}

