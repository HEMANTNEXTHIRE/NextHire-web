'use client'

import Link from 'next/link'
import { FOOTER_CANDIDATE_TOOLS, FOOTER_COMPANY_TOOLS } from '@/constants/footerLinks'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer footer-container w-container">

        {/* ── Navigation columns ──────────────────────────────────── */}
        <div className="nh-footer-cols">

          {/* Col 1: For Companies */}
          <div className="nh-footer-col">
            <p className="nh-footer-heading">For Companies</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/companies" className="nh-footer-link nh-footer-link--section">For Companies</Link></li>
              {FOOTER_COMPANY_TOOLS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="nh-footer-link nh-footer-link--sub">{label}</Link></li>
              ))}
              <li className="nh-footer-gap">
                <Link href="/companies#companies-compare" className="nh-footer-link">Traditional recruiting vs. NextHire</Link>
              </li>
              <li><Link href="/companies#companies-integrations" className="nh-footer-link">Integrations</Link></li>
            </ul>
          </div>

          {/* Col 2: For Candidates */}
          <div className="nh-footer-col">
            <p className="nh-footer-heading">For Candidates</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/candidates" className="nh-footer-link nh-footer-link--section">For Candidates</Link></li>
              <li className="nh-footer-gap">
                <Link href="/candidates#candidates-tools" className="nh-footer-link nh-footer-link--section">Tools</Link>
              </li>
              {FOOTER_CANDIDATE_TOOLS.map(({ label, href }) => (
                <li key={label}><Link href={href} className="nh-footer-link nh-footer-link--sub">{label}</Link></li>
              ))}
              <li className="nh-footer-gap">
                <Link href="/candidates#candidates-how" className="nh-footer-link">How it works</Link>
              </li>
              <li><Link href="/candidates#candidates-compare" className="nh-footer-link">Compare plans</Link></li>
              <li><Link href="/candidates#candidates-faq" className="nh-footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 3: Hire Through Us */}
          <div className="nh-footer-col">
            <p className="nh-footer-heading">Hire Through Us</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/companies" className="nh-footer-link nh-footer-link--section">NextHire for Companies</Link></li>
              <li><Link href="/contact-us" className="nh-footer-link nh-footer-link--sub">Book a demo</Link></li>
              <li><Link href="/talk-to-an-expert" className="nh-footer-link nh-footer-link--sub">Talk to an expert</Link></li>
              <li className="nh-footer-gap">
                <Link href="/companies#companies-platform" className="nh-footer-link nh-footer-link--section">Platform</Link>
              </li>
              <li><Link href="/companies#companies-platform" className="nh-footer-link nh-footer-link--sub">Five agents. One pipeline.</Link></li>
              <li><Link href="/companies#companies-integrations" className="nh-footer-link nh-footer-link--sub">ATS &amp; integrations</Link></li>
            </ul>

            {/* Nexthire brand links — grouped here since it's short */}
            <p className="nh-footer-heading" style={{ marginTop: 28 }}>Nexthire</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/candidates" className="nh-footer-link">Nexthire For Candidates</Link></li>
              <li><Link href="/companies" className="nh-footer-link">Nexthire For Companies</Link></li>
            </ul>
          </div>

          {/* Col 4: Career + About */}
          <div className="nh-footer-col">
            <p className="nh-footer-heading">Career</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/why-join-nexthire" className="nh-footer-link">Why Join Nexthire</Link></li>
              <li><Link href="/why-join-nexthire" className="nh-footer-link">Our Process</Link></li>
              <li><Link href="/why-join-nexthire" className="nh-footer-link">Find Opportunities</Link></li>
              <li><Link href="/why-join-nexthire" className="nh-footer-link">Talent Experience</Link></li>
            </ul>

            <p className="nh-footer-heading" style={{ marginTop: 28 }}>About</p>
            <ul className="nh-footer-list" role="list">
              <li><Link href="/about-nexthire" className="nh-footer-link">About Nexthire</Link></li>
              <li><Link href="/about-nexthire" className="nh-footer-link">Leadership</Link></li>
              <li><Link href="/about-nexthire" className="nh-footer-link">Sustainability</Link></li>
              <li><Link href="/why-join-nexthire" className="nh-footer-link">Careers</Link></li>
              <li><Link href="/contact-us" className="nh-footer-link">Contact Us</Link></li>
            </ul>
          </div>

        </div>{/* end nh-footer-cols */}

        {/* ── Footer lower: logo + social + legal ─────────────────── */}
        <div className="footer-lower-wrapper">
          <div className="footer-lower-left">
            <div className="footer-logo-wrapper">
              <Link href="/" className="footer-logo-link w-inline-block">
                <img
                  alt="Nexthire logo"
                  className="footer-logo"
                  loading="lazy"
                  src="/Image/Nexthire_green.svg"
                />
              </Link>
            </div>
            <p className="footer-lower-left-content">
              &copy; 2026 NextHire, All Rights Reserved.
            </p>
          </div>

          <div className="footer-lower-right">
            <div className="footer-lower__social-icons">
              <a
                className="footer-social-link-wrapper w-inline-block"
                href="https://www.linkedin.com/company/nexthire-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NextHire on LinkedIn"
              >
                <img
                  alt="LinkedIn"
                  className="footer-social-in"
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/660dcc7f45ad8881324199b5/66267e336ed9c5185c3daf54_Vector%20(2).svg"
                />
              </a>
            </div>

            <div className="footer-all-right-text">&copy; 2026 NextHire, All Rights Reserved.</div>

            <div className="footer-lower__bottom-link-wrapper">
              <Link href="/privacy-policy" className="footer-lower__bottom-link w-inline-block">Privacy Policy</Link>
              <span className="nh-footer-dot" aria-hidden="true" />
              <Link href="/terms-of-service" className="footer-lower__bottom-link w-inline-block">Terms</Link>
              <span className="nh-footer-dot" aria-hidden="true" />
              <Link href="/data-processing-agreement" className="footer-lower__bottom-link w-inline-block">Data Processing</Link>
              <span className="nh-footer-dot" aria-hidden="true" />
              <Link href="/marketing-disclosure" className="footer-lower__bottom-link w-inline-block">Marketing Disclosure</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
