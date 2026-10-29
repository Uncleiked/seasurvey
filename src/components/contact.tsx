"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { company } from "@/lib/content";
import { Reveal } from "./reveal";

export function Contact() {
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(
    null,
  );
  const [copyStatus, setCopyStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const messageField = event.currentTarget.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    messageField.setCustomValidity(
      message.length < 15
        ? "Please describe your project in at least 15 characters, excluding surrounding spaces."
        : "",
    );
    if (!event.currentTarget.reportValidity()) return;
    const body = `Hello SEA Surveyors,\n\n${message}\n\nService: ${service}\nName: ${name}\nEmail: ${email}`;
    setDraft({
      href: `mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry: ${service}`)}&body=${encodeURIComponent(body)}`,
      text: body,
    });
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus(
        "Enquiry copied. Paste it into an email to info@seasurveyorsltd.com.",
      );
    } catch {
      setCopyStatus(
        "Your browser could not copy the text. Use the email draft link or contact us directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <div className="section-label">
            <span />
            Let’s build something worthwhile
          </div>
          <h2 id="contact-title">
            Big plans?
            <br />
            Let’s talk.
          </h2>
          <p>
            Every great project begins with a good conversation. Tell us what
            you have in mind.
          </p>
          <div className="contact-details">
            <a href={`mailto:${company.email}`}>
              <Mail size={19} aria-hidden="true" />
              <span>{company.email}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={company.phoneHref}>
              <Phone size={19} aria-hidden="true" />
              <span>{company.phone}</span>
            </a>
            <div>
              <MapPin size={20} aria-hidden="true" />
              <span>{company.address}</span>
            </div>
          </div>
          <span className="contact-hours">
            {company.hours} · West Africa Time
          </span>
        </Reveal>
        <Reveal className="contact-form-card">
          <div className="form-heading">
            <h3>A little about your project</h3>
            <span>We’re listening.</span>
          </div>
          <form
            onSubmit={handleSubmit}
            onChange={() => {
              setDraft(null);
              setCopyStatus("");
            }}
            onInput={(event) => {
              if (event.target instanceof HTMLTextAreaElement)
                event.target.setCustomValidity("");
            }}
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  pattern=".*\S.*"
                  placeholder="Full name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={160}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="service">How can we help?</label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Quantity surveying</option>
                <option>Project management</option>
                <option>Construction cost consultancy</option>
                <option>I’d like some guidance</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                minLength={15}
                maxLength={1500}
                placeholder="Your vision, location, and what you’d like to achieve…"
              />
            </div>
            <button className="button button-primary form-submit" type="submit">
              Prepare enquiry
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <p className="form-note">
              Demo enquiry form. Your details stay in this browser. We’ll
              prepare an email for you to send.
            </p>
          </form>
          <div className="draft-status" aria-live="polite">
            {draft && (
              <div className="draft-confirmation">
                <span className="draft-check">
                  <Check size={18} aria-hidden="true" />
                </span>
                <h4>Your enquiry is ready.</h4>
                <p>
                  Open your mail app to review and send it. No message has been
                  sent yet.
                </p>
                <div className="draft-actions">
                  <a href={draft.href} className="text-link">
                    Open email draft
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="copy-draft"
                    onClick={copyDraft}
                  >
                    <Copy size={15} aria-hidden="true" />
                    Copy text
                  </button>
                </div>
                {copyStatus && <p>{copyStatus}</p>}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
