import { HeroScene } from './HeroScene'

/*
 * Hero band — a slim decorative banner holding the 3D animated green particle
 * sphere. The Bangladeshi flag is referenced only indirectly: green as the
 * dominant brand colour (the sphere and accents) with a restrained red wash in
 * the CSS background — never a literal flag, disc or map. Decorative
 * (aria-hidden); the real introduction is the terminal in the rail below. The
 * id keeps the header's "back to top" anchor working.
 */
export function Hero() {
  return (
    <section id="top" className="hero" aria-hidden="true">
      <HeroScene />
    </section>
  )
}
