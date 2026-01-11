'use client'

import Image from 'next/image'
import {motion, AnimatePresence} from 'motion/react'
import type {SanityImageSource} from '@/sanity/lib/image'
import {urlFor} from '@/sanity/lib/image'
import {useImageLoad, usePrefersReducedMotion, getHeroAnimation} from '@/utils'
import {ImagePlaceholder} from '@/components/ui'

interface HeroSectionProps {
  _key: string
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: {x: number; y: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  }
  imagePath?: string
}

export function HeroSection({image, imagePath}: HeroSectionProps) {
  const imageUrl = imagePath
    ? imagePath
    : image?.asset
      ? urlFor(image.asset).width(1920).height(800).quality(90).url()
      : '/homepageImage1.png'

  const {isLoaded, hasError, handleLoad, handleError} = useImageLoad()
  const prefersReducedMotion = usePrefersReducedMotion()

  const objectPosition = image?.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : 'center'

  const heroAnimation = getHeroAnimation()
  const animationProps = prefersReducedMotion
    ? {opacity: isLoaded ? 1 : 0}
    : {
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 1.12,
      }

  const transition = prefersReducedMotion ? {duration: 0.3} : heroAnimation.transition

  return (
    <section
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-background"
      role="region"
      aria-label="Hero section"
    >
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="absolute inset-0 bg-[#f5f3f0]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3f0] via-[#eceae7] to-[#f5f3f0]" />
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError ? (
        <motion.div
          initial={heroAnimation.initial}
          animate={{
            ...heroAnimation.animate,
            ...animationProps,
          }}
          transition={transition}
          className="relative w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={image?.alt || 'Jamb hero image'}
            fill
            priority
            loading="eager"
            sizes="100vw"
            onLoad={handleLoad}
            onError={handleError}
            className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{objectPosition}}
            data-testid="hero-image"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImagePlaceholder
            alt={image?.alt || 'Jamb hero image'}
            aspectRatio="h-full w-full"
            className="shadow-sm"
          />
        </div>
      )}
    </section>
  )
}
