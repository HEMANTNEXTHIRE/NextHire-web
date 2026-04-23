'use client'

import React, { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'motion/react'
import { Layers, Grid3X3 } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────── */
type ViewMode   = 'stack' | 'grid'
type PlanFilter = 'lite'  | 'pro'  | 'max'

interface CardData {
  id: string
  title: string
  description: string
  accentColor: string
  plans: PlanFilter[]
  image?: string
  mediaComponent?: React.ReactNode
}

/* ─── Auto Apply Animation — light bg, vibrant colored pills ── */
const AA_SEARCH = 'Java Developer'
const AA_JOBS_DATA = [
  { company: 'Google',  role: 'Java Developer',   loc: 'Remote',       salary: '$130k', logo: '/images/logos/google.png',  color: '#4285F4', light: '#EBF2FF' },
  { company: 'Amazon',  role: 'Backend Engineer', loc: 'Seattle, WA',  salary: '$145k', logo: '/images/logos/amazon.png',  color: '#f97316', light: '#FFF4EB' },
  { company: 'Stripe',  role: 'Software Engineer',loc: 'New York, NY', salary: '$155k', logo: '/images/logos/stripe.png',  color: '#635BFF', light: '#F0EFFF' },
]

function AutoApplyAnimation() {
  const [loopKey, setLoopKey]   = useState(0)
  const [chars, setChars]       = useState(0)
  const [showJobs, setShowJobs] = useState(false)
  const [applied, setApplied]   = useState<number[]>([])
  const [count, setCount]       = useState(0)

  useEffect(() => {
    setChars(0); setShowJobs(false); setApplied([]); setCount(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    AA_SEARCH.split('').forEach((_, i) => t(() => setChars(i + 1), 700 + i * 120))
    const typed = 700 + AA_SEARCH.length * 120

    t(() => setShowJobs(true),                                typed + 600)
    t(() => { setApplied([0]);       setCount(1) },          typed + 1800)
    t(() => { setApplied([0, 1]);    setCount(2) },          typed + 3100)
    t(() => { setApplied([0, 1, 2]); setCount(3) },          typed + 4400)
    t(() => setLoopKey(k => k + 1),                          typed + 7200)

    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  const isApplied = (i: number) => applied.includes(i)

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#f5f4f2',
      borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      padding: '12px 12px 10px', gap: 8, boxSizing: 'border-box',
      fontFamily: "'Noto Sans', system-ui, sans-serif",
      position: 'relative',
    }}>
      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 14,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      {/* ── Title bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Mac traffic lights */}
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)' }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>AI Auto Apply</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {count > 0 && (
            <span style={{
              background: '#dcfce7', color: '#166534',
              border: '1px solid #bbf7d0',
              fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
              letterSpacing: '-0.01em', transition: 'all 0.3s ease',
            }}>
              {count} Applied ✓
            </span>
          )}
        </div>
      </div>

      {/* ── Search bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: '#ffffff',
        border: '1.5px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        borderRadius: 999, padding: '7px 12px',
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize: 11, color: chars > 0 ? '#111827' : '#9ca3af', letterSpacing: '-0.01em', flex: 1, fontWeight: chars > 0 ? 500 : 400 }}>
          {chars > 0 ? AA_SEARCH.slice(0, chars) : 'Search jobs…'}
          {chars > 0 && chars < AA_SEARCH.length && (
            <span style={{ display: 'inline-block', width: 1.5, height: 11, background: '#111827', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />
          )}
        </span>
        {showJobs && (
          <span style={{ fontSize: 8, color: '#9ca3af', whiteSpace: 'nowrap', fontWeight: 500 }}>127 results</span>
        )}
      </div>

      {/* ── Job cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', zIndex: 1 }}>
        {AA_JOBS_DATA.map((job, i) => (
          <div key={job.company} style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: isApplied(i) ? job.light : '#ffffff',
            border: `1.5px solid ${isApplied(i) ? job.color + '40' : '#e5e7eb'}`,
            borderRadius: 10, padding: '8px 10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            opacity: showJobs ? 1 : 0,
            transform: showJobs ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 0.35s ease ${i * 0.12}s, transform 0.35s ease ${i * 0.12}s, background 0.4s ease, border-color 0.4s ease`,
          }}>
            {/* Logo */}
            <div style={{
              width: 26, height: 26, borderRadius: 7, flexShrink: 0,
              background: '#f9fafb', border: '1px solid #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: 3,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={job.logo} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{job.company}</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: job.color, background: job.light, border: `1px solid ${job.color}30`, padding: '0 5px', borderRadius: 4 }}>{job.salary}</span>
              </div>
              <div style={{ fontSize: 9, color: '#6b7280', marginTop: 1, letterSpacing: '-0.01em' }}>{job.role} · {job.loc}</div>
            </div>
            {/* Apply / Applied */}
            <button style={{
              flexShrink: 0, border: 'none', cursor: 'pointer',
              padding: '4px 10px', borderRadius: 6,
              fontSize: 9, fontWeight: 700, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', fontFamily: 'inherit',
              transition: 'all 0.35s ease',
              background: isApplied(i) ? '#dcfce7' : job.color,
              color: isApplied(i) ? '#16a34a' : '#ffffff',
              boxShadow: isApplied(i) ? '0 0 0 1px #bbf7d0' : `0 1px 4px ${job.color}50`,
            }}>
              {isApplied(i) ? '✓ Applied' : 'Apply →'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── AI Outreach Agent Animation — liquid glass ─────────── */
const OA_QUERY   = 'Looking for senior product manager role in series b funded fintech startup'
const OA_SUBJECT = "Senior PM Role — Let's Connect"
const OA_BODY    = "Hi Sarah, Stripe's fintech growth caught my attention. My Series B PM background aligns well — love to connect for 15 min."
const OA_COMPANIES = [
  { name: 'Stripe', color: '#635BFF', initial: 'S' },
  { name: 'Brex',   color: '#E6473D', initial: 'B' },
  { name: 'Plaid',  color: '#00B8A0', initial: 'P' },
]
const OA_HMS = [
  { name: 'Sarah Chen', initial: 'SC', color: '#635BFF' },
  { name: 'Alex Park',  initial: 'AP', color: '#E6473D' },
  { name: 'Maya Patel', initial: 'MP', color: '#00B8A0' },
]

function OutreachAgentAnimation() {
  const [loopKey, setLoopKey]         = useState(0)
  const [chars, setChars]             = useState(0)
  const [visCompanies, setVisCompanies] = useState(0)
  const [visHMs, setVisHMs]           = useState(0)
  const [showEmail, setShowEmail]     = useState(false)
  const [subChars, setSubChars]       = useState(0)
  const [bodyChars, setBodyChars]     = useState(0)
  const [sendBounce, setSendBounce]   = useState(false)
  const [sent, setSent]               = useState(false)
  const [seen, setSeen]               = useState(false)

  useEffect(() => {
    setChars(0); setVisCompanies(0); setVisHMs(0); setShowEmail(false)
    setSubChars(0); setBodyChars(0); setSendBounce(false); setSent(false); setSeen(false)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    OA_QUERY.split('').forEach((_, i) => t(() => setChars(i + 1), 200 + i * 44))
    const q = 200 + OA_QUERY.length * 44

    OA_COMPANIES.forEach((_, i) => t(() => setVisCompanies(i + 1), q + 280 + i * 140))
    const c = q + 280 + OA_COMPANIES.length * 140

    OA_HMS.forEach((_, i) => t(() => setVisHMs(i + 1), c + 200 + i * 140))
    const h = c + 200 + OA_HMS.length * 140

    t(() => setShowEmail(true), h + 380)
    const eS = h + 560

    OA_SUBJECT.split('').forEach((_, i) => t(() => setSubChars(i + 1), eS + i * 52))
    const s = eS + OA_SUBJECT.length * 52

    OA_BODY.split('').forEach((_, i) => t(() => setBodyChars(i + 1), s + 280 + i * 30))
    const b = s + 280 + OA_BODY.length * 30

    t(() => setSendBounce(true),  b + 380)
    t(() => setSendBounce(false), b + 660)
    t(() => setSent(true),        b + 710)
    t(() => setSeen(true),        b + 1700)
    t(() => setLoopKey(k => k + 1), b + 3800)

    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  const glass: React.CSSProperties = {
    background: 'rgba(255,255,255,0.13)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.25)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 4px 16px rgba(0,0,0,0.18)',
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(155deg, #0d2742 0%, #0e4a6e 40%, #1a7a8a 70%, #0d2742 100%)',
      borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      padding: '11px 12px 10px', gap: 7, boxSizing: 'border-box',
      fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(col => (
            <div key={col} style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
          ))}
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.02em' }}>AI Outreach Agent</span>
        {sent && <span style={{ marginLeft: 'auto', fontSize: 8.5, fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', padding: '2px 7px', borderRadius: 20 }}>Sent ✓</span>}
      </div>

      {/* Search bar */}
      <div style={{ ...glass, borderRadius: 999, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize: 9.5, flex: 1, color: chars > 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)', letterSpacing: '-0.01em', fontWeight: chars > 0 ? 500 : 400 }}>
          {chars > 0 ? OA_QUERY.slice(0, chars) : 'Describe your ideal role...'}
          {chars > 0 && chars < OA_QUERY.length && (
            <span style={{ display: 'inline-block', width: 1.5, height: 9, background: 'rgba(255,255,255,0.75)', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />
          )}
        </span>
        {visCompanies > 0 && <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.42)', whiteSpace: 'nowrap' }}>3 matches</span>}
      </div>

      {/* Company pills */}
      <div style={{ display: 'flex', gap: 5, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        {OA_COMPANIES.map((co, i) => (
          <div key={co.name} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${co.color}55`, borderRadius: 7, padding: '3px 7px 3px 4px',
            opacity: i < visCompanies ? 1 : 0,
            transform: i < visCompanies ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(4px)',
            transition: `opacity 0.28s ease ${i * 0.08}s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s`,
          }}>
            <div style={{ width: 13, height: 13, borderRadius: 3, background: co.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6.5, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{co.initial}</div>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.01em' }}>{co.name}</span>
          </div>
        ))}
      </div>

      {/* HM chips */}
      <div style={{ display: 'flex', gap: 5, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        {OA_HMS.map((hm, i) => (
          <div key={hm.name} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 20, padding: '2px 7px 2px 3px',
            opacity: i < visHMs ? 1 : 0,
            transform: i < visHMs ? 'translateY(0)' : 'translateY(5px)',
            transition: `opacity 0.25s ease ${i * 0.1}s, transform 0.25s ease ${i * 0.1}s`,
          }}>
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: hm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5.5, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{hm.initial}</div>
            <span style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.82)' }}>{hm.name}</span>
          </div>
        ))}
      </div>

      {/* Email compose (glass panel) */}
      <div style={{ ...glass, borderRadius: 10, position: 'relative', zIndex: 1, flexShrink: 0, overflow: 'hidden',
        opacity: showEmail ? 1 : 0, transform: showEmail ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease' }}>
        {/* To */}
        <div style={{ padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.4)', fontWeight: 500, width: 22, flexShrink: 0 }}>To</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5.5, fontWeight: 800, color: '#fff', flexShrink: 0 }}>SC</div>
            <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Sarah Chen</span>
            <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.36)' }}>sarah@stripe.com</span>
          </div>
        </div>
        {/* Subject */}
        <div style={{ padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.4)', fontWeight: 500, width: 22, flexShrink: 0 }}>Sub</span>
          <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
            {OA_SUBJECT.slice(0, subChars)}
            {subChars > 0 && subChars < OA_SUBJECT.length && <span style={{ display: 'inline-block', width: 1.5, height: 9, background: 'rgba(255,255,255,0.7)', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />}
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: '5px 9px', minHeight: 34 }}>
          <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
            {OA_BODY.slice(0, bodyChars)}
            {bodyChars > 0 && bodyChars < OA_BODY.length && <span style={{ display: 'inline-block', width: 1.5, height: 9, background: 'rgba(255,255,255,0.6)', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />}
          </span>
        </div>
        {/* Footer */}
        <div style={{ padding: '4px 9px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 6, padding: '2px 6px' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>resume.pdf</span>
          </div>
          {!sent ? (
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: 20,
              padding: '4px 9px', cursor: 'pointer', fontSize: 8.5, fontWeight: 700,
              color: '#0d2742', fontFamily: 'inherit',
              transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
              transform: sendBounce ? 'scale(1.28)' : 'scale(1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
            }}>
              Send <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
            </button>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 8.5, fontWeight: 700, color: '#4ade80' }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              Sent
            </span>
          )}
        </div>
      </div>

      {/* Recruiter notification overlay */}
      {seen && (
        <div style={{ ...glass, borderRadius: 20, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 7,
          position: 'absolute', bottom: 10, left: 12, right: 12, zIndex: 10,
          animation: 'nh-oa-notification 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0 }}>SC</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.01em' }}>Sarah Chen opened your email</div>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>just now · Stripe</div>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0, animation: 'nh-aa-pulse 1.5s ease-in-out infinite' }} />
        </div>
      )}
    </div>
  )
}

/* ─── Interview Coach Animation — Cluely-style pill → panel ─ */
const IC_WORDS = 'Use the STAR method. Describe the situation, your role, how you aligned the team, and close with a measurable result like "shipped 2 weeks early."'.split(' ')
const IC_ACTIONS = ['Model', 'Audio', 'Follow-up']

const PILL_STYLE: React.CSSProperties = {
  background: 'hsla(252, 10%, 10%, 0.88)',
  boxShadow: '0 0 0 1px rgba(207,226,255,0.2), 0 -0.5px 0 0 rgba(255,255,255,0.55)',
}

function InterviewCoachAnimation() {
  const [loopKey, setLoopKey]     = useState(0)
  const [expanded, setExpanded]   = useState(false)
  const [showQ, setShowQ]         = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [showActs, setShowActs]   = useState(false)

  useEffect(() => {
    setExpanded(false); setShowQ(false); setWordCount(0); setShowActs(false)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => { timers.push(setTimeout(fn, ms)) }

    t(() => setExpanded(true),  1800)
    t(() => setShowQ(true),     3100)
    IC_WORDS.forEach((_, i) => t(() => setWordCount(i + 1), 4300 + i * 460))
    const last = 4300 + IC_WORDS.length * 460
    t(() => setShowActs(true),  last + 350)
    t(() => setLoopKey(k => k + 1), last + 3000)

    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(145deg, #0d1117 0%, #161b2e 50%, #0d1117 100%)',
      borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '14px 12px', gap: 7, boxSizing: 'border-box',
      fontFamily: "'Noto Sans', system-ui, sans-serif",
      position: 'relative',
    }}>
      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 14,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '20px 20px' }} />

      {/* ── Title-bar pill — mac window style ── */}
      <div style={{
        ...PILL_STYLE,
        display: 'flex', alignItems: 'center', gap: 8,
        borderRadius: 999, padding: '6px 14px 6px 10px',
        position: 'relative', zIndex: 2, flexShrink: 0,
      }}>
        {/* Mac traffic lights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.015em', whiteSpace: 'nowrap' }}>
          AI Interview Coach
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'nh-aa-pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontSize: 8, fontWeight: 700, color: '#4ade80', letterSpacing: '0.07em' }}>LIVE</span>
        </div>
      </div>

      {/* ── Expanding panel ── */}
      <div style={{
        width: '100%',
        maxHeight: expanded ? 260 : 0,
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.48s cubic-bezier(0,0,0.2,1), opacity 0.28s ease',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          ...PILL_STYLE,
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 14,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Chat area */}
          <div style={{ padding: '12px 12px 6px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {/* User bubble */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end',
              opacity: showQ ? 1 : 0,
              transform: showQ ? 'translateY(0)' : 'translateY(5px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>
              <div style={{
                background: 'linear-gradient(180deg, #0544a9 0%, #022c70 100%)',
                boxShadow: '0 0 0 0.5px #0c44a1, 0 -1px 0 0 #022c70 inset, 0 0.5px 0 0 #81b6ff inset',
                borderRadius: '10px 10px 2px 10px',
                padding: '5px 9px',
                fontSize: 10, color: '#ffffff', lineHeight: 1.45,
                maxWidth: '85%',
              }}>
                Tell me about leading a cross-functional team under tight deadlines.
              </div>
            </div>

            {/* AI streaming response */}
            <div style={{ fontSize: 10, color: '#edeef2', lineHeight: 1.65, minHeight: 28 }}>
              {IC_WORDS.slice(0, wordCount).join(' ')}
              {wordCount > 0 && wordCount < IC_WORDS.length && (
                <span style={{
                  display: 'inline-block', width: 1.5, height: 10,
                  background: '#edeef2', marginLeft: 2, verticalAlign: 'middle',
                  animation: 'nh-ic-cursor 0.8s step-end infinite',
                }} />
              )}
            </div>
          </div>

          {/* Action chips */}
          <div style={{
            padding: '0 12px 8px',
            display: 'flex', gap: 5, flexWrap: 'wrap',
            opacity: showActs ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}>
            {IC_ACTIONS.map((label) => (
              <button key={label} style={{
                display: 'flex', alignItems: 'center', gap: 3,
                padding: '3px 8px', borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#b2b3ba', fontSize: 9, fontWeight: 500,
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}>{label}</button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ padding: '0 10px 10px' }}>
            <div style={{
              border: '0.5px solid rgba(155,155,155,0.32)',
              boxShadow: '0 -1px 0 0 rgba(255,255,255,0.18)',
              borderRadius: 9, overflow: 'hidden',
            }}>
              <div style={{ padding: '7px 8px 3px', fontSize: 9, color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', gap: 4 }}>
                Ask a follow-up, or
                {['⌘', '↵'].map(k => (
                  <span key={k} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    height: 13, width: 13, borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.12) 100%)',
                    fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.4)',
                  }}>{k}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 8px 7px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  padding: '2px 7px 2px 5px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'hsla(252,10%,10%,0.15)',
                  color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 500,
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                  Smart
                </span>
                <button style={{
                  width: 20, height: 20, borderRadius: '50%', border: 'none',
                  background: 'linear-gradient(180deg, #0544a9 0%, #022c70 100%)',
                  boxShadow: '0 0 0 0.5px #0c44a1',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff',
                }}>
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="currentColor"><path d="M2.5 1.5L10.5 6L2.5 10.5V1.5Z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Resume Builder Animation ──────────────────────────── */
const RB_KWS = ['ATS-optimized', 'Python', 'Cross-functional', 'Agile', 'ML']

function ResumeBuilderAnimation() {
  const [loopKey, setLoopKey] = useState(0)
  const [score, setScore]     = useState(58)
  const [litKws, setLitKws]   = useState(0)
  const [badge, setBadge]     = useState(false)

  useEffect(() => {
    setScore(58); setLitKws(0); setBadge(false)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    for (let i = 0; i <= 36; i++) t(() => setScore(58 + i), 400 + i * 62)
    const se = 400 + 36 * 62

    RB_KWS.forEach((_, i) => t(() => setLitKws(i + 1), se + 200 + i * 300))
    const ke = se + 200 + RB_KWS.length * 300

    t(() => setBadge(true), ke + 200)
    t(() => setLoopKey(k => k + 1), ke + 3200)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{ width: '100%', height: '100%', background: '#fafaf8', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', padding: '11px 12px 10px', gap: 8,
      boxSizing: 'border-box', fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Resume Builder</span>
        </div>
        {badge && <span style={{ fontSize: 8.5, fontWeight: 700, color: '#166534', background: '#dcfce7', border: '1px solid #bbf7d0', padding: '2px 7px', borderRadius: 20 }}>ATS Ready ✓</span>}
      </div>

      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#374151' }}>ATS Match Score</span>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.03em', transition: 'color 0.4s', color: score >= 85 ? '#16a34a' : score >= 70 ? '#d97706' : '#dc2626' }}>{score}%</span>
        </div>
        <div style={{ height: 7, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 999, width: `${score}%`, transition: 'width 0.07s linear, background 0.4s',
            background: score >= 85 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : 'linear-gradient(90deg,#d97706,#fbbf24)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        {RB_KWS.map((kw, i) => (
          <span key={kw} style={{ fontSize: 8.5, fontWeight: 600, padding: '3px 7px', borderRadius: 6, transition: 'all 0.3s ease',
            background: i < litKws ? '#dcfce7' : '#f3f4f6', color: i < litKws ? '#166534' : '#9ca3af',
            border: `1px solid ${i < litKws ? '#bbf7d0' : '#e5e7eb'}` }}>{kw}</span>
        ))}
      </div>

      <div style={{ flex: 1, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10,
        padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: 6,
        position: 'relative', zIndex: 1, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '55%', height: 8, background: '#111827', borderRadius: 4 }} />
        <div style={{ width: '38%', height: 5, background: '#d1d5db', borderRadius: 3 }} />
        {['90%','75%','88%','65%','82%'].map((w, i) => (
          <div key={i} style={{ height: 4, background: '#f3f4f6', borderRadius: 3, width: w }} />
        ))}
        {badge && (
          <div style={{ position: 'absolute', bottom: 9, right: 9, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, padding: '3px 7px' }}>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: '#1d4ed8' }}>Tailored for Google SWE</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Job Tracker Animation ──────────────────────────────── */
const JT_APPS = [
  { company: 'Stripe',  role: 'Product Manager',  color: '#635BFF', light: '#f0efff' },
  { company: 'Notion',  role: 'Senior PM',         color: '#1a1a1a', light: '#f3f4f6' },
  { company: 'Linear',  role: 'Group PM',          color: '#5E6AD2', light: '#eef0ff' },
]
const JT_LABELS  = ['Applied', 'Interview', 'Offer']
const JT_SCOL = [
  { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  { bg: '#fef9c3', text: '#92400e', border: '#fde68a' },
  { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
]

function JobTrackerAnimation() {
  const [loopKey, setLoopKey]   = useState(0)
  const [showCards, setShowCards] = useState(false)
  const [stages, setStages]     = useState([0, 0, 0])

  useEffect(() => {
    setShowCards(false); setStages([0, 0, 0])
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    t(() => setShowCards(true), 400)
    t(() => setStages([0, 0, 1]), 1600)
    t(() => setStages([0, 1, 1]), 2700)
    t(() => setStages([1, 1, 1]), 3600)
    t(() => setStages([2, 1, 1]), 5100)
    t(() => setLoopKey(k => k + 1), 8200)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f7ff', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', padding: '11px 12px 10px', gap: 8,
      boxSizing: 'border-box', fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)',
        backgroundSize: '20px 20px' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Job Tracker</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[
            { label: `${stages.filter(s => s === 0).length} Applied`,    ...JT_SCOL[0] },
            { label: `${stages.filter(s => s === 1).length} Interview`,  ...JT_SCOL[1] },
            { label: `${stages.filter(s => s === 2).length} Offer`,      ...JT_SCOL[2] },
          ].map(({ label, text, bg, border }) => (
            <span key={label} style={{ fontSize: 7.5, fontWeight: 700, color: text, background: bg, border: `1px solid ${border}`, padding: '2px 5px', borderRadius: 20, transition: 'all 0.3s' }}>{label}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, position: 'relative', zIndex: 1, flex: 1 }}>
        {JT_APPS.map((app, i) => {
          const stg = stages[i]
          const sc  = JT_SCOL[stg]
          return (
            <div key={app.company} style={{ display: 'flex', alignItems: 'center', gap: 9,
              background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '9px 10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              opacity: showCards ? 1 : 0, transform: showCards ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 0.35s ease ${i * 0.1}s, transform 0.35s ease ${i * 0.1}s` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: app.light,
                border: `1.5px solid ${app.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 800, color: app.color }}>{app.company[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{app.company}</div>
                <div style={{ fontSize: 8.5, color: '#6b7280', marginTop: 1 }}>{app.role}</div>
              </div>
              <span style={{ fontSize: 8.5, fontWeight: 700, padding: '3px 8px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
                color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, transition: 'all 0.4s ease' }}>
                {JT_LABELS[stg]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Recruiter InMail Animation ─────────────────────────── */
const RIM_MSG = "Hi Mike, I came across Figma's work on collaborative design and I'm impressed. I'd love to discuss the Senior PM role — my B2B SaaS background would be a strong fit."

function RecruiterInMailAnimation() {
  const [loopKey, setLoopKey]   = useState(0)
  const [chars, setChars]       = useState(0)
  const [sent, setSent]         = useState(false)
  const [replies, setReplies]   = useState(0)

  useEffect(() => {
    setChars(0); setSent(false); setReplies(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    RIM_MSG.split('').forEach((_, i) => t(() => setChars(i + 1), 400 + i * 28))
    const end = 400 + RIM_MSG.length * 28

    t(() => setSent(true),    end + 300)
    t(() => setReplies(1),    end + 2200)
    t(() => setReplies(2),    end + 3700)
    t(() => setLoopKey(k => k + 1), end + 5800)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{ width: '100%', height: '100%', background: '#f0f7ff', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', padding: '11px 12px 10px', gap: 8,
      boxSizing: 'border-box', fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Recruiter InMail</span>
        </div>
        {replies > 0 && <span style={{ fontSize: 8.5, fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 7px', borderRadius: 20 }}>{replies} {replies === 1 ? 'Reply' : 'Replies'} ↩</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '7px 10px', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', flexShrink: 0 }}>MK</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Mike Kim</div>
          <div style={{ fontSize: 8, color: '#6b7280' }}>Senior Recruiter · Figma</div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a66c2" strokeWidth="2" strokeLinecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      </div>

      <div style={{ flex: 1, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '9px 10px',
        position: 'relative', zIndex: 1, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <span style={{ fontSize: 9, color: '#374151', lineHeight: 1.65 }}>
          {RIM_MSG.slice(0, chars)}
          {chars > 0 && chars < RIM_MSG.length && <span style={{ display: 'inline-block', width: 1.5, height: 9, background: '#3b82f6', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <span style={{ fontSize: 8, color: '#9ca3af' }}>Personalized by AI · 89% open rate</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: sent ? '#dcfce7' : '#0a66c2', border: 'none', borderRadius: 20, padding: '5px 12px', cursor: 'pointer', fontSize: 9, fontWeight: 700, color: sent ? '#166534' : '#fff', fontFamily: 'inherit', transition: 'all 0.3s ease' }}>
          {sent ? '✓ Sent' : 'Send InMail'}
        </button>
      </div>
    </div>
  )
}

/* ─── Job Portal Optimization Animation ─────────────────── */
const JPO_PLATFORMS = [
  { name: 'LinkedIn', color: '#0a66c2', start: 52, end: 91, badge: 'All-Star'  },
  { name: 'Indeed',   color: '#2164f3', start: 47, end: 84, badge: 'Featured'  },
  { name: 'Naukri',   color: '#ef4444', start: 44, end: 88, badge: 'Verified'  },
]

function JobPortalOptimization() {
  const [loopKey, setLoopKey] = useState(0)
  const [scores, setScores]   = useState(JPO_PLATFORMS.map(p => p.start))
  const [badges, setBadges]   = useState([false, false, false])

  useEffect(() => {
    setScores(JPO_PLATFORMS.map(p => p.start)); setBadges([false, false, false])
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    JPO_PLATFORMS.forEach((p, pi) => {
      const steps = p.end - p.start
      for (let i = 0; i <= steps; i++)
        t(() => setScores(prev => { const n = [...prev]; n[pi] = p.start + i; return n }), 400 + pi * 800 + i * 52)
      t(() => setBadges(prev => { const n = [...prev]; n[pi] = true; return n }), 400 + pi * 800 + steps * 52 + 200)
    })

    const allEnd = 400 + (JPO_PLATFORMS.length - 1) * 800 + Math.max(...JPO_PLATFORMS.map(p => p.end - p.start)) * 52
    t(() => setLoopKey(k => k + 1), allEnd + 3200)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff9f5', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', padding: '11px 12px 10px', gap: 8,
      boxSizing: 'border-box', fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.055) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Job Portal Optimization</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1, flex: 1 }}>
        {JPO_PLATFORMS.map((p, i) => (
          <div key={p.name} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '9px 11px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 7.5, fontWeight: 900, color: '#fff' }}>{p.name[0]}</span>
                </div>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#111827' }}>{p.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: p.color, letterSpacing: '-0.03em' }}>{scores[i]}%</span>
                {badges[i] && <span style={{ fontSize: 7.5, fontWeight: 700, color: '#166534', background: '#dcfce7', border: '1px solid #bbf7d0', padding: '1px 5px', borderRadius: 20 }}>{p.badge}</span>}
              </div>
            </div>
            <div style={{ height: 5, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 999, width: `${scores[i]}%`, transition: 'width 0.06s linear', background: `linear-gradient(90deg,${p.color},${p.color}bb)` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── AI Interviewer Animation — orb + transcript + report ── */
const AIV_TRANSCRIPT = 'I led our Q3 payment feature launch — coordinated 4 cross-functional teams over 8 weeks. When scope crept we cut non-core features early and shipped on time. Revenue grew 18% in 30 days.'
const AIV_REPORT = [
  { label: 'Communication', val: 8.5 },
  { label: 'Clarity',       val: 9.0 },
  { label: 'Technical',     val: 8.2 },
  { label: 'Confidence',    val: 8.8 },
]

function AIInterviewerAnimation() {
  const [loopKey, setLoopKey]     = useState(0)
  const [phase, setPhase]         = useState<'listen' | 'transcribe' | 'report'>('listen')
  const [tChars, setTChars]       = useState(0)
  const [visReport, setVisReport] = useState(0)

  useEffect(() => {
    setPhase('listen'); setTChars(0); setVisReport(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    t(() => setPhase('transcribe'), 1100)
    AIV_TRANSCRIPT.split('').forEach((_, i) => t(() => setTChars(i + 1), 1300 + i * 34))
    const te = 1300 + AIV_TRANSCRIPT.length * 34

    t(() => setPhase('report'), te + 500)
    AIV_REPORT.forEach((_, i) => t(() => setVisReport(i + 1), te + 800 + i * 280))
    const re = te + 800 + AIV_REPORT.length * 280

    t(() => setLoopKey(k => k + 1), re + 3200)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  const isReport = phase === 'report'

  return (
    <div style={{ width: '100%', height: '100%', background: '#fdf8f5', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '12px 12px 11px', gap: 8, boxSizing: 'border-box',
      fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>

      {/* Subtle warm dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(236,72,153,0.06) 1px, transparent 1px)',
        backgroundSize: '20px 20px' }} />

      {/* ── Animated petal orb ── */}
      <div style={{ position: 'relative', width: 58, height: 52, flexShrink: 0, zIndex: 1, animation: 'nh-aiv-glow 2.4s ease-in-out infinite' }}>
        {/* back petals */}
        <div style={{ position: 'absolute', top: 6, left: 4, width: 20, height: 34, borderRadius: '50%',
          background: 'linear-gradient(155deg,#fecdd3,#fb7185)',
          transform: 'rotate(-28deg)', opacity: 0.55,
          animation: 'nh-aiv-petal2 2.6s ease-in-out infinite alternate-reverse' }} />
        <div style={{ position: 'absolute', top: 6, right: 4, width: 20, height: 34, borderRadius: '50%',
          background: 'linear-gradient(155deg,#fce7f3,#f472b6)',
          transform: 'rotate(28deg)', opacity: 0.5,
          animation: 'nh-aiv-petal2 2.6s ease-in-out infinite alternate' }} />
        {/* front petals */}
        <div style={{ position: 'absolute', top: 1, left: 7, width: 22, height: 38, borderRadius: '50%',
          background: 'linear-gradient(150deg,#fda4af,#f43f5e)',
          transform: 'rotate(-20deg)', opacity: 0.92,
          animation: 'nh-aiv-petal1 2s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', top: 1, right: 7, width: 22, height: 38, borderRadius: '50%',
          background: 'linear-gradient(150deg,#f9a8d4,#ec4899)',
          transform: 'rotate(20deg)', opacity: 0.88,
          animation: 'nh-aiv-petal1 2s ease-in-out infinite alternate-reverse' }} />
        {/* centre highlight */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />
      </div>

      {/* ── Status badge ── */}
      <div style={{ flexShrink: 0, zIndex: 1 }}>
        {isReport ? (
          <span style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', fontSize: 8.5, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
            Report Ready ✓
          </span>
        ) : phase === 'transcribe' ? (
          <span style={{ background: '#fce7f3', border: '1px solid #f9a8d4', color: '#be185d', fontSize: 8.5, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
            Transcribing...
          </span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fce7f3', border: '1px solid #f9a8d4', color: '#be185d', fontSize: 8.5, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ec4899', animation: 'nh-aa-pulse 1s ease-in-out infinite' }} />
            Listening
          </span>
        )}
      </div>

      {/* ── Control bar ── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, zIndex: 1 }}>
        {/* menu dots */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#6b7280' }} />)}
        </div>
        {/* mic */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </div>
        {/* camera — active pink */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(236,72,153,0.4)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M23 7 16 12 23 17z"/><rect width="15" height="14" x="1" y="5" rx="2"/>
          </svg>
        </div>
        {/* speaker */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </div>
        {/* end call */}
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 3.07 8.63 2 2 0 0 1 5 6.45h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11z"/>
          </svg>
        </div>
      </div>

      {/* ── Transcript / Report card ── */}
      <div style={{ width: '100%', flex: 1, background: '#fff', border: '1.5px solid #f3e8ee', borderRadius: 10,
        padding: '8px 10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', zIndex: 1 }}>

        {!isReport ? (
          <>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#9ca3af', marginBottom: 5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Transcript</div>
            <div style={{ fontSize: 8.5, color: '#374151', lineHeight: 1.7 }}>
              {AIV_TRANSCRIPT.slice(0, tChars)}
              {tChars > 0 && tChars < AIV_TRANSCRIPT.length && (
                <span style={{ display: 'inline-block', width: 1.5, height: 9, background: '#ec4899', marginLeft: 1, verticalAlign: 'middle', animation: 'nh-ic-cursor 0.8s step-end infinite' }} />
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#9ca3af', marginBottom: 5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Interview Report</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 7 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#ec4899', letterSpacing: '-0.04em', lineHeight: 1 }}>8.6</span>
              <span style={{ fontSize: 8, color: '#9ca3af', fontWeight: 500 }}>/ 10 overall score</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {AIV_REPORT.map((r, i) => (
                <div key={r.label} style={{ opacity: i < visReport ? 1 : 0, transform: i < visReport ? 'none' : 'translateY(5px)', transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 7.5, fontWeight: 600, color: '#374151' }}>{r.label}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: '#ec4899' }}>{r.val}</span>
                  </div>
                  <div style={{ height: 3, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 999, width: `${r.val * 10}%`, background: 'linear-gradient(90deg,#f9a8d4,#ec4899)', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Career Page Jobs Animation ─────────────────────────── */
const CP_COS = [
  { name: 'Apple',   jobs: 34,  color: '#1d1d1f', initial: 'A' },
  { name: 'Google',  jobs: 127, color: '#4285F4', initial: 'G' },
  { name: 'Netflix', jobs: 18,  color: '#e50914', initial: 'N' },
  { name: 'Meta',    jobs: 89,  color: '#1877f2', initial: 'f' },
]

function CareerPageAnimation() {
  const [loopKey, setLoopKey]   = useState(0)
  const [visCards, setVisCards] = useState(0)
  const [totalJobs, setTotalJobs] = useState(0)
  const [badge, setBadge]       = useState(false)

  useEffect(() => {
    setVisCards(0); setTotalJobs(0); setBadge(false)
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    CP_COS.forEach((co, i) => t(() => { setVisCards(i + 1); setTotalJobs(prev => prev + co.jobs) }, 400 + i * 480))
    const end = 400 + CP_COS.length * 480

    t(() => setBadge(true), end + 200)
    t(() => setLoopKey(k => k + 1), end + 3600)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', padding: '11px 12px 10px', gap: 8,
      boxSizing: 'border-box', fontFamily: "'Noto Sans', system-ui, sans-serif", position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '18px 18px' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>{['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}</div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Career Page Jobs</span>
        </div>
        {totalJobs > 0 && <span style={{ fontSize: 9, fontWeight: 700, color: '#2e7d4f', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 7px', borderRadius: 20 }}>{totalJobs}+ jobs</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div style={{ height: 1, flex: 1, background: '#e5e7eb' }} />
        <span style={{ fontSize: 8, color: '#9ca3af', whiteSpace: 'nowrap' }}>Direct from company career pages</span>
        <div style={{ height: 1, flex: 1, background: '#e5e7eb' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, position: 'relative', zIndex: 1, flex: 1 }}>
        {CP_COS.map((co, i) => (
          <div key={co.name} style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 10,
            padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 5,
            opacity: i < visCards ? 1 : 0,
            transform: i < visCards ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(6px)',
            transition: `opacity 0.32s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: co.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff', flexShrink: 0 }}>{co.initial}</div>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{co.name}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: co.color, letterSpacing: '-0.02em' }}>{co.jobs} roles</div>
            <div style={{ fontSize: 7.5, color: '#9ca3af' }}>careers.{co.name.toLowerCase()}.com</div>
          </div>
        ))}
      </div>

      {badge && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '5px 9px', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', flexShrink: 0, animation: 'nh-aa-pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontSize: 8.5, fontWeight: 600, color: '#15803d' }}>Syncing 3,200+ career pages daily — before they hit job boards</span>
        </div>
      )}
    </div>
  )
}

/* ─── Tokens ─────────────────────────────────────────────── */
const C = {
  accent:  '#2e7d4f',
  accentM: '#3d7a72',
  accentL: '#5fa89e',
  dark:    '#111827',
  muted:   '#6b7280',
  white:   '#ffffff',
}

/* ─── Feature cards ──────────────────────────────────────── */
const ALL_CARDS: CardData[] = [
  {
    id: '1', plans: ['lite', 'pro', 'max'],
    title: 'AI Auto Apply',
    description: 'AI scans millions of jobs matching your profile and submits tailored applications 24/7, so you wake up to interview requests, not rejections.',
    accentColor: C.accent,
    mediaComponent: <AutoApplyAnimation />,
  },
  {
    id: '2', plans: ['lite', 'pro', 'max'],
    title: 'Resume Builder',
    description: 'AI builds and continuously optimizes your resume for ATS systems, tailoring keywords and formatting to each job description automatically.',
    accentColor: C.accentM,
    mediaComponent: <ResumeBuilderAnimation />,
  },
  {
    id: '3', plans: ['lite', 'pro', 'max'],
    title: 'Job Tracker',
    description: 'Track every application, interview stage, and follow-up in one clean dashboard. Know exactly where you stand with every company.',
    accentColor: C.accentL,
    mediaComponent: <JobTrackerAnimation />,
  },
  {
    id: '4', plans: ['pro', 'max'],
    title: 'AI Interview Coach',
    description: 'Get real-time AI support during live interviews. It listens to questions as they are asked and helps you respond with relevant answers.',
    accentColor: C.accent,
    mediaComponent: <InterviewCoachAnimation />,
  },
  {
    id: '5', plans: ['lite', 'pro', 'max'],
    title: 'Recruiter InMail',
    description: 'Message hiring managers directly with personalized outreach and improve your chances of getting noticed.',
    accentColor: C.accentM,
    mediaComponent: <RecruiterInMailAnimation />,
  },
  {
    id: '6', plans: ['lite', 'pro', 'max'],
    title: 'Job Portal Optimization',
    description: 'Optimize your profiles on LinkedIn, Indeed, Naukri, and other job platforms to get seen by more recruiters and improve your chances of getting the right opportunities.',
    accentColor: C.accentL,
    mediaComponent: <JobPortalOptimization />,
  },
  {
    id: '7', plans: ['max'],
    title: 'AI Outreach Agent',
    description: 'Our AI finds companies that are hiring and sends personalized emails from your email, helping you reach hiring teams directly and get noticed earlier.',
    accentColor: C.accent,
    mediaComponent: <OutreachAgentAnimation />,
  },
  {
    id: '8', plans: ['max'],
    title: 'AI Interviewer',
    description: 'Practice with AI interview rounds and get feedback on your answers, so you know what to improve before the real thing.',
    accentColor: C.accentM,
    mediaComponent: <AIInterviewerAnimation />,
  },
  {
    id: '9', plans: ['lite', 'pro', 'max'],
    title: 'Career Page Jobs',
    description: 'Most job portals show only a fraction of jobs. We bring openings directly from company career pages and ATS systems, giving you access to many more roles.',
    accentColor: C.accentL,
    mediaComponent: <CareerPageAnimation />,
  },
]

const SWIPE_THRESHOLD = 50

/* ─── Plan taglines ──────────────────────────────────────── */
const PLAN_TAGLINES: Record<PlanFilter, string> = {
  lite: "You're applying. Algorithms are ghosting you. We fix your profile, beat the ATS, and flood your pipeline automatically.",
  pro:  'Getting to the interview is one skill. Passing it is another. Our AI sits with you in the room.',
  max:  "Most people wait for recruiters to find them. Max users don't wait.",
}

/* ─── Plan toggle ────────────────────────────────────────── */
const PLANS: { key: PlanFilter; label: string }[] = [
  { key: 'lite', label: 'Lite' },
  { key: 'pro',  label: 'Pro'  },
  { key: 'max',  label: 'Max'  },
]

function PlanToggle({ active, onChange }: { active: PlanFilter; onChange: (p: PlanFilter) => void }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 999, padding: 4, gap: 2 }}>
      {PLANS.map(p => (
        <button key={p.key} onClick={() => onChange(p.key)} style={{
          padding: '8px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: active === p.key ? 600 : 400,
          color: active === p.key ? C.white : C.muted,
          background: active === p.key ? C.dark : 'transparent',
          transition: 'all 0.2s ease', fontFamily: 'inherit',
          letterSpacing: '-0.01em', whiteSpace: 'nowrap',
        }}>
          {p.label}
        </button>
      ))}
    </div>
  )
}

/* ─── View toggle ────────────────────────────────────────── */
function ViewToggle({ active, onChange }: { active: ViewMode; onChange: (v: ViewMode) => void }) {
  const opts: { key: ViewMode; icon: ReactNode; label: string }[] = [
    { key: 'stack', icon: <Layers size={16} />,  label: 'Stack' },
    { key: 'grid',  icon: <Grid3X3 size={16} />, label: 'Grid'  },
  ]
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 999, padding: 4, gap: 2 }}>
      {opts.map(o => (
        <button key={o.key} onClick={() => onChange(o.key)} title={o.label} aria-label={o.label} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: active === o.key ? C.dark : 'transparent',
          color: active === o.key ? C.white : C.muted,
          transition: 'all 0.18s ease',
        }}>
          {o.icon}
        </button>
      ))}
    </div>
  )
}

/* ─── Feature card — matches Luma-style reference ────────── */
function FeatureCard({
  card, view, isTop, stackPos,
  onDragStart, onDragEnd, onClick,
}: {
  card: CardData & { stackPosition: number }
  view: ViewMode
  isTop: boolean
  stackPos: number
  onDragStart: () => void
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onClick: () => void
}) {
  const isStack = view === 'stack'

  return (
    <motion.div
      layoutId={card.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale:   1,
        rotate:  isStack ? (stackPos - 1) * 1.8 : 0,
        top:     isStack ? stackPos * 10 : 0,
        left:    isStack ? stackPos * 10 : 0,
        zIndex:  isStack ? 9 - stackPos : 1,
      }}
      exit={{ opacity: 0, scale: 0.88, x: -120 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      drag={isTop && isStack ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.02 }}
      onClick={onClick}
      className={isStack ? 'nh-feature-card nh-feature-card--stack' : 'nh-feature-card'}
      style={{
        position:      isStack ? 'absolute' : 'relative',
        width:         isStack ? 460 : '100%',
        background:    '#ffffff',
        border:        '1px solid rgba(0,0,0,0.09)',
        borderRadius:  28,
        cursor:        isTop && isStack ? 'grab' : 'default',
        boxShadow:     stackPos === 0 && isStack
          ? '0 12px 48px rgba(0,0,0,0.10)'
          : '0 4px 16px rgba(0,0,0,0.05)',
        boxSizing:     'border-box',
        display:       'flex',
        flexDirection: 'column',
        padding:       30,
        gap:           22,
        overflow:      'hidden',
      } as React.CSSProperties}
    >
      {/* Title + description — typography controlled by .nh-feature-card CSS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>

      {/* Media — animated component, image, or placeholder */}
      <div style={{
        marginTop: 'auto',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 14,
        overflow: 'hidden',
        flexShrink: 0,
        background: card.mediaComponent ? 'transparent' : card.image ? '#f3f4f6' : `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)`,
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        {card.mediaComponent ? (
          card.mediaComponent
        ) : card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 13, color: card.accentColor, fontWeight: 500, opacity: 0.5, letterSpacing: '-0.02em' }}>
              Preview coming soon
            </span>
          </div>
        )}
      </div>

      {isTop && isStack && (
        <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(0,0,0,0.22)', marginTop: -4 }}>
          Swipe to navigate
        </div>
      )}
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export function MorphingCardStack() {
  const [view, setView]           = useState<ViewMode>('grid')
  const [plan, setPlan]           = useState<PlanFilter>('max')
  const [activeIdx, setActiveIdx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile]   = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
      if (mobile) setView('stack')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

  const STACK_W = 460
  const STACK_H = 520

  const containerStyle: React.CSSProperties = view === 'stack'
    ? {
        position: 'relative',
        width:    isMobile ? '100%' : STACK_W + (filteredCards.length - 1) * 10,
        height:   STACK_H + (filteredCards.length - 1) * 10,
        margin:   '0 auto',
      }
    : {
        display:             'grid',
        gridTemplateColumns: `repeat(${Math.min(filteredCards.length, 3)}, 1fr)`,
        gap:                 28,
      }

  const safeActiveIdx = Math.min(activeIdx, filteredCards.length - 1)

  return (
    <div style={{ width: '100%' }}>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        {!isMobile && <ViewToggle active={view} onChange={v => { setView(v) }} />}
        <PlanToggle active={plan} onChange={p => { setPlan(p); setActiveIdx(0) }} />
        <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={plan}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'absolute', margin: 0,
                fontSize: 13, color: C.muted,
                maxWidth: 480, textAlign: 'center',
                lineHeight: 1.55, fontStyle: 'italic',
              }}
            >
              {PLAN_TAGLINES[plan]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Stack / Grid */}
      {(
        <>
          <LayoutGroup>
            <motion.div layout style={containerStyle} className={view === 'grid' ? 'nh-cards-grid' : 'nh-stack-outer'}>
              <AnimatePresence mode="popLayout">
                {displayCards.map(card => (
                  <FeatureCard
                    key={card.id}
                    card={card}
                    view={view}
                    isTop={view === 'stack' && card.stackPosition === 0}
                    stackPos={card.stackPosition}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    onClick={() => { if (!isDragging) {} }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Stack navigation dots */}
          {view === 'stack' && filteredCards.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 32 }}>
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

          {/* Feature count */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <span style={{
              fontSize: 11, fontWeight: 500, color: C.muted,
              background: '#f3f4f6', padding: '4px 12px',
              borderRadius: 20, border: '1px solid #e5e7eb',
            }}>
              {filteredCards.length} features in {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
