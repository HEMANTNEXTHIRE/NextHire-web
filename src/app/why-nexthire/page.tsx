import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextHire for Companies',
  robots: { index: false, follow: false },
  // HTTP-equiv redirect for crawlers that don't run JS
  other: { 'http-equiv': 'refresh', content: '0; url=/companies/' },
}

export { default } from './RedirectClient'
