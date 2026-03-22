'use client'

import { useRef, useCallback, useEffect } from 'react'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

/* ─── Types ─────────────────────────────────────────────────────── */
interface BaseCell { col?: string; row?: string }

interface FeatureItem extends BaseCell {
  type: 'feature'; tag: string; heading: string; body: string
  stat?: string; statLabel?: string
}
interface VideoItem extends BaseCell {
  type: 'video'; poster: string; videoSrc: string
  brand?: string; caption: string; sub: string
}
interface StatItem extends BaseCell {
  type: 'stat'; company: string; metric: string
}
interface FeatureHighlightItem extends BaseCell {
  type: 'highlight'; accent?: string; heading: string; bullets: string[]
}

export type ShowcaseCell = FeatureItem | VideoItem | StatItem | FeatureHighlightItem

interface Props {
  heading?: string
  headingLine2?: string
  cells?: ShowcaseCell[]
}

/* ─── VideoCard ────────────────────────────────────────────────── */
function VideoCard({ item, onPlay }: { item: VideoItem; onPlay: (src: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPlay(item.videoSrc)}
      style={{
        gridColumn: item.col, gridRow: item.row,
        position: 'relative', cursor: 'pointer',
        border: 'none', padding: 0, margin: 0,
        background: '#0d1a1e', borderRadius: '14px', overflow: 'hidden',
        display: 'block', width: '100%', height: '100%',
        textAlign: 'left', alignSelf: 'stretch',
      }}
    >
      <img
        src={item.poster} alt={item.caption} loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', pointerEvents: 'none', display: 'block',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.65) 100%)',
      }} />
      {item.brand && (
        <span style={{
          position: 'absolute', top: 14, left: 14, zIndex: 1,
          fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: '#fff', pointerEvents: 'none',
        }}>{item.brand}</span>
      )}
      <div style={{
        position: 'absolute', bottom: 54, left: 14, right: 14, zIndex: 1,
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: '#fff' }}>{item.caption}</div>
        <div style={{ fontSize: FONT.xs, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{item.sub}</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 14, left: 14, zIndex: 1,
        display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
            <path d="M0.5 0.5L8.5 5.5L0.5 10.5V0.5Z" fill="white"/>
          </svg>
        </div>
        <span style={{ fontSize: FONT.sm, fontWeight: WEIGHT.semi, color: '#fff' }}>Watch</span>
      </div>
    </button>
  )
}

/* ─── FeatureCard ─────────────────────────────────────────────── */
function FeatureCard({ item }: { item: FeatureItem }) {
  return (
    <div style={{
      gridColumn: item.col, gridRow: item.row,
      background: '#ffffff', border: '1px solid #c8dfd6',
      borderRadius: '14px', padding: '24px 22px',
      display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden',
    }}>
      <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#5fa89e' }}>
        {item.tag}
      </span>
      <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: '#253e42', lineHeight: 1.38 }}>{item.heading}</div>
      <p style={{ fontSize: FONT.sm, color: '#3d5a56', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
      {item.stat && (
        <div style={{
          marginTop: 'auto', paddingTop: 12,
          display: 'flex', alignItems: 'baseline', gap: 6,
        }}>
          <span style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: '#5fa89e', lineHeight: 1, flexShrink: 0 }}>{item.stat}</span>
          {item.statLabel && (
            <span style={{ fontSize: FONT.xs, color: '#8aada8', lineHeight: 1.4 }}>{item.statLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── StatCard ────────────────────────────────────────────────── */
function StatCard({ item }: { item: StatItem }) {
  return (
    <div style={{
      gridColumn: item.col, gridRow: item.row,
      background: '#e4f0eb', border: '1px solid #c8dfd6',
      borderRadius: '14px', padding: '24px 22px',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: '#253e42', lineHeight: 1.1, marginBottom: 10, letterSpacing: '-0.5px' }}>
        {item.company}
      </div>
      <div style={{ fontSize: FONT.xs, fontWeight: WEIGHT.semi, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#8aada8', lineHeight: 1.5 }}>
        {item.metric}
      </div>
    </div>
  )
}

/* ─── FeatureHighlightCard ────────────────────────────────────── */
function FeatureHighlightCard({ item }: { item: FeatureHighlightItem }) {
  return (
    <div style={{
      gridColumn: item.col, gridRow: item.row,
      background: '#edf5f1', border: '1px solid #c8dfd6',
      borderRadius: '14px', padding: '24px 22px',
      display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden',
    }}>
      {item.accent && (
        <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.bold, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#5fa89e' }}>
          {item.accent}
        </span>
      )}
      <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: '#253e42', lineHeight: 1.38 }}>{item.heading}</div>
      <p style={{ fontSize: FONT.sm, color: '#3d5a56', lineHeight: 1.65, margin: 0 }}>
        {item.bullets.join(' ')}
      </p>
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────────── */
export default function ProductShowcase({ heading, headingLine2, cells }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = useCallback((src: string) => {
    const dlg = dialogRef.current
    const vid = videoRef.current
    if (!dlg || !vid) return
    vid.src = src
    vid.load()
    dlg.showModal()
    vid.play().catch(() => {})
  }, [])

  const handleClose = useCallback(() => {
    const vid = videoRef.current
    if (vid) {
      vid.pause()
      vid.removeAttribute('src')
      vid.load()
    }
    dialogRef.current?.close()
  }, [])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onCancel = () => handleClose()
    dlg.addEventListener('cancel', onCancel)
    return () => dlg.removeEventListener('cancel', onCancel)
  }, [handleClose])

  return (
    <section id="product-showcase" className="testimonials-grid-section" style={{ padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)', background: '#edf5f1' }}>
      <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
        {(heading || headingLine2) && (
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'normal',
            color: '#111827',
            margin: '0 0 56px',
            textAlign: 'center',
            lineHeight: 1.22,
            letterSpacing: '-0.5px',
            fontSynthesis: 'none',
          }}>
            {headingLine2 ? (
              <>
                <span style={{ display: 'block', fontFamily: SERIF }}>{heading}</span>
                <span style={{ display: 'block', fontFamily: SERIF }}>{headingLine2}</span>
              </>
            ) : (
              heading
            )}
          </h2>
        )}

        <div className="testimonials-grid">
          {(cells ?? []).map((cell, i) => {
            if (cell.type === 'feature')   return <FeatureCard          key={i} item={cell} />
            if (cell.type === 'video')     return <VideoCard            key={i} item={cell} onPlay={handlePlay} />
            if (cell.type === 'stat')      return <StatCard             key={i} item={cell} />
            if (cell.type === 'highlight') return <FeatureHighlightCard key={i} item={cell} />
            return null
          })}
        </div>
      </div>

      {/* Shared video dialog */}
      <dialog
        ref={dialogRef}
        onClick={e => { if (e.target === dialogRef.current) handleClose() }}
        style={{
          border: 'none', padding: 0, margin: 'auto',
          background: 'transparent', maxWidth: '96vw', width: 960,
          borderRadius: 12, overflow: 'visible',
        }}
      >
        <div style={{ position: 'relative', background: '#000', borderRadius: 12, overflow: 'hidden' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              position: 'absolute', top: 10, right: 10, zIndex: 10,
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', color: '#fff',
              fontSize: FONT.lg, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >×</button>
          <video
            ref={videoRef}
            controls
            playsInline
            preload="none"
            style={{ display: 'block', width: '100%', maxHeight: '85vh', background: '#000' }}
          />
        </div>
      </dialog>
    </section>
  )
}
