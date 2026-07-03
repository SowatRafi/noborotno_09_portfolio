import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
