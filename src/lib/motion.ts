import type { Variants } from 'framer-motion'

/*
 * Shared Framer Motion tokens so every animation on the site reads as one
 * system — the same easing, the same reveal distance, the same stagger rhythm.
 *
 * prefers-reduced-motion is handled globally by <MotionConfig reducedMotion="user">
 * in App: for visitors who ask the OS to reduce motion, Framer drops the
 * transform/slide part and keeps only a gentle opacity fade, so nothing moves
 * but content still arrives smoothly.
 */

const EASE = 'easeOut'

/** Container that reveals its children one after another as it scrolls in. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** A single item inside a stagger container: fade + slide up. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/** One-shot, scroll-triggered fade for a whole section (opacity only, so it
 *  doesn't fight the slide of the staggered items nested inside it). */
export const scrollReveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 0.5, ease: EASE },
} as const

/** Shared viewport config for stagger containers. */
export const staggerViewport = { once: true, margin: '0px 0px -10% 0px' } as const

/** A subtle lift for interactive cards on hover. */
export const hoverLift = {
  y: -6,
  transition: { duration: 0.2, ease: EASE },
} as const
