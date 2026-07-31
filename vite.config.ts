import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * GitHub Pages serves project sites from https://<user>.github.io/<repo>/, so
 * every asset URL must be prefixed with the repository name.
 *
 * Switching to a custom domain later: a custom domain serves the site from the
 * domain root, so change BASE_PATH to '/' (and update the absolute links in
 * public/404.html and the canonical/OG URLs in index.html to match).
 */
const BASE_PATH = '/noborotno_09_portfolio/'

/*
 * Content-Security-Policy is injected at build time only, because the Vite dev
 * server and the React fast-refresh preamble rely on inline scripts and styles
 * that a strict policy would block. GitHub Pages cannot set HTTP response
 * headers, so a <meta> tag is the only delivery mechanism available; directives
 * that are ignored in <meta> form (e.g. frame-ancestors) are deliberately
 * omitted to keep the policy honest.
 *
 * The policy itself is strict: no inline scripts or styles are allowed, which
 * neutralises most XSS payloads even if one ever found an injection point.
 * The production bundle satisfies this because Vite emits external .js/.css
 * files only — the served HTML carries no inline <script>/<style> or style
 * attributes.
 *
 * Framer Motion animates by setting each element's styles through the CSSOM
 * (element.style.*) at runtime. That is NOT an HTML inline style, so CSP's
 * style-src does not govern it — the policy stays 'self' with no
 * 'unsafe-inline', and still blocks any inline style/script an attacker tries
 * to inject via markup. The clean-audit and strict-CSP guarantees hold.
 */
const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

/*
 * The two webfonts are discovered only after the browser has downloaded and
 * parsed the stylesheet that declares them, so the text of the hero (the LCP
 * element) waits on a two-step request chain and then reflows when the real
 * font swaps in. Preloading starts both downloads alongside the stylesheet
 * instead of after it.
 *
 * Only the `latin` subsets are preloaded: the other subsets are gated behind
 * unicode-range and this site's copy never reaches for them, so preloading
 * those would download bytes the page will not use. The filenames carry a
 * content hash, so they are read out of the emitted bundle rather than
 * hard-coded.
 */
const PRELOADED_FONT = /-latin-wght-normal-[\w-]+\.woff2$/

function preloadFontsAtBuild(): PluginOption {
  return {
    name: 'preload-latin-fonts',
    apply: 'build',
    // Runs before the CSP plugin so that its own head-prepend lands on top and
    // the policy stays the very first thing in <head>.
    enforce: 'pre',
    transformIndexHtml(_html, ctx) {
      const fonts = Object.keys(ctx.bundle ?? {}).filter((file) => PRELOADED_FONT.test(file))
      return fonts.map((file) => ({
        tag: 'link',
        attrs: {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: `${BASE_PATH}${file}`,
          // Fonts are always fetched in CORS mode, even same-origin ones; a
          // preload without this flag is discarded and fetched a second time.
          crossorigin: '',
        },
        injectTo: 'head-prepend',
      }))
    },
  }
}

function injectCspAtBuild(): PluginOption {
  return {
    name: 'inject-csp-meta',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP_POLICY },
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), preloadFontsAtBuild(), injectCspAtBuild()],
  build: {
    // Fail loudly if the bundle ever grows past what a content site needs —
    // a lean bundle is part of the Lighthouse performance budget.
    chunkSizeWarningLimit: 250,
    /*
     * Never inline an asset as a data: URI. Vite's default is to inline
     * anything under 4 kB, which silently swallowed one small font subset
     * (JetBrains Mono cyrillic-ext) into the stylesheet as base64 — and
     * `font-src 'self'` blocks data: fonts, so the browser logged a CSP
     * violation on every page load. Emitting every asset as a real file keeps
     * the strict policy intact and keeps the render-blocking CSS lean.
     */
    assetsInlineLimit: 0,
  },
})
