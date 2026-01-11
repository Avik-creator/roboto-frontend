'use client'

import Image from 'next/image'
import Link from 'next/link'
import {motion, AnimatePresence} from 'motion/react'
import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import {
  getImageRevealAnimation,
  getTextRevealAnimation,
  useCarousel,
  getCarouselVariants,
  useImageLoad,
  getSectionId,
} from '@/utils'

interface FeatureImageItem {
  src: string
  alt: string
  hotspot?: {x: number; y: number}
}

interface FeatureSectionProps {
  _key: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  refineLabel?: string
  secondaryButton?: {
    label: string
    href: string
  }
  images?: FeatureImageItem[]
  image?: {
    asset?: SanityImageSource
    alt?: string
    hotspot?: {x: number; y: number}
  }
  imagePath?: string
  imagePosition?: 'left' | 'right'
  autoPlay?: boolean
  interval?: number
}

function FeatureImageCarousel({
  images,
  autoPlay = true,
  interval = 5000,
}: {
  images: FeatureImageItem[]
  autoPlay?: boolean
  interval?: number
}) {
  const {currentIndex, direction, goTo, next, prev} = useCarousel(
    images.length,
    autoPlay,
    interval,
  )

  if (images.length === 0) return null

  if (images.length === 1) {
    const image = images[0]
    return (
      <motion.div
        {...getImageRevealAnimation()}
        className="relative aspect-3/4 overflow-hidden shadow-sm"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-1200 hover:scale-105"
          style={{
            objectPosition: image.hotspot
              ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
              : 'center',
          }}
        />
      </motion.div>
    )
  }

  const variants = getCarouselVariants()

  return (
    <div className="relative aspect-3/4 overflow-hidden shadow-sm group">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const}}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1200 group-hover:scale-105"
            style={{
              objectPosition: images[currentIndex].hotspot
                ? `${images[currentIndex].hotspot.x * 100}% ${images[currentIndex].hotspot.y * 100}%`
                : 'center',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
        aria-label="Previous image"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
        aria-label="Next image"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
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
  const {hasError, isLoaded, handleError, handleLoad} = useImageLoad()

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
      {...getImageRevealAnimation()}
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
        className={`object-cover transition-all duration-1200 hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
  secondaryButton,
  images,
  image,
  imagePath,
  imagePosition = 'right',
  autoPlay = false,
  interval = 5000,
}: FeatureSectionProps) {
  const singleImageUrl = imagePath
    ? imagePath
    : image?.asset
      ? urlFor(image.asset).width(800).height(600).quality(85).url()
      : '/images/placeholder.jpg'

  const carouselImages = images || [
    {
      src: singleImageUrl,
      alt: image?.alt || title,
      hotspot: image?.hotspot,
    },
  ]

  const isImageRight = imagePosition === 'right'
  const sectionId = getSectionId(title)

  return (
    <section
      id={sectionId}
      className="py-20 md:py-32"
      aria-labelledby={`feature-title-${sectionId}`}
    >
      <div className="container-jamb">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
          <motion.div
            {...getTextRevealAnimation(0)}
            className={`flex flex-col items-center text-center space-y-10 ${!isImageRight ? 'lg:order-2' : ''}`}
          >
            <div className="space-y-10 max-w-[499px] min-h-[74px] flex flex-col justify-center">
              <h2 id={`feature-title-${sectionId}`} className="text-heading">
                {title}
              </h2>
              {description && <p className="text-paragraph mt-6">{description}</p>}
            </div>
            <div className="flex flex-col gap-4 pt-4">
              {refineLabel && (
                <Link
                  href={ctaHref}
                  className="btn-outline min-w-[200px] text-sm px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  aria-label={`${refineLabel}`}
                >
                  {refineLabel}
                </Link>
              )}
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="btn-outline min-w-[200px] text-base px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  aria-label={`${secondaryButton.label}`}
                >
                  {secondaryButton.label}
                </Link>
              )}
            </div>
          </motion.div>

          {carouselImages.length > 1 ? (
            <FeatureImageCarousel images={carouselImages} autoPlay={autoPlay} interval={interval} />
          ) : (
            <FeatureImage
              src={singleImageUrl}
              alt={image?.alt || title}
              fill
              priority={title === 'Fireplaces'}
              objectPosition={
                image?.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}
