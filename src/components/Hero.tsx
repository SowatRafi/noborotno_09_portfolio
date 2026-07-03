import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  /*
   * BASE_URL makes asset links correct under both the GitHub Pages base path
   * (/noborotno_09_portfolio/) and a future custom-domain root (/) — Vite
   * substitutes the value configured in vite.config.ts at build time. The
   * resume filename contains spaces, so it must be URL-encoded.
   */
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`
  const portraitHref = `${import.meta.env.BASE_URL}${profile.portraitFile}`

  return (
    <section id="top" className="hero" aria-label="Introduction">
      {/*
       * Real-time WebGL network globe behind the hero — a rotating sphere of
       * threat-map nodes. Decorative and inert (see HeroBackground); it never
       * gates or obscures content, and degrades to the CSS gradient below when
       * WebGL is unavailable or motion is reduced.
       */}
      <HeroBackground />

      <div className="container hero__content hero__layout">
        <div className="hero__intro">
          {/*
           * Decorative terminal session. Both commands "type" via CSS steps
           * animations with sequential delays; outputs fade in as each command
           * completes. aria-hidden keeps the theatre out of the accessibility
           * tree — the real introduction is the h1 below.
           */}
          <div className="terminal" aria-hidden="true">
            <div className="terminal__bar">
              <span className="terminal__dot terminal__dot--close" />
              <span className="terminal__dot terminal__dot--min" />
              <span className="terminal__dot terminal__dot--max" />
              <span className="terminal__host">sowat@soc-melbourne:~</span>
            </div>
            <div className="terminal__body">
              <p className="terminal__line">
                <span className="hero__prompt">~$</span>{' '}
                <span className="terminal__cmd terminal__cmd--one">whoami</span>
              </p>
              <p className="terminal__line terminal__out terminal__out--one">
                sowat.rafi
              </p>
              <p className="terminal__line terminal__row--two">
                <span className="hero__prompt">~$</span>{' '}
                <span className="terminal__cmd terminal__cmd--two">cat status.log</span>
              </p>
              <p className="terminal__line terminal__out terminal__out--two">
                <span className="terminal__ok">[ OK ]</span> open to SOC &amp; AI
                security roles
              </p>
              <p className="terminal__line terminal__out terminal__out--three terminal__line--cursor">
                <span className="terminal__ok">[ OK ]</span> available to relocate
                anywhere in Australia
              </p>
            </div>
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

        {/*
         * Portrait in a HUD frame: corner brackets, a slow scan sweep, and a
         * console-style caption. The img carries the real alt text; the
         * caption merely restyles data already announced elsewhere, so it is
         * hidden from assistive technology to avoid duplicate announcements.
         */}
        <figure className="hud">
          <div className="hud__frame">
            <img
              className="hud__img"
              src={portraitHref}
              alt={profile.portraitAlt}
              width="640"
              height="800"
              decoding="async"
            />
            <span className="hud__scan" aria-hidden="true" />
            <span className="hud__corner hud__corner--tl" aria-hidden="true" />
            <span className="hud__corner hud__corner--tr" aria-hidden="true" />
            <span className="hud__corner hud__corner--bl" aria-hidden="true" />
            <span className="hud__corner hud__corner--br" aria-hidden="true" />
          </div>
          <figcaption className="hud__caption" aria-hidden="true">
            <span className="hud__caption-id">{profile.name}</span>
            <span className="hud__caption-status">
              <span className="hud__led" /> live
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
