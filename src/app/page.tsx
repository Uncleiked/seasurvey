import Image from "next/image";
import { ArrowUpRight, Check, Compass, Sparkles } from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { approach } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <section
          className="client-section"
          aria-label="Selected clients, affiliates, and partners listed on the original company website"
        >
          <div className="container client-inner">
            <p>
              In good company.<span>Some of the names in our story.</span>
            </p>
            <div className="client-names">
              <span className="client-cbn">CBN</span>
              <span className="client-firs">
                FIRS<span>Federal Inland Revenue Service</span>
              </span>
              <span className="client-stanbic">
                <span className="client-shield" aria-hidden="true">
                  S
                </span>
                Stanbic IBTC
              </span>
              <span className="client-mtn">MTN</span>
              <span className="client-transcorp">
                Transcorp<span>Group</span>
              </span>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="section about-section"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <Reveal className="about-art">
              <div className="about-image">
                <Image
                  src="/images/construction-detail.webp"
                  alt="Construction professionals planning the details of a building project"
                  fill
                  sizes="(max-width: 767px) 90vw, 45vw"
                />
              </div>
              <span className="about-outline" aria-hidden="true" />
              <div className="about-note">
                <Compass size={28} strokeWidth={1.25} aria-hidden="true" />
                <span>
                  A broader perspective.
                  <br />
                  <strong>A sharper focus.</strong>
                </span>
              </div>
              <span className="about-coordinate">
                Precision in every perspective.
              </span>
            </Reveal>
            <Reveal className="about-copy">
              <div className="section-label">
                <span />
                The SEA perspective
              </div>
              <h2 id="about-title">
                We see the potential.
                <br />
                Then mind every detail.
              </h2>
              <p className="about-lead">
                Behind every remarkable building is a thousand well-considered
                decisions.
              </p>
              <p>
                We’re SEA Surveyors Limited, a consulting firm bringing
                technical leadership and practical experience to building and
                engineering construction across Nigeria.
              </p>
              <p>
                From quantity surveying to project management, we help you see
                the whole picture, protect what matters, and move forward with
                confidence.
              </p>
              <div className="about-principles">
                <span>
                  <Check size={16} aria-hidden="true" />
                  Your objectives, at the centre
                </span>
                <span>
                  <Check size={16} aria-hidden="true" />
                  Considered, independent advice
                </span>
              </div>
              <a className="text-link" href="#approach">
                How we work
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
        <Services />
        <Projects />
        <section
          id="approach"
          className="section approach-section"
          aria-labelledby="approach-title"
        >
          <div className="container">
            <Reveal>
              <div className="approach-heading">
                <div>
                  <div className="section-label">
                    <span />
                    Considered from the start
                  </div>
                  <h2 id="approach-title">
                    Good outcomes begin
                    <br />
                    with a clear approach.
                  </h2>
                </div>
                <p>
                  One connected journey.
                  <br />
                  Your priorities, all the way through.
                </p>
              </div>
            </Reveal>
            <div className="approach-grid">
              {approach.map((step, index) => (
                <Reveal
                  className="approach-step"
                  key={step.title}
                  delay={index * 50}
                >
                  <div className="step-track">
                    <span>0{index + 1}</span>
                    <span className="step-line" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              ))}
            </div>
            <div className="approach-bottom">
              <Sparkles size={19} strokeWidth={1.3} aria-hidden="true" />
              <p>
                The difference is in the details. The value is in the whole.
              </p>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
