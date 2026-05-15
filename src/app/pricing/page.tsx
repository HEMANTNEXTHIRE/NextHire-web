import type { Metadata } from 'next'
import PricingPageClient from '@/components/sections/PricingPageClient'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { CANDIDATE_TIERS, tierPrice, CHECKOUT_URL } from '@/lib/pricing'
import { PRICING_FAQS_CANDIDATES } from '@/constants/pricingFaqs'

const PRICING_URL = 'https://www.nexthireconsulting.com/pricing'

export const metadata: Metadata = {
  title: 'Pricing | NextHire — Plans for Candidates',
  description:
    'Simple, transparent pricing for job seekers. Free forever plan plus Lite, Pro, and Max tiers. Region-aware pricing for India (INR) and global (USD).',
  openGraph: {
    title: 'NextHire Pricing — Plans for Candidates',
    description: 'Free forever plan plus Lite, Pro, and Max. Region-aware pricing for India and global.',
    url: PRICING_URL,
  },
  alternates: { canonical: PRICING_URL },
}

// Use Service (not Product) — SaaS subscriptions are services, not physical goods.
// Avoids Google's "Merchant listings" validator path which requires shipping/returns.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'NextHire — AI Job Search Agent',
  description:
    'AI-powered career platform. Automates job applications, builds ATS-optimized resumes, runs personalised recruiter outreach, and coaches candidates through interviews in real time.',
  serviceType: 'AI Job Search Platform',
  provider: {
    '@type': 'Organization',
    name: 'NextHire Consulting',
    url: 'https://www.nexthireconsulting.com',
  },
  areaServed: ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG'],
  offers: CANDIDATE_TIERS.map(tier => {
    const usd = tierPrice(tier, 'US')
    return {
      '@type': 'Offer',
      name: tier.name,
      description: tier.tagline,
      price: usd.monthly.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: CHECKOUT_URL,
      category: 'subscription',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: usd.monthly.toFixed(2),
        priceCurrency: 'USD',
        unitText: 'MONTH',
        billingDuration: 'P1M',
      },
    }
  }),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nexthireconsulting.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: PRICING_URL },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQS_CANDIDATES.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
