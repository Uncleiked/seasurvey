# Verification

Validated on 29 October 2026 against the production static export in Chrome on Windows.

## Build and dependencies

- Next.js 16.4.3 production build passed, including its TypeScript checks.
- Standalone TypeScript validation passed.
- npm dependency audit reported zero vulnerabilities after removing an unused preview dependency.
- Home, privacy, not-found, and all five project detail pages were generated successfully.

## Responsive review

Checked 320px, 375px, 390px, 430px, 540px, 768px, 1024px, and 1440px viewport widths. At each size:

- Document width matched viewport width; no horizontal overflow.
- All local images loaded successfully.
- All internal anchor targets and accessible heading references existed.
- One main heading was present.
- The navigation remained sticky.

Desktop, tablet, and phone screenshots were reviewed. Temporary screenshots are available locally in `output/playwright/`, which is intentionally excluded from source control.

## Interaction checks

All 17 browser checks passed:

1. Residential project filtering.
2. Correct content in the selected full project page.
3. Project details have their own URL and full page layout.
4. Back to all projects returns to the portfolio.
5. Specialist project filtering.
6. Full portfolio reveal.
7. Accessible service expansion.
8. Service collapse.
9. Required form fields prevent an empty enquiry.
10. A valid form prepares the correct email draft without sending it.
11. Editing details invalidates an earlier draft.
12. Mobile navigation opens.
13. Escape closes mobile navigation.
14. Following a menu link closes mobile navigation.
15. Header stays sticky after navigation.
16. Reduced motion disables the hero parallax.
17. Privacy route loads correctly.

## Accessibility and browser console

Axe scans using WCAG 2 A, WCAG 2 AA, and WCAG 2.1 AA tags reported zero violations in the homepage, open mobile navigation, and the mobile and desktop project pages. The final valid-page navigation review reported zero console errors and warnings. The separate invalid-route check deliberately requests a missing URL and verifies its expected 404 response. Automated scans are a useful baseline; this is not a claim of exhaustive assistive-technology or cross-browser certification.

## Full project pages

Every portfolio card now links to `/projects/<project-id>/`. Each page is statically generated with project-specific metadata, a responsive image composition, an overview, a factual summary, related projects, and an enquiry link. The existing header and footer support navigation between project pages and homepage sections.

All five pages returned HTTP 200 and passed layout checks at 320px, 390px, 768px, and 1440px, for 20 route and viewport combinations. All related images loaded during the screenshot review. Related project links, browser back navigation, direct refresh, and mobile section navigation were verified. An invalid project URL correctly returned HTTP 404.

Project card links disable speculative prefetching because dynamic segment prefetch URLs are not portable across static hosts. Ordinary Next.js navigation remains enabled, and the final production preview was checked without failed segment requests.

## Mobile refinement and client carousel

The phone layout was refined with larger supporting text, a simplified header, balanced call-to-action buttons, more compact image and service card proportions, horizontally scrollable project filters, a vertical process timeline, and larger form and footer touch targets.

The client carousel was checked at 390px and 1440px: it moves automatically, pauses and resumes, and respects reduced motion. The two rendered groups have identical widths and each is wider than the visible viewport. The measured difference between the start and end positions at the loop seam was zero at both sizes, preventing a visible reset or blank gap. Repeated logos are hidden from assistive technology.

## Demo behavior

The enquiry form deliberately prepares an email in the visitor's mail app. It does not submit to a backend. Additional architectural images are illustrative; original photos identify the named portfolio projects. No real email was sent during testing.
