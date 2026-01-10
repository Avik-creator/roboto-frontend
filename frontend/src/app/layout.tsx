import type { Metadata } from 'next'
import './globals.css'
import { Libre_Baskerville } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Jamb. | Antique & Reproduction Fireplaces, Lighting & Furniture',
  description: 'Discover exquisite antique and reproduction fireplaces, lighting, and furniture. Handcrafted with exceptional attention to detail.',
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
