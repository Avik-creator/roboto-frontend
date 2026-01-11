'use client'

import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import type { StaticImageData } from 'next/image'
import {getSectionId, getObjectPosition} from '@/utils'
import {ResponsiveImage, Section, Container, ContentBlock} from '@/components/ui'

// Union type for images that can be either StaticImageData or SanityImage
type ImageSource = StaticImageData | {
  asset?: SanityImageSource
  alt?: string
  hotspot?: {x: number; y: number}
}

interface FullWidthFeatureProps {
  _key: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: ImageSource
  imagePath?: string
  contentPosition?: 'left' | 'center' | 'right'
  overlayOpacity?: number
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
    : backgroundImage && 'src' in backgroundImage
      ? backgroundImage.src // StaticImageData
      : backgroundImage?.asset
        ? urlFor(backgroundImage.asset).width(1200).height(1600).quality(90).url()
        : '/furniture.png'

  const sectionId = getSectionId(title)

  return (
    <Section
      id={sectionId}
      backgroundColor="#f5f3f0"
      aria-labelledby={`full-width-title-${sectionId}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div
            className={`${
              contentPosition === 'right' ? 'lg:order-2' : ''
            } ${contentPosition === 'center' ? 'lg:col-span-2' : ''}`}
          >
            <ContentBlock
              title={title}
              titleId={`full-width-title-${sectionId}`}
              description={description}
              primaryButton={ctaLabel ? {label: ctaLabel, href: ctaHref} : undefined}
              alignment="center"
              maxWidth="max-w-[499px]"
            />
          </div>

          {contentPosition !== 'center' && (
            <ResponsiveImage
              src={imageUrl}
              alt={(backgroundImage && 'alt' in backgroundImage && typeof backgroundImage.alt === 'string' ? backgroundImage.alt : undefined) || (backgroundImage && !('src' in backgroundImage) && backgroundImage.alt) || title}
              fill
              aspectRatio="aspect-3/4"
              className="shadow-sm transition-transform duration-1200 hover:scale-105"
              objectPosition={getObjectPosition(backgroundImage && 'hotspot' in backgroundImage ? backgroundImage.hotspot : undefined)}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
      </Container>
    </Section>
  )
}
