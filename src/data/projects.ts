import type { Project } from './types'

/*
 * Adding a future project is a single new object here — the Projects section
 * renders whatever this array contains, so no component changes are needed.
 */
export const projects = [
  {
    name: 'Real-Time Network Intrusion Detection System (NIDS)',
    stack: ['Python', 'Scapy', 'scikit-learn'],
    period: 'May 2025',
    repoUrl: 'https://github.com/SowatRafi/Real-Time-Intrusion-Detection-System-with-Python',
    highlights: [
      'Captures live packets and analyses TCP/IP flows for signs of SYN floods and port scans.',
      'Uses Isolation Forest to flag anomalous traffic and logs alerts as structured JSON.',
    ],
  },
  {
    name: 'Discovr — Multi-Cloud Asset Discovery & Risk Assessment',
    stack: ['Python', 'PySide6', 'AWS', 'Azure', 'Google Cloud'],
    period: 'Oct 2025',
    repoUrl: 'https://github.com/SowatRafi/Discovr-Assest-Discovery',
    highlights: [
      'Inventories assets across local networks, Active Directory, AWS, Azure and Google Cloud.',
      'Assigns risk ratings using heuristics and exports CSV, HTML and JSON reports for security reviews.',
    ],
  },
] as const satisfies readonly Project[]
