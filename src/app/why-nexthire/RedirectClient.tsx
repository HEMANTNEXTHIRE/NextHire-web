'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectClient() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/companies/')
  }, [router])

  return (
    <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 15 }}>
      Redirecting…
    </div>
  )
}
