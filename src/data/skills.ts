import type { SkillGroup } from './types'

/* Grouped exactly as on the resume so recruiters can cross-check the two. */
export const skillGroups = [
  {
    title: 'SIEM & Log Analysis',
    skills: ['Splunk (SPL)', 'Log correlation', 'Alert tuning', 'Detection-rule review', 'Dashboarding'],
  },
  {
    title: 'Incident Response',
    skills: [
      'Alert triage',
      'Prioritisation',
      'Escalation',
      'IR playbooks',
      'MITRE ATT&CK & Cyber Kill Chain mapping',
    ],
  },
  {
    title: 'AI & LLM Security',
    skills: [
      'LLM threat modelling',
      'Prompt injection & jailbreak testing',
      'Data poisoning / RAG attack & defence',
      'AI supply-chain risk',
      'OWASP Top 10 for LLM Applications',
    ],
  },
  {
    title: 'Phishing & Email Security',
    skills: [
      'Header / URL / attachment analysis',
      'IOC extraction',
      'Sandbox detonation',
      'Mailbox sweeps',
    ],
  },
  {
    title: 'Digital Forensics',
    skills: ['Wireshark', 'Autopsy', 'Windows Event Logs', 'TheHive', 'Chain-of-custody documentation'],
  },
  {
    title: 'Threat Intelligence & OSINT',
    skills: ['VirusTotal', 'AbuseIPDB', 'URLScan', 'MITRE ATT&CK Navigator', 'IOC enrichment'],
  },
  {
    title: 'Networking & Detection',
    skills: [
      'TCP/IP',
      'DNS',
      'HTTP/S',
      'Nmap',
      'Scapy',
      'Packet analysis',
      'IDS/IPS',
      'OWASP Top 10',
    ],
  },
  {
    title: 'Cloud & Scripting',
    skills: [
      'AWS, Azure, GCP fundamentals',
      'Python',
      'PowerShell',
      'Bash',
      'SOC automation & reporting',
    ],
  },
  {
    title: 'Frameworks & Standards',
    skills: ['MITRE ATT&CK', 'NIST CSF', 'ISO/IEC 27001', 'Cyber Kill Chain', 'Essential Eight'],
  },
  {
    title: 'Reporting & Communication',
    skills: ['Client-ready technical reports', 'Executive summaries', 'Stakeholder briefings'],
  },
] as const satisfies readonly SkillGroup[]
