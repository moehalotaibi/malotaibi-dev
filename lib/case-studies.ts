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
  /** Muted walkthrough loop rendered under the hero (public/ paths). */
  video?: { src: string; poster: string; title: string; label: string };
  sections: CaseSection[];
};

export const caseStudyDetails: CaseStudyDetail[] = [
  // ---------------------------------------------------- keeta-redesign
  {
    "slug": "keeta-redesign",
    "headline": "Redesigning Keeta's ordering flow: from visual clutter to a checkout users complete without hesitation",
    "sections": [
      {
        "id": "overview",
        "title": "What is the Keeta Redesign?",
        "kicker": "Food Delivery · Udacity Capstone",
        "intro": "A modern redesign of the Keeta food delivery application, focusing on improved user experience, intuitive navigation, and contemporary visual design, carried end to end through research, prototyping, testing, and iteration.",
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
            "body": "January 21 to February 25, 2026."
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
            "body": "Target users, primarily frequent food delivery customers, experienced hesitation during browsing and checkout, particularly when reviewing discounts and total pricing."
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
            "body": "The homepage felt visually crowded with competing banners and promotional sections, so users hesitated before choosing where to start."
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
            "body": "Too much vertical scrolling before real menu items, and users wanted a clearer price breakdown before pressing Apple Pay."
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
            "body": "I used Miro to brainstorm feature ideas, organize concepts, and collaborate visually, generating multiple potential features based on user needs."
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
            "body": "In Figma I built structured wireframes, then a high-fidelity prototype simulating real interactions, carefully designing spacing, visual hierarchy, typography, and interaction states across the whole journey."
          }
        ]
      },
      {
        "id": "features",
        "title": "Design: Iteration",
        "kicker": "What changed",
        "intro": "Based on usability testing feedback, I refined the redesigned flow to further reduce friction points: some users still hesitated when reviewing discounts and final pricing.",
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
        "intro": "To validate the redesigned flow, I conducted remote usability testing with five participants using the updated high-fidelity prototype, with the same tasks as the initial research phase.",
        "items": [
          {
            "title": "Confident navigation",
            "body": "Participants were able to navigate more confidently and understand applied discounts more easily."
          },
          {
            "title": "Fewer pauses",
            "body": "Users completed checkout with fewer pauses. The cleaner structure and stronger emphasis on primary actions created a smoother, more intuitive experience."
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
            "body": "A major tradeoff was balancing promotional visibility with usability clarity: reducing banners improved speed and focus but required careful hierarchy adjustments to maintain business goals."
          }
        ]
      }
    ]
  },
  // ---------------------------------------------------- learning-app-onboarding
  {
    "slug": "learning-app-onboarding",
    "headline": "Finding out why users quit a learning app's onboarding, then cutting the flow from five steps to two",
    "sections": [
      {
        "id": "overview",
        "title": "The Problem",
        "kicker": "UX Research · Mobile Learning",
        "intro": "The mobile learning app experienced a high drop-off rate during onboarding. Analytics showed many users abandoning the app before completing profile setup or exploring key features.",
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
            "body": "Semi-structured 30-minute Zoom interviews, recorded with consent, transcribed, and coded using affinity mapping."
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
            "body": "5 out of 6 interviewees didn’t know how long onboarding would take. Users need progress indicators to reduce uncertainty."
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
            "body": "Instead of asking for major, GPA, interests, phone, and password immediately, the new design asks only for email and password. Non-essential information is postponed. (Hick’s Law: reducing choices decreases cognitive load.)"
          },
          {
            "title": "Value proposition up front",
            "body": "“Start Learning Smarter Today”: a clear headline with supporting text explaining the benefit, placed at the top of the screen. (Visual hierarchy.)"
          },
          {
            "title": "Progress indicator",
            "body": "“Step 1 of 2” with a progress bar reduces uncertainty and increases perceived control. (Nielsen’s visibility of system status.)"
          },
          {
            "title": "Progressive disclosure",
            "body": "Non-essential data collection is delayed until after account creation. Users explore first, share later, building trust."
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
            body: "User Experience Nanodegree Program, Udacity, 2026.",
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
  // Copy tightened 2026-09-26 at Moe's request: shorter, plainer, no em
  // dashes. Facts, names and numbers are unchanged from his brief.
  {
    slug: "birr",
    headline:
      "Birr, a medication companion for families looking after an ageing parent, built around prayer times instead of the clock",
    sections: [
      {
        id: "context",
        title: "Why medication, why families, why Saudi",
        kicker: "Self-initiated concept · iOS · Arabic-first",
        intro:
          "بِرّ is birr al-walidayn, the duty of kindness to your parents. I help manage my parents' medication, and the project started with one question: why is this so hard? Three things shaped the answer.",
        items: [
          {
            title: "Chronic illness is common, and it's managed at home",
            body: "The IDF Diabetes Atlas (2024) estimates that 23.1% of adults in Saudi Arabia live with diabetes, one of the ten highest rates in the world. Blood pressure and cholesterol pills usually come with it. A parent in their late sixties can easily be on five daily medications from three doctors.",
          },
          {
            title: "Care is a family duty, not a service",
            body: "Most families live together, and looking after your parents is a deeply held value. In practice one adult child, often a daughter, becomes the pharmacist: reading labels, refilling boxes, reminding. Siblings help when they're home. All of it runs through a WhatsApp group.",
          },
          {
            title: "The day runs on prayer times",
            body: "Ask a 68-year-old when he takes his blood pressure pill. He won't say 7:15. He'll say after Fajr. Every medication app I looked at is built on the clock.",
          },
          {
            title: "What already exists",
            body: "Ministry of Health prescriptions are dispensed through Wasfaty at community pharmacies, in monthly refills. Sehhaty covers appointments and records. Reminder apps like Medisafe are clock-based, English-first, and built for one patient managing themselves. None of them is built for the person doing the work: the family member.",
          },
        ],
        images: [
          {
            src: "/work/birr-cover.jpg",
            alt: "Birr cover: the Parent-mode dose card, the Caregiver Today screen and onboarding on three phones, with the بِرّ wordmark, Arabic UI",
            ratio: "wide",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        kicker: "Two households · both sides",
        intro:
          "Nothing here was commissioned. I'm inside the problem myself, and so is a friend, which gave me two households to study from both sides. I interviewed my friend Abdulrahman and all four parents, kept a three-day diary of my own household, audited three apps, and tested a prototype with five people. Small numbers, real people.",
        items: [
          {
            title: "Who",
            body: "Caregivers: Abdulrahman, who manages his parents' medication, and me. Parents: my mother Munirah and my father Mutlaq, and Abdulrahman's mother Nora and father Ahmed. Aged 57 to 65, on three to five medications a day. Two of the four parents are my own, so I keep their medical details out of everything that follows.",
          },
          {
            title: "How",
            body: "Conversations in Arabic: 30 minutes with my friend, 15 to 20 with each parent, plus a three-day diary of my own household, one line per dose. I asked everyone to walk me through yesterday, never “how do you usually”. A specific day is remembered. A habit is made up. I weighted the sample towards parents on purpose: most medication apps are designed by talking to the person who manages the pills, not the one who takes them.",
          },
          {
            title: "What the diary showed",
            body: "Twelve doses over three days. Eleven were described by a prayer or a meal (after Fajr, with lunch). One by the clock. Someone asked “did anyone give…” four times. The one real scare came on the second evening, when my brother and I each assumed the other had given the Isha dose. Nobody had.",
          },
          {
            title: "P1 · Abdulrahman · caregiver (friend)",
            body: "Age 23. Parents' meds per day: 5 (father), 3 (mother). Also helps: his sister. Current system: WhatsApp family group and memory.",
          },
          {
            title: "P2 · Me · caregiver (diary)",
            body: "Age 23. Parents' meds per day: 4 (father), 3 (mother). Also helps: my brother. Current system: WhatsApp family group and a weekly pill organiser.",
          },
          {
            title: "P3 · Munirah · parent (my mother)",
            body: "Age 57. Meds per day: 3. Also helps: me and my brother. Current system: pill organiser filled on Fridays, reminders by phone.",
          },
          {
            title: "P4 · Mutlaq · parent (my father)",
            body: "Age 63. Meds per day: 4. Also helps: me and my brother. Current system: keeps the boxes by the prayer mat. “I know my medicine.”",
          },
          {
            title: "P5 · Nora · parent (Abdulrahman's mother)",
            body: "Age 60. Meds per day: 3. Also helps: Abdulrahman and his sister. Current system: boxes in a kitchen drawer, the daughter reminds her.",
          },
          {
            title: "P6 · Ahmed · parent (Abdulrahman's father)",
            body: "Age 65. Meds per day: 5. Also helps: Abdulrahman. Current system: a paper schedule on the fridge from his last clinic visit.",
          },
        ],
      },
      {
        id: "audit",
        title: "Competitive audit",
        kicker: "Medisafe · Sehhaty · Nahdi",
        intro:
          "The three apps a Saudi family most likely already has: the best-known reminder app, the national health platform, and the biggest pharmacy chain's app.",
        items: [
          {
            title: "Medisafe",
            body: "A pill reminder built for the patient managing themselves. Six medicines took me 9 minutes to schedule, six screens each, clock times only. The Arabic is partial: the drug database stays English, plurals are wrong (“1 حبات”), numerals switch mid-screen, and the dose sheet breaks direction after a Latin drug name. Family support is Medfriend: one linked contact gets a push when a dose is missed, both need accounts and internet, and reviewers say it arrives hours late.",
          },
          {
            title: "Sehhaty",
            body: "The Ministry of Health platform for appointments, records and e-prescriptions. Six medicines took 14 minutes, in one list under the health wallet, clock times only. Native Arabic, mirrors correctly, scales well. Dependents share one account for records, but nobody confirms a dose to anyone.",
          },
          {
            title: "Nahdi",
            body: "The pharmacy chain's shopping app: products, prescription upload, delivery or pickup. No schedules, no reminders. It sells and delivers. Native Arabic, mirrors, though some product cards stay left to right. Text does not scale.",
          },
          {
            title: "Takeaway",
            body: "Self-management apps, health-system apps, pharmacy apps. Medisafe comes closest, but it is one patient's app with a spectator attached: clock-based, English-first, late alert. Nobody has built the family app, where the schedule is written in prayers, the parent's own tap is the confirmation, and every sibling can see who did what.",
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
          "Five insights drove every decision that follows. Four came straight out of the interviews. The fifth I expected, and the interviews sharpened it.",
        items: [
          {
            title: "The day is measured in prayers, not hours",
            body: "All four parents said after Fajr, with lunch, after Maghrib. Not one gave a clock time unprompted. A 6:00 alarm is meaningless in December and wrong in June. So schedules anchor on prayer slots, and the reminder fires twenty minutes after the adhan.",
          },
          {
            title: "Caregiving is a group chat, not a person",
            body: "Whoever is home gives the dose. The failure isn't forgetting. It's double-dosing, or assuming someone else did it. Both households had a story about a dose given twice. So the status is shared and says who confirmed it, instead of a single-user log.",
          },
          {
            title: "The refill cliff",
            body: "Nobody counts pills. Both families found an empty box at night at least once last month. So supply counts down in days from the pack size, turns amber three days out, and offers a one-tap refill request.",
          },
          {
            title: "Parents will press one big button. They will not navigate",
            body: "All four parents use WhatsApp voice notes and a Quran app and almost nothing else. Two hand the phone to a grandchild for anything with a form. Tabs, gestures and small text are walls. So Parent mode is separate: one card, one button, 30pt titles, opened from a link with no account.",
          },
          {
            title: "Help must not feel like surveillance",
            body: "Parents accept reminders but hate being watched. Both caregivers said the word nagging without being asked. So the language and the escalation are built around dignity: a late dose is “a little late, that's okay”, and escalation goes to the family, never at the parent.",
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
            body: "Abdulrahman, 23 · Insight 2, caregiving is a group chat",
          },
          {
            title:
              "“I only know it's finished when I open the box and there's nothing in it.”",
            body: "Nora, 60 · Insight 3, the refill cliff",
          },
          {
            title: "“If it has a password, I'm not using it.”",
            body: "Ahmed, 65 · Insight 4, one big button",
          },
        ],
      },
      {
        id: "framing",
        title: "Framing the problem",
        kicker: "Who it's for · jobs · scope",
        items: [
          {
            title: "Sara, 34 · primary caregiver",
            body: "Works full-time in Riyadh and lives with her parents. Her brother Mohammed helps on weekends, a home helper is there on weekdays. She runs her mother's medication from a screenshot of the last prescription and a WhatsApp group. Her fear: the wrong dose after a doctor changes something.",
          },
          {
            title: "Noura, 68 · Sara's mother",
            body: "Type 2 diabetes and high cholesterol: Metformin twice a day, Aspirin, Atorvastatin at night, Vitamin D. Reads Arabic comfortably, uses WhatsApp voice notes and the Quran app. Doesn't want to feel like a patient in her own house.",
          },
          {
            title: "Mohammed, 29 · the weekend sibling",
            body: "Wants to help when he's around, and wants to see in one glance whether Mom has taken her evening pills.",
          },
          {
            title: "When a doctor changes my mother's medication",
            body: "I want to update the routine once and have everyone see it, so nobody gives her the old dose.",
          },
          {
            title: "When it's after Maghrib and I'm not home",
            body: "I want to know whether Mom has taken her pills, so I don't nag her and my brother doesn't double-dose her.",
          },
          {
            title: "When a box is running low",
            body: "I want to be told days early, so I pick it up on the way home instead of at 11 pm.",
          },
          {
            title: "(Noura) When the phone tells me it's time",
            body: "I want to press one thing and get on with my day, so I don't feel managed.",
          },
          {
            title: "How might we",
            body: "…make it effortless for a family to keep a parent's medication on track without making the parent feel monitored?",
            accent: "amber",
          },
          {
            title: "What success looks like",
            body: "For a concept I can only measure the prototype: task completion, time on task and SUS. If this shipped I'd track on-time dose rate, refill-on-time rate, and weekly active caregivers per family circle. The last one is the real health signal.",
          },
          {
            title: "In scope",
            body: "Medication schedules, prayer-time anchoring, Parent mode, family circle with roles, refill tracking, missed-dose escalation, weekly pill-organiser prep, Arabic and English.",
          },
          {
            title: "Out, deliberately",
            body: "Ordering from pharmacies (a Birr Plus request), telehealth, vitals, clinical advice, and automatic phone calls. An earlier version escalated to a call. In the parents' own words that was the policing they dread, so it went. The app never says what to take, only when the family agreed it was taken.",
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
            body: "List · detail · add (name and dose → photos → when: after prayer or exact time) · prepare medicines.",
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
            body: "Due: the medicine and one button, I took it. Confirmed: well done, with a one-tap undo. Late: “a little late, that's okay”.",
          },
          {
            title: "Secondary flows",
            body: "Refill (supply gauge → three-day nudge → request) · missed-dose escalation · weekly preparation (the pill-organiser checklist grouped by prayer slot) · offline and loading states · eight error states.",
          },
        ],
        images: [
          {
            src: "/work/birr/flows.jpg",
            alt: "Birr flows: onboarding, caregiver, parent and states, both modes on one canvas",
            ratio: "wide",
          },
          {
            src: "/work/birr/journey.jpg",
            alt: "User journey: six stages from discovery to supply and family, read right to left",
            ratio: "wide",
          },
        ],
      },
      {
        id: "hero-flow",
        title: "Hero flow: from prescription to first confirmed dose",
        kicker: "Six steps",
        numbered: true,
        items: [
          {
            title: "Add a medication from the box",
            body: "Sara photographs the pharmacy box. The name and dose are read from the label.",
          },
          {
            title: "Add a photo of the pill itself",
            body: "Noura recognises the small white one, not the word Metformin.",
          },
          {
            title: "Set when as prayer slots",
            body: "After Fajr, after Dhuhr with food. Or, for a medicine that needs exact spacing, clock times.",
          },
          {
            title: "Invite the family with a link",
            body: "Mohammed lands in the same family circle. Noura gets her own link and never creates an account.",
          },
          {
            title: "One card, one button",
            body: "Twenty minutes after Dhuhr, Noura's phone shows one card: the pill's photo, “one tablet, with lunch”, and one large button. I took it.",
          },
          {
            title: "Confirmed, for the whole circle",
            body: "She taps it. Sara's Today screen reads Confirmed · by herself · 12:48, and the activity feed logs it for everyone.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Key design decisions",
        kicker: "Problem · decision · trade-off",
        numbered: true,
        intro:
          "Each one has the same shape: the problem, what I did, and what it cost.",
        items: [
          {
            title: "Reminders are anchored to prayer times",
            body: "Clock alarms don't match how the family talks, and Fajr moves almost two hours across the year in Riyadh. So the “when” step offers two reminder types per medicine. After prayer: the five prayer slots plus before bed, an adjustable offset (20 minutes after the adhan), and a with-food switch. Each slot resolves to a real time daily from the device's location, using Umm al-Qura. Exact time: a plain clock list for prescriptions written 7:30 AM and 7:30 PM. The cost is more engineering and one more choice on the add flow. Keeping the clock one tap away is what kept both kinds of caregiver.",
          },
          {
            title: "Two experiences in one app",
            body: "A dashboard dense enough for Sara is unusable for Noura, and the reverse. So Parent mode is its own surface: one card, 30pt titles, a 24pt medicine name, a 60pt button, and two actions, I took it and Remind me later. It opens from a text-message link, no sign-up, and works offline. Every Parent screen answers one question: can a 70-year-old do this with one thumb? The cost is two surfaces to maintain, so Parent mode is capped at three states.",
          },
          {
            title: "A family circle with attribution",
            body: "The dangerous case isn't a forgotten dose. It's two siblings each assuming the other gave it. So every dose carries a name: confirmed by herself, confirmed by Mohammed. Members join by link with one of two roles, confirms or view only, and the activity feed is the family's shared memory of the day. To stop it feeling like a scoreboard there are no streaks, no counts, and the parent's view never shows who didn't act.",
          },
          {
            title: "Escalation instead of alarms",
            body: "Reminder apps either nag the patient until they're ignored, or panic the family. So there's a ladder. At 20 minutes the parent's card repeats once, gently. At 45 the primary caregiver gets a notification. At 90 the circle sees an amber unconfirmed state. Never red, never “missed” in the parent's view, and the timings are settings. A human is the last resort, not a device. The cost is a slower response in a real emergency. The first version ended the ladder with an automatic phone call. It read as surveillance, so it went.",
          },
          {
            title: "Refills by pack count",
            body: "Running out is discovered at night. So each medication stores pack size and doses per day, and the supply gauge counts down in days as doses are confirmed, turns amber three days out, and offers a one-tap refill request. A weekly Prepare medicines checklist, grouped by prayer slot, catches anything out of stock before the organiser is filled. It only works when doses are confirmed, so unconfirmed doses count as taken but show as unconfirmed. I'd revisit that with real usage data.",
          },
          {
            title: "Bilingual RTL/LTR, done properly",
            body: "Most “Arabic” apps are translated English apps: unmirrored back arrows, wrong numerals, mixed-direction lines that break. So Arabic is the design source and English is derived from it. Navigation, chevrons, lists and the tab bar mirror. The status bar, numbers, phone fields and one-time codes stay left to right. Numerals are a setting: Western by default to match pharmacy labels, Eastern Arabic (٠١٢٣) in Parent mode for parents who read them faster. Latin drug names inside Arabic sentences are direction-isolated, so a line that starts with Metformin still reads right to left. Arabic headlines get 1.3 line-height against 1.18 for Latin. The cost is that every screen is designed twice. Tokens made that manageable.",
          },
        ],
        images: [
          {
            src: "/work/birr/add-medicine.jpg",
            alt: "Add medicine: name and dose, when (after prayer or exact time), and the weekly Prepare medicines checklist",
            ratio: "board",
          },
          {
            src: "/work/birr/english.jpg",
            alt: "English version: the same screens mirrored left to right",
            ratio: "board",
          },
        ],
      },
      {
        id: "visual",
        title: "Visual design",
        kicker: "Direction · colour tokens",
        intro:
          "Calm, warm and high-contrast, borrowed from editorial apps rather than health apps: a warm ivory canvas, white cards with a hairline, generous corners, a floating black tab bar and one black pill for the primary action. Colour is kept for meaning: amber for running low, green for confirmed, red only for out of stock. The parent side is bigger, plainer and slower.",
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
            body: "Secondary text, 5.0:1 on white.",
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
            body: "Confirmed: fill and text.",
            accent: "green",
          },
          {
            title: "v4/amber · v4/amber-text · #E58A2B · #A85C14",
            body: "Due now, running low: fill vs. text.",
            accent: "amber",
          },
          {
            title: "v4/red · v4/red-text · #D65745 · #B8412F",
            body: "Out of stock, errors: fill vs. text.",
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
            body: "Every semantic colour has a soft tint for backgrounds and a text-safe variant that clears 4.5:1. The bright version is only ever a fill. Colour is never the only signal: every state pairs it with an icon and a label.",
          },
        ],
        images: [
          {
            src: "/work/birr/caregiver.jpg",
            alt: "Caregiver mode: Today, Medications and Family, Arabic UI",
            ratio: "board",
          },
          {
            src: "/work/birr/parent.jpg",
            alt: "Parent mode: dose due, confirmed and a little late",
            ratio: "board",
          },
        ],
      },
      {
        id: "type",
        title: "Typography, spacing and motion",
        kicker: "One family for both scripts",
        intro:
          "SF Pro for both scripts, Regular to Bold, so a mixed line (an Arabic sentence with a Latin drug name) sits on one baseline without a seam.",
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
            body: "Nothing below 13pt. Everything scales with the OS text size. Parent mode has a size floor and never truncates.",
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
            body: "Limited to state changes. The dose card settling into confirmed is a smart-animate. Respects Reduce Motion and never blocks input.",
          },
        ],
        images: [
          {
            src: "/work/birr/design-system.jpg",
            alt: "Design system: colour tokens and type scale",
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
            body: "Black · Outline · Text, each with pressed. Full-width pill, 52pt. 60pt in Parent mode.",
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
            body: "Default, with the verified seal on or off. Medicine, member and activity rows.",
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
            alt: "Component library: 32 components built from the screens",
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
            body: "Every readable text pair is at least 4.5:1 (secondary grey 5.0:1, all coloured text through the text-safe tokens). Two non-text pairs are logged as open: the hairline field boundary needs 3:1 on ivory, and the amber gauge bars sit at 2.6:1, so the bars get a deeper amber.",
          },
          {
            title: "Targets",
            body: "44pt minimum everywhere, 60pt in Parent mode. Text links carry hidden 44pt hit areas.",
          },
          {
            title: "Type",
            body: "13pt floor. Dynamic Type supported. Parent mode wraps, never ellipsises.",
          },
          {
            title: "Errors",
            body: "Always text plus colour, never colour alone, and every error state has a way out. Eight states designed in each language.",
          },
          {
            title: "Screen readers",
            body: "An Arabic-first accessible name documented for every icon-only control (“رجوع”, “إضافة دواء”, “التنبيهات · 3 جديدة”…) and the parent's card announced as one group: “Metformin 500 mg, one tablet with lunch, due now”.",
          },
          {
            title: "Motion",
            body: "Respects Reduce Motion. The confirm animation falls back to a cross-fade. Nothing auto-advances.",
          },
          {
            title: "Cognitive load",
            body: "Parent mode shows one decision at a time, uses the family's own words (“after Maghrib”), and never uses medical jargon.",
          },
        ],
        images: [
          {
            src: "/work/birr/accessibility.jpg",
            alt: "Accessibility review: findings, measured contrast and VoiceOver names",
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
          "Figma, both modes, Arabic and English: 21 screens per language plus 8 error states, linked as four flows. Five people tested it: two caregivers (Abdulrahman and my brother, who hadn't seen the design) and three parents (Munirah, Mutlaq and Nora). The parents are the same people I interviewed. A household I didn't know would have been better, and I couldn't get one. I measured completion, time on task, errors, a confidence rating per task, and SUS at the end.",
        items: [
          {
            title:
              "(Caregiver) Add “Metformin 500 mg, after Fajr and after Dhuhr, with food” and set the pack size",
            body: "Completion 2/2 · median time 3 min 40 s. Both looked for a clock time first, then found the prayer chips. My brother asked for “with food” before he saw the switch.",
          },
          {
            title: "(Caregiver) Invite a sibling to the circle",
            body: "Completion 2/2 · median time 50 s. Both expected the invite to be a WhatsApp message. It is.",
          },
          {
            title: "(Parent) The phone shows a reminder. Do what you'd normally do",
            body: "Completion 3/3 · median time 8 s. Two of three tapped the pill photo, not the button, on the first try.",
          },
          {
            title:
              "(Caregiver) Your brother says he gave the dose. Find out whether he did",
            body: "Completion 2/2 · median time 25 s. Both went to Today, not to Activity. The “confirmed by” line answered it.",
          },
        ],
        images: [
          {
            src: "/work/birr/states.jpg",
            alt: "Error states: invalid number, notifications denied, duplicate medicine, sync failed",
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
          "The prototype scored 84 on the System Usability Scale (n = 5). Three changes came out of testing. The rest came earlier, from my own review.",
        items: [
          {
            title: "The whole dose card became the tap target",
            body: "Two parents tapped the pill photo instead of the button. Now the whole card is the tap target, and the button grew to 60pt.",
          },
          {
            title: "After prayer and exact time, side by side",
            body: "Both caregivers looked for a clock time before the prayer chips. Now the “when” step offers after prayer and exact time side by side, with the resolved time under each prayer chip.",
          },
          {
            title: "Late became a little late, that's okay",
            body: "A parent read “late” as a scolding. Now the late state says “a little late, that's okay, take it now”.",
          },
          {
            title: "Before testing, from my own review",
            body: "The automatic call was cut from the escalation ladder. The sign-up buttons lost the company names and kept the logos. Feminine-only Arabic copy was made neutral so a son and a daughter read the same sentence. The header spacing was rebuilt after the first Arabic pass clipped titles.",
          },
        ],
        images: [
          {
            src: "/work/birr/before-after.jpg",
            alt: "Before and after: the Parent dose card, tap target and button size",
            ratio: "board",
          },
        ],
      },
      {
        id: "handoff",
        title: "Handoff spec, design to code",
        kicker: "For the engineer who builds it",
        intro:
          "A design system is only real when it survives a codebase, so the handoff was written for the engineer who builds it, with the RTL and localisation rules spelled out.",
        items: [
          {
            title: "Tokens",
            body: "The v4 · Editorial warm variable collection exported from Figma (Dev Mode → Variables → JSON) to tokens.json, generated into CSS custom properties / Swift constants (--color-ink, --space-4, --text-title). One source, both sides.",
          },
          {
            title: "Direction",
            body: "The root sets dir=\"rtl\" or dir=\"ltr\" from the language setting. Layout uses logical properties only (margin-inline-start, inset-inline-end), so there is no separate RTL stylesheet. The tab bar keeps Today → Meds → Family → Settings in both directions.",
          },
          {
            title: "Numerals and dates",
            body: "Intl.NumberFormat('ar-SA-u-nu-arab') when Eastern Arabic digits are on. Intl.DateTimeFormat for Hijri and Gregorian. Phone numbers and one-time codes are always LTR.",
          },
          {
            title: "Mixed-direction text",
            body: "Drug names rendered inside <bdi> (or a leading U+200F in native strings) so a Latin name never flips an Arabic sentence.",
          },
          {
            title: "Prayer times",
            body: "Computed on-device from location with the Umm al-Qura parameters. The schedule stores the slot and the offset, not the time.",
          },
          {
            title: "Component contract",
            body: "Each Figma component maps to a code component with the same name and state props. DoseCard takes state: 'due' | 'confirmed' | 'late' | 'snoozed' and confirmedBy?: string. ListRow takes verified: boolean. SupplyGauge takes daysLeft: number and derives ok | low | out.",
          },
          {
            title: "Accessibility contract",
            body: "Every icon-only control ships with its documented accessibilityLabel in both languages. Error text is linked to its field and focus moves to the first invalid field on submit. The notification alert traps focus while open.",
          },
        ],
        images: [
          {
            src: "/work/birr/dose-card-spec.jpg",
            alt: "Annotated component spec: the Dose card and its states, RTL and LTR side by side",
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
          "All five participants completed the core tasks. Both caregivers called prayer-time scheduling “finally”, unprompted, and my father asked when he could have it on his phone. After launch I'd measure on-time dose rate, refill-on-time rate, unconfirmed-dose rate over time, and weekly active caregivers per circle.",
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
            body: "With consent, a doctor sees the family's adherence log. The weekly report already exists in Birr Plus.",
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
            body: "Building the product on one cultural truth, prayer times, gave every later decision a spine. Splitting the app into two modes felt expensive and turned out to be the simplification that made everything else possible. Designing Arabic first produced a cleaner English app than the other way round ever has for me.",
          },
          {
            title: "What I'd do differently",
            body: "Studying my own family cut both ways: unmatched access, and a constant risk of writing down what I already believed. The diary helped. A third household I didn't know would have helped more, and I'd test with parents I hadn't interviewed.",
          },
          {
            title: "What I learned",
            body: "Cutting a feature can be the strongest design move. Removing the automatic call made the escalation model make sense. In Parent mode, copy is the product: changing late to “a little late, that's okay” did more than any layout change. And testing proved me wrong about one thing. I was sure prayer slots alone would be enough for caregivers. They weren't. Both wanted a plain clock for at least one medicine, and the schedule step is better for it.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ snb
  // Self-initiated concept. Copy is verbatim from Moe's brief (SNB,
  // reimagined.md); images are exports from his Figma file; the walkthrough
  // is his 31 s Figma Motion export, re-encoded muted at 1080p (~1.8 MB).
  // Unofficial concept: not affiliated with Saudi National Bank.
  {
    slug: "snb",
    headline:
      "SNB, reimagined: an everyday banking app designed around Nafath, sarie and SADAD, with the woven Sadu pattern as its signature",
    video: {
      src: "/work/snb/walkthrough.mp4",
      poster: "/work/snb/walkthrough-poster.jpg",
      title: "walkthrough.mp4 · 1920 × 1080 · 31 s · muted loop",
      // Short on purpose: it shares the bottom row with the Pause pill on phones.
      label: "// walkthrough",
    },
    sections: [
      {
        id: "challenge",
        title: "The challenge",
        kicker: "Unofficial concept · iOS · English and Arabic",
        intro:
          "Saudi banking runs on local rails: Nafath for identity, sarie for instant transfers, SADAD for bills. I wanted an app where those are the core of the experience, not add-ons, and where Arabic is designed rather than translated at the end. Five principles guided every screen.",
        numbered: true,
        items: [
          {
            title: "Local rails first.",
            body: "Nafath sign-in, IBAN-first transfers, SADAD bills.",
          },
          {
            title: "Money never moves on one tap.",
            body: "Review, then slide or tap the handle, then Face ID.",
          },
          {
            title: "Arabic from day one.",
            body: "Every core screen has a mirrored Arabic version.",
          },
          {
            title: "Accessible by default.",
            body: "Measured contrast, 44 pt targets, no drag-only actions.",
          },
          {
            title: "Saudi craft, used with restraint.",
            body: "The Sadu zigzag as texture, the Najdi triangle band as a hem, warm illustrated avatars.",
          },
        ],
        images: [
          {
            src: "/work/snb/hero-mockup.jpg",
            alt: "Hero mockup: the Send money, Home and Cards screens on three phones over the Sadu-textured green",
            ratio: "video",
          },
        ],
      },
      {
        id: "process",
        title: "Process",
        kicker: "One change of direction",
        intro: "The design changed direction once, and that change made it.",
        numbered: true,
        items: [
          {
            title: "References",
            body: "I collected modern fintech patterns on Mobbin to benchmark sign-in, transfers and card controls.",
          },
          {
            title: "A dark first draft",
            body: "It was glassy and dark, and it looked like every generic fintech mock, with nothing Saudi about it. I scrapped it.",
          },
          {
            title: "Light, warm, and local",
            body: "I rebuilt it on a warm canvas with SNB green and gold accents. The green hero with a faint Sadu zigzag started on the Send Money screen and became the signature across the app.",
          },
          {
            title: "A Home that says something",
            body: "Home went from a bland list to a balance chart that marks when the salary landed, a “Send again” row with illustrated avatars, and a “Coming up” bill card.",
          },
          {
            title: "States and edge cases",
            body: "Loading, empty, offline, over the limit, and a failed transfer.",
          },
          {
            title: "Accessibility, then Arabic",
            body: "A measured contrast and tap-target pass, then right-to-left versions of the core flow.",
          },
        ],
        images: [
          {
            src: "/work/snb/home.jpg",
            alt: "Home: balance chart with the salary marker, quick actions, Send again row and the Coming up bill card",
          },
          {
            src: "/work/snb/send-money.jpg",
            alt: "Send money: recipients, SAR 500 amount over the Sadu green hero, purpose row and keypad",
          },
          {
            src: "/work/snb/transfer-sent.jpg",
            alt: "Transfer sent: confetti, “Arrived instantly via sarie”, and a tear-off receipt",
          },
        ],
      },
      {
        id: "sign-in",
        title: "Sign in and open an account",
        kicker: "Key flows · 01",
        items: [
          {
            title: "Sign in",
            body: "Nafath number match, or Face ID for returning users. Nothing to remember: Nafath is already how Saudis prove who they are.",
          },
          {
            title: "Open an account",
            body: "ID and mobile, Nafath, Absher details, terms. Four steps with a progress bar; Absher details arrive prefilled and read-only.",
          },
        ],
        images: [
          {
            src: "/work/snb/sign-in.jpg",
            alt: "Sign in: SNB card art over the green hero, “Send, pay and save in seconds”, Sign in and Open an account",
          },
          {
            src: "/work/snb/nafath-verify.jpg",
            alt: "Nafath verify: the number to match in the Nafath app, with the timer and a resend option",
          },
          {
            src: "/work/snb/account-ready.jpg",
            alt: "Account ready: the confirmation screen at the end of the four-step onboarding",
          },
        ],
      },
      {
        id: "home",
        title: "Home",
        kicker: "Key flows · 02",
        intro:
          "Balance chart, send again, coming up. The chart explains why the balance changed (a salary marker), not just that it did.",
        images: [
          {
            src: "/work/snb/home.jpg",
            alt: "Home: the balance chart marks when the salary landed",
          },
          {
            src: "/work/snb/insights.jpg",
            alt: "Insights: spending by category on the green chart palette, always paired with labels",
          },
          {
            src: "/work/snb/transaction-detail.jpg",
            alt: "Transaction detail: merchant mark, amount, and the split-bill and report-a-problem actions",
          },
        ],
      },
      {
        id: "money",
        title: "Send money, at home and abroad",
        kicker: "Key flows · 03",
        items: [
          {
            title: "Send money",
            body: "Pick a person or IBAN, amount, purpose, review, slide. New beneficiaries need an SMS code; slide-to-send also works with one tap.",
          },
          {
            title: "Send abroad",
            body: "Rate held for 30 minutes, fee and VAT up front, tracking. The total is shown before review; tracking answers “where is my money?”",
          },
        ],
        images: [
          {
            src: "/work/snb/money-moves.jpg",
            alt: "Money moves: Send money, Review transfer, Transfer sent, Send abroad and Sent abroad on five phones",
            ratio: "video",
          },
        ],
      },
      {
        id: "cards-bills",
        title: "Cards and bills",
        kicker: "Key flows · 04",
        items: [
          {
            title: "Cards",
            body: "Freeze with undo, limits, PIN, details behind Face ID. Freezing lists what stops and what keeps working, and one tap undoes it.",
          },
          {
            title: "Bills",
            body: "SADAD bills with usage history and auto-pay. Bill detail shows why this month costs more (summer AC).",
          },
        ],
        images: [
          {
            src: "/work/snb/cards.jpg",
            alt: "Cards: the Platinum card, freeze, limits, PIN and details actions, and card controls",
          },
          {
            src: "/work/snb/freeze-card.jpg",
            alt: "Freeze card: the sheet lists what stops and what keeps working before you confirm",
          },
          {
            src: "/work/snb/card-frozen.jpg",
            alt: "Card frozen: the frozen state with a one-tap Undo",
          },
          {
            src: "/work/snb/sadad-bills.jpg",
            alt: "SADAD bills: billers with amounts due and auto-pay status",
          },
          {
            src: "/work/snb/bill-detail.jpg",
            alt: "Bill detail: Saudi Electricity with usage history explaining why this month costs more",
          },
          {
            src: "/work/snb/bill-paid.jpg",
            alt: "Bill paid: confirmation with the SADAD reference",
          },
        ],
      },
      {
        id: "edge-cases",
        title: "Edge cases",
        kicker: "Key flows · 05",
        intro:
          "Loading, empty, offline, over limit, failed transfer. Every error says what happened, that no money moved, and what to do next.",
        images: [
          {
            src: "/work/snb/no-connection.jpg",
            alt: "No connection: the offline state in the simpler line illustration style",
          },
          {
            src: "/work/snb/over-limit.jpg",
            alt: "Over limit: the amount exceeds the daily limit, with the remaining limit and what to do next",
          },
          {
            src: "/work/snb/transfer-failed.jpg",
            alt: "Transfer failed: what happened, that no money moved, and a retry",
          },
        ],
      },
      {
        id: "arabic",
        title: "Arabic, right to left",
        kicker: "Ten screens · six rules",
        intro:
          "Ten Arabic screens cover the core flow, from sign-in to bills. They follow six rules.",
        items: [
          {
            title: "Mirror the layout.",
            body: "Navigation, lists, switches and the tab bar flip; Home sits on the right.",
          },
          {
            title: "Keep numbers left to right.",
            body: "Western digits, with masked numbers and IBANs wrapped in LRM marks so they never scramble.",
          },
          {
            title: "Currency on the left.",
            body: "ر.س sits to the left of the number, the way it reads in Arabic.",
          },
          {
            title: "Flip only what points.",
            body: "Back, arrows and the slide handle flip; search, bell and Face ID don't.",
          },
          {
            title: "Card faces stay as printed.",
            body: "Card numbers and names stay left to right.",
          },
          {
            title: "Same parts, both directions.",
            body: "Components have Direction = RTL variants, so Arabic screens use the same building blocks as English.",
          },
        ],
        images: [
          {
            src: "/work/snb/english-arabic.jpg",
            alt: "English and Arabic: the Home screen in both directions, side by side",
            ratio: "video",
          },
          {
            src: "/work/snb/ar-home.jpg",
            alt: "Arabic Home: mirrored layout, Home tab on the right, numbers left to right",
          },
          {
            src: "/work/snb/ar-send-money.jpg",
            alt: "Arabic Send money: ر.س to the left of the amount, the slide handle flipped",
          },
          {
            src: "/work/snb/ar-sadad-bills.jpg",
            alt: "Arabic SADAD bills: the bills list, right to left",
          },
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility, measured",
        kicker: "WCAG AA · four fixes",
        intro:
          "Every colour pair was measured against WCAG AA, and four failed. I fixed them in the colour variables, so every screen updated at once.",
        items: [
          {
            title: "Hint and caption text on the canvas",
            body: "#69756F at 4.39:1 → #5E6A64 at 5.16:1.",
          },
          {
            title: "Positive green on white",
            body: "#0F8A5F at 4.36:1 → #0A7550 at 5.72:1.",
          },
          {
            title: "Input and toggle borders",
            body: "#E3E6E1 at 1.15 to 1.26:1 → #7F8983 at 3.3 to 3.6:1.",
          },
          {
            title: "Secondary text on the green hero",
            body: "White at 50 to 80%, 2.7 to 4.5:1 → #D5E7E0 at 4.65:1.",
          },
          {
            title: "44 × 44 pt",
            body: "Every tap target is at least 44 × 44 pt.",
          },
          {
            title: "No drag-only actions",
            body: "Slide-to-send also works with a single tap, so no action needs a drag (WCAG 2.5.7).",
          },
          {
            title: "The Nafath timer",
            body: "Announced, and the request can be resent (WCAG 2.2.1).",
          },
          {
            title: "Never colour alone",
            body: "Status always pairs colour with an icon and words.",
          },
          {
            title: "Reduce Motion",
            body: "Loading skeletons and confetti respect Reduce Motion.",
          },
        ],
        images: [
          {
            src: "/work/snb/color.jpg",
            alt: "Colour board: every swatch bound to the SNB Light variables, with its measured contrast ratio",
            ratio: "board",
          },
        ],
      },
      {
        id: "design-system",
        title: "Design system",
        kicker: "One system · both languages",
        intro: "One system drives all 59 screens in both languages.",
        items: [
          {
            title: "Colour",
            body: "16 variables in “SNB · Color”, named by role: bg/canvas, text/secondary, brand/primary, status/negative.",
          },
          {
            title: "Type",
            body: "Readex Pro for Latin and Arabic, from Display 72 for amounts down to Tab 11.",
          },
          {
            title: "Components",
            body: "Status Bar, Tab Bar (Active × Direction), Button, Icon Button (Icon × Surface × Direction), Text Field (State × Direction, with swappable icons), Switch, Checkbox, Radio, Toast, Transaction Row, Merchant Mark, two Cards and six Illustrated Avatars.",
          },
          {
            title: "Patterns",
            body: "Bottom sheet, toast with an action, stepper, skeleton, empty state, security note, slide to confirm and the Face ID prompt, each with usage rules.",
          },
          {
            title: "Handoff notes",
            body: "A separate page lists behaviour and accessibility for every screen, so the designs stay clean.",
          },
        ],
        images: [
          {
            src: "/work/snb/brand-elements.jpg",
            alt: "Brand elements: Sadu zigzag, Najdi triangle band, success confetti, illustration style, illustrated avatars and card art",
            ratio: "video",
          },
          {
            src: "/work/snb/type-specimen.jpg",
            alt: "Typeface specimen: Readex Pro for Latin and Arabic",
            ratio: "wide",
          },
          {
            src: "/work/snb/components.jpg",
            alt: "Components: status bars, buttons, merchant mark, avatars and the two cards",
            ratio: "board",
          },
          {
            src: "/work/snb/patterns.jpg",
            alt: "Patterns: bottom sheet, toast, stepper, skeleton and empty state with usage rules",
            ratio: "board",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome and next steps",
        kicker: "Closing",
        intro:
          "The result is 59 screens across 12 flows, 10 of them in Arabic, with 199 prototype links and a design system that builds both languages. Unofficial concept: not affiliated with Saudi National Bank.",
        numbered: true,
        items: [
          {
            title: "Test with five people",
            body: "Test send money and freeze card with five people, including someone over 55 and a resident who doesn't read Arabic.",
          },
          {
            title: "Check the current SAMA rules",
            body: "For activating new beneficiaries and for daily limits. The limits in the design are placeholders.",
          },
          {
            title: "Add a before-and-after",
            body: "Two or three screenshots of the current SNB app next to the redesign.",
          },
          {
            title: "Large text and dark mode",
            body: "Run a large-text (Dynamic Type) pass and design dark mode.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  return caseStudyDetails.find((detail) => detail.slug === slug);
}
