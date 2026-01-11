import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  id?: string
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

const paddingClasses = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
}

export function Section({
  children,
  className = '',
  backgroundColor = 'transparent',
  padding = 'lg',
  id,
  role = 'region',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  const bgClass = backgroundColor !== 'transparent' ? `bg-[${backgroundColor}]` : ''

  return (
    <section
      id={id}
      className={`${bgClass} ${paddingClasses[padding]} ${className}`.trim()}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  )
}
