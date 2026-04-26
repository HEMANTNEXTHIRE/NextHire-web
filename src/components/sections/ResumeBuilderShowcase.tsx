'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'

const FONT = "'Inter', system-ui, sans-serif"

const DOCK_APPS = [
  { name: 'Finder', icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024' },
  { name: 'Safari', icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024' },
  { name: 'Messages', icon: 'https://cdn.jim-nielsen.com/macos/1024/messages-2021-05-25.png?rf=1024' },
  { name: 'Mail', icon: 'https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024' },
  { name: 'Calendar', icon: 'https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024' },
  { name: 'Notes', icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024' },
  { name: 'Photos', icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024' },
  { name: 'Music', icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024' },
  { name: 'Terminal', icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024' },
  { name: 'Calculator', icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024' },
]

/* ═══ Mac Shell ═══ */

function MacMenuBar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, zIndex: 60, background: 'rgba(0,0,0,0.25)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderBottom: '0.5px solid rgba(255,255,255,0.12)', fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="10" height="12" viewBox="0 0 17 20" fill="white" style={{ opacity: 0.9 }}><path d="M15.5 14.8c-.4.9-.6 1.2-1.1 2-.7 1-1.7 2.3-2.9 2.3-1.1 0-1.4-.7-2.9-.7-1.5 0-1.9.7-3 .7-1.2 0-2.1-1.1-2.9-2.2C1.1 14.6.5 11.5 1.5 9.4c.7-1.4 2-2.3 3.3-2.3 1.3 0 2.1.7 3.1.7 1 0 1.7-.7 3.1-.7 1.2 0 2.4.7 3.1 1.8-2.7 1.5-2.3 5.4.4 6.6zM11.3 5c.6-.7 1-1.7.9-2.7-1 .1-2.1.7-2.7 1.5-.6.7-1.1 1.7-.9 2.7 1 0 2.1-.6 2.7-1.5z" /></svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>Finder</span>
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(m => <span key={m} style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{m}</span>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="18" height="8" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="rgba(255,255,255,0.75)" strokeWidth="1" /><rect x="2" y="2" width="12" height="6" rx="1" fill="rgba(255,255,255,0.75)" /><rect x="19.5" y="3" width="2" height="4" rx="0.5" fill="rgba(255,255,255,0.45)" /></svg>
        <svg width="11" height="9" viewBox="0 0 14 11" fill="none"><path d="M7 10.5a1 1 0 100-2 1 1 0 000 2z" fill="rgba(255,255,255,0.85)" /><path d="M4.5 7.5a3.5 3.5 0 015 0" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" /><path d="M2 5a7 7 0 0110 0" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" /><path d="M0 2.5a10.5 10.5 0 0114 0" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" strokeLinecap="round" /></svg>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>Thu 24 Apr &nbsp;4:30 PM</span>
      </div>
    </div>
  )
}

function MacDock() {
  return (
    <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(45,45,45,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '3px 6px' }}>
      {DOCK_APPS.map(app => (
        <img key={app.name} src={app.icon} alt={app.name} title={app.name} width={32} height={32}
          style={{ objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', cursor: 'default' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      ))}
    </div>
  )
}

function BrowserBar({ url, onPointerDown }: { url: string, onPointerDown?: (e: React.PointerEvent) => void }) {
  return (
    <div onPointerDown={onPointerDown} style={{ height: 28, background: 'linear-gradient(180deg, #e8e8e8 0%, #d6d6d6 100%)', display: 'flex', alignItems: 'center', padding: '0 10px', flexShrink: 0, borderBottom: '1px solid rgba(0,0,0,0.12)', cursor: onPointerDown ? 'grab' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)', display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: 18, background: 'rgba(0,0,0,0.06)', borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4, width: '55%', maxWidth: 380 }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          <span style={{ fontSize: 10, color: '#666', letterSpacing: '0.01em' }}>{url}</span>
        </div>
      </div>
      <div style={{ width: 36 }} />
    </div>
  )
}

/* ═══ Scaled Browser Content ═══ */

const INTERNAL_W = 1440

function ScaledBrowserContent({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [innerH, setInnerH] = useState(900)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      const s = width / INTERNAL_W
      setScale(s)
      setInnerH(height / s)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        width: INTERNAL_W,
        height: innerH,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
      }}>
        {children}
      </div>
    </div>
  )
}

/* ═══ Mac Desktop with Draggable Browser ═══ */

function MacDesktop({ browserUrl, children, draggable }: { browserUrl: string, children: React.ReactNode, draggable?: boolean }) {
  const macRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!draggable) return
    const el = e.currentTarget.parentElement!
    const rect = el.getBoundingClientRect()
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top }
    el.setPointerCapture(e.pointerId)
    e.preventDefault()
  }, [draggable])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current || !macRef.current) return
    const mac = macRef.current
    const macW = mac.offsetWidth
    const macH = mac.offsetHeight
    const browserEl = e.currentTarget as HTMLElement
    const bW = browserEl.offsetWidth
    const bH = browserEl.offsetHeight
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    const macRect = mac.getBoundingClientRect()
    const rawX = dragState.current.origX - macRect.left + dx
    const rawY = dragState.current.origY - macRect.top + dy
    setPos({
      x: Math.max(0, Math.min(rawX, macW - bW)),
      y: Math.max(22, Math.min(rawY, macH - bH)),
    })
  }, [])

  const onPointerUp = useCallback(() => {
    dragState.current = null
  }, [])

  const browserStyle: React.CSSProperties = pos
    ? { position: 'absolute', left: pos.x, top: pos.y, width: 'calc(100% - 56px)', height: 'calc(100% - 78px)', zIndex: 1, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)' }
    : { position: 'absolute', top: 50, left: 28, right: 28, bottom: 28, zIndex: 1, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)' }

  return (
    <div ref={macRef} className="nh-rb-showcase__mac" style={{ position: 'relative', isolation: 'isolate', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)', backgroundImage: 'url(/mac-wallpaper.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'default', userSelect: 'none' }}>
      <MacMenuBar />
      <div style={browserStyle} onPointerMove={draggable ? onPointerMove : undefined} onPointerUp={draggable ? onPointerUp : undefined}>
        <BrowserBar url={browserUrl} onPointerDown={draggable ? onPointerDown : undefined} />
        <ScaledBrowserContent>
          {children}
        </ScaledBrowserContent>
      </div>
      <MacDock />
    </div>
  )
}

/* ═══ App Sidebar — exact match to real app at 1440px ═══ */

function AppSidebar({ activeNav, setActiveNav }: { activeNav: string, setActiveNav: (k: string) => void }) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const navItem = (key: string, label: string, icon: React.ReactNode, extra?: React.ReactNode) => (
    <div key={key} onClick={() => { setActiveNav(key); setSettingsOpen(false) }} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', height: 36, borderRadius: 999,
      fontSize: 14, fontWeight: 400, color: '#0A1217', lineHeight: '21px',
      background: activeNav === key ? '#e5e5e5' : 'transparent',
      cursor: 'pointer', transition: 'background 0.15s', fontFamily: FONT,
    }}>
      <span style={{ display: 'flex', flexShrink: 0, width: 14, height: 14 }}>{icon}</span>
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {extra}
    </div>
  )

  const icon = (d: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>

  return (
    <div className="nh-rb-showcase__sidebar" style={{ width: 270, background: '#fff', borderRight: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden', fontFamily: FONT, fontSize: 14, color: '#0A1217' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/nexthire-logo.png" alt="" width={24} height={24} style={{ borderRadius: 4 }} />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0A1217', letterSpacing: '-0.03em' }}>NextHire</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5" /><line x1="9" y1="5" x2="9" y2="19" /></svg>
          </div>
        </div>
      </div>

      <nav style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {navItem('resume', 'Resume Builder', icon('M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'),
          <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 500, marginLeft: 2 }}>Free</span>
        )}
        {navItem('profile', 'Profile', icon('M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'),
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        )}
        {navItem('inmail', 'InMail', icon('M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'))}
        {navItem('tracker', 'Job Tracker', icon('M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z'))}
        {navItem('autoapply', 'AI Auto Apply', icon('M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0'))}
        {navItem('more', 'More', icon('M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'))}

        <div style={{ fontSize: 12, fontWeight: 400, color: '#8F8F8F', padding: '20px 14px 6px' }}>Pro Plan</div>
        {navItem('coach', 'AI Interview Coach', icon('M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'))}

        <div style={{ fontSize: 12, fontWeight: 400, color: '#8F8F8F', padding: '20px 14px 6px' }}>Max Plan</div>
        {navItem('outreach', 'AI Outreach Agent', icon('M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H6.75a.75.75 0 010-1.5h1.5c.704 0 1.402-.03 2.09-.09m0 1.68c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 01-1.021-.27l-.66-1.14a23.915 23.915 0 01-1.554-3.263M10.34 15.84a23.84 23.84 0 004.22-1.394m-4.22 1.394L9.86 18.5m.48-2.66a23.84 23.84 0 004.22-1.394m0 0a25.14 25.14 0 002.12-1.035 1.334 1.334 0 00.15-2.198L12 7.5'))}

        <div style={{ flex: 1 }} />

        {/* Getting Started */}
        <div style={{ margin: '0 0 12px', padding: 16, borderRadius: 16, background: 'rgba(10,18,23,0.02)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 400, color: '#8F8F8F', marginBottom: 8 }}>
            <span>Getting Started</span><span>100%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(10,18,23,0.08)', borderRadius: 999, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ width: '100%', height: '100%', background: '#0A1217', borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, color: '#fff', background: '#000', height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Upgrade</div>
        </div>

        {/* Settings */}
        <div style={{ position: 'relative' }}>
          <div onClick={() => setSettingsOpen(!settingsOpen)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', height: 36, borderRadius: 999,
            fontSize: 14, fontWeight: 400, color: '#0A1217', cursor: 'pointer', transition: 'background 0.15s',
            background: settingsOpen ? '#e5e5e5' : 'transparent',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span style={{ flex: 1 }}>Settings</span>
            <span style={{ color: '#a3a3a3', fontSize: 14 }}>...</span>
          </div>
          {settingsOpen && (
            <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, background: '#fff', borderRadius: 12, border: '1px solid #e5e5e5', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '8px 0', zIndex: 10 }}>
              <div style={{ padding: '6px 14px', fontSize: 13, color: '#6b7280' }}>user@example.com</div>
              <div style={{ padding: '4px 14px', fontSize: 11, color: '#a3a3a3', marginBottom: 4 }}>Free plan</div>
              <div style={{ height: 1, background: '#e5e5e5', margin: '4px 8px' }} />
              {['Upgrade plan', 'Profile settings', 'Settings', 'Sign out'].map(item => (
                <div key={item} style={{ padding: '8px 14px', fontSize: 13, color: '#0A1217', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f5f5f5' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

/* ═══ Resume Template Mini Previews ═══ */

interface TemplateInfo { name: string, category: string, layout: string, bg?: string, accent?: string, headerBg?: string }

const TEMPLATES: TemplateInfo[] = [
  { name: 'Engineer', category: 'professional', layout: 'sidebar', bg: '#1E293B', accent: '#0D9488' },
  { name: 'Classic', category: 'professional', layout: 'clean' },
  { name: 'Creative', category: 'professional', layout: 'sidebar', bg: '#1a5276', accent: '#fff' },
  { name: 'Manager', category: 'professional', layout: 'split', headerBg: '#2a6496' },
  { name: 'Analyst', category: 'professional', layout: 'clean', accent: '#374151' },
  { name: 'Fresher', category: 'student', layout: 'strip', accent: '#2563eb' },
  { name: 'Campus', category: 'student', layout: 'header', headerBg: '#7c3aed' },
  { name: 'Intern', category: 'student', layout: 'sidebar', bg: '#064e3b', accent: '#34d399' },
  { name: 'Corporate', category: 'executive', layout: 'elegant' },
  { name: 'Authority', category: 'executive', layout: 'sidebar', bg: '#1c1917', accent: '#d97706' },
]

interface ResumeData {
  name: string; title: string; email: string; phone: string; location: string
  exp: { company: string; role: string; date: string; bullets: string[] }[]
  edu: { school: string; degree: string; date: string }[]
  skills: string[]
}

const RESUME_DATA: ResumeData[] = [
  { name: 'Alex Carter', title: 'Senior Software Engineer', email: 'alex.carter@email.com', phone: '(415) 555-0132', location: 'San Francisco, CA',
    exp: [
      { company: 'Stripe', role: 'Senior Software Engineer', date: 'Jan 2022 – Present', bullets: ['Led migration of payment processing pipeline to event-driven architecture, reducing latency by 40%', 'Built real-time fraud detection system processing 50K+ transactions per second', 'Mentored 4 junior engineers and led technical design reviews for the payments team'] },
      { company: 'Dropbox', role: 'Software Engineer', date: 'Jun 2019 – Dec 2021', bullets: ['Developed file sync optimization reducing bandwidth usage by 25% across 700M+ users', 'Implemented end-to-end encryption for enterprise file sharing features'] },
    ],
    edu: [{ school: 'Stanford University', degree: 'B.S. Computer Science', date: '2015 – 2019' }],
    skills: ['TypeScript', 'Go', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis', 'gRPC'] },
  { name: 'Jordan Mitchell', title: 'Product Manager', email: 'jordan.m@email.com', phone: '(212) 555-0198', location: 'New York, NY',
    exp: [
      { company: 'Notion', role: 'Senior Product Manager', date: 'Mar 2021 – Present', bullets: ['Drove 35% increase in enterprise adoption by launching team spaces and advanced permissions', 'Led cross-functional team of 12 engineers and 3 designers for workspace collaboration features', 'Defined product roadmap and KPIs for Q3/Q4, achieving 120% of OKR targets'] },
      { company: 'Asana', role: 'Product Manager', date: 'Aug 2018 – Feb 2021', bullets: ['Launched workflow automation builder, contributing $8M ARR in first year', 'Conducted 200+ customer interviews to identify pain points in project management workflows'] },
    ],
    edu: [{ school: 'Columbia University', degree: 'MBA, Technology Management', date: '2016 – 2018' }],
    skills: ['Product Strategy', 'A/B Testing', 'SQL', 'Figma', 'Jira', 'User Research', 'Data Analysis'] },
  { name: 'Maya Reyes', title: 'UX Design Lead', email: 'maya.reyes@email.com', phone: '(323) 555-0147', location: 'Los Angeles, CA',
    exp: [
      { company: 'Figma', role: 'Senior UX Designer', date: 'Apr 2021 – Present', bullets: ['Redesigned the component library system, improving designer productivity by 30%', 'Led design system adoption across 15 product teams with comprehensive documentation', 'Conducted usability testing with 500+ participants for new prototyping features'] },
      { company: 'InVision', role: 'UX Designer', date: 'Jan 2019 – Mar 2021', bullets: ['Designed collaborative whiteboard feature used by 200K+ teams monthly', 'Created design tokens system reducing handoff inconsistencies by 60%'] },
    ],
    edu: [{ school: 'ArtCenter College of Design', degree: 'BFA Interaction Design', date: '2015 – 2019' }],
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'CSS', 'Motion Design'] },
  { name: 'Ryan Torres', title: 'Operations Manager', email: 'ryan.torres@email.com', phone: '(512) 555-0163', location: 'Austin, TX',
    exp: [
      { company: 'Tesla', role: 'Operations Manager', date: 'Jun 2020 – Present', bullets: ['Managed supply chain operations for Gigafactory, overseeing $200M+ annual procurement', 'Reduced production downtime by 22% through predictive maintenance implementation', 'Led cross-functional team of 45 across manufacturing, logistics, and quality assurance'] },
      { company: 'Amazon', role: 'Area Manager', date: 'Jul 2017 – May 2020', bullets: ['Directed fulfillment operations for 150+ associates across two shift rotations', 'Improved order processing efficiency by 18% through workflow optimization'] },
    ],
    edu: [{ school: 'University of Texas at Austin', degree: 'B.S. Industrial Engineering', date: '2013 – 2017' }],
    skills: ['Supply Chain', 'Lean Six Sigma', 'SAP', 'Project Management', 'Tableau', 'Process Optimization'] },
  { name: 'Sarah Chen', title: 'Data Analyst', email: 'sarah.chen@email.com', phone: '(206) 555-0189', location: 'Seattle, WA',
    exp: [
      { company: 'Microsoft', role: 'Senior Data Analyst', date: 'Feb 2021 – Present', bullets: ['Built automated reporting dashboards serving 500+ stakeholders across Azure division', 'Developed predictive churn model achieving 89% accuracy, saving $12M in annual revenue', 'Led data governance initiative standardizing metrics definitions across 8 product teams'] },
      { company: 'Tableau', role: 'Data Analyst', date: 'Sep 2018 – Jan 2021', bullets: ['Analyzed user engagement patterns across 2M+ active accounts to inform product decisions', 'Created executive-facing KPI dashboards reducing reporting time by 70%'] },
    ],
    edu: [{ school: 'University of Washington', degree: 'M.S. Statistics', date: '2016 – 2018' }],
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'R', 'Statistical Modeling', 'ETL', 'Snowflake'] },
  { name: 'David Kim', title: 'Software Developer', email: 'david.kim@email.com', phone: '(408) 555-0156', location: 'San Jose, CA',
    exp: [
      { company: 'Google', role: 'Software Engineering Intern', date: 'May 2024 – Aug 2024', bullets: ['Developed automated testing framework for Google Maps API reducing QA time by 35%', 'Implemented caching layer for geocoding service handling 10K+ requests per minute'] },
      { company: 'UC Berkeley AI Lab', role: 'Research Assistant', date: 'Jan 2024 – May 2024', bullets: ['Built NLP pipeline for sentiment analysis achieving 92% accuracy on benchmark datasets', 'Published co-authored paper on transformer architectures at ACL 2024'] },
    ],
    edu: [{ school: 'UC Berkeley', degree: 'B.S. Computer Science', date: '2021 – 2025' }],
    skills: ['Python', 'Java', 'React', 'TensorFlow', 'Git', 'Docker', 'Machine Learning'] },
  { name: 'Emma Wilson', title: 'Marketing Intern', email: 'emma.w@email.com', phone: '(617) 555-0134', location: 'Boston, MA',
    exp: [
      { company: 'HubSpot', role: 'Marketing Intern', date: 'Jun 2024 – Aug 2024', bullets: ['Managed social media campaigns reaching 500K+ impressions across LinkedIn and Twitter', 'Created content calendar and wrote 20+ blog posts driving 15% increase in organic traffic'] },
      { company: 'Boston University Marketing Club', role: 'Vice President', date: 'Sep 2023 – May 2024', bullets: ['Organized 8 industry speaker events with 200+ attendees each semester', 'Led rebranding initiative increasing club membership by 40%'] },
    ],
    edu: [{ school: 'Boston University', degree: 'B.A. Marketing & Communications', date: '2021 – 2025' }],
    skills: ['Content Strategy', 'Google Analytics', 'Canva', 'Mailchimp', 'SEO', 'Social Media', 'Copywriting'] },
  { name: 'James Lee', title: 'Full Stack Developer', email: 'james.lee@email.com', phone: '(310) 555-0172', location: 'Los Angeles, CA',
    exp: [
      { company: 'Shopify', role: 'Engineering Intern', date: 'May 2024 – Aug 2024', bullets: ['Built checkout optimization feature increasing conversion rate by 3.2% for merchant stores', 'Developed GraphQL API endpoints for new inventory management system'] },
      { company: 'UCLA Computer Science Dept', role: 'Teaching Assistant', date: 'Sep 2023 – Jun 2024', bullets: ['Taught weekly lab sections for Data Structures course with 150+ students', 'Created auto-grading scripts reducing grading time by 80%'] },
    ],
    edu: [{ school: 'UCLA', degree: 'B.S. Computer Science', date: '2021 – 2025' }],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Ruby on Rails'] },
  { name: 'Lisa Park', title: 'VP of Marketing', email: 'lisa.park@email.com', phone: '(646) 555-0191', location: 'New York, NY',
    exp: [
      { company: 'Salesforce', role: 'Vice President, Marketing', date: 'Jan 2020 – Present', bullets: ['Led global marketing organization of 85+ across brand, demand gen, and product marketing', 'Drove 45% increase in marketing-sourced pipeline through integrated campaign strategy', 'Managed $40M annual marketing budget with 3.2x ROI on demand generation programs'] },
      { company: 'Adobe', role: 'Senior Director, Marketing', date: 'Mar 2016 – Dec 2019', bullets: ['Built and scaled product marketing team from 8 to 25 for Creative Cloud division', 'Launched Adobe MAX conference digital experience reaching 500K+ global attendees'] },
    ],
    edu: [{ school: 'Wharton School, UPenn', degree: 'MBA, Marketing', date: '2012 – 2014' }],
    skills: ['Brand Strategy', 'Demand Generation', 'Team Leadership', 'P&L Management', 'ABM', 'Marketing Ops'] },
  { name: 'Michael Brown', title: 'Chief Executive Officer', email: 'm.brown@email.com', phone: '(312) 555-0145', location: 'Chicago, IL',
    exp: [
      { company: 'Meridian Technologies', role: 'Chief Executive Officer', date: 'Jul 2018 – Present', bullets: ['Grew company from $15M to $120M ARR, leading Series B through D funding rounds totaling $180M', 'Expanded team from 45 to 350+ employees across 4 global offices', 'Negotiated strategic partnerships with Fortune 500 clients including IBM, Deloitte, and McKinsey'] },
      { company: 'Bain & Company', role: 'Partner', date: 'Jan 2012 – Jun 2018', bullets: ['Led technology and digital transformation practice across 20+ enterprise engagements', 'Generated $25M+ in annual consulting revenue for the Chicago office'] },
    ],
    edu: [{ school: 'Harvard Business School', degree: 'MBA', date: '2008 – 2010' }],
    skills: ['Executive Leadership', 'Fundraising', 'M&A', 'Board Relations', 'P&L Management', 'Strategy'] },
]

const T = {
  name: { fontSize: 9, fontWeight: 700 as const, lineHeight: 1.1, letterSpacing: '-0.02em' },
  title: { fontSize: 5, fontWeight: 400 as const, lineHeight: 1.2, marginTop: 1 },
  contact: { fontSize: 3.5, lineHeight: 1.4, opacity: 0.6 },
  section: { fontSize: 4.5, fontWeight: 700 as const, textTransform: 'uppercase' as const, letterSpacing: '0.06em', lineHeight: 1, marginTop: 8, marginBottom: 3 },
  role: { fontSize: 4.5, fontWeight: 600 as const, lineHeight: 1.2 },
  company: { fontSize: 4, fontWeight: 400 as const, lineHeight: 1.2 },
  date: { fontSize: 3.5, fontWeight: 400 as const, lineHeight: 1.2 },
  bullet: { fontSize: 3.5, lineHeight: 1.45, fontWeight: 400 as const },
  skill: { fontSize: 3.5, lineHeight: 1.3 },
}

function ResumeMini({ t, idx }: { t: TemplateInfo, idx: number }) {
  const d = RESUME_DATA[idx] || RESUME_DATA[0]
  const F = FONT

  const SectionTitle = ({ children, color, borderColor }: { children: React.ReactNode, color: string, borderColor?: string }) => (
    <div style={{ ...T.section, color, borderBottom: borderColor ? `0.5px solid ${borderColor}` : undefined, paddingBottom: borderColor ? 2 : 0 }}>
      {children}
    </div>
  )

  const ExpBlock = ({ exp, color, dateColor }: { exp: ResumeData['exp'][0], color: string, dateColor?: string }) => (
    <div style={{ marginBottom: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ ...T.role, color, fontFamily: F }}>{exp.role}</span>
        <span style={{ ...T.date, color: dateColor || '#9ca3af', fontFamily: F }}>{exp.date}</span>
      </div>
      <div style={{ ...T.company, color: dateColor || '#6b7280', fontFamily: F, marginBottom: 2 }}>{exp.company}</div>
      {exp.bullets.map((b, i) => (
        <div key={i} style={{ display: 'flex', gap: 2, marginBottom: 0.5 }}>
          <span style={{ ...T.bullet, color: dateColor || '#9ca3af', flexShrink: 0, fontFamily: F }}>•</span>
          <span style={{ ...T.bullet, color: color === '#fff' ? 'rgba(255,255,255,0.7)' : '#4b5563', fontFamily: F }}>{b}</span>
        </div>
      ))}
    </div>
  )

  const EduBlock = ({ edu, color, dateColor }: { edu: ResumeData['edu'][0], color: string, dateColor?: string }) => (
    <div style={{ marginBottom: 3 }}>
      <div style={{ ...T.role, color, fontFamily: F }}>{edu.school}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...T.company, color: dateColor || '#6b7280', fontFamily: F }}>{edu.degree}</span>
        <span style={{ ...T.date, color: dateColor || '#9ca3af', fontFamily: F }}>{edu.date}</span>
      </div>
    </div>
  )

  const SkillsInline = ({ skills, color }: { skills: string[], color: string }) => (
    <div style={{ ...T.skill, color, fontFamily: F }}>
      {skills.join('  •  ')}
    </div>
  )

  const ContactRow = ({ color, icon }: { color: string, icon?: boolean }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {[d.email, d.phone, d.location].map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {icon && <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.4, flexShrink: 0 }} />}
          <span style={{ ...T.contact, color, fontFamily: F }}>{c}</span>
        </div>
      ))}
    </div>
  )

  if (t.layout === 'sidebar') {
    const sbg = t.bg || '#1E293B'
    const acc = t.accent || '#0D9488'
    const sideText = '#fff'
    const sideTextMuted = 'rgba(255,255,255,0.55)'
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: F, overflow: 'hidden' }}>
        <div style={{ width: '30%', background: sbg, padding: '12px 8px', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ ...T.name, color: sideText, fontFamily: F, marginBottom: 1 }}>{d.name}</div>
          <div style={{ ...T.title, color: sideTextMuted, fontFamily: F, marginBottom: 6 }}>{d.title}</div>
          <ContactRow color={sideTextMuted} icon />
          <SectionTitle color={acc}>SKILLS</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px 4px' }}>
            {d.skills.map(s => <span key={s} style={{ ...T.skill, color: 'rgba(255,255,255,0.55)', fontFamily: F }}>{s}</span>)}
          </div>
          <SectionTitle color={acc}>EDUCATION</SectionTitle>
          <div style={{ ...T.role, color: sideText, fontFamily: F, fontSize: 4 }}>{d.edu[0].school}</div>
          <div style={{ ...T.contact, color: sideTextMuted, fontFamily: F }}>{d.edu[0].degree}</div>
          <div style={{ ...T.contact, color: sideTextMuted, fontFamily: F }}>{d.edu[0].date}</div>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: '12px 10px', overflow: 'hidden' }}>
          <SectionTitle color={acc}>EXPERIENCE</SectionTitle>
          {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#0A1217" />)}
        </div>
      </div>
    )
  }

  if (t.layout === 'split') {
    const hbg = t.headerBg || '#2a6496'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff', fontFamily: F, overflow: 'hidden' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, background: hbg, padding: '10px 10px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ ...T.name, color: '#fff', fontFamily: F }}>{d.name}</div>
            <div style={{ ...T.title, color: 'rgba(255,255,255,0.65)', fontFamily: F }}>{d.title}</div>
          </div>
          <div style={{ width: '35%', background: '#f0f4f8', padding: '8px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ContactRow color="#4b5563" icon />
          </div>
        </div>
        <div style={{ flex: 1, padding: '6px 10px', overflow: 'hidden' }}>
          <SectionTitle color="#374151" borderColor="#d1d5db">EXPERIENCE</SectionTitle>
          {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#111827" />)}
          <SectionTitle color="#374151" borderColor="#d1d5db">EDUCATION</SectionTitle>
          {d.edu.map((e, i) => <EduBlock key={i} edu={e} color="#111827" />)}
          <SectionTitle color="#374151" borderColor="#d1d5db">SKILLS</SectionTitle>
          <SkillsInline skills={d.skills} color="#4b5563" />
        </div>
      </div>
    )
  }

  if (t.layout === 'strip') {
    const acc = t.accent || '#2563eb'
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff', fontFamily: F, overflow: 'hidden' }}>
        <div style={{ width: 4, background: acc, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: '12px 10px', overflow: 'hidden' }}>
          <div style={{ ...T.name, color: '#0A1217', fontFamily: F }}>{d.name}</div>
          <div style={{ ...T.title, color: '#6b7280', fontFamily: F, marginBottom: 2 }}>{d.title}</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
            {[d.email, d.phone, d.location].map((c, i) => <span key={i} style={{ ...T.contact, color: '#9ca3af', fontFamily: F }}>{c}</span>)}
          </div>
          <div style={{ width: '100%', height: '0.5px', background: '#e5e7eb', marginBottom: 4 }} />
          <SectionTitle color={acc}>EXPERIENCE</SectionTitle>
          {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#111827" />)}
          <SectionTitle color={acc}>EDUCATION</SectionTitle>
          {d.edu.map((e, i) => <EduBlock key={i} edu={e} color="#111827" />)}
          <SectionTitle color={acc}>SKILLS</SectionTitle>
          <SkillsInline skills={d.skills} color="#4b5563" />
        </div>
      </div>
    )
  }

  if (t.layout === 'header') {
    const hbg = t.headerBg || '#7c3aed'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff', fontFamily: F, overflow: 'hidden' }}>
        <div style={{ background: hbg, padding: '10px 10px 8px' }}>
          <div style={{ ...T.name, color: '#fff', fontFamily: F }}>{d.name}</div>
          <div style={{ ...T.title, color: 'rgba(255,255,255,0.6)', fontFamily: F, marginBottom: 3 }}>{d.title}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[d.email, d.phone, d.location].map((c, i) => <span key={i} style={{ ...T.contact, color: 'rgba(255,255,255,0.5)', fontFamily: F }}>{c}</span>)}
          </div>
        </div>
        <div style={{ flex: 1, padding: '6px 10px', overflow: 'hidden' }}>
          <SectionTitle color="#374151" borderColor="#e5e7eb">EXPERIENCE</SectionTitle>
          {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#111827" />)}
          <SectionTitle color="#374151" borderColor="#e5e7eb">EDUCATION</SectionTitle>
          {d.edu.map((e, i) => <EduBlock key={i} edu={e} color="#111827" />)}
          <SectionTitle color="#374151" borderColor="#e5e7eb">SKILLS</SectionTitle>
          <SkillsInline skills={d.skills} color="#4b5563" />
        </div>
      </div>
    )
  }

  if (t.layout === 'elegant') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff', padding: '14px 12px', fontFamily: F, overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <div style={{ ...T.name, color: '#0A1217', fontFamily: F, fontSize: 10, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>{d.name}</div>
          <div style={{ ...T.title, color: '#6b7280', fontFamily: F, fontSize: 4.5, marginTop: 1 }}>{d.title}</div>
        </div>
        <div style={{ width: '100%', height: '0.5px', background: '#0A1217', marginBottom: 1, opacity: 0.3 }} />
        <div style={{ width: '100%', height: '0.5px', background: '#0A1217', marginBottom: 2, opacity: 0.3 }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
          {[d.email, d.phone, d.location].map((c, i) => <span key={i} style={{ ...T.contact, color: '#6b7280', fontFamily: F }}>{c}</span>)}
        </div>
        <SectionTitle color="#374151" borderColor="#d1d5db">EXPERIENCE</SectionTitle>
        {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#111827" />)}
        <SectionTitle color="#374151" borderColor="#d1d5db">EDUCATION</SectionTitle>
        {d.edu.map((e, i) => <EduBlock key={i} edu={e} color="#111827" />)}
        <SectionTitle color="#374151" borderColor="#d1d5db">SKILLS</SectionTitle>
        <SkillsInline skills={d.skills} color="#4b5563" />
      </div>
    )
  }

  // clean layout (Classic, Analyst)
  const acc = t.accent || '#374151'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff', padding: '12px 10px', fontFamily: F, overflow: 'hidden' }}>
      <div style={{ ...T.name, color: '#0A1217', fontFamily: F }}>{d.name}</div>
      <div style={{ ...T.title, color: '#6b7280', fontFamily: F, marginBottom: 2 }}>{d.title}</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
        {[d.email, d.phone, d.location].map((c, i) => <span key={i} style={{ ...T.contact, color: '#9ca3af', fontFamily: F }}>{c}</span>)}
      </div>
      <SectionTitle color={acc} borderColor={acc}>EXPERIENCE</SectionTitle>
      {d.exp.map((e, i) => <ExpBlock key={i} exp={e} color="#111827" />)}
      <SectionTitle color={acc} borderColor={acc}>EDUCATION</SectionTitle>
      {d.edu.map((e, i) => <EduBlock key={i} edu={e} color="#111827" />)}
      <SectionTitle color={acc} borderColor={acc}>SKILLS</SectionTitle>
      <SkillsInline skills={d.skills} color="#4b5563" />
    </div>
  )
}

