import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/lib/blogData'
import DualActionCTA from '@/components/ui/DualActionCTA'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: 'article',
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
    alternates: {
      canonical: `https://www.nexthireconsulting.com/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#b8d4ce 0%,#ffffff 100%)', padding: '140px 40px 60px' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#5fa89e', letterSpacing: '1px', padding: '6px 16px', background: 'rgba(95,168,158,0.1)', borderRadius: '20px' }}>
              {post.category}
            </span>
            <span style={{ fontSize: '14px', color: '#a0a0a0' }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontSize: '52px', fontWeight: 800, color: '#253e42', margin: '0 0 24px', lineHeight: 1.1 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#253e42,#5fa89e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px' }}>
              N
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#253e42' }}>{post.author}</div>
              <div style={{ fontSize: '13px', color: '#a0a0a0' }}>{post.date}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>
        <img
          src={post.heroImage}
          alt={post.title}
          style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(37,62,66,0.1)', marginTop: '-40px' }}
          loading="eager"
        />
      </div>

      {/* Content */}
      <article
        style={{ maxWidth: '900px', margin: '60px auto', padding: '0 40px' }}
        className="blog-post-content"
      >
        <div
          className="fe-inner-page-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: '80px 40px', background: 'linear-gradient(180deg,#b8d4ce 0%,#ffffff 100%)' }}>
          <div className="w-layout-blockcontainer container-large-e25 w-container">
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#253e42', margin: '0 0 40px', textAlign: 'center' }}>
              More From the Blog
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '30px' }}>
              {related.map((r) => (
                <article key={r.slug} style={{ border: '2px solid #b8d4ce', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
                  <div style={{ height: '160px', overflow: 'hidden', background: '#b8d4ce' }}>
                    <img src={r.heroImage} alt={r.title} width={560} height={160} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div style={{ padding: '24px 20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#5fa89e', letterSpacing: '1px', marginBottom: '8px' }}>{r.category}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#253e42', margin: '0 0 12px', lineHeight: 1.3 }}>
                      <Link href={`/blog/${r.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{r.title}</Link>
                    </h3>
                    <Link href={`/blog/${r.slug}`} style={{ fontSize: '14px', fontWeight: 600, color: '#5fa89e', textDecoration: 'none' }}>
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <DualActionCTA />

      <style>{`
        .blog-post-content h2 { font-size: 32px; font-weight: 700; color: #253e42; margin: 40px 0 16px; line-height: 1.3; }
        .blog-post-content h3 { font-size: 24px; font-weight: 700; color: #253e42; margin: 32px 0 12px; }
        .blog-post-content p { font-size: 18px; color: #3d5a56; line-height: 1.8; margin: 0 0 20px; }
        .blog-post-content ul, .blog-post-content ol { font-size: 18px; color: #3d5a56; line-height: 1.8; padding-left: 24px; margin: 0 0 24px; }
        .blog-post-content li { margin-bottom: 8px; }
        .blog-post-content blockquote { background: #b8d4ce; border-left: 4px solid #5fa89e; padding: 24px 32px; margin: 32px 0; border-radius: 0 12px 12px 0; font-size: 22px; font-style: italic; color: #253e42; line-height: 1.6; }
        .blog-post-content strong { color: #253e42; }
        .blog-post-content a { color: #5fa89e; text-decoration: underline; }
      `}</style>
    </>
  )
}
