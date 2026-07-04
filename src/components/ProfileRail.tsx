import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/*
 * Persistent profile rail. On desktop it is sticky, so the single portrait and
 * the key identity details stay visible while the visitor scrolls through every
 * section; on narrow screens it becomes a normal block at the top of the page
 * and the sticky header keeps the navigation reachable.
 *
 * This holds the site's one and only photo, and the sole <h1>.
 */
export function ProfileRail() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`
  const portraitHref = `${import.meta.env.BASE_URL}${profile.portraitFile}`

  return (
    <aside className="rail" aria-label="Profile">
      <figure className="rail__portrait">
        <img
          className="rail__img"
          src={portraitHref}
          alt={profile.portraitAlt}
          width="640"
          height="800"
          decoding="async"
        />
      </figure>

      <h1 className="rail__name">{profile.name}</h1>
      <p className="rail__title">{profile.titleLine}</p>
      <p className="rail__loc">
        <span className="rail__led" aria-hidden="true" />
        {profile.location}
      </p>

      <ul className="rail__status">
        <li>Open to SOC &amp; AI security roles</li>
        <li>Available to relocate worldwide</li>
      </ul>

      <div className="rail__actions">
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
    </aside>
  )
}
