import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectCard({
  project,
  index = 0,
  imageSizes = "(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 31vw",
}: {
  project: Project;
  index?: number;
  imageSizes?: string;
}) {
  return (
    <article
      className="project-card"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <Link
        className="project-open"
        href={`/projects/${project.id}/`}
        prefetch={false}
        aria-label={`View ${project.title}`}
      >
        <div className="project-image-wrap">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes={imageSizes}
          />
          <span className="project-category">{project.category}</span>
          <span className="project-arrow">
            <ArrowUpRight size={22} aria-hidden="true" />
          </span>
        </div>
        <div className="project-info">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
