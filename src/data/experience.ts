import type { ExperienceEntry } from './types'

/* Newest first — the timeline renders in array order. */
export const experience: readonly ExperienceEntry[] = [
  {
    role: 'AI Engineer Intern',
    organisation: 'Unwind AI and Data Pty Ltd',
    location: 'Melbourne',
    period: 'Jun 2026 – Present',
    highlights: [
      'Building, testing, and iterating on AI/ML features in Python on real-world projects, collaborating with engineers and stakeholders.',
      'Working hands-on with modern AI tooling and data workflows — developing first-hand understanding of how production AI systems are built, the foundation for assessing where they can be attacked and how to defend them.',
    ],
  },
  {
    role: 'Cybersecurity Virtual Experience — Malware Attack Response',
    organisation: 'Telstra Forge Program via Forage',
    period: 'Mar 2025',
    highlights: [
      'Investigated a simulated malware incident end-to-end — affected hosts, initial access vector, root cause — and scoped containment within a structured SOC workflow.',
      'Mapped adversary tradecraft to 6+ MITRE ATT&CK techniques; authored a stakeholder-ready post-incident report with prioritised remediation.',
      'Recommended improvements across logging coverage, EDR rules, and user awareness.',
    ],
  },
]
