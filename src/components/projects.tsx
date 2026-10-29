"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { projects, type ProjectCategory } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";
import { ProjectCard } from "./project-card";

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
  const filtered = projects.filter(
    (project) => category === "All projects" || project.category === category,
  );
  const visible =
    showAll || category !== "All projects" ? filtered : filtered.slice(0, 3);

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
            <ProjectCard key={project.id} project={project} index={index} />
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
    </section>
  );
}
