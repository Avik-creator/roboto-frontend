'use client'

import Image from 'next/image'
import {motion} from 'motion/react'
import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import {
  getImageRevealAnimation,
  getTextRevealAnimation,
  getButtonAnimation,
  useImageLoad,
  getSectionId,
  getObjectPosition,
} from '@/utils'

interface FullWidthFeatureProps {
  _key: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: {x: number; y: number}
  }
  imagePath?: string
  contentPosition?: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

function FullWidthFeatureImage({
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
  const {hasError, isLoaded, handleError, handleLoad} = useImageLoad()

  if (hasError) {
    return (
      <div
        className="relative aspect-3/4 overflow-hidden bg-[#f5f3f0] shadow-sm flex items-center justify-center"
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
      {...getImageRevealAnimation()}
      className="relative aspect-3/4 overflow-hidden shadow-sm"
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

  const sectionId = getSectionId(title)

  return (
    <section
      id={sectionId}
      className="bg-[#f5f3f0] py-20 md:py-32 overflow-hidden"
      role="region"
      aria-labelledby={`full-width-title-${sectionId}`}
    >
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            {...getTextRevealAnimation(0)}
            className={`flex flex-col items-center text-center space-y-8 ${
              contentPosition === 'right' ? 'lg:order-2' : ''
            } ${contentPosition === 'center' ? 'lg:col-span-2' : ''}`}
          >
            <div className="max-w-[499px] flex flex-col items-center text-center">
              <h2 id={`full-width-title-${sectionId}`} className="text-heading">
                {title}
              </h2>
              {description && <p className="text-paragraph mt-6 text-black/90">{description}</p>}
            </div>

            {ctaLabel && (
              <motion.button
                {...getButtonAnimation()}
                className="btn-outline px-10 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                aria-label={`${ctaLabel} - opens in new tab`}
              >
                {ctaLabel}
              </motion.button>
            )}
          </motion.div>

          {contentPosition !== 'center' && (
            <FullWidthFeatureImage
              src={imageUrl}
              alt={backgroundImage?.alt || title}
              fill
              objectPosition={getObjectPosition(backgroundImage?.hotspot)}
            />
          )}
        </div>
      </div>
    </section>
  )
}
