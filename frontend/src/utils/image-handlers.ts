'use client'

import {useState, useCallback} from 'react'

export interface ImageState {
  isLoaded: boolean
  hasError: boolean
}

export function useImageLoad() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  const reset = useCallback(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [])

  return {isLoaded, hasError, handleLoad, handleError, reset}
}

export function getImageUrl(
  imagePath?: string,
  sanityUrl?: string,
  fallback: string = '/images/placeholder.jpg',
): string {
  return imagePath || sanityUrl || fallback
}

export function getObjectPosition(hotspot?: {x: number; y: number}): string {
  if (!hotspot) return 'center'
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`
}

export function getImageDimensions(
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall',
): {width: number; height: number} {
  const dimensions = {
    square: {width: 400, height: 400},
    portrait: {width: 400, height: 500},
    landscape: {width: 400, height: 320},
    tall: {width: 400, height: 667},
  }
  return dimensions[aspectRatio] || dimensions.square
}

export function getAspectRatioClass(
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall',
): string {
  const classes = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]',
    tall: 'aspect-[3/5]',
  }
  return classes[aspectRatio] || classes.square
}
