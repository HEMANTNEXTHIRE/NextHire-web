'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  toggleMobileMenu,
  setActiveDropdown,
  setScrolled,
  closeMobileMenu,
} from '@/store/slices/navSlice'

const NAV_ITEMS = [
  { key: 'candidates',      label: 'Candidates',      dropdown: true, href: '/candidates' },
  { key: 'for-clients',     label: 'Companies',       dropdown: true, href: '/companies' },
  { key: 'pricing',         label: 'Pricing',         dropdown: true, href: '/pricing' },
  { key: 'success-stories', label: 'Jobs',            dropdown: true, href: '/jobs' },
  { key: 'about',           label: 'About',           dropdown: true, href: '/about-nexthire' },
]

/* ── Mega-menu: 6 features (2×3) + tapered promo — same shell for Candidates & Companies ── */
const MEGA_ICON = {
  send: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2z" />
    </svg>
  ),
  zap: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  file: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6" />
    </svg>
  ),
  mic: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  video: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x={2} y={6} width={14} height={12} rx={2} />
    </svg>
  ),
  list: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  ),
  search: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx={11} cy={11} r={8} /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  phone: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  message: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  mail: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width={20} height={16} x={2} y={4} rx={2} /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  plug: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  ),
  wallet: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v1" /><circle cx={17} cy={14} r={1} />
    </svg>
  ),
  building: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12h12" /><path d="M6 16h12" /><path d="M10 6h.01" /><path d="M10 10h.01" /><path d="M14 6h.01" /><path d="M14 10h.01" />
    </svg>
  ),
  calendar: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width={18} height={18} x={3} y={4} rx={2} /><path d="M3 10h18" />
    </svg>
  ),
  package: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8.73 5.05 8.73-5.05" /><path d="M12 22.08V12" />
    </svg>
  ),
  chart: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" /><path d="M7 12h4" /><path d="M7 18h8" /><path d="M7 6h12" />
    </svg>
  ),
  help: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx={12} cy={12} r={10} /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
    </svg>
  ),
  briefcase: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width={20} height={14} x={2} y={6} rx={2} />
    </svg>
  ),
  users: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  globe: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx={12} cy={12} r={10} /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  ),
  bell: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  book: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  sparkle: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
    </svg>
  ),
} as const

type MegaIconKey = keyof typeof MEGA_ICON

type MegaFeature = {
  title: string
  desc: string
  href: string
  icon: MegaIconKey
}

const CANDIDATE_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'AI Outreach Agent',
    desc: 'Personalised emails to hiring managers from your Gmail — privacy-safe, auto-deleted after send.',
    href: '/candidates#candidates-tools',
    icon: 'send',
  },
  {
    title: 'AI Auto Apply',
    desc: 'Tailored applications across matched roles with ATS-optimised resumes per submission.',
    href: '/candidates#candidates-tools',
    icon: 'zap',
  },
  {
    title: 'Resume Builder',
    desc: 'AI-drafted, expert-reviewed resumes tuned to every role you target.',
    href: '/candidates#candidates-tools',
    icon: 'file',
  },
  {
    title: 'AI Interview Coach',
    desc: 'Real-time coaching on live calls — surface strong answers when it matters.',
    href: '/candidates#candidates-tools',
    icon: 'mic',
  },
  {
    title: 'AI Interviewer',
    desc: 'Mock interviews calibrated to your target company with scored feedback.',
    href: '/candidates#candidates-tools',
    icon: 'video',
  },
  {
    title: 'Job Tracker',
    desc: 'Every application, reply, and interview stage in one dashboard with reminders.',
    href: '/candidates#candidates-tools',
    icon: 'list',
  },
]

const COMPANY_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'AI Sourcing',
    desc: 'Natural-language search across 800M+ profiles — enriched, scored shortlists in hours.',
    href: '/companies#companies-platform',
    icon: 'search',
  },
  {
    title: 'AI Phone Screening',
    desc: 'Structured screens the moment candidates apply — transcripts and hire signals included.',
    href: '/companies#companies-platform',
    icon: 'phone',
  },
  {
    title: 'AI Video Interviewer',
    desc: 'Async video interviews with analytics, scoring, and ranked shortlists.',
    href: '/companies#companies-platform',
    icon: 'video',
  },
  {
    title: 'SMS Engagement Agent',
    desc: 'Qualify, nudge, and schedule via text — higher reply rates than email alone.',
    href: '/companies#companies-platform',
    icon: 'message',
  },
  {
    title: 'AI Outreach',
    desc: 'Per-candidate copy and multi-step sequences across email and LinkedIn.',
    href: '/companies#companies-platform',
    icon: 'mail',
  },
  {
    title: 'ATS & integrations',
    desc: '50+ native ATS and CRM connections — sync shortlists and scores automatically.',
    href: '/companies#companies-integrations',
    icon: 'plug',
  },
]

