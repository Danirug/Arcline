export const site = {
  name: "ArcLine",
  tagline: "Intelligent systems for better business operations.",
  description:
    "ArcLine designs AI automation, intelligent workflows and custom systems that help businesses reduce repetitive work, connect their operations and work more efficiently.",
  email: "hello@arcline.co",
} as const;

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Automation", href: "#ai-automation" },
  { label: "Work", href: "#outcomes" },
  { label: "Insights", href: "#approach" },
] as const;

export const navActions = {
  cta: { label: "Book a consultation", href: "#contact" },
} as const;

export const hero = {
  eyebrow: "Custom Web, Automation & AI",
  headline: "Custom web platforms, built around your business.",
  subheadline:
    "ArcLine designs and builds custom websites and web applications, then connects your tools, automates repetitive work and adds practical AI where it is genuinely useful.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See how it works", href: "#approach" },
} as const;

/** Illustrative scenario animated in the hero visual. */
export const heroScenario = {
  ask: {
    tag: "Ask ArcLine",
    label: "Business requirement",
    /** Cycled through on each loop of the animation. */
    examples: [
      {
        category: "Custom Web Development",
        prompt:
          "We need a custom web platform built around how our business actually works.",
      },
      {
        category: "Business Automation",
        prompt:
          "We want to reduce repetitive work and connect our existing tools.",
      },
      {
        category: "AI Integration",
        prompt:
          "We want to add practical AI capabilities to our existing digital systems.",
      },
    ],
  },
  build: {
    tag: "Solution build",
    steps: [
      "Design custom web experience",
      "Build responsive web application",
      "Develop custom business features",
      "Connect required APIs & tools",
      "Automate repetitive workflows",
      "Integrate AI where useful",
    ],
  },
  systems: {
    tag: "Connected systems",
    items: [
      { name: "Custom web app", detail: "Built around your business" },
      { name: "API integrations", detail: "Tools & data connected" },
      { name: "AI + automation", detail: "Smarter digital workflows" },
    ],
  },
  result: {
    tag: "Result",
    label: "Custom digital solution",
    status: "Live",
    body: "A tailored web platform with connected systems, automation, and intelligent features.",
    traits: ["Custom", "Connected", "Scalable"],
    cta: { label: "Explore our solutions", href: "#services" },
  },
} as const;

export const proposition = {
  label: "Who we work with",
  headline: "Operations that have outgrown manual effort.",
  body: "ArcLine partners with businesses where complexity has accumulated — disconnected tools, fragmented data, and processes that depend too heavily on people moving information by hand. We design the systems that bring clarity back to how work gets done.",
} as const;

export const challenges = [
  "Repetitive manual work across teams",
  "Disconnected software and siloed data",
  "Slow approvals and administrative bottlenecks",
  "Poor visibility into operational performance",
  "Systems that do not communicate with each other",
  "Processes that become harder to scale over time",
] as const;

export const services = [
  {
    number: "01",
    slug: "ai-automation",
    title: "AI Automation",
    summary:
      "AI-powered automation that removes repetitive manual work from business operations.",
    details: [
      "Document processing and information handling",
      "Automated reporting and administrative tasks",
      "Customer request processing and workflow automation",
      "Intelligent task routing across teams",
    ],
  },
  {
    number: "02",
    slug: "intelligent-workflows",
    title: "Intelligent Workflows",
    summary:
      "Connected workflows that move tasks, information and decisions through your organisation automatically.",
    details: [
      "Approvals, notifications and task assignments",
      "Data movement and business rules",
      "System integrations and operational triggers",
      "End-to-end process orchestration",
    ],
  },
  {
    number: "03",
    slug: "ai-agents",
    title: "AI Agents",
    summary:
      "Purpose-built AI agents that perform specific business tasks — practical systems, not gimmicks.",
    details: [
      "Information retrieval and business data analysis",
      "Interaction with internal systems and APIs",
      "Employee and customer assistance",
      "Report generation and workflow triggers",
    ],
  },
  {
    number: "04",
    slug: "data-integration",
    title: "Data Integration",
    summary:
      "Reliable connections between fragmented systems so teams have the information they need.",
    details: [
      "APIs, databases and SaaS platforms",
      "CRM, ERP and analytics systems",
      "Legacy system connectivity",
      "Unified data flow across the business",
    ],
  },
  {
    number: "05",
    slug: "internal-tools",
    title: "Internal Tools",
    summary:
      "Custom software designed around how your business actually operates.",
    details: [
      "Operational and management dashboards",
      "Workflow management platforms",
      "Admin systems and employee tools",
      "AI-assisted internal applications",
    ],
  },
  {
    number: "06",
    slug: "process-transformation",
    title: "Process Transformation",
    summary:
      "Analysis and redesign of existing processes using modern technology — not AI for its own sake.",
    details: [
      "Workflow mapping and bottleneck identification",
      "Automation and AI where genuinely useful",
      "System connection and information flow design",
      "New internal tools aligned to operations",
    ],
  },
] as const;

export const outcomes = {
  label: "Business outcomes",
  headline: "Technology should simplify operations, not add another layer of complexity.",
  items: [
    "Less manual work",
    "Faster operations",
    "Faster decisions",
    "Connected systems",
    "Better access to information",
    "Reduced repetitive work",
    "Improved operational visibility",
    "More consistent processes",
    "Scalable workflows",
    "Better employee experiences",
    "More efficient teams",
  ],
} as const;

export const approach = {
  label: "Our approach",
  headline: "Thoughtful systems. Clean execution.",
  steps: [
    {
      title: "Discover",
      description:
        "We map existing workflows, systems and pain points to understand how operations actually function today.",
    },
    {
      title: "Design",
      description:
        "We architect solutions around business logic — defining integrations, automation and the right level of intelligence.",
    },
    {
      title: "Build",
      description:
        "We develop and deploy production systems with clean engineering, thorough testing and clear documentation.",
    },
    {
      title: "Improve",
      description:
        "We monitor performance, refine workflows and extend capabilities as your operations evolve.",
    },
  ],
} as const;

export const cta = {
  label: "Work with ArcLine",
  headline: "We design the systems behind better businesses.",
  body: "Tell us about the operational challenges your team faces. We will respond with a clear view of what an intelligent system could look like for your business.",
  button: { label: "Start a project", href: "mailto:hello@arcline.co" },
} as const;

export const footer = {
  tagline: "Less manual work. Better systems.",
  links: [
    { label: "Services", href: "#services" },
    { label: "AI Agents", href: "#ai-agents" },
    { label: "Automation", href: "#ai-automation" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
