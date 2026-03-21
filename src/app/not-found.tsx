import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Page Not Found | NextHire',
  description: "The page you're looking for doesn't exist. Find your next opportunity with NextHire.",
}

export default function NotFound() {
  return (
    <section
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', background: 'linear-gradient(135deg,#0a0e27 0%,#173b3f 100%)', textAlign: 'center' }}
    >
      <div>
        <div style={{ fontSize: '120px', fontWeight: 900, color: '#0fddcc', lineHeight: 1, marginBottom: '16px', opacity: 0.8 }}>
          404
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#fff', margin: '0 0 20px', lineHeight: 1.2 }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on track to finding your dream job.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="button-primary w-button" style={{ background: '#0fddcc', color: '#173b3f', fontWeight: 700 }}>
            Go to Homepage
          </Link>
          <Link href="/contact-us" className="button-secondary w-button" style={{ border: '2px solid rgba(255,255,255,0.4)', color: '#fff', background: 'transparent' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
