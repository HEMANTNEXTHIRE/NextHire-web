'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

/**
 * Initializes the Cal.com popup embed once for the whole site. Buttons with
 * data-cal-link / data-cal-namespace attributes are auto-wired by Cal once
 * this runs — no per-button setup required.
 */
export default function CalInit() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#01696f' },
          dark:  { 'cal-brand': '#01696f' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })().catch(() => {
      // Blocked by a content blocker: the click fallback below takes over
    })

    // Booking buttons are href="#" and rely on Cal's popup. If its script was blocked
    // (Brave Shields, ad blockers) or hasn't loaded yet, open the booking page instead
    // of leaving the visitor with a button that does nothing.
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.('[data-cal-link]')
      if (!trigger) return
      const calReady = Boolean((window as unknown as { Cal?: { instance?: unknown } }).Cal?.instance)
      if (calReady) return
      window.open(`https://cal.com/${trigger.getAttribute('data-cal-link')}`, '_blank', 'noopener')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
