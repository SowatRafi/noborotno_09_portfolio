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
  plugins: [react(), injectCspAtBuild()],
  build: {
    // Fail loudly if the bundle ever grows past what a content site needs —
    // a lean bundle is part of the Lighthouse performance budget.
    chunkSizeWarningLimit: 250,
  },
})
