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
  { key: 'pricing',         label: 'Pricing',         dropdown: false, href: '/pricing' },
  { key: 'success-stories', label: 'Jobs',            dropdown: false, href: '/jobs' },
  { key: 'about',           label: 'About',           dropdown: true, href: '/about-nexthire' },
]

/* ── Mega-menu: 6 features (2×3) + tapered promo — same shell for Candidates & Companies ── */

type MegaFeature = {
  title: string
  desc: string
  href: string
}

const CANDIDATE_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'AI Outreach Agent',
    desc: 'Personalised emails to hiring managers from your Gmail — privacy-safe, auto-deleted after send.',
    href: '/candidates#candidates-tools',
  },
  {
    title: 'AI Auto Apply',
    desc: 'Tailored applications across matched roles with ATS-optimised resumes per submission.',
    href: '/candidates#candidates-tools',
  },
  {
    title: 'Resume Builder',
    desc: 'AI-drafted, expert-reviewed resumes tuned to every role you target.',
    href: '/candidates#candidates-tools',
  },
  {
    title: 'AI Interview Coach',
    desc: 'Real-time coaching on live calls — surface strong answers when it matters.',
    href: '/candidates#candidates-tools',
  },
  {
    title: 'AI Interviewer',
    desc: 'Mock interviews calibrated to your target company with scored feedback.',
    href: '/candidates#candidates-tools',
  },
  {
    title: 'Job Tracker',
    desc: 'Every application, reply, and interview stage in one dashboard with reminders.',
    href: '/candidates#candidates-tools',
  },
]

const COMPANY_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'AI Sourcing',
    desc: 'Natural-language search across 800M+ profiles — enriched, scored shortlists in hours.',
    href: '/companies#companies-platform',
  },
  {
    title: 'AI Phone Screening',
    desc: 'Structured screens the moment candidates apply — transcripts and hire signals included.',
    href: '/companies#companies-platform',
  },
  {
    title: 'AI Video Interviewer',
    desc: 'Async video interviews with analytics, scoring, and ranked shortlists.',
    href: '/companies#companies-platform',
  },
  {
    title: 'SMS Engagement Agent',
    desc: 'Qualify, nudge, and schedule via text — higher reply rates than email alone.',
    href: '/companies#companies-platform',
  },
  {
    title: 'AI Outreach',
    desc: 'Per-candidate copy and multi-step sequences across email and LinkedIn.',
    href: '/companies#companies-platform',
  },
  {
    title: 'ATS & integrations',
    desc: '50+ native ATS and CRM connections — sync shortlists and scores automatically.',
    href: '/companies#companies-integrations',
  },
]

const ABOUT_MEGA_FEATURES: MegaFeature[] = [
  {
    title: 'About NextHire',
    desc: 'Our mission, story, and how we connect talent with opportunity at scale.',
    href: '/about-nexthire',
  },
  {
    title: 'Success stories',
    desc: 'Real outcomes from candidates who stopped waiting — interviews, offers, and momentum.',
    href: '/success-story',
  },
  {
    title: 'Careers at NextHire',
    desc: 'Join the team building the future of hiring and job search.',
    href: '/why-join-nexthire',
  },
  {
    title: 'Contact us',
    desc: 'Sales, support, and partnerships — tell us what you need.',
    href: '/contact-us',
  },
  {
    title: 'Blog & insights',
    desc: 'Interviews, AI hiring trends, and playbooks for candidates and teams.',
    href: '/blog',
  },
]

type MegaMenuVariant = 'candidates' | 'companies' | 'about'

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
  promoTone: 'candidates' | 'companies' | 'about'
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
                  <span className="nh-mega-menu__feat-title">{f.title}</span>
                  <span className="nh-mega-menu__feat-desc">{f.desc}</span>
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
                    <div
                      key={item.key}
                      className="main-nav-menu-dropdown w-dropdown"
                    >
                      <Link
                        href={item.href}
                        className="main-nav-dropdown-toggle w-dropdown-toggle"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', textDecoration: 'none' }}
                        onClick={() => dispatch(closeMobileMenu())}
                      >
                        <span className="main-nav-menu-dropdown-text">{item.label}</span>
                      </Link>
                    </div>
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
