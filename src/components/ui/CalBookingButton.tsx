'use client'

import { useEffect } from 'react'

/** Minimal type for the Cal.com embed global */
interface CalEmbed {
  (action: string, namespace: string, options?: Record<string, unknown>): void
  ns: Record<string, (action: string, options?: Record<string, unknown>) => void>
  loaded?: boolean
}

declare global {
  interface Window {
    Cal?: CalEmbed
  }
}

interface CalBookingButtonProps {
  /** Cal.com link e.g. "shubham-4pkegy/30min" */
  calLink?: string
  namespace?: string
  buttonText?: string
  layout?: string
  brandColor?: string
}

export default function CalBookingButton({
  calLink = 'shubham-4pkegy/30min',
  namespace = '30min',
  buttonText = 'Book Session',
  layout = 'month_view',
  brandColor = '#173b3f',
}: CalBookingButtonProps) {
  useEffect(() => {
    const initCal = () => {
      const Cal = window.Cal
      if (!Cal) return

      Cal('init', namespace, { origin: 'https://app.cal.com' })
      Cal.ns[namespace]?.('floatingButton', {
        calLink,
        config: { layout },
        buttonText,
      })
      Cal.ns[namespace]?.('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': brandColor } },
        hideEventTypeDetails: false,
        layout,
      })
    }

    // Guard: only inject script once
    if (document.querySelector('script[data-cal-embed]')) {
      initCal()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.setAttribute('data-cal-embed', 'true')
    script.onload = initCal
    document.head.appendChild(script)

    return () => {
      try {
        document.querySelector('.cal-floating-button')?.remove()
      } catch {
        // ignore cleanup errors
      }
    }
  }, [calLink, namespace, buttonText, layout, brandColor])

  return null
}

/** Inline Cal trigger button (not floating) */
export function CalTriggerButton({
  calLink = 'shubham-4pkegy/30min',
  namespace = '30min',
  label = 'Book Session',
  className = 'button-primary w-button',
}: {
  calLink?: string
  namespace?: string
  label?: string
  className?: string
}) {
  return (
    <button
      className={className}
      data-cal-link={calLink}
      data-cal-namespace={namespace}
      data-cal-config={`{"layout":"month_view"}`}
    >
      {label}
    </button>
  )
}
