import { m } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
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
        {/* No whileHover on the groups. The lift existed to raise a card off
            the page; with the card gone it would just jog the title and chips
            upward against a static background, which reads as a glitch rather
            than a response. */}
        {skillGroups.map((group) => (
          <m.div className="skill-group" key={group.title} variants={staggerItem}>
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
