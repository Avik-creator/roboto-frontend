'use client'

import { MediaGrid } from './stories-grid'
import { type SanityImageSource } from '@/sanity/lib/image'
import type { StaticImageData } from 'next/image'

// Union type for images that can be either StaticImageData or SanityImage
type ImageSource = StaticImageData | {
  asset?: SanityImageSource
  alt?: string
}

interface Product {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: ImageSource
  imagePath?: string // For local images
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'tall'
}

interface ProductGridProps {
  _key: string
  sectionTitle?: string
  products: Product[]
  columns?: 3 | 4 | 5 | 6
  variant?: 'default' | 'mixed-aspect'
}

export function ProductGrid({
  sectionTitle,
  products,
  columns = 5,
  variant = 'default',
}: ProductGridProps) {
  return MediaGrid({
    _key: `product-grid-${sectionTitle?.toLowerCase().replace(/\s+/g, '-') || 'products'}`,
    sectionTitle,
    items: products,
    backgroundColor: '#E3E3E3',
    columns,
    variant: 'products'
  })
}

