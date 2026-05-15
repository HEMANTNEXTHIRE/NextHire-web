/**
 * Pricing source-of-truth. Read by: PricingPageClient, llms.txt generator,
 * Offer schema, layout SoftwareApplication offer. Keep numbers here in sync
 * with the in-product billing system; everything else derives from this file.
 */

export type Region = 'IN' | 'US'
export type BillingCycle = 'monthly' | 'quarterly'

export interface TierPrice {
  monthly: number
  quarterly: number       // per-month rate when billed quarterly
  quarterlyTotal: number  // single quarterly invoice
}

export interface CandidateTier {
  id: 'free' | 'lite' | 'pro' | 'max'
  name: string
  tagline: string
  description: string
  features: string[]
  inr: TierPrice
  usd: TierPrice
}

export const CANDIDATE_TIERS: CandidateTier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Get visible to top recruiters for free',
    description: 'Join the talent network',
    features: [
      'Resume and cover letter builders',
      'Job Tracker and profile optimization',
      'Try AI tools and automate your job search',
    ],
    inr: { monthly: 0, quarterly: 0, quarterlyTotal: 0 },
    usd: { monthly: 0, quarterly: 0, quarterlyTotal: 0 },
  },
  {
    id: 'lite',
    name: 'Lite',
    tagline: 'Let AI apply to jobs for you',
    description: 'Speed up your job search',
    features: [
      'Unlimited AI Auto Apply for career page jobs',
      'Optimize your portals for better visibility',
      '2 hours of AI Interview Coach',
    ],
    inr: { monthly: 1850, quarterly: 1665, quarterlyTotal: 4995 },
    usd: { monthly: 19.99, quarterly: 17.99, quarterlyTotal: 53.97 },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'AI helps you clear your interviews',
    description: 'Master every job interview',
    features: [
      'Real-time AI Interview Coach',
      'Unlimited AI Auto Apply to all platforms',
      'Direct recruiter Inmails to get noticed',
    ],
    inr: { monthly: 4500, quarterly: 4050, quarterlyTotal: 12150 },
    usd: { monthly: 49.99, quarterly: 44.99, quarterlyTotal: 134.97 },
  },
  {
    id: 'max',
    name: 'Max',
    tagline: 'AI finds and messages companies for you',
    description: 'Put everything on autopilot',
    features: [
      'Autonomous AI Outreach Agent',
      'Exclusive access to hidden job markets',
      'Unlimited AI Auto Apply and Interview Coach',
    ],
    inr: { monthly: 12000, quarterly: 10800, quarterlyTotal: 32400 },
    usd: { monthly: 349.99, quarterly: 314.99, quarterlyTotal: 944.97 },
  },
]

export const CHECKOUT_URL = 'https://app.nexthireconsulting.com'

export function tierPrice(tier: CandidateTier, region: Region): TierPrice {
  return region === 'IN' ? tier.inr : tier.usd
}

export function currencyFor(region: Region): { code: 'INR' | 'USD'; symbol: '₹' | '$' } {
  return region === 'IN' ? { code: 'INR', symbol: '₹' } : { code: 'USD', symbol: '$' }
}

/** Used by Offer schema and llms.txt. Returns one Offer per tier per region. */
export function offerSchemaItems() {
  const items: Array<{
    name: string
    priceCurrency: 'USD' | 'INR'
    price: number
    region: Region
    description: string
  }> = []
  for (const tier of CANDIDATE_TIERS) {
    for (const region of ['US', 'IN'] as Region[]) {
      const price = tierPrice(tier, region)
      const { code } = currencyFor(region)
      items.push({
        name: `${tier.name} (${region === 'IN' ? 'India' : 'Global'})`,
        priceCurrency: code,
        price: price.monthly,
        region,
        description: tier.tagline,
      })
    }
  }
  return items
}
