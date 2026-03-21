import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blogData'

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

export default function BlogIndexPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#b8d4ce 0%,#ffffff 100%)', padding: '140px 40px 80px', textAlign: 'center' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ display: 'inline-block', background: '#5fa89e', color: '#253e42', padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
            NEXTHIRE BLOG
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 800, color: '#253e42', margin: '0 0 20px', lineHeight: 1.1 }}>
            Career Insights & Tips
          </h1>
          <p style={{ fontSize: '20px', color: '#3d5a56', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Expert advice to help you navigate the job market, ace interviews, and build a career you love.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div className="w-layout-blockcontainer container-large-e25 w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '36px' }}>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                style={{ border: '2px solid #b8d4ce', borderRadius: '20px', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              >
                <div style={{ height: '220px', overflow: 'hidden', background: '#b8d4ce' }}>
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#5fa89e', letterSpacing: '1px', padding: '4px 12px', background: 'rgba(95,168,158,0.1)', borderRadius: '20px' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '13px', color: '#a0a0a0' }}>{post.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#253e42', margin: 0, lineHeight: 1.3 }}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '15px', color: '#3d5a56', margin: 0, lineHeight: 1.6, flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #b8d4ce' }}>
                    <span style={{ fontSize: '13px', color: '#a0a0a0' }}>{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ fontSize: '14px', fontWeight: 600, color: '#5fa89e', textDecoration: 'none' }}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
