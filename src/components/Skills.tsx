import { m } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { hoverLift, staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
import { Section } from './Section'

/*
 * Skills render as scannable tag groups rather than progress bars: percentage
 * bars imply a precision that does not exist and read as filler to technical
 * recruiters, whereas grouped tags mirror the resume and scan in seconds.
 */
export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <m.div
        className="skills-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
      >
        {skillGroups.map((group) => (
          <m.div
            className="skill-group"
            key={group.title}
            variants={staggerItem}
            whileHover={hoverLift}
          >
            <h3 className="skill-group__title">{group.title}</h3>
            <ul className="tag-list">
              {group.skills.map((skill) => (
                <li className="tag" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </m.div>
    </Section>
  )
}
