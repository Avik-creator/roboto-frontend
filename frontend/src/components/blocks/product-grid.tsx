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
  imagePath?: string // For local images
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

export function ProductGrid({
  sectionTitle,
  products,
  columns = 5,
  variant = 'default',
}: ProductGridProps) {
  const gridColsClass = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <section className="bg-[#E3E3E3] py-16 md:py-24">
      <div className="container-jamb">
        {sectionTitle && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-primary text-[21px] leading-[18px] font-[550] text-center mb-12 md:mb-16 tracking-tight"
          >
            {sectionTitle}
          </motion.h3>
        )}

        <div className={`grid ${gridColsClass[columns]} gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10`}>
          {products.map((product, index) => {
            const aspectRatio = product.aspectRatio || (variant === 'mixed-aspect' ? getRandomAspectRatio(index) : 'square')
            const { width, height } = getImageDimensions(aspectRatio)

            const imageUrl = product.imagePath
              ? product.imagePath
              : product.image?.asset
                ? urlFor(product.image.asset).width(width).height(height).quality(85).url()
                : '/images/placeholder.jpg'

            return (
              <motion.div
                key={product._key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={product.href || '#'} className="group block">
                  <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden bg-[#f5f3f0] mb-4`}>
                    <Image
                      src={imageUrl}
                      alt={product.image?.alt || product.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-primary text-[16px] leading-[25px] font-[650] text-foreground">
                      {product.title}
                    </h4>
                    {product.subtitle && (
                      <p className="font-primary text-[16px] leading-[25px] font-[550] text-[#1a1a1a]">
                        {product.subtitle}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Helper to assign varied aspect ratios for visual interest
function getRandomAspectRatio(index: number): 'square' | 'portrait' | 'landscape' | 'tall' {
  const ratios: Array<'square' | 'portrait' | 'landscape' | 'tall'> = ['portrait', 'tall', 'portrait', 'tall', 'portrait']
  return ratios[index % ratios.length]
}
