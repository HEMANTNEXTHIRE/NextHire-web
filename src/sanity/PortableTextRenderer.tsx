'use client'

import { PortableText } from '@portabletext/react'
import { urlFor } from './lib/image'

// Reuse the same prose styles as the existing .nh-post-content CSS in blog/[slug]/page.tsx
const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ fontSize: 17, color: '#424d53', lineHeight: 1.8, margin: '0 0 24px' }}>{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontSize: 26, fontWeight: 500, color: '#132128', margin: '44px 0 14px', lineHeight: 1.3, letterSpacing: '-0.4px' }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontSize: 21, fontWeight: 600, color: '#132128', margin: '32px 0 10px', lineHeight: 1.35 }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '3px solid #2e7d4f', paddingLeft: 20, margin: '32px 0', fontStyle: 'italic', color: '#4b5563', fontSize: 17, lineHeight: 1.75 }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 700, color: '#132128' }}>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
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
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
}

export default function PortableTextRenderer({ value }: Props) {
  return <PortableText value={value} components={components} />
}
