import { useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'

/*
 * Nav targets are plain in-page anchors: a single-page site needs no router,
 * and anchors keep the bundle small, work with the browser's native back
 * button, and degrade gracefully.
 */
const NAV_ITEMS = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['research', 'Research'],
  ['certifications', 'Certifications'],
  ['contact', 'Contact'],
] as const

const NAV_IDS = NAV_ITEMS.map(([anchor]) => anchor)

export function Header() {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const activeId = useActiveSection(NAV_IDS)
  /*
   * On phones the seven sections don't fit a bar, so the nav collapses into a
   * toggled dropdown. On desktop the menu is always visible and this state is
   * ignored (the button is hidden by CSS).
   */
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__inner container">
        <a className="header__brand" href="#top" aria-label="Back to top">
          <span className="header__prompt" aria-hidden="true">
            ~$
          </span>{' '}
          sowat.rafi
        </a>

        <button
          type="button"
          className="header__menu-btn"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>

        <nav
          id="site-nav"
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label="Section navigation"
        >
          <ul className="header__links">
            {NAV_ITEMS.map(([anchor, label]) => (
              <li key={anchor}>
                {/* aria-current mirrors the visual highlight for AT users. */}
                <a
                  href={`#${anchor}`}
                  className={activeId === anchor ? 'is-active' : undefined}
                  aria-current={activeId === anchor ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} theme`}
        >
          {/* Inline SVGs avoid an icon-library dependency and extra requests. */}
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </div>
      {/*
       * Reading-progress bar driven entirely by CSS scroll-driven animations —
       * no scroll listener, no inline styles. Browsers without support simply
       * never display it (see the @supports rule in global.css).
       */}
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
