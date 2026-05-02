import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ResumeBuilderShowcase from '@/components/sections/ResumeBuilderShowcase'
import HireSection from '@/components/sections/HireSection'
import ProductShowcase from '@/components/sections/ProductShowcase'
import type { ShowcaseCell } from '@/components/sections/ProductShowcase'
import DualActionCTA from '@/components/ui/DualActionCTA'
import CalBookingButton from '@/components/ui/CalBookingButton'

export const metadata: Metadata = {
  title: 'NextHire | Your AI Job Search Agent — Get Hired Faster',
  description:
    'Escape the apply and pray cycle. AI scans millions of jobs, applies on your behalf, and introduces you to hiring managers directly',
  openGraph: {
    title: 'NextHire | Your AI Job Search Agent',
    description:
      'Escape the apply and pray cycle. AI scans millions of jobs, applies on your behalf, and introduces you to hiring managers directlty',
    url: 'https://www.nexthireconsulting.com',
  },
  twitter: {
    title: 'NextHire | Your AI Job Search Agent',
    description:
      'Escape the apply and pray cycle. AI scans millions of jobs, applies on your behalf, and introduces you to hiring managers directly',
  },
  alternates: {
    canonical: 'https://www.nexthireconsulting.com',
  },
}

const SHOWCASE_CELLS: ShowcaseCell[] = [
  /*
   * 5-column grid, 3 rows, 12 cards total.
   * Card 2 in every row spans columns 2-3 (wider breadth, same height).
   *
   *  col:  1              2──────3 (span2)      4                5
   *  row1: Highlight      VIDEO (wide)           Stat             Feature
   *  row2: Feature        Highlight (wide)       Video            Stat
   *  row3: Stat           VIDEO (wide)           Feature          Highlight
   */

  /* ── ROW 1 ─────────────────────────────────────────── */
  {
    type: 'highlight', col: '1', row: '1',
    accent: 'Hidden Roles',
    heading: 'Jobs that never get posted publicly',
    bullets: [
      'The agent scans hiring signals — tenure gaps, team growth, skill needs — to find roles before they go live on any job board.',
    ],
  },
  {
    type: 'video', col: '2 / 4', row: '1',
    poster: '/Image/Vid3.png',
    videoSrc: '/Image/Vid3.mp4',
    brand: 'NextHire',
    caption: 'AI Auto Apply in action',
    sub: 'Targeting · Applying · Tracking',
  },
  /* Stat: top = company, bottom = metric */
  {
    type: 'stat', col: '4', row: '1',
    company: 'AI Outreach',
    metric: '3× reply rate vs cold email average',
  },
  {
    type: 'feature', col: '5', row: '1',
    tag: 'Resume Builder',
    heading: 'ATS-optimised for every role',
    body: 'AI drafts it. Experts review it. Tuned to the job description — keywords, structure, tone.',
  },

  /* ── ROW 2 ─────────────────────────────────────────── */
  {
    type: 'feature', col: '1', row: '2',
    tag: 'AI Auto Apply',
    heading: 'Hundreds of roles, zero manual effort',
    body: 'Role-specific resume per application. Precision targeting, not spray-and-pray.',
    stat: '40×', statLabel: 'more reach vs manual',
  },
  {
    type: 'highlight', col: '2 / 4', row: '2',
    accent: 'Direct Outreach',
    heading: 'Personalised emails to hiring managers, sent from your own Gmail',
    bullets: [
      'Built on real signals: role gaps, LinkedIn activity, team growth. Auto-deleted after delivery. CASA Level 3 certified.',
    ],
  },
  {
    type: 'video', col: '4', row: '2',
    poster: '/Image/Vid1.png',
    videoSrc: '/Image/Vid1.mp4',
    brand: 'NextHire',
    caption: 'Outreach Agent demo',
    sub: 'Gmail API · CASA L3',
  },
  {
    type: 'stat', col: '5', row: '2',
    company: '1M+',
    metric: 'verified HRs & hiring managers in our network',
  },

  /* ── ROW 3 ─────────────────────────────────────────── */
  {
    type: 'stat', col: '1', row: '3',
    company: 'Interview Copilot',
    metric: '75% offer rate reported after using Copilot',
  },
  {
    type: 'video', col: '2 / 4', row: '3',
    poster: '/Image/Vid4.png',
    videoSrc: '/Image/Vid4.mp4',
    brand: 'NextHire',
    caption: 'Interview Copilot live',
    sub: 'Real-time AI coaching',
  },
  {
    type: 'feature', col: '4', row: '3',
    tag: 'Mock Interviews',
    heading: 'Practice calibrated to your target role',
    body: 'Score-by-score feedback on structure, clarity, and answer quality before the real call.',
  },
  {
    type: 'highlight', col: '5', row: '3',
    accent: 'Interview Tracker',
    heading: 'Every application and interview in one dashboard',
    bullets: [
      'Track outreach, applications, and interviews in one place. Follow-up reminders so nothing falls through.',
    ],
  },
]

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — tagline, CTAs, stats */}
      <HeroSection />

      {/* 2. How the Agent Works — 4-step flow with platform mockup */}
      <HowItWorksSection />

      {/* 3. Product showcases — Resume Builder, AI Auto Apply, Interview Coach */}
      <ResumeBuilderShowcase />

      {/* 4. Full feature suite — 6 AI-powered tools */}
      <HireSection />

      {/* 6. Social proof — mixed grid: video + quote + stat cards */}
      <ProductShowcase
        heading="The fastest way from"
        headingLine2="job search to job offer"
        cells={SHOWCASE_CELLS}
      />

      {/* 7. Dual CTA: Get Started / Talk to an Expert */}
      <DualActionCTA />

      {/* Cal.com floating button */}
      <CalBookingButton />
    </>
  )
}
