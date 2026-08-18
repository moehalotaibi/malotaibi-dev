// Long-form case-study detail content for /work/[slug].
// Card bodies reuse VERBATIM sentences from lib/content.ts (case-study
// descriptions, project bullets, role details, skill bodies, stat labels)
// wherever possible; connective prose is minimal and neutral. No invented
// metrics, clients, or outcomes — qualitative only.

import type { Accent } from "./content";

export type CaseSectionItem = {
  title: string;
  body: string;
  /** Colors the card title; falls back to the study accent. */
  accent?: Accent;
};

export type CaseSection = {
  id: string;
  title: string;
  /** Small label rendered above the section title. */
  kicker?: string;
  /** 1–2 sentences of neutral connective prose under the header. */
  intro?: string;
  items?: CaseSectionItem[];
  /** Render 01/02/03 indexes on the item cards. */
  numbered?: boolean;
  /** Screenshots rendered as framed images after the items. */
  images?: {
    src: string;
    alt: string;
    /** Frame aspect; defaults to "phone". */
    ratio?: "video" | "square" | "tall" | "phone" | "wide";
  }[];
  /** Interactive before/after comparison slider, rendered after the images. */
  beforeAfter?: {
    before: { src: string; alt: string };
    after: { src: string; alt: string };
  };
};

export type CaseStudyDetail = {
  slug: string;
  /** Expanded title line for the detail hero. */
  headline: string;
  sections: CaseSection[];
};

