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
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="py-20 md:py-32">
      <div className="container-jamb">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`flex flex-col items-center text-center space-y-10 ${!isImageRight ? 'lg:order-2' : ''}`}
          >
            <div className="space-y-10 max-w-[499px] min-h-[74px] flex flex-col justify-center">
              <h2 className="font-primary text-[34px] leading-[48px] font-[550] tracking-tight text-foreground">
                {title}
              </h2>
              {description && (
                <p className="text-[16px] leading-[25px] font-primary font-[550] text-[#1a1a1a] opacity-90 mt-6">
                  {description}
                </p>
              )}
            </div>
            <div className="flex pt-4">
              {refineLabel && (
                <Link
                  href={ctaHref}
                  className="btn-outline min-w-[240px]"
                  style={{ border: '1px solid #737373' }}
                >
                  {refineLabel}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`relative aspect-3/4 overflow-hidden shadow-sm ${!isImageRight ? 'lg:order-1' : ''}`}
          >
            <Image
              src={imageUrl}
              alt={image?.alt || title}
              fill
              priority={title === 'Fireplaces'}
              className="object-cover transition-transform duration-1000 hover:scale-105"
              style={{
                objectPosition: image?.hotspot
                  ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                  : 'center',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
