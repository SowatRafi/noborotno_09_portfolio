import { m } from 'framer-motion'
import { projects } from '../data/projects'
import { hoverLift, staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <m.div
        className="card-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
      >
        {projects.map((project) => (
          <m.article
            className="card"
            key={project.name}
            variants={staggerItem}
            whileHover={hoverLift}
          >
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
          </m.article>
        ))}
      </m.div>
    </Section>
  )
}