/* ═══ Resume Builder Content ═══ */

const TABS: { key: string, label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'student', label: 'Student' },
  { key: 'professional', label: 'Professional' },
  { key: 'executive', label: 'Executive' },
]

function ResumeBuilderContent() {
  const [tab, setTab] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = tab === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === tab)

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px 48px', background: '#fff', fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0A1217', margin: 0, letterSpacing: '-0.03em' }}>Resume Builder</h2>
        <button onClick={() => { window.location.href = 'https://app.nexthireconsulting.com' }} style={{
          fontSize: 14, fontWeight: 400, color: '#fff', background: '#000', padding: '0 20px', height: 36, borderRadius: 999,
          border: 'none', cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#374151' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#000' }}>
          + New Resume
        </button>
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0A1217', margin: '0 0 6px' }}>Start from a template</h3>
      <p style={{ fontSize: 14, color: '#a3a3a3', margin: '0 0 20px', fontWeight: 400 }}>Choose a design and customize it later</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            fontSize: 14, fontWeight: 500, padding: '8px 20px', borderRadius: 999, cursor: 'pointer',
            transition: 'all 0.15s', fontFamily: FONT,
            background: tab === t.key ? '#1a3338' : '#fff',
            color: tab === t.key ? '#fff' : '#525252',
            border: tab === t.key ? '1px solid #1a3338' : '1px solid #d4d4d4',
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {filtered.map((t, i) => (
          <button key={t.name} onClick={() => setSelected(t.name)} style={{
            cursor: 'pointer', textAlign: 'left' as const, background: '#fff', padding: 0, border: 'none', fontFamily: FONT,
          }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              border: selected === t.name ? '2px solid #0A1217' : '1px solid rgba(10,18,23,0.08)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 7px 16px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ aspectRatio: '794 / 1250', overflow: 'hidden', background: '#fff' }}>
                <ResumeMini t={t} idx={i} />
              </div>
            </div>
            <div style={{ padding: '8px 4px 0' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#0A1217', lineHeight: '19.6px' }}>{t.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, borderRadius: 6, padding: '1px 8px',
                  background: t.category === 'student' ? '#dcfce7' : t.category === 'professional' ? '#dbeafe' : '#f3e8ff',
                  color: t.category === 'student' ? '#166534' : t.category === 'professional' ? '#1e40af' : '#6b21a8',
                }}>{t.category === 'student' ? 'Student' : t.category === 'professional' ? 'Professional' : 'Executive'}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ═══ Interview Coach Content ═══ */

const IC_MODELS = [
  { label: 'Sonnet 4.6', short: 'Sonnet 4.6' },
  { label: 'GPT 5.4', short: 'GPT 5.4' },
  { label: 'GPT 5.4 nano', short: 'GPT nano' },
]

const IC_SAMPLE_RESPONSE = `## Approach to System Design

Great question! Here's a structured way to approach this:

### 1. Clarify Requirements
- **Functional:** What does the system need to do? List core features.
- **Non-functional:** Latency, throughput, availability, consistency.
- **Scale:** How many users? Requests per second? Data volume?

### 2. High-Level Design
Start with a simple architecture:
1. Load balancer → API servers → Database
2. Add caching layer (Redis) for hot data
3. Message queue for async processing

### 3. Deep Dive
- **Database choice:** SQL for ACID, NoSQL for scale
- **Caching strategy:** Write-through vs write-behind
- **Sharding:** Consistent hashing for distribution

### Key Tip
Always state your assumptions upfront. Interviewers want to see your thought process, not a perfect answer.`

const IC_TRANSCRIPT: { side: 'system' | 'mic'; text: string; time: string }[] = [
  { side: 'system', text: "Let's start with a coding problem. Given an array of integers and a target sum, find two numbers that add up to the target.", time: '0:45' },
  { side: 'mic', text: "Sure! I'd start by thinking about the brute force approach — checking every pair — but that's O(n²). Instead, we can use a hash map for O(n)...", time: '1:12' },
  { side: 'system', text: "Good thinking. What about edge cases?", time: '2:30' },
  { side: 'mic', text: "We should consider empty arrays, single element, negative numbers, and no-solution cases.", time: '2:55' },
  { side: 'system', text: "Can you walk me through the hash map solution step by step?", time: '3:18' },
  { side: 'mic', text: "Of course. We iterate once, and for each number we check if target minus that number is already in our map. If yes, we found our pair. If not, we add the current number.", time: '3:42' },
]

function InterviewCoachContent() {
  const [userPrompt, setUserPrompt] = useState('')
  const [inputSources, setInputSources] = useState({ audio: true, screenshot: false, userInput: false })
  const [selectedModel, setSelectedModel] = useState(0)
  const [showModelMenu, setShowModelMenu] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [responseTab, setResponseTab] = useState<'response' | 'transcript'>('response')
  const [copied, setCopied] = useState(false)
  const responseRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null)
  const dragRef = useRef<{ startMouseX: number; startMouseY: number; startX: number; startY: number; scale: number } | null>(null)

  const handleSubmit = useCallback(() => {
    if (isTyping) return
    setShowResponse(true)
    setResponseTab('response')
    setIsTyping(true)
    setDisplayedResponse('')
    let i = 0
    const interval = setInterval(() => {
      i += 3
      if (i >= IC_SAMPLE_RESPONSE.length) {
        setDisplayedResponse(IC_SAMPLE_RESPONSE)
        setIsTyping(false)
        clearInterval(interval)
      } else {
        setDisplayedResponse(IC_SAMPLE_RESPONSE.slice(0, i))
      }
    }, 8)
  }, [isTyping])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(displayedResponse).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [displayedResponse])

  useEffect(() => {
    if (responseRef.current) responseRef.current.scrollTop = responseRef.current.scrollHeight
  }, [displayedResponse])

  useEffect(() => {
    if (screenRef.current && overlayRef.current && !overlayPos) {
      const sw = screenRef.current.offsetWidth
      const sh = screenRef.current.offsetHeight
      const ow = overlayRef.current.offsetWidth
      const oh = overlayRef.current.offsetHeight
      setOverlayPos({ x: (sw - ow) / 2, y: (sh - oh) / 2 })
    }
  })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    if (!overlayPos || !screenRef.current) return
    const screenEl = screenRef.current
    const scale = screenEl.getBoundingClientRect().width / screenEl.offsetWidth
    dragRef.current = { startMouseX: e.clientX, startMouseY: e.clientY, startX: overlayPos.x, startY: overlayPos.y, scale }
    e.preventDefault()

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current || !screenRef.current || !overlayRef.current) return
      const { startMouseX, startMouseY, startX, startY, scale: s } = dragRef.current
      const dx = (ev.clientX - startMouseX) / s
      const dy = (ev.clientY - startMouseY) / s
      const sw = screenRef.current.offsetWidth
      const sh = screenRef.current.offsetHeight
      const ow = overlayRef.current.offsetWidth
      const oh = overlayRef.current.offsetHeight
      setOverlayPos({
        x: Math.max(0, Math.min(startX + dx, sw - ow)),
        y: Math.max(0, Math.min(startY + dy, sh - oh)),
      })
    }
    const onUp = () => {
      dragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [overlayPos])

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <div key={i} style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '12px 0 5px', lineHeight: 1.4 }}>{line.slice(4)}</div>
      if (line.startsWith('## ')) return <div key={i} style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '14px 0 7px', lineHeight: 1.3 }}>{line.slice(3)}</div>
      if (line.startsWith('- **')) {
        const m = line.match(/^- \*\*(.+?)\*\*(.*)$/)
        if (m) return <div key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, paddingLeft: 14 }}>• <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{m[1]}</span>{m[2]}</div>
      }
      if (/^\d+\.\s/.test(line)) return <div key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, paddingLeft: 14 }}>{line}</div>
      if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
      return <div key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{line}</div>
    })
  }

  const sourceKeys: ('audio' | 'screenshot' | 'userInput')[] = ['audio', 'screenshot', 'userInput']

  const overlayStyle: React.CSSProperties = overlayPos
    ? { position: 'absolute', left: `${overlayPos.x}px`, top: `${overlayPos.y}px`, width: 680, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'grab' }
    : { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 680, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'grab' }

  return (
    <div ref={screenRef} style={{ flex: 1, background: '#1a1a1a', position: 'relative', overflow: 'hidden', userSelect: 'none' }} onClick={() => showModelMenu && setShowModelMenu(false)}>
      {/* Video call background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #2a2a2e 0%, #1a1a1a 70%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 30px rgba(99,102,241,0.3)' }}>
          <span style={{ fontSize: 56, fontWeight: 600, color: 'white' }}>S</span>
        </div>
        <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.9)', fontWeight: 500, marginTop: 20, fontFamily: FONT }}>Sarah Chen</span>
        <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)', marginTop: 6, fontFamily: FONT }}>Senior Engineer</span>
      </div>

      {/* "You" thumbnail */}
      <div style={{ position: 'absolute', bottom: 90, right: 24, width: 200, height: 140, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(135deg, #2d2d32, #1e1e22)', border: '1.5px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 18px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>Y</span>
        </div>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>You</span>
      </div>

      {/* Google Meet bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72, background: 'rgba(32,33,36,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 5 }}>
        {[false, false, false, false, false, true].map((isEnd, i) => (
          <div key={i} style={{ width: 52, height: 52, borderRadius: '50%', background: isEnd ? '#ea4335' : i < 2 ? 'rgba(255,255,255,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isEnd ? 12 : 0, cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => { if (!isEnd && i >= 2) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={e => { if (!isEnd && i >= 2) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={i < 2 ? 'white' : isEnd ? 'white' : 'rgba(255,255,255,0.35)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {i === 0 && <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />}
              {i === 1 && <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9.75a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />}
              {i === 2 && <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />}
              {i === 3 && <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />}
              {i === 4 && <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm4.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm4.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />}
              {i === 5 && <><path stroke="white" d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25" /><path stroke="white" d="M1.5 16.5A2.25 2.25 0 003.75 18.75h.2a2.25 2.25 0 002.15-1.588l.234-.78a.75.75 0 01.72-.532h3.89a.75.75 0 01.72.533l.234.779a2.25 2.25 0 002.15 1.588H18" /></>}
            </svg>
          </div>
        ))}
      </div>

      {/* AI Coach Overlay */}
      <div ref={overlayRef} onMouseDown={handleMouseDown} style={overlayStyle}>
        {/* Input panel (top) */}
        <div style={{ backgroundColor: 'rgba(16,17,28,0.65)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderRadius: 21, border: '2px solid rgba(255,255,255,0.2)', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6058, #ff4640)', border: '0.5px solid #e0443e' }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #ffbd2e, #ffac00)', border: '0.5px solid #dea600' }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '0.5px solid rgba(255,255,255,0.15)' }} />
            </div>
          </div>
          {/* Textarea */}
          <textarea
            data-no-drag
            ref={textareaRef}
            value={userPrompt}
            onChange={e => {
              setUserPrompt(e.target.value)
              const el = e.target
              el.style.height = 'auto'
              el.style.height = `${Math.min(el.scrollHeight, 140)}px`
            }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
            placeholder="Type your question or prompt here..."
            style={{ width: '100%', padding: '4px 2px', color: 'rgba(255,255,255,0.95)', fontSize: 19, fontFamily: FONT, fontWeight: 400, minHeight: 56, maxHeight: 140, lineHeight: 1.5, background: 'transparent', border: 'none', outline: 'none', resize: 'none', overflowY: 'hidden', cursor: 'text' }}
          />
          {/* Bottom row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Mode toggles */}
            <div data-no-drag style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: 3, gap: 2 }}>
              {sourceKeys.map((key, i) => {
                const active = inputSources[key]
                return (
                  <div key={key} data-no-drag onClick={() => setInputSources(prev => ({ ...prev, [key]: !prev[key] }))}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 34, borderRadius: 7, cursor: 'pointer', background: active ? 'rgba(139,92,246,0.5)' : 'transparent', color: active ? 'white' : 'rgba(255,255,255,0.3)', transition: 'all 0.15s' }}>
                    {i === 0 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg>}
                    {i === 1 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>}
                    {i === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect x="4" y="4" width="16" height="18" rx="2" /><path d="M8 10h8" /><path d="M8 14h8" /><path d="M8 18h5" /></svg>}
                  </div>
                )
              })}
            </div>
            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* Model selector */}
              <div data-no-drag style={{ position: 'relative' }}>
                <div onClick={e => { e.stopPropagation(); setShowModelMenu(!showModelMenu) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, height: 34, padding: '0 10px', width: 150, justifyContent: 'center', borderRadius: 8, border: '0.5px solid rgba(255,255,255,0.15)', background: showModelMenu ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!showModelMenu) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.12)' }}
                  onMouseLeave={e => { if (!showModelMenu) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'rgba(255,255,255,0.45)' }}><path d="M17.3 3.5H13.7L21 20.5h3.6L17.3 3.5zM6.7 3.5L0 20.5h3.7l1.5-3.7h7.1l1.5 3.7h3.7L10.7 3.5H6.7zM6.3 13.8l2.4-6.1 2.4 6.1H6.3z" /></svg>
                  <span>{IC_MODELS[selectedModel].short}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {showModelMenu && (
                  <div data-no-drag onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: -6, transform: 'translateY(-100%)', left: 0, width: 200, background: 'rgba(16,17,28,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', padding: '6px 0', zIndex: 60, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                    {IC_MODELS.map((m, idx) => (
                      <div key={m.label} onClick={() => { setSelectedModel(idx); setShowModelMenu(false) }}
                        style={{ padding: '10px 16px', fontSize: 14, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: selectedModel === idx ? 'rgba(139,92,246,0.35)' : 'transparent', transition: 'background 0.1s' }}
                        onMouseEnter={e => { if (selectedModel !== idx) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)' }}
                        onMouseLeave={e => { if (selectedModel !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                        <span>{m.label}</span>
                        {selectedModel === idx && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Settings */}
              <div data-no-drag style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><circle cx="12" cy="4" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="14" cy="20" r="2" /></svg>
              </div>
              {/* Audio bars */}
              <div data-no-drag style={{ height: 34, width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, cursor: 'pointer', borderRadius: 8 }}>
                <div style={{ width: 2.5, height: 8, background: 'white', borderRadius: 1 }} />
                <div style={{ width: 2.5, height: 18, background: 'white', borderRadius: 1 }} />
                <div style={{ width: 2.5, height: 12, background: 'white', borderRadius: 1 }} />
              </div>
              {/* Submit */}
              <div data-no-drag onClick={handleSubmit}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', cursor: 'pointer', background: isTyping ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.8)', boxShadow: '0 2px 6px rgba(139,92,246,0.3)', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!isTyping) (e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,1)' }}
                onMouseLeave={e => { if (!isTyping) (e.currentTarget as HTMLDivElement).style.background = 'rgba(139,92,246,0.8)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Response window (below input) */}
        {showResponse && (
          <div data-no-drag style={{ backgroundColor: 'rgba(16,17,28,0.75)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderRadius: 21, border: '2px solid rgba(255,255,255,0.15)', overflow: 'hidden', maxHeight: 420, cursor: 'default' }}>
            {/* Tabs + actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 10 }}>
              <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: 2, border: '0.5px solid rgba(255,255,255,0.15)' }}>
                {(['response', 'transcript'] as const).map(tab => (
                  <button key={tab} onClick={() => setResponseTab(tab)}
                    style={{ fontSize: 13, fontWeight: 500, color: responseTab === tab ? 'white' : 'rgba(255,255,255,0.55)', background: responseTab === tab ? 'rgba(139,92,246,0.6)' : 'transparent', border: 'none', borderRadius: 6, padding: '4px 14px', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s', boxShadow: responseTab === tab ? '0 1px 4px rgba(139,92,246,0.3)' : 'none' }}>
                    {tab === 'response' ? 'AI Response' : 'Transcript'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div onClick={handleCopy} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.7)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.4)' }}>
                  {copied
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  }
                </div>
                <div onClick={() => { setShowResponse(false); setDisplayedResponse(''); setIsTyping(false) }} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.7)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.4)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
              </div>
            </div>
            <div ref={responseRef} style={{ padding: responseTab === 'transcript' ? 0 : '14px 18px 16px', maxHeight: 340, overflowY: 'auto' }}>
              {responseTab === 'response' ? (
                <>
                  {displayedResponse ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                        <div style={{ maxWidth: '85%', background: 'rgba(139,92,246,0.2)', borderRadius: '12px 12px 4px 12px', padding: '8px 12px' }}>
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: FONT }}>{userPrompt || 'Analyzing the inputs and providing insights'}</div>
                        </div>
                      </div>
                      {renderMarkdown(displayedResponse)}
                    </>
                  ) : (
                    <div style={{ padding: '4px 0', opacity: 0.5, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Ask a question to get started...</div>
                  )}
                  {isTyping && (
                    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', marginLeft: 4, marginTop: 6 }}>
                      {[0, 0.2, 0.4].map(delay => (
                        <span key={delay} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: 'white', animation: 'nh-copilot-wave 1.4s ease-in-out infinite', animationDelay: `${delay}s` }} />
                      ))}
                    </span>
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 14px 12px' }}>
                  {IC_TRANSCRIPT.map((entry, i) => {
                    const isMic = entry.side === 'mic'
                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: isMic ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          maxWidth: '78%',
                          padding: '6px 9px 5px',
                          borderRadius: isMic ? '10px 3px 10px 10px' : '3px 10px 10px 10px',
                          background: isMic ? 'rgba(79, 70, 229, 0.55)' : 'rgba(13, 148, 136, 0.50)',
                          border: isMic ? '1px solid rgba(129, 140, 248, 0.30)' : '1px solid rgba(45, 212, 191, 0.28)',
                          backdropFilter: 'blur(6px)',
                        }}>
                          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5, margin: 0, fontFamily: FONT, wordBreak: 'break-word' }}>{entry.text}</p>
                          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', marginTop: 3, textAlign: isMic ? 'right' : 'left', fontFamily: FONT }}>{entry.time}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══ AI Auto Apply Content — OpenClaw dark dashboard UI ═══ */

const OC = {
  bg: '#12141a', bgAccent: '#14161d', bgElevated: '#1a1d25', bgHover: '#262a35',
  card: '#181b22', cardFg: '#f4f4f5', cardHighlight: 'rgba(255,255,255,0.05)',
  text: '#e4e4e7', textStrong: '#fafafa',
  muted: '#71717a', mutedStrong: '#52525b',
  border: '#27272a', borderStrong: '#3f3f46',
  accent: '#ff5c5c', accentSubtle: 'rgba(255,92,92,0.15)',
  teal: '#14b8a6', tealSubtle: 'rgba(20,184,166,0.15)',
  ok: '#22c55e',
  font: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
}

const OC_NAV_GROUPS = [
  { label: 'Chat', tabs: [{ id: 'chat', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' }] },
  { label: 'Control', tabs: [
    { id: 'overview', icon: 'M3 3v18h18' },
    { id: 'channels', icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71' },
    { id: 'sessions', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' },
    { id: 'cron', icon: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83' },
  ]},
  { label: 'Agent', tabs: [
    { id: 'agents', icon: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' },
    { id: 'skills', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8' },
  ]},
  { label: 'Settings', tabs: [
    { id: 'config', icon: 'M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z' },
    { id: 'logs', icon: 'M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z' },
  ]},
]

const OC_CHAT_MESSAGES: { role: 'user' | 'assistant'; text: string }[] = [
  { role: 'user', text: 'Apply to all Senior Frontend Engineer roles at Stripe, Vercel, and Linear that were posted this week.' },
  { role: 'assistant', text: 'Found 7 matching roles across those companies. Here\'s what I\'ll do:\n\n1. **Stripe** — Senior Frontend Engineer (2 openings)\n2. **Vercel** — Senior Frontend Engineer, DX\n3. **Vercel** — Staff Frontend Engineer\n4. **Linear** — Senior Frontend Engineer\n5. **Linear** — Frontend Engineer, Desktop\n6. **Stripe** — Frontend Engineer, Checkout\n\nI\'ll tailor your resume for each role and submit via their ATS. Starting now...' },
  { role: 'assistant', text: '✓ Applied to Stripe — Senior Frontend Engineer (NYC)\n✓ Applied to Stripe — Senior Frontend Engineer (SF)\n✓ Applied to Vercel — Senior Frontend Engineer, DX\n✓ Applied to Linear — Senior Frontend Engineer\n⏳ Applying to remaining 3 roles...' },
]

function AutoApplyContent() {
  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '180px 1fr', gridTemplateRows: '44px 1fr', background: OC.bg, fontFamily: OC.font, overflow: 'hidden', color: OC.text, fontSize: 13 }}>
      {/* Topbar */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: `1px solid ${OC.border}`, background: OC.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={OC.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          <div style={{ width: 20, height: 20, borderRadius: 4, background: OC.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8" /></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: OC.textStrong, letterSpacing: '-0.03em', lineHeight: 1.1 }}>AI AUTO APPLY</span>
            <span style={{ fontSize: 8, fontWeight: 500, color: OC.muted, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Job Agent</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 999, border: `1px solid ${OC.border}`, fontSize: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: OC.ok }} />
            <span style={{ color: OC.muted }}>Health</span>
            <span style={{ fontFamily: OC.mono, color: OC.text, fontSize: 10 }}>OK</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ borderRight: `1px solid ${OC.border}`, padding: '10px 8px', overflow: 'hidden', background: OC.bg }}>
        {OC_NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 500, color: OC.muted, letterSpacing: '0.04em', textTransform: 'uppercase' as const, padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{group.label}</span>
              <span style={{ color: OC.mutedStrong, fontSize: 10 }}>{'−'}</span>
            </div>
            {group.tabs.map(tab => {
              const isActive = tab.id === 'chat'
              return (
                <div key={tab.id} style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
                  background: isActive ? OC.accentSubtle : 'transparent',
                  color: isActive ? OC.accent : OC.muted,
                  fontSize: 12, fontWeight: isActive ? 500 : 400,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tab.icon} /></svg>
                  <span style={{ textTransform: 'capitalize' as const }}>{tab.id}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Main content — Chat view */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 12 }}>
        {/* Chat header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, marginBottom: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select style={{ background: OC.bgElevated, border: `1px solid ${OC.border}`, borderRadius: 6, color: OC.text, fontSize: 11, padding: '3px 8px', fontFamily: OC.mono, outline: 'none' }}>
              <option>default</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${OC.border}`, fontSize: 10, color: OC.muted, cursor: 'pointer' }}>New</div>
            <div style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${OC.border}`, fontSize: 10, color: OC.muted, cursor: 'pointer' }}>Focus</div>
          </div>
        </div>

        {/* Chat thread */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 2px' }}>
          {OC_CHAT_MESSAGES.map((msg, i) => {
            const isUser = msg.role === 'user'
            return (
              <div key={i} style={{ display: 'flex', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: isUser ? OC.accentSubtle : OC.bgElevated,
                  color: isUser ? OC.accent : OC.muted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, marginBottom: 2,
                }}>
                  {isUser ? 'H' : 'AI'}
                </div>
                <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 2 }}>
                  <div style={{
                    background: OC.card, borderRadius: 10, padding: '8px 11px',
                    border: `1px solid transparent`, fontSize: 12, lineHeight: 1.5,
                    color: OC.text, whiteSpace: 'pre-wrap' as const,
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginTop: 2 }}>
                    <span style={{ fontSize: 9, fontWeight: 500, color: OC.muted }}>{isUser ? 'You' : 'Agent'}</span>
                    <span style={{ fontSize: 9, color: OC.muted, opacity: 0.7 }}>{isUser ? '2:14 PM' : i === 1 ? '2:14 PM' : '2:15 PM'}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Compose area */}
        <div style={{ flexShrink: 0, marginTop: 8, borderTop: `1px solid ${OC.border}`, paddingTop: 10 }}>
          <div style={{
            background: OC.bgElevated, borderRadius: 10, border: `1px solid ${OC.border}`,
            padding: '8px 12px', display: 'flex', alignItems: 'flex-end', gap: 8,
          }}>
            <div style={{ flex: 1, fontSize: 12, color: OC.mutedStrong, lineHeight: 1.5, minHeight: 18, userSelect: 'none' as const }}>
              Message (↩ to send, Shift+↩ for line breaks)
            </div>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: OC.accent, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ Exported Sections ═══ */

export default function ResumeBuilderShowcase() {
  const [rbNav, setRbNav] = useState('resume')

  return (
    <>
      <section style={{ background: '#f5f5f0', padding: 'clamp(48px, 8vw, 80px) 0', overflowX: 'clip' }}>
        <div className="nh-rb-showcase__inner">
          <div className="nh-rb-showcase__left">
            <MacDesktop browserUrl="app.nexthireconsulting.com/resume-builder" draggable>
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <AppSidebar activeNav={rbNav} setActiveNav={setRbNav} />
                <ResumeBuilderContent />
              </div>
            </MacDesktop>
          </div>
          <div className="nh-rb-showcase__right">
            <div>
              <h3 style={{ fontFamily: FONT, fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 500, color: '#0A1217', lineHeight: 1.35, letterSpacing: '-0.01em', margin: '0 0 6px' }}>
                Builds your resume, optimizes it automatically
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 400, color: 'rgba(10,18,23,0.55)', lineHeight: 1.55, letterSpacing: '-0.005em', margin: '0 0 20px' }}>
                AI scans the job description, tailors keywords, and restructures your resume so it passes ATS filters and lands on the recruiter&apos;s desk.
              </p>
              <a href="https://app.nexthireconsulting.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: '#2e7d4f', textDecoration: 'none' }}>
                Try Resume Builder <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f5f5f0', padding: 'clamp(48px, 8vw, 80px) 0', overflowX: 'clip' }}>
        <div className="nh-rb-showcase__inner nh-rb-showcase__inner--reverse">
          <div className="nh-rb-showcase__right">
            <div>
              <h3 style={{ fontFamily: FONT, fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 500, color: '#0A1217', lineHeight: 1.35, letterSpacing: '-0.01em', margin: '0 0 6px' }}>
                Applies to hundreds of jobs while you sleep
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 400, color: 'rgba(10,18,23,0.55)', lineHeight: 1.55, letterSpacing: '-0.005em', margin: '0 0 20px' }}>
                AI scans millions of jobs matching your profile, builds a role-specific resume for each, and submits tailored applications 24/7 — so you wake up to interview requests.
              </p>
              <a href="https://app.nexthireconsulting.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: '#2e7d4f', textDecoration: 'none' }}>
                Try AI Auto Apply <span>&rarr;</span>
              </a>
            </div>
          </div>
          <div className="nh-rb-showcase__left">
            <MacDesktop browserUrl="localhost:18789/chat" draggable>
              <AutoApplyContent />
            </MacDesktop>
          </div>
        </div>
      </section>

      <section style={{ background: '#f5f5f0', padding: 'clamp(48px, 8vw, 80px) 0 clamp(64px, 10vw, 100px)', overflowX: 'clip', position: 'relative', zIndex: 10 }}>
        <div className="nh-rb-showcase__inner">
          <div className="nh-rb-showcase__left">
            <MacDesktop browserUrl="meet.google.com/abc-defg-hij">
              <InterviewCoachContent />
            </MacDesktop>
          </div>
          <div className="nh-rb-showcase__right">
            <div>
              <h3 style={{ fontFamily: FONT, fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 500, color: '#0A1217', lineHeight: 1.35, letterSpacing: '-0.01em', margin: '0 0 6px' }}>
                Works autonomously, coaches in real-time
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 400, color: 'rgba(10,18,23,0.55)', lineHeight: 1.55, letterSpacing: '-0.005em', margin: '0 0 20px' }}>
                AI listens to interview questions as they are asked and suggests relevant, structured answers in real-time so you can respond with confidence.
              </p>
              <a href="https://app.nexthireconsulting.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: '#2e7d4f', textDecoration: 'none' }}>
                Learn about AI Interview Coach <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
