import type { Metadata } from 'next'
import './globals.css'
import { Libre_Baskerville } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Jamb. | Antique & Reproduction Fireplaces, Lighting & Furniture',
  description: 'Discover exquisite antique and reproduction fireplaces, lighting, and furniture. Handcrafted with exceptional attention to detail.',
  openGraph: {
    images: [
      {
        url: '/homepageImage1.png',
        width: 1200,
        height: 630,
        alt: 'Jamb. | Antique & Reproduction Fireplaces, Lighting & Furniture',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: '/homepageImage1.png',
        width: 1200,
        height: 630,
        alt: 'Jamb. | Antique & Reproduction Fireplaces, Lighting & Furniture',
      },
    ],
  },
}

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
