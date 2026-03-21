import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  // Pre-render known org slugs used by the live site / job search
  return [
    { slug: 'ai-interviewer-org' },
    // Add more org slugs here as needed for static export
  ]
}

export const metadata: Metadata = {
  title: 'Organization | NextHire For Candidates',
  description:
    'Explore career opportunities. NextHire connects you with verified jobs and HRs across top companies.',
}

export default async function OrganizationPage({ params }: Props) {
  const { slug } = await params
  const displayName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <section
      className="key-resource-cta-section-inner"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <h1 style={{ color: 'var(--color--kale)', marginBottom: '16px', fontSize: '2rem' }}>
          {displayName}
        </h1>
        <p style={{ color: 'var(--color--nandor)', marginBottom: '32px', lineHeight: 1.6 }}>
          Explore opportunities and get connected with verified jobs at top companies through NextHire For Candidates.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/candidates/" className="button-primary">
            Explore For Candidates
          </Link>
          <Link href="/contact-us/" className="button-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
