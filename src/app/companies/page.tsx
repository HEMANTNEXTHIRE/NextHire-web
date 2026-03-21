import type { Metadata } from 'next'
import CompaniesPageClient from '@/components/sections/CompaniesPageClient'
import DualActionCTA from '@/components/ui/DualActionCTA'

export const metadata: Metadata = {
  title: 'For Companies | NextHire — AI Recruiting Platform',
  description:
    'Five AI agents for sourcing, screening, SMS, video interviews, and outreach. Hire faster with 800M+ profiles and 50+ ATS integrations.',
  openGraph: {
    title: 'NextHire for Companies',
    description: 'AI-powered recruiting: sourcing, phone screening, outreach, and more — in one platform.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/companies' },
}

export default function CompaniesPage() {
  return (
    <>
      <CompaniesPageClient />
      <DualActionCTA
        leftTitle="GET STARTED"
        leftSubtitle="Build a team that wins"
        leftLabel="Start hiring free"
        leftHref="https://app.nexthireconsulting.com"
        rightTitle="TALK TO AN EXPERT"
        rightSubtitle="Let our team walk you through the platform"
        rightLabel="Book a demo"
        rightHref="/contact-us"
      />
    </>
  )
}
