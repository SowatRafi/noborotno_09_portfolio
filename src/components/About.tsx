import { education } from '../data/education'
import { profile } from '../data/profile'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="about">
        <div className="about__summary">
          {profile.summary.map((paragraph) => (
            // The paragraph text is a stable, unique key here — content is
            // static data, so index keys would risk stale renders on edits.
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about__education">
          <h3 className="about__education-title">Education</h3>
          <ul className="about__education-list">
            {education.map((entry) => (
              <li key={entry.degree}>
                <p className="about__degree">{entry.degree}</p>
                <p className="about__institution">{entry.institution}</p>
                <p className="about__period">{entry.period}</p>
                {entry.detail !== undefined && <p className="about__detail">{entry.detail}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
