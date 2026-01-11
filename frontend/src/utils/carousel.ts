'use client'

import {useState, useCallback, useEffect} from 'react'

export interface CarouselState {
  currentIndex: number
  direction: number
}

export function useCarousel(itemCount: number, autoPlay: boolean = true, interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % itemCount) + itemCount) % itemCount
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(newIndex)
    },
    [currentIndex, itemCount],
  )

  const next = useCallback(() => {
    goTo(currentIndex + 1)
  }, [currentIndex, goTo])

  const prev = useCallback(() => {
    goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  useEffect(() => {
    if (!autoPlay || itemCount <= 1) return

    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next, itemCount])

  return {
    currentIndex,
    direction,
    goTo,
    next,
    prev,
  }
}

export function getCarouselVariants() {
  return {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
    }),
  }
}
