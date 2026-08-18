// Single source of truth for page content.
// Copy is taken VERBATIM from the previous portfolio (malotaibi.dev /
// github.com/moehalotaibi/malotaibi-dev) — do not reword without asking Moe.

export type Accent =
  | "violet"
  | "amber"
  | "cyan"
  | "green"
  | "pink"
  | "blue"
  | "cream";

/** A run of text, optionally accent-colored. Used for multi-color sentences. */
export type Segment = {
  text: string;
  accent?: Accent;
};

export const site = {
  name: "moe.",
  fullName: "Mohammed Alotaibi",
  role: "UX Designer/Front-End Dev",
  location: "Riyadh, Saudi Arabia",
  email: "moe.halotaibi@gmail.com",
  phone: "+966 553 012 825",
  url: "https://www.malotaibi.dev",
  bio: "Creating with code. Small details matter.",
  cv: "https://drive.google.com/file/d/1_xw-EXWEFIBch22882AYDB2BTLOakxkG/view?usp=sharing",
} as const;

// ---------------------------------------------------------------- hero

export type HeroLine = {
  text: string;
  accent: Accent;
  gradient?: boolean;
};

export type Annotation = {
  /**
   * comment — sans "//" note, wraps to two lines;
   * status  — bordered pill with a colored dot;
   * cursor  — Figma-style cursor with a colored name tag, drifts in a circle.
   */
  kind: "comment" | "status" | "cursor";
  text: string;
  accent?: Accent;
  /** Absolute positioning classes, applied on lg+ screens only. */
  className: string;
};

export const hero = {
  greeting: "Hello, I'm Mohammed",
  // Job title verbatim: "UX Designer/Front-End Dev"
  lines: [
    { text: "UX", accent: "violet", gradient: true },
    { text: "Designer", accent: "amber", gradient: true },
    { text: "& Front-End", accent: "cream" },
    { text: "Dev", accent: "cyan" },
  ] as HeroLine[],
  // The old site's flip sentences, joined: ui/ux designer · visual design · ux research
  tagline: [
    { text: "ui/ux designer", accent: "violet" },
    { text: ", " },
    { text: "visual design", accent: "amber" },
    { text: " and " },
    { text: "ux research", accent: "cyan" },
    { text: " — creating with code. Small details matter." },
  ] as Segment[],
  // Layout copied from the reference hero: cursor cluster hanging off the
  // greeting chip, comment at the top-right edge, status chip beside line 3,
  // name tag overlapping line 4, comment + cursor stacked at bottom-left.
  annotations: [
    {
      kind: "cursor",
      text: "Design",
      accent: "pink",
      className: "left-[42%] -top-[5%]",
    },
    {
      kind: "comment",
      text: "// Based in Riyadh, Saudi Arabia",
      className: "left-[64%] top-[2%] w-[16ch] text-left",
    },
    {
      kind: "status",
      text: "Let's Connect",
      accent: "green",
      className: "-right-12 top-[54%]",
    },
    {
      kind: "comment",
      text: "// Small details matter",
      className: "right-[69%] top-[78%] w-[14ch] text-left",
    },
    {
      kind: "cursor",
      text: "Code",
      accent: "blue",
      className: "-left-20 top-[90%]",
    },
    {
      kind: "cursor",
      text: "moe.",
      accent: "violet",
      className: "-right-2 top-[71%]",
    },
  ] as Annotation[],
} as const;

// ------------------------------------------------------- divider band

export const divider = {
  label: "// Design, Code, Ship",
} as const;

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "figma";
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/moehalotaibi", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-alotaibi-1aa047311/",
    icon: "linkedin",
  },
];

// --------------------------------------------------------------- intro
// Verbatim from the old site's About section.

export const intro = {
  lead: "UX Designer with hands-on experience in designing and building user-centered digital interfaces.",
  accentTitle: ["UX Designer", "Front-End Dev"],
  body: "Strong ability to translate UX research, wireframes, and prototypes into responsive and accessible front-end experiences. Experienced in working on enterprise and government digital platforms, with a solid foundation in design thinking, usability, and modern UI development.",
  aside:
    "Combined my UX design background with front-end engineering for a fast, minimalist experience.",
} as const;

