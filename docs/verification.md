# Verification

Validated on 29 October 2026 against the production static export in Chrome on Windows.

## Build and dependencies

- Next.js 16.4.3 production build passed, including its TypeScript checks.
- Standalone TypeScript validation passed.
- npm dependency audit reported zero vulnerabilities after removing an unused preview dependency.
- Home, privacy, and not-found pages were generated successfully.

## Responsive review

Checked 320px, 390px, 768px, and 1440px viewport widths. At each size:

- Document width matched viewport width; no horizontal overflow.
- All local images loaded successfully.
- All internal anchor targets and accessible heading references existed.
- One main heading was present.
- The navigation remained sticky.

Desktop, tablet, and phone screenshots were reviewed. Temporary screenshots are available locally in `output/playwright/`, which is intentionally excluded from source control.

## Interaction checks

All 17 browser checks passed:

1. Residential project filtering.
2. Correct content in the selected project dialog.
3. Keyboard focus moves into the dialog.
4. Focus returns to the trigger after Escape closes the dialog.
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

Axe scans using WCAG 2 A, WCAG 2 AA, and WCAG 2.1 AA tags reported zero violations in the desktop page, open mobile navigation, and open project dialog. Chrome reported zero console errors and warnings during the final review. Automated scans are a useful baseline; this is not a claim of exhaustive assistive-technology or cross-browser certification.

## Demo behavior

The enquiry form deliberately prepares an email in the visitor's mail app. It does not submit to a backend. Additional architectural images are illustrative; original photos identify the named portfolio projects. No real email was sent during testing.
