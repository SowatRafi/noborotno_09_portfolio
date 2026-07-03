import type { Certification } from './types'

/*
 * `status` is a typed union ('completed' | 'in-progress'), not free text, so a
 * certification can never render with an ambiguous or misspelt status — being
 * precise about what is and is not finished is a credibility requirement for
 * a security portfolio.
 */
export const certifications: readonly Certification[] = [
  {
    name: 'AI Security Level 1 (AI1) Certification',
    issuer: 'TryHackMe',
    status: 'in-progress',
    expected: 'expected 2026',
    topics: 'Prompt injection, data poisoning / RAG defence, AI supply-chain security',
  },
  {
    name: 'SOC Analyst Level 1 (SAL1) Certification',
    issuer: 'TryHackMe',
    status: 'in-progress',
    expected: 'expected 2026',
    topics: 'Threat detection & triage, SIEM investigation, incident response',
  },
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Coursera',
    status: 'completed',
  },
  {
    name: 'Cyber Incident Response & Digital Forensics',
    issuer: 'Jason Dion, LinkedIn Learning',
    status: 'completed',
  },
]
