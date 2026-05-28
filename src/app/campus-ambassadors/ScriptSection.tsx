'use client'

import { useState } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

const DARK_TEXT = '#1a3338'
const BODY_TEXT = '#3d5a56'
const SAGE_BORDER = '#c8dfd6'
const ACCENT_GREEN = '#2e7d4f'
const DARK_PANEL = '#132128'
const MUTED = '#8aada8'

const POSTER_SRC = '/images/campus-ambassador-poster.jpeg'

const SCRIPT_TEXT = `Quick thing for everyone sitting in placement season at [College Name].

If you have interviews coming up on Google Meet or Zoom, you need to know about NextHire.

It's an AI copilot that quietly runs in the background of your call, listens to the question, and shows you exactly what to say in seconds. Built by IIT alumni who've been in recruitment for 6+ years.

And it's not just interview help:

→ Auto applies to jobs on Naukri, LinkedIn and Indeed
→ Builds ATS optimised resumes tailored to each JD
→ Sends AI personalised cold emails to recruiters
→ Tons of free tools too. No excuse not to try it.

🎓 Student only deal for our campus:
→ ₹1,000 off on Monthly Pro
→ ₹3,000 off on 3 Month Pro

Use code COLLEGE1000 at checkout.
🔗 app.nexthireconsulting.com

Want to see it work live before deciding?
DM me "DEMO" and I'll show you exactly how it looks during a real interview round.`

const SECTION_TITLE: React.CSSProperties = {
  fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: DARK_TEXT,
  margin: '0 0 12px', letterSpacing: '-0.5px',
}

const SECTION_SUB: React.CSSProperties = {
  fontSize: FONT.base, color: BODY_TEXT, margin: 0, maxWidth: 680,
}

const BTN_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '12px 20px',
  borderRadius: 9999,
  fontSize: 14,
  fontWeight: WEIGHT.bold,
  textDecoration: 'none',
  letterSpacing: '-0.2px',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

const BTN_PRIMARY: React.CSSProperties = {
  ...BTN_BASE,
  background: DARK_PANEL,
  color: '#ffffff',
}

const BTN_SECONDARY: React.CSSProperties = {
  ...BTN_BASE,
  background: '#ffffff',
  color: DARK_PANEL,
  border: `1.5px solid ${DARK_PANEL}`,
}

export default function ScriptSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SCRIPT_TEXT)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked; silently ignore */
    }
  }

  return (
    <section style={{ background: '#f7faf9', padding: 'clamp(48px, 6vw, 72px) 0', borderTop: `1px solid ${SAGE_BORDER}` }}>
      <style>{`
        .ca-share-body {
          display: grid;
          grid-template-columns: 1fr;
          align-items: stretch;
        }
        @media (min-width: 900px) {
          .ca-share-body { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
        }
        .ca-share-poster-cell {
          background: #edf5f1;
          padding: 20px;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid ${SAGE_BORDER};
        }
        @media (min-width: 900px) {
          .ca-share-poster-cell {
            border-bottom: none;
            border-right: 1px solid ${SAGE_BORDER};
          }
        }
        .ca-script-body {
          max-height: 460px;
          overflow-y: auto;
          padding: 18px 22px;
          font-size: 14px;
          color: ${DARK_PANEL};
          line-height: 1.65;
          white-space: pre-wrap;
          font-family: 'Inter', system-ui, sans-serif;
          scrollbar-width: thin;
        }
        .ca-script-body::-webkit-scrollbar { width: 6px; }
        .ca-script-body::-webkit-scrollbar-thumb { background: ${SAGE_BORDER}; border-radius: 3px; }
      `}</style>

      <div className="nh-container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 28px' }}>
          <h2 style={SECTION_TITLE}>A poster and a script you can share.</h2>
          <p style={{ ...SECTION_SUB, margin: '0 auto' }}>
            Download the poster, copy the script, and drop both into your campus WhatsApp or Telegram groups.
          </p>
        </div>

        {/* Unified share card */}
        <div style={{
          background: '#ffffff',
          border: `1px solid ${SAGE_BORDER}`,
          borderRadius: 20,
          boxShadow: '0 8px 28px rgba(37,62,66,0.06)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Body: poster on left, script on right */}
          <div className="ca-share-body">
            <div className="ca-share-poster-cell">
              <img
                src={POSTER_SRC}
                alt="NextHire campus student poster"
                style={{
                  width: '100%',
                  maxHeight: 440,
                  objectFit: 'contain',
                  borderRadius: 12,
                  boxShadow: '0 12px 32px rgba(19,33,40,0.18)',
                  display: 'block',
                }}
              />
            </div>
            <div className="ca-script-body">{SCRIPT_TEXT}</div>
          </div>

          {/* Single footer strip with both actions */}
          <div style={{
            background: '#f3f8f6',
            padding: '14px 20px',
            borderTop: `1px solid ${SAGE_BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <span style={{ fontSize: FONT.xs, color: MUTED, fontWeight: WEIGHT.semi, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              Replace [College Name] with yours
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={POSTER_SRC}
                download="NextHire-Campus-Ambassador-Poster.jpeg"
                style={BTN_SECONDARY}
              >
                <DownloadIcon /> Download poster
              </a>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  ...(copied ? BTN_SECONDARY : BTN_PRIMARY),
                  ...(copied ? { background: '#dcfce7', color: ACCENT_GREEN, border: `1.5px solid ${ACCENT_GREEN}` } : {}),
                }}
              >
                {copied ? (
                  <>
                    <CheckIcon /> Copied
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy script
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v8M3.5 6L7 9.5 10.5 6M2 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 3.5V2.5a1 1 0 011-1H10a1 1 0 011 1v6.5a1 1 0 01-1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7.5L5.5 11l7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
