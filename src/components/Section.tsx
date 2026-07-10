import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { scrollReveal } from '../lib/motion'

interface SectionProps {
  readonly id: string
  readonly title: string
  readonly children: ReactNode
}

/**
 * Shared wrapper for every content section: consistent anchor id (the nav
 * links target these), a heading wired up via aria-labelledby so assistive
 * technology announces each landmark by name, and a Framer Motion
 * scroll-triggered fade as it enters the viewport (reduced-motion safe via the
 * app-level MotionConfig).
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <m.section id={id} aria-labelledby={headingId} className="section" {...scrollReveal}>
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      {children}
    </m.section>
  )
}
