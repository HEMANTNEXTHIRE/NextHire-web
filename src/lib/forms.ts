// Google Apps Script endpoints — no-cors mode required
// Set NEXT_PUBLIC_GOOGLE_SCRIPT_CONTACT in your .env.local for the correct URL
export const GOOGLE_SCRIPT_CONTACT =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_CONTACT ??
  'https://script.google.com/macros/s/AKfycbz4Zs9Sk4-2L2ehgdMoW5OK1qpPgx7Js8t6kymQVfPNXnWi1M1WbWBIg-bze5-uamGp/exec'

export interface LeadPayload {
  name: string
  email: string
  contact: string
  message: string
}

/**
 * Submit JSON payload to a Google Apps Script web app.
 * Uses no-cors mode — response is opaque; assume success if no network error is thrown.
 */
export async function submitToGoogleScript(url: string, data: LeadPayload): Promise<void> {
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
