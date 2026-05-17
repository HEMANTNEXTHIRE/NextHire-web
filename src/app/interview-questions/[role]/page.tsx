import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllInterviewRoleSlugs,
  getInterviewRoleBySlug,
  interviewRoles,
} from '@/lib/interviewRolesData'
import DualActionCTA from '@/components/ui/DualActionCTA'
import InlineProductCTA from '@/components/ui/InlineProductCTA'

const SITE = 'https://www.nexthireconsulting.com'

interface Props {
  params: Promise<{ role: string }>
}

export async function generateStaticParams() {
  return getAllInterviewRoleSlugs().map((role) => ({ role }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params
  const data = getInterviewRoleBySlug(role)
  if (!data) return {}
  const title = `${data.title} Interview Questions (2026) | NextHire`
  const description = data.metaDescription ?? data.intro.slice(0, 158)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE}/interview-questions/${role}`,
      ...(data.dateModified ? { modifiedTime: data.dateModified } : {}),
    },
    twitter: { title, description, card: 'summary_large_image' },
    alternates: { canonical: `${SITE}/interview-questions/${role}` },
  }
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

export default async function InterviewRolePage({ params }: Props) {
  const { role } = await params
  const data = getInterviewRoleBySlug(role)
  if (!data) notFound()

  const otherRoles = interviewRoles.filter((r) => r.slug !== role).slice(0, 4)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Interview Questions', item: `${SITE}/interview-questions` },
      { '@type': 'ListItem', position: 3, name: `${data.title} Interview Questions`, item: `${SITE}/interview-questions/${role}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section style={{ background: P.surface }}>
        <div className="nh-container" style={{
          paddingTop: 'clamp(100px, 12vw, 136px)',
          paddingBottom: 40,
        }}>
          <Link href="/interview-questions" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 500, color: P.muted,
            textDecoration: 'none', marginBottom: 28,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All interview prep guides
          </Link>

          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, letterSpacing: '1.2px',
            color: P.accent, background: P.mint,
            border: `1px solid ${P.border}`,
            borderRadius: 999, padding: '5px 14px',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            Interview Prep · {data.questions.length} Questions
          </span>

          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 500, color: P.dark,
            margin: '0 0 24px',
            lineHeight: 1.12, letterSpacing: '-1.2px',
            maxWidth: 860,
          }}>
            {data.title} interview questions
          </h1>

          <p style={{
            fontSize: 18, color: P.mid, lineHeight: 1.7,
            margin: 0, letterSpacing: '-0.2px',
            maxWidth: 760,
          }}>
            {data.intro}
          </p>
        </div>
      </section>

      <section style={{ background: P.surface, padding: '0 0 96px' }}>
        <div className="nh-container">
          <div style={{ maxWidth: 820 }}>

            <InlineProductCTA
              title={`Land your next ${data.title.toLowerCase()} role faster`}
              description="NextHire AI handles sourcing, applications, and follow-ups so you can focus on the interview itself."
            />

            <section style={{
              background: P.bg,
              border: `1.5px solid ${P.border}`,
              borderRadius: 14,
              padding: '24px 28px',
              margin: '0 0 48px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                color: P.accent, textTransform: 'uppercase', marginBottom: 12,
              }}>
                What interviewers look for
              </div>
              <ul style={{
                listStyle: 'none', padding: 0, margin: 0,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                {data.whatInterviewersLookFor.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 10,
                    fontSize: 16, color: P.dark, lineHeight: 1.55,
                  }}>
                    <span aria-hidden="true" style={{ color: P.accent, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <h2 style={{
              fontSize: 28, fontWeight: 500, color: P.dark,
              margin: '0 0 24px', lineHeight: 1.3, letterSpacing: '-0.4px',
            }}>
              Real questions with model answers
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {data.questions.map((q, i) => (
                <article key={i} style={{
                  borderBottom: `1px solid ${P.border}`,
                  paddingBottom: 24,
                }}>
                  {q.tag && (
                    <div style={{
                      display: 'inline-block',
                      fontSize: 10, fontWeight: 700, letterSpacing: '1.4px',
                      color: P.accent, background: P.mint,
                      borderRadius: 6, padding: '3px 9px',
                      textTransform: 'uppercase', marginBottom: 10,
                    }}>
                      {q.tag}
                    </div>
                  )}
                  <h3 style={{
                    fontSize: 20, fontWeight: 600, color: P.dark,
                    margin: '0 0 12px', lineHeight: 1.4, letterSpacing: '-0.3px',
                  }}>
                    {i + 1}. {q.question}
                  </h3>
                  <p style={{
                    fontSize: 16, color: P.mid, lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {q.answer}
                  </p>
                </article>
              ))}
            </div>

            <section style={{
              marginTop: 48,
              background: '#fff8e3',
              border: '1.5px solid #f3e3a8',
              borderRadius: 14,
              padding: '24px 28px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                color: '#8a6a00', textTransform: 'uppercase', marginBottom: 10,
              }}>
                Prep tip
              </div>
              <p style={{
                fontSize: 16, color: P.dark, lineHeight: 1.7,
                margin: 0,
              }}>
                {data.prepTip}
              </p>
            </section>

            <InlineProductCTA
              label="READY TO INTERVIEW?"
              title="Get to the interview without the application grind"
              description="NextHire auto-applies, follows up, and surfaces only the roles worth your time."
              buttonLabel="Start free"
            />

            {otherRoles.length > 0 && (
              <section style={{ marginTop: 56 }}>
                <h2 style={{
                  fontSize: 24, fontWeight: 500, color: P.dark,
                  margin: '0 0 20px', lineHeight: 1.3, letterSpacing: '-0.4px',
                }}>
                  Prep for other roles
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 14,
                }}>
                  {otherRoles.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/interview-questions/${r.slug}`}
                      style={{
                        background: P.surface,
                        border: `1.5px solid ${P.border}`,
                        borderRadius: 12,
                        padding: '16px 18px',
                        textDecoration: 'none',
                        display: 'flex', flexDirection: 'column', gap: 6,
                      }}
                    >
                      <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '1.4px',
                        color: P.muted, textTransform: 'uppercase',
                      }}>
                        {r.questions.length} questions
                      </div>
                      <div style={{
                        fontSize: 15, fontWeight: 600, color: P.dark,
                        lineHeight: 1.35,
                      }}>
                        {r.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </section>

      <DualActionCTA />
    </>
  )
}
