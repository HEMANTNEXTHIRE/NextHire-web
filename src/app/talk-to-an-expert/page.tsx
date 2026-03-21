import type { Metadata } from 'next'
import ExpertForm from '@/components/forms/ExpertForm'
import { CalTriggerButton } from '@/components/ui/CalBookingButton'
import CalBookingButton from '@/components/ui/CalBookingButton'
import { FONT, WEIGHT } from '@/constants/typography'

export const metadata: Metadata = {
  title: 'Talk to an Expert | NextHire For Candidates',
  description:
    'Schedule a free consultation with a NextHire career expert. Get personalized advice on your job search strategy, resume, interview preparation, and career goals.',
  openGraph: {
    title: 'Talk to an Expert | NextHire For Candidates',
    description: 'Schedule a free consultation with a NextHire career expert.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/talk-to-an-expert' },
}

export default function TalkToAnExpertPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: '#edf5f1', padding: '140px 40px 100px', textAlign: 'center' }}
      >
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <h1 style={{ fontSize: FONT.xl, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 20px', lineHeight: 1.1 }}>
            Talk to a Career Expert
          </h1>
          <p style={{ fontSize: FONT.md, color: '#3d5a56', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Get personalized guidance tailored to your career goals. Book a free 30-minute strategy session with one of our expert career advisors.
          </p>
          <CalTriggerButton
            calLink="shubham-4pkegy/30min"
            namespace="30min"
            label="Book Free Session"
            className="button-primary w-button"
          />
        </div>
      </section>

      {/* Content + Form */}
      <section style={{ padding: '100px 40px', background: '#ffffff' }}>
        <div
          className="w-layout-blockcontainer container-large-e25 w-container"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', maxWidth: '1100px' }}
        >
          <div>
            <h2 style={{ fontSize: FONT.xl, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 20px', lineHeight: 1.2 }}>
              What You&apos;ll Get
            </h2>
            <p style={{ fontSize: FONT.md, color: '#3d5a56', margin: '0 0 40px', lineHeight: 1.7 }}>
              In your free strategy session, a senior career advisor will:
            </p>

            {[
              'Review your current resume and career story',
              'Identify gaps and quick wins in your job search',
              'Map out a 30-day action plan to get interviews',
              'Explain how For Candidates can accelerate your search',
              "Answer all your questions — no sales pressure, no BS",
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '28px', height: '28px', background: '#5fa89e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: 0, lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            {/* Zcal embed */}
            <div id="zcal-embed" style={{ marginTop: '40px' }}>
              <a href="https://zcal.co/shubham-4pkegy/30min" data-zcal-invite="shubham-4pkegy/30min" style={{ background: '#1a3338', color: '#fff', display: 'inline-block', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: WEIGHT.bold, fontSize: FONT.base }}>
                📅 Schedule via Calendar
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <div style={{ padding: '48px 40px', border: '1px solid #c8dfd6', borderRadius: '20px', background: '#f7faf9', boxShadow: '0 8px 32px rgba(37,62,66,0.06)' }}>
              <h3 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 8px' }}>
                Request a Call Back
              </h3>
              <p style={{ fontSize: FONT.base, color: '#3d5a56', margin: '0 0 32px', lineHeight: 1.6 }}>
                Can&apos;t book right now? Leave your details and we&apos;ll reach out.
              </p>
              <ExpertForm />
            </div>
          </div>
        </div>
      </section>

      {/* Cal.com floating button */}
      <CalBookingButton />
    </>
  )
}
