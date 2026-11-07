export interface LegalPage {
  slug: string
  title: string
  subtitle?: string
  lastUpdated: string
  content: string
}

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your information, including our optional LinkedIn integration',
    lastUpdated: 'November 7, 2026',
    content: `
      <p>This Privacy Policy explains how NextHire Consulting (Nexthire LLP) ("we", "us", "our") collects, uses, and protects your information when you use our recruitment CRM and related services (the "Service"), including our optional LinkedIn integration.</p>

      <h2>Who we are</h2>
      <p>NextHire Consulting is operated by Nexthire LLP, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh, India. For any privacy question or request, contact us at <a href="mailto:privacy@nexthireconsulting.com">privacy@nexthireconsulting.com</a>.</p>

      <h2>Information we collect</h2>
      <ul>
        <li>Account information you provide to use the Service (name, work email, company).</li>
        <li>LinkedIn account information, only if you choose to connect your LinkedIn account: your LinkedIn member identifier, name, and profile picture, obtained through LinkedIn's official OAuth 2.0 authorization with your explicit consent.</li>
        <li>Content you create, such as posts you choose to publish to LinkedIn through the Service.</li>
        <li>Usage and device data (log data, IP address, browser type and settings, and similar technical information) that we use to operate and secure the Service.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To provide and operate the Service, including publishing content to LinkedIn on your behalf and only at your direction when you have connected your LinkedIn account.</li>
        <li>To display your connection status and manage scheduled posts.</li>
        <li>To secure, maintain, and improve the Service.</li>
      </ul>

      <h2>LinkedIn integration</h2>
      <p>When you connect LinkedIn, we access and use LinkedIn data only with your consent, via LinkedIn's official APIs, and solely to provide the features you request (such as posting to your LinkedIn feed). Our use of information received from LinkedIn complies with the LinkedIn API Terms of Use and the LinkedIn Platform policies. We do not sell LinkedIn data, use it for advertising, or share it with third parties except as described below. You can disconnect your LinkedIn account at any time from within the Service, and you may also revoke our access directly in your LinkedIn account settings. When you disconnect, we stop accessing your LinkedIn data and delete the stored access tokens.</p>

      <h2>How we share information</h2>
      <p>We do not sell your personal information. We share it only with: (a) service providers who host or support the Service under confidentiality obligations; and (b) authorities when required by law.</p>

      <h2>Data retention</h2>
      <p>We retain your information for as long as your account is active or as needed to provide the Service, and delete or anonymize it when it is no longer required, subject to legal obligations. LinkedIn access tokens are deleted when you disconnect your LinkedIn account.</p>

      <h2>Security</h2>
      <p>We use administrative, technical, and organizational safeguards (including encryption of stored credentials) to protect your information. No method of transmission or storage is 100% secure.</p>

      <h2>Your rights</h2>
      <p>Depending on your location, you may have rights to access, correct, or delete your personal information. To exercise these, contact <a href="mailto:privacy@nexthireconsulting.com">privacy@nexthireconsulting.com</a>. You can disconnect LinkedIn and request deletion of your data at any time.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Material changes will be posted on this page with a new "Last updated" date.</p>

      <h2>Contact</h2>
      <p>NextHire Consulting (Nexthire LLP)<br />Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh, India<br /><a href="mailto:privacy@nexthireconsulting.com">privacy@nexthireconsulting.com</a></p>
    `,
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your personal information',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>1. Introduction</h2>
      <p>NextHire Consulting ("NextHire," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
      <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>

      <h2>2. Information We Collect</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li>Name, email address, and phone number when you register or contact us</li>
        <li>Resume, work history, skills, and career preferences</li>
        <li>Payment information when you subscribe to our services</li>
        <li>Communications you send to us</li>
      </ul>
      <h3>Information Collected Automatically</h3>
      <ul>
        <li>Log data (IP address, browser type, pages visited, time spent)</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Device information (hardware model, operating system)</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Match you with relevant job opportunities</li>
        <li>Connect you with potential employers</li>
        <li>Send you career tips, updates, and marketing communications (you can opt out at any time)</li>
        <li>Process payments and prevent fraud</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>4. Sharing Your Information</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Employers and recruiters</strong> — with your explicit consent, when you apply for or express interest in opportunities</li>
        <li><strong>Service providers</strong> — third parties who help us deliver our services (payment processors, email providers, analytics)</li>
        <li><strong>Legal authorities</strong> — when required by law or to protect our rights</li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>5. Data Security</h2>
      <p>We implement industry-standard security measures to protect your information, including encryption in transit and at rest, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.</p>

      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
        <li>Data portability</li>
      </ul>
      <p>To exercise these rights, contact us at privacy@nexthireconsulting.com.</p>

      <h2>7. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at:</p>
      <p>NextHire Consulting<br />Email: privacy@nexthireconsulting.com<br />Address: Bengaluru, Karnataka, India</p>
    `,
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    subtitle: 'The rules and conditions governing use of NextHire services',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using NextHire's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

      <h2>2. Description of Services</h2>
      <p>NextHire provides career assistance services including resume optimization, job search support, interview preparation, and direct HR outreach through our For Candidates platform.</p>

      <h2>3. User Accounts</h2>
      <p>You must provide accurate, complete, and current information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

      <h2>4. Payment and Billing</h2>
      <p>Service fees are as described in our pricing plans. Payment is due at the start of each billing period unless you have selected a pay-after-placement option. We offer Monthly, Quarterly, and Annual plans.</p>
      <p>For pay-after-placement arrangements, payment installments begin 30 days after confirmed placement in a new role.</p>

      <h2>5. Refunds and Cancellations</h2>
      <p>Please refer to our Cancellation Policy and Refund Policy for detailed information on cancellations and refunds.</p>

      <h2>6. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Provide false or misleading information in your profile or to potential employers</li>
        <li>Use our services for any unlawful purpose</li>
        <li>Attempt to access other users' accounts or our backend systems</li>
        <li>Scrape or copy content from our platform without permission</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>All content on the NextHire platform, including text, graphics, logos, and software, is the property of NextHire Consulting and is protected by applicable intellectual property laws.</p>

      <h2>8. Limitation of Liability</h2>
      <p>NextHire provides services on an "as is" basis without warranties of any kind. We do not guarantee specific employment outcomes. Our liability is limited to the amount paid by you in the 30 days preceding any claim.</p>

      <h2>9. Changes to Terms</h2>
      <p>We may modify these terms at any time. We will notify you of significant changes via email or in-app notification. Continued use of our services constitutes acceptance of updated terms.</p>

      <h2>10. Governing Law</h2>
      <p>These terms are governed by the laws of India. Disputes shall be resolved in the courts of Bengaluru, Karnataka.</p>
    `,
  },
  {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    subtitle: 'How to cancel your NextHire subscription',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>Cancellation Process</h2>
      <p>You may cancel your NextHire subscription at any time by contacting our support team at support@nexthireconsulting.com or through your account settings.</p>

      <h2>Monthly Plans</h2>
      <p>You may cancel at any time. Cancellation takes effect at the end of the current billing period. You will continue to have access to services until the end of the period you have paid for.</p>

      <h2>Quarterly Plans</h2>
      <p>Cancellations must be requested at least 14 days before the end of your current quarter to avoid renewal. If you cancel within 30 days of starting a quarterly plan, you may be eligible for a partial refund per our Refund Policy.</p>

      <h2>Annual Plans</h2>
      <p>Annual plans may be cancelled at any time. If you cancel within the first 30 days, you may be eligible for a partial refund. After 30 days, no refund is issued, but you retain access for the remainder of the annual period.</p>

      <h2>Pay-After-Placement Plans</h2>
      <p>If you are on a pay-after-placement arrangement, cancellation before placement means you owe nothing. If placement has been confirmed, the agreed payment schedule remains in effect.</p>

      <h2>Effect of Cancellation</h2>
      <p>Upon cancellation, your access to premium features will end at the close of the current billing period. Your account data will be retained for 90 days, after which it may be deleted per our Privacy Policy.</p>

      <h2>Questions</h2>
      <p>Contact us at support@nexthireconsulting.com with any questions about cancellation.</p>
    `,
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    subtitle: 'Our commitment to fair refunds',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>Our Refund Philosophy</h2>
      <p>We want you to be completely satisfied with NextHire's services. If you're not happy, we want to make it right.</p>

      <h2>30-Day Satisfaction Guarantee</h2>
      <p>If you're not satisfied with your experience within the first 30 days of service, contact us and we'll provide a full refund, no questions asked.</p>

      <h2>Eligibility for Refunds</h2>
      <ul>
        <li><strong>Full refund:</strong> Requested within 30 days of purchase, no placement services used</li>
        <li><strong>Partial refund:</strong> Requested between 30-60 days, pro-rated based on services used</li>
        <li><strong>No refund:</strong> After 60 days or after a job placement has been confirmed</li>
      </ul>

      <h2>How to Request a Refund</h2>
      <p>Email refunds@nexthireconsulting.com with your account email and reason for the refund. We'll respond within 2 business days.</p>

      <h2>Processing Time</h2>
      <p>Approved refunds are processed within 5-7 business days to the original payment method.</p>

      <h2>Non-Refundable Items</h2>
      <ul>
        <li>Services already rendered (completed resume reviews, coaching sessions)</li>
        <li>Subscriptions cancelled after successful job placement</li>
        <li>Pay-after-placement installments once placement is confirmed</li>
      </ul>
    `,
  },
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    subtitle: 'How we process data on behalf of our clients',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>1. Scope and Purpose</h2>
      <p>This Data Processing Agreement ("DPA") governs the processing of personal data by NextHire Consulting ("Processor") on behalf of our enterprise clients ("Controller") in connection with the NextHire platform and services.</p>

      <h2>2. Data Processing Obligations</h2>
      <p>NextHire will:</p>
      <ul>
        <li>Process personal data only on documented instructions from the Controller</li>
        <li>Ensure confidentiality of personal data through appropriate technical and organizational measures</li>
        <li>Notify the Controller of any personal data breach without undue delay</li>
        <li>Assist the Controller in responding to data subject rights requests</li>
        <li>Delete or return all personal data upon termination of services</li>
      </ul>

      <h2>3. Sub-processors</h2>
      <p>NextHire uses the following categories of sub-processors: cloud hosting providers, payment processors, analytics services, and email service providers. A current list of sub-processors is available upon request.</p>

      <h2>4. Data Transfers</h2>
      <p>Any transfer of personal data outside of the originating country will be subject to appropriate safeguards in accordance with applicable data protection law.</p>

      <h2>5. Security Measures</h2>
      <p>NextHire implements the following security measures: encryption at rest and in transit, access controls and authentication, regular security assessments, and incident response procedures.</p>

      <h2>6. Contact</h2>
      <p>For DPA inquiries, contact our Data Protection Officer at dpo@nexthireconsulting.com.</p>
    `,
  },
  {
    slug: 'extension-privacy-policy',
    title: 'Extension Privacy Policy',
    subtitle: 'How the NextHire Profile Optimizer Chrome extension collects and uses your data',
    lastUpdated: 'October 19, 2026',
    content: `
      <div class="nh-legal-summary">
        <strong>Summary:</strong> The NextHire Profile Optimizer extension scrapes your public profile data from Naukri.com and LinkedIn only when you are on those pages. This data is sent solely to your NextHire account for AI-powered optimization. When you choose 'Finish in your browser' for a job application, it also fills that job's application form with your NextHire profile, in a tab of your own Chrome, on the job sites listed below only. We do not sell, share, or use your data for any other purpose.
      </div>

      <h2>1. Who We Are</h2>
      <p>NextHire Profile Optimizer ("the Extension") is developed and operated by NextHire Consulting. Our web application is available at <a href="https://app.nexthireconsulting.com">https://app.nexthireconsulting.com</a>.</p>

      <h2>2. What Data We Collect</h2>
      <p>The Extension collects the following data from your browser, only when you are actively on the specified pages:</p>
      <ul>
        <li><strong>Naukri.com profile data:</strong> Name, headline, current designation, company, location, work experience, education, skills, certifications, and projects, scraped from your Naukri profile page (naukri.com/mnjuser/profile).</li>
        <li><strong>LinkedIn profile data:</strong> Name, headline, location, about section, experience, education, skills, certifications, recommendations, and languages, scraped from your LinkedIn public profile page (linkedin.com/in/).</li>
        <li><strong>Authentication token:</strong> A temporary session token from your NextHire account to securely sync data.</li>
        <li><strong>Job application forms you finish in your browser:</strong> only after you press 'Finish in your browser' on a NextHire application, and only on the job sites listed in section 7. The Extension reads the questions on that application form and, to report what it filled, the answers it typed into it.</li>
      </ul>
      <p><strong>We do not collect:</strong></p>
      <ul>
        <li>Browsing history or activity on other websites</li>
        <li>Personally identifiable information beyond what is on your profile pages</li>
        <li>Cookies, passwords, or financial information</li>
        <li>Data from any website other than Naukri.com, LinkedIn, app.nexthireconsulting.com, and the job sites in section 7 (there, only the application form you asked it to fill)</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>Your profile data is used exclusively to:</p>
      <ul>
        <li>Sync your profile information to your NextHire account</li>
        <li>Provide AI-powered suggestions to optimize your profile for better job opportunities</li>
        <li>Fill a job application form you opened from NextHire with 'Finish in your browser'</li>
      </ul>
      <p>We do not use your data for advertising, analytics, marketing, or any purpose other than providing the NextHire service to you.</p>

      <h2>4. Data Storage and Transmission</h2>
      <ul>
        <li><strong>Local storage:</strong> Scraped profile data and your authentication token are temporarily stored in Chrome's local extension storage (chrome.storage.local) on your device.</li>
        <li><strong>Data transmission:</strong> Profile data is transmitted over HTTPS to the NextHire API at app.nexthireconsulting.com only when you explicitly click "Sync to NextHire".</li>
        <li><strong>Filling an application in your browser:</strong> the Extension gets your NextHire profile, saved answers and résumé from the NextHire API, and puts them into that job's application form only. It sends the form's questions to NextHire to choose answers, and reports to NextHire what it filled and whether you said you submitted. Your profile data goes to two places only: the job's application page, and NextHire. The Extension never presses Submit and never completes a security check for you: you check the form and submit it yourself. While a fill is running, a small record of it (the application and the page) is kept in Chrome's session storage (chrome.storage.session), which Chrome clears when the browser closes.</li>
        <li><strong>Server storage:</strong> Once synced, your profile data is stored securely in your NextHire account. Refer to the <a href="/terms-of-service">NextHire Terms of Service</a> for server-side data handling.</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>We do not sell, rent, or share your personal data with any third parties. Your data is only transmitted to the NextHire servers under your authenticated account, and, when you choose 'Finish in your browser', into the application form of the employer you are applying to, which is what applying means.</p>

      <h2>6. Permissions Explained</h2>
      <p>The Extension requests the following Chrome permissions:</p>
      <ul>
        <li><strong>activeTab:</strong> To access the content of the currently active tab (only Naukri.com and LinkedIn profile pages) for scraping your profile data.</li>
        <li><strong>storage:</strong> To temporarily cache your scraped profile data and authentication token locally on your device.</li>
        <li><strong>tabs:</strong> To detect if you have a NextHire tab open and retrieve your authentication session.</li>
        <li><strong>scripting:</strong> To inject the profile scraping scripts into Naukri.com and LinkedIn pages, to read authentication state from the NextHire app, and to show the NextHire card on a job application page you are finishing in your browser.</li>
        <li><strong>debugger:</strong> Used only while the Extension fills a job application form you opened from NextHire with 'Finish in your browser', and only in that tab, on the job sites in section 7. It lets the Extension type into the form the way you would. It is attached when the fill starts and released as soon as it ends, and it lets go at once if the tab leaves those sites. Chrome shows a banner while it is attached. It is never used on any other tab or site.</li>
      </ul>

      <h2>7. Host Permissions</h2>
      <ul>
        <li><strong>naukri.com:</strong> Required to scrape your profile data from your Naukri profile page.</li>
        <li><strong>linkedin.com:</strong> Required to scrape your profile data from your LinkedIn profile page.</li>
        <li><strong>app.nexthireconsulting.com:</strong> Required to authenticate with and sync data to the NextHire service.</li>
        <li><strong>Job sites for 'Finish in your browser':</strong> jobs.lever.co (Lever), smartrecruiters.com (SmartRecruiters), recruitee.com (Recruitee), icims.com and jibeapply.com (iCIMS), app.dover.com (Dover), workforcenow.adp.com (ADP), paycomonline.net (Paycom), darwinbox.in and darwinbox.com (Darwinbox), account.amazon.jobs and passport.amazon.jobs (Amazon Jobs), jobs.dayforcehcm.com and dfid.dayforcehcm.com (Dayforce). Required to fill an application form you opened from NextHire on one of these sites and to show the NextHire card there. Nothing is read or filled on them unless you started that application from NextHire.</li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>You can at any time:</p>
      <ul>
        <li>Uninstall the Extension, which removes all locally stored data</li>
        <li>Clear the extension's local storage via Chrome settings</li>
        <li>Request deletion of your data from NextHire servers by contacting us</li>
      </ul>

      <h2>9. Security</h2>
      <p>All data transmission between the Extension and NextHire servers uses HTTPS encryption. Authentication tokens are stored securely in Chrome's extension storage, which is sandboxed from other extensions and websites.</p>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Material changes will be communicated through the Extension update notes on the Chrome Web Store.</p>

      <h2>11. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or your data, contact us at:<br />
      <a href="mailto:support@nexthireconsulting.com">support@nexthireconsulting.com</a></p>
      <p>NextHire Consulting<br />Bengaluru, Karnataka, India</p>
    `,
  },
  {
    slug: 'marketing-disclosure',
    title: 'Marketing Disclosure',
    subtitle: 'Transparency in our marketing practices',
    lastUpdated: 'January 1, 2025',
    content: `
      <h2>Disclosure Statement</h2>
      <p>NextHire Consulting is committed to transparent and honest marketing. This disclosure explains our marketing practices and how we represent our services.</p>

      <h2>Results Disclaimers</h2>
      <p>Results mentioned in testimonials, case studies, and marketing materials represent individual experiences. Individual results may vary based on experience level, job market conditions, effort, and other factors.</p>
      <p>When we state statistics such as "200K+ professionals helped" or "30-day average to placement," these reflect historical averages across our client base and are not guarantees of individual outcomes.</p>

      <h2>Testimonials and Reviews</h2>
      <p>Testimonials on our website are from real clients who have used our services. We do not compensate clients for providing testimonials. Names may be changed or initials used at the client's request for privacy.</p>

      <h2>Affiliate and Partner Relationships</h2>
      <p>NextHire may have affiliate or partnership relationships with certain employers and platforms. When we recommend specific platforms or opportunities, we will disclose any material financial relationship.</p>

      <h2>Advertising</h2>
      <p>NextHire uses digital advertising including Google Ads, LinkedIn Ads, and social media advertising. Sponsored content will always be clearly labeled as such.</p>

      <h2>Contact</h2>
      <p>If you have questions about our marketing practices, contact marketing@nexthireconsulting.com.</p>
    `,
  },
]

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug)
}

export function getAllLegalSlugs(): string[] {
  return legalPages.map((p) => p.slug)
}
