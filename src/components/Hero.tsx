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
      <div className="container">
        <p className="hero__kicker" aria-hidden="true">
          <span className="hero__prompt">~$</span> whoami
        </p>
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
