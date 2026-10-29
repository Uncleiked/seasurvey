import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy — SEA Surveyors website concept",
};

export default function Privacy() {
  return (
    <main id="main" className="privacy-page container">
      <Brand />
      <a className="text-link" href="/">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the website
      </a>
      <div className="section-label">
        <span />
        Website concept
      </div>
      <h1>Privacy, kept simple.</h1>
      <p>
        This is an independent demonstration website inspired by SEA Surveyors
        Limited. It is not the company’s live website.
      </p>
      <h2>Enquiry form</h2>
      <p>
        Form entries are used in your current browser session to prepare an
        email draft. The website does not send your enquiry, save it to a
        database, or store it in browser storage. When you choose “Open email
        draft”, your device’s email application handles the draft under its own
        privacy terms.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This demo does not set application cookies or use analytics or
        advertising trackers. Hosting infrastructure may process standard access
        logs according to its own policies.
      </p>
      <h2>Photography and company information</h2>
      <p>
        Named portfolio photographs and company contact details are drawn from
        the original company website. Additional architectural and construction
        photography is illustrative.
      </p>
      <h2>Contacting the company</h2>
      <p>
        For the company’s current information and privacy terms, visit{" "}
        <a href="https://seasurveyorsltd.com/" rel="noreferrer">
          seasurveyorsltd.com
        </a>
        .
      </p>
    </main>
  );
}
