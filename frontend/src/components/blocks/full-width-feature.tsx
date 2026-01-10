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
  contentPosition?: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

// Furniture section placeholder
const FURNITURE_PLACEHOLDER = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=900&fit=crop'

export function FullWidthFeature({
  title,
  description,
  ctaLabel,
  ctaHref = '#',
  backgroundImage,
  contentPosition = 'left',
  overlayOpacity = 0.2,
}: FullWidthFeatureProps) {
  const imageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage.asset).width(1920).height(900).quality(90).url()
    : FURNITURE_PLACEHOLDER

  const positionClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src={imageUrl}
          alt={backgroundImage?.alt || title}
          fill
          className="object-cover"
          style={{
            objectPosition: backgroundImage?.hotspot
              ? `${backgroundImage.hotspot.x * 100}% ${backgroundImage.hotspot.y * 100}%`
              : 'center',
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative container-jamb h-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`flex flex-col ${positionClasses[contentPosition]} max-w-xl`}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-white tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm md:text-base text-white/80 mt-4 leading-relaxed">
              {description}
            </p>
          )}
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="mt-6 btn-outline border-white text-white hover:bg-white hover:text-foreground inline-block"
            >
              {ctaLabel}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}
