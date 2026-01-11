'use client'

import {useRef, useEffect, useCallback, useState} from 'react'

export function useScrollAnimations() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const getAnimationProps = useCallback(
    (type: 'fade' | 'slide' | 'scale' | 'parallax', index: number) => {
      if (prefersReducedMotion) {
        return {
          initial: {opacity: 0},
          whileInView: {opacity: 1},
          viewport: {once: true, margin: '-50px'},
          transition: {duration: 0.3},
        }
      }

      const baseDelay = index * 0.1

      switch (type) {
        case 'fade':
          return {
            initial: {opacity: 0, y: 30},
            whileInView: {opacity: 1, y: 0},
            viewport: {once: true, margin: '-50px'},
            transition: {duration: 0.8, delay: baseDelay, ease: [0.22, 1, 0.36, 1]},
          }
        case 'slide':
          return {
            initial: {opacity: 0, x: -50},
            whileInView: {opacity: 1, x: 0},
            viewport: {once: true, margin: '-50px'},
            transition: {duration: 0.8, delay: baseDelay, ease: [0.22, 1, 0.36, 1]},
          }
        case 'scale':
          return {
            initial: {opacity: 0, scale: 0.95},
            whileInView: {opacity: 1, scale: 1},
            viewport: {once: true, margin: '-50px'},
            transition: {duration: 1, delay: baseDelay, ease: [0.22, 1, 0.36, 1]},
          }
        case 'parallax':
          return {
            initial: {opacity: 0, y: 100},
            whileInView: {opacity: 1, y: 0},
            viewport: {once: true, margin: '-100px'},
            transition: {duration: 1.2, delay: baseDelay, ease: [0.22, 1, 0.36, 1]},
          }
        default:
          return {}
      }
    },
    [prefersReducedMotion],
  )

  return {getAnimationProps, prefersReducedMotion}
}

export function useParallax(offset: number = 50) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * 0.1
      setOffsetY(rate)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {ref, offsetY: offsetY * (offset / 100)}
}

export function useStaggeredAnimation<T extends HTMLElement>(
  items: T[],
  animationType: 'fade' | 'slide' | 'scale' = 'fade',
  staggerDelay: number = 0.1,
) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const getAnimation = useCallback(
    (index: number) => {
      if (prefersReducedMotion) {
        return {
          initial: {opacity: 0},
          whileInView: {opacity: 1},
          viewport: {once: true},
          transition: {duration: 0.3},
        }
      }

      const delay = index * staggerDelay

      switch (animationType) {
        case 'fade':
          return {
            initial: {opacity: 0, y: 20},
            whileInView: {opacity: 1, y: 0},
            viewport: {once: true},
            transition: {duration: 0.6, delay, ease: 'easeOut'},
          }
        case 'slide':
          return {
            initial: {opacity: 0, x: -30},
            whileInView: {opacity: 1, x: 0},
            viewport: {once: true},
            transition: {duration: 0.6, delay, ease: 'easeOut'},
          }
        case 'scale':
          return {
            initial: {opacity: 0, scale: 0.9},
            whileInView: {opacity: 1, scale: 1},
            viewport: {once: true},
            transition: {duration: 0.8, delay, ease: [0.22, 1, 0.36, 1]},
          }
        default:
          return {}
      }
    },
    [animationType, staggerDelay, prefersReducedMotion],
  )

  return {getAnimation}
}
