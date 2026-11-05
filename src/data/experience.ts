import type { ExperienceEntry } from './types'

/* Newest first — the timeline renders in array order. */
export const experience: readonly ExperienceEntry[] = [
  {
    role: 'AI Engineer Intern',
    organisation: 'Unwind AI and Data Pty Ltd',
    location: 'Melbourne',
    period: 'Jun 2026 – Sep 2026',
    highlights: [
      'Contributed Python features to an AI video analysis platform for physical security monitoring.',
      'Built and tested workflows for event detection and person re-identification.',
      'Collaborated with engineers and stakeholders to clarify requirements, review outputs and refine features.',
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
