import { certifications } from '../data/certifications'
import { projects } from '../data/projects'
import { publication } from '../data/publication'

/*
 * SOC-console telemetry strip under the hero: a sweeping radar, a LIVE badge
 * and a scrolling feed of log-style lines. Every line is derived from the
 * typed content files — nothing here is invented, it is the site's real
 * content re-presented as console output. The strip is pure decoration
 * (everything it says appears properly in the sections below), so it is
 * aria-hidden to avoid duplicate announcements, and the marquee only moves
 * for visitors who allow motion.
 */
const feedLines: readonly string[] = [
  ...projects.map((project) => `[project] ${project.name}`),
  ...certifications.map(
    (cert) =>
      `[cert] ${cert.name} — ${cert.status === 'completed' ? 'completed' : (cert.expected ?? 'in progress')}`,
  ),
  `[research] ${publication.title} — ${publication.date}`,
]

export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <div className="statusbar__radar">
        <span className="statusbar__sweep" />
      </div>
      <span className="statusbar__live">
        <span className="statusbar__led" /> LIVE
      </span>
      <div className="statusbar__feed">
        {/* The track holds the list twice so the loop wraps seamlessly. */}
        <div className="statusbar__track">
          {[0, 1].map((copy) => (
            <ul className="statusbar__list" key={copy}>
              {feedLines.map((line) => (
                <li className="statusbar__item" key={line}>
                  {line}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
