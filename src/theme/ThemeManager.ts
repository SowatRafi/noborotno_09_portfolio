export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio.theme'

/*
 * ThemeManager is deliberately a class rather than loose functions: theming
 * touches three pieces of mutable browser state (localStorage, the <html>
 * data-theme attribute, and the prefers-color-scheme media query), and
 * encapsulating them behind one small object keeps every read/write in a
 * single audited place. Components never touch localStorage or the DOM
 * directly — they go through the useTheme hook, which delegates here.
 *
 * Theming strategy: the stylesheet follows the system preference by default
 * (via @media prefers-color-scheme), and this class only applies an explicit
 * data-theme override once the visitor uses the toggle. Because the default
 * needs no JavaScript, there is no flash of the wrong theme while the bundle
 * loads — and no inline <script> is needed, which keeps the strict CSP intact.
 */
class ThemeManager {
  private readonly lightQuery: MediaQueryList | null =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: light)')
      : null

  /**
   * localStorage is untrusted input: it can be blocked entirely (private
   * browsing, storage partitioning) and its contents can be edited by the
   * user or by browser extensions. Read it defensively and accept only the
   * two known values — anything else is treated as "no override" rather than
   * being written back into the DOM.
   */
  private readStoredOverride(): Theme | null {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY)
      return value === 'dark' || value === 'light' ? value : null
    } catch {
      return null
    }
  }

  private systemTheme(): Theme {
    return this.lightQuery?.matches ? 'light' : 'dark'
  }

  /** The theme currently in effect: explicit override first, system otherwise. */
  current(): Theme {
    return this.readStoredOverride() ?? this.systemTheme()
  }

  /**
   * Re-apply a persisted override at startup. Called from main.tsx at module
   * evaluation time — before React renders — so a returning visitor who chose
   * the non-system theme never sees it flip after load.
   */
  init(): void {
    const stored = this.readStoredOverride()
    if (stored !== null) {
      document.documentElement.dataset.theme = stored
    }
  }

  /** Flip the effective theme, persist the choice, and return the new value. */
  toggle(): Theme {
    const next: Theme = this.current() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage being unavailable is non-fatal: the attribute above still
      // switches the theme for this visit; it just won't persist.
    }
    return next
  }

  /**
   * Notify when the OS-level preference changes so React state can follow it
   * while no explicit override is set. Returns an unsubscribe function for
   * use as a useEffect cleanup.
   */
  onSystemChange(listener: () => void): () => void {
    const query = this.lightQuery
    if (query === null) {
      return () => {}
    }
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }
}

/* One instance for the whole app — theme state is global by nature. */
export const themeManager = new ThemeManager()
