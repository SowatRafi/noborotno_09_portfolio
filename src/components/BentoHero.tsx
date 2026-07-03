import { certifications } from '../data/certifications'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { ExternalLink } from './ExternalLink'
import { HeroBackground } from './HeroBackground'

/*
 * Bento-grid landing: instead of a linear hero, the whole story is surfaced at
 * a glance as an asymmetric grid of tiles — identity, portrait, a live WebGL
 * threat globe, key stats, current role and calls to action. The tile spans and
 * reflow live in the CSS grid (.bento); this component only supplies content.
 *
 * The stat tiles are DERIVED from the typed data files (counts of skill areas,
 * certifications and projects, plus the publication venue) — nothing here is
 * invented, so the numbers can never drift from the real content.
 */
export function BentoHero() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`
  const portraitHref = `${import.meta.env.BASE_URL}${profile.portraitFile}`
  const current = experience[0]

  const stats: readonly { readonly value: string; readonly label: string }[] = [
    { value: String(skillGroups.length), label: 'Capability areas' },
    { value: String(certifications.length), label: 'Certifications' },
    { value: String(projects.length), label: 'Security projects' },
    { value: 'IEEE', label: 'Published author' },
  ]

  return (
    <section id="top" className="bento" aria-label="Introduction">
      <div className="tile tile--id">
        <p className="tile__kicker">
          <span className="hero__prompt" aria-hidden="true">
            ~$
          </span>{' '}
          whoami
        </p>
        <h1 className="tile__name">{profile.name}</h1>
        <p className="tile__title">{profile.titleLine}</p>
        <p className="tile__loc">
          <span className="tile__led" aria-hidden="true" />
          {profile.location}
        </p>
      </div>

      <figure className="tile tile--photo hud">
        <div className="hud__frame">
          <img
            className="hud__img"
            src={portraitHref}
            alt={profile.portraitAlt}
            width="640"
            height="800"
            decoding="async"
          />
          <span className="hud__scan" aria-hidden="true" />
          <span className="hud__corner hud__corner--tl" aria-hidden="true" />
          <span className="hud__corner hud__corner--tr" aria-hidden="true" />
          <span className="hud__corner hud__corner--bl" aria-hidden="true" />
          <span className="hud__corner hud__corner--br" aria-hidden="true" />
        </div>
      </figure>

      <div className="tile tile--globe">
        <HeroBackground />
        <span className="tile__badge" aria-hidden="true">
          <span className="tile__led" /> live threat map
        </span>
      </div>

      {/*
       * Decorative terminal session, kept from the previous design as its own
       * tile. Commands "type" via CSS steps animations; outputs print in turn.
       * aria-hidden keeps the theatre out of the accessibility tree.
       */}
      <div className="tile tile--term" aria-hidden="true">
        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--close" />
            <span className="terminal__dot terminal__dot--min" />
            <span className="terminal__dot terminal__dot--max" />
            <span className="terminal__host">sowat@soc-melbourne:~</span>
          </div>
          <div className="terminal__body">
            <p className="terminal__line">
              <span className="hero__prompt">~$</span>{' '}
              <span className="terminal__cmd terminal__cmd--one">whoami</span>
            </p>
            <p className="terminal__line terminal__out terminal__out--one">sowat.rafi</p>
            <p className="terminal__line terminal__row--two">
              <span className="hero__prompt">~$</span>{' '}
              <span className="terminal__cmd terminal__cmd--two">cat status.log</span>
            </p>
            <p className="terminal__line terminal__out terminal__out--two">
              <span className="terminal__ok">[ OK ]</span> open to SOC &amp; AI security roles
            </p>
            <p className="terminal__line terminal__out terminal__out--three terminal__line--cursor">
              <span className="terminal__ok">[ OK ]</span> available to relocate anywhere in the
              world
            </p>
          </div>
        </div>
      </div>

      <div className="tile tile--stats">
        <ul className="stats">
          {stats.map((stat) => (
            <li className="stats__item" key={stat.label}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tile tile--current">
        <p className="tile__eyebrow">Currently</p>
        <p className="tile__role">{current.role}</p>
        <p className="tile__org">{current.organisation}</p>
        <p className="tile__period">{current.period}</p>
      </div>

      <div className="tile tile--cta">
        <a className="btn btn--primary" href={resumeHref} download>
          Download Resume
        </a>
        <ExternalLink className="btn" href={profile.githubUrl}>
          GitHub
        </ExternalLink>
        <ExternalLink className="btn" href={profile.linkedinUrl}>
          LinkedIn
        </ExternalLink>
        <a className="btn" href={`mailto:${profile.email}`}>
          Email
        </a>
      </div>
    </section>
  )
}
