'use client'

import { motion, AnimatePresence } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'
import type { StaticImageData } from 'next/image'
import {
  getImageRevealAnimation,
  useCarousel,
  getCarouselVariants,
  getSectionId,
} from '@/utils'
import { ResponsiveImage, ImagePlaceholder, Section, Container, ContentBlock } from '@/components/ui'

interface FeatureImageItem {
  src: string
  alt: string
  hotspot?: { x: number; y: number }
}

// Union type for images that can be either StaticImageData or SanityImage
type ImageSource = StaticImageData | {
  asset?: SanityImageSource
  alt?: string
  hotspot?: { x: number; y: number }
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
  image?: ImageSource
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
  const { currentIndex, direction, goTo, next, prev } = useCarousel(images.length, autoPlay, interval)

  if (images.length === 0) return null

  if (images.length === 1) {
    const image = images[0]
    return (
      <ResponsiveImage
        src={image.src}
        alt={image.alt}
        fill
        priority
        aspectRatio="aspect-3/4"
        className="transition-transform duration-1200 hover:scale-105 shadow-sm"
        objectPosition={
          image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
        }
        sizes="(max-width: 1024px) 100vw, 50vw"
        animate
        animationConfig={getImageRevealAnimation()}
      />
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
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="absolute inset-0"
        >
          <ResponsiveImage
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            aspectRatio="h-full w-full"
            className="transition-transform duration-1200 group-hover:scale-105"
            objectPosition={
              images[currentIndex].hotspot
                ? `${images[currentIndex].hotspot.x * 100}% ${images[currentIndex].hotspot.y * 100}%`
                : 'center'
            }
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
            className={`w-2 h-2 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
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
    : image && 'src' in image
      ? image.src // StaticImageData
      : image?.asset
        ? urlFor(image.asset).width(800).height(600).quality(85).url()
        : '/images/placeholder.jpg'

  const carouselImages = images || [
    {
      src: singleImageUrl,
      alt: (image && 'alt' in image && typeof image.alt === 'string' ? image.alt : undefined) || (image && !('src' in image) && image.alt) || title,
      hotspot: image && 'hotspot' in image ? image.hotspot : undefined,
    },
  ]

  const isImageRight = imagePosition === 'right'
  const sectionId = getSectionId(title)

  return (
    <Section id={sectionId} aria-labelledby={`feature-title-${sectionId}`}>
      <Container>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}>
          <div className={!isImageRight ? 'lg:order-2' : ''}>
            <ContentBlock
              title={title}
              titleId={`feature-title-${sectionId}`}
              description={description}
              primaryButton={refineLabel ? { label: refineLabel, href: ctaHref } : undefined}
              secondaryButton={secondaryButton}
              alignment="center"
            />
          </div>

          {carouselImages.length > 1 ? (
            <FeatureImageCarousel images={carouselImages} autoPlay={autoPlay} interval={interval} />
          ) : (
            <ResponsiveImage
              src={singleImageUrl}
              alt={(image && 'alt' in image && typeof image.alt === 'string' ? image.alt : undefined) || (image && !('src' in image) && image.alt) || title}
              fill
              priority={title === 'Fireplaces'}
              aspectRatio="aspect-3/4"
              className="shadow-sm transition-transform duration-1200 hover:scale-105"
              objectPosition={
                image && 'hotspot' in image && image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
              }
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
      </Container>
    </Section>
  )
}
