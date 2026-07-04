import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'
import { HeroScene } from './HeroScene'

/*
 * Full-width hero band. A 3D animated green particle sphere (WebGL) and a
 * glowing red orb sit behind the introduction — the two colours of the
 * Bangladeshi flag expressed as depth and light, never the flag itself. This
 * carries the sole <h1>.
 */
export function Hero() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="hero__backdrop" aria-hidden="true">
        <HeroScene />
        <span className="hero__orb" />
      </div>

      <div className="container hero__inner">
        <p className="hero__kicker">
          <span className="hero__prompt" aria-hidden="true">
            ~$
          </span>{' '}
          whoami
        </p>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__title">{profile.titleLine}</p>
        <p className="hero__avail">
          <span className="hero__dot hero__dot--green" aria-hidden="true" />
          Open to SOC &amp; AI security roles
          <span className="hero__sep" aria-hidden="true" />
          <span className="hero__dot hero__dot--red" aria-hidden="true" />
          Available to relocate worldwide
        </p>

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
