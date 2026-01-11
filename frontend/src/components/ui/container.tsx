import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'default' | 'narrow' | 'wide'
}

const maxWidthClasses = {
  default: 'max-w-[1400px]',
  narrow: 'max-w-[1200px]',
  wide: 'max-w-[1600px]',
}

export function Container({children, className = '', maxWidth = 'default'}: ContainerProps) {
  return (
    <div className={`container-jamb px-4 ${maxWidthClasses[maxWidth]} mx-auto ${className}`}>
      {children}
    </div>
  )
}
