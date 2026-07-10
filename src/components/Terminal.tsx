import { useEffect, useState } from 'react'
import { m, MotionConfig } from 'framer-motion'
import { profile } from '../data/profile'
import { ExternalLink } from './ExternalLink'

/*
 * Animated bash-style terminal in the rail. It floats as a 3D card — a
 * continuous gentle tilt on the X and Y axes inside a perspective stage —
 * while a JS "operator" replays the session like a real person at a keyboard:
 * each command is typed with an uneven per-key cadence (occasionally slipping
 * onto a neighbouring key and backspacing to fix it), the cursor holds a beat
 * before Enter, the output prints, and after the last command an idle prompt
 * blinks for a while before `clear` is typed and the session replays. Every
 * pass draws fresh random timings, so no two loops look the same.
 *
 * Layout never shifts: every line is always in the flow and lines that the
 * session has not reached yet are only hidden with `visibility` (.is-hidden),
 * so the card keeps its full height through the clear/retype cycle.
 *
 * The prompt/command lines are decorative (aria-hidden); the outputs carry the
 * real content — including the whoami name echo and the genuine contact links
 * (all of which are also permanently available in the footer).
 */

/* The session script. `clear` is the loop point: it has no output and resets
   the screen. These strings are terminal chrome, not site content. */
const COMMANDS = ['whoami', 'pwd', 'cat status.txt', 'ls contact/', 'open resume.pdf', 'clear'] as const

/* A plausible adjacent key for each letter, so typos look like slips of the
   finger rather than random noise. */
const NEIGHBOUR_KEY: Readonly<Record<string, string>> = {
  a: 's', b: 'v', c: 'x', d: 'f', e: 'r', f: 'g', g: 'h', h: 'j', i: 'o',
  j: 'k', k: 'l', l: 'k', m: 'n', n: 'm', o: 'i', p: 'o', q: 'w', r: 't',
  s: 'd', t: 'y', u: 'i', v: 'b', w: 'e', x: 'c', y: 't', z: 'x',
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

interface ShellState {
  /** Index of the command currently at the prompt; lines before it are done. */
  readonly active: number
  /** What has been typed so far on the active line (may hold a typo briefly). */
  readonly typed: string
  /** Whether the active command has been "run" (its output printed). */
  readonly printed: boolean
}

const SESSION_START: ShellState = { active: 0, typed: '', printed: false }

export function Terminal() {
  const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`
  const [shell, setShell] = useState<ShellState>(SESSION_START)

  useEffect(() => {
    let cancelled = false

    /* One virtual keystroke → one state update; the guard after every await
       stops the loop dead when the component unmounts. */
    const runSession = async () => {
      await sleep(700)
      while (!cancelled) {
        for (let index = 0; index < COMMANDS.length && !cancelled; index += 1) {
          const command = COMMANDS[index]
          const isClear = command === 'clear'

          setShell({ active: index, typed: '', printed: false })
          /* Think at the fresh prompt — a long idle before `clear`, so the
             finished session stays readable for a while. */
          await sleep(isClear ? randomBetween(6500, 9500) : randomBetween(450, 1300))

          let typed = ''
          for (const key of command) {
            if (cancelled) return
            const slip = NEIGHBOUR_KEY[key]
            if (slip !== undefined && Math.random() < 0.06) {
              typed += slip
              setShell({ active: index, typed, printed: false })
              await sleep(randomBetween(230, 430))
              typed = typed.slice(0, -1)
              setShell({ active: index, typed, printed: false })
              await sleep(randomBetween(90, 190))
            }
            typed += key
            setShell({ active: index, typed, printed: false })
            /* Uneven cadence; a slightly longer beat when starting a new word. */
            await sleep(key === ' ' ? randomBetween(130, 260) : randomBetween(45, 145))
          }

          /* Hover over Enter, press it, let the command "run", then print. */
          await sleep(randomBetween(280, 650))
          if (cancelled) return
          setShell({ active: index, typed, printed: true })
          /* Read the output before moving to the next prompt. */
          await sleep(isClear ? randomBetween(300, 550) : randomBetween(750, 1500))
        }
      }
    }

    void runSession()
    return () => {
      cancelled = true
    }
  }, [])

  /* Everything the session has not reached yet keeps its space but stays
     invisible, so the card never changes height. */
  const cmdClass = (index: number, extra = '') => {
    const hidden = index > shell.active ? ' is-hidden' : ''
    return `term__cmd${extra}${hidden}`
  }
  const typedText = (index: number) =>
    index < shell.active ? COMMANDS[index] : index === shell.active ? shell.typed : ''
  const typedClass = (index: number) =>
    index === shell.active && !shell.printed ? 'term__typed term__typed--live' : 'term__typed'
  const outClass = (index: number, base: string) =>
    index < shell.active || (index === shell.active && shell.printed) ? base : `${base} is-hidden`

  return (
    <div className="term-stage">
      {/* reducedMotion="never" overrides the app-level "user" setting for this
          subtree only: the owner wants the terminal to keep floating even when
          the OS asks to reduce motion. Everything else still honours it. */}
      <MotionConfig reducedMotion="never">
        <m.div
          className="term"
          aria-label="Profile"
          animate={{ rotateY: [-6, 6, -6], rotateX: [3, -3, 3] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        >
          <div className="term__bar" aria-hidden="true">
        <span className="term__dot term__dot--close" />
        <span className="term__dot term__dot--min" />
        <span className="term__dot term__dot--max" />
        <span className="term__host">sowat@portfolio:~</span>
      </div>

      <div className="term__body">
        <p className={cmdClass(0)} aria-hidden="true">
          <span className={typedClass(0)}>{typedText(0)}</span>
        </p>
        {/* The sole <h1> lives in the hero; this is a styled echo, not a heading. */}
        <p className={outClass(0, 'term__name')}>{profile.name}</p>
        <p className={outClass(0, 'term__role')}>{profile.titleLine}</p>

        <p className={cmdClass(1)} aria-hidden="true">
          <span className={typedClass(1)}>{typedText(1)}</span>
        </p>
        <p className={outClass(1, 'term__out')}>{profile.city}</p>

        <p className={cmdClass(2)} aria-hidden="true">
          <span className={typedClass(2)}>{typedText(2)}</span>
        </p>
        <p className={outClass(2, 'term__out term__ok')}>{profile.availability}</p>

        <p className={cmdClass(3)} aria-hidden="true">
          <span className={typedClass(3)}>{typedText(3)}</span>
        </p>
        <p className={outClass(3, 'term__out term__links')}>
          <ExternalLink className="term__link" href={profile.githubUrl}>
            github
          </ExternalLink>
          <ExternalLink className="term__link" href={profile.linkedinUrl}>
            linkedin
          </ExternalLink>
          <a className="term__link" href={`mailto:${profile.email}`}>
            email
          </a>
        </p>

        <p className={cmdClass(4)} aria-hidden="true">
          <span className={typedClass(4)}>{typedText(4)}</span>
        </p>
        <p className={outClass(4, 'term__out')}>
          <a className="term__link term__link--strong" href={resumeHref} download>
            ↓ resume.pdf
          </a>
        </p>

        <p className={cmdClass(5)} aria-hidden="true">
          <span className={typedClass(5)}>{typedText(5)}</span>
        </p>
        </div>
      </m.div>
      </MotionConfig>
    </div>
  )
}
