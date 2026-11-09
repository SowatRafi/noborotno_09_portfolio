import { Terminal } from './Terminal'

export function ProfileRail() {
  return (
    <aside className="rail" aria-label="Profile">
      <svg className="rail__trace" viewBox="0 0 500 440" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M28 20H430L487 73V388L455 420" vectorEffect="non-scaling-stroke" />
        <path d="M30 20L13 38V367l42 53h395" vectorEffect="non-scaling-stroke" />
      </svg>
      <Terminal />
    </aside>
  )
}
