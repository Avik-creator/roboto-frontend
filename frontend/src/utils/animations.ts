'use client'

import {useState, useEffect, useCallback} from 'react'
import {type MotionValue, useTransform, useSpring} from 'motion/react'

// Refined easings for luxury antique aesthetic
export const EASINGS = {
  elegant: [0.22, 1, 0.36, 1] as const, // Sophisticated, slow-out
  refined: [0.25, 0.46, 0.45, 0.94] as const, // Smooth, balanced
  luxurious: [0.42, 0, 0.58, 1] as const, // Symmetrical ease
  slowEase: [0.32, 0.72, 0.36, 1] as const, // Gradual, deliberate
  silk: [0.19, 1, 0.22, 1] as const, // Ultra-smooth for hero
  velvet: [0.16, 1, 0.3, 1] as const, // Plush feel
}

// Extended durations for deliberate, refined motion
export const DURATIONS = {
  instant: 0.2,
  veryFast: 0.5,
  fast: 0.7,
  medium: 1.0,
  slow: 1.4,
  verySlow: 1.8,
  luxurious: 2.2,
  theatrical: 2.8,
}

// Stagger delays for orchestrated reveals
export const DELAYS = {
  minimal: 0.05,
  subtle: 0.1,
  light: 0.15,
  moderate: 0.2,
  pronounced: 0.3,
  dramatic: 0.4,
}

// Refined motion configuration
export const MOTION_CONFIG = {
  viewport: {once: true, margin: '-80px'} as const,
  hero: {
    duration: DURATIONS.theatrical,
    ease: EASINGS.silk,
  },
  fadeReveal: {
    duration: DURATIONS.slow,
    ease: EASINGS.refined,
  },
  slideReveal: {
    duration: DURATIONS.medium,
    ease: EASINGS.elegant,
  },
  scaleReveal: {
    duration: DURATIONS.luxurious,
    ease: EASINGS.velvet,
  },
  staggerBase: 0.12,
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

export function useScrollProgress(): MotionValue<number> {
  const scrollProgress = useCallback(() => {
    if (typeof window === 'undefined') return 0
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return scrollTop / docHeight
  }, [])

  return scrollProgress as unknown as MotionValue<number>
}

// Enhanced parallax with refined motion
export function useParallaxEffect(intensity: number = 30): {
  y: MotionValue<number>
  springY: MotionValue<number>
} {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const y = useTransform(() => scrollY * (intensity / 100))
  const springY = useSpring(y, {stiffness: 80, damping: 40, mass: 0.5})

  return {y, springY}
}

export function useImageLoad() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  return {isLoaded, hasError, handleLoad, handleError}
}

export function getStaggerDelay(index: number, baseDelay: number = DELAYS.moderate): number {
  return index * baseDelay
}

// Enhanced animation presets for luxury aesthetic
export function createAnimationProps(
  type:
    | 'fade'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'parallax'
    | 'reveal'
    | 'curtain'
    | 'expand',
  index: number = 0,
  reducedMotion: boolean = false,
) {
  if (reducedMotion) {
    return {
      initial: {opacity: 0},
      whileInView: {opacity: 1},
      viewport: {once: true},
      transition: {duration: DURATIONS.veryFast},
    }
  }

  const delay = getStaggerDelay(index, DELAYS.light)

  switch (type) {
    case 'fade':
      return {
        initial: {opacity: 0},
        whileInView: {opacity: 1},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.slow, delay, ease: EASINGS.elegant},
      }
    case 'slideUp':
      return {
        initial: {opacity: 0, y: 60},
        whileInView: {opacity: 1, y: 0},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.slow, delay, ease: EASINGS.refined},
      }
    case 'slideDown':
      return {
        initial: {opacity: 0, y: -60},
        whileInView: {opacity: 1, y: 0},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.slow, delay, ease: EASINGS.refined},
      }
    case 'slideLeft':
      return {
        initial: {opacity: 0, x: 80},
        whileInView: {opacity: 1, x: 0},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.elegant},
      }
    case 'slideRight':
      return {
        initial: {opacity: 0, x: -80},
        whileInView: {opacity: 1, x: 0},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.elegant},
      }
    case 'scale':
      return {
        initial: {opacity: 0, scale: 0.92},
        whileInView: {opacity: 1, scale: 1},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.velvet},
      }
    case 'parallax':
      return {
        initial: {opacity: 0, y: 100},
        whileInView: {opacity: 1, y: 0},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.verySlow, delay, ease: EASINGS.slowEase},
      }
    case 'reveal':
      return {
        initial: {opacity: 0, y: 70, scale: 0.96},
        whileInView: {opacity: 1, y: 0, scale: 1},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.silk},
      }
    case 'curtain':
      return {
        initial: {opacity: 0, clipPath: 'inset(0 100% 0 0)'},
        whileInView: {opacity: 1, clipPath: 'inset(0 0% 0 0)'},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.theatrical, delay, ease: EASINGS.elegant},
      }
    case 'expand':
      return {
        initial: {opacity: 0, scaleX: 0.8, scaleY: 0.95},
        whileInView: {opacity: 1, scaleX: 1, scaleY: 1},
        viewport: MOTION_CONFIG.viewport,
        transition: {duration: DURATIONS.verySlow, delay, ease: EASINGS.slowEase},
      }
    default:
      return {}
  }
}

// Hero animation with theatrical entrance
export function getHeroAnimation() {
  return {
    initial: {opacity: 0, scale: 1.12},
    animate: {opacity: 1, scale: 1},
    transition: {
      duration: DURATIONS.theatrical,
      ease: EASINGS.silk,
    },
  }
}

// Image reveal with scale and fade
export function getImageRevealAnimation() {
  return {
    initial: {opacity: 0, scale: 0.94},
    whileInView: {opacity: 1, scale: 1},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.luxurious,
      ease: EASINGS.velvet,
    },
  }
}

// Text reveal with subtle upward motion
export function getTextRevealAnimation(index: number = 0) {
  return {
    initial: {opacity: 0, y: 40},
    whileInView: {opacity: 1, y: 0},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.slow,
      delay: getStaggerDelay(index, DELAYS.light),
      ease: EASINGS.refined,
    },
  }
}

// Button animation with refined hover/tap states
export function getButtonAnimation() {
  return {
    whileHover: {
      scale: 1.02,
      transition: {duration: DURATIONS.fast, ease: EASINGS.elegant},
    },
    whileTap: {
      scale: 0.98,
      transition: {duration: DURATIONS.instant, ease: EASINGS.elegant},
    },
  }
}

// Navigation animation with delicate stagger
export function getNavigationAnimation(index: number) {
  return {
    initial: {opacity: 0, y: 20},
    whileInView: {opacity: 1, y: 0},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.medium,
      delay: getStaggerDelay(index, DELAYS.subtle),
      ease: EASINGS.elegant,
    },
  }
}

// Card hover animation for products/stories
export function getCardHoverAnimation() {
  return {
    rest: {scale: 1, y: 0},
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: DURATIONS.fast,
        ease: EASINGS.elegant,
      },
    },
  }
}

// Sophisticated page transition
export function getPageTransition() {
  return {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -20},
    transition: {
      duration: DURATIONS.medium,
      ease: EASINGS.refined,
    },
  }
}

// Drawer/Modal animation
export function getDrawerAnimation() {
  return {
    initial: {opacity: 0, x: 100},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: 100},
    transition: {
      duration: DURATIONS.medium,
      ease: EASINGS.elegant,
    },
  }
}
