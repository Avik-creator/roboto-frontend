'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface FullWidthFeatureProps {
  _key: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: { x: number; y: number }
  }
  imagePath?: string
  contentPosition?: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

export function FullWidthFeature({
  title,
  description,
  ctaLabel,
  ctaHref = '#',
  backgroundImage,
  imagePath,
  contentPosition = 'left',
}: FullWidthFeatureProps) {
  const imageUrl = imagePath
    ? imagePath
    : backgroundImage?.asset
      ? urlFor(backgroundImage.asset).width(1200).height(1600).quality(90).url()
      : '/furniture.png'

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="bg-[#f5f3f0] py-20 md:py-32 overflow-hidden">
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="max-w-[499px] flex flex-col items-center text-center">
              <h2 className="text-heading">
                {title}
              </h2>
              {description && (
                <p className="text-paragraph mt-6 text-black/90">
                  {description}
                </p>
              )}
            </div>

            {ctaLabel && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-outline px-10 py-3"
              >
                {ctaLabel}
              </motion.button>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-3/4 overflow-hidden shadow-sm"
          >
            <Image
              src={imageUrl}
              alt={backgroundImage?.alt || title}
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              style={{
                objectPosition: backgroundImage?.hotspot
                  ? `${backgroundImage.hotspot.x * 100}% ${backgroundImage.hotspot.y * 100}%`
                  : 'center',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
