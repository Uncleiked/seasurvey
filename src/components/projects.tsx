"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

const categories = [
  "All projects",
  "Corporate",
  "Residential",
  "Specialist",
] as const;

export function Projects() {
  const [category, setCategory] = useState<ProjectCategory | "All projects">(
    "All projects",
  );
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const filtered = projects.filter(
    (project) => category === "All projects" || project.category === category,
  );
  const visible =
    showAll || category !== "All projects" ? filtered : filtered.slice(0, 3);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <SectionHeading
              id="projects-title"
              label="Selected work"
              title="Ambition, made tangible."
            />
            <p className="section-side-copy">
              Different places. Different possibilities.
              <br />
              The same attention to what matters.
            </p>
          </div>
        </Reveal>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? "selected" : ""}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="project-count" aria-live="polite">
            {visible.length} projects
          </span>
        </div>
        <div className="project-grid">
          {visible.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <button
                className="project-open"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(project);
                }}
                aria-label={`View ${project.title}`}
              >
                <div className="project-image-wrap">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 31vw"
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
              </button>
            </article>
          ))}
        </div>
        {category === "All projects" && (
          <div className="project-more">
            <button className="text-link" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show selected projects" : "View all projects"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p>Explore a selection from our published portfolio.</p>
          </div>
        )}
      </div>
      {selected && (
        <dialog
          ref={dialogRef}
          className="project-dialog"
          aria-labelledby="project-dialog-title"
          onCancel={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
              )
                setSelected(null);
            }
          }}
        >
          <button
            className="dialog-close"
            autoFocus
            aria-label="Close project details"
            onClick={() => setSelected(null)}
          >
            <X size={22} />
          </button>
          <div className="dialog-image">
            <Image
              src={selected.image}
              alt={selected.alt}
              fill
              sizes="(max-width: 767px) 95vw, 700px"
            />
          </div>
          <div className="dialog-content">
            <span className="dialog-category">{selected.category}</span>
            <h2 id="project-dialog-title">{selected.title}</h2>
            <p className="dialog-subtitle">{selected.subtitle}</p>
            <p>{selected.description}</p>
            <a
              className="button button-primary"
              href="#contact"
              onClick={() => setSelected(null)}
            >
              Discuss your project
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </dialog>
      )}
    </section>
  );
}
