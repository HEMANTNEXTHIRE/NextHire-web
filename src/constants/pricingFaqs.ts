export interface FaqItem {
  question: string
  answer: string
}

export const PRICING_FAQS_CANDIDATES: FaqItem[] = [
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer:
      'Yes. Change your plan at any time from your dashboard. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
  },
  {
    question: 'What happens when I hit my InMail or Apply limit?',
    answer:
      "On Free you'll be prompted to upgrade. On Lite and Pro, you can purchase additional credits as add-ons at any time.",
  },
  {
    question: 'Is the quarterly discount applied automatically?',
    answer:
      'Yes — toggle to Quarterly billing at checkout or in account settings. The 10% discount is applied to every month in the quarter.',
  },
  {
    question: 'What is an AI Outreach Agent credit?',
    answer:
      'Each credit powers one personalised outreach email sent to a hiring manager or recruiter from your own Gmail, via the AI Outreach Agent. The Max plan includes 3,000 credits per month.',
  },
  {
    question: 'Do I need a credit card for the Free plan?',
    answer:
      'No credit card required. Sign up, connect your account, and start using the free tools immediately.',
  },
]
