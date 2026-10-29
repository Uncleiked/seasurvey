import { ArrowUp, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";
import { Brand } from "./ui";

export function Footer({
  backToTopHref = "#home",
}: {
  backToTopHref?: string;
}) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand inverse />
            <p>
              Bringing clarity to construction.
              <br />
              Creating value at every step.
            </p>
          </div>
          <div className="footer-links">
            <span>Explore</span>
            <a href="/#about">About us</a>
            <a href="/#expertise">Our expertise</a>
            <a href="/#projects">Our work</a>
          </div>
          <div className="footer-links">
            <span>Connect</span>
            <a href="/#contact">
              Start a project
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href={`mailto:${company.email}?subject=Career%20enquiry`}>
              Career enquiries
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="/privacy/">Privacy</a>
          </div>
          <a className="back-top" href={backToTopHref} aria-label="Back to top">
            <ArrowUp size={20} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SEA Surveyors Limited.</span>
          <span>Independent website concept · For demonstration</span>
          <span>Designed with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
