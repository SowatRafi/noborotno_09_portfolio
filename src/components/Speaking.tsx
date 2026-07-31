import { m } from 'framer-motion'
import { speaking } from '../data/speaking'
import { hoverLift, staggerItem, staggerViewport } from '../lib/motion'
import { Chevron } from './Chevron'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

/*
 * Same single-card shape as Publication, reusing .card / .badge / .card__link
 * rather than inventing a second card language for one entry.
 */
export function Speaking() {
  /* The badge must not still read "Upcoming" months after the room has packed
     up, so it is derived rather than written down. A stale claim on a page
     whose whole job is to be verifiable is worse than no claim. */
  const upcoming = new Date(speaking.startIso).getTime() > Date.now()

  return (
    <Section id="speaking" title="Speaking">
      <m.article
        className="card card--publication"
        variants={staggerItem}
        initial="hidden"
        whileInView="show"
        viewport={staggerViewport}
        whileHover={hoverLift}
      >
        <div className="speaking__head">
          <div>
            <h3 className="card__title">{speaking.session}</h3>
            <p className="publication__venue">
              {speaking.role} · {speaking.event}
            </p>
          </div>
          <span className={`badge ${upcoming ? 'badge--progress' : 'badge--done'}`}>
            {upcoming ? 'Upcoming' : 'Presented'}
          </span>
        </div>

        {/* Real spaces around the separator rather than an aria-hidden span:
            hiding it would run "AEST" straight into "Melbourne" for a screen
            reader, since removing the element removes its whitespace too. */}
        <p className="speaking__when">
          <time dateTime={speaking.startIso}>{speaking.dateLabel}</time>
          {' · '}
          {speaking.location}
        </p>

        <p className="card__summary">{speaking.summary}</p>

        <p className="speaking__cta">
          <ExternalLink className="card__link" href={speaking.ticketUrl}>
            Event details &amp; tickets
            <Chevron />
          </ExternalLink>
          {/* The code is shown for transparency, not to be copied — the link
              above already carries it as a query parameter. */}
          <span className="speaking__discount">
            {speaking.discountNote}: <code className="speaking__code">{speaking.discountCode}</code>
          </span>
        </p>
      </m.article>
    </Section>
  )
}
