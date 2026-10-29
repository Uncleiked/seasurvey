"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

function ClientGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="client-group"
      role={duplicate ? undefined : "list"}
      aria-label={duplicate ? undefined : "Selected clients and partners"}
      aria-hidden={duplicate || undefined}
    >
      <div className="client-logo" role="listitem">
        <span className="client-cbn">CBN</span>
      </div>
      <div className="client-logo" role="listitem">
        <span className="client-firs">
          FIRS<span>Federal Inland Revenue Service</span>
        </span>
      </div>
      <div className="client-logo" role="listitem">
        <span className="client-stanbic">
          <span className="client-shield" aria-hidden="true">
            S
          </span>
          Stanbic IBTC
        </span>
      </div>
      <div className="client-logo" role="listitem">
        <span className="client-mtn">MTN</span>
      </div>
      <div className="client-logo" role="listitem">
        <span className="client-transcorp">
          Transcorp<span>Group</span>
        </span>
      </div>
    </div>
  );
}

export function ClientCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="clients-section"
      aria-label="Selected clients, affiliates, and partners listed on the original company website"
    >
      <div className="container clients-inner" data-paused={paused}>
        <p className="clients-copy">
          In good company.<span>Some of the names in our story.</span>
        </p>
        <div
          className="client-carousel"
          role="group"
          aria-label="Client and partner logos"
          tabIndex={0}
        >
          <div className="client-track">
            <ClientGroup />
            <ClientGroup duplicate />
          </div>
        </div>
        <button
          className="client-pause"
          type="button"
          aria-label={
            paused ? "Resume client carousel" : "Pause client carousel"
          }
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
}
