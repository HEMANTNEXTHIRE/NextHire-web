'use client'

import { useEffect, useState } from 'react'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

interface Props {
  entries: TocEntry[]
}

export default function PostTOC({ entries }: Props) {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null)

  useEffect(() => {
    if (entries.length === 0) return
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 },
    )
    entries.forEach((e) => {
      const el = document.getElementById(e.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav aria-label="On this page" style={{ marginBottom: 28 }}>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
        color: '#9ca3af', textTransform: 'uppercase',
        margin: '0 0 14px',
      }}>
        On this page
      </p>
      <ul style={{
        listStyle: 'none', padding: 0, margin: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
        borderLeft: '1.5px solid #e4f0eb',
      }}>
        {entries.map((e) => {
          const isActive = active === e.id
          return (
            <li key={e.id} style={{ marginLeft: e.level === 3 ? 16 : 0 }}>
              <a
                href={`#${e.id}`}
                style={{
                  display: 'block',
                  fontSize: e.level === 3 ? 13 : 13.5,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#2e7d4f' : '#4b5563',
                  textDecoration: 'none',
                  padding: '4px 0 4px 14px',
                  marginLeft: -1.5,
                  borderLeft: isActive ? '2px solid #2e7d4f' : '2px solid transparent',
                  lineHeight: 1.4,
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
              >
                {e.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