// -------------------------------------------------------- capabilities
// About page "I can help you with" — bodies verbatim from experience bullets.

export type Capability = {
  index: string;
  title: string;
  body: string;
  accent: Accent;
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "UI/UX Design",
    accent: "violet",
    body: "Leading the end-to-end UX design process for digital products and client-facing platforms.",
  },
  {
    index: "02",
    title: "Prototyping",
    accent: "cyan",
    body: "Creating wireframes, prototypes, and high-fidelity designs to deliver seamless user experiences.",
  },
  {
    index: "03",
    title: "User Research",
    accent: "amber",
    body: "Conducting user research and usability testing to continuously improve product design.",
  },
  {
    index: "04",
    title: "Front-End Dev",
    accent: "green",
    body: "Developing reusable, accessible UI components with TypeScript and Tailwind CSS.",
  },
];

// ------------------------------------------------------------ services
// Home "What you get" cards — same real capabilities, outcome-framed order.

export type Service = {
  title: string;
  body: string;
  accent: Accent;
  icon: "pen" | "stack" | "code" | "globe" | "user";
};

export const services: Service[] = [
  {
    title: "UI/UX Design",
    body: "Leading the end-to-end UX design process for digital products and client-facing platforms.",
    accent: "violet",
    icon: "pen",
  },
  {
    title: "Prototyping",
    body: "Creating wireframes, prototypes, and high-fidelity designs to deliver seamless user experiences.",
    accent: "cyan",
    icon: "stack",
  },
  {
    title: "User Research",
    body: "Conducting user research and usability testing to continuously improve product design.",
    accent: "amber",
    icon: "user",
  },
  {
    title: "Front-End Dev",
    body: "Developing reusable, accessible UI components with TypeScript and Tailwind CSS.",
    accent: "green",
    icon: "code",
  },
];

// -------------------------------------------------- experience & skills

export type SkillRow = {
  index: string;
  word: string;
  accent: Accent;
  body: string;
  tags: string[];
};

export const skills: SkillRow[] = [
  {
    index: "01",
    word: "UI/UX Design",
    accent: "violet",
    body: "Strong ability to translate UX research, wireframes, and prototypes into responsive and accessible front-end experiences.",
    tags: ["Figma", "Framer", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    index: "02",
    word: "Visual Design",
    accent: "amber",
    body: "Brand identity, motion graphics, and visual storytelling across the Adobe suite.",
    tags: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "InDesign"],
  },
  {
    index: "03",
    word: "UX Research",
    accent: "cyan",
    body: "Conducted user research, competitive analysis, and created user personas to guide design decisions.",
    tags: ["UX Research", "User Personas", "Usability Testing", "Information Architecture", "Design Thinking"],
  },
  {
    index: "04",
    word: "Front-End Dev",
    accent: "green",
    body: "Developed reusable, accessible UI components with TypeScript and Tailwind CSS.",
    tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Cursor"],
  },
];

// -------------------------------------------------------- case studies
// The old site's featured UX projects — descriptions verbatim.

export type Stat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  /** Pill tag, top-left of the card. */
  tag: string;
  title: string;
  /** 1–2 line description under the title — verbatim from the old site. */
  description: string;
  /** Big accent metric, top-right of the card. */
  heroStat: Stat;
  /** Three small stats in the card body. */
  stats: Stat[];
  meta: { role: string; platform: string; duration: string };
  accent: Accent;
  /** External link, when the project is live. */
  link?: string;
};

