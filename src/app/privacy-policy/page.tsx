import type { Metadata } from 'next'
import { getLegalPageBySlug } from '@/lib/legalData'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const page = getLegalPageBySlug('privacy-policy')
  if (!page) return {}
  return {
    title: page.title,
    description: page.subtitle,
    alternates: { canonical: 'https://www.nexthireconsulting.com/privacy-policy' },
  }
}

export default function Page() {
  const page = getLegalPageBySlug('privacy-policy')
  if (!page) notFound()

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg,#b8d4ce 0%,#ffffff 100%)', padding: '140px 40px 60px', textAlign: 'center' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 800, color: '#253e42', margin: '0 0 16px', lineHeight: 1.1 }}>{page.title}</h1>
          {page.subtitle && <p style={{ fontSize: '20px', color: '#3d5a56', margin: '0 0 24px', lineHeight: 1.6 }}>{page.subtitle}</p>}
          <p style={{ fontSize: '14px', color: '#a0a0a0' }}>Last updated: {page.lastUpdated}</p>
        </div>
      </section>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px 100px' }} className="legal-page-content">
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
      <style>{`
        .legal-page-content h2 { font-size: 28px; font-weight: 700; color: #253e42; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #b8d4ce; }
        .legal-page-content h3 { font-size: 20px; font-weight: 700; color: #253e42; margin: 28px 0 12px; }
        .legal-page-content p { font-size: 17px; color: #3d5a56; line-height: 1.8; margin: 0 0 16px; }
        .legal-page-content ul, .legal-page-content ol { font-size: 17px; color: #3d5a56; line-height: 1.8; padding-left: 24px; margin: 0 0 20px; }
        .legal-page-content li { margin-bottom: 8px; }
        .legal-page-content strong { color: #253e42; }
      `}</style>
    </>
  )
}
