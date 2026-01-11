'use client'

import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'motion/react'
import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import {useState, useCallback} from 'react'

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
    hotspot?: {x: number; y: number}
  }
  imagePath?: string
  imagePosition?: 'left' | 'right'
}

function FeatureImage({
  src,
  alt,
  fill,
  priority,
  objectPosition,
  aspectRatio = 'aspect-3/4',
}: {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  objectPosition?: string
  aspectRatio?: string
}) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  if (hasError) {
    return (
      <div
        className={`relative ${aspectRatio} overflow-hidden bg-[#f5f3f0] shadow-sm flex items-center justify-center`}
        role="img"
        aria-label={`${alt} - image unavailable`}
      >
        <svg
          className="w-16 h-16 text-muted/40"
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
      </div>
    )
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.98}}
      whileInView={{opacity: 1, scale: 1}}
      viewport={{once: true}}
      transition={{duration: 1, ease: 'easeOut'}}
      className={`relative ${aspectRatio} overflow-hidden shadow-sm`}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 1024px) 100vw, 50vw"
        onLoad={handleLoad}
        onError={handleError}
        className={`object-cover transition-all duration-1000 hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={fill ? {objectPosition} : undefined}
      />
    </motion.div>
  )
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
    <section
      id={title.toLowerCase().replace(/\s+/g, '-')}
      className="py-20 md:py-32"
      aria-labelledby={`feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="container-jamb">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8, ease: 'easeOut'}}
            className={`flex flex-col items-center text-center space-y-10 ${!isImageRight ? 'lg:order-2' : ''}`}
          >
            <div className="space-y-10 max-w-[499px] min-h-[74px] flex flex-col justify-center">
              <h2
                id={`feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-heading"
              >
                {title}
              </h2>
              {description && <p className="text-paragraph mt-6">{description}</p>}
            </div>
            <div className="flex pt-4">
              {refineLabel && (
                <Link
                  href={ctaHref}
                  className="btn-outline min-w-[240px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  style={{border: '1px solid #737373'}}
                  aria-label={`${refineLabel} - opens in new tab`}
                >
                  {refineLabel}
                </Link>
              )}
            </div>
          </motion.div>

          <FeatureImage
            src={imageUrl}
            alt={image?.alt || title}
            fill
            priority={title === 'Fireplaces'}
            objectPosition={
              image?.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
            }
          />
        </div>
      </div>
    </section>
  )
}
