'use client'

import Link from 'next/link'
import {motion} from 'motion/react'
import {DURATIONS, EASINGS, getNavigationAnimation} from '@/utils'

interface CategoryNavigationProps {
  _key: string
  categories?: Array<{
    _key: string
    label: string
    href: string
  }>
}

const defaultCategories = [
  {_key: '1', label: 'Fireplaces', href: '#fireplaces'},
  {_key: '2', label: 'Lighting', href: '#lighting'},
  {_key: '3', label: 'Furniture', href: '#furniture'},
  {_key: '4', label: 'Journal', href: '#journal'},
]

export function CategoryNavigation({categories = defaultCategories}: CategoryNavigationProps) {
  return (
    <motion.nav
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: DURATIONS.medium, ease: EASINGS.elegant}}
      className="container-jamb py-10 md:py-16"
    >
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4 mt-4 md:mt-6">
        {categories.map((category, index) => (
          <motion.span
            key={category._key}
            {...getNavigationAnimation(index)}
            className="flex items-center"
          >
            <Link
              href={category.href}
              className="text-[11px] md:text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-500 relative group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {category.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:w-full" />
            </Link>
            {index < categories.length - 1 && (
              <span className="ml-2 md:ml-4 text-muted" aria-hidden="true">
                |
              </span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.nav>
  )
}