// Real work only: Moe's Udacity capstone + nanodegree portfolio projects.
export const caseStudies: CaseStudy[] = [
  {
    // Real project — Moe's Udacity capstone, content from his case-study PDF.
    slug: "keeta-redesign",
    tag: "UX Case Study · Food Delivery",
    title: "Keeta Redesign",
    description:
      "Modern redesign of Keeta application, focusing on improved user experience, intuitive navigation, and contemporary visual design.",
    heroStat: { value: "5", label: "Usability test participants" },
    stats: [
      { value: "3", label: "Home → Restaurant → Checkout" },
      { value: "5 Wks", label: "Jan 21 — Feb 25, 2026" },
      { value: "KPI", label: "Decrease time on task" },
    ],
    meta: { role: "UX Designer", platform: "Mobile · Figma, Miro, Mobbin", duration: "5 Weeks · 2026" },
    accent: "cyan",
    link: "https://www.figma.com/design/wAHgbCdJWZPm9n5V3Zr1rj/Untitled?node-id=0-1&t=UFMSMIZnHj3d69J2-1",
  },
  {
    // Real project — Udacity research project, content from his research
    // plan, UX research report, and design-iteration documents.
    slug: "learning-app-onboarding",
    tag: "UX Case Study · Research & Iteration",
    title: "Mobile Learning App — Onboarding Redesign",
    description:
      "Understanding why users drop off during the onboarding of a mobile learning app — then redesigning the flow around the findings, from five steps to two.",
    heroStat: { value: "5 → 2", label: "Onboarding steps" },
    stats: [
      { value: "6", label: "User interviews" },
      { value: "42", label: "Survey responses" },
      { value: "67%", label: "Cited “too many steps”" },
    ],
    meta: { role: "UX Researcher & Designer", platform: "Mobile · Figma, Miro", duration: "2026" },
    accent: "violet",
  },
  {
    slug: "ux-nanodegree",
    tag: "UX Case Study · Udacity Nanodegree",
    title: "UX Nanodegree — Capstone & Portfolio Projects",
    description:
      "End-to-end UX case studies completed as part of the Udacity User Experience Nanodegree Program.",
    heroStat: { value: "E2E", label: "UX case studies" },
    stats: [
      { value: "Research", label: "Personas & competitive analysis" },
      { value: "Flows", label: "Wireframes & prototypes" },
      { value: "Testing", label: "Usability iterations" },
    ],
    meta: { role: "UX Research & Design", platform: "Figma", duration: "2026" },
    accent: "amber",
    link: "https://drive.google.com/drive/folders/1kP5qEUUyCiyBTZKctVDlDMYdwTLuYzzu?usp=sharing",
  },
];

// ------------------------------------------------------------ projects
// The old site's dev/other projects — descriptions verbatim, bullets intact.

export type Project = {
  title: string;
  year: string;
  category: string;
  stack: string;
  accent: Accent;
  bullets: string[];
  href?: string;
  image?: string;
  imageAlt?: string;
};

export const workIntro =
  "End-to-end UX and product design work — from research to shipped product.";

export const projectsIntro =
  "Featured UX design work — brand identity, product design, and live platforms.";

