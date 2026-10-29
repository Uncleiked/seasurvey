import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <span className="section-label">A small detour</span>
      <h1>
        Let’s get you
        <br />
        back on course.
      </h1>
      <p>This page could not be found.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </main>
  );
}
