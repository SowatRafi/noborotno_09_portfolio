import type { ReactNode } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

interface SectionProps {
  readonly id: string
  readonly title: string
  readonly children: ReactNode
}

/**
 * Shared wrapper for every content section: consistent anchor id (the nav
 * links target these), a heading wired up via aria-labelledby so assistive
 * technology announces each landmark by name, and the scroll-reveal treatment.
 */
export function Section({ id, title, children }: SectionProps) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={headingId}
      className={`section reveal${visible ? ' reveal--visible' : ''}`}
    >
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  )
}
