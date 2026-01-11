'use client'

import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'motion/react'
import {urlFor, type SanityImageSource} from '@/sanity/lib/image'
import {useState, useCallback} from 'react'

interface MediaItem {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
  }
  imagePath?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'tall'
}

interface MediaGridProps {
  _key: string
  sectionTitle?: string
  items: MediaItem[]
  backgroundColor?: string
  columns?: 2 | 3 | 4 | 5 | 6
  variant?: 'stories' | 'products'
}

interface Story extends MediaItem {}
interface StoriesGridProps extends Omit<
  MediaGridProps,
  'items' | 'backgroundColor' | 'columns' | 'variant'
> {
  stories: Story[]
}

function ImageWithError({
  src,
  alt,
  fill,
  className,
  priority = false,
  objectPosition,
  aspectRatio,
}: {
  src: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  objectPosition?: string
  aspectRatio?: string
}) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  if (hasError) {
    return (
      <div
        className={`${aspectRatio || 'aspect-square'} bg-[#f5f3f0] flex items-center justify-center`}
        role="img"
        aria-label={`${alt} - image unavailable`}
      >
        <svg
          className="w-8 h-8 text-muted/40"
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
    <div className={`${aspectRatio || 'aspect-square'} relative overflow-hidden bg-[#f5f3f0]`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        onLoad={handleLoad}
        onError={handleError}
        className={`object-cover transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        style={fill ? {objectPosition} : undefined}
      />
    </div>
  )
}

export function StoriesGrid({
  sectionTitle = 'See more of our latest stories',
  stories,
}: StoriesGridProps) {
  return MediaGrid({
    _key: 'stories-grid',
    sectionTitle,
    items: stories,
    backgroundColor: '#ECEAE7',
    columns: 5,
    variant: 'stories',
  })
}

export function MediaGrid({
  sectionTitle,
  items,
  backgroundColor = '#ECEAE7',
  columns = 5,
  variant = 'stories',
}: MediaGridProps) {
  const displayItems =
    items?.length > 0
      ? items
      : Array(4).fill({
          _key: 'placeholder',
          title: 'Lorem Ipsum',
          subtitle: 'Subtitle',
          imagePath: variant === 'stories' ? '/jambmostprizedpossion.jpg' : '/chair.png',
        })

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]',
    tall: 'aspect-[3/5]',
  }

  const getImageDimensions = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'square':
        return {width: 400, height: 400}
      case 'portrait':
        return {width: 400, height: 500}
      case 'landscape':
        return {width: 400, height: 320}
      case 'tall':
        return {width: 400, height: 667}
      default:
        return {width: 400, height: 400}
    }
  }

  return (
    <section
      className={`bg-[${backgroundColor}] pt-8 md:pt-20 pb-20 md:pb-28`}
      role="region"
      aria-label={sectionTitle || 'Media grid'}
    >
      <div className="container-jamb px-4 max-w-[1400px] mx-auto">
        {sectionTitle && (
          <motion.h3
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
            className="font-primary text-[24px] md:text-[28px] text-center mb-20 md:mb-24 tracking-tight text-[#1a1a1a]"
          >
            {sectionTitle}
          </motion.h3>
        )}

        <div
          className={`grid ${gridColsClass[columns]} gap-x-8 md:gap-x-12 gap-y-16 mt-8`}
          role="list"
          aria-label={variant === 'stories' ? 'Stories' : 'Products'}
        >
          {displayItems.map((item, index) => {
            const aspectRatio: 'square' | 'portrait' | 'landscape' | 'tall' =
              item.aspectRatio || (variant === 'products' ? 'portrait' : 'portrait')
            const aspectRatioClass = aspectRatioClasses[aspectRatio]
            const {width, height} = getImageDimensions(aspectRatio)

            const imageUrl = item.imagePath
              ? item.imagePath
              : item.image?.asset
                ? urlFor(item.image.asset)
                    .width(width)
                    .height(variant === 'stories' ? 500 : height)
                    .quality(85)
                    .url()
                : variant === 'stories'
                  ? '/jambmostprizedpossion.jpg'
                  : '/chair.png'

            return (
              <motion.div
                key={`${item._key}-${index}`}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{
                  duration: 0.6,
                  delay: (index % (variant === 'stories' ? 5 : 4)) * 0.1,
                  ease: 'easeOut',
                }}
                role="listitem"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group block"
                    aria-label={`${item.title}${item.subtitle ? ` - ${item.subtitle}` : ''}`}
                  >
                    <ImageWithError
                      src={imageUrl}
                      alt={item.image?.alt || item.title}
                      fill
                      className="transition-transform duration-700 group-hover:scale-105"
                      aspectRatio={aspectRatioClass}
                    />
                    <div className="text-center space-y-1 mt-5">
                      <h4 className="font-primary text-[15px] font-medium text-black group-hover:text-foreground transition-colors">
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <p className="font-primary text-[13px] text-[#9C9C9D]">{item.subtitle}</p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="group block">
                    <ImageWithError
                      src={imageUrl}
                      alt={item.image?.alt || item.title}
                      fill
                      className="transition-transform duration-700"
                      aspectRatio={aspectRatioClass}
                    />
                    <div className="text-center space-y-1 mt-5">
                      <h4 className="font-primary text-[15px] font-medium text-black">
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <p className="font-primary text-[13px] text-[#9C9C9D]">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
