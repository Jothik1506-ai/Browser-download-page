# AIVA Browser — landing page

A static, vanilla HTML/CSS/JS marketing page for AIVA Browser (no framework, no
build step — consistent with the main app's own "vanilla stack" convention).
Every claim on the page is tiered honestly: **Available now** / **In
development** / **Planned** — see `index.html#roadmap`.

## Local preview

No build step, no dependencies. Either:

```bash
# Just open it
open index.html        # macOS
start index.html        # Windows

# Or serve it (needed if you want relative-path edge cases to behave
# exactly like production, e.g. testing from a phone on the same network)
python -m http.server 8080
# then visit http://localhost:8080/
```

## Files

| File | Purpose |
|---|---|
| `index.html` | The landing page |
| `styles.css` | All styling — hand-written, no framework |
| `script.js` | Theme toggle, mobile nav, scroll-reveal, FAQ accordion |
| `privacy.html`, `terms.html`, `eula.html`, `open-source.html` | Real policy pages, not placeholders |
| `assets/` | Logo, favicons, and the generated `og-image.png` social card |

## Before you deploy — replace the placeholder domain

Every canonical URL, `og:url`, `og:image`, `twitter:image`, and the JSON-LD
`url` field currently point at:

```
https://REPLACE_WITH_PRODUCTION_DOMAIN/
```

This is intentional — it's an obviously-fake placeholder so it can't
accidentally ship as a real-looking wrong URL. Once you know the real
production domain, find-and-replace `REPLACE_WITH_PRODUCTION_DOMAIN` with it
across all 5 HTML files.

### Deploying to GitHub Pages (the repo is already public)

```bash
# From the repo root
git subtree push --prefix Agentic_Browser-landing-page origin gh-pages
```

Then in the repo's Settings → Pages, set the source to the `gh-pages` branch.
Your canonical domain will be `https://jothik1506-ai.github.io/Aiva-Agentic_Browser/`
— use that for the find-and-replace above (or point a custom domain at Pages
and use that instead).

## Known gaps — intentionally left honest, not silently faked

- **No packaged installer.** There's no `electron-builder`/`electron-forge`
  config or `dist/` output in the main repo yet. The download buttons are
  real, disabled `<button>` elements labeled "Coming soon," not fake links.
  The working CTA today is "Run it from source on GitHub."
- **No demo video yet.** The `#demo` section is a genuine `<video>`-ready
  slot in a "recording in progress" state — see the comment in
  `index.html` near `id="demo"`. To finish it: add the video file to
  `assets/`, a poster frame, an `.vtt` captions file, and a transcript page,
  then swap the `.demo-pending` block for a real `<video controls>` element
  with a `<track kind="captions">` child.
- **No published open-source license.** The GitHub repo is public, but
  there's no `LICENSE` file, so by default all rights are reserved. The
  `eula.html` and `open-source.html` pages say this plainly. If you want to
  make the "open source" claim for real, add a `LICENSE` file to the repo
  root — note that `ultralytics` (YOLOv8) is AGPL-3.0, which has real
  implications for how permissively you can license code that bundles it.
- **Contact address** is `aivafreelancia2026@gmail.com`, set per your
  instruction rather than the maintainer's personal email.

## Regenerating the OG social card

`assets/og-image.png` (1200×630, verified) was produced by screenshotting a
small HTML file styled with the site's own tokens and logo, via a headless
browser — not an image-generation model, so there's zero risk of AI text
typos in a social card. To regenerate after a copy change, build a similar
1200×630 HTML file and run:

```bash
msedge --headless=new --disable-gpu --hide-scrollbars \
  --screenshot="assets/og-image.png" --window-size=1200,630 \
  --force-device-scale-factor=1 "file:///$(pwd)/assets/og-card-source.html"
```

(`chrome` works identically if you don't have Edge.)

## Performance & audits

Verified with a real local Lighthouse run (`npx lighthouse`, mobile,
throttled) against this exact page — not estimated:

| Category | Score |
|---|---|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

The one meaningful fix that got Performance from 83 to 99: the Google Fonts
stylesheet is loaded async (`media="print" onload="this.media='all'"` with a
`<noscript>` fallback) instead of render-blocking. Fonts are still loaded
from Google's CDN, not self-hosted — that's the next lever if performance
regresses later (e.g. after adding real media assets).

Re-run it yourself any time:

```bash
python -m http.server 8080 &
npx lighthouse http://localhost:8080/index.html \
  --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,seo,best-practices
```

## Conventions

- No Tailwind, no bundler — matches the main app's explicit "vanilla stack"
  philosophy (see the root `AIVA_IDEOLOGY.md` in the AIVA Freelancia repo).
- Design tokens (colors, fonts, spacing, the pill-nav/glass-card/ring-grad
  component language) are lifted directly from the real AIVA Freelancia
  site's CSS, not invented — see `styles.css`'s `:root` block.
- Every "Available now" claim on the page should be re-verified against the
  actual code in the main repo (`backend/server.py`'s `BROWSER_TOOLS`,
  `renderer.js`) before it's promoted from "In development," not just
  updated because it feels like it should be done.
