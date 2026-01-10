'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

interface CategoryNavigationProps {
  _key: string
  categories?: Array<{
    _key: string
    label: string
    href: string
  }>
}

const defaultCategories = [
  { _key: '1', label: 'Fireplaces', href: '#fireplaces' },
  { _key: '2', label: 'Lighting', href: '#lighting' },
  { _key: '3', label: 'Furniture', href: '#furniture' },
  { _key: '4', label: 'Journal', href: '#journal' },
]

export function CategoryNavigation({ categories = defaultCategories }: CategoryNavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container-jamb py-6 md:py-10"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
        {categories.map((category, index) => (
          <motion.span
            key={category._key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center"
          >
            <Link
              href={category.href}
              className="text-[11px] md:text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors relative group whitespace-nowrap"
            >
              {category.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
            {index < categories.length - 1 && (
              <span className="ml-3 md:ml-8 text-muted">/</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.nav>
  )
}
