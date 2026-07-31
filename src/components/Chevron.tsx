/**
 * Trailing chevron for outbound link labels.
 *
 * These labels used to end in a literal "→" (U+2192). That character sits
 * outside every unicode subset IBM Plex Sans and JetBrains Mono ship, so the
 * browser silently fell back to whatever system font the visitor happened to
 * have — the one glyph on the site not rendered in its own typeface. Drawing
 * it instead keeps it on-brand, makes it scale and recolour with the text
 * (1em + currentColor), and costs no extra font bytes.
 *
 * aria-hidden because it is decoration: the link text already says where the
 * link goes.
 */
export function Chevron() {
  return (
    <svg
      className="link-chevron"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