// UX Projects — the old site's featured work, descriptions verbatim.
// `year` carries the project status word from the old site.
export const projects: Project[] = [
  {
    title: "LABvision Academy",
    year: "Live",
    category: "UI/UX Design",
    stack: "Web Development, EdTech, Arabic RTL",
    accent: "violet",
    bullets: [
      "Arabic e-learning platform for medical laboratory sciences, helping students and professionals prepare for the Saudi laboratory licensing exam (SLLE) with specialized courses, a 200+ question bank, mock exams, and a dedicated lab job board.",
    ],
    href: "https://labvision-academy.vercel.app/",
    image: "/work/labvision.jpg",
    imageAlt: "LABvision Academy homepage",
  },
  {
    title: "Agile Advice",
    year: "Live",
    category: "Brand Identity",
    stack: "Figma, Logo Design, Web Design",
    accent: "green",
    bullets: [
      "Complete brand identity and website design for Agile Advice, a business services company. Created a cohesive visual language and user-friendly digital experience.",
    ],
    href: "https://www.agileadvice.sa/",
    image: "/work/agile-advice-hero.jpg",
    imageAlt: "Agile Advice website",
  },
  {
    title: "OSTOUL Product Design",
    year: "Completed",
    category: "Product Design",
    stack: "Figma, Wireframing, User Research, Design Thinking",
    accent: "amber",
    bullets: [
      "Full UI/UX design of Elm's product 'OSTOUL', from research and wireframes to interactive prototypes, emphasizing user-centric design.",
    ],
    href: "https://www.figma.com/design/KrMgwhqKHqUAdwn9NqS1ly/Untitled?node-id=0-21311&t=6xInwYovn7QhM64e-1",
    image: "/work/ostoul.png",
    imageAlt: "Ostoul car marketplace page",
  },
  {
    title: "Keeta Redesign",
    year: "Finalizing",
    category: "Mobile Design",
    stack: "Figma, UI/UX Design",
    accent: "cyan",
    bullets: [
      "Modern redesign of Keeta application, focusing on improved user experience, intuitive navigation, and contemporary visual design.",
    ],
    href: "https://www.figma.com/design/wAHgbCdJWZPm9n5V3Zr1rj/Untitled?node-id=0-1&t=UFMSMIZnHj3d69J2-1",
    image: "/work/keeta.png",
    imageAlt: "Keeta home screen redesign",
  },
  {
    title: "SNB Mobile",
    year: "Building",
    category: "Financial UX",
    stack: "Figma, Mobile Design",
    accent: "pink",
    bullets: [
      "Mobile banking application design project focusing on user-friendly financial interfaces and secure, accessible digital banking experience.",
    ],
    image: "/work/snb-mobile.jpg",
    imageAlt: "SNB Mobile banking design",
  },
];

// --------------------------------------------------------- testimonials
// Verbatim from the old site.

export type Testimonial = {
  quote: string;
  authorName: string;
  authorTagline: string;
  href?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Certificate of Appreciation for Mohammed Mutlaq Al-Otaibi in recognition of his outstanding contributions and efforts during the cooperative training program.",
    authorName: "Fayez Abdullah Al-Harbi",
    authorTagline: "GM of HR Operations @Elm",
    href: "https://www.elm.sa",
  },
];

// ----------------------------------------------------------- tech stack
// The old site's Stack section. Adobe apps have no brand icons available,
// so they live in the About toolkit as text chips instead.

export type BrandSlug =
  | "figma"
  | "framer"
  | "cursor"
  | "claude"
  | "github"
  | "linkedin"
  | "react"
  | "nextdotjs"
  | "typescript"
  | "tailwindcss"
  | "javascript"
  | "html5"
  | "css"
  | "git"
  | "vercel"
  | "blender"
  | "miro";

export type TechIcon = {
  title: string;
  /** Official colored logo in public/tech (devicon). */
  img?: string;
  /** Fallback simple-icons glyph — for pure-black brands, rendered cream. */
  brand?: BrandSlug;
};

export const techStack = {
  blurb: [
    { text: "Figma", accent: "violet" },
    { text: ", " },
    { text: "Framer", accent: "amber" },
    { text: " and the Adobe suite on the design side — " },
    { text: "HTML, CSS, JavaScript and TypeScript", accent: "cyan" },
    { text: " on the build side." },
  ] as Segment[],
  icons: [
    { title: "Figma", img: "/tech/figma.svg" },
    { title: "Photoshop", img: "/tech/photoshop.svg" },
    { title: "Illustrator", img: "/tech/illustrator.svg" },
    { title: "After Effects", img: "/tech/aftereffects.svg" },
    { title: "Premiere Pro", img: "/tech/premierepro.svg" },
    { title: "Framer", img: "/tech/framermotion.svg" },
    { title: "HTML", img: "/tech/html5.svg" },
    { title: "CSS", img: "/tech/css3.svg" },
    { title: "JavaScript", img: "/tech/javascript.svg" },
    { title: "TypeScript", img: "/tech/typescript.svg" },
    { title: "React", img: "/tech/react.svg" },
    { title: "Next.js", brand: "nextdotjs" },
    { title: "Tailwind CSS", img: "/tech/tailwindcss.svg" },
    { title: "Git", img: "/tech/git.svg" },
    { title: "Vercel", brand: "vercel" },
    { title: "Claude", brand: "claude" },
  ] as TechIcon[],
} as const;

