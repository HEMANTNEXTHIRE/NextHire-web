'use client'

import { useState, useRef, useEffect } from 'react'
import { YouDescribeMac, AgentDiscoverMac, AgentReachesMac, YouLandMac } from '@/components/sections/ResumeBuilderShowcase'

type StepKey = 'describe' | 'discover' | 'outreach' | 'land'

const STEPS: { key: StepKey; label: string; description: string }[] = [
  {
    key: 'describe',
    label: 'You Describe',
    description:
      'Tell us your dream role, target companies, and ideal salary. That\'s all the agent needs to get to work.',
  },
  {
    key: 'discover',
    label: 'Agent Discovers',
    description:
      'Your AI scans millions of jobs, hidden roles, and hiring signals to build a targeted list of companies ready to hire someone like you.',
  },
  {
    key: 'outreach',
    label: 'Agent Reaches',
    description:
      'Hyper-personalised emails go out to hiring managers directly from your own email address. No third party. No spam. Just you.',
  },
  {
    key: 'land',
    label: 'You Land',
    description:
      'Replies hit your inbox, interviews get booked, and your dashboard tracks every touchpoint from first outreach to final offer.',
  },
]

export default function HowItWorksSection() {
  const [active, setActive] = useState<StepKey>('describe')
  const sectionRef = useRef<HTMLElement>(null)
  const isVisibleRef = useRef(false)
  const pendingAdvanceRef = useRef<StepKey | null>(null)
  const currentStep = STEPS.find((s) => s.key === active)!

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && pendingAdvanceRef.current) {
          setActive(pendingAdvanceRef.current)
          pendingAdvanceRef.current = null
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const advance = (next: StepKey) => {
    if (isVisibleRef.current) setActive(next)
    else pendingAdvanceRef.current = next
  }

  return (
    <section ref={sectionRef} id="how-it-works" style={{ background: '#ffffff', padding: '120px 30px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* Tab bar */}
        <div className="hiw-tabs">
          {STEPS.map((step) => (
            <button
              key={step.key}
              onClick={() => setActive(step.key)}
              className={`hiw-tab${active === step.key ? ' hiw-tab--active' : ''}`}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <div key={active} className="hiw-tab-desc">
          <p>{currentStep.description}</p>
        </div>

        {/* Platform mockup — always mounted so animation state is preserved on scroll */}
        <div key={`mac-${active}`} className="hiw-mac-wrap">
          {active === 'describe'
            ? <YouDescribeMac onComplete={() => advance('discover')} />
            : active === 'discover'
            ? <AgentDiscoverMac onComplete={() => advance('outreach')} />
            : active === 'outreach'
            ? <AgentReachesMac onComplete={() => advance('land')} />
            : <YouLandMac onComplete={() => setTimeout(() => advance('describe'), 2500)} />
          }
        </div>

      </div>
    </section>
  )
}
