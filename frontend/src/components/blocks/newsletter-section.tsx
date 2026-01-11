'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { DURATIONS, EASINGS, useImageLoad } from '@/utils'
import { Section, Container, ContentBlock, ImagePlaceholder } from '@/components/ui'

interface NewsletterSectionProps {
  _key: string
  title?: string
  description?: string
}

function NewsletterImage({ src, alt }: { src: string; alt: string }) {
  const { hasError, isLoaded, handleError, handleLoad } = useImageLoad()

  if (hasError) {
    return (
      <div className="w-full max-w-[500px] aspect-4/5 p-4 md:p-8">
        <ImagePlaceholder alt={alt} aspectRatio="w-full h-full" className="shadow-sm" />
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
      <div className="relative w-full max-w-[500px] aspect-4/5 bg-white shadow-sm p-4 md:p-8">
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
    <Section
      backgroundColor="#f5f3f0"
      className="overflow-hidden"
      aria-labelledby="newsletter-title"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ContentBlock
            title={title}
            titleId="newsletter-title"
            description={description}
            primaryButton={{ label: 'Discover more', href: '#' }}
            alignment="center"
          />

          <NewsletterImage src="/jambjournal.png" alt="Jamb Journal" />
        </div>
      </Container>
    </Section>
  )
}
