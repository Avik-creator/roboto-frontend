'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
    >
      <div className="container-jamb flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="/" className="font-primary text-2xl md:text-3xl tracking-tight">
          Jamb.
        </Link>

        {/* Right Navigation Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Grid View Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Grid view"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ stroke: '#9C9C9D' }}
            >
              <rect x="2" y="2" width="6" height="6" />
              <rect x="12" y="2" width="6" height="6" />
              <rect x="2" y="12" width="6" height="6" />
              <rect x="12" y="12" width="6" height="6" />
            </svg>
          </button>

          {/* List View Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="List view"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ stroke: '#9C9C9D' }}
            >
              <line x1="2" y1="4" x2="18" y2="4" />
              <line x1="2" y1="10" x2="18" y2="10" />
              <line x1="2" y1="16" x2="18" y2="16" />
            </svg>
          </button>

          {/* Menu Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ stroke: '#9C9C9D' }}
            >
              <line x1="2" y1="5" x2="18" y2="5" />
              <line x1="2" y1="10" x2="18" y2="10" />
              <line x1="2" y1="15" x2="18" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
