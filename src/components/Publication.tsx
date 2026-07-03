import { publication } from '../data/publication'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Publication() {
  return (
    <Section id="research" title="Research & Publication">
      <article className="card card--publication">
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
      </article>
    </Section>
  )
}
