import type { Metadata } from 'next'
import { JobsBoardClient } from '@/components/sections/JobsBoardClient'
import DualActionCTA from '@/components/ui/DualActionCTA'

export const metadata: Metadata = {
  title: 'Jobs | NextHire',
  description:
    'Search open roles — filter by level, location, and employment type. Preview job details in one place.',
  alternates: { canonical: 'https://www.nexthireconsulting.com/jobs' },
}

export default function JobsPage() {
  return (
    <main className="jobs-page-root" style={{ background: '#ffffff', minHeight: '70vh' }}>
      <JobsBoardClient />

      <DualActionCTA
        leftTitle="GET STARTED"
        leftSubtitle="Kickstart your career journey"
        leftLabel="Try for free"
        leftHref="https://app.nexthireconsulting.com"
        rightTitle="TALK TO AN EXPERT"
        rightSubtitle="Let our team help you find the right role"
        rightLabel="Book a demo"
        rightHref="/contact-us"
      />
    </main>
  )
}
