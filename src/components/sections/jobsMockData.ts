/** Sample roles — replace with API / DB when backend exists */

export type JobLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead'
export type EmploymentType = 'Full-time' | 'Contract' | 'Part-time'
export type WorkType = 'Remote' | 'Hybrid' | 'Onsite'

export type JobListing = {
  id: string
  title: string
  company: string
  location: string
  remoteFriendly: boolean
  salaryDisplay: string | null
  employmentType: EmploymentType
  workType: WorkType
  level: JobLevel
  postedDaysAgo: number
  snippet: string
  description: string
  requirements: string[]
  skills: string[]
  applyUrl: string
  careerUrl: string
}

export const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Health Program Specialist I',
    company: 'CDC Foundation',
    location: 'Nevada',
    remoteFriendly: false,
    salaryDisplay: '$50,000 – $58,349',
    employmentType: 'Full-time',
    workType: 'Onsite',
    level: 'Mid',
    postedDaysAgo: 2,
    snippet:
      'Support public health initiatives through program coordination, stakeholder engagement, and grant reporting. Partner with state agencies to improve community outcomes.',
    description:
      'You will coordinate health education programs, track outcomes in our CRM, and present quarterly updates to funders. Strong communication skills and comfort with data tools are essential. We value mission-driven people who thrive in collaborative, fast-moving environments.',
    requirements: [
      "Bachelor's degree in public health or related field",
      'Two years of experience in program coordination or community health',
      'Proficiency with Excel and presentation tools',
    ],
    skills: ['Program management', 'Public health', 'Stakeholder relations', 'Reporting', 'CRM'],
    applyUrl: 'https://example.com/apply/1',
    careerUrl: 'https://example.com/careers/cdc',
  },
  {
    id: '2',
    title: 'Senior Product Designer',
    company: 'Northwind Labs',
    location: 'Remote (US)',
    remoteFriendly: true,
    salaryDisplay: '$145,000 – $175,000',
    employmentType: 'Full-time',
    workType: 'Remote',
    level: 'Senior',
    postedDaysAgo: 5,
    snippet:
      'Lead design for our AI hiring platform — systems thinking, prototyping in Figma, and tight collaboration with PM and engineering.',
    description:
      'Own the end-to-end design process for core recruiter workflows. You will run research sessions, maintain our design system, and ship polished UI that scales across web and email touchpoints.',
    requirements: [
      '5+ years product design experience',
      'Strong portfolio showing complex B2B workflows',
      'Experience with design systems at scale',
    ],
    skills: ['Figma', 'Design systems', 'UX research', 'Prototyping', 'B2B SaaS'],
    applyUrl: 'https://example.com/apply/2',
    careerUrl: 'https://example.com/careers/nw',
  },
  {
    id: '3',
    title: 'Backend Engineer — Platform',
    company: 'Stripe',
    location: 'San Francisco, CA',
    remoteFriendly: true,
    salaryDisplay: '$180,000 – $220,000',
    employmentType: 'Full-time',
    workType: 'Hybrid',
    level: 'Senior',
    postedDaysAgo: 1,
    snippet:
      'Build reliable APIs and data pipelines for payments infrastructure. Go, Ruby, and distributed systems experience preferred.',
    description:
      'Join the platform team shipping APIs used by millions of businesses. You will design for reliability, observability, and safe rollout of high-impact changes.',
    requirements: [
      '4+ years backend development',
      'Experience with high-traffic distributed systems',
      'Strong testing and operational discipline',
    ],
    skills: ['Go', 'Ruby', 'PostgreSQL', 'Kafka', 'Kubernetes'],
    applyUrl: 'https://example.com/apply/3',
    careerUrl: 'https://stripe.com/jobs',
  },
  {
    id: '4',
    title: 'People Operations Coordinator',
    company: 'Brightline Health',
    location: 'Boston, MA',
    remoteFriendly: false,
    salaryDisplay: '$62,000 – $71,000',
    employmentType: 'Full-time',
    workType: 'Hybrid',
    level: 'Entry',
    postedDaysAgo: 14,
    snippet:
      'Support onboarding, benefits administration, and HRIS updates. Ideal for someone early in their HR career who loves detail and empathy.',
    description:
      'You will be the first point of contact for employee questions, maintain records in Workday, and help run engagement programs across a growing clinical team.',
    requirements: [
      "Bachelor's degree or equivalent experience",
      '1+ year in HR or people operations',
      'Discretion with sensitive information',
    ],
    skills: ['Workday', 'Onboarding', 'Benefits', 'HRIS', 'Communication'],
    applyUrl: 'https://example.com/apply/4',
    careerUrl: 'https://example.com/careers/brightline',
  },
  {
    id: '5',
    title: 'Contract — Technical Recruiter',
    company: 'Vertex Talent',
    location: 'Austin, TX',
    remoteFriendly: true,
    salaryDisplay: '$85 – $105 / hr',
    employmentType: 'Contract',
    workType: 'Remote',
    level: 'Mid',
    postedDaysAgo: 3,
    snippet:
      '6-month contract to support hiring for Series B fintech clients. Full-cycle recruiting for engineering and product roles.',
    description:
      'Source, screen, and close candidates in a competitive market. You will partner with hiring managers to refine reqs and deliver weekly pipeline reports.',
    requirements: [
      '3+ years technical recruiting',
      'Experience with ATS and outbound sourcing',
      'Comfort closing senior engineering candidates',
    ],
    skills: ['Full-cycle recruiting', 'LinkedIn', 'Greenhouse', 'Sourcing', 'Offer negotiation'],
    applyUrl: 'https://example.com/apply/5',
    careerUrl: 'https://example.com/careers/vertex',
  },
  {
    id: '6',
    title: 'Lead Data Analyst',
    company: 'Meridian Analytics',
    location: 'Chicago, IL',
    remoteFriendly: false,
    salaryDisplay: '$110,000 – $128,000',
    employmentType: 'Full-time',
    workType: 'Onsite',
    level: 'Lead',
    postedDaysAgo: 8,
    snippet:
      'Own reporting for executive leadership — SQL, Looker, and storytelling with data. Mentor two junior analysts.',
    description:
      'Define metrics frameworks, build trusted dashboards, and present insights that drive GTM decisions. You will collaborate with RevOps and Finance weekly.',
    requirements: [
      '6+ years analytics experience',
      'Expert SQL and BI tooling',
      'People leadership or mentorship experience',
    ],
    skills: ['SQL', 'Looker', 'Python', 'Metrics design', 'Leadership'],
    applyUrl: 'https://example.com/apply/6',
    careerUrl: 'https://example.com/careers/meridian',
  },
  {
    id: '7',
    title: 'Customer Success Manager',
    company: 'NextHire Partner Co.',
    location: 'Remote (Global)',
    remoteFriendly: true,
    salaryDisplay: '$78,000 – $92,000',
    employmentType: 'Full-time',
    workType: 'Remote',
    level: 'Mid',
    postedDaysAgo: 6,
    snippet:
      'Retain and grow mid-market accounts. Run QBRs, identify expansion, and partner with solutions engineers on technical wins.',
    description:
      'You will own a book of business, monitor health scores, and build playbooks that scale how we deliver value to recruiting teams.',
    requirements: [
      '3+ years B2B customer success or account management',
      'Experience with HR tech or ATS ecosystems a plus',
      'Excellent written and verbal communication',
    ],
    skills: ['QBRs', 'Expansion', 'SaaS', 'HR tech', 'Playbooks'],
    applyUrl: 'https://example.com/apply/7',
    careerUrl: 'https://example.com/careers/partner',
  },
  {
    id: '8',
    title: 'Frontend Engineer (React)',
    company: 'Coastal Apps',
    location: 'Seattle, WA',
    remoteFriendly: true,
    salaryDisplay: '$125,000 – $150,000',
    employmentType: 'Full-time',
    workType: 'Hybrid',
    level: 'Mid',
    postedDaysAgo: 12,
    snippet:
      'Ship accessible, performant UI in Next.js and TypeScript. Work closely with design on a component library used across products.',
    description:
      'We are modernizing our web stack. You will implement features, improve Core Web Vitals, and contribute to our shared React component library.',
    requirements: [
      '3+ years React and TypeScript',
      'Solid understanding of semantic HTML and a11y',
      'Experience with Next.js or similar frameworks',
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'Accessibility'],
    applyUrl: 'https://example.com/apply/8',
    careerUrl: 'https://example.com/careers/coastal',
  },
]
