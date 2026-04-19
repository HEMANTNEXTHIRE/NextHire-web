import type { Metadata } from 'next'
import Script from 'next/script'
import ReduxProvider from '@/components/ReduxProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NotificationContainer from '@/components/ui/Notification'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nexthireconsulting.com'),
  title: {
    default: 'NextHire | Your AI Job Search Agent — Get Hired Faster',
    template: '%s | NextHire',
  },
  description:
    'NextHire is an AI-powered job search agent. Escape apply-and-pray — AI auto-applies to hundreds of roles, builds ATS-optimized resumes, reaches hiring managers directly, and coaches you through interviews.',
  icons: {
    icon: '/Image/Nexthire.png',
    apple: '/Image/Nexthire.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'NextHire',
    locale: 'en_US',
    url: 'https://www.nexthireconsulting.com',
    title: 'NextHire | Your AI Job Search Agent — Get Hired Faster',
    description:
      'AI scans millions of jobs, applies on your behalf, reaches hiring managers directly, and coaches you through interviews. 200K+ careers transformed.',
    images: [
      {
        url: '/Image/Nexthire.png',
        width: 1200,
        height: 630,
        alt: 'NextHire — AI Job Search Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nexthirehq',
    title: 'NextHire | Your AI Job Search Agent',
    description:
      'AI auto-applies to hundreds of roles, builds ATS-optimized resumes, reaches hiring managers directly, and coaches you through interviews.',
    images: ['/Image/Nexthire.png'],
  },
  alternates: {
    canonical: 'https://www.nexthireconsulting.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org — SoftwareApplication structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'NextHire',
              url: 'https://www.nexthireconsulting.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description:
                'AI-powered job search agent and career growth platform. Automates job applications, builds ATS-optimized resumes, reaches hiring managers directly, and coaches candidates through interviews.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free plan available. Paid plans from $19.90/month.',
              },
              provider: {
                '@type': 'Organization',
                name: 'NextHire Consulting',
                url: 'https://www.nexthireconsulting.com',
                email: 'support@nexthireconsulting.com',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Faridabad',
                  addressRegion: 'Haryana',
                  addressCountry: 'IN',
                },
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '200000',
              },
            }),
          }}
        />

        {/* DNS prefetch for analytics and third-party scripts */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MSDC94KK');`}
        </Script>

        {/* Finsweet Cookie Consent */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js"
          strategy="afterInteractive"
          data-fs-cc-mode="opt-in"
          data-fs-cc-debug="false"
        />

        {/* Google Fonts — Noto Sans + Playfair Display (hero serif) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Webflow base CSS (loaded directly to avoid PostCSS parsing of minified file) */}
        <link rel="stylesheet" href="/styles/e25-algotale.min.css" />

        {/* Finsweet components config */}
        <Script
          src="https://cdn.prod.website-files.com/660dcc7f45ad8881324199b5%2F6544eda5f000985a163a8687%2F67854ef87ab319a37d086746%2Ffinsweetcomponentsconfig-1.0.7.js"
          type="module"
          strategy="afterInteractive"
          data-site-id="660dcc7f45ad8881324199b5"
          data-finsweet="components"
        />
      </head>
      <body className="andl-body">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MSDC94KK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <NotificationContainer />
        </ReduxProvider>
      </body>
    </html>
  )
}
