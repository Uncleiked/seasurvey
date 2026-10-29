"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Layers3,
  Minus,
  Plus,
  Ruler,
} from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

const icons = { ruler: Ruler, layers: Layers3, chart: ChartNoAxesCombined };

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section
      id="expertise"
      className="section expertise-section"
      aria-labelledby="expertise-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-topline">
            <SectionHeading
              id="expertise-title"
              label="Our expertise"
              title="The detail behind the bigger picture."
            />
            <p className="section-side-copy">
              A connected approach to cost, coordination, and construction.
              Expertise that works as hard as your vision.
            </p>
          </div>
        </Reveal>
        <div className="services-bento">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const isExpanded = expanded === service.id;
            return (
              <Reveal
                key={service.id}
                className={`service-card ${service.className}`}
                delay={index * 55}
              >
                <div className="service-icon">
                  <Icon size={29} strokeWidth={1.25} aria-hidden="true" />
                </div>
                {index === 0 && (
                  <div className="quantity-graphic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <div className="graphic-rule" />
                  </div>
                )}
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button
                    className="service-toggle"
                    onClick={() => setExpanded(isExpanded ? null : service.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${service.id}-details`}
                  >
                    {isExpanded ? "Less detail" : "Explore this service"}
                    {isExpanded ? (
                      <Minus size={18} aria-hidden="true" />
                    ) : (
                      <Plus size={18} aria-hidden="true" />
                    )}
                  </button>
                  <div
                    className="service-detail-wrap"
                    data-open={isExpanded}
                    id={`${service.id}-details`}
                    inert={!isExpanded}
                  >
                    <div>
                      <ul>
                        {service.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <Reveal className="service-conversation">
            <span className="conversation-top">
              Your next great project
              <br />
              starts with a conversation.
            </span>
            <a href="#contact">
              Let’s find a way forward{" "}
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <ArrowDownRight
              className="conversation-decoration"
              strokeWidth={0.8}
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
