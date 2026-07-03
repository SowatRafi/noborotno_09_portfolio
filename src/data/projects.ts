import type { Project } from './types'

/*
 * Adding a future project is a single new object here — the Projects section
 * renders whatever this array contains, so no component changes are needed.
 */
export const projects = [
  {
    name: 'Real-Time Network Intrusion Detection System (NIDS)',
    stack: ['Python', 'Scapy', 'Nmap', 'scikit-learn'],
    period: 'May 2025',
    repoUrl: 'https://github.com/SowatRafi/Real-Time-Intrusion-Detection-System-with-Python',
    highlights: [
      'Captures live traffic, detects anomalous patterns, and raises real-time alerts, mirroring SIEM-style detection and triage.',
      'Signature-based and ML (anomaly-based) detection with structured JSON logging ready for SIEM ingestion.',
    ],
  },
  {
    name: 'Discovr — Multi-Cloud Asset Discovery & Risk Assessment',
    stack: ['Python', 'Go', 'Azure SDK', 'AWS Boto3', 'Nmap'],
    period: 'Oct 2025',
    repoUrl: 'https://github.com/SowatRafi/Discovr-Assest-Discovery',
    highlights: [
      'Discovers and risk-classifies assets across AWS, Azure, and GCP, surfacing exposed services and misconfigurations.',
      'Automated CSV/JSON reporting consolidating findings into a single asset inventory.',
    ],
  },
] as const satisfies readonly Project[]
