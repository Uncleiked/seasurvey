import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight, Compass } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();
  return {
    title: `${project.title} — SEA Surveyors`,
    description: project.description,
    openGraph: {
      title: `${project.title} — SEA Surveyors`,
      description: project.description,
      type: "website",
      locale: "en_NG",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();
  const otherProjects = projects.filter((item) => item.id !== project.id);
  const related = [
    ...otherProjects.filter((item) => item.category === project.category),
    ...otherProjects.filter((item) => item.category !== project.category),
  ].slice(0, 2);

  return (
    <>
      <Header projectPage />
      <main id="main">
        <article id="project-top" className="project-detail">
          <section className="case-hero" aria-labelledby="case-title">
            <div className="container">
              <nav className="case-breadcrumb" aria-label="Breadcrumb">
                <Link href="/#projects">
                  <ArrowLeft size={16} aria-hidden="true" />
                  Our work
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{project.title}</span>
              </nav>
              <div className="case-hero-grid">
                <div className="case-intro">
                  <div className="section-label">
                    <span />
                    {project.category} portfolio
                  </div>
                  <h1 id="case-title">{project.title}</h1>
                  <p className="case-subtitle">{project.subtitle}</p>
                  <p className="case-description">{project.description}</p>
                  <a href="#project-overview" className="case-explore">
                    Explore the project
                    <span>
                      <ArrowDown size={17} aria-hidden="true" />
                    </span>
                  </a>
                </div>
                <figure className="case-visual">
                  <div className="case-image-outline" aria-hidden="true" />
                  <div className="case-image">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      preload
                      sizes="(max-width: 767px) 90vw, (max-width: 1023px) 48vw, 620px"
                    />
                  </div>
                  <figcaption className="case-image-note">
                    <span className="case-note-icon">
                      <Compass size={24} strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <span>
                      SEA Surveyors portfolio
                      <strong>{project.projectType}</strong>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
          <section
            id="project-overview"
            className="section case-overview"
            aria-labelledby="case-overview-title"
          >
            <div className="container case-overview-grid">
              <Reveal className="case-overview-copy">
                <SectionHeading
                  id="case-overview-title"
                  label="A closer look"
                  title={project.overviewTitle}
                />
                <p>{project.overview}</p>
                <Link className="text-link" href="/#projects">
                  Back to all projects
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </Reveal>
              <Reveal className="case-facts">
                <h3>Project at a glance</h3>
                <dl>
                  <div>
                    <dt>Sector</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div>
                    <dt>Project type</dt>
                    <dd>{project.projectType}</dd>
                  </div>
                  {project.location && (
                    <div>
                      <dt>Location</dt>
                      <dd>{project.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Portfolio</dt>
                    <dd>SEA Surveyors Limited</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </section>
          <section
            className="case-conversation"
            aria-labelledby="case-conversation-title"
          >
            <div className="container case-conversation-inner">
              <div>
                <div className="section-label">
                  <span />
                  Your next chapter
                </div>
                <h2 id="case-conversation-title">What do you have in mind?</h2>
                <p>
                  Bring us your vision. Let’s explore the right direction for
                  your project.
                </p>
              </div>
              <ButtonLink href="/#contact">Discuss your project</ButtonLink>
            </div>
          </section>
          <section
            className="section case-related"
            aria-labelledby="case-related-title"
          >
            <div className="container">
              <Reveal>
                <div className="section-topline">
                  <SectionHeading
                    id="case-related-title"
                    label="Continue exploring"
                    title="More perspectives. More possibilities."
                  />
                  <Link href="/#projects" className="text-link">
                    All our work
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
              <div className="case-related-grid">
                {related.map((item, index) => (
                  <ProjectCard
                    key={item.id}
                    project={item}
                    index={index}
                    imageSizes="(max-width: 767px) 90vw, 45vw"
                  />
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer backToTopHref="#project-top" />
    </>
  );
}
