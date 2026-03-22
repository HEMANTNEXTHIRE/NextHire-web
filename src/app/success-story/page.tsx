import type { Metadata } from 'next'
import Link from 'next/link'
import DualActionCTA from '@/components/ui/DualActionCTA'
import { FONT, WEIGHT } from '@/constants/typography'

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"

export const metadata: Metadata = {
  title: 'Success Stories | NextHire For Candidates',
  description:
    'Real stories from real professionals who transformed their careers with NextHire For Candidates. See how our platform helped them land jobs at top companies.',
  openGraph: {
    title: 'Success Stories | NextHire For Candidates',
    description: 'Real stories from real professionals who transformed their careers with NextHire.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/success-story' },
}

const STATS = [
  { value: '1M+',  label: 'Professionals helped'    },
  { value: '95%',  label: 'Placement success rate'  },
  { value: '30',   label: 'Days avg to first offer' },
  { value: '40%',  label: 'Avg salary increase'     },
]

/* Each card has a variant that controls its size & visual treatment */
const CARDS = [
  /* Row 1 — col 1 wide (span 2) + col 3 + col 4 */
  {
    id: 'c1', span: '1 / 3',      /* wide */
    accent: '#5fa89e',
    tag: 'AI Auto Apply',
    quote: 'Within 3 weeks I had 5 interview calls. The AI applied to 200+ relevant roles while I slept — every application had a tailored resume. Landed a senior role with a 40% salary bump.',
    name: 'Rahul Sharma',
    role: 'Senior Software Engineer',
    company: 'FinTech Startup',
    stat: '40×', statLabel: 'more reach vs manual apply',
    dark: true,
  },
  {
    id: 'c2', span: '3 / 4',
    accent: '#3d7a72',
    tag: 'AI Interview Coach',
    quote: 'The real-time coaching during live calls was a superpower. I knew exactly what to say before the interviewer finished the question.',
    name: 'Priya Menon',
    role: 'Data Scientist',
    company: 'Global Tech Corp',
    stat: null, statLabel: null,
    dark: false,
  },
  {
    id: 'c3', span: '4 / 5',
    accent: '#5fa89e',
    tag: 'Direct Outreach',
    quote: 'Reached hiring managers directly instead of waiting for ATS. Best investment I\'ve made in my career.',
    name: 'Arjun Patel',
    role: 'Product Manager',
    company: 'E-Commerce Leader',
    stat: '3×', statLabel: 'reply rate vs cold email',
    dark: false,
  },
  /* Row 2 — col 1 + col 2 wide (span 2) + col 4 */
  {
    id: 'c4', span: '1 / 2',
    accent: '#3d7a72',
    tag: 'Resume Builder',
    quote: 'ATS was killing my applications silently. After the AI rebuilt my resume for each role, my callback rate jumped overnight.',
    name: 'Sneha Reddy',
    role: 'QA Engineer',
    company: 'SaaS Company',
    stat: '5×', statLabel: 'more interview callbacks',
    dark: false,
  },
  {
    id: 'c5', span: '2 / 4',      /* wide */
    accent: '#22c55e',
    tag: 'AI Interviewer',
    quote: 'Mock interviews calibrated to exactly my target companies. By the time I walked into the real interviews I had answered every question type before. Landed 3 offers and negotiated the best package of my career.',
    name: 'Vikram Singh',
    role: 'DevOps Engineer',
    company: 'Cloud Services Company',
    stat: '3', statLabel: 'offers received in 6 weeks',
    dark: true,
  },
  {
    id: 'c6', span: '4 / 5',
    accent: '#5fa89e',
    tag: 'Job Tracker',
    quote: 'Every application tracked, every follow-up automated. Zero dropped balls across 80+ applications.',
    name: 'Ananya Krishnan',
    role: 'AI/ML Engineer',
    company: 'Research Lab',
    stat: null, statLabel: null,
    dark: false,
  },
  /* Row 3 — col 1 + col 2 + col 3 wide (span 2) */
  {
    id: 'c7', span: '1 / 2',
    accent: '#8aada8',
    tag: 'Career Pages Jobs',
    quote: 'Found a hidden role that never appeared on any job board. The agent surfaced it from a company\'s careers page directly.',
    name: 'Deepak Nair',
    role: 'Full Stack Developer',
    company: 'Series B Startup',
    stat: null, statLabel: null,
    dark: false,
  },
  {
    id: 'c8', span: '2 / 3',
    accent: '#3d7a72',
    tag: 'Portal Optimization',
    quote: 'Ranked first for my target keywords on three major portals within two weeks. Recruiters started reaching out to me.',
    name: 'Meera Iyer',
    role: 'UX Designer',
    company: 'Product Studio',
    stat: '8×', statLabel: 'inbound recruiter contacts',
    dark: false,
  },
  {
    id: 'c9', span: '3 / 5',      /* wide */
    accent: '#5fa89e',
    tag: 'Outreach Agent',
    quote: 'Coming from a non-traditional background I thought landing a senior tech role was impossible. The outreach agent introduced me directly to three founders. One of them hired me. The team believed in my story before I even knew how to tell it.',
    name: 'Rohan Mehta',
    role: 'Growth Lead',
    company: 'AI Research Lab',
    stat: '64%', statLabel: 'email open rate achieved',
    dark: true,
  },
]

