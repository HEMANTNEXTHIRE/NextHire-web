'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import posthog from 'posthog-js'
import { WEIGHT } from '@/constants/typography'
import { MagicText } from '@/components/ui/MagicText'

const APP_URL = 'https://app.nexthireconsulting.com'

/* Hero copy. One promise for every stage (no calls yet, or calls but wanting a better
   offer), then the four steps so each visitor sees where NextHire helps them.
   Three versions under review; HERO_VERSION picks the one on the page. */
const HERO_COPY = {
  A: {
    eyebrow: 'For every stage of your job search',
    line1: 'Get more interviews.',
    line2: 'Land a better offer.',
    sub: 'You choose the jobs. NextHire applies for you, messages HR on Gmail and LinkedIn, and helps you live in the interview.',
  },
  B: {
    eyebrow: "Job hunting is hard. It doesn't have to be slow.",
    line1: 'We do the applying.',
    line2: 'You do the interviews.',
    sub: 'NextHire applies to jobs for you, messages hiring managers on Gmail and LinkedIn, and helps you live in every interview.',
  },
  C: {
    eyebrow: 'One app for your whole job search',
    line1: 'Get noticed. Get called.',
    line2: 'Get hired.',
    sub: 'From your resume to your offer letter, NextHire handles the hard parts: applying, reaching HR on Gmail and LinkedIn, and helping you live in interviews.',
  },
} as const
const HERO_VERSION: keyof typeof HERO_COPY = 'A'

/* The four stages, each one a NextHire tool: resume and profiles, Auto Apply,
   Outreach and LinkedIn InMail, Interview Coach */
const HERO_STEPS = ['Fix your resume', 'Apply to more jobs', 'Message HR directly', 'Ace the interview']

/* The hero box is the front door to Fin, the one assistant across the site and the app.
   The question travels in the URL hash (never sent to a server, never in analytics); the
   app's /home reads it, clears it and opens Fin with it typed in. */
function askInApp(text: string) {
  posthog.capture('Hero Question Sent')
  window.location.href = `${APP_URL}/home#ask=${encodeURIComponent(text.slice(0, 1000))}`
}

