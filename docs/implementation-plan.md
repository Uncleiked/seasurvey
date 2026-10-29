# SEA Surveyors website implementation plan

## Direction

Create a sophisticated architectural consultancy website for SEA Surveyors Limited. Use the exact original brand accents found in its CSS: magenta `#A10264`, navy `#002E66`, and secondary plum `#891E6D`. Add restrained off-white surfaces and readable muted text. Preserve the company's real logo, published services, contact details, and named portfolio projects. Do not invent statistics, testimonials, awards, completion dates, or accreditation.

## Experience

1. Sticky translucent navigation with accessible mobile menu and clear enquiry action.
2. Large editorial hero, organic architectural photo, restrained scroll parallax, floating glass project note.
3. Seamlessly looping client carousel reflecting names listed on the original website, with a pause control, accessible duplicate handling, and a static scrollable version for reduced motion.
4. About section with an organic image composition and concise company positioning.
5. Bento service grid with expandable service details.
6. Filterable project portfolio; accessible project detail dialogs using original project photographs.
7. Four-stage project approach explaining discovery, planning, delivery, and handover.
8. Validated enquiry form that prepares an email in the visitor's mail app; clearly explain that it is a demo and does not submit to a server.
9. Footer with verified office details, phone, email, navigation, and demo disclosure.

## Architecture

- Next.js App Router, TypeScript strict mode, React, Tailwind CSS v4.
- Server components for the page shell, metadata, and static content.
- Small client boundaries for the sticky header, parallax, reveals, service disclosure, portfolio filters/dialogs, and form.
- Typed company data in `src/lib/content.ts`; design tokens and responsive component styling in `src/app/globals.css`.
- Reusable `ButtonLink`, `SectionHeading`, `Reveal`, `Brand`, and dialog patterns.
- Local fonts and local optimized images; static export for portable hosting, without secrets or required backend services.
- Native anchor navigation, CSS smooth scrolling, Motion animation, IntersectionObserver reveals, and full reduced-motion support.
- Semantic landmarks, skip link, visible focus, keyboard access, proper form labels, dialog focus management, and a mobile menu that closes on Escape.

## Validation

Run TypeScript validation and the production export. Use browser checks at 390px, 768px, and 1440px, and a 320px overflow check. Verify mobile navigation, anchor links, project filtering and dialogs, form validation/email preparation, reduced motion, image loading, accessibility, and absence of console errors. Inspect screenshots and refine the composition before handoff.

## Scope and assets

This is a redesigned demo, not the live company website. Original portfolio photos are used for named projects. Additional architectural photography is illustrative and must not be labeled as a delivered SEA project. The form opens an email draft only after explicit visitor action. Content and image provenance are documented in `docs/assets.md`.