// --------------------------------------------------------------- about

export const about = {
  hello: "Hello! I'm Mohammed",
  subline: "UX Designer / Front-End Dev",
  roleTag: "UX Designer/Front-End Dev",
  headline: [
    { text: "UX Designer with hands-on experience in designing and building " },
    { text: "user-centered digital interfaces", accent: "violet" },
    { text: "." },
  ] as Segment[],
  note: "Strong ability to translate UX research, wireframes, and prototypes into responsive and accessible front-end experiences. Experienced in working on enterprise and government digital platforms, with a solid foundation in design thinking, usability, and modern UI development.",
} as const;

// --------------------------------------------------------------- roles
// Verbatim from the old site's Experience section, bullets intact.

export type Role = {
  period: string;
  title: string;
  /** Company / issuer. Empty string hides the suffix (education entries). */
  org: string;
  accent: Accent;
  details: string[];
  tags: string[];
  /** Optional preview image for the entry's frame. */
  image?: string;
  imageAlt?: string;
  /** "contain" centers a logo on a white ground instead of cover-cropping. */
  imageFit?: "cover" | "contain";
};

export const roles: Role[] = [
  {
    period: "03.2026 — Now",
    title: "UX Designer",
    org: "Agile Advice",
    accent: "green",
    details: [
      "Leading the end-to-end UX design process for Agile Advice's digital products and client-facing platforms.",
      "Creating wireframes, prototypes, and high-fidelity designs to deliver seamless user experiences.",
      "Collaborating with stakeholders to translate business requirements into intuitive, user-centered interfaces.",
      "Conducting user research and usability testing to continuously improve product design.",
    ],
    tags: ["UI/UX Design", "Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
    image: "/work/agile-advice-wordmark.png",
    imageAlt: "Agile Advice",
    imageFit: "contain",
  },
  {
    period: "08.2024 — 04.2025",
    title: "COOP Trainee, Internship",
    org: "ELM Company",
    accent: "cyan",
    details: [
      "Redesigned Elm Company's UI/UX using Figma and Spline, creating a modern, interactive interface with improved navigation and usability.",
      "Designed a landing page for the Ministry of Human Resources and Social Development, focusing on accessibility, clarity, and user-friendly layouts.",
      "Produced a motion graphic video for Elm Company, showcasing products, work culture, and challenges through engaging storytelling and animation.",
      "Led the full UI/UX design of Elm's product \"OSTOUL\", from research and wireframes to interactive prototypes, emphasizing user-centric design.",
      "Designed an AI application, simplifying human-AI interaction with intuitive flows and clean interface design.",
    ],
    tags: ["UI/UX Design", "Figma", "Spline", "Wireframing", "Prototyping", "User Research", "Motion Graphics", "Design Thinking"],
    image: "/work/elm.jpg",
    imageAlt: "ELM Company",
    imageFit: "contain",
  },
];

// ----------------------------------------------------------- education
// Own section on the About page, separate from work experience.

export const education: Role[] = [
  {
    period: "08.2021 — 11.2024",
    title: "Imam Mohammed Ibn Saud University",
    org: "",
    accent: "violet",
    details: ["Bachelor of Marketing and Communication"],
    tags: ["Marketing", "Communication", "Business", "Strategy"],
    image: "/work/imam-university.png",
    imageAlt: "Imam Mohammad Ibn Saud Islamic University",
    imageFit: "contain",
  },
  {
    period: "2026",
    title: "Udacity — User Experience Nanodegree Program",
    org: "",
    accent: "amber",
    details: [
      "Completed end-to-end UX case studies including research, wireframing, prototyping, and usability testing.",
      "Built a comprehensive UX portfolio with real-world product design projects.",
    ],
    tags: ["UX Research", "User Personas", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
    image: "/work/udacity-logo.png",
    imageAlt: "Udacity",
    imageFit: "contain",
  },
];

// ------------------------------------------------------ certifications
// Verbatim from the old site.

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    title: "User Experience Nanodegree Program",
    issuer: "Udacity",
    year: "2026",
    href: "https://www.udacity.com/certificate/e/9b904088-11bb-11f1-81cc-8b75fe8fc5a9",
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    year: "2026",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/SUYWKSU26FFQ",
  },
  {
    title: "UX/UI",
    issuer: "SATR - Tuwaiq Academy",
    year: "2026",
    href: "https://satr.tuwaiq.edu.sa",
  },
  {
    title: "UX Research and Planning",
    issuer: "SATR - Tuwaiq Academy",
    year: "2026",
    href: "https://satr.tuwaiq.edu.sa",
  },
  {
    title: "Applied UX/UI Project",
    issuer: "SATR - Tuwaiq Academy",
    year: "2026",
    href: "https://satr.tuwaiq.edu.sa",
  },
  {
    title: "UI Prototyping",
    issuer: "SATR - Tuwaiq Academy",
    year: "2026",
    href: "https://satr.tuwaiq.edu.sa",
  },
  {
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    year: "2025",
    href: "https://www.coursera.org/account/accomplishments/verify/250PTQ3MFU7Z",
  },
  {
    title: "Full Stack Web Development Bootcamp",
    issuer: "Udemy",
    year: "2025",
  },
  { title: "Graphic Design Diploma", issuer: "gd-workshop", year: "2023" },
  { title: "Adobe Creative Cloud", issuer: "gd-workshop", year: "2023" },
  { title: "UI/UX MasterClass", issuer: "gd-workshop", year: "2023" },
  { title: "Introduction to Blender", issuer: "gd-workshop", year: "2023" },
];

