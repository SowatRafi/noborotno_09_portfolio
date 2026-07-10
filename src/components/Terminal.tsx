import { m } from 'framer-motion'
import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/*
 * Animated bash-style terminal in the rail. It floats as a 3D card — a
 * continuous gentle tilt on the X and Y axes inside a perspective stage — while
 * the command lines type themselves on a loop (see .term__typed) with a
 * blinking cursor. The 3D float is a Framer transform, so it is automatically
 * dropped for prefers-reduced-motion visitors via the app-level MotionConfig.
 *
 * The prompt/command lines are decorative (aria-hidden); the outputs carry the
 * real content — including the whoami name echo and the genuine contact links.
 */
export function Terminal() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`

  return (
    <div className="term-stage">
      <m.div
        className="term"
        aria-label="Profile"
        animate={{ rotateY: [-6, 6, -6], rotateX: [3, -3, 3] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="term__bar" aria-hidden="true">
        <span className="term__dot term__dot--close" />
        <span className="term__dot term__dot--min" />
        <span className="term__dot term__dot--max" />
        <span className="term__host">sowat@portfolio:~</span>
      </div>

      <div className="term__body">
        <p className="term__cmd" aria-hidden="true">
          <span className="term__typed term__typed--1">whoami</span>
        </p>
        {/* The sole <h1> lives in the hero; this is a styled echo, not a heading. */}
        <p className="term__name">{profile.name}</p>
        <p className="term__role">{profile.titleLine}</p>

        <p className="term__cmd" aria-hidden="true">
          <span className="term__typed term__typed--2">pwd</span>
        </p>
        <p className="term__out">{profile.city}</p>

        <p className="term__cmd" aria-hidden="true">
          <span className="term__typed term__typed--3">cat status.txt</span>
        </p>
        <p className="term__out term__ok">{profile.availability}</p>

        <p className="term__cmd" aria-hidden="true">
          <span className="term__typed term__typed--4">ls contact/</span>
        </p>
        <p className="term__out term__links">
          <ExternalLink className="term__link" href={profile.githubUrl}>
            github
          </ExternalLink>
          <ExternalLink className="term__link" href={profile.linkedinUrl}>
            linkedin
          </ExternalLink>
          <a className="term__link" href={`mailto:${profile.email}`}>
            email
          </a>
        </p>

        <p className="term__cmd term__cmd--last" aria-hidden="true">
          <span className="term__typed term__typed--5">open resume.pdf</span>
        </p>
        <p className="term__out">
          <a className="term__link term__link--strong" href={resumeHref} download>
            ↓ resume.pdf
          </a>
        </p>
        </div>
      </m.div>
    </div>
  )
}
