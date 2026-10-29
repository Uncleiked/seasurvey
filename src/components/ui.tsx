import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      className={`brand${inverse ? " brand-inverse" : ""}`}
      href="/#home"
      aria-label="SEA Surveyors home"
    >
      <span className="brand-symbol">
        <Image src="/images/sea-logo.png" alt="" width={273} height={75} />
      </span>
      <span className="brand-wordmark">
        SEA SURVEYORS<span>Quantity. Quality. Certainty.</span>
      </span>
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" size={18} />
    </a>
  );
}

export function SectionHeading({
  label,
  title,
  children,
  id,
}: {
  label: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-label">
        <span />
        {label}
      </div>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