// -------------------------------------------------------------- toolkit
// The old site's stack, grouped.

export type ToolkitGroup = {
  group: string;
  accent: Accent;
  items: string[];
};

export const toolkit: ToolkitGroup[] = [
  {
    group: "Design",
    accent: "violet",
    items: ["Figma", "Framer", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "InDesign"],
  },
  {
    group: "Build",
    accent: "green",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Cursor"],
  },
  {
    group: "Practice",
    accent: "cyan",
    items: ["UX Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"],
  },
];

// -------------------------------------------------------------- footer

export const footerContent = {
  // The old site's bio, verbatim, as the signature line.
  slogan: [
    { text: "Creating with " },
    { text: "code", accent: "green" },
    { text: ". Small " },
    { text: "details", accent: "violet" },
    { text: " matter." },
  ] as Segment[],
  exploreHeading: { text: "Explore", accent: "amber" as Accent },
  followHeading: { text: "Follow Me", accent: "cyan" as Accent },
  ctas: [
    { label: "Contact Me", sub: "Say hello!", href: "/contact" },
    { label: "Case Studies", sub: "Explore the work", href: "/case-studies" },
  ],
} as const;

// ------------------------------------------------------------- contact
// Page chrome strings only — the address, phone, and location themselves
// come from `site` above.

export const contact = {
  eyebrow: "// Say hello",
  methods: {
    email: "Email",
    phone: "Phone",
    location: "Location",
  },
  elsewhereLabel: "// Elsewhere",
  form: {
    label: "// Write a message",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    messageLabel: "Message",
    messagePlaceholder: "What are we making?",
    submit: "Send Message",
    note: "// opens your mail app",
  },
} as const;

// ----------------------------------------------------------------- nav

export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "grid" | "briefcase" | "user";
};

// Case Studies and UX Projects are separate pages.
export const nav: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Case Studies", href: "/case-studies", icon: "grid" },
  { label: "UX Projects", href: "/projects", icon: "briefcase" },
  { label: "About Me", href: "/about", icon: "user" },
];
