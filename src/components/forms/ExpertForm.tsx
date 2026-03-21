'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setFormSubmitting, setFormSuccess, setFormError } from '@/store/slices/formSlice'
import { addNotification } from '@/store/slices/notificationSlice'
import { submitToGoogleScript, GOOGLE_SCRIPT_CONTACT } from '@/lib/forms'
import { FONT, WEIGHT } from '@/constants/typography'

export default function ExpertForm() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name || !contact) return

    setIsSubmitting(true)
    dispatch(setFormSubmitting('expertForm'))

    try {
      await submitToGoogleScript(GOOGLE_SCRIPT_CONTACT, {
        name,
        email,
        contact,
        message: message || 'Talk to an expert request',
      })

      dispatch(setFormSuccess({ key: 'expertForm', message: 'Request sent! We will contact you soon.' }))
      dispatch(addNotification({
        title: "Request Received!",
        message: "One of our experts will reach out to you shortly. We're excited to help with your career journey.",
        details: `Name: ${name} • Contact: ${contact}`,
      }))

      setEmail(''); setName(''); setContact(''); setMessage('')
    } catch {
      dispatch(setFormError({ key: 'expertForm', message: 'Failed to send. Please try again.' }))
      dispatch(addNotification({
        title: 'Submission Error',
        message: 'There was an issue submitting your form. Please try again or contact us directly.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #c8dfd6',
    borderRadius: '10px',
    fontSize: FONT.base,
    background: '#fff',
    color: '#1a3338',
    outline: 'none',
    fontFamily: "'Noto Sans', system-ui, sans-serif",
    transition: 'border-color 0.3s ease',
    marginBottom: '20px',
  }

  return (
    <form id="expertForm" className="custom-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          required
          placeholder="Email Address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="text"
          required
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="tel"
          required
          placeholder="Contact Number *"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary w-button"
        style={{
          width: '100%',
          padding: '16px',
          fontSize: FONT.base,
          fontWeight: WEIGHT.bold,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Talk to an Expert'}
      </button>
    </form>
  )
}
