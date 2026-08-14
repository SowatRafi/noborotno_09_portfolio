import { m } from 'framer-motion'
import { certifications } from '../data/certifications'
import { hoverLift, staggerContainer, staggerItem, staggerViewport } from '../lib/motion'
import { Chevron } from './Chevron'
import { ExternalLink } from './ExternalLink'
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
              {/* The accessible name leads with the visible text and only then
                  disambiguates — several of these will read identically in a
                  screen reader's link list otherwise, and a name that does not
                  contain its own label fails WCAG 2.5.3. */}
              {cert.credentialUrl !== undefined && (
                <ExternalLink
                  className="card__link cert__verify"
                  href={cert.credentialUrl}
                  aria-label={`Verify credential — ${cert.name}`}
                >
                  Verify credential
                  <Chevron />
                </ExternalLink>
              )}
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
