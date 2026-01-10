'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

const footerLinks = {
  reproductionChimneypieces: {
    title: 'Reproduction Chimneypieces',
    links: [
      { label: 'Bolection', href: '#' },
      { label: 'Stone & Composition', href: '#' },
      { label: 'Georgian', href: '#' },
      { label: 'Regency', href: '#' },
      { label: 'Victorian', href: '#' },
    ],
  },
  antiqueChimneypieces: {
    title: 'Antique Chimneypieces',
    links: [
      { label: 'Stone & Marble', href: '#' },
      { label: 'Timber', href: '#' },
      { label: 'Iron', href: '#' },
    ],
  },
  reproductionLighting: {
    title: 'Reproduction Lighting',
    links: [
      { label: 'Pendant Lights', href: '#' },
      { label: 'Lanterns & Cages', href: '#' },
      { label: 'Chandeliers', href: '#' },
      { label: 'Ceiling Lights', href: '#' },
      { label: 'Wall Lights', href: '#' },
      { label: 'Floor Lamps', href: '#' },
    ],
  },
  reproductionFurniture: {
    title: 'Reproduction Furniture',
    links: [
      { label: 'Seating', href: '#' },
      { label: 'Tables', href: '#' },
      { label: 'Decorative', href: '#' },
      { label: 'Mirrors', href: '#' },
      { label: 'Stands', href: '#' },
    ],
  },
  antiqueFurniture: {
    title: 'Antique Furniture',
    links: [
      { label: 'Seating', href: '#' },
      { label: 'Tables', href: '#' },
      { label: 'Decorative', href: '#' },
      { label: 'Mirrors', href: '#' },
      { label: 'Lighting', href: '#' },
    ],
  },
  journal: {
    title: 'Journal',
    links: [
      { label: 'News', href: '#' },
      { label: 'Inspiration', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Collaboration', href: '#' },
      { label: 'Inspiration', href: '#' },
    ],
  },
  about: {
    title: 'About',
    links: [
      { label: 'History', href: '#' },
      { label: 'Gallery', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Trade', href: '#' },
    ],
  },
}

const bottomLinks = [
  { label: 'Refine Antique Chimneypieces', href: '#' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#E3E3E3' }} className="border-t border-border">
      <div className="container-jamb py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-6">
          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <h4 className="text-xs font-medium uppercase tracking-wider mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs hover:text-foreground transition-colors"
                      style={{ color: '#9C9C9D' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs hover:text-foreground transition-colors"
                style={{ color: '#9C9C9D' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#9C9C9D' }}>
            © {new Date().getFullYear()} Jamb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
