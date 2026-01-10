'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { SanityImageSource } from '@/sanity/lib/image'
import { urlFor } from '@/sanity/lib/image'

interface HeroSectionProps {
  _key: string
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: { x: number; y: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  imagePath?: string // For local images in /public
}

export function HeroSection({ image, imagePath }: HeroSectionProps) {
  const imageUrl = imagePath
    ? imagePath
    : image?.asset
      ? urlFor(image.asset).width(1920).height(800).quality(90).url()
      : '/homepageImage1.png'

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-background">
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={image?.alt || 'Jamb hero image'}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: image?.hotspot
              ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
              : 'center',
          }}
        />
      </motion.div>
    </section>
  )
}
