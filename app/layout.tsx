import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE = 'https://v0-ashutoshtiwari.vercel.app'
const DESCRIPTION =
  'Ashutosh Tiwari, Full-Stack Developer in Mumbai: React, Next.js, TypeScript and Node.js. Builder of SecLayer (Linux firewall), CareerPilot, FocusHub and CheckMate Arena.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Ashutosh Tiwari | Full-Stack Developer',
  description: DESCRIPTION,
  authors: [{ name: 'Ashutosh Tiwari', url: SITE }],
  keywords: ['Ashutosh Tiwari', 'Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Portfolio', 'Mumbai'],
  alternates: { canonical: '/' },
  // link previews on LinkedIn, WhatsApp, X, Slack, email...
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Ashutosh Tiwari',
    title: 'Ashutosh Tiwari | Full-Stack Developer',
    description: DESCRIPTION,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Ashutosh Tiwari, Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashutosh Tiwari | Full-Stack Developer',
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
  icons: {
    // "AT" badge logo as the browser-tab icon
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  // the site is dark by default, so the browser bar matches it on every phone
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* dark by default; light only if the visitor chose it (applied before first paint, no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* structured data: lets search engines show a proper result for my name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ashutosh Tiwari',
              jobTitle: 'Full-Stack Developer',
              url: SITE,
              image: `${SITE}/og.jpg`,
              address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
              worksFor: { '@type': 'Organization', name: 'Softaculous Ltd.' },
              alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Mumbai' },
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Linux', 'Server security'],
              sameAs: ['https://github.com/Ashu-1104', 'https://www.linkedin.com/in/ashutosh-tiwari-397206237'],
            }),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
