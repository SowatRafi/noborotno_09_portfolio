import { useEffect, useState } from 'react'

/*
 * Types a line of text ONCE with a human keystroke feel — uneven per-key
 * cadence and the occasional slip onto a neighbouring key that gets
 * backspaced and corrected. The owner explicitly wants a single typing pass
 * (not a loop), with the red-disc cursor left blinking afterwards. Same
 * treatment as the rail terminal, and like the terminal it deliberately
 * ignores prefers-reduced-motion: the owner wants these small, localised
 * text reveals alive on every device (his own OS has Reduce Motion on).
 */

/* A plausible adjacent key per letter/digit, so typos look like slips of the
   finger. Lookups are case-insensitive; the slip re-uses the intended case. */
const NEIGHBOUR_KEY: Readonly<Record<string, string>> = {
  a: 's', b: 'v', c: 'x', d: 'f', e: 'r', f: 'g', g: 'h', h: 'j', i: 'o',
  j: 'k', k: 'l', l: 'k', m: 'n', n: 'm', o: 'i', p: 'o', q: 'w', r: 't',
  s: 'd', t: 'y', u: 'i', v: 'b', w: 'e', x: 'c', y: 't', z: 'x',
  '0': '9', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7',
  '7': '8', '8': '9', '9': '0',
}

const neighbourOf = (key: string): string | undefined => {
  const slip = NEIGHBOUR_KEY[key.toLowerCase()]
  if (slip === undefined) return undefined
  return key === key.toUpperCase() ? slip.toUpperCase() : slip
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export function useHumanTyped(text: string): string {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      /* Let the hero settle before the "operator" starts typing. */
      await sleep(900)
      let current = ''
      for (const key of text) {
        if (cancelled) return
        const slip = neighbourOf(key)
        if (slip !== undefined && Math.random() < 0.05) {
          current += slip
          setTyped(current)
          await sleep(randomBetween(230, 430))
          current = current.slice(0, -1)
          setTyped(current)
          await sleep(randomBetween(90, 190))
        }
        current += key
        setTyped(current)
        await sleep(key === ' ' ? randomBetween(130, 260) : randomBetween(50, 150))
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [text])

  return typed
}
