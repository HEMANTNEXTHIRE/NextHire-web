export interface FaqItem {
  question: string
  answer: string
}

export const PRICING_FAQS_CANDIDATES: FaqItem[] = [
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer:
      'Yes. Change your plan at any time from your dashboard. Upgrades take effect immediately; a downgrade starts when your current plan ends. Plans do not renew by themselves: we remind you by email 7, 3 and 1 days before the end, and you renew in one click.',
  },
  {
    question: 'What happens when I hit my InMail or Apply limit?',
    answer:
      "On Free you'll be prompted to choose a plan. On a paid plan your limits refill each month on your plan date, or you can upgrade to a bigger plan straight away.",
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
