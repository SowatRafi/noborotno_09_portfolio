/*
 * Hand-written WebGL for the hero background: a slowly rotating sphere of
 * network nodes joined by mesh links — a "global threat map" motif that fits a
 * SOC / AI security portfolio. This is deliberately dependency-free (no
 * three.js): the whole engine is a few kilobytes, so it never slows first
 * paint, and `npm audit` stays at zero — part of the clean-dependency message
 * of the site.
 *
 * All imperative WebGL / requestAnimationFrame / DOM-listener state is
 * encapsulated behind one factory that returns a `destroy()` handle, mirroring
 * how ThemeManager isolates theme side-effects. The React layer only creates
 * and tears this down; it never touches WebGL directly.
 *
 * Guarantees the rest of the site relies on:
 *   - No WebGL support         → factory no-ops, hero keeps its CSS gradient.
 *   - prefers-reduced-motion   → one static frame, no animation loop.
 *   - Scrolled away / tab hidden → loop is paused (battery + main-thread).
 *   - Colours follow the theme  → read from CSS variables, refreshed on toggle.
 */

export interface NetworkGlobeHandle {
  destroy(): void
}

/* --- minimal column-major mat4 helpers (WebGL memory order) --------------- */

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

/* --- colour: read CSS custom properties so the scene follows the theme ---- */

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

/* --- shaders -------------------------------------------------------------- */

const NODE_VS = `
attribute vec3 aPos;
uniform mat4 uMVP;
uniform float uSize;
uniform float uCap;
varying float vFront;
void main() {
  vec4 p = uMVP * vec4(aPos, 1.0);
  gl_Position = p;
  gl_PointSize = clamp(uSize / max(p.w, 0.1), 1.0, uCap);
  // 1.0 on the near face of the sphere, 0.0 on the far face.
  vFront = clamp((1.0 - p.z / p.w) * 0.5, 0.0, 1.0);
}`

const NODE_FS = `
precision mediump float;
uniform vec3 uColor;
varying float vFront;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;
  float edge = smoothstep(0.25, 0.02, r2);
  float depth = mix(0.5, 1.0, vFront);
  gl_FragColor = vec4(uColor, edge * depth);
}`

const LINE_VS = `
attribute vec3 aPos;
uniform mat4 uMVP;
varying float vFront;
void main() {
  vec4 p = uMVP * vec4(aPos, 1.0);
  gl_Position = p;
  vFront = clamp((1.0 - p.z / p.w) * 0.5, 0.0, 1.0);
}`

