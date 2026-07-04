import { useEffect, useRef } from 'react'
import { createHeroScene } from '../webgl/heroScene'

/*
 * Mounts the WebGL particle sphere behind the hero. All imperative work lives
 * in createHeroScene; this component owns only the canvas and its lifecycle.
 * The canvas is decorative (aria-hidden) and inert (pointer-events: none in
 * CSS); if WebGL is unavailable the factory no-ops and the CSS backdrop shows.
 */
export function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (canvas === null) {
      return
    }
    const scene = createHeroScene(canvas)
    return () => scene.destroy()
  }, [])

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />
}
