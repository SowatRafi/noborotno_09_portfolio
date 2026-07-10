import { Terminal } from './Terminal'

/*
 * Persistent profile rail. On desktop it is sticky, so the animated terminal
 * stays visible while the visitor scrolls through every section; on narrow
 * screens it becomes a normal block above the content.
 *
 * The single portrait lives in the hero — the rail no longer duplicates it, so
 * this is just the terminal.
 */
export function ProfileRail() {
  return (
    <aside className="rail" aria-label="Profile">
      <Terminal />
    </aside>
  )
}
