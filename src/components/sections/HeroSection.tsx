'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { WEIGHT } from '@/constants/typography'
import { MagicText } from '@/components/ui/MagicText'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Recommendation {
  productKey: string
  displayName: string
  route: string
  requiresLogin: boolean
}

// All endpoints derive from the single configured chat URL so prod/dev stay consistent.
//   NEXT_PUBLIC_CHAT_API_URL = https://app.nexthireconsulting.com/api/chat (prod, set in deploy.yml)
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat'
const API_BASE = CHAT_API_URL.replace(/\/chat\/?$/, '')          // -> https://app.nexthireconsulting.com/api  (or /api in dev)
const APP_ORIGIN = (() => { try { return new URL(CHAT_API_URL).origin } catch { return '' } })()
// In prod the app SPA and the API share an origin (app.nexthireconsulting.com), so the chat
// URL's origin is also the app origin. Locally they're split (API :8081, app :3000), so allow
// an explicit override via NEXT_PUBLIC_APP_URL.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || APP_ORIGIN
const RECOMMENDATION_URL = `${API_BASE}/chat/recommendation`
const HANDOFF_URL = `${API_BASE}/chat/handoff`
const START_URL = `${APP_URL}/start`

function newTraceId(): string {
  return `mkt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function HeroChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const traceIdRef = useRef<string>('')
  if (!traceIdRef.current) traceIdRef.current = newTraceId()
  const assistantTurnsRef = useRef(0)
  const stuckInjectedRef = useRef(false)

  useEffect(() => {
    const el = chatScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, recommendation])

  // Ask the backend whether the conversation now points to a specific product.
  const fetchRecommendation = useCallback(async (msgs: ChatMessage[]) => {
    try {
      const res = await fetch(RECOMMENDATION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs.map(m => ({ role: m.role, content: m.content })), traceId: traceIdRef.current }),
      })
      if (!res.ok) return null
      const data = await res.json()
      if (data?.productKey) {
        const rec: Recommendation = { productKey: data.productKey, displayName: data.displayName, route: data.route, requiresLogin: !!data.requiresLogin }
        setRecommendation(rec)
        return rec
      }
      return null
    } catch { /* recommendation is best-effort; never block the chat */ return null }
  }, [])
  

  // Open the handoff in a NEW tab, leaving the current marketing tab untouched. The blank tab
  // is opened synchronously inside the click gesture (so popup blockers don't eat it); we point
  // it at the /start URL once the async handoff token returns.
  const openInNewTab = useCallback(async () => {
    const trace = traceIdRef.current
    const tab = window.open('', '_blank')
    const goto = (url: string) => { if (tab) tab.location.href = url; else window.open(url, '_blank') }
    try {
      const res = await fetch(HANDOFF_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          productKey: recommendation?.productKey || null,
          traceId: trace,
        }),
      })
      if (res.ok) {
        const { token } = await res.json()
        goto(`${START_URL}?h=${encodeURIComponent(token)}&trace=${encodeURIComponent(trace)}`)
        return
      }
    } catch { /* fall through to a token-less handoff */ }
    // Graceful fallback: still land the user in the app (fresh chat) even if the store failed.
    goto(`${START_URL}?trace=${encodeURIComponent(trace)}`)
  }, [messages, recommendation])

  const linkEl = (label: string, key: string) => (
    <a
      key={key}
      href={START_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { e.preventDefault(); openInNewTab() }}
      style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
    >
      {label}
    </a>
  )

  // Render assistant text as an inline blue/underlined link wherever it references NextHire —
  // both a markdown "[NextHire](…)" link AND a bare "NextHire" mention (the model isn't
  // consistent about which it emits). Clicking opens the recommended feature in a new tab.
  const renderRich = (content: string) => {
    const out: React.ReactNode[] = []
    content.split(/(\[[^\]]+\]\([^)]*\))/).forEach((seg, i) => {
      const md = seg.match(/^\[([^\]]+)\]\(([^)]*)\)$/)
      if (md) { out.push(linkEl(md[1], `md-${i}`)); return }
      seg.split(/(NextHire)/gi).forEach((p, j) => {
        if (/^nexthire$/i.test(p)) out.push(linkEl(p, `t-${i}-${j}`))
        else if (p) out.push(<span key={`s-${i}-${j}`}>{p}</span>)
      })
    })
    return out
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setRecommendation(null) // re-evaluate after this turn

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    try {
      const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat'
      const res = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) throw new Error('Chat request failed')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      const assistantId = (Date.now() + 1).toString()
      let fullText = ''

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      if (reader) {
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          // Parse SSE data chunks from the AI SDK stream
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            // AI SDK v3 data stream format: lines starting with "0:" contain text
            if (line.startsWith('0:')) {
              try {
                const text = JSON.parse(line.slice(2))
                fullText += text
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: m.content + text } : m)
                )
              } catch { /* skip non-text chunks */ }
            }
          }
        }
        // Process any remaining buffer
        if (buffer.startsWith('0:')) {
          try {
            const text = JSON.parse(buffer.slice(2))
            fullText += text
            setMessages(prev =>
              prev.map(m => m.id === assistantId ? { ...m, content: m.content + text } : m)
            )
          } catch { /* skip */ }
        }
      }

      // Turn complete — see if the conversation now points to a specific product.
      const rec = await fetchRecommendation([...updatedMessages, { id: assistantId, role: 'assistant', content: fullText }])
      assistantTurnsRef.current += 1

      // Stuck path: after ~3 turns with no recommendation, drop an inline line that links to
      // NextHire so the user can continue in the app even when the advisor hasn't matched a tool.
      if (!rec && assistantTurnsRef.current >= 3 && !stuckInjectedRef.current) {
        stuckInjectedRef.current = true
        setMessages(prev => [...prev, {
          id: `stuck-${Date.now()}`,
          role: 'assistant',
          content: "I might not have found the perfect match yet — let's continue this in NextHire and figure it out together.",
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again or head over to [NextHire](https://app.nexthireconsulting.com) directly!",
      }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, fetchRecommendation])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
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

  const hasMessages = messages.length > 0

  return (
    <div style={{
      width: '100%',
      maxWidth: '620px',
      background: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb',
      boxSizing: 'border-box',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s ease',
    }}>
      {/* Chat messages area */}
      {hasMessages && (
        <div ref={chatScrollRef} style={{
          maxHeight: '280px',
          overflowY: 'auto',
          padding: '16px 20px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? '#132128' : '#edf5f1',
                color: msg.role === 'user' ? '#ffffff' : '#132128',
                fontSize: '14px',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {msg.role === 'assistant' ? renderRich(msg.content) : msg.content}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '16px 16px 16px 4px',
                background: '#edf5f1',
                fontSize: '14px',
                color: '#9ca3af',
              }}>
                Typing...
              </div>
            </div>
          )}

          <div />
        </div>
      )}

      {/* Input area */}
      <div style={{
        position: 'relative',
        padding: hasMessages ? '8px 20px 16px' : '20px 64px 20px 20px',
        borderTop: hasMessages ? '1px solid #f0f0f0' : 'none',
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaInput}
          onKeyDown={handleKeyDown}
          placeholder={hasMessages ? 'Type your reply...' : 'Tell us your biggest job search struggle...'}
          rows={hasMessages ? 1 : 3}
          disabled={isLoading}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#132128',
            display: 'block',
            overflowY: 'hidden',
            minHeight: hasMessages ? '24px' : '72px',
            paddingRight: '48px',
            opacity: isLoading ? 0.6 : 1,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          style={{
            position: 'absolute',
            bottom: hasMessages ? '12px' : '14px',
            right: hasMessages ? '20px' : '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: input.trim() && !isLoading ? '#132128' : '#d1d5db',
            border: 'none',
            cursor: input.trim() && !isLoading ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => { if (input.trim() && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#338632' }}
          onMouseLeave={e => { if (input.trim() && !isLoading) (e.currentTarget as HTMLButtonElement).style.background = '#132128' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 12V4M4 8l4-4 4 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function HeroSection() {
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
            The Unfair Advantage
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
            Every Job Seeker Deserves
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
          Our AI talks to hiring managers on your behalf, uncovers roles never posted online, and coaches you live through every interview
        </p>

        {/* Feature checkmarks — matches reference row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '28px',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '48px', marginTop: '20px',
        }}>
          {[
            'Reach hiring managers directly',
            'Apply to hidden roles automatically',
            'Live coaching during real interviews',
          ].map((item) => (
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

        {/* CTA — Dream Machine input */}
        <div style={{
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

