export interface Persona {
  id: string;
  label: string;
  focus: string;
  guidance: string;
  skillsHint: string;
  titlePlaceholder: string;
  bioExample: string;
  archetypes: string[];
}

export const PERSONAS: Persona[] = [
  {
    id: "engineer",
    label: "Software Engineer / Architect",
    focus: "software engineers and technical architects",
    guidance:
      "Focus on architectural impact, scale, and shipped systems. Highlight concrete technologies, infrastructure, and measurable engineering outcomes.",
    skillsHint: "e.g. NestJS, Kubernetes, GCP, Gemini 2.5, PostgreSQL",
    titlePlaceholder: "e.g. Senior Backend Architect",
    bioExample:
      "7+ years as a Senior Backend Engineer / Backend Lead; sole owner of a multi-tenant SaaS platform serving 100+ organizations. Integrated Gemini 2.5 Flash into live hiring workflows (resume parsing, scoring, chat). Certified in Cloud and Generative AI.",
    archetypes: [
      "Architectural & Scale-focused",
      "Generative AI & LLM Pioneer",
      "Sleek Minimalist Engineer",
      "Cloud Architecture Expert",
    ],
  },
  {
    id: "marketer",
    label: "Marketing & Growth",
    focus: "marketing and growth professionals",
    guidance:
      "Focus on measurable growth outcomes, campaign impact, and brand-building. Highlight channels, tools, and results such as pipeline generated or CAC reduced.",
    skillsHint: "e.g. SEO, HubSpot, Paid Media, Content Strategy, Analytics",
    titlePlaceholder: "e.g. Senior Growth Marketing Manager",
    bioExample:
      "6+ years leading demand-gen for B2B SaaS; grew organic pipeline 3x through SEO and content, and ran paid acquisition across Google and LinkedIn Ads. Owns full-funnel analytics and lifecycle campaigns.",
    archetypes: [
      "Growth & Performance-focused",
      "Brand & Storytelling Lead",
      "Data-Driven Marketer",
      "Full-Funnel Strategist",
    ],
  },
  {
    id: "sales",
    label: "Sales & Business Development",
    focus: "sales and business development professionals",
    guidance:
      "Focus on revenue impact, deal size, quota attainment, and relationship-building. Highlight tools, territories, and closed outcomes.",
    skillsHint: "e.g. Salesforce, Enterprise SaaS, Account Management, Negotiation",
    titlePlaceholder: "e.g. Senior Account Executive",
    bioExample:
      "5+ years in enterprise SaaS sales; consistently exceeded quota, closing six-figure annual contracts across APAC. Built and managed a pipeline of 50+ enterprise accounts using Salesforce and a consultative selling approach.",
    archetypes: [
      "Revenue & Quota-focused",
      "Enterprise Relationship Builder",
      "Consultative Solutions Seller",
      "Regional Growth Driver",
    ],
  },
  {
    id: "designer",
    label: "Product / UX Designer",
    focus: "product and UX/UI designers",
    guidance:
      "Focus on design systems, user research impact, and product craft. Highlight tools, shipped products, and measurable UX outcomes.",
    skillsHint: "e.g. Figma, Design Systems, User Research, Prototyping, Accessibility",
    titlePlaceholder: "e.g. Senior Product Designer",
    bioExample:
      "6+ years designing B2B SaaS products end to end; built and maintained a company-wide design system in Figma, ran user research that lifted activation by 20%, and partnered closely with engineering on accessible, shipped features.",
    archetypes: [
      "Systems & Craft-focused",
      "Research-Driven Designer",
      "Minimalist Product Thinker",
      "Cross-Functional Collaborator",
    ],
  },
  {
    id: "executive",
    label: "Executive & Leadership",
    focus: "executives and senior leaders",
    guidance:
      "Focus on organizational impact, strategic vision, and leadership scale such as team size, revenue owned, or transformations led.",
    skillsHint: "e.g. P&L Ownership, Org Design, Strategic Planning, Board Reporting",
    titlePlaceholder: "e.g. VP of Engineering",
    bioExample:
      "10+ years leading technology organizations; scaled engineering from 8 to 60 people, owned an $20M product P&L, and led a company-wide cloud migration that cut infrastructure cost by 35%.",
    archetypes: [
      "Strategic & Scale-focused",
      "Transformation Leader",
      "People-First Executive",
      "Operator & Builder",
    ],
  },
  {
    id: "hr",
    label: "HR & People Ops",
    focus: "HR, talent, and people operations professionals",
    guidance:
      "Focus on talent outcomes and culture-building. Highlight retention, hiring scale, and org-development initiatives. Do not reference or invite protected-class information (race, religion, marital status, etc.).",
    skillsHint: "e.g. Talent Acquisition, HRIS, Employee Engagement, Comp & Benefits",
    titlePlaceholder: "e.g. Head of People Operations",
    bioExample:
      "7+ years in people operations for fast-growing tech companies; built hiring pipelines that scaled headcount from 30 to 200, launched an engagement program that improved retention by 15%, and rolled out a company-wide HRIS.",
    archetypes: [
      "Culture & Retention-focused",
      "Scaling Talent Partner",
      "People Programs Builder",
      "Inclusive Workplace Advocate",
    ],
  },
];

export const PERSONA_MAP: Record<string, Persona> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, p])
);

export const DEFAULT_PERSONA_ID = "engineer";
