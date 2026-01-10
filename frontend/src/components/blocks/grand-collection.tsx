'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface GrandCollectionProps {
  _key: string
  eyebrow?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: { x: number; y: number }
  }
}

// Grand collection placeholder
const COLLECTION_PLACEHOLDER = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop'

export function GrandCollection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = '#',
  image,
}: GrandCollectionProps) {
  const imageUrl = image?.asset
    ? urlFor(image.asset).width(900).height(700).quality(90).url()
    : COLLECTION_PLACEHOLDER

  return (
    <section className="bg-charcoal text-white py-16 md:py-24">
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {eyebrow && (
              <span className="text-xs uppercase tracking-widest text-white/60">
                {eyebrow}
              </span>
            )}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md">
                {description}
              </p>
            )}
            {ctaLabel && (
              <Link
                href={ctaHref}
                className="mt-4 btn-outline border-white text-white hover:bg-white hover:text-charcoal inline-block"
              >
                {ctaLabel}
              </Link>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] overflow-hidden"
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
      </div>
    </section>
  )
}
