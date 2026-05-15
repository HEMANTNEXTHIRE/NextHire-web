#!/usr/bin/env node
/**
 * IndexNow submission — pings Bing, Yandex, Naver, Seznam (and any
 * IndexNow-compatible engine) with all URLs from our sitemap so they
 * re-crawl within minutes instead of hours.
 *
 * Runs in CI after the S3 sync completes. Reads URLs from out/sitemap.xml.
 * Soft-fails (logs but exits 0) so transient IndexNow errors don't break
 * the deploy.
 *
 * Docs: https://www.indexnow.org/documentation
 */

import { readFile } from 'node:fs/promises'

const KEY = 'aeb4e2174fbccf102112bbe77a941dd5'
const HOST = 'www.nexthireconsulting.com'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_PATH = 'out/sitemap.xml'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

async function readSitemapUrls() {
  const xml = await readFile(SITEMAP_PATH, 'utf8')
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g)
  return Array.from(matches, m => m[1].trim())
}

async function submit(urls) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return { status: res.status, ok: res.ok, text: await res.text().catch(() => '') }
}

async function main() {
  const urls = await readSitemapUrls()
  if (urls.length === 0) {
    console.warn('[indexnow] no URLs found in sitemap — skipping')
    return
  }
  console.log(`[indexnow] submitting ${urls.length} URLs from ${SITEMAP_PATH}`)
  const result = await submit(urls)
  if (result.ok) {
    console.log(`[indexnow] ✓ accepted (HTTP ${result.status})`)
  } else {
    console.warn(`[indexnow] ✗ HTTP ${result.status}: ${result.text || '(no body)'}`)
  }
}

main().catch(err => {
  // Soft-fail — IndexNow is best-effort, never break the deploy.
  console.warn(`[indexnow] error: ${err?.message ?? err}`)
})
