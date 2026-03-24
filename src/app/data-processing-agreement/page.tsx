import type { Metadata } from 'next'
import LegalPageShell from '@/components/layout/LegalPageShell'
import { getLegalPageBySlug } from '@/lib/legalData'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const page = getLegalPageBySlug('data-processing-agreement')
  if (!page) return {}
  return {
    title: page.title,
    description: page.subtitle,
    alternates: { canonical: 'https://www.nexthireconsulting.com/data-processing-agreement' },
  }
}

export default function Page() {
  const page = getLegalPageBySlug('data-processing-agreement')
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
