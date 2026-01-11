'use client'

import Image from 'next/image'
import {motion} from 'motion/react'
import {useImageLoad} from '@/utils'

export function ImagePlaceholder({
  alt,
  aspectRatio = 'aspect-square',
  className = '',
}: {
  alt: string
  aspectRatio?: string
  className?: string
}) {
  return (
    <div
      className={`${aspectRatio} bg-[#f5f3f0] flex items-center justify-center ${className}`}
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

interface ResponsiveImageProps {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  objectPosition?: string
  aspectRatio?: string
  className?: string
  sizes?: string
  width?: number
  height?: number
  onLoad?: () => void
  onError?: () => void
  animate?: boolean
  animationConfig?: {
    initial?: Record<string, any>
    animate?: Record<string, any>
    transition?: Record<string, any>
  }
}

export function ResponsiveImage({
  src,
  alt,
  fill = true,
  priority = false,
  objectPosition = 'center',
  aspectRatio = 'aspect-square',
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  onLoad: externalOnLoad,
  onError: externalOnError,
  animate = false,
  animationConfig,
}: ResponsiveImageProps) {
  const {hasError, isLoaded, handleError, handleLoad} = useImageLoad()

  const combinedHandleLoad = () => {
    handleLoad()
    externalOnLoad?.()
  }

  const combinedHandleError = () => {
    handleError()
    externalOnError?.()
  }

  if (hasError) {
    return <ImagePlaceholder alt={alt} aspectRatio={aspectRatio} />
  }

  const imageElement = (
    <div className={`${aspectRatio} relative overflow-hidden bg-[#f5f3f0] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        onLoad={combinedHandleLoad}
        onError={combinedHandleError}
        className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={fill ? {objectPosition} : undefined}
      />
    </div>
  )

  if (animate && animationConfig) {
    return (
      <motion.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        whileInView={animationConfig.animate}
        viewport={{once: true}}
        transition={animationConfig.transition}
      >
        {imageElement}
      </motion.div>
    )
  }

  return imageElement
}
