import type { Certification } from './types'

/*
 * `status` is a typed union ('completed' | 'in-progress'), not free text, so a
 * certification can never render with an ambiguous or misspelt status — being
 * precise about what is and is not finished is a credibility requirement for
 * a security portfolio.
 */
export const certifications: readonly Certification[] = [
  {
    name: 'Security Analyst Level 1 (SAL1)',
    issuer: 'TryHackMe',
    status: 'completed',
    topics: 'Threat detection, alert triage, SIEM investigation and incident response',
    credentialUrl: 'https://www.credly.com/badges/4192052e-01da-45db-a0b1-193c942c45c5/public_url',
  },
  {
    name: 'AI Security Level 1 (AI1) Certification',
    issuer: 'TryHackMe',
    /* Awarded 2026-07-31. `expected` is gone with the projection it described;
       the Credly page is the proof, which is what makes this worth claiming. */
    status: 'completed',
    topics: 'Prompt injection, data poisoning / RAG defence, AI supply-chain security',
    credentialUrl: 'https://www.credly.com/badges/7895034b-90ed-4314-8db6-13eeaa64ec2b/public_url',
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
