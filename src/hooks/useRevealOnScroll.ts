import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Fade-in-on-scroll driven by IntersectionObserver.
 *
 * The animation is a progressive enhancement, never a gate on content: if the
 * visitor prefers reduced motion, or the browser lacks IntersectionObserver,
 * the element is marked visible immediately. Hiding content behind JavaScript
 * that might not run would hurt both accessibility and SEO.
 */
export function useRevealOnScroll<T extends HTMLElement>(): {
  ref: RefObject<T>
  visible: boolean
} {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (element === null) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            // Reveal once and stop watching — re-hiding content on scroll-out
            // would be distracting, and disconnecting frees the observer.
            observer.disconnect()
          }
        }
      },
      // threshold 0 (not a percentage) so sections taller than the viewport —
      // common on mobile — still trigger as soon as any part scrolls into view.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
