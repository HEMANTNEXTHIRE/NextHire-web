'use client'

/**
 * Embedded Sanity Studio — available at /studio during `next dev`.
 * Not included in the static export (S3) build because it requires
 * client-side JS to function as a SPA.
 */

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const Studio = dynamic(() => import('sanity').then((m) => m.Studio), { ssr: false })

export default function StudioPage() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Studio config={config} />
    </div>
  )
}
