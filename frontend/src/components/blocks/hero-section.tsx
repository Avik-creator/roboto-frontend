'use client'

import Image from 'next/image'
import {motion, AnimatePresence} from 'motion/react'
import type {SanityImageSource} from '@/sanity/lib/image'
import {urlFor} from '@/sanity/lib/image'
import {useState, useCallback, useEffect} from 'react'

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

  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  const objectPosition = image?.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : 'center'

  const animationProps = prefersReducedMotion
    ? {opacity: isLoaded ? 1 : 0}
    : {
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 1.05,
      }

  const transition = prefersReducedMotion
    ? {duration: 0.3}
    : {duration: 1.2, ease: [0.22, 1, 0.36, 1] as const}

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
            transition={{duration: 0.2}}
            className="absolute inset-0 bg-[#f5f3f0]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3f0] via-[#eceae7] to-[#f5f3f0]" />
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError ? (
        <motion.div
          initial={false}
          animate={animationProps}
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
            className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{objectPosition}}
            data-testid="hero-image"
          />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0 bg-[#f5f3f0] flex items-center justify-center"
          role="img"
          aria-label="Hero image unavailable"
        >
          <div className="text-center space-y-2">
            <svg
              className="w-12 h-12 mx-auto text-muted/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 21-3.5-3.5" />
            </svg>
            <p className="text-sm font-primary text-muted">Image unavailable</p>
          </div>
        </div>
      )}
    </section>
  )
}
