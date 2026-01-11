'use client'

import Link from 'next/link'
import {motion, type HTMLMotionProps} from 'motion/react'
import {getButtonAnimation} from '@/utils'
import {useState, useCallback} from 'react'

type ButtonVariant = 'outline' | 'solid' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  'aria-label'?: string
  magnetic?: boolean
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
  magnetic = false,
  ...props
}: ButtonProps) {
  const [magneticPos, setMagneticPos] = useState({x: 0, y: 0})

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!magnetic) return

      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * 0.25
      const deltaY = (e.clientY - centerY) * 0.25

      setMagneticPos({x: deltaX, y: deltaY})
    },
    [magnetic],
  )

  const handleMouseLeave = useCallback(() => {
    setMagneticPos({x: 0, y: 0})
  }, [])

  const baseClasses = `
    tracking-wide
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-accent
    focus-visible:ring-offset-2
    rounded-sm
    transition-all
    duration-[600ms]
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  const magneticStyle = magnetic
    ? {
        transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`,
      }
    : undefined

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={baseClasses}
        aria-label={ariaLabel}
        style={magneticStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
      style={magneticStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  )
}
