'use client'

import Link from 'next/link'
import { FOOTER_CANDIDATE_TOOLS, FOOTER_COMPANY_TOOLS } from '@/constants/footerLinks'

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.631L18.243 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nexthire-technologies/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer footer-container w-container">

        {/* ── Navigation columns ──────────────────────────────────── */}
        <div className="nh-footer-cols">

          {/* Col 1: For Candidates */}
          <div className="nh-footer-col">
            <Link href="/" className="nh-footer-heading nh-footer-heading--link">For Candidates</Link>
            <ul className="nh-footer-list" role="list">
              {FOOTER_CANDIDATE_TOOLS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="nh-footer-link">{label}</Link></li>
              ))}
              <li className="nh-footer-gap">
                <Link href="/#how-it-works" className="nh-footer-link">How it works</Link>
              </li>
              <li><Link href="/#home-faq" className="nh-footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 2: For Companies */}
          <div className="nh-footer-col">
            <Link href="/companies" className="nh-footer-heading nh-footer-heading--link">For Companies</Link>
            <ul className="nh-footer-list" role="list">
              {FOOTER_COMPANY_TOOLS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="nh-footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hire Through Us */}
          <div className="nh-footer-col">
            <p className="nh-footer-heading">Hire Through Us</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="#" className="nh-footer-link">Permanent Hiring Solution</Link></li>
              <li><Link href="#" className="nh-footer-link">Staffing Solution</Link></li>
              <li><Link href="#" className="nh-footer-link">RPO Solution</Link></li>
              <li className="nh-footer-gap">
                <Link href="/contact-us" className="nh-footer-link">Book a demo</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About + Pricing */}
          <div className="nh-footer-col">
            <Link href="/blog" className="nh-footer-heading nh-footer-heading--link">Blog</Link>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/success-story" className="nh-footer-link">Success Stories</Link></li>
              <li><a href="https://nexthire.breezy.hr/" target="_blank" rel="noopener noreferrer" className="nh-footer-link">Careers</a></li>
              <li><Link href="/contact-us" className="nh-footer-link">Contact Us</Link></li>
            </ul>

            <Link href="/pricing" className="nh-footer-heading nh-footer-heading--link" style={{ marginTop: 28 }}>Pricing</Link>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/pricing#candidates" className="nh-footer-link">For Candidates</Link></li>
              <li><Link href="/pricing#companies" className="nh-footer-link">For Companies</Link></li>
              <li><Link href="/pricing" className="nh-footer-link">Compare plans</Link></li>
            </ul>
          </div>

        </div>{/* end nh-footer-cols */}

        {/* ── Footer lower: single compact row ───────────────────── */}
        <div className="nh-footer-lower">
          {/* Legal links */}
          <div className="nh-footer-legal">
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/privacy-policy" className="footer-lower__bottom-link">Privacy Policy</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/terms-of-service" className="footer-lower__bottom-link">Terms</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/data-processing-agreement" className="footer-lower__bottom-link">Data Processing</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/marketing-disclosure" className="footer-lower__bottom-link">Marketing Disclosure</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/cancellation-policy" className="footer-lower__bottom-link">Cancellation</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/refund-policy" className="footer-lower__bottom-link">Refund</Link>
            <span className="nh-footer-dot" aria-hidden="true" />
            <Link href="/extension-privacy-policy" className="footer-lower__bottom-link">Extension Policy</Link>
          </div>

          {/* Social icons */}
          <div className="nh-footer-socials">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className="nh-footer-social-link"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={`NextHire on ${label}`}
              >
                {icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  )
}
