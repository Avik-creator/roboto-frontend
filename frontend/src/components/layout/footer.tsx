'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'

const footerStructure = [
  {
    sections: [
      {
        title: 'Reproduction Chimneypieces',
        links: [
          { label: 'Marble', href: '#' },
          { label: 'Stone', href: '#' },
          { label: 'Grates & Accessories', href: '#' },
          { label: 'Guide to Jamb Marbles', href: '#' },
        ],
      },
      {
        title: 'Antique Chimneypieces',
        links: [
          { label: 'French & Italian', href: '#' },
          { label: 'Georgian', href: '#' },
          { label: 'Regency', href: '#' },
        ],
      },
      {
        title: 'Sell an Antique Chimneypiece',
        links: [],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Reproduction Lighting',
        links: [
          { label: 'Hanging Globes', href: '#' },
          { label: 'Hanging Lanterns', href: '#' },
          { label: 'Wall Lights', href: '#' },
          { label: 'Dish Lights', href: '#' },
          { label: 'Table Lamps', href: '#' },
          { label: 'Chains & Brackets', href: '#' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Reproduction Furniture',
        links: [
          { label: 'Seating', href: '#' },
          { label: 'Tables', href: '#' },
          { label: 'Mirrors', href: '#' },
          { label: 'The Pantry Collection', href: '#' },
        ],
      },
      {
        title: 'Antique Furniture',
        links: [
          { label: 'Seating', href: '#' },
          { label: 'Tables', href: '#' },
          { label: 'Desks', href: '#' },
          { label: 'Bookcases & Cabinets', href: '#' },
          { label: 'Chests', href: '#' },
          { label: 'Mirrors', href: '#' },
          { label: 'Fire Accessories', href: '#' },
          { label: 'Objects', href: '#' },
          { label: 'Works of Arts', href: '#' },
          { label: 'Lighting', href: '#' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Journal',
        links: [
          { label: 'Praesentium', href: '#' },
          { label: 'Voluptatibus', href: '#' },
          { label: 'Accusamus', href: '#' },
          { label: 'Iusto', href: '#' },
          { label: 'Dignissimos', href: '#' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'About',
        links: [
          { label: 'Founders', href: '#' },
          { label: 'Team', href: '#' },
          { label: 'History', href: '#' },
          { label: 'Galleries', href: '#' },
          { label: 'Workshops', href: '#' },
          { label: 'Showrooms', href: '#' },
          { label: 'Terms & Conditions', href: '#' },
        ],
      },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <footer style={{ backgroundColor: '#E3E3E3' }} className="py-12 md:py-24">
      <div className="container-jamb">
        {/* Contact & Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          {/* Column 1: Address Details */}
          <div className="space-y-1 min-w-[200px]">
            <p className="text-[15px] font-primary" style={{ color: '#9C9C9D' }}>Tel: +44 (0) 207 730 2122</p>
            <p className="text-[15px] font-primary" style={{ color: '#9C9C9D' }}>95-97 Pimlico Rd</p>
            <p className="text-[15px] font-primary" style={{ color: '#9C9C9D' }}>London SW1W 8PH</p>
          </div>

          {/* Column 2: Email */}
          <div className="md:pt-0">
            <a
              href="mailto:hello@jamb.co.uk"
              className="text-[15px] font-primary hover:text-foreground transition-colors"
              style={{ color: '#9C9C9D' }}
            >
              hello@jamb.co.uk
            </a>
          </div>

          {/* Column 3: Newsletter Form */}
          <div className="w-full max-w-[380px]">
            <p className="text-[15px] font-primary mb-4 text-[#9C9C9D] leading-tight text-left">Newsletter</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex border border-[#9C9C9D]/30 bg-white overflow-hidden">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Search"
                  className="flex-1 px-4 py-2.5 text-[15px] font-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 text-[15px] font-primary border-l border-[#9C9C9D]/30 hover:bg-gray-50 transition-colors text-[#9C9C9D]"
                >
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-3.5 h-3.5 rounded-full border border-[#9C9C9D] flex items-center justify-center transition-colors ${agreed ? 'bg-foreground' : ''}`}
                >
                  {agreed && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </button>
                <label className="text-[13px] font-primary" style={{ color: '#9C9C9D' }}>
                  I agree to our Privacy Policy
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8">
          {footerStructure.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-12">
              {column.sections.map((section, secIndex) => (
                <div key={secIndex} className="flex flex-col gap-4">
                  <h5 className="text-[15px] font-primary font-medium text-foreground text-left leading-normal m-0 p-0">
                    {section.title}
                  </h5>
                  {section.links.length > 0 && (
                    <ul className="flex flex-col gap-2 list-none m-0 p-0">
                      {section.links.map((link) => (
                        <li key={link.label} className="m-0 p-0">
                          <Link
                            href={link.href}
                            className="text-[15px] font-primary hover:text-foreground transition-colors no-underline block hover:underline"
                            style={{ color: '#9C9C9D' }}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {secIndex < column.sections.length - 1 && (
                    <div className="mt-4 border-b border-[#9C9C9D]/20 w-full" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
