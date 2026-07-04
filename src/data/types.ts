/*
 * Content model for the whole site.
 *
 * Every field is `readonly` (and every list a `readonly` array) so the content
 * behaves as immutable data: components can render it but the type system
 * rejects any accidental mutation at compile time. Combined with `satisfies`
 * checks in the data files, this means a typo in the content (missing field,
 * wrong shape) fails the build instead of silently rendering a broken page.
 */

export interface Profile {
  readonly name: string
  readonly titleLine: string
  readonly location: string
  readonly email: string
  readonly linkedinUrl: string
  readonly githubUrl: string
  /** Paragraphs of the professional summary, rendered in order. */
  readonly summary: readonly string[]
  /** City line for the terminal `pwd` output (no parenthetical). */
  readonly city: string
  /** One-line availability for the terminal `cat status` output. */
  readonly availability: string
  /** Resume filename inside public/ — components must URL-encode it. */
  readonly resumeFile: string
  /** Portrait filename inside public/, plus its accessible description. */
  readonly portraitFile: string
  readonly portraitAlt: string
}

export interface SkillGroup {
  readonly title: string
  readonly skills: readonly string[]
}

export interface ExperienceEntry {
  readonly role: string
  readonly organisation: string
  readonly location?: string
  readonly period: string
  readonly highlights: readonly string[]
}

export interface Project {
  readonly name: string
  readonly stack: readonly string[]
  readonly repoUrl: string
  readonly highlights: readonly string[]
  /** Completion date as shown on the resume, e.g. "May 2025". */
  readonly period?: string
}

export interface EducationEntry {
  readonly degree: string
  readonly institution: string
  readonly period: string
  readonly detail?: string
}

export interface Publication {
  readonly title: string
  readonly venue: string
  readonly date: string
  readonly doi: string
  readonly doiUrl: string
  readonly repoUrl: string
  readonly summary: string
}

export type CertificationStatus = 'completed' | 'in-progress'

export interface Certification {
  readonly name: string
  readonly issuer: string
  readonly status: CertificationStatus
  /** Shown for in-progress items, e.g. "expected 2026". */
  readonly expected?: string
  readonly topics?: string
}
