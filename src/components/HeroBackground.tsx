import { useEffect, useRef } from 'react'
import { createNetworkGlobe } from '../webgl/networkGlobe'

/*
 * Mounts the hand-written WebGL network globe behind the hero. All the
 * imperative work lives in createNetworkGlobe; this component only owns the
 * canvas element and the create/destroy lifecycle. The canvas is decorative
 * (aria-hidden) and inert (pointer-events: none in CSS) — if WebGL is
 * unavailable the factory no-ops and the hero keeps its CSS gradient.
 */
export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (canvas === null) {
      return
    }
    const globe = createNetworkGlobe(canvas)
    return () => globe.destroy()
  }, [])

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />
}
