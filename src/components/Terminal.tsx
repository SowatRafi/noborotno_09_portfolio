import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/*
 * Animated bash-style terminal shown under the portrait in the rail. It boots
 * up line by line (staggered CSS reveal + a blinking cursor) and presents the
 * identity as shell commands: whoami, pwd, status, contact and resume.
 *
 * The prompt/command lines are decorative (aria-hidden); the outputs carry the
 * real content — including the site's sole <h1> (the whoami name) and the
 * genuine contact links — so nothing meaningful is lost to assistive tech.
 */
export function Terminal() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`

  return (
    <div className="term" aria-label="Profile">
      <div className="term__bar" aria-hidden="true">
        <span className="term__dot term__dot--close" />
        <span className="term__dot term__dot--min" />
        <span className="term__dot term__dot--max" />
        <span className="term__host">sowat@portfolio:~</span>
      </div>

      <div className="term__body">
        <p className="term__cmd" aria-hidden="true">
          whoami
        </p>
        <h1 className="term__name">{profile.name}</h1>
        <p className="term__role">{profile.titleLine}</p>

        <p className="term__cmd" aria-hidden="true">
          pwd
        </p>
        <p className="term__out">{profile.city}</p>

        <p className="term__cmd" aria-hidden="true">
          cat status.txt
        </p>
        <p className="term__out term__ok">{profile.availability}</p>

        <p className="term__cmd" aria-hidden="true">
          ls contact/
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
          open resume.pdf
        </p>
        <p className="term__out">
          <a className="term__link term__link--strong" href={resumeHref} download>
            ↓ resume.pdf
          </a>
        </p>
      </div>
    </div>
  )
}
