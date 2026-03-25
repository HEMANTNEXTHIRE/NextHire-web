'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeNotification } from '@/store/slices/notificationSlice'

function NotificationItem({ id, title, message, details }: {
  id: string
  title: string
  message: string
  details?: string
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id))
    }, 6000)
    return () => clearTimeout(timer)
  }, [id, dispatch])

  return (
    <div className="notification">
      <button
        className="notification-close"
        onClick={() => dispatch(removeNotification(id))}
        aria-label="Dismiss notification"
      >
        ×
      </button>
      <div className="notification-header">
        <div className="notification-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="white"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div>
          <h4 className="notification-title">{title}</h4>
        </div>
      </div>
      <div className="notification-body">{message}</div>
      {details && <div className="notification-detail">✓ {details}</div>}
    </div>
  )
}

export default function NotificationContainer() {
  const { notifications } = useAppSelector((s) => s.notification)

  if (notifications.length === 0) return null

  return (
    <div id="notification-container">
      {notifications.map((n) => (
        <NotificationItem key={n.id} {...n} />
      ))}
    </div>
  )
}
