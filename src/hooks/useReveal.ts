import { useEffect, useRef } from 'react'

/**
 * Adds a scroll-triggered reveal to a container. Apply the `reveal` class
 * (defined in index.css) to children, or pass elements to watch.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const elements = root.querySelectorAll<HTMLElement>('.reveal')
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay
            if (delay) {
              el.style.transitionDelay = `${delay}ms`
            }
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
