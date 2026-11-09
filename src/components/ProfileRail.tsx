import { profile } from '../data/profile'
import { Terminal } from './Terminal'

export function ProfileRail() {
  return (
    <aside className="rail" aria-label="Profile">
      <svg className="rail__trace" viewBox="0 0 500 440" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M28 20H430L487 73V388L455 420H472" vectorEffect="non-scaling-stroke" />
        <path d="M30 20L13 38V367l42 53h395" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="rail__station rail__station--origin">
        <span>01 / Bangladesh</span>
        <span className="rail__detail">{profile.originCoordinates}</span>
      </p>
      <Terminal />
      <p className="rail__station rail__station--base">
        <span>02 / {profile.city}</span>
        <span className="rail__detail">Current base</span>
      </p>
    </aside>
  )
}