/** Mirrors PricingPageClient: candidate + company plans, billing, FAQ anchors */
const PRICING_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'Plans for candidates',
    desc: 'Free, Lite, Pro, and Max — Auto Apply, coach hours, and outreach credits scale with you.',
    href: '/pricing#pricing-plans',
    icon: 'wallet',
  },
  {
    title: 'Plans for companies',
    desc: 'Starter (free) to Enterprise — sourcing credits, agents, and ATS sync at any scale.',
    href: '/pricing#pricing-plans',
    icon: 'building',
  },
  {
    title: 'Quarterly billing',
    desc: 'Save on candidate plans when you switch to quarterly — same features, lower effective rate.',
    href: '/pricing#pricing-plans',
    icon: 'calendar',
  },
  {
    title: "What's always included",
    desc: 'Privacy posture, support tiers, and platform guarantees — spelled out line by line.',
    href: '/pricing#pricing-included',
    icon: 'package',
  },
  {
    title: 'ROI & volume',
    desc: 'Benchmarks on shortlist speed, recruiter hours saved, and completion rates.',
    href: '/pricing#pricing-numbers',
    icon: 'chart',
  },
  {
    title: 'FAQ & credits',
    desc: 'How sourcing credits work, what counts as a seat, and billing questions answered.',
    href: '/pricing#pricing-faq',
    icon: 'help',
  },
]

/** Jobs board (full design later) — consistent mega-menu footprint */
const JOBS_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'All open roles',
    desc: 'A single feed of roles from hiring partners — filter by stack, level, and location (launching soon).',
    href: '/jobs#jobs-board',
    icon: 'briefcase',
  },
  {
    title: 'By company',
    desc: 'Browse openings grouped by employer — see who is hiring before you apply.',
    href: '/jobs#jobs-by-company',
    icon: 'building',
  },
  {
    title: 'Remote & hybrid',
    desc: 'Location-friendly search for distributed teams and flexible work.',
    href: '/jobs#jobs-locations',
    icon: 'globe',
  },
  {
    title: 'Saved searches & alerts',
    desc: 'Get notified when new roles match your profile — no more manual refreshing.',
    href: '/jobs#jobs-alerts',
    icon: 'bell',
  },
  {
    title: 'Apply with NextHire',
    desc: 'Pair the board with AI Auto Apply and outreach — we handle the heavy lifting.',
    href: '/candidates#candidates-tools',
    icon: 'zap',
  },
  {
    title: 'Candidate pricing',
    desc: 'See plans and credits for job seekers using the full agent stack.',
    href: '/pricing#pricing-plans',
    icon: 'wallet',
  },
]

const ABOUT_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'About NextHire',
    desc: 'Our mission, story, and how we connect talent with opportunity at scale.',
    href: '/about-nexthire',
    icon: 'sparkle',
  },
  {
    title: 'Success stories',
    desc: 'Real outcomes from candidates who stopped waiting — interviews, offers, and momentum.',
    href: '/success-story',
    icon: 'users',
  },
  {
    title: 'Careers at NextHire',
    desc: 'Join the team building the future of hiring and job search.',
    href: '/why-join-nexthire',
    icon: 'briefcase',
  },
  {
    title: 'Contact us',
    desc: 'Sales, support, and partnerships — tell us what you need.',
    href: '/contact-us',
    icon: 'message',
  },
  {
    title: 'Blog & insights',
    desc: 'Interviews, AI hiring trends, and playbooks for candidates and teams.',
    href: '/blog',
    icon: 'book',
  },
  {
    title: 'Talk to an expert',
    desc: 'Book time with our team for demos, enterprise, or custom workflows.',
    href: '/talk-to-an-expert',
    icon: 'help',
  },
]

type MegaMenuVariant = 'candidates' | 'companies' | 'pricing' | 'jobs' | 'about'

type PromoAction = {
  label: string
  href: string
  external?: boolean
  variant: 'primary' | 'secondary'
}

type MegaMenuConfig = {
  introTitle: string
  introDesc: string
  overviewHref: string
  features: MegaFeature[]
  footerHref: string
  footerLabel: string
  promoTone: 'candidates' | 'companies' | 'pricing' | 'jobs' | 'about'
  promoAria: string
  promoKicker: string
  promoHeadline: string
  promoSub: string
  promoActions: PromoAction[]
}

