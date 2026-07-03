import type { EducationEntry } from './types'

/* Typed as the interface (not `as const`) so optional fields like `detail`
   stay accessible on every entry of the union. */
export const education: readonly EducationEntry[] = [
  {
    degree: 'Master of Cybersecurity',
    institution: 'La Trobe University, Melbourne',
    period: 'Mar 2024 – Nov 2025',
    detail:
      'Coursework: Incident Response, Digital Forensics, Network Security, Risk Management, Security Operations, Cryptography, Cloud Security.',
  },
  {
    degree: 'Bachelor of Computer Science & Engineering',
    institution: 'BRAC University, Dhaka, Bangladesh',
    period: 'Jan 2018 – Jun 2022',
  },
]
