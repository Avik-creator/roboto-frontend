import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jamb. | Antique & Reproduction Fireplaces, Lighting & Furniture',
  description: 'Discover exquisite antique and reproduction fireplaces, lighting, and furniture. Handcrafted with exceptional attention to detail.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
