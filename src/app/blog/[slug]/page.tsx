import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/lib/blogData'
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate, type SanityPost } from '@/lib/sanity'
import PortableTextRenderer from '@/sanity/PortableTextRenderer'
import DualActionCTA from '@/components/ui/DualActionCTA'

const SITE = 'https://www.nexthireconsulting.com'

function toIso(input: string | undefined): string | undefined {
  if (!input) return undefined
  const d = new Date(input)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}

interface Props {
  params: Promise<{ slug: string }>
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
  const { slug } = await params
  const sanity = await getPostBySlug(slug)
  const staticPost = getBlogPostBySlug(slug)
  if (!sanity && !staticPost) return {}

  const baseTitle = sanity?.title ?? staticPost!.title
  const metaTitle = sanity?.metaTitle ?? baseTitle
  const description = sanity?.metaDescription ?? sanity?.excerpt ?? staticPost!.excerpt
  const heroImage = sanity?.ogImage ?? sanity?.heroImage ?? staticPost!.heroImage
  const author = sanity?.authorRef?.name ?? sanity?.author ?? staticPost!.author
  const publishedTime = toIso(sanity?.publishedAt ?? staticPost!.date)
  const modifiedTime = toIso(sanity?.dateModified) ?? publishedTime
  const noindex = sanity?.noindex === true

  return {
    title: `${metaTitle} | NextHire Blog`,
    description,
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: metaTitle,
      description,
      images: [heroImage],
      type: 'article',
      url: `${SITE}/blog/${slug}`,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      authors: [author],
    },
    twitter: { title: metaTitle, description, images: [heroImage], card: 'summary_large_image' },
    alternates: { canonical: `${SITE}/blog/${slug}` },
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
  const { slug } = await params
  // Try Sanity first; fall back to static data
  const sanityPost: SanityPost | null = await getPostBySlug(slug)
  const staticPost = getBlogPostBySlug(slug)

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
    ? allSanity.filter(p => p.slug !== slug).slice(0, 4).map(p => ({
        slug: p.slug, title: p.title, category: p.category, readTime: p.readTime,
      }))
    : blogPosts.filter(p => p.slug !== slug).slice(0, 4)

  const publishedIso = toIso(sanityPost?.publishedAt ?? staticPost?.date)
  const modifiedIso = toIso(sanityPost?.dateModified) ?? publishedIso
  const heroImageAbs = post.heroImage.startsWith('http')
    ? post.heroImage
    : `${SITE}${post.heroImage}`
  const authorName = sanityPost?.authorRef?.name ?? post.author
  const authorBio = sanityPost?.authorRef?.bio
  const tldr = sanityPost?.tldr
  const faqItems = sanityPost?.faqItems ?? []

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [heroImageAbs],
    ...(publishedIso ? { datePublished: publishedIso } : {}),
    ...(modifiedIso ? { dateModified: modifiedIso } : {}),
    author: sanityPost?.authorRef
      ? {
          '@type': 'Person',
          name: sanityPost.authorRef.name,
          ...(sanityPost.authorRef.linkedinUrl || sanityPost.authorRef.twitterUrl
            ? {
                sameAs: [
                  sanityPost.authorRef.linkedinUrl,
                  sanityPost.authorRef.twitterUrl,
                ].filter(Boolean),
              }
            : {}),
        }
      : { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'NextHire Consulting',
      logo: { '@type': 'ImageObject', url: `${SITE}/Image/Nexthire.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}` },
    articleSection: post.category,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${slug}` },
    ],
  }

  const faqSchema = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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

              {/* TL;DR — surfaced to AI search engines via the visible DOM */}
              {tldr && (
                <aside style={{
                  background: P.mint,
                  border: `1px solid ${P.border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  margin: '0 0 36px',
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: P.dark,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '1.4px',
                    color: P.accent, textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    TL;DR
                  </div>
                  {tldr}
                </aside>
              )}

              <article className="nh-post-content">
                {sanityPost?.body?.length
                  ? <PortableTextRenderer value={sanityPost.body} />
                  : <div dangerouslySetInnerHTML={{ __html: post.content }} />
                }
              </article>

              {/* FAQ section — visible counterpart of the FAQPage JSON-LD */}
              {faqItems.length > 0 && (
                <section style={{ marginTop: 56, paddingTop: 40, borderTop: `1px solid ${P.border}` }}>
                  <h2 style={{
                    fontSize: 26, fontWeight: 500, color: P.dark,
                    margin: '0 0 24px', lineHeight: 1.3, letterSpacing: '-0.4px',
                  }}>
                    Frequently asked questions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {faqItems.map((item, i) => (
                      <div key={i}>
                        <h3 style={{
                          fontSize: 18, fontWeight: 600, color: P.dark,
                          margin: '0 0 8px', lineHeight: 1.4,
                        }}>
                          {item.question}
                        </h3>
                        <p style={{
                          fontSize: 16, color: P.mid, lineHeight: 1.75,
                          margin: 0,
                        }}>
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author byline — E-E-A-T signal */}
              {(authorBio || sanityPost?.authorRef) && (
                <section style={{
                  marginTop: 48,
                  padding: '24px',
                  background: P.bg,
                  border: `1px solid ${P.border}`,
                  borderRadius: 12,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}>
                  {sanityPost?.authorRef?.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sanityPost.authorRef.avatar}
                      alt={sanityPost.authorRef.name}
                      style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: P.dark }}>
                      {sanityPost?.authorRef?.name ?? authorName}
                    </div>
                    {sanityPost?.authorRef?.role && (
                      <div style={{ fontSize: 13, color: P.muted, marginTop: 2 }}>
                        {sanityPost.authorRef.role}
                      </div>
                    )}
                    {authorBio && (
                      <p style={{ fontSize: 14, color: P.mid, lineHeight: 1.6, margin: '10px 0 0' }}>
                        {authorBio}
                      </p>
                    )}
                    {(sanityPost?.authorRef?.linkedinUrl || sanityPost?.authorRef?.twitterUrl) && (
                      <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 13 }}>
                        {sanityPost.authorRef.linkedinUrl && (
                          <a href={sanityPost.authorRef.linkedinUrl} target="_blank" rel="noopener noreferrer"
                             style={{ color: P.accent, textDecoration: 'underline' }}>LinkedIn</a>
                        )}
                        {sanityPost.authorRef.twitterUrl && (
                          <a href={sanityPost.authorRef.twitterUrl} target="_blank" rel="noopener noreferrer"
                             style={{ color: P.accent, textDecoration: 'underline' }}>X / Twitter</a>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}
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
