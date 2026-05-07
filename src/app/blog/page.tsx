import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate, type SanityPost } from '@/lib/sanity'
import { blogPosts } from '@/lib/blogData'
import DualActionCTA from '@/components/ui/DualActionCTA'

export const metadata: Metadata = {
  title: 'Blog | NextHire Career Insights & Tips',
  description:
    'Explore the NextHire blog for career tips, job search strategies, interview preparation, and insights into the future of work.',
  openGraph: {
    title: 'Blog | NextHire Career Insights & Tips',
    description: 'Career tips, job search strategies, and insights from the NextHire team.',
  },
  alternates: { canonical: 'https://www.nexthireconsulting.com/blog' },
}

/* ── Palette (matches site-wide tokens) ─────────────────────── */
const P = {
  bg:      '#edf5f1',
  surface: '#ffffff',
  mint:    '#e4f0eb',
  border:  '#c8dfd6',
  accent:  '#2e7d4f',
  dark:    '#1a3338',
  mid:     '#4b5563',
  muted:   '#9ca3af',
  green:   '#22c55e',
}

// Normalise Sanity post → same shape as the static blogPosts array
function sanityToStatic(p: SanityPost) {
  return {
    slug:      p.slug,
    title:     p.title,
    category:  p.category,
    date:      formatDate(p.publishedAt),
    author:    p.author,
    readTime:  p.readTime,
    heroImage: p.heroImage,
    excerpt:   p.excerpt,
    content:   '',
  }
}

export default async function BlogIndexPage() {
  // Fetch from Sanity at build time; fall back to static data if dataset is empty
  const sanityPosts = await getAllPosts()
  const posts = sanityPosts.length > 0 ? sanityPosts.map(sanityToStatic) : blogPosts

  const [featured, ...rest] = posts

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', position: 'relative', overflowX: 'hidden' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          padding: 'clamp(92px, 12vw, 140px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 80px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}>

          {/* Headline */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: 0, letterSpacing: '-0.7px', fontSynthesis: 'none' }}>
              <span style={{
                display: 'block',
                fontSize: '72px', fontWeight: 450,
                color: '#132128', lineHeight: '86.4px',
                whiteSpace: 'nowrap',
                fontFamily: "'Droid Serif', Georgia, 'Times New Roman', serif",
              }}>
                Career Insights
              </span>
              <span style={{
                display: 'block',
                fontSize: '72px', fontWeight: 450,
                color: '#338632', lineHeight: '86.4px',
                whiteSpace: 'nowrap',
                fontFamily: "'Droid Serif', Georgia, 'Times New Roman', serif",
              }}>
                &amp; Expert Advice
              </span>
            </h1>
          </div>

          {/* Sub-headline */}
          <p style={{
            color: '#424D53',
            fontSize: '18px', lineHeight: '27px',
            letterSpacing: '-0.3px',
            margin: '0 0 10px',
            maxWidth: '560px', fontWeight: 400,
          }}>
            Expert advice to help you navigate the job market, ace interviews, and build a career you love.
          </p>

          {/* Feature checkmarks */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '28px',
            flexWrap: 'wrap', justifyContent: 'center',
            marginTop: '20px',
          }}>
            {[
              'Job search strategies',
              'Interview preparation',
              'Hiring market insights',
            ].map((item) => (
              <span key={item} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.3px',
                fontWeight: 500,
              }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
                  <circle cx="9.5" cy="9.5" r="9.5" fill="#338632" fillOpacity="0.12"/>
                  <path d="M5.5 9.8l3 3 5-6" stroke="#338632" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: '#132128' }}>{item}</span>
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ── Featured post ──────────────────────────────────────── */}
      {featured && (
        <section style={{ background: P.surface, padding: '72px 0 0' }}>
          <div className="nh-container">
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <article style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                border: `2px solid ${P.border}`, borderRadius: 20,
                overflow: 'hidden', background: P.surface,
                transition: 'box-shadow 0.25s',
              }}>
                {/* Image */}
                <div style={{ height: 420, background: P.mint, overflow: 'hidden', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="eager"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px',
                      color: P.accent, background: P.mint,
                      border: `1px solid ${P.border}`,
                      borderRadius: 999, padding: '5px 14px',
                      textTransform: 'uppercase',
                    }}>
                      {featured.category}
                    </span>
                    <span style={{ fontSize: '13px', color: P.muted }}>{featured.readTime}</span>
                  </div>

                  <h2 style={{
                    fontSize: '30px', fontWeight: 700,
                    color: P.dark, margin: 0, lineHeight: 1.25,
                  }}>
                    {featured.title}
                  </h2>

                  <p style={{ fontSize: '15px', color: P.mid, margin: 0, lineHeight: 1.7 }}>
                    {featured.excerpt}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 20, borderTop: `1px solid ${P.border}`,
                    marginTop: 'auto',
                  }}>
                    <span style={{ fontSize: '13px', color: P.muted }}>{featured.date}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: '14px', fontWeight: 600, color: P.accent,
                    }}>
                      Read article
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#2e7d4f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* ── All posts grid ─────────────────────────────────────── */}
      <section style={{ background: P.surface, padding: '64px 0 96px' }}>
        <div className="nh-container">

          {rest.length > 0 && (
            <p style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '1.4px',
              color: P.muted, textTransform: 'uppercase',
              marginBottom: 32,
            }}>
              More articles
            </p>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 28,
          }}>
            {rest.map((post) => (
              <article
                key={post.slug}
                style={{
                  border: `2px solid ${P.border}`, borderRadius: 16,
                  overflow: 'hidden', background: P.surface,
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ height: 200, background: P.mint, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, letterSpacing: '1px',
                      color: P.accent, background: P.mint,
                      border: `1px solid ${P.border}`,
                      borderRadius: 999, padding: '4px 12px',
                      textTransform: 'uppercase',
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '12px', color: P.muted }}>{post.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: P.dark, margin: 0, lineHeight: 1.3 }}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '14px', color: P.mid, margin: 0, lineHeight: 1.65, flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 16, borderTop: `1px solid ${P.border}`,
                    marginTop: 'auto',
                  }}>
                    <span style={{ fontSize: '12px', color: P.muted }}>{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: '13px', fontWeight: 600, color: P.accent,
                        textDecoration: 'none',
                      }}
                    >
                      Read more
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="#2e7d4f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <DualActionCTA />
    </>
  )
}