export const caseStudyDetails: CaseStudyDetail[] = [
  // ---------------------------------------------------- keeta-redesign
  {
    "slug": "keeta-redesign",
    "headline": "Redesigning Keeta's ordering flow — from visual clutter to a checkout users complete without hesitation",
    "sections": [
      {
        "id": "overview",
        "title": "What is the Keeta Redesign?",
        "kicker": "Food Delivery · Udacity Capstone",
        "intro": "A modern redesign of the Keeta food delivery application, focusing on improved user experience, intuitive navigation, and contemporary visual design — carried end to end through research, prototyping, testing, and iteration.",
        "items": [
          {
            "title": "The flow",
            "body": "The full Homepage → Restaurant → Checkout journey."
          },
          {
            "title": "Tools",
            "body": "Figma for design and prototyping, Miro for concepting, Mobbin for pattern research."
          },
          {
            "title": "Timeline",
            "body": "January 21 — February 25, 2026."
          },
          {
            "title": "The KPI",
            "body": "Decrease Time on Task.",
            "accent": "cyan"
          }
        ]
      },
      {
        "id": "need",
        "title": "The Challenge",
        "kicker": "Why",
        "intro": "The original food delivery app interface contained significant visual clutter and multiple competing promotional elements.",
        "items": [
          {
            "title": "Competing promotions",
            "body": "Discounts, vouchers, and delivery offers were presented in different formats, creating confusion around what was actually applied during checkout."
          },
          {
            "title": "Cognitive load",
            "body": "This lack of clarity increased cognitive load and slowed down user decision-making."
          },
          {
            "title": "Checkout hesitation",
            "body": "Target users — primarily frequent food delivery customers — experienced hesitation during browsing and checkout, particularly when reviewing discounts and total pricing."
          },
          {
            "title": "The opportunity",
            "body": "The dense layout and unclear hierarchy made it difficult to quickly scan content and confidently complete an order. This created an opportunity to redesign the flow with a focus on clarity, hierarchy, and reduced time on task."
          }
        ],
        "images": [
          {
            "src": "/work/keeta/before-home.jpg",
            "alt": "The original Keeta homepage"
          }
        ]
      },
      {
        "id": "discovery",
        "title": "Discovery: Research & Analysis",
        "kicker": "Research",
        "intro": "I created a structured Research Plan that clearly defined the problem, research objectives, target users, interview questions, and success metrics.",
        "items": [
          {
            "title": "Interviews & usability testing",
            "body": "I conducted user interviews and remote usability testing to better understand user behavior, pain points, and decision-making patterns within the Homepage → Restaurant → Checkout flow."
          },
          {
            "title": "Research report",
            "body": "After collecting the data, I synthesized the findings into a detailed Research Report."
          },
          {
            "title": "Key usability issues",
            "body": "Visual overload, unclear discount application, weak visual hierarchy, and checkout hesitation.",
            "accent": "cyan"
          },
          {
            "title": "Clear recommendations",
            "body": "The research phase concluded with clear design recommendations that directly informed the next stage of the project."
          }
        ]
      },
      {
        "id": "voices",
        "title": "What Testing Revealed",
        "kicker": "Participant voices",
        "intro": "Five participants browsed the homepage, added an item to cart, reviewed discounts, and completed checkout. A 50% drop-off was observed at the checkout stage; the KPI signal: complete the full ordering flow within 3 minutes.",
        "items": [
          {
            "title": "“There’s too much happening on the screen.”",
            "body": "The homepage felt visually crowded with competing banners and promotional sections — users hesitated before choosing where to start."
          },
          {
            "title": "“I’m not sure if I’m actually getting the best deal.”",
            "body": "Confusion between discount types, and whether they were applied automatically. The “No vouchers applicable” message eroded confidence."
          },
          {
            "title": "“Some text is difficult to read.”",
            "body": "Smaller, low-contrast grey text reduced readability, and small arrow icons weren’t clearly perceived as interactive."
          },
          {
            "title": "“I want a cleaner and faster experience.”",
            "body": "Too much vertical scrolling before real menu items — and users wanted a clearer price breakdown before pressing Apple Pay."
          }
        ]
      },
      {
        "id": "exploration",
        "title": "Design: Concepts to Prototype",
        "kicker": "Iterations",
        "numbered": true,
        "intro": "I focused on transforming research insights into practical design solutions, refining ideas quickly before committing to high fidelity.",
        "items": [
          {
            "title": "Brainstorming in Miro",
            "body": "I used Miro to brainstorm feature ideas, organize concepts, and collaborate visually — generating multiple potential features based on user needs."
          },
          {
            "title": "Impact vs. effort",
            "body": "I prioritized the feature ideas using impact vs. effort analysis to select the most valuable ones."
          },
          {
            "title": "Low-fidelity sketches",
            "body": "Sketching wireframes let me experiment with navigation patterns, content hierarchy, and interaction logic before moving into digital design."
          },
          {
            "title": "High-fidelity prototype",
            "body": "In Figma I built structured wireframes, then a high-fidelity prototype simulating real interactions — carefully designing spacing, visual hierarchy, typography, and interaction states across the whole journey."
          }
        ]
      },
      {
        "id": "features",
        "title": "Design: Iteration",
        "kicker": "What changed",
        "intro": "Based on usability testing feedback, I refined the redesigned flow to further reduce friction points — some users still hesitated when reviewing discounts and final pricing.",
        "items": [
          {
            "title": "Pricing contrast",
            "body": "Strengthened the contrast of pricing information so totals read instantly."
          },
          {
            "title": "Clear separation",
            "body": "Increased separation between delivery details and totals within the Checkout screen."
          },
          {
            "title": "Primary action",
            "body": "Further highlighted the primary payment action, reinforcing confidence before completing payment."
          },
          {
            "title": "Simplified discounts",
            "body": "Improved button prominence, adjusted spacing and contrast, and simplified discount presentation across the flow."
          }
        ],
        "images": [
          {
            "src": "/work/keeta/home.jpg",
            "alt": "Redesigned homepage"
          },
          {
            "src": "/work/keeta/restaurant.jpg",
            "alt": "Redesigned restaurant page"
          },
          {
            "src": "/work/keeta/checkout.png",
            "alt": "Redesigned checkout"
          }
        ]
      },
      {
        "id": "accessibility",
        "title": "Accessibility Audit",
        "kicker": "Before → after",
        "intro": "Each screen was audited before and after the redesign for contrast, touch targets, hierarchy, and assistive-technology support.",
        "items": [
          {
            "title": "Contrast",
            "body": "Low-contrast grey text and yellow-on-white banner text were adjusted to accessible ratios, with a subtle background overlay behind banner text to improve readability."
          },
          {
            "title": "Touch targets",
            "body": "Category icons and interactive elements under 44px were enlarged, with improved spacing between interactive sections."
          },
          {
            "title": "Typography",
            "body": "Font hierarchy standardized (H1, Body, Caption) to improve scannability and readability for visually impaired users."
          },
          {
            "title": "Assistive technology",
            "body": "Semantic labeling added for screen readers, plus clear focus states for interactive sections like the voucher area."
          }
        ],
        "images": [
          {
            "src": "/work/keeta/before-annotated.jpg",
            "alt": "Annotated audit of the original screens",
            "ratio": "square"
          },
          {
            "src": "/work/keeta/after-annotated.jpg",
            "alt": "Annotated improvements in the redesign",
            "ratio": "square"
          }
        ],
        "beforeAfter": {
          "before": {
            "src": "/work/keeta/before-home.jpg",
            "alt": "The original Keeta homepage"
          },
          "after": {
            "src": "/work/keeta/home.jpg",
            "alt": "Redesigned homepage"
          }
        }
      },
      {
        "id": "outcomes",
        "title": "Test: Validation & Feedback",
        "kicker": "Results",
        "intro": "To validate the redesigned flow, I conducted remote usability testing with five participants using the updated high-fidelity prototype — the same tasks as the initial research phase.",
        "items": [
          {
            "title": "Confident navigation",
            "body": "Participants were able to navigate more confidently and understand applied discounts more easily."
          },
          {
            "title": "Fewer pauses",
            "body": "Users completed checkout with fewer pauses — the cleaner structure and stronger emphasis on primary actions created a smoother, more intuitive experience."
          },
          {
            "title": "KPI supported",
            "body": "The improved structure lowered cognitive load and directly supported the selected KPI: Decrease Time on Task.",
            "accent": "cyan"
          }
        ]
      },
      {
        "id": "learnings",
        "title": "Solution & Impact",
        "kicker": "Closing",
        "numbered": true,
        "intro": "The final solution simplified the ordering experience by reducing visual clutter, improving content hierarchy, and clarifying discount presentation.",
        "items": [
          {
            "title": "Hierarchy carries the flow",
            "body": "The redesigned Homepage, Restaurant page, and Checkout emphasize primary actions, improve spacing, and create clearer separation between promotional content and transactional information."
          },
          {
            "title": "User needs and business intent",
            "body": "A major tradeoff was balancing promotional visibility with usability clarity — reducing banners improved speed and focus but required careful hierarchy adjustments to maintain business goals."
          }
        ]
      }
    ]
  },
  // ---------------------------------------------------- learning-app-onboarding
  {
    "slug": "learning-app-onboarding",
    "headline": "Finding out why users quit a learning app's onboarding — then cutting the flow from five steps to two",
    "sections": [
      {
        "id": "overview",
        "title": "The Problem",
        "kicker": "UX Research · Mobile Learning",
        "intro": "The mobile learning app experienced a high drop-off rate during onboarding — analytics showed many users abandoning the app before completing profile setup or exploring key features.",
        "items": [
          {
            "title": "Research goal",
            "body": "Understand why users drop off during onboarding, identifying usability issues that cause confusion, frustration, or disengagement among first-time users."
          },
          {
            "title": "Emotional barriers",
            "body": "Explore users’ expectations when signing up for a learning app and uncover the emotional responses they experience during their first interaction."
          },
          {
            "title": "The users",
            "body": "University students aged 18–25 who downloaded a learning or productivity app within the last three months."
          },
          {
            "title": "The aim",
            "body": "Identify opportunities to improve the onboarding experience and increase user engagement and completion rates.",
            "accent": "violet"
          }
        ]
      },
      {
        "id": "plan",
        "title": "Research Plan",
        "kicker": "Method",
        "intro": "A structured plan defined the problem, research objectives, target users, interview questions, and success metrics before any design work began.",
        "items": [
          {
            "title": "Interviews",
            "body": "Semi-structured 30-minute Zoom interviews — recorded with consent, transcribed, and coded using affinity mapping."
          },
          {
            "title": "Survey",
            "body": "An online survey distributed via Google Forms to validate the patterns found in the interviews."
          },
          {
            "title": "Screening",
            "body": "Participants screened for recent, real onboarding experience with learning or productivity apps."
          },
          {
            "title": "Key questions",
            "body": "What motivates users to download the app? What frustrations occur during onboarding? What would make users complete it?"
          }
        ]
      },
      {
        "id": "findings",
        "title": "Key Findings",
        "kicker": "6 interviews · 42 survey responses",
        "numbered": true,
        "intro": "Data from 6 user interviews and 42 survey responses, clustered into themes through affinity mapping in Miro.",
        "items": [
          {
            "title": "Too many steps cause frustration",
            "body": "67% of survey participants selected “too many steps” as a reason for quitting; 4 of 6 interviewees said onboarding felt long. “I just wanted to start learning, not fill out five pages of info.”",
            "accent": "violet"
          },
          {
            "title": "Unclear value proposition",
            "body": "58% were unsure what the app offered after signing up. “I didn’t really know what made it different from other apps.”"
          },
          {
            "title": "Too much personal information",
            "body": "61% felt uncomfortable sharing detailed data before exploring the app. “Why do you need my major before I even try the app?”"
          },
          {
            "title": "No progress feedback",
            "body": "5 out of 6 interviewees didn’t know how long onboarding would take — users need progress indicators to reduce uncertainty."
          }
        ]
      },
      {
        "id": "iteration",
        "title": "The Redesign",
        "kicker": "Findings → design moves",
        "numbered": true,
        "intro": "Each design move traces directly to a research finding, backed by an established design principle.",
        "items": [
          {
            "title": "Five steps become two",
            "body": "Instead of asking for major, GPA, interests, phone, and password immediately, the new design asks only for email and password — non-essential information is postponed. (Hick’s Law: reducing choices decreases cognitive load.)"
          },
          {
            "title": "Value proposition up front",
            "body": "“Start Learning Smarter Today” — a clear headline with supporting text explaining the benefit, placed at the top of the screen. (Visual hierarchy.)"
          },
          {
            "title": "Progress indicator",
            "body": "“Step 1 of 2” with a progress bar reduces uncertainty and increases perceived control. (Nielsen’s visibility of system status.)"
          },
          {
            "title": "Progressive disclosure",
            "body": "Non-essential data collection is delayed until after account creation — users explore first, share later, building trust."
          }
        ],
        "images": [
          {
            "src": "/work/udacity/onboarding-iteration.png",
            "alt": "Before and after: the onboarding redesign",
            "ratio": "wide"
          }
        ]
      },
      {
        "id": "learnings",
        "title": "Recommendations & Next Steps",
        "kicker": "Closing",
        "numbered": true,
        "intro": "The research phase closed with actionable recommendations and a plan to validate them.",
        "items": [
          {
            "title": "Simplify and stage",
            "body": "Merge screens where possible, request only essential information, and allow optional fields later."
          },
          {
            "title": "Say the value early",
            "body": "A 2–3 screen intro explaining benefits, highlighting unique features through visual storytelling."
          },
          {
            "title": "Prototype and test again",
            "body": "A simplified onboarding prototype, tested with 5 users, measuring completion-rate improvement."
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------- ux-nanodegree
  {
    slug: "ux-nanodegree",
    headline:
      "End-to-end UX case studies completed as part of the Udacity User Experience Nanodegree Program",
    sections: [
      {
        id: "overview",
        title: "Overview",
        kicker: "What it is",
        intro:
          "Capstone and portfolio projects from the Udacity User Experience Nanodegree Program.",
        items: [
          {
            title: "The scope",
            body: "Completed end-to-end UX case studies including research, wireframing, prototyping, and usability testing.",
          },
          {
            title: "The outcome",
            body: "Built a comprehensive UX portfolio with real-world product design projects.",
          },
          {
            title: "The certificate",
            body: "User Experience Nanodegree Program — Udacity, 2026.",
          },
        ],
      },
      {
        id: "need",
        title: "The Need",
        kicker: "Why",
        intro:
          "Each case study runs the full UX process rather than a single stage of it.",
        items: [
          {
            title: "Research",
            body: "Conducting user research and usability testing to continuously improve product design.",
          },
          {
            title: "Prototyping",
            body: "Creating wireframes, prototypes, and high-fidelity designs to deliver seamless user experiences.",
          },
        ],
      },
      {
        id: "process",
        title: "Process",
        kicker: "How",
        numbered: true,
        intro:
          "The path each case study followed, from first research to tested prototype.",
        items: [
          {
            title: "Research",
            body: "Conducted user research, competitive analysis, and created user personas to guide design decisions.",
          },
          {
            title: "Flows",
            body: "Wireframes and prototypes for each flow.",
          },
          {
            title: "Testing",
            body: "Usability iterations on the prototypes.",
          },
        ],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        kicker: "Artifacts",
        intro: "What each case study left behind.",
        items: [
          {
            title: "Personas & competitive analysis",
            body: "The research deliverables behind each study.",
          },
          {
            title: "Wireframes & prototypes",
            body: "The flow deliverables, from wireframes to high-fidelity designs.",
          },
          {
            title: "Usability iterations",
            body: "Testing rounds recorded across the studies.",
          },
        ],
      },
      {
        id: "learnings",
        title: "Learnings & Next Steps",
        kicker: "What's next",
        intro: "The program's process now runs day to day in practice.",
        items: [
          {
            title: "Into practice",
            body: "Leading the end-to-end UX design process for digital products and client-facing platforms.",
          },
          {
            title: "The full studies",
            body: "The complete case studies are available in the linked portfolio folder.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return caseStudyDetails.find((detail) => detail.slug === slug);
}
