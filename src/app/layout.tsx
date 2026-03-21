import type { Metadata } from 'next'
import Script from 'next/script'
import ReduxProvider from '@/components/ReduxProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NotificationContainer from '@/components/ui/Notification'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NextHire | Career Growth Platform',
    template: '%s | NextHire',
  },
  description:
    'NextHire For Candidates is your career partner. Get hired faster with resume optimization, job portal ranking, expert career guidance, and post-placement payment options.',
  icons: {
    icon: '/Image/Nexthire.png',
    apple: '/Image/Nexthire.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'NextHire',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
