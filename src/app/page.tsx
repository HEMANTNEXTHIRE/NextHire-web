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
    answer: 'The agent applies to 40× more roles than humanly possible, discovers opportunities that are never publicly posted, and reaches out directly to the hiring manager at the same time, bypassing the ATS black hole altogether.',
  },
  {
    question: 'Is the outreach really from my email?',
    answer: 'Yes. Emails are sent from your own Gmail identity using Google APIs, and are automatically deleted from your Sent folder after delivery. Recruiter contacts are never publicly exposed. This approach is CASA Level 3 certified.',
  },
  {
    question: 'When do I pay?',
    answer: 'NextHire keeps pricing simple and fixed, with no success fees and no hidden charges. You know exactly what you pay upfront, and our team is fully incentivised to get you placed as fast as possible.',
  },
  {
    question: 'What roles and industries does this work for?',
    answer: 'Whether you are in tech, product, design, finance, marketing, or operations, the platform has you covered. The outreach and application approach is customised to fit your industry and where you are in your career.',
  },
  {
    question: 'How long until I see results?',
    answer: 'Most users see their first outreach replies within 48–72 hours. Interview calls typically start appearing in the first 2 weeks. Offers typically come within 4–8 weeks depending on role seniority.',
  },
]

export const metadata: Metadata = {
  title: 'NextHire | Your AI Job Search Agent. Get Hired Faster',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
