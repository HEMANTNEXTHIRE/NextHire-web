import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import { FONT, WEIGHT } from '@/constants/typography'

export const metadata: Metadata = {
  title: 'Contact Us | NextHire For Candidates',
  description:
    'Get in touch with the NextHire For Candidates team. Whether you are a job seeker, looking to hire, or interested in a career at NextHire, we are here to help.',
  openGraph: {
    title: 'Contact Us | NextHire For Candidates',
    description: 'Get in touch with the NextHire For Candidates team.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/contact-us' },
}

const CONTACT_INFO = [
  {
    icon: '📍',
    title: 'Visit Us',
    detail: 'Bengaluru, Karnataka, India',
  },
  {
    icon: '✉️',
    title: 'Email Us',
    detail: 'info@nexthireconsulting.com',
    href: 'mailto:info@nexthireconsulting.com',
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    detail: 'Algotale on LinkedIn',
    href: 'https://www.linkedin.com/company/algotale/',
    external: true,
  },
]

export default function ContactUsPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: '#edf5f1', padding: '140px 40px 80px', textAlign: 'center' }}
      >
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <h1 style={{ fontSize: FONT.xl, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 20px', lineHeight: 1.1 }}>
            Let&apos;s Talk
          </h1>
          <p style={{ fontSize: FONT.md, color: '#3d5a56', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Whether you&apos;re a job seeker, recruiter, or just curious — we&apos;re happy to connect.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '80px 40px', background: '#ffffff' }}>
        <div
          className="w-layout-blockcontainer container-large-e25 w-container"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', maxWidth: '1100px' }}
        >
          {/* Contact form */}
          <div>
            <h2 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 8px' }}>
              Send us a message
            </h2>
            <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: '0 0 32px', lineHeight: 1.6 }}>
              Fill out the form and our team will respond within 1 business day.
            </p>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div>
            <h2 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 8px' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: '0 0 40px', lineHeight: 1.6 }}>
              We&apos;d love to hear from you. Here&apos;s how you can reach us.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {CONTACT_INFO.map((c) => (
                <div
                  key={c.title}
                  style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', border: '1px solid #c8dfd6', borderRadius: '12px', background: '#f7faf9' }}
                >
                  <div style={{ fontSize: FONT.lg, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: FONT.base, fontWeight: WEIGHT.bold, color: '#1a3338', marginBottom: '4px' }}>{c.title}</div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        style={{ fontSize: FONT.base, color: '#5fa89e', textDecoration: 'none', fontWeight: WEIGHT.medium }}
                      >
                        {c.detail}
                      </a>
                    ) : (
                      <div style={{ fontSize: FONT.base, color: '#3d5a56' }}>{c.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div
              style={{ marginTop: '40px', padding: '32px', background: '#edf5f1', border: '1px solid #c8dfd6', borderRadius: '16px', textAlign: 'center' }}
            >
              <h3 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, margin: '0 0 12px', color: '#1a3338' }}>
                Ready to get hired?
              </h3>
              <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: '0 0 20px', lineHeight: 1.6 }}>
                Start your career transformation today with simple, fixed pricing.
              </p>
              <a
                href="https://app.nexthireconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary w-button"
              >
                Try for free →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