const MEGA_MENU_CONFIG: Record<MegaMenuVariant, MegaMenuConfig> = {
  candidates: {
    introTitle: 'NextHire for Candidates',
    introDesc:
      'Your AI agent runs discovery, apply, outreach, and interview prep — so you can focus on landing the offer.',
    overviewHref: '/candidates',
    features: CANDIDATE_MEGA_FEATURES,
    footerHref: '/candidates#candidates-tools',
    footerLabel: 'Explore all candidate tools',
    promoTone: 'candidates',
    promoAria: 'Get started',
    promoKicker: 'GET STARTED',
    promoHeadline: 'Escape the apply and pray cycle',
    promoSub: 'One workspace for outreach, applications, and interview prep — fully tracked.',
    promoActions: [
      {
        label: 'Try for free',
        href: 'https://app.nexthireconsulting.com',
        external: true,
        variant: 'primary',
      },
    ],
  },
  companies: {
    introTitle: 'NextHire for Companies',
    introDesc:
      'Five AI agents run sourcing, screening, engagement, and outreach in parallel — your team only meets finalists.',
    overviewHref: '/companies',
    features: COMPANY_MEGA_FEATURES,
    footerHref: '/companies#companies-platform',
    footerLabel: 'Explore all company capabilities',
    promoTone: 'companies',
    promoAria: 'Start hiring',
    promoKicker: 'FOR TEAMS',
    promoHeadline: 'Deploy AI agents across your hiring stack',
    promoSub: 'Shortlists, screens, and outreach — synced to the ATS your team already uses.',
    promoActions: [
      {
        label: 'Start hiring free',
        href: 'https://app.nexthireconsulting.com',
        external: true,
        variant: 'primary',
      },
      { label: 'Book a demo', href: '/contact-us', variant: 'secondary' },
    ],
  },
  pricing: {
    introTitle: 'Pricing',
    introDesc:
      'Separate, transparent plans for job seekers and employers — toggle candidates vs companies on the pricing page.',
    overviewHref: '/pricing',
    features: PRICING_MEGA_FEATURES,
    footerHref: '/pricing#pricing-faq',
    footerLabel: 'Read pricing FAQ',
    promoTone: 'pricing',
    promoAria: 'Compare plans',
    promoKicker: 'TRANSPARENT',
    promoHeadline: 'Pick the plan that matches your volume',
    promoSub: 'Free tiers to try, quarterly savings for candidates, and custom enterprise for teams.',
    promoActions: [
      { label: 'View full pricing', href: '/pricing', variant: 'primary' },
      { label: 'Talk to sales', href: '/contact-us', variant: 'secondary' },
    ],
  },
  jobs: {
    introTitle: 'Jobs',
    introDesc:
      'We are building a unified job board across partner companies. Until launch, explore tools and pricing that accelerate your search.',
    overviewHref: '/jobs',
    features: JOBS_MEGA_FEATURES,
    footerHref: '/jobs#jobs-board',
    footerLabel: 'See jobs hub',
    promoTone: 'jobs',
    promoAria: 'Job board updates',
    promoKicker: 'COMING SOON',
    promoHeadline: 'Every role. One destination.',
    promoSub: 'Save searches, browse by company, and apply with your NextHire agent — all in one place.',
    promoActions: [
      { label: 'Get job alerts', href: '/contact-us', variant: 'primary' },
      { label: 'Try candidate tools', href: '/candidates', variant: 'secondary' },
    ],
  },
  about: {
    introTitle: 'Company',
    introDesc:
      'Learn who we are, read success stories, reach out, or explore careers — everything about NextHire in one menu.',
    overviewHref: '/about-nexthire',
    features: ABOUT_MEGA_FEATURES,
    footerHref: '/contact-us',
    footerLabel: 'Contact the team',
    promoTone: 'about',
    promoAria: 'Connect with NextHire',
    promoKicker: "WE'RE HERE",
    promoHeadline: 'Questions, press, or partnerships?',
    promoSub: 'Our team answers fast — or browse stories from candidates who made the leap.',
    promoActions: [
      { label: 'Contact us', href: '/contact-us', variant: 'primary' },
      { label: 'Join our team', href: '/why-join-nexthire', variant: 'secondary' },
    ],
  },
}

