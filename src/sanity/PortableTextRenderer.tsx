'use client'

import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlFor } from './lib/image'
import InlineProductCTA from '@/components/ui/InlineProductCTA'

// Helper: turn heading text into a kebab-case anchor id
function headingId(children: any): string {
  const text = Array.isArray(children)
    ? children.map((c: any) => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
    : String(children ?? '')
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

// Reuse the same prose styles as the existing .nh-post-content CSS in blog/[slug]/page.tsx
const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ fontSize: 17, color: '#424d53', lineHeight: 1.8, margin: '0 0 24px' }}>{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 id={headingId(children)} style={{ fontSize: 26, fontWeight: 500, color: '#132128', margin: '44px 0 14px', lineHeight: 1.3, letterSpacing: '-0.4px', scrollMarginTop: 100 }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={headingId(children)} style={{ fontSize: 21, fontWeight: 600, color: '#132128', margin: '32px 0 10px', lineHeight: 1.35, scrollMarginTop: 100 }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '3px solid #2e7d4f', paddingLeft: 20, margin: '32px 0', fontStyle: 'italic', color: '#4b5563', fontSize: 17, lineHeight: 1.75 }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 700, color: '#132128' }}>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => (
      <code style={{ background: '#edf5f1', border: '1px solid #c8dfd6', borderRadius: 4, padding: '1px 6px', fontSize: '0.92em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{children}</code>
    ),
    highlight: ({ children }: any) => (
      <mark style={{ background: 'linear-gradient(180deg, transparent 55%, #fff3a3 55%)', padding: '0 1px', color: '#132128' }}>{children}</mark>
    ),
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d4f', textDecoration: 'underline' }}>{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul style={{ paddingLeft: 24, margin: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ paddingLeft: 24, margin: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ fontSize: 17, color: '#424d53', lineHeight: 1.7 }}>{children}</li>
    ),
    number: ({ children }: any) => (
      <li style={{ fontSize: 17, color: '#424d53', lineHeight: 1.7 }}>{children}</li>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const src = value.asset.url ?? urlFor(value.asset).width(900).url()
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={value.alt ?? ''}
          style={{ width: '100%', borderRadius: 12, margin: '32px 0', objectFit: 'cover' }}
          loading="lazy"
        />
      )
    },
    table: ({ value }: any) => {
      if (!value?.rows?.length) return null
      const [headerRow, ...bodyRows] = value.rows
      return (
        <div style={{ margin: '32px 0', overflowX: 'auto', borderRadius: 10, border: '2px solid #c8dfd6' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, color: '#111827' }}>
            <thead>
              <tr style={{ background: '#edf5f1' }}>
                {headerRow?.cells?.map((cell: string, i: number) => (
                  <th
                    key={i}
                    style={{
                      borderBottom: '2px solid #c8dfd6',
                      borderRight: i < headerRow.cells.length - 1 ? '1px solid #c8dfd6' : 'none',
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#1a3338',
                    }}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row: any, rowIndex: number) => (
                <tr key={row._key || rowIndex} style={{ background: rowIndex % 2 === 1 ? '#f7faf9' : '#ffffff' }}>
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      style={{
                        borderTop: rowIndex === 0 ? 'none' : '1px solid #e4f0eb',
                        borderRight: cellIndex < row.cells.length - 1 ? '1px solid #e4f0eb' : 'none',
                        padding: '12px 16px',
                        color: '#424d53',
                        lineHeight: 1.6,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    relatedPostInline: ({ value }: any) => {
      const p = value?.post
      if (!p?.slug) return null
      const label = value?.label || 'Related article'
      return (
        <aside style={{
          display: 'flex', gap: 18, alignItems: 'center',
          background: '#edf5f1',
          border: '1.5px solid #c8dfd6',
          borderRadius: 14,
          padding: 18,
          margin: '36px 0',
          textDecoration: 'none',
        }}>
          {p.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.heroImage} alt="" loading="lazy" style={{
              width: 96, height: 96, objectFit: 'cover',
              borderRadius: 10, flexShrink: 0,
            }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
              color: '#2e7d4f', textTransform: 'uppercase', marginBottom: 6,
            }}>
              {label}
            </div>
            <Link href={`/blog/${p.slug}`} style={{
              fontSize: 17, fontWeight: 600, color: '#132128',
              textDecoration: 'none', lineHeight: 1.35, letterSpacing: '-0.2px',
              display: 'block', marginBottom: 4,
            }}>
              {p.title}
            </Link>
            {p.readTime && (
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{p.readTime}</div>
            )}
          </div>
        </aside>
      )
    },
    productCta: ({ value }: any) => (
      <InlineProductCTA
        label={value?.label}
        title={value?.title}
        description={value?.description}
        buttonLabel={value?.buttonLabel}
        href={value?.href}
      />
    ),
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
}

export default function PortableTextRenderer({ value }: Props) {
  return <PortableText value={value} components={components} />
}
