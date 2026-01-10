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
}

interface StoriesGridProps {
  _key: string
  sectionTitle?: string
  stories: Story[]
}

// Story placeholder images
const STORY_PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
]

export function StoriesGrid({ sectionTitle, stories }: StoriesGridProps) {
  return (
    <section className="container-jamb py-12 md:py-20">
      {sectionTitle && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-lg md:text-xl italic text-center mb-10 md:mb-14"
        >
          {sectionTitle}
        </motion.h3>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {stories.map((story, index) => {
          const placeholderUrl = STORY_PLACEHOLDERS[index % STORY_PLACEHOLDERS.length]
          const imageUrl = story.image?.asset
            ? urlFor(story.image.asset).width(300).height(400).quality(85).url()
            : placeholderUrl

          return (
            <motion.div
              key={story._key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={story.href || '#'} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-3">
                  <Image
                    src={imageUrl}
                    alt={story.image?.alt || story.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-xs md:text-sm italic">
                    {story.title}
                  </h4>
                  {story.subtitle && (
                    <p className="text-[10px] md:text-xs text-muted mt-1">
                      {story.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
