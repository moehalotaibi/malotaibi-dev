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
    /** Frame aspect; defaults to "phone". "board" = 4:3 design sheets. */
    ratio?: "video" | "square" | "tall" | "phone" | "wide" | "board";
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

  // ---------------------------------------------------- birr
  {
    slug: "birr",
    headline:
      "Birr — the medication companion I designed for families caring for an ageing parent, anchored to prayer times instead of the clock",
    sections: [
      {
        id: "context",
        title: "Why medication, why families, why Saudi",
        kicker: "Self-initiated concept · iOS · Arabic-first",
        intro:
          "بِرّ — birr al-walidayn, the duty of kindness to one's parents. I help manage my parents' medication, and this project started with a simple question: why is it this hard? Three facts shaped this project.",
        items: [
          {
            title: "Chronic illness is common, and it's managed at home",
            body: "The International Diabetes Federation estimates (IDF Diabetes Atlas, 2024) that 23.1% of adults in Saudi Arabia live with diabetes — one of the ten highest rates in the world. Diabetes rarely travels alone; blood pressure and cholesterol medication usually come with it, so a parent in their late sixties can easily be on five or more daily medications from two or three different doctors.",
          },
          {
            title: "Care is a family duty, not a service",
            body: "Multi-generational households are the norm, and looking after ageing parents is a deeply held value — birr al-walidayn, which gave the app its name. In practice an adult child, often a daughter, becomes the unofficial pharmacist: reading labels, refilling boxes, reminding. Siblings help “when they're home”. The coordination layer for all of this is a WhatsApp family group.",
          },
          {
            title: "The day runs on prayer times",
            body: "Ask a 68-year-old when he takes his blood pressure pill and he won't say “7:15”. He'll say “after Fajr”. Every medication app I looked at is built on the clock.",
          },
          {
            title: "What already exists",
            body: "Prescriptions from Ministry of Health clinics are largely dispensed through Wasfaty at contracted community pharmacies, and chronic prescriptions are dispensed in monthly refills and renewed by the clinic every few months. Sehhaty covers appointments and records. Global reminder apps like Medisafe are clock-based, English-first and built around one patient managing themselves. None of them is designed for the person actually doing the work: the family member.",
          },
        ],
        images: [
          {
            src: "/work/birr-cover.jpg",
            alt: "Birr cover — the Parent-mode dose card, the Caregiver Today screen and onboarding on three phones, with the بِرّ wordmark, Arabic UI",
            ratio: "wide",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        kicker: "Two households · both sides",
        intro:
          "Concept-project honesty: nothing here was commissioned, and I'm inside the problem myself — I help manage my parents' medication, and so does a friend for theirs. That gave me two households to study from both sides. I interviewed my friend Abdulrahman and all four parents, kept a three-day diary of my own household instead of interviewing myself, audited three apps, and tested a prototype with five people. Small numbers, real people.",
        items: [
          {
            title: "Who",
            body: "Two households, both sides. Caregivers: Abdulrahman, who manages his parents' medication, and me. Parents: my mother Munirah and my father Mutlaq, and Abdulrahman's mother Nora and father Ahmed — aged 57 to 65, taking three to five medications a day. Two of the four parents are my own; I say so here and keep their medical details out of everything that follows.",
          },
          {
            title: "How",
            body: "Semi-structured conversations in Arabic — 30 minutes with my friend, 15–20 with each parent — and a three-day diary of my own household, one line per dose: how the time was described, who gave it, how we knew, any doubt. I asked everyone to walk me through yesterday — never “how do you usually…” — because a specific day is remembered; a habit is reconstructed. Weighting the sample towards parents was deliberate: most medication apps are designed by talking to the person who manages the medication, not the person who takes it.",
          },
          {
            title: "What the diary showed",
            body: "Over three days and twelve doses, eleven were described by a prayer or a meal (“after Fajr”, “with lunch”) and only one by the clock. Someone asked “did anyone give…” four times. The one moment of real doubt came on the second evening, when my brother and I each assumed the other had given the Isha dose — nobody had.",
          },
          {
            title: "P1 · Abdulrahman — caregiver (friend)",
            body: "Age 23. Parent's meds/day: 5 (father) · 3 (mother). Who else helps: his sister. Current system: WhatsApp family group + memory.",
          },
          {
            title: "P2 · Me — caregiver (diary)",
            body: "Age 23. Parent's meds/day: 4 (father) · 3 (mother). Who else helps: my brother. Current system: WhatsApp family group + weekly pill organiser.",
          },
          {
            title: "P3 · Munirah — parent (my mother)",
            body: "Age 57. Meds/day: 3. Who else helps: me + my brother. Current system: pill organiser filled on Fridays; reminders by phone.",
          },
          {
            title: "P4 · Mutlaq — parent (my father)",
            body: "Age 63. Meds/day: 4. Who else helps: me + my brother. Current system: keeps the boxes by the prayer mat; “I know my medicine”.",
          },
          {
            title: "P5 · Nora — parent (Abdulrahman's mother)",
            body: "Age 60. Meds/day: 3. Who else helps: Abdulrahman + his sister. Current system: boxes in a kitchen drawer; the daughter reminds her.",
          },
          {
            title: "P6 · Ahmed — parent (Abdulrahman's father)",
            body: "Age 65. Meds/day: 5. Who else helps: Abdulrahman. Current system: paper schedule on the fridge from his last clinic visit.",
          },
        ],
      },
      {
        id: "audit",
        title: "Competitive audit",
        kicker: "Medisafe · Sehhaty · Nahdi",
        intro:
          "I looked at the three apps a Saudi family is most likely to already have: the best-known global reminder app, the national health platform, and the biggest pharmacy chain's app.",
        items: [
          {
            title: "Medisafe",
            body: "Consumer pill reminder (Israel/US), free with a Premium subscription — built for the patient managing themselves. Time to schedule 6 meds (measured): 9 min — six screens per medicine, clock times only. Arabic quality: UI localised into 15+ languages incl. Arabic; drug database and many labels stay English; Arabic plurals are wrong (“1 حبات”) and numerals switch between Western and Eastern on the same screen. RTL correctness (measured): navigation mirrors; the dose sheet breaks direction when a Latin drug name starts the line. Reminder model: clock times, snooze, “as needed” doses; complex schedules in Premium; lock-screen widget and Apple Watch. Family / caregiver support: “Medfriend” — a linked contact gets a push when a dose is missed — one-to-one, both need accounts and internet; reviewers report delays of hours between the missed dose and the alert; unlimited Medfriends only in Premium. Refill tracking: refill reminder when the remaining dose count hits a threshold you set (e.g. 10 days before). Large text / accessibility (measured): scales with the OS text size, but the timeline truncates medicine names at the larger sizes.",
          },
          {
            title: "Sehhaty",
            body: "Ministry of Health's national health platform — appointments, records, e-prescriptions — built for the citizen and their records. Time to schedule 6 meds (measured): 14 min — reminders live under the health wallet, one list, clock times only. Arabic quality: native Arabic and English, government terminology. RTL correctness (measured): mirrors correctly throughout. Reminder model: medicine reminders exist inside a records app (added in the 2023 release) — clock-based, one person's list. Family / caregiver support: dependents (children, elderly) can be managed under one account for appointments and records — no dose confirmation loop between family members. Refill tracking: Wasfaty e-prescriptions viewable, status by SMS; chronic prescriptions renewed periodically through the system. Large text / accessibility (measured): scales, no truncation.",
          },
          {
            title: "Nahdi",
            body: "Pharmacy chain's shopping app — products, e-prescription upload, delivery or pickup, “Ask the pharmacist” — built for the shopper. Time to schedule 6 meds: n/a — no schedules. Arabic quality: native Arabic, retail tone. RTL correctness (measured): mirrors; several product cards stay left-to-right. Reminder model: none — the app sells and delivers, it does not remind. Family / caregiver support: family members in the separate NahdiCare Clinics app for bookings; nothing for medication. Refill tracking: upload a prescription, order delivery or pickup — no countdown, no warning before the box is empty. Large text / accessibility (measured): does not scale — fixed sizes.",
          },
          {
            title: "Takeaway",
            body: "The market splits into self-management apps, health-system apps and pharmacy apps. Medisafe comes closest with Medfriend, but it is still one patient's app with a spectator attached: clock-based, English-first, and a missed-dose alert that arrives late. Nobody has built the family app — where the schedule is written in prayers, the confirmation comes from the parent's own tap, and every sibling can see who did what.",
            accent: "amber",
          },
        ],
      },
      {
        id: "insights",
        title: "What I learned",
        kicker: "Five insights",
        numbered: true,
        intro:
          "Five insights drove every decision that follows. Four came straight out of the interviews; the fifth I expected and the interviews sharpened.",
        items: [
          {
            title: "The day is measured in prayers, not hours",
            body: "All four parents described their schedules as “after Fajr”, “with lunch”, “after Maghrib”; not one gave a clock time unprompted. A 6:00 alarm is meaningless in December and wrong in June. → Schedules anchor on prayer slots; the reminder fires twenty minutes after the adhan.",
          },
          {
            title: "Caregiving is a group chat, not a person",
            body: "Whoever is home gives the dose. The failure mode isn't forgetting — it's double-dosing, or assuming someone else did it. Both households had a story about a dose given twice. → Shared status with “confirmed by whom”, not a single-user log.",
          },
          {
            title: "The refill cliff",
            body: "Nobody counts pills. Both families discovered an empty box at night at least once in the last month. → Supply counted down in days from the pack size, an amber nudge three days out, and a one-tap refill request.",
          },
          {
            title: "Parents will press one big button. They will not navigate",
            body: "All four parents use WhatsApp voice notes and a Quran app and almost nothing else; two of them hand the phone to a grandchild for anything with a form. Tabs, gestures and small text are walls. → A separate Parent mode: one card, one button, 30pt titles, opened from a link with no account.",
          },
          {
            title: "Help must not feel like surveillance",
            body: "Parents accept reminders but bristle at being “watched”; both caregivers said the word “nagging” without being asked. → Language and escalation built around dignity: a late dose is “a little late, that's okay”; escalation goes to the family, never at the parent.",
          },
        ],
      },
      {
        id: "voices",
        title: "In their words",
        kicker: "Participant voices",
        items: [
          {
            title:
              "“I gave him the evening one, then my sister came home and gave it again. Nobody wrote anything down.”",
            body: "Abdulrahman, 23 · Insight 2 — caregiving is a group chat, not a person",
          },
          {
            title:
              "“I only know it's finished when I open the box and there's nothing in it.”",
            body: "Nora, 60 · Insight 3 — the refill cliff",
          },
          {
            title: "“If it has a password, I'm not using it.”",
            body: "Ahmed, 65 · Insight 4 — parents will press one big button. They will not navigate",
          },
        ],
      },
      {
        id: "framing",
        title: "Framing the problem",
        kicker: "Who it's for · jobs · scope",
        items: [
          {
            title: "Sara, 34 — primary caregiver",
            body: "Works full-time in Riyadh, lives with her parents; her brother Mohammed helps on weekends and a home helper, Fatima, is there on weekdays. Runs her mother's medication from a screenshot of the last prescription and a WhatsApp group. Her fear: giving the wrong dose after a doctor changes something.",
          },
          {
            title: "Noura, 68 — Sara's mother",
            body: "Type 2 diabetes and high cholesterol: Metformin twice a day, Aspirin, Atorvastatin at night, Vitamin D. Reads Arabic comfortably, uses WhatsApp voice notes and the Quran app. Doesn't want to feel like a patient in her own house.",
          },
          {
            title: "Mohammed, 29 — the weekend sibling",
            body: "Wants to help when he's around, and wants to know in one glance whether Mom has taken her evening pills.",
          },
          {
            title: "When a doctor changes my mother's medication",
            body: "I want to update the routine once and have everyone see it, so that nobody gives her the old dose.",
          },
          {
            title: "When it's after Maghrib and I'm not home",
            body: "I want to know whether Mom has taken her pills, so that I don't nag her and my brother doesn't double-dose her.",
          },
          {
            title: "When a box is running low",
            body: "I want to be told days early, so that I pick it up on the way home instead of at 11 pm.",
          },
          {
            title: "(Noura) When the phone tells me it's time",
            body: "I want to press one thing and get on with my day, so that I don't feel managed.",
          },
          {
            title: "How might we",
            body: "…make it effortless for a family to keep a parent's medication on track without making the parent feel monitored?",
            accent: "amber",
          },
          {
            title: "What success looks like",
            body: "For a concept project I can only measure the prototype: task completion, time on task and SUS in usability testing. If this shipped, I'd track on-time dose rate, refill-on-time rate, and weekly active caregivers per family circle — the last one is the product's real health signal.",
          },
          {
            title: "In scope",
            body: "Medication schedules, prayer-time anchoring, Parent mode, family circle with roles, refill tracking, missed-dose escalation, weekly pill-organiser prep, Arabic and English.",
          },
          {
            title: "Out, deliberately",
            body: "Ordering from pharmacies (a Birr Plus request only), telehealth, vitals tracking, any clinical advice, and automatic phone calls — an earlier version escalated to a call; in the parents' own words it was the “policing” they dread, so it went. The app never tells anyone what to take — only when the family agreed it's taken.",
          },
        ],
      },
      {
        id: "principles",
        title: "Design principles",
        kicker: "Four rules",
        numbered: true,
        items: [
          {
            title: "Prayer-time first",
            body: "Time is described the way the family describes it.",
          },
          {
            title: "One tap for the parent, full control for the caregiver",
            body: "Two experiences, one source of truth.",
          },
          {
            title: "Designed for the circle, not the individual",
            body: "Every state answers “did anyone do this?” before “did I do this?”",
          },
          {
            title: "Never shame",
            body: "No red screens for a missed dose, no streaks, no “you failed”. A missed dose is a coordination problem, not a moral one.",
          },
        ],
      },
      {
        id: "structure",
        title: "Structure and flows",
        kicker: "Information architecture",
        items: [
          {
            title: "Onboarding",
            body: "Splash · welcome · sign up (Apple / Google) · phone · code · notifications.",
          },
          {
            title: "Caregiver mode · Today",
            body: "Adherence score · today's numbers · Mom's routine · activity feed.",
          },
          {
            title: "Caregiver mode · Medications",
            body: "List · detail · add (name & dose → photos → when: after prayer or exact time) · prepare medicines.",
          },
          {
            title: "Caregiver mode · Family",
            body: "Circle members with roles · invite by link.",
          },
          {
            title: "Caregiver mode · Settings",
            body: "Parent mode · late-dose steps · numerals · notifications · language · Birr Plus.",
          },
          {
            title: "Parent mode (opened from a link, no account)",
            body: "Now · due — the medicine, one button: I took it. Now · confirmed — well done, one-tap undo. Now · late — “a little late, that's okay”.",
          },
          {
            title: "Secondary flows",
            body: "Refill (supply gauge → three-day nudge → request) · missed-dose escalation · weekly preparation (the pill-organiser checklist grouped by prayer slot) · offline and loading states · error states (invalid number, wrong or expired code, denied notifications, duplicate medicine, unreadable photo, failed sync).",
          },
        ],
        images: [
          {
            src: "/work/birr/flows.jpg",
            alt: "Birr flows — onboarding, caregiver, parent and states, both modes on one canvas",
            ratio: "wide",
          },
          {
            src: "/work/birr/journey.jpg",
            alt: "User journey — six stages from discovery to supply and family, read right-to-left",
            ratio: "wide",
          },
        ],
      },
      {
        id: "hero-flow",
        title: "Hero flow — from prescription to first confirmed dose",
        kicker: "Six steps",
        numbered: true,
        items: [
          {
            title: "Add a medication from the box",
            body: "Sara adds a medication: she photographs the pharmacy box, and the name and dose are read from the label.",
          },
          {
            title: "Add a photo of the pill itself",
            body: "She adds a photo of the pill itself — Noura recognises the small white one, not the word Metformin.",
          },
          {
            title: "Set when as prayer slots",
            body: "She sets when as prayer slots — after Fajr · after Dhuhr, with food — or, for a medicine that needs exact spacing, as clock times.",
          },
          {
            title: "Invite the family with a link",
            body: "She invites Mohammed with a link. He lands in the same family circle; Noura gets her own link and never creates an account.",
          },
          {
            title: "One card, one button",
            body: "Noura's phone shows one card twenty minutes after Dhuhr: the pill's photo, “one tablet, with lunch”, and one large button — I took it.",
          },
          {
            title: "Confirmed, for the whole circle",
            body: "She taps it. Sara's Today screen updates: Confirmed · by herself · 12:48, and the activity feed logs it for the whole circle.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Key design decisions",
        kicker: "Problem · decision · why · trade-off",
        numbered: true,
        intro:
          "Every decision below has the same four parts: the problem, what I did, why, and what it cost.",
        items: [
          {
            title: "Reminders are anchored to prayer times",
            body: "Problem: clock alarms don't match how the family talks or how the parent lives — and Fajr moves by almost two hours across the year in Riyadh. Decision: the “when” step offers two reminder types that can be mixed per medicine. After prayer gives the five prayer slots plus before bed, with an adjustable offset (“20 minutes after the adhan”) and a with food switch that changes what the parent sees (“with lunch” instead of a time); each slot resolves to a real time every day from the device's location using the Umm al-Qura calculation. Exact time is a plain clock list for medicines that need precise spacing — 7:30 AM and 7:30 PM, twelve hours apart — because some prescriptions really are written that way, and caregivers who think in clock time should not have to translate. Why: it removes a translation step for everyone, and it corrects itself through the year. Trade-off: more engineering (prayer-time calculation, location permission) and one more decision on the add flow. Keeping the clock option one tap away, on the same screen, was the compromise that kept both kinds of caregiver.",
          },
          {
            title: "Two experiences in one app",
            body: "Problem: a dashboard dense enough for Sara is unusable for Noura; an interface simple enough for Noura is useless for Sara. Decision: Parent mode is a separate surface with its own rules: one card on screen, 30pt titles, 24pt medicine name, 17pt body, a 60pt-tall button, and exactly two actions — I took it and Remind me later. It is reached from a text-message link, so the parent never signs up, and it keeps working without internet. Why: a shared UI would have compromised both users. A dedicated mode let me design every Parent screen against one question: can a 70-year-old do this with one thumb? Trade-off: two surfaces to design and maintain. I capped Parent mode at three states so the cost stays small.",
          },
          {
            title: "A family circle with attribution",
            body: "Problem: the dangerous case isn't a forgotten dose — it's two siblings each assuming the other gave it. Decision: every dose carries a name: confirmed by herself, confirmed by Mohammed. Members have one of two roles — confirms or view only — and join through a link. The activity feed is the family's shared memory of the day. Why: attribution answers the real question — “did anyone do it?” — and quietly discourages double-dosing. Trade-off: it could feel like a scoreboard. I removed streaks and counts entirely, and the parent's own view never shows who didn't act.",
          },
          {
            title: "Escalation instead of alarms",
            body: "Problem: reminder apps either nag the patient until they ignore them, or panic the family. Decision: a ladder. After 20 minutes the parent's card repeats once, gently. After 45 minutes the primary caregiver gets a notification. After 90 minutes the whole circle sees an amber unconfirmed state — never red, never “missed” in the parent's view. The timings are settings, not constants. Why: it respects the parent's dignity, avoids alert fatigue, and makes a human — not a device — the last resort. Trade-off: a slower response in a real emergency. The first version also placed an automatic phone call at the top of the ladder; it was cut because it reads as surveillance, which is the one thing the product must never do.",
          },
          {
            title: "Refills by pack count",
            body: "Problem: “running out” is discovered too late, usually at night. Decision: each medication stores pack size and doses per day; the supply gauge counts down in days as doses are confirmed, turns amber three days out, and offers a one-tap refill request. A weekly Prepare medicines checklist, grouped by prayer slot, flags anything out of stock before the pill organiser is filled. Why: nobody has to count pills, and Friday's prep catches Thursday's cliff. Trade-off: it only works when doses are confirmed. Unconfirmed doses are assumed taken for counting but shown as unconfirmed in the family view — a compromise I'd revisit with real usage data.",
          },
          {
            title: "Bilingual RTL/LTR, done properly",
            body: "Problem: most “Arabic” apps are translated English apps. The tells are everywhere: unmirrored back arrows, the wrong numerals, mixed-direction lines that break. Decision: Arabic is the design source; the English layout is derived from it, not the other way round. Explicit mirroring rules: navigation, chevrons, list alignment and the tab bar mirror; the status bar, numbers, phone fields and one-time codes stay left-to-right. Numerals are a setting: dosage and times default to Western digits to match pharmacy labels; Parent mode can switch to Eastern Arabic digits (٠١٢٣) for parents who read them faster. Medication names are Latin inside Arabic sentences, and every such string is direction-isolated so a line that starts with “Metformin” still reads right-to-left. Arabic headlines run at 1.3 line-height against 1.18 for Latin, because Arabic ascenders and diacritics clip at Latin metrics. Why: for this audience Arabic isn't a translation target — it's the product. Trade-off: every screen is designed twice. The token system is what made that manageable.",
          },
        ],
        images: [
          {
            src: "/work/birr/add-medicine.jpg",
            alt: "Add medicine — name and dose, when (after prayer or exact time), and the weekly Prepare medicines checklist",
            ratio: "board",
          },
          {
            src: "/work/birr/english.jpg",
            alt: "English version — the same screens mirrored left-to-right",
            ratio: "board",
          },
        ],
      },
      {
        id: "visual",
        title: "Visual design",
        kicker: "Direction · colour tokens",
        intro:
          "Calm, warm and high-contrast, borrowed from editorial and lifestyle apps rather than health apps: a warm ivory canvas, white cards with a hairline and a whisper of shadow, generous corners, a floating black tab bar and a single black pill for the primary action. Colour is reserved for meaning — amber for “running low”, green for “confirmed”, red only for “out of stock”. Everything on the parent side is bigger, plainer and slower.",
        items: [
          {
            title: "v4/bg · #F4F2ED",
            body: "Canvas.",
            accent: "cream",
          },
          {
            title: "v4/card · #FFFFFF",
            body: "Cards, sheets.",
            accent: "cream",
          },
          {
            title: "v4/ink · #141414",
            body: "Text, primary button, tab bar.",
            accent: "cream",
          },
          {
            title: "v4/ink2 · #6B6B66",
            body: "Secondary text — 5.0:1 on white.",
            accent: "cream",
          },
          {
            title: "v4/ink3 · #A3A29C",
            body: "Decorative only (arrows, dots).",
            accent: "cream",
          },
          {
            title: "v4/line · #E8E6E1",
            body: "Hairlines.",
            accent: "cream",
          },
          {
            title: "v4/green · v4/green-text · #2E7D5B",
            body: "Confirmed — fill and text.",
            accent: "green",
          },
          {
            title: "v4/amber · v4/amber-text · #E58A2B · #A85C14",
            body: "Due now, running low — fill vs. text.",
            accent: "amber",
          },
          {
            title: "v4/red · v4/red-text · #D65745 · #B8412F",
            body: "Out of stock, errors — fill vs. text.",
            accent: "pink",
          },
          {
            title: "v4/blue · v4/blue-text · #4A7DFF · #2F5FE0",
            body: "Verified seal, links.",
            accent: "blue",
          },
          {
            title: "v4/violet · v4/violet-text · #8B6CF6 · #6B4FD1",
            body: "Late count.",
            accent: "violet",
          },
          {
            title: "Tints and text-safe variants",
            body: "Every semantic colour has a soft tint for backgrounds and a text-safe variant that clears 4.5:1 — the bright version is only ever a fill. Colour is never the only signal: every state pairs it with an icon and a label.",
          },
        ],
        images: [
          {
            src: "/work/birr/caregiver.jpg",
            alt: "Caregiver mode — Today, Medications and Family, Arabic UI",
            ratio: "board",
          },
          {
            src: "/work/birr/parent.jpg",
            alt: "Parent mode — dose due, confirmed and a little late",
            ratio: "board",
          },
        ],
      },
      {
        id: "type",
        title: "Typography, spacing and motion",
        kicker: "One family for both scripts",
        intro:
          "One family for both scripts: SF Pro, Regular / Medium / Semibold / Bold, so a mixed line — an Arabic sentence with a Latin drug name — sits on one baseline without a visual seam.",
        items: [
          {
            title: "Display / title",
            body: "Caregiver mode: 30 · 28 bold · 1.3 (Ar) / 1.18 (En). Parent mode: 30 bold.",
          },
          {
            title: "Card title · section",
            body: "Caregiver mode: 20 bold · 17 semibold. Parent mode: 24 semibold (medicine name).",
          },
          {
            title: "Body",
            body: "Caregiver mode: 15 · 1.4. Parent mode: 17.",
          },
          {
            title: "Meta · caption",
            body: "Caregiver mode: 13. Parent mode: 13.",
          },
          {
            title: "Button label",
            body: "Caregiver mode: 15 medium. Parent mode: 19 medium, 60pt button.",
          },
          {
            title: "Floor and scaling",
            body: "Nothing below 13pt. Everything scales with the OS text size; Parent mode has a size floor and never truncates.",
          },
          {
            title: "Spacing",
            body: "20pt page margins, 16 between blocks, 18 inside cards, 10 between elements, 14 row rhythm.",
          },
          {
            title: "Shape",
            body: "Radius 20 for cards, 24 for the parent's card, 32 for the welcome sheet, full for pills and chips.",
          },
          {
            title: "Motion",
            body: "Limited to state changes — the dose card settling into confirmed is a smart-animate — respects Reduce Motion, and never blocks input.",
          },
        ],
        images: [
          {
            src: "/work/birr/design-system.jpg",
            alt: "Design system — colour tokens and type scale",
            ratio: "wide",
          },
        ],
      },
      {
        id: "components",
        title: "Components",
        kicker: "32 components · 17 icons",
        intro:
          "32 components built from the screens, plus the Button and Tab bar variant sets and a 17-icon set. The ones that carry the product:",
        items: [
          {
            title: "Button",
            body: "Black · Outline · Text, each with pressed. Full-width pill, 52pt; 60pt in Parent mode.",
          },
          {
            title: "Tab bar",
            body: "Active = Today · Meds · Family · Settings. Floating black pill, white active capsule.",
          },
          {
            title: "Header",
            body: "Caregiver · Parent. Title-first, 44pt round actions.",
          },
          {
            title: "Score card · Stat card",
            body: "Adherence and the 2×2 numbers.",
          },
          {
            title: "List row",
            body: "Default; verified seal on/off. Medicine, member and activity rows.",
          },
          {
            title: "Supply gauge",
            body: "ok · low · out. Segmented, counts down in days.",
          },
          {
            title: "Chip",
            body: "Active · Inactive. Filters, prayer slots and the after-prayer / exact-time switch.",
          },
          {
            title: "Dose card (Parent)",
            body: "due · confirmed · late. The whole parent experience.",
          },
          {
            title: "Day chips (Parent)",
            body: "taken · now · upcoming. The five prayer slots.",
          },
          {
            title: "Input row · Toggle · OTP boxes",
            body: "default · error. Forms and verification.",
          },
          {
            title: "Sync banner · Empty · Skeleton · Offline",
            body: "States.",
          },
          {
            title: "iOS alert · Welcome sheet · Social sign-up",
            body: "Onboarding.",
          },
          {
            title: "Tokens as variables",
            body: "Tokens live as Figma variables (collection v4 · Editorial warm) and export to JSON for engineering.",
          },
        ],
        images: [
          {
            src: "/work/birr/components.jpg",
            alt: "Component library — 32 components built from the screens",
            ratio: "phone",
          },
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility",
        kicker: "WCAG 2.1 AA · Apple HIG",
        intro:
          "Audited against WCAG 2.1 AA and Apple's HIG before hand-off, with contrast measured from the actual variables.",
        items: [
          {
            title: "Contrast",
            body: "Every readable text pair ≥ 4.5:1 (secondary grey 5.0:1, all coloured text via the text-safe tokens). Two non-text pairs are logged as open: the hairline field boundary (needs 3:1 on ivory) and the amber gauge bars (2.6:1 → a deeper amber for bars only).",
          },
          {
            title: "Targets",
            body: "44pt minimum everywhere, 60pt in Parent mode; text links carry hidden 44pt hit areas.",
          },
          {
            title: "Type",
            body: "13pt floor; Dynamic Type supported; Parent mode wraps, never ellipsises.",
          },
          {
            title: "Errors",
            body: "Always text plus colour, never colour alone, and every error state has a recovery action — eight states designed in each language.",
          },
          {
            title: "Screen readers",
            body: "An Arabic-first accessible name documented for every icon-only control (“رجوع”, “إضافة دواء”, “التنبيهات · 3 جديدة”…) and the parent's card announced as one group: “Metformin 500 mg, one tablet with lunch, due now”.",
          },
          {
            title: "Motion",
            body: "Respects Reduce Motion; the confirm animation falls back to a cross-fade; nothing auto-advances.",
          },
          {
            title: "Cognitive load",
            body: "Parent mode shows one decision at a time, uses the family's own words (“after Maghrib”), and never uses medical jargon.",
          },
        ],
        images: [
          {
            src: "/work/birr/accessibility.jpg",
            alt: "Accessibility review — findings, measured contrast and VoiceOver names",
            ratio: "phone",
          },
        ],
      },
      {
        id: "testing",
        title: "Prototype and usability testing",
        kicker: "SUS 84 (n = 5)",
        numbered: true,
        intro:
          "Figma, both modes, Arabic and English — 21 screens per language plus 8 error states each, linked as four flows: onboarding, caregiver, parent, and states (offline → retry → loading → home). Five people tested it: two caregivers (Abdulrahman and my brother, who had not seen the design) and three parents (Munirah, Mutlaq and Nora). The parents are the same people I interviewed; I say so because a second household I didn't know would have been better, and I couldn't get one. Measures: completion, time on task, errors, a 5-point confidence rating per task, and SUS at the end.",
        items: [
          {
            title:
              "(Caregiver) Add “Metformin 500 mg, after Fajr and after Dhuhr, with food” and set the pack size",
            body: "Completion 2/2 · median time 3 min 40 s. Both looked for a clock time first, then found the prayer chips; my brother asked for “with food” before he saw the switch.",
          },
          {
            title: "(Caregiver) Invite a sibling to the circle",
            body: "Completion 2/2 · median time 50 s. Both expected the invite to be a WhatsApp message — it is.",
          },
          {
            title: "(Parent) The phone shows a reminder — do what you'd normally do",
            body: "Completion 3/3 · median time 8 s. Two of three tapped the pill photo, not the button, on the first try.",
          },
          {
            title:
              "(Caregiver) Your brother says he gave the dose. Find out whether he did",
            body: "Completion 2/2 · median time 25 s. Both went to Today, not to Activity; the “confirmed by” line answered it.",
          },
        ],
        images: [
          {
            src: "/work/birr/states.jpg",
            alt: "Error states — invalid number, notifications denied, duplicate medicine, sync failed",
            ratio: "video",
          },
          {
            src: "/work/birr/overview.jpg",
            alt: "All 21 screens, Arabic",
            ratio: "board",
          },
        ],
      },
      {
        id: "changes",
        title: "What changed",
        kicker: "After testing · before testing",
        intro:
          "The prototype scored 84 on the System Usability Scale (n = 5). Three changes came out of testing; the rest came earlier, from my own review.",
        items: [
          {
            title: "The whole dose card became the tap target",
            body: "Two parents tapped the pill photo instead of the button → the whole dose card became the tap target, and the button grew to 60pt.",
          },
          {
            title: "After prayer and exact time, side by side",
            body: "Both caregivers looked for a clock time before the prayer chips → the “when” step now offers after prayer and exact time side by side, and the resolved time sits under each prayer chip.",
          },
          {
            title: "Late became a little late, that's okay",
            body: "A parent read “late” as a scolding → the late state now says “a little late, that's okay, take it now”.",
          },
          {
            title: "Before testing, from my own review",
            body: "The automatic-call step was cut from the escalation ladder; the sign-up buttons lost the company names and kept the logos; feminine-only Arabic copy was made neutral so a son and a daughter read the same sentence; the header spacing was rebuilt after the first Arabic pass clipped titles.",
          },
        ],
        images: [
          {
            src: "/work/birr/before-after.jpg",
            alt: "Before and after — the Parent dose card, tap target and button size",
            ratio: "board",
          },
        ],
      },
      {
        id: "handoff",
        title: "Handoff spec — design to code",
        kicker: "For the engineer who builds it",
        intro:
          "A design system is only real when it survives contact with a codebase, so the handoff was written for the engineer who builds it, with the RTL and localisation rules made explicit instead of assumed.",
        items: [
          {
            title: "Tokens",
            body: "The v4 · Editorial warm variable collection exported from Figma (Dev Mode → Variables → JSON) to tokens.json, generated into CSS custom properties / Swift constants (--color-ink, --space-4, --text-title). One source, both sides.",
          },
          {
            title: "Direction",
            body: "The root sets dir=\"rtl\" or dir=\"ltr\" from the language setting; layout uses logical properties only (margin-inline-start, inset-inline-end), so there is no separate RTL stylesheet. The tab bar keeps Today → Meds → Family → Settings in both directions.",
          },
          {
            title: "Numerals and dates",
            body: "Intl.NumberFormat('ar-SA-u-nu-arab') when Eastern Arabic digits are on; Intl.DateTimeFormat for Hijri and Gregorian. Phone numbers and one-time codes are always LTR.",
          },
          {
            title: "Mixed-direction text",
            body: "Drug names rendered inside <bdi> (or a leading U+200F in native strings) so a Latin name never flips an Arabic sentence.",
          },
          {
            title: "Prayer times",
            body: "Computed on-device from location with the Umm al-Qura parameters; the schedule stores the slot and the offset, not the time.",
          },
          {
            title: "Component contract",
            body: "Each Figma component maps to a component with the same name and state props — DoseCard takes state: 'due' | 'confirmed' | 'late' | 'snoozed' and confirmedBy?: string; ListRow takes verified: boolean; SupplyGauge takes daysLeft: number and derives its own ok | low | out.",
          },
          {
            title: "Accessibility contract",
            body: "Every icon-only control ships with its documented accessibilityLabel in both languages; error text is linked to its field and focus moves to the first invalid field on submit; the notification alert traps focus while open.",
          },
        ],
        images: [
          {
            src: "/work/birr/dose-card-spec.jpg",
            alt: "Annotated component spec — the Dose card and its states, RTL and LTR side by side",
            ratio: "wide",
          },
        ],
      },
      {
        id: "outcomes",
        title: "Outcomes and next steps",
        kicker: "Concept outcome · if this were real",
        numbered: true,
        intro:
          "All five participants completed the core tasks; both caregivers described prayer-time scheduling, unprompted, as “finally”, and my father asked when he could have it on his phone. After launch I'd measure on-time dose rate, refill-on-time rate, unconfirmed-dose rate over time, and weekly active caregivers per circle.",
        items: [
          {
            title: "Wasfaty dispensing data",
            body: "Pull dispensing data from Wasfaty so medications arrive pre-filled.",
          },
          {
            title: "Pharmacy pickup or delivery",
            body: "Pharmacy pickup or delivery straight from the refill nudge.",
          },
          {
            title: "Live Activity and Apple Watch",
            body: "A Live Activity on the parent's lock screen and Apple Watch confirmation for parents who wear one.",
          },
          {
            title: "A clinic view",
            body: "With consent, a doctor sees the family's adherence log — the weekly report already exists in Birr Plus.",
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        kicker: "Closing",
        items: [
          {
            title: "What worked",
            body: "Anchoring the product on one cultural truth — prayer times — gave every later decision a spine. Splitting the app into two modes felt expensive and turned out to be the simplification that made everything else possible. Designing the Arabic version first and deriving the English one produced a cleaner English app than the reverse ever has for me.",
          },
          {
            title: "What I'd do differently",
            body: "Studying my own family cut both ways: unmatched access, and a constant risk of writing down what I already believed instead of what I heard. The diary helped; a third household I didn't know would have helped more, and I'd test with parents I hadn't interviewed.",
          },
          {
            title: "What I learned",
            body: "Cutting a feature can be the strongest design move — removing the automatic call made the escalation model coherent. And copy is the product in Parent mode: changing late to a little late, that's okay did more for the design than any layout change. The thing testing proved me wrong about: I was sure prayer slots alone would be enough for caregivers. They weren't — both wanted a plain clock for at least one medicine, and the schedule step is better for it.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return caseStudyDetails.find((detail) => detail.slug === slug);
}
