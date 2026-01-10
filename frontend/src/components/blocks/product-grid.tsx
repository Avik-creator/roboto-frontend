'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface Product {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
  }
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'tall'
}

interface ProductGridProps {
  _key: string
  sectionTitle?: string
  products: Product[]
  columns?: 3 | 4 | 5 | 6
  variant?: 'default' | 'mixed-aspect'
}

// Aspect ratio classes for different product sizes
const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  tall: 'aspect-[2/3]',
}

// Image dimensions based on aspect ratio
const getImageDimensions = (aspectRatio: string) => {
  switch (aspectRatio) {
    case 'square':
      return { width: 400, height: 400 }
    case 'portrait':
      return { width: 400, height: 533 }
    case 'landscape':
      return { width: 400, height: 300 }
    case 'tall':
      return { width: 400, height: 600 }
    default:
      return { width: 400, height: 400 }
  }
}

// Placeholder images
const PRODUCT_PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
]

export function ProductGrid({
  sectionTitle,
  products,
  columns = 5,
  variant = 'default',
}: ProductGridProps) {
  const gridColsClass = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <section className="container-jamb py-12 md:py-20">
      {sectionTitle && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-lg md:text-xl italic text-center mb-10 md:mb-14"
        >
          {sectionTitle}
        </motion.h3>
      )}

      <div className={`grid ${gridColsClass[columns]} gap-4 md:gap-6`}>
        {products.map((product, index) => {
          const aspectRatio = product.aspectRatio || (variant === 'mixed-aspect' ? getRandomAspectRatio(index) : 'square')
          const { width, height } = getImageDimensions(aspectRatio)
          const placeholderUrl = PRODUCT_PLACEHOLDERS[index % PRODUCT_PLACEHOLDERS.length]
          const imageUrl = product.image?.asset
            ? urlFor(product.image.asset).width(width).height(height).quality(85).url()
            : placeholderUrl

          return (
            <motion.div
              key={product._key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={product.href || '#'} className="group block">
                <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden bg-cream mb-4`}>
                  <Image
                    src={imageUrl}
                    alt={product.image?.alt || product.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-sm md:text-base italic">
                    {product.title}
                  </h4>
                  {product.subtitle && (
                    <p className="text-xs text-muted mt-1">{product.subtitle}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// Helper to assign varied aspect ratios for visual interest
function getRandomAspectRatio(index: number): 'square' | 'portrait' | 'landscape' | 'tall' {
  const ratios: Array<'square' | 'portrait' | 'landscape' | 'tall'> = ['portrait', 'tall', 'portrait', 'tall', 'portrait']
  return ratios[index % ratios.length]
}
