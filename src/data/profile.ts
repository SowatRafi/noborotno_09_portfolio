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
    'Master of Cybersecurity graduate with hands-on experience in SIEM monitoring, alert triage, phishing investigation, and digital forensics from academic SOC simulations and the Telstra virtual experience program, plus current industry experience as an AI Engineer Intern building ML features in Python.',
    'Skilled with Splunk (SPL), Wireshark, Autopsy, and TheHive; familiar with MITRE ATT&CK, NIST CSF, the Essential Eight, and the OWASP Top 10 for LLM Applications. Currently completing the TryHackMe AI Security Level 1 (AI1) and SOC Analyst Level 1 (SAL1) certifications, both expected in 2026.',
    'Available full-time, including rotating shift rosters and on-site attendance.',
  ],
  tagline:
    'Master of Cybersecurity graduate specialising in SIEM monitoring, incident response, digital forensics, and AI/LLM security.',
  originLine: 'BUILT IN 23.6850°N, 90.3563°E',
  city: 'Melbourne, Australia',
  availability: 'Available to relocate worldwide',
  resumeFile: 'Resume of Sowat H Rafi.pdf',
  portraitFile: 'portrait.jpg',
  portraitAlt: 'Portrait of Sowat Hossain Rafi',
} as const satisfies Profile
