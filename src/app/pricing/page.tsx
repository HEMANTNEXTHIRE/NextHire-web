import type { Metadata } from 'next'
import PricingPageClient from '@/components/sections/PricingPageClient'
import DualActionCTA from '@/components/ui/DualActionCTA'

export const metadata: Metadata = {
  title: 'Pricing | NextHire — Plans for Candidates & Companies',
  description:
    'Simple, transparent pricing for job seekers and hiring teams. Candidate plans from free to $135/mo. Company plans including a free tier and full Enterprise suite.',
  openGraph: {
    title: 'NextHire Pricing | For Candidates & Companies',
    description: 'Free to pro plans for job seekers. Enterprise AI recruiting platform for companies.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/pricing' },
}

export default function PricingPage() {
  return (
    <>
      <PricingPageClient />
      <DualActionCTA
        leftTitle="GET STARTED"
        leftSubtitle="Kickstart Your Career Journey"
        leftLabel="Try for free"
        leftHref="https://app.nexthireconsulting.com"
        rightTitle="TALK TO AN EXPERT"
        rightSubtitle="Build a team that wins"
        rightLabel="Schedule Now"
        rightHref="/contact-us"
      />
    </>
  )
}
