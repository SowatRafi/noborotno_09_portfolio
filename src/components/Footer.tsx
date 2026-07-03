import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/*
 * Contact deliberately lists email and professional profiles only — no phone
 * number. Anything published here is scraped within days; the phone number
 * stays on the resume PDF, which is handed out intentionally.
 */
export function Footer() {
  return (
    <footer id="contact" className="footer" aria-label="Contact">
      <div className="container">
        <h2 className="section__title">Contact</h2>
        <p className="footer__lead">
          The fastest way to reach me is email. I am based in Melbourne and open to
          relocation across Australia.
        </p>
        <ul className="footer__links">
          <li>
            <a className="footer__link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <ExternalLink className="footer__link" href={profile.linkedinUrl}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink className="footer__link" href={profile.githubUrl}>
              GitHub
            </ExternalLink>
          </li>
        </ul>
        <p className="footer__note">
          © {new Date().getFullYear()} {profile.name} · Built with React + Vite · No
          trackers, no analytics, no cookies.
        </p>
      </div>
    </footer>
  )
}
