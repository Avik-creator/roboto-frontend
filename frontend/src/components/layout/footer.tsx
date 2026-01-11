'use client'

import Link from 'next/link'
import {motion, AnimatePresence} from 'motion/react'
import {useState} from 'react'

const footerStructure = [
  {
    sections: [
      {
        title: 'Reproduction Chimneypieces',
        links: [
          {label: 'Marble', href: '#'},
          {label: 'Stone', href: '#'},
          {label: 'Grates & Accessories', href: '#'},
          {label: 'Guide to Jamb Marbles', href: '#'},
        ],
      },
      {
        title: 'Antique Chimneypieces',
        links: [
          {label: 'French & Italian', href: '#'},
          {label: 'Georgian', href: '#'},
          {label: 'Regency', href: '#'},
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
          {label: 'Hanging Globes', href: '#'},
          {label: 'Hanging Lanterns', href: '#'},
          {label: 'Wall Lights', href: '#'},
          {label: 'Dish Lights', href: '#'},
          {label: 'Table Lamps', href: '#'},
          {label: 'Chains & Brackets', href: '#'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Reproduction Furniture',
        links: [
          {label: 'Seating', href: '#'},
          {label: 'Tables', href: '#'},
          {label: 'Mirrors', href: '#'},
          {label: 'The Pantry Collection', href: '#'},
        ],
      },
      {
        title: 'Antique Furniture',
        links: [
          {label: 'Seating', href: '#'},
          {label: 'Tables', href: '#'},
          {label: 'Desks', href: '#'},
          {label: 'Bookcases & Cabinets', href: '#'},
          {label: 'Chests', href: '#'},
          {label: 'Mirrors', href: '#'},
          {label: 'Fire Accessories', href: '#'},
          {label: 'Objects', href: '#'},
          {label: 'Works of Arts', href: '#'},
          {label: 'Lighting', href: '#'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'Journal',
        links: [
          {label: 'Praesentium', href: '#'},
          {label: 'Voluptatibus', href: '#'},
          {label: 'Accusamus', href: '#'},
          {label: 'Iusto', href: '#'},
          {label: 'Dignissimos', href: '#'},
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: 'About',
        links: [
          {label: 'Founders', href: '#'},
          {label: 'Team', href: '#'},
          {label: 'History', href: '#'},
          {label: 'Galleries', href: '#'},
          {label: 'Workshops', href: '#'},
          {label: 'Showrooms', href: '#'},
          {label: 'Terms & Conditions', href: '#'},
        ],
      },
    ],
  },
]

function FooterSection({title, links}: {title: string; links: {label: string; href: string}[]}) {
  const [isOpen, setIsOpen] = useState(false)

  if (links.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h5 className="footer-text text-left leading-normal m-0 p-0 whitespace-nowrap">{title}</h5>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left lg:cursor-default"
      >
        <h5 className="footer-text leading-normal m-0 p-0">{title}</h5>
        <motion.svg
          animate={{rotate: isOpen ? 180 : 0}}
          transition={{duration: 0.2}}
          className="w-4 h-4 lg:hidden flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.ul
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.2}}
            className="flex flex-col gap-2 list-none m-0 p-0 overflow-hidden"
          >
            {links.map((link) => (
              <li key={link.label} className="m-0 p-0">
                <Link
                  href={link.href}
                  className="footer-text hover:text-foreground transition-colors no-underline block hover:underline"
                  style={{color: '#9C9C9D'}}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <footer style={{backgroundColor: '#E3E3E3'}} className="py-12 md:py-16 lg:py-24">
      <div className="container-jamb">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 md:mb-16 lg:mb-20">
          <div className="space-y-1 min-w-[160px] md:min-w-[200px]">
            <p className="text-[13px] md:text-[15px] font-primary" style={{color: '#9C9C9D'}}>
              Tel: +44 (0) 207 730 2122
            </p>
            <p className="text-[13px] md:text-[15px] font-primary" style={{color: '#9C9C9D'}}>
              95-97 Pimlico Rd
            </p>
            <p className="text-[13px] md:text-[15px] font-primary" style={{color: '#9C9C9D'}}>
              London SW1W 8PH
            </p>
          </div>

          <div className="md:pt-0">
            <a
              href="mailto:hello@jamb.co.uk"
              className="text-[13px] md:text-[15px] font-primary hover:text-foreground transition-colors"
              style={{color: '#9C9C9D'}}
            >
              hello@jamb.co.uk
            </a>
          </div>

          <div className="w-full md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px]">
            <p className="text-[13px] md:text-[15px] font-primary mb-3 md:mb-4 text-[#9C9C9D] leading-tight text-left">
              Newsletter
            </p>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="flex border border-[#9C9C9D]/30 bg-white overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-3 sm:px-4 py-2.5 text-[14px] md:text-[15px] font-primary focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 text-[13px] sm:text-[14px] md:text-[15px] font-primary border-l border-[#9C9C9D]/30 hover:bg-gray-50 transition-colors text-[#9C9C9D] whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-3.5 h-3.5 rounded-full border border-[#9C9C9D] flex items-center justify-center transition-colors flex-shrink-0 ${agreed ? 'bg-foreground' : ''}`}
                >
                  {agreed && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </button>
                <label
                  className="text-[12px] md:text-[13px] font-primary cursor-pointer"
                  style={{color: '#9C9C9D'}}
                >
                  I agree to our Privacy Policy
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 sm:gap-y-12 gap-x-6 lg:gap-x-8">
          {footerStructure.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-8 sm:gap-10">
              {column.sections.map((section, secIndex) => (
                <div key={secIndex} className="flex flex-col gap-4">
                  <FooterSection title={section.title} links={section.links} />
                  {secIndex < column.sections.length - 1 && (
                    <div className="mt-2 border-b border-[#9C9C9D]/20 w-full hidden sm:block" />
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
