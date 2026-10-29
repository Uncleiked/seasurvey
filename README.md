# SEA Surveyors

A responsive website concept for SEA Surveyors Limited, built with **Next.js 16.4.3, React 19.3.1, Tailwind CSS 4.3.3, TypeScript, and Motion**. The original company's magenta and navy palette, project photographs, and published contact information are preserved.

## Run locally

Requires Node.js 20.9 or later and npm.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**.

## Production preview

```sh
npm run build
npm run preview
```

The production export is in `out/`. Deploy that directory to any static host. `npm start` also previews the export locally; the included preview server is intended for local review.

## What's included

- Sticky glass navigation with a keyboard-accessible mobile menu.
- Responsive organic image compositions, a scroll parallax hero, and smooth section reveals.
- Seamlessly looping client carousel on desktop and mobile, with pause/resume and reduced-motion support.
- Bento service cards with expandable details.
- Project category filters and native accessible project dialogs.
- Validated enquiry form with email draft preparation and a copy option.
- A privacy page, metadata, local fonts, optimized WebP photography, and reduced-motion support.

The enquiry form does **not** send or store submissions. After validation, the visitor can open a prepared email in their own mail app. This demo contains no API keys, tracking scripts, analytics, or backend dependency.

## Structure

```text
src/app/             App Router pages, metadata, and responsive styles
src/components/      Reusable UI and isolated interactive components
src/lib/content.ts   Typed company, services, and portfolio data
public/              Local fonts, licenses, and original/optimized images
docs/                Architecture plan, content provenance, and QA notes
scripts/             Asset preparation, formatting, preview, and browser checks
tooling/skills/      Downloaded frontend, React, and Playwright guidance
```

See [the implementation plan](docs/implementation-plan.md) and [asset provenance](docs/assets.md).

## Verification

```sh
npm run typecheck
npm run build
```

For browser review, start the production preview, then use the installed Playwright CLI:

```sh
npx playwright-cli -s=sea open http://127.0.0.1:3000 --browser chrome
npx playwright-cli -s=sea run-code --filename scripts/browser-review.mjs
npx playwright-cli -s=sea run-code --filename scripts/browser-carousel.mjs
npx playwright-cli -s=sea run-code --filename scripts/browser-interactions.mjs
npx playwright-cli -s=sea run-code --filename scripts/browser-accessibility.mjs
```

Create `output/playwright/` before running the screenshot review. Browser artifacts are ignored by Git. The browser snippets are QA utilities, not part of the shipped application. `npm run format` formats the application and configuration.

This is an independent demonstration concept, not the live SEA Surveyors website. Source information: https://seasurveyorsltd.com/.
