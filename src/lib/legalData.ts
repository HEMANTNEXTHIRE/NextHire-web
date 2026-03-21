export interface LegalPage {
  slug: string
  title: string
  subtitle?: string
  lastUpdated: string
  content: string
}

export const legalPages: LegalPage[] = [
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
