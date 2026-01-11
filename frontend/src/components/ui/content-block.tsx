'use client'

import {motion} from 'motion/react'
import {getTextRevealAnimation} from '@/utils'
import {Button} from './button'

interface ContentBlockProps {
  eyebrow?: string
  title: string
  titleId?: string
  description?: string
  primaryButton?: {
    label: string
    href: string
    onClick?: () => void
  }
  secondaryButton?: {
    label: string
    href: string
    onClick?: () => void
  }
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: string
  className?: string
  animate?: boolean
  animationDelay?: number
}

export function ContentBlock({
  eyebrow,
  title,
  titleId,
  description,
  primaryButton,
  secondaryButton,
  alignment = 'center',
  maxWidth = 'max-w-[520px]',
  className = '',
  animate = true,
  animationDelay = 0,
}: ContentBlockProps) {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  const content = (
    <div className={`flex flex-col ${alignmentClasses[alignment]} space-y-10 ${className}`}>
      {eyebrow && <span className="text-xs tracking-[0.2em] uppercase text-muted">{eyebrow}</span>}

      <div className={`space-y-6 ${maxWidth}`}>
        <h2 id={titleId} className="text-heading">
          {title}
        </h2>
        {description && <p className="text-paragraph mt-6">{description}</p>}
      </div>

      {(primaryButton || secondaryButton) && (
        <div className="flex flex-col gap-6 pt-6 items-center">
          {primaryButton && (
            <Button
              variant="outline"
              size="md"
              href={primaryButton.href}
              aria-label={primaryButton.label}
            >
              {primaryButton.label}
            </Button>
          )}

          {secondaryButton && (
            <Button
              variant="outline"
              size="md"
              href={secondaryButton.href}
              aria-label={secondaryButton.label}
            >
              {secondaryButton.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )

  if (animate) {
    return <motion.div {...getTextRevealAnimation(animationDelay)}>{content}</motion.div>
  }

  return content
}
