'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface MediaItem {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
  }
  imagePath?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'tall'
}

interface MediaGridProps {
  _key: string
  sectionTitle?: string
  items: MediaItem[]
  backgroundColor?: string
  columns?: 2 | 3 | 4 | 5 | 6
  variant?: 'stories' | 'products'
}

// Legacy interface for backward compatibility
interface Story extends MediaItem { }
interface StoriesGridProps extends Omit<MediaGridProps, 'items' | 'backgroundColor' | 'columns' | 'variant'> {
  stories: Story[]
}

export function StoriesGrid({ sectionTitle = 'See more of our latest stories', stories }: StoriesGridProps) {
  return MediaGrid({
    _key: 'stories-grid',
    sectionTitle,
    items: stories,
    backgroundColor: '#ECEAE7',
    columns: 5,
    variant: 'stories'
  })
}

export function MediaGrid({
  sectionTitle,
  items,
  backgroundColor = '#ECEAE7',
  columns = 5,
  variant = 'stories'
}: MediaGridProps) {
  // Use local image if provided, otherwise fallback
  const displayItems = items?.length > 0 ? items : Array(4).fill({
    _key: 'placeholder',
    title: 'Lorem Ipsum',
    subtitle: 'Subtitle',
    imagePath: variant === 'stories' ? '/jambmostprizedpossion.jpg' : '/chair.png'
  });

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  // Aspect ratio classes for different product sizes
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]', // More compact portrait
    landscape: 'aspect-[5/4]', // More compact landscape
    tall: 'aspect-[3/5]', // More compact tall
  }

  // Image dimensions based on aspect ratio
  const getImageDimensions = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'square':
        return { width: 400, height: 400 }
      case 'portrait':
        return { width: 400, height: 500 } // 4:5 aspect ratio
      case 'landscape':
        return { width: 400, height: 320 } // 5:4 aspect ratio
      case 'tall':
        return { width: 400, height: 667 } // 3:5 aspect ratio
      default:
        return { width: 400, height: 400 }
    }
  }

  // Helper to assign varied aspect ratios for visual interest
  function getRandomAspectRatio(index: number): 'square' | 'portrait' | 'landscape' | 'tall' {
    // Use more portrait/tall ratios to avoid overly wide images
    const ratios: Array<'square' | 'portrait' | 'landscape' | 'tall'> = ['portrait', 'tall', 'square', 'portrait', 'tall']
    return ratios[index % ratios.length]
  }

  return (
    <section className={`bg-[${backgroundColor}] pt-8 md:pt-20 pb-20 md:pb-28`}>
      <div className="container-jamb px-4 max-w-[1400px] mx-auto">
        {sectionTitle && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-primary text-[24px] md:text-[28px] text-center mb-20 md:mb-24 tracking-tight text-[#1a1a1a]"
          >
            {sectionTitle}
          </motion.h3>
        )}

        <div className={`grid ${gridColsClass[columns]} gap-x-8 md:gap-x-12 gap-y-16 mt-8`}>
          {displayItems.map((item, index) => {
            const aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' = item.aspectRatio || (variant === 'products' ? 'portrait' : 'portrait')
            const { width, height } = getImageDimensions(aspectRatio)

            const imageUrl = item.imagePath
              ? item.imagePath
              : item.image?.asset
                ? urlFor(item.image.asset).width(width).height(variant === 'stories' ? 500 : height).quality(85).url()
                : (variant === 'stories' ? '/jambmostprizedpossion.jpg' : '/chair.png')

            return (
              <motion.div
                key={`${item._key}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={item.href || '#'} className="group block">
                  <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden mb-5 ${variant === 'products' ? 'bg-[#f5f3f0]' : ''}`}>
                    <Image
                      src={imageUrl}
                      alt={item.image?.alt || item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className={`font-primary text-[15px] font-medium text-black`}>
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="font-primary text-[13px] text-[#9C9C9D]">
                        {item.subtitle}
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
