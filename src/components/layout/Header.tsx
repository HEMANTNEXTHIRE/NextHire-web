'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  toggleMobileMenu,
  setActiveDropdown,
  setScrolled,
  closeMobileMenu,
} from '@/store/slices/navSlice'

const APP_URL = 'https://app.nexthireconsulting.com'
/* The app has no login route of its own: its home page carries the Log in button and
   sends anyone already signed in straight to their dashboard. */
const LOGIN_URL = APP_URL

/* Cal.com popup, wired site-wide by CalInit */
const CAL_ATTRS = {
  'data-cal-namespace': '30min',
  'data-cal-link': 'hemant-nexthire/30min',
  'data-cal-config': '{"layout":"month_view"}',
} as const

/* Shown in the phone menu only: the desktop reaches these through the footer */
const MOBILE_EXTRA_ITEMS = [
  { label: 'Success stories', href: '/success-story' },
  { label: 'Contact us', href: '/contact-us' },
]

const NAV_ITEMS = [
  { key: 'candidates',      label: 'Candidates',      dropdown: true,  href: '/' },
  { key: 'for-clients',     label: 'Companies',       dropdown: true,  href: '/companies' },
  { key: 'jobs',            label: 'Jobs',            dropdown: false, href: '/jobs/' },
  { key: 'pricing',         label: 'Pricing',         dropdown: false, href: '/pricing' },
  { key: 'blog',             label: 'Blog',            dropdown: false, href: '/blog' },
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
    href: 'https://app.nexthireconsulting.com/ai-outreach',
  },
  {
    title: 'AI Auto Apply',
    desc: 'Tailored applications across matched roles with ATS-optimised resumes per submission.',
    href: 'https://app.nexthireconsulting.com/auto-apply',
  },
  {
    title: 'Resume Builder',
    desc: 'AI-drafted, expert-reviewed resumes tuned to every role you target.',
    href: 'https://app.nexthireconsulting.com/resume/builder',
  },
  {
    title: 'AI Interview Coach',
    desc: 'Real-time coaching on live calls — surface strong answers when it matters.',
    href: 'https://app.nexthireconsulting.com/interview-copilot',
  },
  {
    title: 'Cover Letter',
    desc: 'AI-generated cover letters tailored to every job description — ready in seconds.',
    href: 'https://app.nexthireconsulting.com/cover-letter',
  },
  {
    title: 'Job Tracker',
    desc: 'Every application, reply, and interview stage in one dashboard with reminders.',
    href: 'https://app.nexthireconsulting.com/tracker',
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
    overviewHref: '/',
    features: CANDIDATE_MEGA_FEATURES,
    footerHref: '/#features',
    footerLabel: 'Explore all candidate tools',
    promoTone: 'candidates',
    promoAria: 'Get started',
    promoKicker: 'GET STARTED',
    promoHeadline: 'Escape the apply and pray cycle',
    promoSub: 'One workspace for outreach, applications, and interview prep — fully tracked.',
    promoActions: [
      {
        label: 'Start free',
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
            {cfg.promoActions.map((a) => {
              const isCal = /^(book a demo|book a discovery call|schedule now|talk to an expert)$/i.test(a.label)
              const calAttrs = isCal ? {
                'data-cal-namespace': '30min',
                'data-cal-link': 'hemant-nexthire/30min',
                'data-cal-config': '{"layout":"month_view"}',
              } : {}
              const linkHref = isCal ? '#' : a.href
              const handleClick = (e: React.MouseEvent) => {
                if (isCal) e.preventDefault()
                onNavigate()
              }
              return a.variant === 'primary' ? (
                <Link
                  key={a.label}
                  href={linkHref}
                  className="nh-mega-menu__promo-btn"
                  target={isCal ? undefined : (a.external ? '_blank' : undefined)}
                  rel={isCal ? undefined : (a.external ? 'noopener noreferrer' : undefined)}
                  onClick={handleClick}
                  {...calAttrs}
                >
                  {a.label}
                </Link>
              ) : (
                <Link
                  key={a.label}
                  href={linkHref}
                  className="nh-mega-menu__promo-btn-secondary"
                  onClick={handleClick}
                  {...calAttrs}
                >
                  {a.label} <span aria-hidden>→</span>
                </Link>
              )
            })}
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
  const pathname = usePathname() ?? '/'
  // Phone menu drill-down: Candidates / Companies open their feature list in place
  const [mobileSub, setMobileSub] = useState<'candidates' | 'companies' | null>(null)
  // Recruiters on the companies pages get the demo, not the candidate free plan
  const forCompanies = pathname.startsWith('/companies')

  const isCurrent = (href: string) => {
    const path = href.replace(/\/$/, '')
    return path === '' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
  }

  // Phone bar CTA: hidden while the page's own hero buttons are on screen, so the bar
  // stays [Logo … ☰]. It slides in once those buttons scroll away (or, on pages with no
  // marked hero CTA, after the first scroll), so the main action is never out of reach.
  const [barCta, setBarCta] = useState(false)
  useEffect(() => {
    setBarCta(false)
    const heroCta = document.querySelector('[data-hero-cta]')
    if (heroCta && typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(([entry]) => {
        setBarCta(!entry.isIntersecting && entry.boundingClientRect.bottom < 0)
      })
      io.observe(heroCta)
      return () => io.disconnect()
    }
    const onScroll = () => setBarCta(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Every reopen starts at the top level
  useEffect(() => {
    if (!isOpen) setMobileSub(null)
  }, [isOpen])

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

  // Escape closes the mobile menu
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeMobileMenu())
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, dispatch])

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
              {/* Phone bar: [Logo ……… Start free ☰]. Desktop: [Logo | nav | Log in, Start free] */}

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

              {/* Phone bar CTA — appears once the hero buttons scroll away; hidden while the
                  menu is open, where the same action sits at the bottom */}
              <div className={`nh-cta-header-mobile${barCta ? ' is-on' : ''}`}>
                <PrimaryCta forCompanies={forCompanies} className="button-primary w-button main-nav-cta-try" />
              </div>

              {/* Hamburger — right edge on phones, within thumb reach */}
              <button
                type="button"
                className={`main-nav-menu-btn w-nav-button${isOpen ? ' w--open' : ''}`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="nh-primary-nav"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                <span className="main-nav-menu-toggle-animated icon-4 w-icon-nav-menu" />
              </button>

              {/* Desktop nav; on phones the same element is the full-screen menu */}
              <nav
                id="nh-primary-nav"
                className={`nav-menu w-nav-menu${mobileSub ? ' nh-mnav--sub-open' : ''}`}
                role="navigation"
              >
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
                          // Phone: open this section's features inside the menu
                          if (typeof window !== 'undefined' && window.innerWidth <= 991) {
                            setMobileSub(item.key === 'for-clients' ? 'companies' : 'candidates')
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
                  ) : item.key === 'jobs' ? (
                    // Plain <a>: /jobs/ is served from the job pages bucket, not a Next route,
                    // so client-side navigation would fetch a Next payload that does not exist.
                    <div
                      key={item.key}
                      className="main-nav-menu-dropdown w-dropdown nh-mnav-link"
                    >
                      <a
                        href={item.href}
                        className="main-nav-dropdown-toggle w-dropdown-toggle"
                        aria-current={isCurrent(item.href) ? 'page' : undefined}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', textDecoration: 'none' }}
                      >
                        <span className="main-nav-menu-dropdown-text">{item.label}</span>
                      </a>
                    </div>
                  ) : (
                    <div
                      key={item.key}
                      className="main-nav-menu-dropdown w-dropdown nh-mnav-link"
                    >
                      <Link
                        href={item.href}
                        className="main-nav-dropdown-toggle w-dropdown-toggle"
                        aria-current={isCurrent(item.href) ? 'page' : undefined}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', textDecoration: 'none' }}
                        onClick={() => dispatch(closeMobileMenu())}
                      >
                        <span className="main-nav-menu-dropdown-text">{item.label}</span>
                      </Link>
                    </div>
                  )
                )}

                {/* Secondary links — phone menu only, quieter than the main list */}
                <div className="nh-nav-mobile-only nh-mnav-secondary">
                  {MOBILE_EXTRA_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Drill-down: Candidates / Companies features */}
                {mobileSub && (
                  <MobileSubMenu
                    variant={mobileSub}
                    onBack={() => setMobileSub(null)}
                    onNavigate={() => dispatch(closeMobileMenu())}
                  />
                )}

                {/* Phone menu actions — pinned to the bottom, where the thumb rests */}
                <div className="nh-nav-mobile-only nh-mnav-actions">
                  <PrimaryCta
                    forCompanies={forCompanies}
                    className="nh-mnav-btn nh-mnav-btn--primary"
                    onClick={() => dispatch(closeMobileMenu())}
                  />
                  <a
                    href={LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nh-mnav-btn nh-mnav-btn--secondary"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Log in
                  </a>
                </div>
              </nav>

              {/* Desktop actions — live outside <nav> so nav links can be centred */}
              <div className="nh-cta-desktop">
                <a
                  href={LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nh-nav-login"
                >
                  Log in
                </a>
                <PrimaryCta
                  forCompanies={forCompanies}
                  className="button-primary w-button main-nav-cta-try"
                  onClick={() => dispatch(closeMobileMenu())}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* The one main action: the free plan for candidates, a demo for recruiters */
function PrimaryCta({
  forCompanies,
  className,
  onClick,
}: {
  forCompanies: boolean
  className: string
  onClick?: () => void
}) {
  if (forCompanies) {
    return (
      <a
        href="#"
        className={className}
        {...CAL_ATTRS}
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
      >
        Book a demo
      </a>
    )
  }
  return (
    <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      Start free
    </a>
  )
}

/* Phone menu, second level: one section's features, with a way back */
function MobileSubMenu({
  variant,
  onBack,
  onNavigate,
}: {
  variant: 'candidates' | 'companies'
  onBack: () => void
  onNavigate: () => void
}) {
  const cfg = MEGA_MENU_CONFIG[variant]
  const backRef = useRef<HTMLButtonElement>(null)

  // Keyboard and screen-reader users land on the new level, not on a link that vanished
  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="nh-mnav-sub" role="group" aria-label={cfg.introTitle}>
      <button ref={backRef} type="button" className="nh-mnav-sub__back" onClick={onBack}>
        <span aria-hidden>←</span> Back
      </button>
      <p className="nh-mnav-sub__title">{cfg.introTitle}</p>
      <p className="nh-mnav-sub__desc">{cfg.introDesc}</p>
      <ul className="nh-mnav-sub__list">
        {cfg.features.map((f) => (
          <li key={f.title}>
            <Link href={f.href} className="nh-mnav-sub__item" onClick={onNavigate}>
              <span className="nh-mnav-sub__item-title">{f.title}</span>
              <span className="nh-mnav-sub__item-desc">{f.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={cfg.overviewHref} className="nh-mnav-sub__overview" onClick={onNavigate}>
        {variant === 'companies' ? 'See NextHire for Companies' : 'See all candidate tools'}{' '}
        <span aria-hidden>→</span>
      </Link>
    </div>
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
