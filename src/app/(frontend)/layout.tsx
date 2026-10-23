import type { Metadata } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import React from 'react'

import { GvHeader } from '@/components/GvHeader'
import { Footer } from '@/components/SiteChrome'
import { company } from '@/content/site'
import { getSettings } from '@/lib/content'

import './globals.css'
import './home-greenova.css'

const dm = DM_Sans({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700', '800'], variable: '--font-dm' })
const manrope = Manrope({ subsets: ['latin'], display: 'swap', weight: ['500', '600', '700', '800'], variable: '--font-manrope' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'),
  title: {
    default: 'Meladen Energy Zambia | Fuel Stations & Bulk Fuel Supply',
    template: '%s',
  },
  description: 'Discover Meladen Energy’s fuel stations, petroleum products and commercial bulk diesel supply solutions across Zambia.',
  openGraph: {
    title: 'Meladen Energy Zambia | Fuel Stations & Bulk Fuel Supply',
    description: company.tagline,
    locale: 'en_ZM',
    type: 'website',
  },
  icons: { icon: [{ url: '/favicon.png', type: 'image/png' }], apple: [{ url: '/favicon.png' }] },
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {ga ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className={`${dm.className} ${dm.variable} ${manrope.variable}`}>
        <GvHeader />
        <div id="content">{children}</div>
        <Footer
          established={company.established}
          settings={{
            organisation: settings.organisation,
            tagline: settings.tagline,
            phones: settings.phones,
            address: settings.address,
            logisticsPartner: settings.logisticsPartner,
          }}
        />
      </body>
    </html>
  )
}
