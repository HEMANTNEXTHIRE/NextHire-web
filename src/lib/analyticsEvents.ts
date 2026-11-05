// What leaves the browser in a PostHog event. Pure, so it is tested without a browser
// (node --test src/lib/analyticsEvents.test.ts).

// App pages whose URL carries a credential. The site and the app share one PostHog cookie,
// so the app's first page address (a /join token, say) can reach this site's requests.
const SENSITIVE_PATH = /^\/(join|invite|auth)(\/|$)/

// Query strings and hashes can carry an email or a token from a newsletter or ad link.
// Origin and path are kept, with the token after /join, /invite or /auth cut off.
// UTM parameters are read before this runs, so they survive.
export function scrubUrl<T>(value: T): T {
  if (typeof value !== 'string' || value === '') return value
  const bare = value.split(/[?#]/)[0]
  const match = /^(https?:\/\/[^/]+)?(\/.*)?$/.exec(bare)
  if (!match) return bare as T
  const path = match[2] || ''
  const sensitive = SENSITIVE_PATH.exec(path)
  return ((match[1] || '') + (sensitive ? `/${sensitive[1]}` : path)) as T
}

// Every property that holds a page address: $current_url, $referrer, $initial_ and
// $session_entry_ copies, $prev_pageview_pathname and so on.
const URL_KEY = /(url|pathname|referrer|href)$/i

function scrubProps(props?: Record<string, unknown>) {
  if (!props) return
  for (const [key, value] of Object.entries(props)) {
    if (key === '$heatmap_data' && value && typeof value === 'object') {
      // Heatmap clicks are grouped under the page address as the key.
      const byPage: Record<string, unknown[]> = {}
      for (const [page, clicks] of Object.entries(value)) {
        const scrubbed = scrubUrl(page)
        byPage[scrubbed] = (byPage[scrubbed] || []).concat(clicks as unknown[])
      }
      props[key] = byPage
    } else if (URL_KEY.test(key)) {
      props[key] = scrubUrl(value)
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Web vitals carry their own $current_url one level down.
      scrubProps(value as Record<string, unknown>)
    }
  }
}

// The address properties of props, scrubbed. The feature flag request sends the first
// page's address as a person property and skips before_send; these copies replace it.
export function scrubbedUrlProps(props?: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(props || {})
      .filter(([key, value]) => URL_KEY.test(key) && typeof value === 'string')
      .map(([key, value]) => [key, scrubUrl(value as string)]),
  )
}

type CaptureEvent = { properties?: Record<string, unknown>; $set?: Record<string, unknown>; $set_once?: Record<string, unknown> }

// The before_send hook: the event is changed in place and returned.
export function scrubEvent<E extends CaptureEvent | null>(event: E): E {
  if (!event) return event
  scrubProps(event.properties)
  scrubProps(event.$set)
  scrubProps(event.$set_once)
  return event
}

export const APP_HOST = 'app.nexthireconsulting.com'

// The properties of a click on a link into the app: which button, on which page, to
// which part of the app. Null for any other link.
export function appLinkClick(href: string, text: string, page: string) {
  let url: URL
  try { url = new URL(href) } catch { return null }
  if (url.hostname !== APP_HOST) return null
  return {
    cta_text: text.replace(/\s+/g, ' ').trim().slice(0, 80),
    page,
    destination: url.pathname,
  }
}
