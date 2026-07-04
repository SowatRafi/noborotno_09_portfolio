/*
 * Hand-written WebGL for the hero: an abstract, slowly rotating sphere of green
 * particles — the "green field" half of a Bangladeshi-flag-inspired palette,
 * rendered as a professional 3D form rather than any literal flag. The red
 * "circle" half is a CSS orb layered in front (see .hero__orb).
 *
 * Dependency-free (no three.js): a few kilobytes, so first paint is never
 * blocked and `npm audit` stays at zero. All imperative WebGL / rAF / DOM state
 * is encapsulated behind one factory returning a destroy() handle.
 *
 * Guarantees: no-op without WebGL (CSS backdrop remains); one static frame
 * under prefers-reduced-motion; the loop pauses when the hero is off-screen or
 * the tab is hidden; DPR is capped; the particle count scales down on small
 * screens; the colour follows the theme's --accent.
 */

export interface HeroSceneHandle {
  destroy(): void
}

type Mat4 = Float32Array

function perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2)
  const nf = 1 / (near - far)
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ])
}

function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16)
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let sum = 0
      for (let k = 0; k < 4; k++) {
        sum += a[k * 4 + r] * b[c * 4 + k]
      }
      out[c * 4 + r] = sum
    }
  }
  return out
}

function rotationX(a: number): Mat4 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  // prettier-ignore
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
}

function rotationY(a: number): Mat4 {
  const c = Math.cos(a)
  const s = Math.sin(a)
  // prettier-ignore
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1])
}

function translation(x: number, y: number, z: number): Mat4 {
  // prettier-ignore
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1])
}

type RGB = readonly [number, number, number]

function parseColor(input: string, fallback: RGB): RGB {
  const s = input.trim()
  if (s.startsWith('#')) {
    const hex = s.length === 4 ? s[1] + s[1] + s[2] + s[2] + s[3] + s[3] : s.slice(1)
    const int = Number.parseInt(hex, 16)
    if (Number.isNaN(int)) {
      return fallback
    }
    return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
  }
  const nums = s.match(/-?\d*\.?\d+/g)
  if (nums !== null && nums.length >= 3) {
    return [Number(nums[0]) / 255, Number(nums[1]) / 255, Number(nums[2]) / 255]
  }
  return fallback
}

function cssColor(name: string, fallback: RGB): RGB {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name)
  return parseColor(value, fallback)
}

const VS = `
attribute vec3 aPos;
uniform mat4 uMVP;
uniform float uSize;
uniform float uCap;
varying float vFront;
void main() {
  vec4 p = uMVP * vec4(aPos, 1.0);
  gl_Position = p;
  gl_PointSize = clamp(uSize / max(p.w, 0.1), 1.0, uCap);
  vFront = clamp((1.0 - p.z / p.w) * 0.5, 0.0, 1.0);
}`

const FS = `
precision mediump float;
uniform vec3 uColor;
varying float vFront;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;
  float edge = smoothstep(0.25, 0.02, r2);
  gl_FragColor = vec4(uColor, edge * mix(0.35, 1.0, vFront));
}`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (shader === null) {
    return null
  }
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function link(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string): WebGLProgram | null {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc)
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc)
  if (vs === null || fs === null) {
    return null
  }
  const program = gl.createProgram()
  if (program === null) {
    return null
  }
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

const DIST = 2.8
const BASE_TILT = 0.42

/* Fewer particles on small screens keeps the phone GPU and battery happy. */
function nodeCount(): number {
  return window.innerWidth < 640 ? 380 : 820
}

function buildNodes(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * golden
    positions[i * 3] = Math.cos(theta) * radius
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(theta) * radius
  }
  return positions
}

export function createHeroScene(canvas: HTMLCanvasElement): HeroSceneHandle {
  const context = canvas.getContext('webgl', {
    antialias: true,
    alpha: true,
    premultipliedAlpha: false,
    depth: false,
  })
  if (context === null) {
    return { destroy() {} }
  }
  const gl: WebGLRenderingContext = context

  const program = link(gl, VS, FS)
  if (program === null) {
    return { destroy() {} }
  }

  let count = nodeCount()
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, buildNodes(count), gl.STATIC_DRAW)

  const loc = {
    pos: gl.getAttribLocation(program, 'aPos'),
    mvp: gl.getUniformLocation(program, 'uMVP'),
    color: gl.getUniformLocation(program, 'uColor'),
    size: gl.getUniformLocation(program, 'uSize'),
    cap: gl.getUniformLocation(program, 'uCap'),
  }

  gl.disable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  let projection = perspective(Math.PI / 4, 1, 0.1, 100)
  let color = new Float32Array(cssColor('--accent', [0.063, 0.725, 0.506]))

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  let px = 0
  let py = 0
  let tx = 0
  let ty = 0
  let spin = 0
  let last = performance.now()
  let raf = 0
  let running = false

  function render(): void {
    const model = multiply(rotationX(BASE_TILT + py * 0.25), rotationY(spin + px * 0.45))
    const view = translation(0, 0, -DIST)
    const mvp = multiply(projection, multiply(view, model))

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.uniformMatrix4fv(loc.mvp, false, mvp)
    gl.uniform3fv(loc.color, color)
    gl.uniform1f(loc.size, 10.0 * dpr)
    gl.uniform1f(loc.cap, 7.0 * dpr)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(loc.pos)
    gl.vertexAttribPointer(loc.pos, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.POINTS, 0, count)
  }

  function frame(now: number): void {
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    spin += dt * 0.14
    px += (tx - px) * 0.05
    py += (ty - py) * 0.05
    render()
    raf = requestAnimationFrame(frame)
  }

  function start(): void {
    if (running || reduceMotion.matches) {
      return
    }
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  function stop(): void {
    running = false
    if (raf !== 0) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  function resize(): void {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    // Rebuild the particle set if the screen crossed the small/large threshold.
    const next = nodeCount()
    if (next !== count) {
      count = next
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, buildNodes(count), gl.STATIC_DRAW)
    }
    gl.viewport(0, 0, w, h)
    projection = perspective(Math.PI / 4, w / h, 0.1, 100)
    render()
  }

  function refreshColor(): void {
    color = new Float32Array(cssColor('--accent', [0.063, 0.725, 0.506]))
    if (!running) {
      render()
    }
  }

  function onPointerMove(event: PointerEvent): void {
    tx = (event.clientX / window.innerWidth - 0.5) * 2
    ty = (event.clientY / window.innerHeight - 0.5) * 2
  }

  const inView = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !document.hidden) {
          start()
        } else {
          stop()
        }
      }
    },
    { threshold: 0 },
  )
  inView.observe(canvas)

  function onVisibility(): void {
    if (document.hidden) {
      stop()
    } else {
      start()
    }
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)

  const themeObserver = new MutationObserver(refreshColor)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const systemScheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemScheme.addEventListener('change', refreshColor)
  document.addEventListener('visibilitychange', onVisibility)
  if (!reduceMotion.matches) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  resize()

  return {
    destroy() {
      stop()
      inView.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      systemScheme.removeEventListener('change', refreshColor)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}
