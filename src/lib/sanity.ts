import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '5lcdhip2',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

/* ── Types ───────────────────────────────────────────────────────── */

// Minimal PortableText block type for the body field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = Record<string, any>

export interface SanityPost {
  _id:         string
  title:       string
  slug:        string        // flattened: slug.current
  category:    string
  publishedAt: string        // ISO date string
  author:      string
  readTime:    string
  heroImage:   string        // flattened: asset url
  heroImageAlt?: string
  excerpt:     string
  body:        PortableTextBlock[]
}

/* ── GROQ queries ────────────────────────────────────────────────── */

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  author,
  readTime,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  excerpt
`

export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body[]{
      ...,
      _type == "table" => {
        _type,
        _key,
        rows[]{ _key, cells }
      }
    }
  }
`

export const ALL_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

/* ── Fetch helpers ───────────────────────────────────────────────── */

export async function getAllPosts(): Promise<SanityPost[]> {
  try {
    return await sanityClient.fetch<SanityPost[]>(POSTS_QUERY)
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    return await sanityClient.fetch<SanityPost>(POST_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const results = await sanityClient.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY)
    return results.map(r => r.slug)
  } catch {
    return []
  }
}

/* ── Date formatting ─────────────────────────────────────────────── */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
