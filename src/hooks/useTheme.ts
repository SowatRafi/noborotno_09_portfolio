import { useCallback, useEffect, useState } from 'react'
import { themeManager, type Theme } from '../theme/ThemeManager'

/**
 * Thin React adapter over ThemeManager: exposes the effective theme as state
 * (so the toggle button's label stays accurate) and keeps it in sync when the
 * operating system preference changes mid-visit.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(() => themeManager.current())

  useEffect(
    () => themeManager.onSystemChange(() => setTheme(themeManager.current())),
    [],
  )

  const toggle = useCallback(() => {
    setTheme(themeManager.toggle())
  }, [])

  return { theme, toggle }
}