const LINE_FS = `
precision mediump float;
uniform vec3 uColor;
varying float vFront;
void main() {
  gl_FragColor = vec4(uColor, mix(0.1, 0.5, vFront));
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

/* --- geometry ------------------------------------------------------------- */

const NODE_COUNT = 900
const LINE_COUNT = 260
const DIST = 3.2 // camera distance; sphere radius is 1
const BASE_TILT = 0.42 // radians — a flattering fixed viewing angle

function buildNodes(): Float32Array {
  const positions = new Float32Array(NODE_COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * golden
    positions[i * 3] = Math.cos(theta) * radius
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(theta) * radius
  }
  return positions
}

/* Connect each link's endpoint to the nearest of a few random candidates, so
   the mesh reads as short local connections rather than long random chords. */
function buildLines(nodes: Float32Array): Float32Array {
  const lines = new Float32Array(LINE_COUNT * 2 * 3)
  for (let i = 0; i < LINE_COUNT; i++) {
    const a = (Math.random() * NODE_COUNT) | 0
    let b = a
    let best = Infinity
    for (let t = 0; t < 12; t++) {
      const cand = (Math.random() * NODE_COUNT) | 0
      if (cand === a) {
        continue
      }
      const dx = nodes[a * 3] - nodes[cand * 3]
      const dy = nodes[a * 3 + 1] - nodes[cand * 3 + 1]
      const dz = nodes[a * 3 + 2] - nodes[cand * 3 + 2]
      const d = dx * dx + dy * dy + dz * dz
      if (d < best) {
        best = d
        b = cand
      }
    }
    const o = i * 6
    lines[o] = nodes[a * 3]
    lines[o + 1] = nodes[a * 3 + 1]
    lines[o + 2] = nodes[a * 3 + 2]
    lines[o + 3] = nodes[b * 3]
    lines[o + 4] = nodes[b * 3 + 1]
    lines[o + 5] = nodes[b * 3 + 2]
  }
  return lines
}

/* --- factory -------------------------------------------------------------- */

export function createNetworkGlobe(canvas: HTMLCanvasElement): NetworkGlobeHandle {
  const context = canvas.getContext('webgl', {
    antialias: true,
    alpha: true,
    premultipliedAlpha: false,
    depth: false,
  })
  if (context === null) {
    return { destroy() {} }
  }
  // Bind to an explicitly non-null local so the narrowing holds inside the
  // render/resize closures below (TS does not carry it in otherwise).
  const gl: WebGLRenderingContext = context

  const nodeProgram = link(gl, NODE_VS, NODE_FS)
  const lineProgram = link(gl, LINE_VS, LINE_FS)
  if (nodeProgram === null || lineProgram === null) {
    return { destroy() {} }
  }

  const nodes = buildNodes()
  const lines = buildLines(nodes)

  const nodeBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, nodes, gl.STATIC_DRAW)

  const lineBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)

  const nodeLoc = {
    pos: gl.getAttribLocation(nodeProgram, 'aPos'),
    mvp: gl.getUniformLocation(nodeProgram, 'uMVP'),
    color: gl.getUniformLocation(nodeProgram, 'uColor'),
    size: gl.getUniformLocation(nodeProgram, 'uSize'),
    cap: gl.getUniformLocation(nodeProgram, 'uCap'),
  }
  const lineLoc = {
    pos: gl.getAttribLocation(lineProgram, 'aPos'),
    mvp: gl.getUniformLocation(lineProgram, 'uMVP'),
    color: gl.getUniformLocation(lineProgram, 'uColor'),
  }

  gl.disable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  let projection = perspective(Math.PI / 4, 1, 0.1, 100)

  let nodeColor = new Float32Array(cssColor('--accent', [0.176, 0.831, 0.749]))
  let lineColor = new Float32Array(cssColor('--brand-blue', [0, 0.275, 0.549]))

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // pointer parallax (current + eased target); disabled under reduced motion
  let px = 0
  let py = 0
  let tx = 0
  let ty = 0
  let spin = 0
  let last = performance.now()
  let raf = 0
  let running = false

  function render(): void {
    const model = multiply(rotationX(BASE_TILT + py * 0.28), rotationY(spin + px * 0.5))
    const view = translation(0, 0, -DIST)
    const mvp = multiply(projection, multiply(view, model))

    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(lineProgram)
    gl.uniformMatrix4fv(lineLoc.mvp, false, mvp)
    gl.uniform3fv(lineLoc.color, lineColor)
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
    gl.enableVertexAttribArray(lineLoc.pos)
    gl.vertexAttribPointer(lineLoc.pos, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.LINES, 0, LINE_COUNT * 2)

    gl.useProgram(nodeProgram)
    gl.uniformMatrix4fv(nodeLoc.mvp, false, mvp)
    gl.uniform3fv(nodeLoc.color, nodeColor)
    gl.uniform1f(nodeLoc.size, 11.0 * dpr)
    gl.uniform1f(nodeLoc.cap, 8.0 * dpr)
    gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer)
    gl.enableVertexAttribArray(nodeLoc.pos)
    gl.vertexAttribPointer(nodeLoc.pos, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.POINTS, 0, NODE_COUNT)
  }

  function frame(now: number): void {
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    spin += dt * 0.16
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
    gl.viewport(0, 0, w, h)
    projection = perspective(Math.PI / 4, w / h, 0.1, 100)
    // Repaint immediately so a resize while paused (or under reduced motion)
    // never shows a stale or blank frame.
    render()
  }

  function refreshColors(): void {
    nodeColor = new Float32Array(cssColor('--accent', [0.176, 0.831, 0.749]))
    lineColor = new Float32Array(cssColor('--brand-blue', [0, 0.275, 0.549]))
    if (!running) {
      render()
    }
  }

  function onPointerMove(event: PointerEvent): void {
    tx = (event.clientX / window.innerWidth - 0.5) * 2
    ty = (event.clientY / window.innerHeight - 0.5) * 2
  }

  // Pause the loop whenever the hero is off-screen or the tab is hidden.
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

  const themeObserver = new MutationObserver(refreshColors)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const systemScheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemScheme.addEventListener('change', refreshColors)
  document.addEventListener('visibilitychange', onVisibility)
  if (!reduceMotion.matches) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  resize() // sizes the drawing buffer and paints the first frame

  return {
    destroy() {
      stop()
      inView.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      systemScheme.removeEventListener('change', refreshColors)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteBuffer(nodeBuffer)
      gl.deleteBuffer(lineBuffer)
      gl.deleteProgram(nodeProgram)
      gl.deleteProgram(lineProgram)
    },
  }
}
