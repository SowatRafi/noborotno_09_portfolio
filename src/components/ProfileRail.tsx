import { profile } from '../data/profile'
import { Terminal } from './Terminal'

/*
 * Persistent profile rail. On desktop it is sticky, so the single portrait and
 * the animated terminal stay visible while the visitor scrolls through every
 * section; on narrow screens it becomes a normal block at the top of the
 * content and the sticky header keeps navigation reachable.
 *
 * This holds the site's one and only photo; the terminal holds the sole <h1>.
 */
export function ProfileRail() {
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

      <Terminal />
    </aside>
  )
}
