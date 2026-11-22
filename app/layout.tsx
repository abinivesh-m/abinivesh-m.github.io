import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Abinivesh M — AI Product Engineer & SDE',
  description:
    '2nd-year ECE @ SKCET. I build AI products that ship: Flutter, FastAPI, LLMs, AWS. 3× Hackathon Winner · 2× IIT Finalist.',
  metadataBase: new URL('https://abinivesh-m.github.io'),
  alternates: {
    canonical: 'https://abinivesh-m.github.io/',
  },
  applicationName: 'Abinivesh M Portfolio',
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'MgbClSjssZzo1sgHdfjCF-eEpScsshqoe18WU4Otwnc',
  },
  themeColor: '#07111f',
  openGraph: {
    title: 'Abinivesh M — AI Product Engineer & SDE',
    description: '3× Hackathon Winner · 2× IIT Finalist · AI Product Engineer & SDE',
    images: [{ url: '/assets/portrait.png', width: 1024, height: 1536 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abinivesh M — AI Product Engineer & SDE',
    description: '3× Hackathon Winner · 2× IIT Finalist · AI Product Engineer & SDE',
    images: ['/assets/portrait.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abinivesh M',
    url: 'https://abinivesh-m.github.io/',
    jobTitle: 'AI Product Engineer & SDE',
    sameAs: [
      'https://github.com/abinivesh-m',
      'https://linkedin.com/in/abinivesh-m-883052380',
    ],
    knowsAbout: ['Flutter', 'FastAPI', 'LLMs', 'AWS', 'Python', 'Dart', 'PostgreSQL'],
  }

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-navy text-slate-100 antialiased selection:bg-accent selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  )
}