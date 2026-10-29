"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, MoveUpRight, Plus } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const imageY = useTransform(progress, [0, 1], [0, 95]);
  const noteY = useTransform(progress, [0, 1], [0, -45]);

  return (
    <section ref={ref} id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-intro">
            <span className="intro-line" />
            Your vision. Our expertise.
          </div>
          <h1 id="hero-title">
            Great projects.
            <br />
            Clear direction.
            <br />
            <span>Lasting value.</span>
          </h1>
          <p className="hero-description">
            From the first estimate to the final detail, we bring clarity,
            confidence, and care to the places you build.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#projects">Explore our work</ButtonLink>
            <a className="text-link" href="#expertise">
              Our expertise <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-disciplines">
            <span>Chartered quantity surveyors</span>
            <span>Project managers</span>
            <span>Cost consultants</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-contour contour-one" aria-hidden="true" />
          <div className="hero-contour contour-two" aria-hidden="true" />
          <motion.div
            className="hero-photo"
            style={{ y: reduced ? 0 : imageY }}
          >
            <Image
              src="/images/architecture-hero.webp"
              alt="Looking upward through sculptural glass architecture toward the sky"
              fill
              sizes="(max-width: 767px) 95vw, (max-width: 1100px) 50vw, 620px"
              preload
              className="hero-image"
            />
            <div className="hero-photo-shade" />
          </motion.div>
          <div className="hero-mark" aria-hidden="true">
            <Plus size={25} strokeWidth={1.2} />
            <span>
              Built on
              <br />
              precision.
            </span>
          </div>
          <motion.div
            className="hero-glass-note"
            style={{ y: reduced ? 0 : noteY }}
          >
            <span className="glass-note-icon">
              <MoveUpRight size={23} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <span>From vision to value</span>
              <strong>
                Your ambition.
                <br />
                Our shared commitment.
              </strong>
            </div>
            <span className="glass-note-dot" aria-hidden="true" />
          </motion.div>
          <span className="hero-location">
            Lagos, Nigeria <span /> Nationwide expertise
          </span>
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#about" className="scroll-cue">
          <span>
            <ArrowDown size={15} aria-hidden="true" />
          </span>
          Discover the SEA perspective
        </a>
        <span className="hero-bottom-note">
          Thoughtful advice. Exceptional possibilities.
        </span>
      </div>
    </section>
  );
}
