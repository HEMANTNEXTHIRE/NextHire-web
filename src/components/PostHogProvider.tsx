'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { appLinkClick, scrubEvent, scrubbedUrlProps } from '@/lib/analyticsEvents'

// The same PostHog project as the app (app.nexthireconsulting.com). The SDK's cross
// subdomain cookie carries a visitor's id into the app, so the site and the app are one
// funnel, from first page to payment.
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      // Pinned, as in the app. Pageviews on every route change and page leaves come from
      // these defaults.
      defaults: '2026-08-30',
      person_profiles: 'identified_only',
      // Query strings and hashes never leave the browser. UTM parameters are read first.
      before_send: scrubEvent,
      // The feature flag request is not an event, so before_send never sees the first
      // page's address it carries. Scrubbed copies set here take its place.
      loaded: () => {
        try {
          posthog.setPersonPropertiesForFlags(scrubbedUrlProps({
            $initial_current_url: window.location.href,
            $initial_pathname: window.location.pathname,
            $initial_referrer: document.referrer || '$direct',
            ...posthog.persistence?.get_initial_props?.(),
          }), false)
        } catch {
          // the request then carries no override, never a failure
        }
      },
      enable_heatmaps: true,
      capture_dead_clicks: true,
      // The site has no other error tracking.
      capture_exceptions: true,
      // Form fields are masked in replays (names, emails, phone numbers); page copy is public.
      session_recording: {
        maskAllInputs: true,
        recordHeaders: false,
        recordBody: false,
      },
    })

    // One listener for every link into the app (there are dozens across the site) and
    // every demo booking button.
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null
      const cta = link && appLinkClick(link.href, link.textContent || link.getAttribute('aria-label') || '', window.location.pathname)
      if (cta) posthog.capture('CTA Clicked', cta)
      if (target?.closest?.('[data-cal-link]')) posthog.capture('Demo Booking Opened', { page: window.location.pathname })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
