import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { staggerContainer, staggerItem } from '../lib/motion'
import { ExternalLink } from './ExternalLink'
import { ProfileRail } from './ProfileRail'

const COORDINATES = `BUILT IN ${profile.originCoordinates}`

/*
 * Type-led hero: plain CSS with the site's design tokens, and Framer's
 * lightweight m.* components (LazyMotion strict) instead of motion.*.
 *
 * The animated name introduces the portfolio alongside the profile terminal.
 */

function ContactIcon({ type }: { type: 'github' | 'linkedin' | 'email' }) {
  const paths = {
    github: (
      <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10 10 0 0 0 12 2Z" />
    ),
    linkedin: (
      <>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.5V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4z" />
      </>
    ),
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  }
  return (
    <svg
      className="hero-split__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={type === 'email' ? 'none' : 'currentColor'}
      stroke={type === 'email' ? 'currentColor' : 'none'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  )
}

export function HeroSection() {
  const [givenName, middleName, lastName] = profile.name.split(' ')
  const [typedLength, setTypedLength] = useState(0)
  const [lastNameFrame, setLastNameFrame] = useState(0)
  const [middleNameStage, setMiddleNameStage] = useState<'full' | 'fading' | 'initial'>('full')
  const middleInitialRef = useRef<HTMLSpanElement>(null)
  const lastNameRef = useRef<HTMLSpanElement>(null)
  const previousPositions = useRef<(DOMRect | undefined)[]>([])
  const reduceMotion = useReducedMotion()
  const showMiddleInitial = middleNameStage === 'initial'
  const nameLength = profile.name.length
  const lastNameStart = nameLength - lastName.length
  const coordinatesLength = Math.max(0, typedLength - nameLength)
  const introFinished = coordinatesLength === COORDINATES.length
  const typedMiddleName = middleName.slice(0, Math.max(0, typedLength - givenName.length - 1))
  const lastNameLength = introFinished
    ? Math.abs(lastName.length - lastNameFrame)
    : Math.max(0, typedLength - lastNameStart)

  useEffect(() => {
    if (typedLength === nameLength + COORDINATES.length) return

    let delay = 55
    if (typedLength === 0 || typedLength === nameLength) delay = 250
    if (typedLength >= lastNameStart && typedLength < nameLength) delay = 180
    const timer = window.setTimeout(() => setTypedLength(typedLength + 1), delay)
    return () => window.clearTimeout(timer)
  }, [typedLength, nameLength, lastNameStart])

  useEffect(() => {
    if (!introFinished || middleNameStage === 'initial') return

    const timer = window.setTimeout(() => {
      if (middleNameStage === 'full' && !reduceMotion) {
        setMiddleNameStage('fading')
        return
      }

      previousPositions.current = [
        middleInitialRef.current?.getBoundingClientRect(),
        lastNameRef.current?.getBoundingClientRect(),
      ]
      setMiddleNameStage('initial')
    }, middleNameStage === 'full' ? 2050 : 240)
    return () => window.clearTimeout(timer)
  }, [introFinished, middleNameStage, reduceMotion])

  useLayoutEffect(() => {
    if (!showMiddleInitial || reduceMotion) return

    // Draw each word from its old position before the browser paints the new layout.
    const animations = [middleInitialRef.current, lastNameRef.current].map((element, index) => {
      const previous = previousPositions.current[index]
      if (!element || !previous) return

      const next = element.getBoundingClientRect()
      return element.animate(
        [
          { transform: `translate(${previous.left - next.left}px, ${previous.top - next.top}px)` },
          { transform: 'translate(0, 0)' },
        ],
        { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    })
    return () => animations.forEach((animation) => animation?.cancel())
  }, [showMiddleInitial, reduceMotion])

  useEffect(() => {
    if (!introFinished) return

    // The frame walks from the full surname to empty and back.
    let delay = lastNameFrame < lastName.length ? 205 : 250
    if (lastNameFrame === 0) delay = 2800
    if (lastNameFrame === lastName.length) delay = 480

    const timer = window.setTimeout(
      () => setLastNameFrame((lastNameFrame + 1) % (lastName.length * 2)),
      delay,
    )
    return () => window.clearTimeout(timer)
  }, [introFinished, lastName.length, lastNameFrame])

  const animatedLastName = (
    <span
      className="hero-split__last-name"
      data-typing={typedLength >= lastNameStart && (typedLength < nameLength || introFinished)}
      ref={lastNameRef}
    >
      {lastName.slice(0, lastNameLength)}
    </span>
  )

  return (
    <m.section
      id="top"
      className="hero-split"
      aria-label="Introduction"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="hero-split__content container">
        <div className="hero-split__intro">
          <h1 className="hero-split__title" aria-label={profile.name} data-compact={showMiddleInitial}>
            <span className="hero-split__typed-line" aria-hidden="true">
              <span className="hero-split__measure">
                {showMiddleInitial ? `${givenName} ${middleName[0]} ${lastName}` : givenName}
              </span>
              <span className="hero-split__given-name" data-typing={typedLength < givenName.length}>
                {givenName.slice(0, typedLength)}
                {showMiddleInitial && (
                  <>
                    {' '}
                    <span className="hero-split__middle-name hero-split__middle-initial" ref={middleInitialRef}>
                      {middleName[0]}
                    </span>
                    {' '}
                    {animatedLastName}
                  </>
                )}
              </span>
            </span>
            <span className="hero-split__typed-line" aria-hidden="true">
              <span className="hero-split__measure">{middleName} {lastName}</span>
              {!showMiddleInitial && (
                <span>
                  <span
                    className="hero-split__middle-name"
                    data-typing={typedLength >= givenName.length && typedLength < lastNameStart}
                  >
                    <span className="hero-split__middle-initial" ref={middleInitialRef}>{typedMiddleName[0]}</span>
                    <span className="hero-split__middle-tail" data-fading={middleNameStage === 'fading'}>
                      {typedMiddleName.slice(1)}
                    </span>
                  </span>
                  {typedLength >= lastNameStart && ' '}
                  {animatedLastName}
                </span>
              )}
            </span>
          </h1>

          <m.div className="hero-split__footer" variants={staggerItem}>
            <ExternalLink className="hero-split__contact" href={profile.githubUrl}>
              <ContactIcon type="github" />
              GitHub
            </ExternalLink>
            <ExternalLink className="hero-split__contact" href={profile.linkedinUrl}>
              <ContactIcon type="linkedin" />
              LinkedIn
            </ExternalLink>
            <a className="hero-split__contact" href={`mailto:${profile.email}`}>
              <ContactIcon type="email" />
              {profile.email}
            </a>
          </m.div>

          <p className="hero-split__coordinates">
            <span className="hero-split__typed-line">
              <span className="hero-split__measure">{COORDINATES}</span>
              <span aria-hidden="true">{COORDINATES.slice(0, coordinatesLength)}</span>
            </span>
          </p>
        </div>
        <ProfileRail />
      </div>
    </m.section>
  )
}
