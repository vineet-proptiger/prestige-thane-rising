import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Open_Sans, Montserrat, Cormorant_Garamond, Poppins } from 'next/font/google'
import { CITY_DISPLAY } from '../lib/config'
import localFont from 'next/font/local'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const nephilm = localFont({
  src: '../public/fonts/Nephilm.otf',
  variable: '--font-nephilm',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://prestigethanenewproject.com'),
  title: 'Prestige Thane Rising | Luxury 2, 3 & 4 BHK in Thane West',
  description: "Prestige Thane Rising, Thane West offers luxury 2, 3 & 4 BHK homes with 30+ amenities from ₹1.6 Cr*. Pre-launch booking open with ₹1 Lakh EOI. Enquire now!",
  alternates: {
    canonical: 'https://prestigethanenewproject.com',
  },
  openGraph: {
    title: 'Prestige Thane Rising | Luxury 2, 3 & 4 BHK in Thane West',
    description: "Prestige Thane Rising, Thane West offers luxury 2, 3 & 4 BHK homes with 30+ amenities from ₹1.6 Cr*. Pre-launch booking open with ₹1 Lakh EOI. Enquire now!",
    url: 'https://prestigethanenewproject.com',
    siteName: 'Prestige Thane Rising',
    images: [
      {
        url: '/images/hero/banner1.webp',
        width: 1200,
        height: 630,
        alt: 'Prestige Thane Rising at Thane West, Mumbai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestige Thane Rising | Luxury 2, 3 & 4 BHK in Thane West',
    description: "Prestige Thane Rising, Thane West offers luxury 2, 3 & 4 BHK homes with 30+ amenities from ₹1.6 Cr*. Pre-launch booking open with ₹1 Lakh EOI. Enquire now!",
    images: ['/images/hero/banner1.webp'],
  },
  icons: {
    icon: '/images/favicon/fav.webp',
  },
}

import SmoothScroll from '../components/SmoothScroll'

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-575H8R87" />
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Prestige Thane Rising",
              "url": "https://prestigethanenewproject.com",
              "logo": "https://prestigethanenewproject.com/images/logo/Logo.webp",
              "image": "https://prestigethanenewproject.com/images/hero/banner1.webp",
              "description": "Prestige Thane Rising at Thane West, Mumbai offers premium 2, 3 & 4 BHK residences.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Thane West",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "telephone": "+919718344024",
              "priceRange": "₹ 1.6 Crore Onwards",
              "sameAs": [
                "https://prestigethanenewproject.com"
              ]
            })
          }}
        />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} ${cormorant.variable} ${nephilm.variable} ${poppins.variable} font-sans text-dark antialiased`}>
        <Script id="gtag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'city': '${CITY_DISPLAY}' });
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`} 
        </Script>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
