import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/manrope-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});
const instrument = localFont({
  src: "../../public/fonts/instrument-serif-italic.ttf",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEA Surveyors — Clarity in construction. Confidence in every build.",
  description:
    "A new perspective on quantity surveying, project management, and construction cost consultancy. Explore the SEA Surveyors website concept, Lagos, Nigeria.",
  applicationName: "SEA Surveyors website concept",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "SEA Surveyors — Building with certainty",
    description:
      "Thoughtful advice. Clear direction. Lasting value. A website concept for SEA Surveyors Limited.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002E66",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
