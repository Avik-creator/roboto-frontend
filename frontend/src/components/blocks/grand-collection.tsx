'use client'

import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import type { StaticImageData } from 'next/image'
import {DURATIONS, EASINGS, getObjectPosition} from '@/utils'
import {ResponsiveImage, Section, Container, ContentBlock} from '@/components/ui'

// Union type for images that can be either StaticImageData or SanityImage
type ImageSource = StaticImageData | {
  asset?: SanityImageSource
  alt?: string
  hotspot?: {x: number; y: number}
}

interface GrandCollectionProps {
  _key: string
  eyebrow?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: ImageSource
}

const COLLECTION_PLACEHOLDER =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop'

export function GrandCollection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = '#',
  image,
}: GrandCollectionProps) {
  const imageUrl = image && 'src' in image
    ? image.src // StaticImageData
    : image?.asset
      ? urlFor(image.asset).width(900).height(700).quality(90).url()
      : COLLECTION_PLACEHOLDER

  return (
    <Section backgroundColor="white" padding="md" aria-labelledby="grand-collection-title">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <ContentBlock
            eyebrow={eyebrow}
            title={title}
            titleId="grand-collection-title"
            description={description}
            primaryButton={ctaLabel ? {label: ctaLabel, href: ctaHref} : undefined}
            alignment="center"
            maxWidth="max-w-[700px]"
          />

          <ResponsiveImage
            src={imageUrl}
            alt={(image && 'alt' in image ? image.alt : null) || image?.alt || title}
            fill
            aspectRatio="aspect-[4/3]"
            className="transition-transform duration-1200 hover:scale-105"
            objectPosition={getObjectPosition(image?.hotspot)}
            sizes="(max-width: 1024px) 100vw, 50vw"
            animate
            animationConfig={{
              initial: {opacity: 0, x: 40},
              animate: {opacity: 1, x: 0},
              transition: {duration: DURATIONS.slow, delay: 0.2, ease: EASINGS.elegant},
            }}
          />
        </div>
      </Container>
    </Section>
  )
}
