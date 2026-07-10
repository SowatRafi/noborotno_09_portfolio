import { m } from 'framer-motion'
import { experience } from '../data/experience'
import { staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      {/* An ordered list because the entries are chronological — the order is
          meaningful to screen readers, not just visual. */}
      <m.ol
        className="timeline"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
      >
        {experience.map((entry) => (
          <m.li
            className="timeline__item"
            key={`${entry.role}-${entry.period}`}
            variants={staggerItem}
          >
            <div className="timeline__header">
              <h3 className="timeline__role">{entry.role}</h3>
              <p className="timeline__meta">
                <span className="timeline__org">
                  {entry.organisation}
                  {entry.location !== undefined && `, ${entry.location}`}
                </span>
                <span className="timeline__period">{entry.period}</span>
              </p>
            </div>
            <ul className="timeline__highlights">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </m.li>
        ))}
      </m.ol>
    </Section>
  )
}
