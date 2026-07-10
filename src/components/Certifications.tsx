import { m } from 'framer-motion'
import { certifications } from '../data/certifications'
import { hoverLift, staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
import { Section } from './Section'

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <m.ul
        className="cert-list"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
      >
        {certifications.map((cert) => (
          <m.li className="cert" key={cert.name} variants={staggerItem} whileHover={hoverLift}>
            <div className="cert__main">
              <h3 className="cert__name">{cert.name}</h3>
              <p className="cert__issuer">{cert.issuer}</p>
              {cert.topics !== undefined && <p className="cert__topics">{cert.topics}</p>}
            </div>
            {/* In-progress items are marked explicitly — claiming an unfinished
                certification as done would undermine the whole portfolio. */}
            <span
              className={`badge ${cert.status === 'completed' ? 'badge--done' : 'badge--progress'}`}
            >
              {cert.status === 'completed' ? 'Completed' : `In progress — ${cert.expected ?? 'TBC'}`}
            </span>
          </m.li>
        ))}
      </m.ul>
    </Section>
  )
}
