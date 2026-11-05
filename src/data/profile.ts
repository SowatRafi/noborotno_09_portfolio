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
    'I hold a Master of Cybersecurity and have investigated simulated security alerts with Splunk, TheHive and Wireshark. At Unwind AI and Data, I helped build and test Python features for an AI video analysis platform for physical security monitoring.',
    'Available for full-time, on-site work and rotating shifts.',
  ],
  tagline:
    'TryHackMe SAL1 and AI1 certified. Based in Melbourne, Australia.',
  originLine: 'BUILT IN 24.2644°N, 89.9181°E',
  city: 'Melbourne, Australia',
  availability: 'Available to relocate worldwide',
  contactLead:
    'Email is the best way to reach me about opportunities. I’m based in Melbourne and open to relocation worldwide.',
  resumeFile: 'Resume of Sowat H Rafi.pdf',
} as const satisfies Profile
