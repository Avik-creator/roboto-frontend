'use client'

import Image from 'next/image'
import {motion} from 'motion/react'
import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import {useState, useCallback} from 'react'
import {DURATIONS, EASINGS} from '@/utils'

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
    hotspot?: {x: number; y: number}
  }
}

const COLLECTION_PLACEHOLDER =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop'

function CollectionImage({
  src,
  alt,
  fill,
  objectPosition,
}: {
  src: string
  alt: string
  fill?: boolean
  objectPosition?: string
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
        className="relative aspect-[4/3] overflow-hidden bg-[#f5f3f0] flex items-center justify-center"
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
      initial={{opacity: 0, x: 40}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}
      transition={{duration: DURATIONS.slow, delay: 0.2, ease: EASINGS.elegant}}
      className="relative aspect-[4/3] overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        onLoad={handleLoad}
        onError={handleError}
        className={`object-cover transition-transform duration-1200 hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={fill ? {objectPosition} : undefined}
      />
    </motion.div>
  )
}

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
    <section
      className="bg-white py-16 md:py-24"
      role="region"
      aria-labelledby="grand-collection-title"
    >
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{opacity: 0, x: -40}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: DURATIONS.slow, ease: EASINGS.elegant}}
            className="space-y-12"
          >
            {eyebrow && (
              <span className="text-xs font-primary uppercase tracking-widest text-muted">
                {eyebrow}
              </span>
            )}

            <h2 id="grand-collection-title" className="text-heading italic tracking-tight">
              {title}
            </h2>
            {description && (
              <div className="flex justify-center lg:justify-start">
                <p className="text-paragraph mt-6 max-w-[450px]">{description}</p>
              </div>
            )}
            {ctaLabel && (
              <div className="flex justify-center lg:justify-start mt-6">
                <button
                  className="btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  aria-label={`${ctaLabel} - opens in new tab`}
                >
                  {ctaLabel}
                </button>
              </div>
            )}
          </motion.div>

          <CollectionImage
            src={imageUrl}
            alt={image?.alt || title}
            fill
            objectPosition={
              image?.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
            }
          />
        </div>
      </div>
    </section>
  )
}
