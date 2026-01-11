'use client'

import Link from 'next/link'
import {motion} from 'motion/react'
import {useState, useCallback} from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <motion.header
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: 'easeOut'}}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40"
      role="banner"
    >
      <div className="container-jamb flex items-center justify-between py-6">
        <Link
          href="/"
          className="font-primary text-[32px] md:text-[40px] tracking-tight leading-none text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          aria-label="Jamb - Home"
          onClick={closeMenu}
        >
          Jamb.
        </Link>

        <nav
          className="flex items-center gap-2 md:gap-6"
          role="navigation"
          aria-label="Header navigation"
        >
          <button
            className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-label="Search"
            aria-describedby="search-hint"
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
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
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
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="0" />
              <path d="m22 7-10 7L2 7" />
            </svg>
          </button>

          <button
            className="p-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm flex flex-col gap-[5px]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            onClick={toggleMenu}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <motion.span
              animate={{rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0}}
              className="w-7 h-px bg-muted block"
              aria-hidden="true"
            />
            <motion.span
              animate={{opacity: isMenuOpen ? 0 : 1}}
              className="w-7 h-px bg-muted block"
              aria-hidden="true"
            />
            <motion.span
              animate={{rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0}}
              className="w-7 h-px bg-muted block"
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <motion.div
          id="main-menu"
          role="region"
          aria-label="Main menu"
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: 'auto'}}
          exit={{opacity: 0, height: 0}}
          transition={{duration: 0.3, ease: 'easeInOut'}}
          className="lg:hidden border-t border-border/40 bg-background"
        >
          <nav className="container-jamb py-8 space-y-4" aria-label="Mobile menu">
            <Link
              href="/fireplaces"
              className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              onClick={closeMenu}
            >
              Fireplaces
            </Link>
            <Link
              href="/lighting"
              className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              onClick={closeMenu}
            >
              Lighting
            </Link>
            <Link
              href="/furniture"
              className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              onClick={closeMenu}
            >
              Furniture
            </Link>
            <Link
              href="/journal"
              className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              onClick={closeMenu}
            >
              Journal
            </Link>
            <Link
              href="/about"
              className="block text-[15px] font-primary text-muted hover:text-foreground transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              onClick={closeMenu}
            >
              About
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
