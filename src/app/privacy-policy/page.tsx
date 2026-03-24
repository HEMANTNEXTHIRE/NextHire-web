import type { Metadata } from 'next'
import LegalPageShell from '@/components/layout/LegalPageShell'
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
    <LegalPageShell
      title={page.title}
      subtitle={page.subtitle}
      lastUpdated={page.lastUpdated}
      html={page.content}
    />
  )
}
