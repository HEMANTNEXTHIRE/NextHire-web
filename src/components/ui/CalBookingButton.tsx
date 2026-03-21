'use client'

import { useEffect } from 'react'

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
    // Load Cal.com embed script dynamically
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      const Cal = (window as any).Cal
      if (!Cal) return

      Cal('init', namespace, { origin: 'https://app.cal.com' })
      Cal.ns[namespace]('floatingButton', {
        calLink,
        config: { layout },
        buttonText,
      })
      Cal.ns[namespace]('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': brandColor } },
        hideEventTypeDetails: false,
        layout,
      })
    }

    return () => {
      // Cleanup the floating button if component unmounts
      try {
        const btn = document.querySelector('.cal-floating-button')
        if (btn) btn.remove()
      } catch {}
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
