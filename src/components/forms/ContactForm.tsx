'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setFormSubmitting, setFormSuccess, setFormError } from '@/store/slices/formSlice'
import { addNotification } from '@/store/slices/notificationSlice'
import { submitToGoogleScript, GOOGLE_SCRIPT_CONTACT } from '@/lib/forms'
import { FONT, WEIGHT } from '@/constants/typography'

const PURPOSE_OPTIONS = [
  { value: 'job_seeker-for-candidates', label: 'I am interested in For Candidates services' },
  { value: 'job_seeker', label: 'I am a job seeker and want to get hired' },
  { value: 'hire', label: 'I am looking to hire for our organisation' },
  { value: 'career', label: 'I am looking to make a career in Nexthire' },
]

export default function ContactForm() {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !purpose) return

    setIsSubmitting(true)
    dispatch(setFormSubmitting('contactForm'))

    try {
      await submitToGoogleScript(GOOGLE_SCRIPT_CONTACT, {
        name,
        email,
        contact: phone,
        message: `Purpose: ${purpose}${message ? ` | Message: ${message}` : ''}`,
      })

      dispatch(setFormSuccess({ key: 'contactForm', message: 'Message sent successfully!' }))
      dispatch(addNotification({
        title: 'Message Sent!',
        message: 'Thank you for reaching out. Our team will get back to you shortly.',
        details: `Purpose: ${purpose}`,
      }))

      setName(''); setEmail(''); setPhone(''); setPurpose(''); setMessage('')
    } catch {
      dispatch(setFormError({ key: 'contactForm', message: 'Failed to send. Please try again.' }))
      dispatch(addNotification({
        title: 'Submission Error',
        message: 'There was an issue submitting your form. Please try again or email us directly at info@nexthireconsulting.com.',
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
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#1a3338',
    fontSize: FONT.sm,
    fontWeight: WEIGHT.semi,
    marginBottom: '8px',
  }

  return (
    <form id="contactForm" className="contact-form-modern" onSubmit={handleSubmit}>
      <div className="form-field-group">
        <label style={labelStyle}>Full Name <span style={{ color: '#ff0000' }}>*</span></label>
        <input
          type="text"
          required
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div className="form-field-group">
        <label style={labelStyle}>Email Address <span style={{ color: '#ff0000' }}>*</span></label>
        <input
          type="email"
          required
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div className="form-field-group">
        <label style={labelStyle}>Phone Number <span style={{ color: '#ff0000' }}>*</span></label>
        <input
          type="tel"
          required
          placeholder="10-digit number"
          pattern="[0-9]{10}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div className="form-field-group">
        <label style={labelStyle}>Purpose <span style={{ color: '#ff0000' }}>*</span></label>
        <select
          required
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
        >
          <option value="">Select a purpose...</option>
          {PURPOSE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="form-field-group">
        <label style={labelStyle}>Message (Optional)</label>
        <textarea
          placeholder="Tell us more about your needs..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
        />
      </div>

      <button
        type="submit"
        className="submit-button-modern"
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
  )
}
