import { useEffect, useRef } from 'react'

/**
 * Gently translates an element as the page scrolls for a subtle parallax
 * effect. Returns a ref to attach to the element you want to drift.
 */
export function useParallax<T extends HTMLElement>(strength = 0.08, scale = 1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const offset = (elementCenter - viewportCenter) * strength
      const transform =
        scale > 1
          ? `translate3d(0, ${Math.round(offset)}px, 0) scale(${scale.toFixed(3)})`
          : `translate3d(0, ${Math.round(offset)}px, 0)`
      el.style.transform = transform
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength, scale])

  return ref
}