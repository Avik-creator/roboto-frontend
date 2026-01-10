'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface FeatureSectionProps {
  _key: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  refineLabel?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: { x: number; y: number }
  }
  imagePath?: string // For local images in /public
  imagePosition?: 'left' | 'right'
}

export function FeatureSection({
  title,
  description,
  ctaHref = '#',
  refineLabel,
  image,
  imagePath,
  imagePosition = 'right',
}: FeatureSectionProps) {
  const imageUrl = imagePath 
    ? imagePath 
    : image?.asset
    ? urlFor(image.asset).width(800).height(600).quality(85).url()
    : '/images/placeholder.jpg'

  const isImageRight = imagePosition === 'right'

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="container-jamb py-16 md:py-24">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`space-y-6 ${!isImageRight ? 'lg:order-2' : ''}`}
        >
          <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl italic tracking-tight text-left">
            {title}
          </h2>
          {description && (
            <p className="text-paragraph text-muted leading-relaxed max-w-md">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {refineLabel && (
              <Link href={ctaHref} className="btn-outline inline-block text-center">
                {refineLabel}
              </Link>
            )}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative aspect-[4/3] overflow-hidden ${!isImageRight ? 'lg:order-1' : ''}`}
        >
          <Image
            src={imageUrl}
            alt={image?.alt || title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            style={{
              objectPosition: image?.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : 'center',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
