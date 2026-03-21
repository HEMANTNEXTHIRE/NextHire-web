import type { Metadata } from 'next'
import Link from 'next/link'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

export const metadata: Metadata = {
  title: 'About NextHire | Career Growth & Job Placement Platform',
  description:
    "Learn about NextHire's mission, leadership, and our commitment to transforming careers. We combine AI-powered tools with human expertise to help professionals land their dream jobs.",
  openGraph: {
    title: 'About NextHire | Career Growth Platform',
    description: "Learn about NextHire's mission and leadership team.",
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/about-nexthire' },
}

const VALUES = [
  { title: 'Integrity First', desc: 'We are transparent about our process, pricing, and results. No hidden fees, no empty promises.', icon: '🤝' },
  { title: 'Results Driven', desc: 'We only succeed when you succeed. Fixed, transparent pricing keeps us fully accountable.', icon: '🎯' },
  { title: 'Human + AI', desc: 'We combine cutting-edge AI tools with the empathy and expertise of real career advisors.', icon: '🤖' },
  { title: 'Continuous Support', desc: 'We stay with you from application to acceptance — and beyond.', icon: '🔗' },
]

const MILESTONES = [
  { year: '2021', title: 'Founded', desc: 'NextHire was born from a frustration with outdated recruiting processes.' },
  { year: '2022', title: '1,000 Placements', desc: 'Crossed 1,000 successful placements within the first year of operations.' },
  { year: '2023', title: 'AI Integration', desc: 'Launched AI-powered resume optimization and job matching platform.' },
  { year: '2024', title: '200K+ Professionals', desc: 'Expanded globally, helping over 200,000 professionals advance their careers.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section id="about-hero" style={{ background: '#edf5f1', padding: '110px 40px 110px', textAlign: 'center' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ display: 'inline-block', background: 'rgba(95,168,158,0.12)', color: '#3d7a72', padding: '8px 20px', borderRadius: '20px', fontSize: FONT.sm, fontWeight: WEIGHT.bold, marginBottom: '24px', letterSpacing: '1px' }}>
            ABOUT NEXTHIRE
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, fontStyle: 'normal', margin: '0 0 24px', lineHeight: 1.22, letterSpacing: '-0.5px', fontSynthesis: 'none' }}>
            <span style={{ display: 'block', color: '#111827', fontFamily: SERIF }}>We&apos;re on a Mission to</span>
            <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF }}>Democratize Career Growth</span>
          </h1>
          <p style={{ fontSize: FONT.lg, color: '#3d5a56', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            NextHire was founded with a simple belief: everyone deserves access to the tools, connections, and guidance needed to land the job they truly want.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '100px 40px', background: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 24px', lineHeight: 1.2 }}>
                Our Mission
              </h2>
              <p style={{ fontSize: FONT.md, color: '#3d5a56', margin: '0 0 24px', lineHeight: 1.7 }}>
                NextHire exists to give every job seeker an unfair advantage. We combine the power of AI with human expertise to make job searching faster, smarter, and less stressful.
              </p>
              <p style={{ fontSize: FONT.md, color: '#3d5a56', margin: '0 0 40px', lineHeight: 1.7 }}>
                Our team of ex-FAANG recruiters, career coaches, and technologists have built a platform that doesn&apos;t just help you find jobs — it helps you <strong>get hired</strong>.
              </p>
              <Link href="/contact-us" className="button-primary w-button">
                Join NextHire Today
              </Link>
            </div>
            <div style={{ background: '#edf5f1', border: '1px solid #c8dfd6', borderRadius: '24px', padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: FONT.xl, fontWeight: WEIGHT.extra, lineHeight: 1, color: '#5fa89e' }}>200K+</div>
              <div style={{ fontSize: FONT.lg, fontWeight: WEIGHT.semi, margin: '16px 0 8px', color: '#1a3338' }}>Careers Transformed</div>
              <div style={{ fontSize: FONT.base, color: '#7a9e99', lineHeight: 1.6 }}>Across 50+ countries and 1,000+ companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 40px', background: '#f7faf9' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: 0 }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '30px' }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ padding: '40px 32px', background: '#ffffff', borderRadius: '16px', border: '1px solid #ddeae4', boxShadow: '0 4px 20px rgba(37,62,66,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: FONT.lg, marginBottom: '20px' }}>{v.icon}</div>
                <h3 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontSize: FONT.base, color: '#3d5a56', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 40px', background: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: 0 }}>Our Journey</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '30px' }}>
            {MILESTONES.map((m) => (
              <div key={m.year} style={{ padding: '36px 28px', border: '2px solid #c8dfd6', borderRadius: '16px', position: 'relative', background: '#f7faf9' }}>
                <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: '#5fa89e', letterSpacing: '1px', marginBottom: '8px' }}>{m.year}</div>
                <h3 style={{ fontSize: FONT.lg, fontWeight: WEIGHT.bold, color: '#1a3338', margin: '0 0 12px' }}>{m.title}</h3>
                <p style={{ fontSize: FONT.base, color: '#3d5a56', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DualActionCTA />
    </>
  )
}
