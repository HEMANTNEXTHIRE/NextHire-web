import type { Metadata } from 'next'
import Link from 'next/link'
import { interviewRoles } from '@/lib/interviewRolesData'
import DualActionCTA from '@/components/ui/DualActionCTA'

const SITE = 'https://www.nexthireconsulting.com'

export const metadata: Metadata = {
  title: 'Interview Questions by Role | NextHire',
  description:
    'Curated interview question banks by role: software engineering, product, data, frontend, and DevOps. Real questions, model answers, and a focused prep plan.',
  alternates: { canonical: `${SITE}/interview-questions` },
}

const P = {
  surface: '#ffffff',
  mint:    '#e4f0eb',
  border:  '#c8dfd6',
  accent:  '#2e7d4f',
  dark:    '#132128',
  mid:     '#4b5563',
  muted:   '#9ca3af',
  bg:      '#f7faf9',
}

export default function InterviewQuestionsHub() {
  return (
    <>
      <section style={{ background: P.surface }}>
        <div className="nh-container" style={{
          paddingTop: 'clamp(100px, 12vw, 136px)',
          paddingBottom: 56,
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, letterSpacing: '1.2px',
            color: P.accent, background: P.mint,
            border: `1px solid ${P.border}`,
            borderRadius: 999, padding: '5px 14px',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            Interview Prep
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 500, color: P.dark,
            margin: '0 0 20px',
            lineHeight: 1.12, letterSpacing: '-1.2px',
            maxWidth: 860,
          }}>
            Interview questions by role
          </h1>
          <p style={{
            fontSize: 18, color: P.mid, lineHeight: 1.6,
            maxWidth: 720, margin: 0, letterSpacing: '-0.2px',
          }}>
            Real questions, model answers, and a focused prep plan — written by people who run hiring loops, not by people who have only sat on the other side of the table.
          </p>
        </div>
      </section>

      <section style={{ background: P.bg, padding: '64px 0 96px' }}>
        <div className="nh-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {interviewRoles.map((r) => (
              <Link
                key={r.slug}
                href={`/interview-questions/${r.slug}`}
                style={{
                  background: P.surface,
                  border: `1.5px solid ${P.border}`,
                  borderRadius: 14,
                  padding: '24px 24px 20px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
              >
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                  color: P.accent, textTransform: 'uppercase',
                }}>
                  {r.questions.length} questions
                </div>
                <div style={{
                  fontSize: 20, fontWeight: 600, color: P.dark,
                  lineHeight: 1.3, letterSpacing: '-0.3px',
                }}>
                  {r.title}
                </div>
                <p style={{
                  fontSize: 14, color: P.mid, lineHeight: 1.55,
                  margin: 0,
                }}>
                  {r.intro.slice(0, 140)}…
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 600, color: P.accent,
                  marginTop: 6,
                }}>
                  See prep guide
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#2e7d4f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DualActionCTA />
    </>
  )
}
