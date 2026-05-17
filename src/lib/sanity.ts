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

export interface SanityFaqItem {
  question: string
  answer:   string
}

export interface SanityAuthor {
  name:         string
  slug:         string
  role?:        string
  bio?:         string
  avatar?:      string
  linkedinUrl?: string
  twitterUrl?:  string
  credentials?: string[]
}

export interface SanityPost {
  _id:         string
  title:       string
  slug:        string        // flattened: slug.current
  category:    string
  publishedAt: string        // ISO date string
  dateModified?: string      // ISO date string, set when post is materially updated
  author:      string        // legacy free-text fallback
  authorRef?:  SanityAuthor
  readTime:    string
  heroImage:   string        // flattened: asset url
  heroImageAlt?: string
  excerpt:     string
  tldr?:       string
  metaTitle?:  string
  metaDescription?: string
  ogImage?:    string
  noindex?:    boolean
  faqItems?:   SanityFaqItem[]
  keyTakeaways?: string[]
  body:        PortableTextBlock[]
}

/* ── GROQ queries ────────────────────────────────────────────────── */

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  dateModified,
  author,
  "authorRef": authorRef->{
    name,
    "slug": slug.current,
    role,
    bio,
    "avatar": avatar.asset->url,
    linkedinUrl,
    twitterUrl,
    credentials
  },
  readTime,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  excerpt,
  tldr,
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url,
  noindex
`

export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    faqItems[]{ question, answer },
    keyTakeaways,
    body[]{
      ...,
      _type == "table" => {
        _type,
        _key,
        rows[]{ _key, cells }
      },
      _type == "relatedPostInline" => {
        _type,
        _key,
        label,
        "post": post->{
          title,
          "slug": slug.current,
          category,
          readTime,
          excerpt,
          "heroImage": heroImage.asset->url
        }
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
