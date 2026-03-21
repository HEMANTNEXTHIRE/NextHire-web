'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  toggleMobileMenu,
  setActiveDropdown,
  setScrolled,
  closeMobileMenu,
} from '@/store/slices/navSlice'

const NAV_ITEMS = [
  { key: 'candidates',      label: 'Candidates',      dropdown: true },
  { key: 'for-clients',     label: 'Companies',       dropdown: true },
  { key: 'pricing',         label: 'Pricing',         dropdown: true },
  { key: 'success-stories', label: 'Jobs',            dropdown: true },
  { key: 'about',           label: 'About',           dropdown: true },
]

export default function Header() {
  const dispatch = useAppDispatch()
  const { isOpen, activeDropdown, isScrolled } = useAppSelector((s) => s.nav)
  const headerRef = useRef<HTMLDivElement>(null)

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
        >
          <div className="main-nav-container w-container">
            <div className="main-nav-container-wrapper">
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

              {/* Desktop nav */}
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

              {/* Mobile hamburger */}
              <div
                className={`main-nav-menu-btn w-nav-button${isOpen ? ' w--open' : ''}`}
                role="button"
                aria-label="Toggle mobile menu"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                <div className="main-nav-menu-toggle-animated icon-4 w-icon-nav-menu" />
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
      <>
        <div className="submenu-column submenu-column__one submenu-column__one-adaptive">
          <div className="submenu-sub-column">
            <div className="submenu-level1 submenu-level1-adaptive">
              <div className="submenu-level1__item">
                <Link href="/candidates" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level1__item-title">Nexthire For Candidates</div>
                  <p className="submenu-level1__item-desc">
                    Looking for your next big opportunity? NextHire automates your job hunt journey, from resume to offer letter, supporting you at every step.
                  </p>
                  <div className="submenu-level1__item-cta submenu-level1__item-cta-adaptive">Learn More</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="submenu-sub-column">
            <div className="submenu-level2">
              <div className="submenu-level2__item">
                <Link href="/candidates" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner">
                    <div className="submenu-level2__item-title">How NextHire For Candidates Works</div>
                    <p className="submenu-level2__item-desc">
                      We make job searching easier. NextHire For Candidates helps you prepare, apply, and get hired—so you can focus on what truly matters: your career.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="submenu-column submenu-column__two submenu-column__two-adaptive">
          <div className="submenu-post">
            <Link href="/blog/ai-tools-how-they-help-you-getting-hired" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
              <div className="submenu-post__inner">
                <div className="submenu-post__img-wrapper">
                  <img src="/Image/Des8.svg" loading="lazy" alt="" className="submenu-post__img" />
                </div>
                <div className="submenu-post__inner-content">
                  <div className="submenu-post__category">BLOG</div>
                  <div className="submenu-post__title">AI tools &amp; how they help you getting hired</div>
                  <div className="submenu-post__cta">Learn More</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (item.key === 'pricing') {
    return (
      <div className="submenu-column submenu-column__one submenu-column__one-platform submenu-column__one-solutions">
        <div className="submenu-sub-column">
          <div className="submenu-level1 submenu-level1-platform submenu-level1-solution">
            <div className="submenu-level1__item">
              <Link href="/pricing" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                <div className="submenu-level1__item-title">Nexthire For Candidates</div>
                <p className="submenu-level1__item-desc">A partner committed to unlocking your potential and landing the job that fits.</p>
                <div className="submenu-level1__item-cta submenu-level1__item-cta-solution">Learn More</div>
              </Link>
            </div>
            <div className="submenu-level3__item mobile-only">
              <Link href="/pricing" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                <div className="submenu-level3__item-title">Browse Opportunities</div>
              </Link>
            </div>
          </div>
          <Link href="/pricing" target="_blank" className="link-2 highlighted-link" onClick={() => dispatch(setActiveDropdown(null))}>Browse Opportunities</Link>
        </div>
        <div className="submenu-sub-column submenu-sub-column-solutions">
          <div className="submenu-level3">
            <div className="submenu-level-3-label">Functions</div>
            {['Resume Building', 'Research Market Insights', 'Explore Job Opportunities', 'Get Hired Now'].map((t) => (
              <div className="submenu-level3__item" key={t}>
                <Link href="/pricing" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level3__item-title">{t}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="submenu-sub-column">
          <div className="submenu-level3">
            <div className="submenu-level-3-label">Use Cases</div>
            {['Software Developers', 'QA Testers', 'Product Managers', 'DevOPS', 'Others'].map((t, i) => (
              <div className="submenu-level3__item" key={t}>
                <Link href={i === 0 ? '/success-story' : '/pricing'} className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level3__item-title">{t}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (item.key === 'success-stories') {
    return (
      <>
        <div className="submenu-column submenu-column__one submenu-column__one-platform">
          <div className="submenu-sub-column">
            <div className="submenu-level1 submenu-level1-platform submenu-level1-platform2">
              <div className="submenu-level1__item submenu-level1__item-platform">
                <Link href="/success-story" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level1__item-title submenu-level1__item-title-platform">Nexthire <br/>Success Stories</div>
                  <p className="submenu-level1__item-desc">NextHire For Candidates connects job seekers with top companies through the right networks, ensuring multiple interviews with a pay-after-placement model.</p>
                  <div className="submenu-level1__item-cta submenu-level1__item-cta-platform">Learn More</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="submenu-sub-column">
            <div className="submenu-level2-wrapper">
              <div className="submenu-level2 submenu-level2-platform">
                <div className="submenu-level2-title submenu-level2-title-platform">Products</div>
                <div className="submenu-level2__item">
                  <Link href="/success-story" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                    <div className="submenu-level2__item-inner">
                      <div className="submenu-level2__item-title">Qualified for Career Support</div>
                      <p className="submenu-level2__item-desc">We equip you with the right tools, insights, and support to confidently face interviews, and present your best self to potential employers.</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="submenu-level2 submenu-level2-platform">
                <div className="submenu-level2-title">Explore</div>
                <div className="submenu-level2__item">
                  <Link href="/success-story" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                    <div className="submenu-level2__item-inner">
                      <div className="submenu-level2__item-title">Portal Compatible</div>
                      <p className="submenu-level2__item-desc">We help you focus your job search on the most relevant platforms, build meaningful connections, and apply where your skills are truly valued.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="submenu-column submenu-column__two">
          <div className="submenu-post">
            <Link href="/blog/how-AI-is-reshaping-IT-services" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
              <div className="submenu-post__inner">
                <div className="submenu-post__img-wrapper">
                  <img src="/Image/Des7.svg" loading="lazy" alt="" className="submenu-post__img" />
                </div>
                <div className="submenu-post__inner-content">
                  <div className="submenu-post__category">BLOG</div>
                  <div className="submenu-post__title">How AI is reshaping IT Services</div>
                  <div className="submenu-post__cta submenu-post__cta-platform">Learn More</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (item.key === 'about') {
    return (
      <>
        <div className="submenu-column submenu-column__one submenu-column__one-about">
          <div className="submenu-sub-column">
            <div className="submenu-level1 submenu-level1-platform submenu-level1-platform2">
              <div className="submenu-level1__item">
                <Link href="/about-nexthire" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level1__item-title">About Nexthire</div>
                  <p className="submenu-level1__item-desc">We bridge the gap between talent and opportunity, creating limitless possibilities.</p>
                  <div className="submenu-level1__item-cta">Learn More</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="submenu-sub-column">
            <div className="submenu-level2 submenu-level2-about">
              <div className="submenu-level2__item submenu-level2__item-about">
                <Link href="/why-join-nexthire" className="submenu-link submenu-link-about w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner submenu-level2__item-inner-about">
                    <div className="submenu-level2__item-title">Careers</div>
                    <p className="submenu-level2__item-desc">Be Part of a Thriving Team</p>
                  </div>
                </Link>
              </div>
              <div className="submenu-level2__item submenu-level2__item-about">
                <Link href="/contact-us" className="submenu-link submenu-link-about w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner submenu-level2__item-inner-about">
                    <div className="submenu-level2__item-title">Contact Us</div>
                    <p className="submenu-level2__item-desc">Let us know how we can help.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="submenu-column submenu-column__two">
          <div className="submenu-post">
            <Link href="/blog/25-behavioral-interview-questions" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
              <div className="submenu-post__inner">
                <div className="submenu-post__img-wrapper">
                  <img src="/Image/Des9.webp" loading="lazy" alt="" className="submenu-post__img" />
                </div>
                <div className="submenu-post__inner-content">
                  <div className="submenu-post__category">Interview Preparation</div>
                  <div className="submenu-post__title">25 Behavioral Interview Questions</div>
                  <div className="submenu-post__cta">Learn More</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (item.key === 'for-clients') {
    return (
      <>
        <div className="submenu-column submenu-column__one">
          <div className="submenu-sub-column">
            <div className="submenu-level1">
              <div className="submenu-level1__item submenu-level1__item-why">
                <Link href="/why-nexthire" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level1__item-title">For Companies</div>
                  <p className="submenu-level1__item-desc submenu-level1__item-desc-why">Nexthire offers comprehensive hiring solutions for businesses. Nexthire FTE connects companies with top talent for full-time roles.</p>
                  <div className="submenu-level1__item-cta">Learn More</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="submenu-sub-column">
            <div className="submenu-level2">
              <div className="submenu-level2__item">
                <Link href="/why-nexthire" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner">
                    <div className="submenu-level2__item-title">Our Talent Community</div>
                    <p className="submenu-level2__item-desc">We don&apos;t just find the best talent — we cultivate it.</p>
                  </div>
                </Link>
              </div>
              <div className="submenu-level2__item">
                <Link href="/why-nexthire" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner">
                    <div className="submenu-level2__item-title">Untapped Talent Markets</div>
                    <p className="submenu-level2__item-desc">The talent you need is in untapped emerging markets.</p>
                  </div>
                </Link>
              </div>
              <div className="submenu-level2__item">
                <Link href="/why-nexthire" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level2__item-inner">
                    <div className="submenu-level2__item-title">Mission Focused</div>
                    <p className="submenu-level2__item-desc">Algotale talent improves their career trajectories and quality of life.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="submenu-level3">
              <div className="submenu-level3__title">Impact</div>
              <div className="submenu-level3__item">
                <Link href="/success-story" className="submenu-link w-inline-block" onClick={() => dispatch(setActiveDropdown(null))}>
                  <div className="submenu-level3__item-title">Customer Stories</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="submenu-column submenu-column__two">
          <div
            className="submenu-for-companies-demo"
            style={{
              background: '#e4f0ec',
              borderRadius: 20,
              height: '100%',
              minHeight: 260,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
              padding: '28px 24px 0',
            }}
          >
            {/* Heading */}
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a3338', marginBottom: 10, textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.3px' }}>
              Deploy AI Agents
            </div>
            {/* CTA link */}
            <Link
              href="/talk-to-an-expert"
              onClick={() => dispatch(setActiveDropdown(null))}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#2e7d4f',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                marginBottom: 20,
              }}
            >
              Book a demo
              <span style={{ fontSize: 15 }}>→</span>
            </Link>
            {/* Person photo */}
            <div style={{ flex: 1, width: '75%', position: 'relative', minHeight: 140 }}>
              <img
                src="/Image/Image_AA3.webp"
                alt="AI Engineer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: '10px 10px 0 0',
                  display: 'block',
                }}
              />
            </div>
            {/* Floating name badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                background: '#ffffff',
                borderRadius: 12,
                padding: '10px 14px',
                boxShadow: '0 2px 14px rgba(0,0,0,0.10)',
                minWidth: 140,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1a3338', marginBottom: 2 }}>Pablo N.</div>
              <div style={{ fontSize: 12, color: '#5a7e7a', marginBottom: 6 }}>AI Engineer</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%' }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span style={{ fontSize: 12, color: '#1a1a1a', fontWeight: 500 }}>GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return null
}
