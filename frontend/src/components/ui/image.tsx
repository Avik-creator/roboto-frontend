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
  enableHover?: boolean
  parallax?: boolean
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
  enableHover = true,
  parallax = false,
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
    <div className={`${aspectRatio} relative overflow-hidden bg-[#f5f3f0] ${className} group`}>
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
        className={`
          object-cover 
          transition-all 
          duration-[1200ms] 
          ease-[cubic-bezier(0.12,0.88,0.18,1)]
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${enableHover ? 'group-hover:scale-105' : ''}
          ${parallax ? 'will-change-transform' : ''}
        `}
        style={fill ? {objectPosition} : undefined}
      />
      {/* Overlay for depth on hover */}
      {enableHover && (
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
      )}
    </div>
  )

  if (animate && animationConfig) {
    return (
      <motion.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        whileInView={animationConfig.animate}
        viewport={{once: true, margin: '-80px'}}
        transition={animationConfig.transition}
      >
        {imageElement}
      </motion.div>
    )
  }

  return imageElement
}
