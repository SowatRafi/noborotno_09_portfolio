import { useEffect, useState } from 'react'

/**
 * Scrollspy for the header nav: reports which section currently crosses the
 * vertical midline of the viewport, so the nav can highlight where the
 * visitor is.
 *
 * Like the reveal hook, this is a progressive enhancement: without
 * IntersectionObserver the return value stays null and the nav simply has no
 * highlight. The observer band is a thin slice around the viewport middle
 * (top 45% and bottom 50% cut away), so at most one section intersects it at
 * a time and the active id flips exactly when a section's edge crosses the
 * centre of the screen.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element !== null) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
    // ids come from a module-level constant; joining gives a stable, cheap
    // dependency without asking callers to memoise the array.
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
