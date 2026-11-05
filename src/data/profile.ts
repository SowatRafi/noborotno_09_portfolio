import type { Profile } from './types'

/*
 * The phone number is deliberately absent everywhere in this codebase: this is
 * a public website and publishing it would invite scraping and spam. Contact
 * is email and professional profiles only.
 */
export const profile = {
  name: 'Sowat Hossain Rafi',
  titleLine: 'Graduate SOC Analyst | AI Security Analyst',
  location: 'Melbourne, Australia (open to relocation)',
  email: 'sowad.rafi@icloud.com',
  linkedinUrl: 'https://www.linkedin.com/in/sowat-hossain-rafi',
  githubUrl: 'https://github.com/SowatRafi',
  summary: [
    'Master of Cybersecurity graduate with experience in SIEM monitoring, alert triage, phishing investigation and digital forensics through SOC simulations and the Telstra virtual experience program. Built and tested Python features for AI video analysis during an internship at Unwind AI and Data.',
    'Holds TryHackMe’s Security Analyst Level 1 (SAL1) and AI Security Level 1 (AI1) certifications. Skilled with Splunk (SPL), Wireshark, Autopsy and TheHive, with familiarity across MITRE ATT&CK, NIST CSF, the Essential Eight and the OWASP Top 10 for LLM Applications.',
    'Available for full-time, on-site work and rotating shifts.',
  ],
  tagline:
    'Master of Cybersecurity graduate specialising in SIEM monitoring, incident response, digital forensics, and AI/LLM security.',
  originLine: 'BUILT IN 24.2644°N, 89.9181°E',
  city: 'Melbourne, Australia',
  availability: 'Available to relocate worldwide',
  contactLead:
    'The fastest way to reach me is email. I am based at 37°48′51″S 144°57′47″E and open to relocation anywhere in the world.',
  resumeFile: 'Resume of Sowat H Rafi.pdf',
} as const satisfies Profile

export const resumeHref = `${import.meta.env.BASE_URL}${encodeURIComponent(profile.resumeFile)}`
