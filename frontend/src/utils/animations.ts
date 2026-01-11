'use client'

import {useState, useEffect, useCallback} from 'react'
import {type MotionValue, useTransform, useSpring} from 'motion/react'

// Refined easings for luxury antique aesthetic
// Inspired by fine mechanical movements and silk drapes
export const EASINGS = {
  elegant: [0.22, 1, 0.36, 1] as const, // Sophisticated, slow-out
  refined: [0.25, 0.46, 0.45, 0.94] as const, // Smooth, balanced
  luxurious: [0.42, 0, 0.58, 1] as const, // Symmetrical ease
  slowEase: [0.32, 0.72, 0.36, 1] as const, // Gradual, deliberate
  silk: [0.19, 1, 0.22, 1] as const, // Ultra-smooth for hero
  velvet: [0.16, 1, 0.3, 1] as const, // Plush feel
  cashmere: [0.12, 0.88, 0.18, 1] as const, // Softest, most refined
  goldLeaf: [0.28, 0.82, 0.24, 1] as const, // Delicate, precious
  marble: [0.35, 0, 0.25, 1] as const, // Solid, weighty
  crystal: [0.4, 0.0, 0.2, 1] as const, // Sharp, clean
}

// Extended durations for deliberate, refined motion
// Luxury never rushes - each movement is intentional
export const DURATIONS = {
  instant: 0.15,
  veryFast: 0.4,
  fast: 0.65,
  medium: 0.95,
  slow: 1.3,
  verySlow: 1.75,
  luxurious: 2.1,
  theatrical: 2.6,
  cinematic: 3.2,
  majestic: 3.8,
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

// Enhanced parallax with refined motion and depth
export function useParallaxEffect(intensity: number = 25): {
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
  // More refined spring for luxurious feel
  const springY = useSpring(y, {stiffness: 60, damping: 50, mass: 0.8})

  return {y, springY}
}

// Advanced parallax for layered depth
export function useLayeredParallax(baseIntensity: number = 20) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create multiple layers with different speeds
  const y1 = useTransform(() => scrollY * (baseIntensity / 100))
  const y2 = useTransform(() => scrollY * ((baseIntensity * 0.6) / 100))
  const y3 = useTransform(() => scrollY * ((baseIntensity * 0.3) / 100))

  const springY1 = useSpring(y1, {stiffness: 60, damping: 50, mass: 0.8})
  const springY2 = useSpring(y2, {stiffness: 70, damping: 45, mass: 0.6})
  const springY3 = useSpring(y3, {stiffness: 80, damping: 40, mass: 0.4})

  return {
    foreground: springY1,
    middle: springY2,
    background: springY3,
  }
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
// Slow zoom with subtle blur for luxury feel
export function getHeroAnimation() {
  return {
    initial: {opacity: 0, scale: 1.08, filter: 'blur(8px)'},
    animate: {opacity: 1, scale: 1, filter: 'blur(0px)'},
    transition: {
      duration: DURATIONS.cinematic,
      ease: EASINGS.cashmere,
    },
  }
}

// Image reveal with scale and fade
// Gentle emergence like a developing photograph
export function getImageRevealAnimation() {
  return {
    initial: {opacity: 0, scale: 0.96, filter: 'blur(4px)'},
    whileInView: {opacity: 1, scale: 1, filter: 'blur(0px)'},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.luxurious,
      ease: EASINGS.goldLeaf,
    },
  }
}

// Text reveal with subtle upward motion
// Like reading inscriptions on aged parchment
export function getTextRevealAnimation(index: number = 0) {
  return {
    initial: {opacity: 0, y: 30, filter: 'blur(2px)'},
    whileInView: {opacity: 1, y: 0, filter: 'blur(0px)'},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.verySlow,
      delay: getStaggerDelay(index, DELAYS.light),
      ease: EASINGS.cashmere,
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
// Gentle lift like handling precious artifacts
export function getCardHoverAnimation() {
  return {
    rest: {scale: 1, y: 0, rotateX: 0, rotateY: 0},
    hover: {
      scale: 1.015,
      y: -6,
      rotateX: 2,
      rotateY: -1,
      transition: {
        duration: DURATIONS.slow,
        ease: EASINGS.velvet,
      },
    },
  }
}

// Sophisticated image hover with parallax layers
export function getImageHoverAnimation() {
  return {
    rest: {scale: 1},
    hover: {
      scale: 1.05,
      transition: {
        duration: DURATIONS.luxurious,
        ease: EASINGS.goldLeaf,
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

// Smooth scroll to element with luxury easing
export function smoothScrollTo(targetId: string, offset: number = 80) {
  const target = document.getElementById(targetId)
  if (!target) return

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 1800 // Luxurious slow scroll
  let start: number | null = null

  function animation(currentTime: number) {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const progress = Math.min(timeElapsed / duration, 1)

    // Custom easing curve for luxury feel
    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

    window.scrollTo(0, startPosition + distance * easeProgress)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

// Magnetic button effect for luxury interaction
export function useMagneticEffect(strength: number = 0.3) {
  const [position, setPosition] = useState({x: 0, y: 0})

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({x: deltaX, y: deltaY})
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    setPosition({x: 0, y: 0})
  }, [])

  return {
    position,
    handleMouseMove,
    handleMouseLeave,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  }
}

// Text reveal with character-by-character stagger
export function getCharacterRevealAnimation(charIndex: number) {
  return {
    initial: {opacity: 0, y: 20},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true},
    transition: {
      duration: DURATIONS.fast,
      delay: charIndex * 0.03,
      ease: EASINGS.elegant,
    },
  }
}

// Mask reveal animation (curtain effect)
export function getMaskRevealAnimation(direction: 'left' | 'right' | 'top' | 'bottom' = 'right') {
  const clipPaths = {
    left: {
      initial: 'inset(0 0 0 100%)',
      animate: 'inset(0 0 0 0%)',
    },
    right: {
      initial: 'inset(0 100% 0 0)',
      animate: 'inset(0 0% 0 0)',
    },
    top: {
      initial: 'inset(100% 0 0 0)',
      animate: 'inset(0% 0 0 0)',
    },
    bottom: {
      initial: 'inset(0 0 100% 0)',
      animate: 'inset(0 0 0% 0)',
    },
  }

  return {
    initial: {opacity: 0, clipPath: clipPaths[direction].initial},
    whileInView: {opacity: 1, clipPath: clipPaths[direction].animate},
    viewport: MOTION_CONFIG.viewport,
    transition: {
      duration: DURATIONS.theatrical,
      ease: EASINGS.silk,
    },
  }
}

// Orchestrated section reveal
export function getSectionOrchestration() {
  return {
    container: {
      hidden: {opacity: 0},
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: {opacity: 0, y: 40, filter: 'blur(4px)'},
      show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: DURATIONS.luxurious,
          ease: EASINGS.cashmere,
        },
      },
    },
  }
}

// Gallery image sequential reveal
export function getGalleryReveal(index: number, total: number) {
  const baseDelay = 0.08
  const delay = index * baseDelay
  
  return {
    initial: {opacity: 0, scale: 0.92, y: 60},
    whileInView: {opacity: 1, scale: 1, y: 0},
    viewport: {once: true, margin: '-100px'},
    transition: {
      duration: DURATIONS.luxurious,
      delay,
      ease: EASINGS.goldLeaf,
    },
  }
}
