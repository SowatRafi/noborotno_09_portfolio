import { m } from 'framer-motion'
import { publication } from '../data/publication'
import { hoverLift, staggerItem, staggerViewport } from '../lib/motion'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Publication() {
  return (
    <Section id="research" title="Research & Publication">
      <m.article
        className="card card--publication"
        variants={staggerItem}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
        whileHover={hoverLift}
      >
        <h3 className="card__title">{publication.title}</h3>
        <p className="publication__venue">
          {publication.venue} · {publication.date}
        </p>
        <p className="card__summary">{publication.summary}</p>
        <p className="publication__links">
          <ExternalLink className="card__link" href={publication.doiUrl}>
            DOI: {publication.doi}
          </ExternalLink>
          <ExternalLink className="card__link" href={publication.repoUrl}>
            Source on GitHub →
          </ExternalLink>
        </p>
      </m.article>
    </Section>
  )
}
