import { HeroScene } from './HeroScene'

/*
 * Hero band — a purely visual banner. The 3D animated green particle sphere
 * (WebGL) is the "green field"; the stationary red disc bearing a yellow
 * Bangladesh silhouette is the "red circle" of the 1971 flag. Together they
 * evoke the Bangladeshi flag as an emblem. The band is decorative (aria-hidden)
 * — the real introduction is the terminal in the rail just below. The id keeps
 * the header's "back to top" anchor working.
 */
export function Hero() {
  return (
    <section id="top" className="hero" aria-hidden="true">
      <HeroScene />
      <svg className="flagmark" viewBox="0 0 100 100" role="presentation">
        <circle className="flagmark__circle" cx="50" cy="50" r="46" />
        {/* Stylised silhouette of Bangladesh — an emblem, not a survey map. */}
        <path
          className="flagmark__map"
          d="M41 23 L53 21 L56 28 L64 27 L62 36 L68 41 L62 48 L67 57 L59 61 L63 70 L55 69 L57 79 L49 75 L45 83 L41 74 L34 77 L37 66 L30 60 L38 54 L32 45 L40 41 L35 32 L43 32 Z"
        />
      </svg>
    </section>
  )
}
