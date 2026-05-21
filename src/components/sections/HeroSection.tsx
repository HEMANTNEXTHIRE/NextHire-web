'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { WEIGHT } from '@/constants/typography'
import { MagicText } from '@/components/ui/MagicText'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function HeroChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = chatScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

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
            setMessages(prev =>
              prev.map(m => m.id === assistantId ? { ...m, content: m.content + text } : m)
            )
          } catch { /* skip */ }
        }
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
  }, [input, isLoading, messages])

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
                {msg.content.split(/(\[.*?\]\(.*?\))/).map((part, i) => {
                  const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
                  if (linkMatch) {
                    return (
                      <a
                        key={i}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: msg.role === 'user' ? '#86efac' : '#2e7d4f',
                          fontWeight: 600,
                          textDecoration: 'underline',
                        }}
                      >
                        {linkMatch[1]}
                      </a>
                    )
                  }
                  return <span key={i}>{part}</span>
                })}
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

