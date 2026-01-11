'use client'

import Image from 'next/image'
import {motion, AnimatePresence} from 'motion/react'
import type {SanityImageSource} from '@/sanity/lib/image'
import {urlFor} from '@/sanity/lib/image'
import {useState} from 'react'

interface HeroSectionProps {
  _key: string
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: {x: number; y: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  }
  imagePath?: string // For local images in /public
}

export function HeroSection({image, imagePath}: HeroSectionProps) {
  const imageUrl = imagePath
    ? imagePath
    : image?.asset
      ? urlFor(image.asset).width(1920).height(800).quality(90).url()
      : '/homepageImage1.png'

  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="absolute inset-0 bg-[#f5f3f0]"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{opacity: 0, scale: 1.05}}
        animate={{opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05}}
        transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
        className="relative w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={image?.alt || 'Jamb hero image'}
          fill
          priority
          loading="eager"
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
