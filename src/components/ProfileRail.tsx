import { Terminal } from './Terminal'

/*
 * Persistent profile rail. On desktop it is sticky, so the animated terminal
 * stays visible while the visitor scrolls through every section; on narrow
 * screens it becomes a normal block above the content.
 *
 * This is just the terminal. The site carries no photograph at all — the owner
 * removed his portrait on 2026-07-31.
 */
export function ProfileRail() {
  return (
    <aside className="rail" aria-label="Profile">
      <Terminal />
    </aside>
  )
}
