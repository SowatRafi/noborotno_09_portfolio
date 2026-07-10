import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts (bundled by Vite, served from 'self' so the strict
// CSP font-src stays intact — no external Google Fonts request). font-display:
// swap is built in, so text renders immediately with the system fallback.
import '@fontsource-variable/ibm-plex-sans/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import App from './App'
import { themeManager } from './theme/ThemeManager'
import './styles/tokens.css'
import './styles/global.css'

/*
 * Apply any persisted theme override before React renders, so a returning
 * visitor who chose the non-system theme never sees the page flip themes.
 */
themeManager.init()

const rootElement = document.getElementById('root')
// Fail fast with a clear message rather than letting createRoot throw a
// generic error if index.html is ever restructured.
if (rootElement === null) {
  throw new Error('Root container #root is missing from index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
