'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { urlFor, type SanityImageSource } from '@/sanity/lib/image'

interface Story {
  _key: string
  title: string
  subtitle?: string
  href?: string
  image?: {
    asset?: SanityImageSource
    alt?: string
  }
  imagePath?: string
}

interface StoriesGridProps {
  _key: string
  sectionTitle?: string
  stories: Story[]
}

export function StoriesGrid({ sectionTitle = 'See more of our latest stories', stories }: StoriesGridProps) {
  // Use local image if provided, otherwise fallback
  const displayStories = stories?.length > 0 ? stories : Array(4).fill({
    _key: 'placeholder',
    title: 'Lorem Ipsum',
    subtitle: 'Subtitle',
    imagePath: '/jambmostprizedpossion.jpg'
  });

  return (
    <section className="bg-[#ECEAE7] py-20 md:py-28">
      <div className="container-jamb px-4 max-w-[1400px] mx-auto">
        {sectionTitle && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-primary text-[24px] md:text-[28px] text-center mb-16 md:mb-20 tracking-tight text-[#1a1a1a]"
          >
            {sectionTitle}
          </motion.h3>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 md:gap-x-12 gap-y-16">
          {displayStories.map((story, index) => {
            const imageUrl = story.imagePath
              ? story.imagePath
              : story.image?.asset
                ? urlFor(story.image.asset).width(400).height(500).quality(85).url()
                : '/jambmostprizedpossion.jpg'

            return (
              <motion.div
                key={`${story._key}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={story.href || '#'} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    <Image
                      src={imageUrl}
                      alt={story.image?.alt || story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-primary text-[15px] font-medium text-foreground">
                      {story.title}
                    </h4>
                    {story.subtitle && (
                      <p className="font-primary text-[13px] text-[#9C9C9D]">
                        {story.subtitle}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
