'use client'

import { useState } from 'react'

export interface AccordionFaqItem {
  question: string
  answer?: string
}

interface AccordionFaqProps {
  title?: string
  items: AccordionFaqItem[]
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`nh-accordion-icon${open ? ' nh-accordion-icon--open' : ''}`}
    >
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

interface AccordionItemProps {
  item: AccordionFaqItem
  open: boolean
  onToggle: () => void
  index: number
}

function AccordionItem({ item, open, onToggle, index }: AccordionItemProps) {
  const answerId = `nh-faq-answer-${index}`
  const buttonId = `nh-faq-btn-${index}`
  return (
    <div className={`nh-accordion-item${open ? ' nh-accordion-item--open' : ''}`}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={buttonId}
          aria-controls={answerId}
          aria-expanded={open}
          className="nh-accordion-button"
          onClick={onToggle}
        >
          <span className="nh-accordion-question">{item.question}</span>
          <PlusIcon open={open} />
        </button>
      </h3>
      {open && item.answer && (
        <div
          id={answerId}
          role="region"
          aria-labelledby={buttonId}
          className="nh-accordion-answer"
        >
          {item.answer}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AccordionFaq({ title = 'FAQs', items }: AccordionFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <div className="nh-accordion-faq">
      {title && (
        <div className="nh-accordion-header">
          <h2 className="nh-accordion-title">{title}</h2>
        </div>
      )}
      <div className="nh-accordion-list">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            open={openIndex === i}
            onToggle={() => toggle(i)}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
