import { projects } from '../data/projects'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="card-grid">
        {projects.map((project) => (
          <article className="card" key={project.name}>
            <h3 className="card__title">{project.name}</h3>
            {project.period !== undefined && (
              <p className="card__period">{project.period}</p>
            )}
            <ul className="tag-list tag-list--stack" aria-label="Technology stack">
              {project.stack.map((tech) => (
                <li className="tag tag--stack" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
            <ul className="card__points">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <ExternalLink
              className="card__link"
              href={project.repoUrl}
              aria-label={`View ${project.name} on GitHub`}
            >
              View on GitHub →
            </ExternalLink>
          </article>
        ))}
      </div>
    </Section>
  )
}
