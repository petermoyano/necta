import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Premios Necta 2024',
  description: '¡Es hora de votar! Elegí a tus ganadores en los Premios Necta 2024',
  metadataBase: new URL('https://necta-nine.vercel.app'),
  openGraph: {
    title: 'Premios Necta 2024',
    description: '¡Es hora de votar! Elegí a tus ganadores en los Premios Necta 2024',
    images: [
      {
        url: '/logo-necta.jpeg',
        width: 120,
        height: 120,
        alt: 'Premios Necta 2024',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Premios Necta 2024',
    description: '¡Es hora de votar! Elegí a tus ganadores en los Premios Necta 2024',
    images: ['/logo-necta.jpeg'],
  },
  icons: {
    icon: '/logo-necta.jpeg',
    apple: '/logo-necta.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
