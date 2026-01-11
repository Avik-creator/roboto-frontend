'use client'

import Link from 'next/link'
import {motion, type HTMLMotionProps} from 'motion/react'
import {getButtonAnimation} from '@/utils'

type ButtonVariant = 'outline' | 'solid' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  'aria-label'?: string
}

interface ButtonAsButton
  extends BaseButtonProps, Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps> {
  href?: never
}

interface ButtonAsLink extends BaseButtonProps {
  href: string
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-12 py-4 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
  outline: 'btn-outline',
  solid: 'bg-foreground text-background hover:bg-foreground/90',
  ghost: 'hover:bg-foreground/5',
}

export function Button({
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const baseClasses = `
    tracking-wide
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-accent
    focus-visible:ring-offset-2
    rounded-sm
    transition-colors
    duration-300
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={baseClasses}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  return (
    <motion.button
      {...getButtonAnimation()}
      {...(props as HTMLMotionProps<'button'>)}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
