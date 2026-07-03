# Sowat Hossain Rafi — Portfolio

Single-page portfolio for Graduate SOC Analyst / AI Security Analyst roles, built
with **React 18 + Vite + TypeScript** and deployed to **GitHub Pages**.

Live site: <https://sowatrafi.github.io/noborotno_09_portfolio/>

## Updating the resume

The "Download Resume" button serves `public/resume.pdf`. To update it, drop
the new PDF over that file (same name, same location) and commit.

## Local development

```bash
npm install     # first time only
npm run dev     # dev server with hot reload
npm run build   # type-check + production build into dist/
npm run preview # serve the production build locally (uses the Pages base path)
```

The preview server serves the site at
`http://localhost:4173/noborotno_09_portfolio/` — the same base path GitHub
Pages uses, so what you verify locally is what deploys.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages.

One-time repository setup: **Settings → Pages → Build and deployment → Source:
"GitHub Actions"**.

## Switching to a custom domain

The site is currently built for the GitHub Pages project path. To serve it from
a custom domain (site root) instead:

1. In `vite.config.ts`, change `BASE_PATH` from `'/noborotno_09_portfolio/'` to `'/'`.
2. In `public/404.html`, change the "Back to the portfolio" link to `/`.
3. In `index.html`, update the `canonical` link and `og:url` to the new domain.
4. Add the domain under **Settings → Pages → Custom domain** (this creates a
   `CNAME` file) and keep **Enforce HTTPS** enabled.

## Editing content

All content lives in typed data files under [`src/data/`](src/data/) — skills,
experience, projects, publication, certifications, education and profile text.
Components render whatever those files contain, so updating the site (e.g.
adding a project) is a data-file edit only; no JSX changes needed. The shapes
are defined in [`src/data/types.ts`](src/data/types.ts) and enforced at build
time.

## Security posture

- Zero runtime dependencies beyond `react`/`react-dom`; `npm audit` is clean.
- Strict Content-Security-Policy meta tag injected at build (no inline scripts
  or styles).
- All outbound links carry `rel="noopener noreferrer"` via a single
  `ExternalLink` component.
- No trackers, analytics, cookies or third-party requests of any kind.
- No phone number anywhere in the source — contact is email and profiles only.
