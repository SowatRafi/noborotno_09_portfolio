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
    role: 'Incident Handling & Digital Forensics',
    organisation: 'SOC Simulation — La Trobe University coursework',
    period: 'Jul – Nov 2025',
    highlights: [
      'Triaged 15+ simulated alerts in TheHive across phishing, brute-force, and malware scenarios; enriched IOCs with VirusTotal and AbuseIPDB to reduce false positives.',
      'Conducted phishing analysis on headers, URLs, and attachments; drafted mailbox-sweep and URL-block playbook procedures.',
      'Reconstructed incident timelines from Windows Event Logs and disk images (Autopsy, Wireshark), documented to chain-of-custody standards.',
    ],
  },
  {
    role: 'Risk Management & Client Reporting',
    organisation: 'Managed Services Simulation — La Trobe University coursework',
    period: 'Mar – May 2025',
    highlights: [
      'Authored weekly and monthly client-style reports on security posture, open risks, and remediation for technical and executive audiences.',
      'Aligned reporting with ISO/IEC 27001 controls, mapping risks to business impact.',
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
