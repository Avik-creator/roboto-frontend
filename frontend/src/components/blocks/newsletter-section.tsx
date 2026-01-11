'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import {
  DURATIONS,
  EASINGS,
  getTextRevealAnimation,
  getButtonAnimation,
  useImageLoad,
} from '@/utils'

interface NewsletterSectionProps {
  _key: string
  title?: string
  description?: string
}

function NewsletterImage({ src, alt }: { src: string; alt: string }) {
  const { hasError, isLoaded, handleError, handleLoad } = useImageLoad()

  if (hasError) {
    return (
      <div
        className="w-full max-w-[500px] aspect-[4/5] bg-[#f5f3f0] shadow-sm flex items-center justify-center p-4 md:p-8"
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: DURATIONS.slow, delay: 0.2, ease: EASINGS.elegant }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="relative w-full max-w-[500px] aspect-[4/5] bg-white shadow-sm p-4 md:p-8">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onLoad={handleLoad}
            onError={handleError}
            className={`object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function NewsletterSection({
  title = 'Subscribe to the Jamb Journal',
  description = 'Lorem ipsum dolor sit amet, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
}: NewsletterSectionProps) {
  return (
    <section
      className="bg-[#f5f3f0] py-20 md:py-32 overflow-hidden"
      role="region"
      aria-labelledby="newsletter-title"
    >
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            {...getTextRevealAnimation(0)}
            className="flex flex-col items-center text-center space-y-10"
          >
            <h2
              id="newsletter-title"
              className="text-heading leading-tight"
            >
              {title}
            </h2>

            <p className="text-paragraph leading-relaxed mt-6">
              {description}
            </p>

            <motion.button
              {...getButtonAnimation()}
              className="
      btn-outline
      mt-4
      px-12 py-4
      text-base
      tracking-wide
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-accent
      focus-visible:ring-offset-2
      rounded-sm
    "
              aria-label="Discover more"
            >
              Discover more
            </motion.button>
          </motion.div>


          <NewsletterImage src="/jambjournal.png" alt="Jamb Journal" />
        </div>
      </div>
    </section>
  )
}
