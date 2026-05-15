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
    })()
  }, [])

  return null
}
