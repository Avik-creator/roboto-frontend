'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40"
    >
      <div className="container-jamb flex items-center justify-between py-6">
        {/* Logo */}
        <Link href="/" className="font-primary text-[32px] md:text-[40px] tracking-tight leading-none text-foreground">
          Jamb.
        </Link>

        {/* Right Navigation Icons */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Search Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Email Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Newsletter"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
            >
              <rect x="2" y="4" width="20" height="16" rx="0" />
              <path d="m22 7-10 7L2 7" />
            </svg>
          </button>

          {/* Menu Icon */}
          <button
            className="p-2 hover:opacity-60 transition-opacity flex flex-col gap-[5px]"
            aria-label="Open menu"
          >
            <div className="w-7 h-px bg-muted"></div>
            <div className="w-7 h-px bg-muted"></div>
            <div className="w-7 h-px bg-muted"></div>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
