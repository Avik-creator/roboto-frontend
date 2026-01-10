'use client'

import {
  HeroSection,
  CategoryNavigation,
  FeatureSection,
  ProductGrid,
  FullWidthFeature,
  GrandCollection,
  StoriesGrid,
  NewsletterSection,
} from './blocks'
import type { SanityImageSource } from '../sanity/lib/image'

// Shared Image Type for Sanity
interface SanityImage {
  asset?: SanityImageSource
  alt?: string
  hotspot?: { x: number; y: number }
}

// Type definitions for page builder blocks
interface BaseBlock {
  _key: string
  _type: string
}

interface HeroBlock extends BaseBlock {
  _type: 'heroSection'
  image?: SanityImage
  imagePath?: string
}

interface CategoryNavBlock extends BaseBlock {
  _type: 'categoryNavigation'
  categories?: Array<{
    _key: string
    label: string
    href: string
  }>
}

interface FeatureBlock extends BaseBlock {
  _type: 'featureSection'
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  refineLabel?: string
  image?: SanityImage
  imagePath?: string
  imagePosition?: 'left' | 'right'
}

interface ProductGridBlock extends BaseBlock {
  _type: 'productGrid'
  sectionTitle?: string
  products: Array<{
    _key: string
    title: string
    subtitle?: string
    href?: string
    image?: SanityImage
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'tall'
  }>
  columns?: 3 | 4 | 5 | 6
  variant?: 'default' | 'mixed-aspect'
}

interface FullWidthFeatureBlock extends BaseBlock {
  _type: 'fullWidthFeature'
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: SanityImage
  contentPosition?: 'left' | 'center' | 'right'
  overlayOpacity?: number
}

interface GrandCollectionBlock extends BaseBlock {
  _type: 'grandCollection'
  eyebrow?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: SanityImage
}

interface StoriesGridBlock extends BaseBlock {
  _type: 'storiesGrid'
  sectionTitle?: string
  stories: Array<{
    _key: string
    title: string
    subtitle?: string
    href?: string
    image?: SanityImage
    imagePath?: string
  }>
}

interface NewsletterBlock extends BaseBlock {
  _type: 'newsletterSection'
  title?: string
  description?: string
}

type PageBuilderBlock =
  | HeroBlock
  | CategoryNavBlock
  | FeatureBlock
  | ProductGridBlock
  | FullWidthFeatureBlock
  | GrandCollectionBlock
  | StoriesGridBlock
  | NewsletterBlock

interface PageBuilderProps {
  content: PageBuilderBlock[]
}

export function PageBuilder({ content }: PageBuilderProps) {
  if (!content || !Array.isArray(content)) return null

  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case 'heroSection':
            return <HeroSection key={block._key} {...block} />
          case 'categoryNavigation':
            return <CategoryNavigation key={block._key} {...block} />
          case 'featureSection':
            return <FeatureSection key={block._key} {...block} />
          case 'productGrid':
            return <ProductGrid key={block._key} {...block} />
          case 'fullWidthFeature':
            return <FullWidthFeature key={block._key} {...block} />
          case 'grandCollection':
            return <GrandCollection key={block._key} {...block} />
          case 'storiesGrid':
            return <StoriesGrid key={block._key} {...block} />
          case 'newsletterSection':
            return <NewsletterSection key={block._key} {...block} />
          default:
            const unknownBlock = block as BaseBlock
            console.warn(`Unknown block type: ${unknownBlock._type}`)
            return (
              <div key={unknownBlock._key} className="p-4 bg-red-100 text-red-600">
                Unknown block type: {unknownBlock._type}
              </div>
            )
        }
      })}
    </main>
  )
}