function HeroChatbot() {
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Back from the app with the browser's back button: the page comes from the bfcache with
  // the "sending" state still on, so turn it off again.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) setSending(false) }
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [])

  const send = () => {
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    askInApp(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`
    }
  }

  const canSend = Boolean(input.trim()) && !sending

  return (
    <div style={{ width: '100%', maxWidth: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* One row, like a button: grows only if the question runs long */}
    <div className="nh-ask">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleTextareaInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your job search"
        aria-label="Ask the NextHire Assistant"
        enterKeyHint="send"
        rows={1}
        disabled={sending}
        className="nh-ask__input"
      />
      <button
        type="button"
        onClick={() => send()}
        disabled={!canSend}
        aria-label="Send message"
        className="nh-ask__send"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>

    </div>
  )
}

/* Phone hero: one "Get started" button; the choice between a new account and logging in
   comes up in a bottom sheet, within thumb reach, instead of two buttons side by side. */
function GetStarted() {
  const [state, setState] = useState<'closed' | 'open' | 'closing'>('closed')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstRef = useRef<HTMLAnchorElement>(null)

  const close = useCallback(() => {
    setState((s) => (s === 'open' ? 'closing' : s))
  }, [])

  // Let the slide-down play, then unmount and hand focus back to the trigger
  useEffect(() => {
    if (state !== 'closing') return
    const t = window.setTimeout(() => {
      setState('closed')
      triggerRef.current?.focus()
    }, 220)
    return () => window.clearTimeout(t)
  }, [state])

  // While open: focus the first option, Escape closes, the page behind does not scroll
  useEffect(() => {
    if (state !== 'open') return
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('nh-sheet-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.documentElement.classList.remove('nh-sheet-open')
    }
  }, [state, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="nh-hero-btn nh-hero-btn--primary"
        aria-haspopup="dialog"
        aria-expanded={state === 'open'}
        onClick={() => setState('open')}
      >
        Get started
      </button>

      {state !== 'closed' && createPortal(
        <div className={`nh-sheet${state === 'closing' ? ' is-closing' : ''}`}>
          <div className="nh-sheet__backdrop" onClick={close} />
          <div className="nh-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="nh-sheet-title">
            <span className="nh-sheet__handle" aria-hidden="true" />
            <p id="nh-sheet-title" className="nh-sheet__title">Get started with NextHire</p>
            <a
              ref={firstRef}
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nh-sheet__btn nh-sheet__btn--primary"
              onClick={close}
            >
              Start for free
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nh-sheet__btn nh-sheet__btn--secondary"
              onClick={close}
            >
              Continue with Login
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default function HeroSection() {
  const copy = HERO_COPY[HERO_VERSION]
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = chatRef.current
    const root = document.documentElement
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => {
      root.classList.toggle('nh-hero-chat-visible', entry.isIntersecting)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      root.classList.remove('nh-hero-chat-visible')
    }
  }, [])

  return (
    <>
    <section
      id="home-s1"
      style={{ position: 'relative', overflowX: 'hidden', background: '#ffffff' }}
    >
      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(92px, 12vw, 140px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 100px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Who it's for, above the promise */}
        <div className="nh-hero-eyebrow">{copy.eyebrow}</div>

        {/* ── Headline ── */}
        <div className="nh-hero-headline" style={{
          width: 'fit-content',
          maxWidth: '100%',
          margin: '0 auto 32px',
          paddingBottom: '0.15em',
        }}>
          <h1 style={{
            fontFamily: "'Droid Serif', Georgia, 'Times New Roman', serif",
            margin: 0,
            letterSpacing: '-0.7px',
            fontSynthesis: 'none',
          }}>
          {/* First line */}
          <span className="nh-hero-line" style={{
            display: 'block',
            fontSize: 'clamp(34px, 9vw, 72px)',
            fontWeight: 450,
            fontStyle: 'normal',
            color: '#132128',
            lineHeight: 1.2,
            fontFamily: "'Droid Serif', Georgia, 'Times New Roman', serif",
          }}>
            {copy.line1}
          </span>
          {/* Second line */}
          <span className="nh-hero-line" style={{
            display: 'block',
            fontSize: 'clamp(34px, 9vw, 72px)',
            fontWeight: 450,
            fontStyle: 'normal',
            color: '#338632',
            lineHeight: 1.2,
            fontFamily: "'Droid Serif', Georgia, 'Times New Roman', serif",
          }}>
            {copy.line2}
          </span>
        </h1>
        </div>

        {/* Sub-headline */}
        <p style={{
          color: '#424D53',
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.3px',
          margin: '0 0 10px',
          maxWidth: '560px',
          fontWeight: WEIGHT.normal,
          fontFamily: 'inherit',
        }}>
          {copy.sub}
        </p>

        {/* Feature checkmarks — matches reference row */}
        <div className="nh-hero-points" style={{
          display: 'flex', alignItems: 'center', gap: '28px',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '48px', marginTop: '20px',
        }}>
          {HERO_STEPS.map((item) => (
            <span key={item} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.3px',
              fontWeight: WEIGHT.medium, fontFamily: 'inherit',
            }}>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
                <circle cx="9.5" cy="9.5" r="9.5" fill="#338632" fillOpacity="0.12"/>
                <path d="M5.5 9.8l3 3 5-6" stroke="#338632" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#132128' }}>{item}</span>
            </span>
          ))}
        </div>

        {/* Phones and tablets: sign-up sits right under the promise, where the eye already
            is, instead of in the bar. Desktop keeps both in the header. data-hero-cta tells
            the header to bring its own Start free back once these scroll away. */}
        <div className="nh-hero-actions" data-hero-cta>
          <GetStarted />
          <div className="nh-hero-or" aria-hidden="true">
            <span>or ask NextHire</span>
          </div>
        </div>

        {/* CTA — Dream Machine input */}
        <div ref={chatRef} className="nh-hero-chat" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', marginBottom: '60px',
        }}>
          <HeroChatbot />
        </div>


      </div>

    </section>

    {/* ── Mission statement — scroll-animated magic text ── */}
    <section
      id="home-mission"
      style={{
        background:      '#ffffff',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        paddingTop:      'clamp(18px, 5vmax, 60px)',
        paddingBottom:   'clamp(74px, 12vmax, 130px)',
        paddingLeft:     'clamp(24px, 6vw, 100px)',
        paddingRight:    'clamp(24px, 6vw, 100px)',
        textAlign:       'center',
      }}
    >
      <div style={{ maxWidth: 1300, width: '100%' }}>
        <MagicText text={"Our mission is to make getting a job\nas easy as spending money online,\nseamless, and powered by intelligence."} />
      </div>
    </section>

</>
  )
}

