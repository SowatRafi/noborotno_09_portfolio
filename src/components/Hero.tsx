import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

export function Hero() {
  /*
   * BASE_URL makes the resume link correct under both the GitHub Pages base
   * path (/noborotno_09_portfolio/) and a future custom-domain root (/) —
   * Vite substitutes the value configured in vite.config.ts at build time.
   */
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

  return (
    <section id="top" className="hero" aria-label="Introduction">
      {/*
       * Decorative 3D scene: a perspective grid floor plus floating glass
       * panels, all drawn in CSS. aria-hidden and pointer-events: none keep it
       * invisible to assistive technology and inert to interaction — it is
       * atmosphere only and must never gate or obscure content.
       */}
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__panel hero__panel--one" />
        <div className="hero__panel hero__panel--two" />
        <div className="hero__panel hero__panel--three" />
      </div>
      <div className="container hero__content">
        {/*
         * Decorative terminal window replacing the plain kicker line. The
         * typed command is pure CSS (steps animation over a fixed ch width),
         * so the markup stays static and aria-hidden keeps it out of the
         * accessibility tree — the real introduction is the h1 below.
         */}
        <div className="terminal" aria-hidden="true">
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--close" />
            <span className="terminal__dot terminal__dot--min" />
            <span className="terminal__dot terminal__dot--max" />
            <span className="terminal__host">sowat@soc-melbourne:~</span>
          </div>
          <p className="terminal__line">
            <span className="hero__prompt">~$</span>{' '}
            <span className="terminal__cmd">whoami</span>
          </p>
        </div>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__title">{profile.titleLine}</p>
        <p className="hero__location">{profile.location}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href={resumeHref} download>
            Download Resume
          </a>
          <ExternalLink className="btn" href={profile.githubUrl}>
            GitHub
          </ExternalLink>
          <ExternalLink className="btn" href={profile.linkedinUrl}>
            LinkedIn
          </ExternalLink>
          <a className="btn" href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </div>
    </section>
  )
}
