import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from './client'

const builder = createImageUrlBuilder({ projectId, dataset })

// Generic type for Sanity image source
export type SanityImageSource = {
  _type?: string
  asset?: {
    _ref?: string
    _id?: string
    url?: string
  }
  hotspot?: {
    x: number
    y: number
    width?: number
    height?: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

export function urlFor(source: SanityImageSource | { _ref: string } | string) {
  return builder.image(source)
}
