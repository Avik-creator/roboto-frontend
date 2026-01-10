'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

interface NewsletterSectionProps {
  _key: string
  title?: string
  description?: string
}

export function NewsletterSection({
  title = 'Subscribe to the Jamb Journal',
  description = 'Lorem ipsum dolor sit amet, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
}: NewsletterSectionProps) {
  return (
    <section className="bg-[#f5f3f0] py-20 md:py-32 overflow-hidden">
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <h2 className="font-primary text-4xl md:text-[42px] leading-[1.2] text-foreground max-w-md">
              {title}
            </h2>
            <p className="text-paragraph text-muted leading-relaxed max-w-md text-[16px]">
              {description}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-3 border border-[#737373] text-[16px] font-primary hover:bg-foreground hover:text-white transition-all duration-300"
            >
              Discover more
            </motion.button>
          </motion.div>

          {/* Right Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] bg-white shadow-sm p-4 md:p-8">
              <div className="relative w-full h-full">
                <Image
                  src="/jambjournal.png"
                  alt="Jamb Journal"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}