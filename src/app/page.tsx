import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import RoleLifecycleSection from '@/components/sections/RoleLifecycleSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ProductPillarsSection from '@/components/sections/ProductPillarsSection'
import ResumeBuilderShowcase from '@/components/sections/ResumeBuilderShowcase'
import HireSection from '@/components/sections/HireSection'
import AccordionFaq from '@/components/ui/AccordionFaq'
import DualActionCTA from '@/components/ui/DualActionCTA'
import CalBookingButton from '@/components/ui/CalBookingButton'

const HOME_FAQS = [
  {
    question: 'How is this different from just applying myself?',
    answer: 'The agent applies to 40× more roles than you could manually, finds unposted opportunities, and simultaneously reaches out directly to the hiring manager — not just submitting to an ATS black hole.',
  },
  {
    question: 'Is the outreach really from my email?',
    answer: 'Yes. Emails are sent from your own Gmail identity using Google APIs, and are automatically deleted from your Sent folder after delivery. Recruiter contacts are never publicly exposed. This approach is CASA Level 3 certified.',
  },
  {
    question: 'When do I pay?',
    answer: 'NextHire has simple fixed pricing — no success fees, no hidden charges. You know exactly what you pay upfront, and our team is fully incentivised to get you placed fast.',
  },
  {
    question: 'What roles and industries does this work for?',
    answer: 'The platform works across all professional roles — tech, product, design, finance, marketing, operations. The outreach and application strategy is tailored to each industry and seniority level.',
  },
  {
    question: 'How long until I see results?',
    answer: 'Most users see their first outreach replies within 48–72 hours. Interview calls typically start appearing in the first 2 weeks. Offers typically come within 4–8 weeks depending on role seniority.',
  },
]

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

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — tagline, CTAs, stats + mission statement */}
      <HeroSection />

      {/* 2. Role showcase — sticky card + scrolling content items */}
      <RoleLifecycleSection />

      {/* 3. How the Agent Works — 4-step flow with platform mockup */}
      <HowItWorksSection />

      {/* 4. Why NextHire wins — pre-posting access, velocity, mastery, pipeline */}
      <ProductPillarsSection />

      {/* 5. Product showcases — Resume Builder, AI Auto Apply, Interview Coach */}
      <ResumeBuilderShowcase />

      {/* 4. Full feature suite — 6 AI-powered tools */}
      <HireSection />

      {/* 7. FAQ — negative margin pulls it over the HireSection spacer dead zone */}
      <section id="home-faq" style={{ background: '#ffffff', padding: 'clamp(72px, 10vw, 100px) 0', marginTop: 'clamp(-500px, -55vh, -300px)', position: 'relative', zIndex: 2 }}>
        <AccordionFaq title="Frequently asked questions" items={HOME_FAQS} />
      </section>

      {/* 8. Dual CTA: Get Started / Talk to an Expert */}
      <DualActionCTA />

      {/* Cal.com floating button */}
      <CalBookingButton />
    </>
  )
}
