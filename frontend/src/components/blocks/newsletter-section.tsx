'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

interface NewsletterSectionProps {
  _key: string
  title?: string
  description?: string
}

export function NewsletterSection({
  title = 'Subscribe to the Jamb Journal',
  description = 'Lorem ipsum dolor sit amet, eu labore vulputate at labore in dolore consequatur adipiscing erat, aute do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sunt labore et dolore magna aliqua vel ipsum.',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-jamb">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-primary text-2xl md:text-3xl lg:text-[34px] leading-[48px] tracking-tight text-left">
              {title}
            </h2>
            <p className="text-paragraph text-muted leading-relaxed max-w-md">
              {description}
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full max-w-sm px-4 py-3 bg-white border border-border text-paragraph focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  required
                  className="mt-1 w-4 h-4 border-border"
                />
                <label htmlFor="newsletter-consent" className="text-xs text-muted">
                  I agree to receive marketing emails and accept the privacy policy.
                </label>
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="btn-outline disabled:opacity-50"
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="font-primary text-6xl md:text-7xl lg:text-8xl tracking-tight">
              JAMB
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
