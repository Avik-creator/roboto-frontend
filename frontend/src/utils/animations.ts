'use client'

import {useState, useEffect, useCallback} from 'react'
import {type MotionValue, useTransform, useSpring} from 'motion/react'

export const EASINGS = {
  elegant: [0.22, 1, 0.36, 1] as const,
  refined: [0.25, 0.46, 0.45, 0.94] as const,
  luxurious: [0.42, 0, 0.58, 1] as const,
  slowEase: [0.32, 0.72, 0.36, 1] as const,
}

export const DURATIONS = {
  veryFast: 0.4,
  fast: 0.6,
  medium: 0.8,
  slow: 1.2,
  verySlow: 1.6,
  luxurious: 2,
}

export const DELAYS = {
  subtle: 0.1,
  light: 0.15,
  moderate: 0.2,
  pronounced: 0.3,
}

export const MOTION_CONFIG = {
  viewport: {once: true, margin: '-100px'} as const,
  hero: {
    duration: DURATIONS.luxurious,
    ease: EASINGS.elegant,
  },
  fadeReveal: {
    duration: DURATIONS.slow,
    ease: EASINGS.refined,
  },
  slideReveal: {
    duration: DURATIONS.medium,
    ease: EASINGS.elegant,
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
  const springY = useSpring(y, {stiffness: 100, damping: 30})

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

export function createAnimationProps(
  type: 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'parallax' | 'reveal',
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

  const delay = getStaggerDelay(index)

  switch (type) {
    case 'fade':
      return {
        initial: {opacity: 0},
        whileInView: {opacity: 1},
        viewport: {once: true},
        transition: {duration: DURATIONS.slow, delay, ease: EASINGS.elegant},
      }
    case 'slideUp':
      return {
        initial: {opacity: 0, y: 40},
        whileInView: {opacity: 1, y: 0},
        viewport: {once: true},
        transition: {duration: DURATIONS.medium, delay, ease: EASINGS.refined},
      }
    case 'slideDown':
      return {
        initial: {opacity: 0, y: -40},
        whileInView: {opacity: 1, y: 0},
        viewport: {once: true},
        transition: {duration: DURATIONS.medium, delay, ease: EASINGS.refined},
      }
    case 'scale':
      return {
        initial: {opacity: 0, scale: 0.95},
        whileInView: {opacity: 1, scale: 1},
        viewport: {once: true},
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.elegant},
      }
    case 'parallax':
      return {
        initial: {opacity: 0, y: 80},
        whileInView: {opacity: 1, y: 0},
        viewport: {once: true},
        transition: {duration: DURATIONS.luxurious, delay, ease: EASINGS.slowEase},
      }
    case 'reveal':
      return {
        initial: {opacity: 0, y: 60, scale: 0.98},
        whileInView: {opacity: 1, y: 0, scale: 1},
        viewport: {once: true},
        transition: {duration: DURATIONS.slow, delay, ease: EASINGS.luxurious},
      }
    default:
      return {}
  }
}

export function getHeroAnimation() {
  return {
    initial: {opacity: 0, scale: 1.08},
    animate: {opacity: 1, scale: 1},
    transition: {
      duration: DURATIONS.luxurious,
      ease: EASINGS.elegant,
    },
  }
}

export function getImageRevealAnimation() {
  return {
    initial: {opacity: 0, scale: 0.97},
    whileInView: {opacity: 1, scale: 1},
    viewport: {once: true},
    transition: {
      duration: DURATIONS.luxurious,
      ease: EASINGS.refined,
    },
  }
}

export function getTextRevealAnimation(index: number = 0) {
  return {
    initial: {opacity: 0, y: 30},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true},
    transition: {
      duration: DURATIONS.medium,
      delay: getStaggerDelay(index, DELAYS.light),
      ease: EASINGS.refined,
    },
  }
}

export function getButtonAnimation() {
  return {
    whileHover: {scale: 1.03},
    whileTap: {scale: 0.97},
    transition: {duration: DURATIONS.fast, ease: EASINGS.elegant},
  }
}

export function getNavigationAnimation(index: number) {
  return {
    initial: {opacity: 0, y: 15},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true},
    transition: {
      duration: DURATIONS.medium,
      delay: getStaggerDelay(index, DELAYS.subtle),
      ease: EASINGS.elegant,
    },
  }
}