function TestimonialCard({ card }: { card: typeof CARDS[0] }) {
  return (
    <div style={{
      gridColumn: card.span,
      background: card.dark ? '#edf5f1' : '#ffffff',
      border: card.dark ? `1px solid ${card.accent}40` : '1px solid #c8dfd6',
      borderRadius: 20,
      padding: '28px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxShadow: card.dark
        ? `0 4px 24px rgba(95,168,158,0.12)`
        : '0 2px 16px rgba(37,62,66,0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    className="ss-card-hover"
    >
      {/* tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
        background: `${card.accent}18`, border: `1px solid ${card.accent}30`,
        borderRadius: 100, padding: '4px 12px',
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: card.accent, display: 'inline-block' }} />
        <span style={{ fontSize: FONT.xs, fontWeight: WEIGHT.extra, color: card.accent, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          {card.tag}
        </span>
      </div>

      {/* quote */}
      <p style={{
        fontSize: FONT.sm, lineHeight: 1.75, margin: 0, flex: 1,
        color: '#3d5a56',
        fontStyle: 'normal',
      }}>
        &ldquo;{card.quote}&rdquo;
      </p>

      {/* stat */}
      {card.stat && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: FONT.lg, fontWeight: WEIGHT.extra, color: card.accent, lineHeight: 1 }}>{card.stat}</span>
          <span style={{ fontSize: FONT.xs, color: '#8aada8', fontWeight: WEIGHT.semi, lineHeight: 1.3 }}>{card.statLabel}</span>
        </div>
      )}

      {/* author */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        paddingTop: 12, borderTop: '1px solid #ddeae4',
        marginTop: 'auto',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `${card.accent}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: FONT.sm, fontWeight: WEIGHT.extra, color: card.accent, flexShrink: 0,
        }}>
          {card.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: FONT.sm, fontWeight: WEIGHT.bold, color: '#1a3338', lineHeight: 1.2 }}>{card.name}</div>
          <div style={{ fontSize: FONT.xs, color: '#8aada8', fontWeight: WEIGHT.medium, marginTop: 2 }}>
            {card.role} · {card.company}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessStoryPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="success-story-hero" style={{
        background: '#edf5f1',
        padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 40px)', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle,rgba(95,168,158,0.2) 0%,transparent 65%)', borderRadius: '50%', top: -250, left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#c8dfd6 1px,transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(95,168,158,0.12)', border: '1px solid rgba(95,168,158,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fa89e', display: 'inline-block', boxShadow: '0 0 8px #5fa89e' }} />
            <span style={{ color: '#3d7a72', fontSize: FONT.sm, fontWeight: WEIGHT.semi, letterSpacing: '0.5px' }}>Real people. Real results.</span>
          </div>
          <h1 style={{ fontFamily: SERIF, color: '#111827', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 400, lineHeight: 1.22, margin: '0 0 20px', letterSpacing: '-0.5px' }}>
            <span style={{ display: 'block', fontFamily: SERIF, whiteSpace: 'nowrap' }}>Stories from candidates</span>
            <span style={{ display: 'block', color: '#2e7d4f', fontFamily: SERIF, whiteSpace: 'nowrap' }}>who stopped waiting.</span>
          </h1>
          <p style={{ color: '#3d5a56', fontSize: FONT.base, lineHeight: 1.75, margin: '0 0 44px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            From first AI application to signed offer — see how professionals across every role and industry used NextHire to change their trajectory.
          </p>
          <Link href="https://app.nexthireconsulting.com" className="button-primary w-button">
            Start your story →
          </Link>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #ddeae4', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="ss-stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '8px 24px',
              borderRight: i < STATS.length - 1 ? '1px solid #ddeae4' : 'none',
            }}>
              <div style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#5fa89e', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: FONT.sm, color: '#8aada8', fontWeight: WEIGHT.medium, marginTop: 7, letterSpacing: '0.3px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL CARD GRID ─────────────────────────────── */}
      <section style={{ background: '#f7faf9', padding: 'clamp(60px, 8vw, 80px) clamp(20px, 5vw, 40px) clamp(72px, 10vw, 100px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 52, textAlign: 'center' }}>
            <h2 style={{ fontSize: FONT.lgClamp, fontWeight: WEIGHT.extra, color: '#1a3338', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              What our candidates say
            </h2>
            <p style={{ fontSize: FONT.base, color: '#8aada8', margin: 0 }}>
              Across every product — every story is real.
            </p>
          </div>

          {/* card grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 'auto',
            gap: 16,
          }} className="ss-cards-grid">
            {CARDS.map(card => (
              <TestimonialCard key={card.id} card={card} />
            ))}
          </div>

          {/* bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <p style={{ fontSize: FONT.base, color: '#8aada8', marginBottom: 20 }}>
              Join 1 million+ professionals already using NextHire
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="https://app.nexthireconsulting.com" className="button-primary w-button">
                Try for free →
              </Link>
              <Link href="/candidates" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                color: '#3d5a56', fontSize: FONT.sm, fontWeight: WEIGHT.medium,
                textDecoration: 'none', border: '1px solid #c8dfd6',
                borderRadius: 8, padding: '11px 22px', background: '#ffffff',
              }}>
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DualActionCTA
        leftTitle="YOUR STORY STARTS HERE"
        leftSubtitle="Kickstart Your Career Journey"
        leftLabel="Try for free"
        leftHref="https://app.nexthireconsulting.com"
        rightTitle="TALK TO AN EXPERT"
        rightSubtitle="Build a team that wins"
        rightLabel="Schedule Now"
        rightHref="/talk-to-an-expert"
      />
    </>
  )
}
