'use client'

import Link from 'next/link'
import { FOOTER_CANDIDATE_TOOLS, FOOTER_COMPANY_TOOLS } from '@/constants/footerLinks'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer footer-container w-container">
        <div className="footer-upper-wrapper">

          {/* Row 1: For Companies + Nexthire (FTE/For Candidates) */}
          <div className="footer-row-1">
            {/* For Companies */}
            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">For Companies</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item">
                    <Link href="/companies" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">For Companies</Link>
                    <ul className="footer-titles-level-2" role="list">
                      {FOOTER_COMPANY_TOOLS.map(({ label, href }) => (
                        <li key={label} className="footer-titles-level-2-item">
                          <Link href={href} className="footer-title__level-1-item-link footer-titles-level-2-item-link">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/companies#companies-compare" className="footer-title__level-1-item-link">
                      Traditional recruiting vs. NextHire
                    </Link>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/companies#companies-integrations" className="footer-title__level-1-item-link">
                      Integrations
                    </Link>
                  </li>
                </ul>
              </article>
            </div>

            {/* Nexthire (FTE + For Candidates top-level) */}
            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">Nexthire</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates" className="footer-title__level-1-item-link">Nexthire For Candidates</Link>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/companies" className="footer-title__level-1-item-link">Nexthire For Companies</Link>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          {/* Row 2: Nexthire with Function + Use Cases */}
          <div className="footer-row-2">
            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">For Candidates</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">For Candidates</Link>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates#candidates-tools" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Tools</Link>
                    <ul className="footer-titles-level-2" role="list">
                      {FOOTER_CANDIDATE_TOOLS.map(({ label, href }) => (
                        <li key={label} className="footer-titles-level-2-item">
                          <Link href={href} className="footer-title__level-1-item-link footer-titles-level-2-item-link">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates#candidates-how" className="footer-title__level-1-item-link">How it works</Link>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates#candidates-compare" className="footer-title__level-1-item-link">Compare plans</Link>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/candidates#candidates-faq" className="footer-title__level-1-item-link">FAQ</Link>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          {/* Row 3: For Candidates */}
          <div className="footer-row-3">
            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">Hire Through Us</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item">
                    <Link href="/companies" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">NextHire for Companies</Link>
                    <ul className="footer-titles-level-2" role="list">
                      <li className="footer-titles-level-2-item">
                        <Link href="/contact-us" className="footer-title__level-1-item-link footer-titles-level-2-item-link">Book a demo</Link>
                      </li>
                      <li className="footer-titles-level-2-item">
                        <Link href="/talk-to-an-expert" className="footer-title__level-1-item-link footer-titles-level-2-item-link">Talk to an expert</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="footer-title__level-1-item">
                    <Link href="/companies#companies-platform" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Platform</Link>
                    <ul className="footer-titles-level-2" role="list">
                      <li className="footer-titles-level-2-item">
                        <Link href="/companies#companies-platform" className="footer-title__level-1-item-link footer-titles-level-2-item-link">
                          Five agents. One pipeline.
                        </Link>
                      </li>
                      <li className="footer-titles-level-2-item">
                        <Link href="/companies#companies-integrations" className="footer-title__level-1-item-link footer-titles-level-2-item-link">
                          ATS & integrations
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          {/* Row 4: Career + About */}
          <div className="footer-row-4">
            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">Career</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item"><Link href="/why-join-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Why Join Nexthire</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/why-join-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Our Process</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/why-join-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Find Opportunities</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/why-join-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Talent Experience</Link></li>
                </ul>
              </article>
            </div>

            <div className="footer-dropdown w-dropdown">
              <div className="footer-dropdown__accordion-toggle w-dropdown-toggle">
                <div className="footer-dropdown__icon w-icon-dropdown-toggle" />
                <div className="footer-main-title">About</div>
              </div>
              <article className="footer-dropdown__accordion-content w-dropdown-list">
                <ul className="footer-title__level-1" role="list">
                  <li className="footer-title__level-1-item"><Link href="/about-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">About Nexthire</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/about-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Leadership</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/about-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Sustainability</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/why-join-nexthire" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Careers</Link></li>
                  <li className="footer-title__level-1-item"><Link href="/contact-us" className="footer-title__level-1-item-link footer-titles-level-2-wrapper">Contact Us</Link></li>
                </ul>
              </article>
            </div>
          </div>

        </div>{/* end footer-upper-wrapper */}

        {/* Footer lower: logo + social + copyright + legal links */}
        <div className="footer-lower-wrapper">
          <div className="footer-lower-left">
            <div className="footer-logo-wrapper">
              <Link href="/" className="footer-logo-link w-inline-block">
                <img
                  alt="Nexthire logo"
                  aria-label="Nexthire logo"
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
              >
                <img
                  alt="LinkedIn"
                  aria-label="linkedin"
                  className="footer-social-in"
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/660dcc7f45ad8881324199b5/66267e336ed9c5185c3daf54_Vector%20(2).svg"
                />
              </a>
            </div>

            <div className="footer-all-right-text">&copy; 2026 NextHire, All Rights Reserved.</div>

            <div className="footer-lower__bottom-link-wrapper">
              <div className="footer-lower__bottom-link-item">
                <Link href="/privacy-policy" className="footer-lower__bottom-link w-inline-block">Privacy Policy</Link>
              </div>
              <span className="footer-bottom-link-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#8aada8', display: 'inline-block', margin: '0 4px' }} />
              <div className="footer-lower__bottom-link-item">
                <Link href="/terms-of-service" className="footer-lower__bottom-link w-inline-block">Terms</Link>
              </div>
              <span className="footer-bottom-link-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#8aada8', display: 'inline-block', margin: '0 4px' }} />
              <div className="footer-lower__bottom-link-item">
                <Link href="/data-processing-agreement" className="footer-lower__bottom-link w-inline-block">Data Processing Agreement</Link>
              </div>
              <span className="footer-bottom-link-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#8aada8', display: 'inline-block', margin: '0 4px' }} />
              <div className="footer-lower__bottom-link-item">
                <Link href="/marketing-disclosure" className="footer-lower__bottom-link w-inline-block">Marketing Disclosure</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
