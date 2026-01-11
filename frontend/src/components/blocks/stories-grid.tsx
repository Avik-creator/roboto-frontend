'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'
import type { StaticImageData } from 'next/image'

// Union type for images that can be either StaticImageData or SanityImage
type ImageSource = StaticImageData | {
  asset?: SanityImageSource
  alt?: string
}
import {
  DURATIONS,
  EASINGS,
  getStaggerDelay,
  getGridColsClass,
  getAspectRatioClass,
  getImageDimensions,
  getAriaLabel,
} from '@/utils'
import { ResponsiveImage, Section, Container } from '@/components/ui'

interface MediaItem {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: ImageSource
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

type Story = MediaItem
interface StoriesGridProps extends Omit<
  MediaGridProps,
  'items' | 'backgroundColor' | 'columns' | 'variant'
> {
  stories: Story[]
}

export function StoriesGrid({
  sectionTitle = 'See more of our latest stories',
  stories,
}: StoriesGridProps) {
  return MediaGrid({
    _key: 'stories-grid',
    sectionTitle,
    items: stories,
    backgroundColor: '#ECEAE7',
    columns: 5,
    variant: 'stories',
  })
}

export function MediaGrid({
  sectionTitle,
  items,
  backgroundColor = '#ECEAE7',
  columns = 5,
  variant = 'stories',
}: MediaGridProps) {
  const displayItems =
    items?.length > 0
      ? items
      : Array(4).fill({
        _key: 'placeholder',
        title: 'Lorem Ipsum',
        subtitle: 'Subtitle',
        imagePath: variant === 'stories' ? '/jambmostprizedpossion.jpg' : '/chair.png',
      })

  const gridColsClass = getGridColsClass(columns)

  return (
    <Section
      backgroundColor={backgroundColor}
      padding="none"
      className="pt-8 md:pt-20 pb-20 md:pb-28"
      aria-label={sectionTitle || 'Media grid'}
    >
      <Container maxWidth="default">
        {sectionTitle && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATIONS.medium, ease: EASINGS.elegant }}
            className="font-primary text-[21px] text-center mb-20 md:mb-24 text-black font-[550] leading-[18px]"

          >
            {sectionTitle}
          </motion.h3>
        )}

        <div
          className={`grid ${gridColsClass} gap-x-8 md:gap-x-12 gap-y-16 mt-8`}
          role="list"
          aria-label={variant === 'stories' ? 'Stories' : 'Products'}
        >
          {displayItems.map((item, index) => {
            const aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' =
              item.aspectRatio || (variant === 'products' ? 'portrait' : 'portrait')
            const aspectRatioClass = getAspectRatioClass(aspectRatio)
            const { width, height } = getImageDimensions(aspectRatio)

            const imageUrl = item.imagePath
              ? item.imagePath
              : item.image && 'src' in item.image
                ? item.image.src // StaticImageData
                : item.image?.asset
                  ? urlFor(item.image.asset)
                    .width(width)
                    .height(variant === 'stories' ? 500 : height)
                    .quality(85)
                    .url()
                  : variant === 'stories'
                    ? '/jambmostprizedpossion.jpg'
                    : '/chair.png'

            const imageContent = (
              <>
                <ResponsiveImage
                  src={imageUrl}
                  alt={(item.image && 'alt' in item.image ? item.image.alt : null) || item.image?.alt || item.title}
                  fill
                  aspectRatio={aspectRatioClass}
                  className={
                    item.href
                      ? 'transition-transform duration-1000 group-hover:scale-105'
                      : 'transition-transform duration-1000'
                  }
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="text-center space-y-1 mt-5">
                  <h4
                    className={`font-primary text-[15px] font-medium text-black ${item.href ? 'group-hover:text-foreground transition-colors duration-300' : ''}`}
                  >
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="font-primary text-[13px] text-[#9C9C9D]">{item.subtitle}</p>
                  )}
                </div>
              </>
            )

            return (
              <motion.div
                key={`${item._key}-${index}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: DURATIONS.medium,
                  delay: getStaggerDelay(index, 0.1),
                  ease: EASINGS.refined,
                }}
                role="listitem"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group block"
                    aria-label={getAriaLabel(item.title, item.subtitle)}
                  >
                    {imageContent}
                  </Link>
                ) : (
                  <div className="group block">{imageContent}</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section >
  )
}
