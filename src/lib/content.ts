export const company = {
  name: "SEA Surveyors Limited",
  email: "info@seasurveyorsltd.com",
  phone: "+234 (1) 632 3971 – 2",
  phoneHref: "tel:+23416323971",
  address: "Plot 280B, Corporation Drive, Dolphin Estate, Ikoyi, Lagos",
  hours: "Monday – Friday, 8:00 – 17:00",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Our work", href: "#projects" },
];

export const services = [
  {
    id: "quantity-surveying",
    title: "Quantity surveying",
    description:
      "Every detail considered. Every cost accounted for. Clear financial thinking, from the first idea to the final account.",
    details: [
      "Early cost advice and budget planning",
      "Tender and contract cost guidance",
      "Financial administration of construction contracts",
    ],
    icon: "ruler",
    className: "service-quantity",
  },
  {
    id: "project-management",
    title: "Project management",
    description:
      "The right people. A considered plan. A clear path from your vision to a completed project.",
    details: [
      "Project initiation and planning",
      "Coordination through design and execution",
      "Monitoring, control, and project closure",
    ],
    icon: "layers",
    className: "service-management",
  },
  {
    id: "cost-consultancy",
    title: "Construction cost consultancy",
    description:
      "Make informed decisions with practical advice on the financial side of your development.",
    details: [
      "Construction cost advice",
      "Review of project cost priorities",
      "Support for informed financial decisions",
    ],
    icon: "chart",
    className: "service-cost",
  },
] as const;

export type ProjectCategory = "Corporate" | "Residential" | "Specialist";
export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  subtitle: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: "firs-headquarters",
    title: "FIRS Corporate Headquarters",
    category: "Corporate",
    image: "/images/firs-headquarters.webp",
    alt: "FIRS headquarters towers with red facade panels during construction",
    subtitle: "Corporate office development",
    description:
      "A corporate headquarters development featured in SEA Surveyors Limited’s published portfolio. Its distinctive twin-tower form reflects the scale and ambition of the project.",
  },
  {
    id: "scarsdale-offices",
    title: "Scarsdale Properties",
    category: "Corporate",
    image: "/images/scarsdale-offices.webp",
    alt: "Corporate office development for Scarsdale Properties",
    subtitle: "Corporate office development",
    description:
      "A corporate office development for Scarsdale Properties Limited, featured in the firm’s published project portfolio.",
  },
  {
    id: "ikoyi-residence",
    title: "A private address in Ikoyi",
    category: "Residential",
    image: "/images/ikoyi-residence.webp",
    alt: "Private residential development on Adeyemi Lawson in Ikoyi, Lagos",
    subtitle: "Adeyemi Lawson, Ikoyi, Lagos",
    description:
      "A private residential development on Adeyemi Lawson in Ikoyi, Lagos, featured in SEA Surveyors Limited’s published portfolio.",
  },
  {
    id: "cbn-learning-centre",
    title: "CBN Learning Centre",
    category: "Corporate",
    image: "/images/cbn-learning-centre.webp",
    alt: "Central Bank of Nigeria Learning Centre refurbishment project",
    subtitle: "Satellite Town, Lagos",
    description:
      "The refurbishment of the CBN Learning Centre in Satellite Town, Lagos, is part of the firm’s published corporate project portfolio.",
  },
  {
    id: "ctc-laboratory",
    title: "CTC Laboratory",
    category: "Specialist",
    image: "/images/ctc-laboratory.webp",
    alt: "Laboratory development for CTC",
    subtitle: "Laboratory development",
    description:
      "A laboratory development for CTC, featured in SEA Surveyors Limited’s published project portfolio.",
  },
];

export const approach = [
  {
    title: "Understand the vision",
    description:
      "We begin with your objectives, priorities, and the possibilities of your project.",
  },
  {
    title: "Build the right plan",
    description:
      "We bring the scope, budget, and project requirements into focus.",
  },
  {
    title: "Guide the delivery",
    description:
      "We coordinate, monitor, and advise as your project takes shape.",
  },
  {
    title: "Bring it all together",
    description:
      "We support project closure with the same attention we bring to the first conversation.",
  },
];
