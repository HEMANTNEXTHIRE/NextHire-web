import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'
import { blogPosts } from '@/lib/blogData'

// Required for static export — sitemap is generated once at build time.
export const dynamic = 'force-static'

const BASE = 'https://www.nexthireconsulting.com'

type SanityIndexRow = { slug: string; publishedAt?: string; _updatedAt?: string }

async function sanityIndex(): Promise<SanityIndexRow[]> {
  try {
    return await sanityClient.fetch<SanityIndexRow[]>(
      `*[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }`,
    )
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sanityPosts = await sanityIndex()
  const sanitySlugs = new Set(sanityPosts.map(p => p.slug))

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                   changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/candidates/`,        changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/companies/`,         changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/jobs/`,              changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/pricing/`,           changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about-nexthire/`,    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact-us/`,        changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/talk-to-an-expert/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/why-join-nexthire/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/success-story/`,     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog/`,              changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const sanityUrls: MetadataRoute.Sitemap = sanityPosts.map(p => ({
    url: `${BASE}/blog/${p.slug}/`,
    lastModified: p._updatedAt ?? p.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Static blog posts: skip any slug that is also in Sanity (Sanity wins)
  const staticUrls: MetadataRoute.Sitemap = blogPosts
    .filter(p => !sanitySlugs.has(p.slug))
    .map(p => ({
      url: `${BASE}/blog/${p.slug}/`,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

  const legal: MetadataRoute.Sitemap = [
    'privacy-policy',
    'terms-of-service',
    'data-processing-agreement',
    'marketing-disclosure',
    'refund-policy',
    'cancellation-policy',
    'extension-privacy-policy',
  ].map(slug => ({
    url: `${BASE}/${slug}/`,
    changeFrequency: 'yearly',
    priority: 0.3,
  }))

  return [...core, ...sanityUrls, ...staticUrls, ...legal]
}
