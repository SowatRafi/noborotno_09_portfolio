import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string
  readonly children: ReactNode
}

/**
 * Every outbound link on the site goes through this component so the security
 * attributes are enforced in exactly one place:
 *
 * - rel="noopener"  — stops the destination page from reaching back into this
 *   tab via window.opener (reverse tabnabbing).
 * - rel="noreferrer" — avoids leaking the visitor's browsing context to
 *   third-party sites.
 *
 * The dev-only guard below catches any non-HTTPS URL sneaking into the data
 * files during development; it compiles away in the production bundle.
 */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  if (import.meta.env.DEV && !href.startsWith('https://')) {
    console.warn(`ExternalLink expects an https:// URL, received: ${href}`)
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}
