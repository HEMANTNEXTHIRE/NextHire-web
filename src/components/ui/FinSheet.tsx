'use client'

import { useEffect } from 'react'

type IntercomWindow = Window & { Intercom?: (command: string) => void }

/**
 * Phone behaviour for the Intercom (Fin) messenger, which is fullscreen by default.
 * The sheet itself is CSS (see "Fin messenger" in globals.css), keyed off the
 * `intercom-mobile-messenger-active` class Intercom puts on <html>. If Intercom ever
 * renames that class the messenger simply falls back to its stock fullscreen view.
 *
 * This component supplies the two things CSS can't:
 *  - a tap-outside-to-close backdrop
 *  - sheet geometry that follows the on-screen keyboard via visualViewport
 *
 * It also flags when a page input has focus so the launcher can't sit on the field.
 */
export default function FinSheet() {
  useEffect(() => {
    const root = document.documentElement
    const viewport = window.visualViewport

    const sync = () => {
      const visibleH = viewport ? viewport.height : window.innerHeight
      const offsetTop = viewport ? viewport.offsetTop : 0
      const keyboardOpen = window.innerHeight - visibleH > 120
      const sheetH = keyboardOpen ? visibleH : Math.min(visibleH * 0.82, 680)
      root.style.setProperty('--nh-fin-h', `${Math.round(sheetH)}px`)
      root.style.setProperty('--nh-fin-top', `${Math.round(offsetTop + visibleH - sheetH)}px`)
    }

    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement && target.matches('input, textarea, select')
    const onFocusIn = (e: FocusEvent) => {
      if (isField(e.target)) root.classList.add('nh-field-focused')
    }
    const onFocusOut = (e: FocusEvent) => {
      if (isField(e.target)) root.classList.remove('nh-field-focused')
    }

    sync()
    viewport?.addEventListener('resize', sync)
    viewport?.addEventListener('scroll', sync)
    window.addEventListener('resize', sync)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)

    return () => {
      viewport?.removeEventListener('resize', sync)
      viewport?.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <button
      type="button"
      className="nh-fin-scrim"
      aria-label="Close chat"
      tabIndex={-1}
      onClick={() => (window as IntercomWindow).Intercom?.('hide')}
    />
  )
}
