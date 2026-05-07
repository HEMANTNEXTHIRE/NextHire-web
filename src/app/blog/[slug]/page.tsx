import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/lib/blogData'
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate, type SanityPost } from '@/lib/sanity'
import PortableTextRenderer from '@/sanity/PortableTextRenderer'
import DualActionCTA from '@/components/ui/DualActionCTA'

interface Props {
  params: { slug: string }
}

// Merge static + Sanity slugs so both work during the transition period
export async function generateStaticParams() {
  const [sanitySlugs, staticSlugs] = await Promise.all([
    getAllSlugs(),
    Promise.resolve(getAllBlogSlugs()),
  ])
  const all = Array.from(new Set([...sanitySlugs, ...staticSlugs]))
  return all.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sanity = await getPostBySlug(params.slug)
  const post = sanity
    ? { title: sanity.title, excerpt: sanity.excerpt, heroImage: sanity.heroImage, slug: sanity.slug }
    : getBlogPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | NextHire Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: 'article',
    },
    twitter: { title: post.title, description: post.excerpt, images: [post.heroImage] },
    alternates: { canonical: `https://www.nexthireconsulting.com/blog/${post.slug}` },
  }
}

/* ── Palette ─────────────────────────────────────────────────── */
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

export default async function BlogPostPage({ params }: Props) {
  // Try Sanity first; fall back to static data
  const sanityPost: SanityPost | null = await getPostBySlug(params.slug)
  const staticPost = getBlogPostBySlug(params.slug)

  if (!sanityPost && !staticPost) notFound()

  // Unified post shape for the template
  const post = sanityPost
    ? {
        slug:      sanityPost.slug,
        title:     sanityPost.title,
        category:  sanityPost.category,
        date:      formatDate(sanityPost.publishedAt),
        author:    sanityPost.author,
        readTime:  sanityPost.readTime,
        heroImage: sanityPost.heroImage,
        excerpt:   sanityPost.excerpt,
        content:   '',                  // not used when Sanity post present
      }
    : staticPost!

  // Related posts: prefer Sanity, fall back to static
  const allSanity = await getAllPosts()
  const relatedPosts = allSanity.length > 0
    ? allSanity.filter(p => p.slug !== params.slug).slice(0, 4).map(p => ({
        slug: p.slug, title: p.title, category: p.category, readTime: p.readTime,
      }))
    : blogPosts.filter(p => p.slug !== params.slug).slice(0, 4)

  return (
    <>
      <style suppressHydrationWarning>{`
        .nh-post-content h2 {
          font-size: 26px;
          font-weight: 500;
          color: #132128;
          margin: 44px 0 14px;
          line-height: 1.3;
          letter-spacing: -0.4px;
        }
        .nh-post-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #132128;
          margin: 32px 0 10px;
          line-height: 1.35;
          letter-spacing: -0.3px;
        }
        .nh-post-content p {
          font-size: 16px;
          color: #374151;
          line-height: 1.85;
          margin: 0 0 20px;
          letter-spacing: -0.1px;
        }
        .nh-post-content ul,
        .nh-post-content ol {
          font-size: 16px;
          color: #374151;
          line-height: 1.8;
          padding-left: 20px;
          margin: 0 0 22px;
        }
        .nh-post-content li { margin-bottom: 9px; }
        .nh-post-content blockquote {
          background: #e4f0eb;
          border-left: 3px solid #2e7d4f;
          padding: 20px 26px;
          margin: 32px 0;
          border-radius: 0 12px 12px 0;
          font-size: 16px;
          font-style: italic;
          color: #132128;
          line-height: 1.7;
        }
        .nh-post-content strong { color: #132128; font-weight: 600; }
        .nh-post-content a { color: #2e7d4f; text-decoration: underline; text-underline-offset: 3px; }
        .nh-sidebar-card:hover { box-shadow: 0 4px 20px rgba(19,33,40,0.08); }

        @media (max-width: 900px) {
          .nh-post-layout { flex-direction: column !important; }
          .nh-post-sidebar { width: 100% !important; position: static !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ background: P.surface }}>
        <div className="nh-container" style={{
          paddingTop: 'clamp(100px, 12vw, 136px)',
          paddingBottom: 40,
        }}>

          {/* Back link */}
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 500, color: P.muted,
            textDecoration: 'none', marginBottom: 28,
            letterSpacing: '-0.2px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to blog
          </Link>

          {/* Category + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '1.2px',
              color: P.accent, background: P.mint,
              border: `1px solid ${P.border}`,
              borderRadius: 999, padding: '5px 14px',
              textTransform: 'uppercase',
            }}>
              {post.category}
            </span>
            <span style={{ fontSize: 13, color: P.muted }}>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 500,
            color: P.dark,
            margin: '0 0 28px',
            lineHeight: 1.12,
            letterSpacing: '-1.2px',
            maxWidth: 860,
          }}>
            {post.title}
          </h1>

          {/* Author row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            paddingBottom: 36, borderBottom: `1px solid ${P.border}`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #132128 0%, #2e7d4f 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', fontWeight: 700, fontSize: 14,
              flexShrink: 0,
            }}>
              N
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: P.dark, lineHeight: 1.2 }}>{post.author}</div>
              <div style={{ fontSize: 13, color: P.muted, marginTop: 2 }}>{post.date}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article + Sidebar ─────────────────────────────────────── */}
      <section style={{ background: P.surface, padding: '0 0 96px' }}>
        <div className="nh-container">
          <div
            className="nh-post-layout"
            style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}
          >

            {/* ── Main article ─────────────────────────────────── */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>

              {/* Excerpt lead */}
              <p style={{
                fontSize: 18,
                color: P.mid,
                lineHeight: 1.7,
                margin: '40px 0 36px',
                letterSpacing: '-0.2px',
                fontWeight: 400,
                borderBottom: `1px solid ${P.border}`,
                paddingBottom: 32,
              }}>
                {post.excerpt}
              </p>

              <article className="nh-post-content">
                {sanityPost?.body?.length
                  ? <PortableTextRenderer value={sanityPost.body} />
                  : <div dangerouslySetInnerHTML={{ __html: post.content }} />
                }
              </article>
            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <aside
              className="nh-post-sidebar"
              style={{ width: 320, flexShrink: 0, position: 'sticky', top: 100 }}
            >
              <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                color: P.muted, textTransform: 'uppercase',
                margin: '40px 0 20px',
              }}>
                More articles
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {relatedPosts.map((r) => (
                  <article
                    key={r.slug}
                    className="nh-sidebar-card"
                    style={{
                      border: `1.5px solid ${P.border}`,
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: P.surface,
                      transition: 'box-shadow 0.2s ease',
                    }}
                  >
                    <div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '1px',
                        color: P.accent, background: P.mint,
                        border: `1px solid ${P.border}`,
                        borderRadius: 999, padding: '3px 10px',
                        textTransform: 'uppercase',
                        display: 'inline-block', width: 'fit-content',
                      }}>
                        {r.category}
                      </span>

                      <h3 style={{
                        fontSize: 14, fontWeight: 600,
                        color: P.dark, margin: 0, lineHeight: 1.4,
                        letterSpacing: '-0.2px',
                      }}>
                        <Link href={`/blog/${r.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {r.title}
                        </Link>
                      </h3>

                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 4,
                      }}>
                        <span style={{ fontSize: 12, color: P.muted }}>{r.readTime}</span>
                        <Link
                          href={`/blog/${r.slug}`}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: 12, fontWeight: 600, color: P.accent,
                            textDecoration: 'none',
                          }}
                        >
                          Read
                          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 7h8M8 4l3 3-3 3" stroke="#2e7d4f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Back to all posts */}
              <Link
                href="/blog"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 20, padding: '12px 0',
                  border: `1.5px solid ${P.border}`,
                  borderRadius: 10,
                  fontSize: 13, fontWeight: 600, color: P.mid,
                  textDecoration: 'none',
                  background: P.bg,
                }}
              >
                View all articles
              </Link>
            </aside>

          </div>
        </div>
      </section>

      <DualActionCTA />
    </>
  )
}