function NavMegaMenu({
  variant,
  onNavigate,
}: {
  variant: MegaMenuVariant
  onNavigate: () => void
}) {
  const cfg = MEGA_MENU_CONFIG[variant]

  return (
    <div className={`nh-mega-menu nh-mega-menu--${variant}`}>
      <div className="nh-mega-menu__main">
        <div className="nh-mega-menu__intro">
          <h2 className="nh-mega-menu__intro-title">{cfg.introTitle}</h2>
          <p className="nh-mega-menu__intro-desc">{cfg.introDesc}</p>
          <Link href={cfg.overviewHref} className="nh-mega-menu__intro-link" onClick={onNavigate}>
            Learn more <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="nh-mega-menu__scroll">
          <ul className="nh-mega-menu__grid">
            {cfg.features.map((f) => (
              <li key={f.title} className="nh-mega-menu__grid-item">
                <Link href={f.href} className="nh-mega-menu__feat" onClick={onNavigate}>
                  <span className="nh-mega-menu__feat-icon">{MEGA_ICON[f.icon]}</span>
                  <span className="nh-mega-menu__feat-body">
                    <span className="nh-mega-menu__feat-title">{f.title}</span>
                    <span className="nh-mega-menu__feat-desc">{f.desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href={cfg.footerHref} className="nh-mega-menu__footer-link" onClick={onNavigate}>
            {cfg.footerLabel}
            <span aria-hidden> →</span>
          </Link>
        </div>
      </div>

      <aside
        className={`nh-mega-menu__promo nh-mega-menu__promo--${cfg.promoTone}`}
        aria-label={cfg.promoAria}
      >
        <div className="nh-mega-menu__promo-glow" aria-hidden />
        <div className="nh-mega-menu__promo-inner">
          <p className="nh-mega-menu__promo-kicker">{cfg.promoKicker}</p>
          <h3 className="nh-mega-menu__promo-headline">{cfg.promoHeadline}</h3>
          <p className="nh-mega-menu__promo-sub">{cfg.promoSub}</p>
          <div
            className={
              cfg.promoActions.length > 1
                ? 'nh-mega-menu__promo-actions'
                : undefined
            }
          >
            {cfg.promoActions.map((a) =>
              a.variant === 'primary' ? (
                <Link
                  key={a.label}
                  href={a.href}
                  className="nh-mega-menu__promo-btn"
                  target={a.external ? '_blank' : undefined}
                  rel={a.external ? 'noopener noreferrer' : undefined}
                  onClick={onNavigate}
                >
                  {a.label}
                </Link>
              ) : (
                <Link
                  key={a.label}
                  href={a.href}
                  className="nh-mega-menu__promo-btn-secondary"
                  onClick={onNavigate}
                >
                  {a.label} <span aria-hidden>→</span>
                </Link>
              )
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function Header() {
  const dispatch = useAppDispatch()
  const { isOpen, activeDropdown, isScrolled } = useAppSelector((s) => s.nav)
  const headerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Close mobile menu and dropdown whenever route changes
  useEffect(() => {
    dispatch(closeMobileMenu())
    dispatch(setActiveDropdown(null))
  }, [pathname, dispatch])

  // Scroll listener → fixed-menu class (on body so .fixed-menu .main-nav gets solid background)
  useEffect(() => {
    const onScroll = () => {
      dispatch(setScrolled(window.scrollY > 50))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dispatch])

  // Sync fixed-menu to body so Webflow CSS (.fixed-menu .main-nav) applies — prevents transparent bar when scrolled
  useEffect(() => {
    const fixed = isScrolled || isOpen
    if (fixed) document.body.classList.add('fixed-menu')
    else document.body.classList.remove('fixed-menu')
    return () => document.body.classList.remove('fixed-menu')
  }, [isScrolled, isOpen])

  // Close mobile menu on outside click
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        dispatch(closeMobileMenu())
      }
    }
    if (isOpen) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isOpen, dispatch])

  // Close nav dropdown when clicking outside header (click-to-open only, no hover)
  // Delay adding listener so the same click that opened the dropdown doesn't close it
  useEffect(() => {
    if (!activeDropdown) return
    let removeListener: (() => void) | null = null
    const id = setTimeout(() => {
      const onClickOutside = (e: MouseEvent) => {
        if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
          dispatch(setActiveDropdown(null))
        }
      }
      document.addEventListener('mousedown', onClickOutside)
      removeListener = () => document.removeEventListener('mousedown', onClickOutside)
    }, 0)
    return () => {
      clearTimeout(id)
      removeListener?.()
    }
  }, [activeDropdown, dispatch])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isOpen])

  const navClasses = [
    'main-nav w-nav',
    isScrolled || isOpen ? 'fixed-menu' : '',
    isOpen ? 'mobile-menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className={`page-header${isScrolled ? ' page-header-scrolled' : ''}`} ref={headerRef}>
        <div
          className={navClasses}
          role="banner"
          data-collapse="medium"
        >
          <div className="main-nav-container w-container">
            <div className="main-nav-container-wrapper">
              {/* Hamburger — FIRST in DOM so mobile layout [≡ | Logo | CTA] needs no CSS order tricks */}
              <div
                className={`main-nav-menu-btn w-nav-button${isOpen ? ' w--open' : ''}`}
                role="button"
                aria-label="Toggle mobile menu"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                <div className="main-nav-menu-toggle-animated icon-4 w-icon-nav-menu" />
              </div>

              {/* Logo */}
              <Link href="/" className="brand w-nav-brand" onClick={() => dispatch(closeMobileMenu())}>
                <img
                  src="/Image/Nexthire.svg"
                  alt="Nexthire"
                  className="brand-logo"
                  loading="lazy"
                />
                <img
                  src="/Image/Nexthire_green.svg"
                  alt="Nexthire"
                  className="brand-logo-active"
                  loading="eager"
                />
              </Link>

              {/* Mobile CTA — THIRD in DOM so it appears right of logo on mobile */}
              <div className="nh-cta-header-mobile">
                <Link href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" className="button-primary w-button main-nav-cta-try">
                  Try for free
                </Link>
              </div>

              {/* Desktop nav — hidden on mobile via CSS */}
              <nav className="nav-menu w-nav-menu" role="navigation">
                <div className="main-nav-vertical-line" />

                <div className="header-navigation-html-embed w-embed" />

                {NAV_ITEMS.map((item) =>
                  item.dropdown ? (
                    <div
                      key={item.key}
                      className={`main-nav-menu-dropdown w-dropdown${activeDropdown === item.key ? ' w--open' : ''}`}
                    >
                      <button
                        type="button"
                        className="main-nav-dropdown-toggle w-dropdown-toggle"
                        aria-expanded={activeDropdown === item.key ? 'true' : 'false'}
                        aria-haspopup="true"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // On mobile: navigate directly to the section page
                          if (typeof window !== 'undefined' && window.innerWidth <= 991 && item.href) {
                            dispatch(closeMobileMenu())
                            router.push(item.href)
                            return
                          }
                          dispatch(
                            setActiveDropdown(activeDropdown === item.key ? null : item.key)
                          )
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                      >
                        <span className="main-nav-menu-dropdown-text">{item.label}</span>
                      </button>

                      {activeDropdown === item.key && (
                        <nav
                          className="dropdown-list w-dropdown-list w--open"
                          style={{ display: 'block', visibility: 'visible', opacity: 1 }}
                        >
                          <div className="submenu__wrapper">
                            {/* Render dropdown content based on nav item */}
                            <DropdownContent item={item} />
                          </div>
                        </nav>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.key}
                      href={(item as any).href || '/'}
                      className="main-nav-menu-dropdown-text w-nav-link"
                      style={{ padding: '20px 15px', display: 'block' }}
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                {/* CTA button — mobile menu only (hidden on desktop via CSS) */}
                <div className="main-manu-btn nh-cta-mobile">
                  <Link href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" className="button-primary w-button main-nav-cta-try" onClick={() => dispatch(closeMobileMenu())}>
                    Try for free
                  </Link>
                </div>
              </nav>

              {/* CTA button — desktop only, lives outside <nav> so nav links can be centred */}
              <div className="nh-cta-desktop">
                <Link href="https://app.nexthireconsulting.com" target="_blank" rel="noopener noreferrer" className="button-primary w-button main-nav-cta-try" onClick={() => dispatch(closeMobileMenu())}>
                  Try for free
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DropdownContent({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const dispatch = useAppDispatch()

  if (item.key === 'candidates') {
    return (
      <NavMegaMenu variant="candidates" onNavigate={() => dispatch(setActiveDropdown(null))} />
    )
  }

  if (item.key === 'pricing') {
    return <NavMegaMenu variant="pricing" onNavigate={() => dispatch(setActiveDropdown(null))} />
  }

  if (item.key === 'success-stories') {
    return <NavMegaMenu variant="jobs" onNavigate={() => dispatch(setActiveDropdown(null))} />
  }

  if (item.key === 'about') {
    return <NavMegaMenu variant="about" onNavigate={() => dispatch(setActiveDropdown(null))} />
  }

  if (item.key === 'for-clients') {
    return (
      <NavMegaMenu variant="companies" onNavigate={() => dispatch(setActiveDropdown(null))} />
    )
  }

  return null
}
