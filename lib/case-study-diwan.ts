// Diwan: the internal app Moe designed and built for Agile Advice.
//
// Source of truth is his finished case-study page (Desktop/Diwan-case-study,
// 2026-11-18). The wording, the section order, the captions and which image
// goes where are HIS and are kept exactly; only the layout is this site's.
// Do not reword. The 56 screens in public/work/diwan are already anonymised
// (made-up names, scaled amounts), which the cover note says on the page.

import type { CaseImage, CaseStudyDetail } from "./case-studies";

const shot = (
  file: string,
  alt: string,
  width: number,
  height: number,
  extra: Partial<Pick<CaseImage, "name" | "caption" | "captionLead">> = {},
): CaseImage => ({
  src: `/work/diwan/${file}.jpg`,
  alt,
  width,
  height,
  ...extra,
});

/** Mac screens are 1440 x 1024. */
const mac = (
  file: string,
  alt: string,
  extra: Partial<Pick<CaseImage, "name" | "caption" | "captionLead">> = {},
) => shot(file, alt, 1440, 1024, extra);

/** iPhone screens are 402 x 874. */
const phone = (file: string, alt: string, caption: string) =>
  shot(file, alt, 402, 874, { caption });

/** The smaller iPhone exports are 302 x 656 (same ratio). */
const phoneSmall = (file: string, alt: string, caption: string) =>
  shot(file, alt, 302, 656, { caption });

export const diwanDetail: CaseStudyDetail = {
  slug: "diwan",
  headline: "Diwan",
  headlineAr: "ديوان",
  meta: [
    {
      label: "Role",
      value:
        "Product designer. I did the research, UX, UI and design system, and built the prototypes",
    },
    { label: "Company", value: "Agile Advice, Riyadh" },
    { label: "Timeline", value: "October to November 2026" },
    { label: "Platforms", value: "macOS and iOS, plus a client portal" },
    { label: "Tools", value: "Figma, SwiftUI, Xcode, Claude Code" },
  ],
  cover: {
    image: shot(
      "cover",
      "Diwan cover: the Home screen on a Mac next to the iPhone app",
      1920,
      1080,
      { name: "Diwan" },
    ),
    note: "The names, clients and amounts in these screens are made up.",
  },
  sections: [
    // ------------------------------------------------------------------ 01
    {
      id: "context",
      kicker: "Background",
      title: "About Agile Advice",
      blocks: [
        {
          type: "prose",
          lead: true,
          paragraphs: [
            "Agile Advice is a consulting firm in Riyadh. Most of our work is on energy and power projects, things like prequalification dossiers, document approvals and following equipment through testing and commissioning.",
            "A project can run for months, and each one comes with a client, a few consultants and a lot of files, emails and invoices. When we had a handful of projects, email and shared spreadsheets were fine. As we started taking on more at the same time, simple questions got hard to answer. Who's on leave next week? Has this client paid yet? Which version of the payments file is the latest one?",
            "I work at the company, so I was dealing with this too. I started Diwan to bring it all into one app.",
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 02
    {
      id: "problem",
      kicker: "The problem",
      title: "Where the work was happening",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I started by writing down everywhere work was actually happening. I ended up with five places:",
          ],
        },
        {
          type: "rows",
          items: [
            {
              title: "Spreadsheets over email",
              body: "Files with names like “Payments_final_v3.xlsx” going back and forth, and people weren't sure which one was current.",
            },
            {
              title: "Approvals in chat",
              body: "Leave and expenses got approved in a message or on paper, so there was no real record of it.",
            },
            {
              title: "Client files in inboxes",
              body: "To find the latest contract or report you had to dig through old email threads.",
            },
            {
              title: "HR in other apps",
              body: "Clocking in, leave balances and HR letters were each in a different place.",
            },
            {
              title: "Manual reports",
              body: "Someone had to copy numbers into slides every week.",
            },
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Nobody was doing anything wrong here. The tools we used just weren't connected to each other. I also knew people weren't going to stop using Outlook, Teams and Excel, so Diwan had to work alongside them instead of trying to replace them.",
          ],
        },
        {
          type: "question",
          label: "The question I worked from",
          text: "How can everyone at Agile Advice see and do their work in one place, while still using the tools they already know?",
        },
      ],
    },

    // ------------------------------------------------------------------ 03
    {
      id: "users",
      kicker: "Research",
      title: "Who uses it",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Six kinds of people would use the app: admins, managers, employees, designers, finance and IT. Clients would also get a small view of their own. For each role I made a journey map following one person through a normal week, covering what they do, which screens they'd use and where it gets frustrating.",
            "Each map started with a line about what that person wanted. I ended up going back to these a lot when I wasn't sure about a decision:",
          ],
        },
        {
          type: "quotes",
          items: [
            {
              who: "Admin",
              quote:
                "I want everyone set up right on day one, without chasing IT or old files.",
            },
            {
              who: "Manager",
              quote:
                "I need to know who's free and what's late before my 9 AM call.",
            },
            {
              who: "Employee",
              quote: "I just want to do my work, not fill in forms.",
            },
            {
              who: "Designer",
              quote:
                "Give me the real brand, the latest files and feedback in one place.",
            },
            {
              who: "Finance",
              quote:
                "When the numbers in a file change, everyone should see it without me emailing a new version.",
            },
            {
              who: "IT",
              quote: "Secure by default, and nothing that breaks Microsoft 365.",
            },
          ],
        },
        {
          type: "figure",
          image: shot("cs-users", "Six journey maps, one per role", 1920, 1328, {
            name: "Journey maps",
            caption: "The six journey maps.",
          }),
        },
        {
          type: "figure",
          image: shot(
            "journey-admin",
            "The admin journey map in detail",
            2000,
            1007,
            {
              name: "Admin journey",
              caption:
                "The admin map up close. The line in the middle shows how each step feels, which made it easy to see where things go wrong.",
            },
          ),
        },
        {
          type: "prose",
          paragraphs: [
            "When I put the maps next to each other, a lot of the same problems came up for different roles. People were waiting on someone else to approve something, they weren't sure which file was the right one, and they were entering the same information more than once.",
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 04
    {
      id: "principles",
      kicker: "Principles",
      title: "Four rules for the design",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Before I started on screens, I wrote down a few rules to keep the project on track.",
          ],
        },
        {
          type: "cards",
          numbered: true,
          items: [
            {
              title: "Keep it in one place",
              body: "A Home screen that shows what needs your attention today, one inbox for all requests, and a page for each client with their files, emails and invoices.",
            },
            {
              title: "Use the files people already have",
              body: "People can keep working in Excel, Word and PDFs. When they upload a new version, they check what changed and the app updates for everyone.",
            },
            {
              title: "Fit how Saudi companies work",
              body: "Arabic, Hijri dates, a Sunday to Thursday week, Ramadan hours and the leave types in the Labour Law, all from the start.",
            },
            {
              title: "Let AI help, but a person checks",
              body: "AI can write summaries, send payment reminders and read receipts from a photo, but someone always sees the result before it's saved.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 05
    {
      id: "structure",
      kicker: "Structure",
      title: "How it's organised",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I split the sidebar the way people at the company already talk about their work: the day, the work, the people and the money. Settings, the employee app and the client portal sit around that. I kept the labels simple, like Payments, Leave and Projects, so people don't have to learn new names for things.",
          ],
        },
        {
          type: "figure",
          image: shot(
            "cs-ia",
            "Sitemap: Every day, Work, People, Finance, Settings and other views",
            1920,
            1100,
            {
              name: "Sitemap",
              caption:
                "The sitemap. Each list opens into a detail page, for example Companies into a single company.",
            },
          ),
        },
        {
          type: "notes",
          items: [
            {
              title: "Requests",
              body: "Leave, expenses, purchases and timesheets all show up the same way: on Home, in the inbox, and as a badge on the Requests tab on the phone.",
            },
            {
              title: "Roles",
              body: "Everyone uses the same app, and your role decides what you can see. Employees don't see payroll, and clients only see their own company.",
            },
            {
              title: "Clients",
              body: "Projects, files, emails and invoices are all linked to a client's page, so you always know where to look for something.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 06
    {
      id: "system",
      kicker: "Design system",
      title: "The design system",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I built the system from the Agile Advice brand we already had and extended it to cover a full product. There are 15 boards in Figma for colour, type, spacing, icons, components, patterns and states. The Mac app and the iPhone app use the same values.",
          ],
        },
        {
          type: "swatches",
          items: [
            { name: "Indigo", hex: "#3733D0", use: "Buttons, links and focus." },
            { name: "Paper", hex: "#F7F7F4", use: "Page background." },
            { name: "Ink", hex: "#111111", use: "Text." },
            {
              name: "Lavender",
              hex: "#F1F1FD",
              use: "Selected rows and highlights.",
            },
          ],
        },
        {
          type: "notes",
          items: [
            {
              title: "Colour",
              body: "I only used indigo on things you can click. Green, amber and red are for status (on track, needs input, late), so the two never get mixed up.",
            },
            {
              title: "Numbers",
              body: "Amounts and hours use tabular figures so they line up in columns, which helps a lot on payroll and payments.",
            },
            {
              title: "Cards",
              body: "White cards with thin borders instead of shadows. The busier screens felt heavy with shadows on everything.",
            },
          ],
        },
        {
          type: "figures",
          images: [
            shot("ds-overview", "Design system overview board", 1600, 2498, {
              name: "Overview",
              caption: "Overview board.",
            }),
            shot(
              "ds-colour",
              "Colour board with brand and status colours",
              1600,
              3148,
              { name: "Colour", caption: "Colour board." },
            ),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 07
    {
      id: "mac",
      kicker: "Mac",
      title: "Main screens on the Mac",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Most of the day-to-day work happens on the Mac, so it has the full product. These are the screens that deal most directly with the problems above.",
          ],
        },
        {
          type: "screens",
          items: [
            {
              image: mac("d-home", "Home screen", { name: "Home" }),
              label: "Home",
              title: "Home",
              body: "Home shows what needs you today: your working hours, today's meetings, requests waiting for you (you can approve them right from the list), your tasks and company announcements. The date is shown in both Gregorian and Hijri.",
            },
            {
              image: mac("d-approvals", "Approvals screen", {
                name: "Approvals",
              }),
              label: "People",
              title: "Approvals",
              body: "Leave, expenses and purchases come into one list. Each request shows the information you'd normally go and look up, like the person's leave balance, who else is off those days and how much budget is left.",
            },
            {
              image: mac("d-companies", "Company page", { name: "Companies" }),
              label: "Work",
              title: "Companies",
              body: "Each client has a page with their projects, files, emails, invoices and contacts. This is what replaced digging through email for the latest contract.",
            },
            {
              image: mac("d-project", "Project detail", { name: "Project" }),
              label: "Work",
              title: "Project",
              body: "Milestones, tasks, files, budget, team and timeline. The progress comes from the follow-up spreadsheet the team already keeps updated, so when someone uploads a new version, the project page changes with it.",
            },
            {
              image: mac("d-payments", "Payments screen", { name: "Payments" }),
              label: "Finance",
              title: "Payments",
              body: "What's been collected, what's still owed and what's overdue. Each invoice is linked to its client and project.",
            },
            {
              image: mac("d-payroll", "Payroll screen", { name: "Payroll" }),
              label: "Finance",
              title: "Payroll",
              body: "Salaries, approved overtime and leave deductions in one monthly run. It has to be confirmed with Touch ID before anything gets paid.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 08
    {
      id: "ai",
      kicker: "Ask AI",
      title: "Letting AI prepare work",
      blocks: [
        {
          type: "prose",
          lead: true,
          paragraphs: [
            "Ask AI answers questions about the company's data, and only shows what your role is allowed to see.",
            "The part I spent the most time on was letting it actually do things instead of only answering. I used one example to design it: someone in finance asks it to pay this week's approved supplier invoices. The basic idea is that the AI gets everything ready, but a person makes the decision, and the more money involved, the more checks there are.",
          ],
        },
        {
          type: "figure",
          image: mac("d-askai", "Ask AI screen", {
            name: "Ask AI",
            caption: "Ask AI. Answers link to the records they came from.",
          }),
        },
        { type: "heading", text: "How the payment example works" },
        {
          type: "steps",
          items: [
            {
              title: "Ask",
              body: "“Pay every approved invoice due this week.” Typed or spoken, in English or Arabic.",
            },
            {
              title: "AI prepares",
              body: "It finds eight invoices, gets six ready and holds back two, with a reason for each.",
            },
            {
              title: "Review",
              body: "Each line shows who approved it, what it matches and when it's due.",
            },
            {
              title: "Sign",
              body: "Touch ID signs the exact amounts. If anything changes, it has to be signed again.",
            },
            {
              title: "Second approver",
              body: "Above a set amount, the CEO approves too, from his iPhone with Face ID.",
            },
            {
              title: "Logged",
              body: "The log says it was prepared by AI and lists who approved it.",
            },
          ],
        },
        {
          type: "figures",
          images: [
            mac("ai-review", "Review and sign a payment batch", {
              name: "Review",
              caption: "Reviewing the batch. Unticking a line updates the total.",
            }),
            mac("d-stepup", "Touch ID confirmation", {
              name: "Touch ID",
              caption:
                "The Touch ID prompt repeats the total, the payees and the account.",
            }),
          ],
        },
        {
          type: "heading",
          text: "Four levels",
          note: "I sorted everything the AI could do by how much damage a mistake could cause.",
        },
        {
          type: "table",
          columns: ["Level", "What it needs", "Examples", "How it works"],
          rows: [
            {
              name: "Drafts",
              needs: "One click",
              tone: "green",
              examples:
                "Emails, replies, tasks from a meeting, summaries, translations",
              how: "You send or save it yourself.",
            },
            {
              name: "Decisions",
              needs: "Confirm each one",
              tone: "blue",
              examples: "Leave, expenses, timesheets, meeting invites",
              how: "The AI points out things like clashes and budget, and you decide each item.",
            },
            {
              name: "Money",
              needs: "Signature",
              tone: "amber",
              examples: "Supplier payments, refunds, credit notes",
              how: "Touch ID on the exact lines, and a second approver above a set amount.",
            },
            {
              name: "Off limits",
              needs: "People only",
              tone: "red",
              examples: "Payroll, bank details, user roles, deleting data",
              how: "The AI can read these but has no way to prepare them.",
            },
          ],
        },
        {
          type: "callout",
          title: "Other limits",
          items: [
            {
              title: "It can't pay",
              body: "The AI can only prepare drafts. A payment only goes out after a person signs it.",
            },
            {
              title: "It doesn't see bank details",
              body: "It works with invoice numbers, and the amounts and accounts are filled in from the records.",
            },
            {
              title: "Same checks as everyone",
              body: "Anything the AI prepares goes through the same limits and approvals as something a person made.",
            },
          ],
        },
        {
          type: "split",
          image: shot("ai-overview", "AI actions concept board", 1440, 1957, {
            name: "AI actions",
            caption: "The concept page in Figma.",
          }),
          aside: {
            title: "On the iPhone",
            body: "When a payment needs a second approver, they get a notification, see the same lines on their phone and approve with Face ID.",
          },
          phones: [
            phoneSmall(
              "p-F1",
              "iPhone: second approver reviews the batch",
              "Reviewing",
            ),
            phoneSmall("p-F2", "iPhone: approve with Face ID", "Face ID"),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 09
    {
      id: "iphone",
      kicker: "iPhone",
      title: "The iPhone app",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I didn't want the phone app to be a squeezed version of the Mac app. On the phone people mostly approve requests, clock in, check their day and reply to clients, so I put those first and moved everything else a tap further in.",
            "It uses standard iOS components like large titles, lists, sheets and the tab bar, and asks for Face ID before payroll or payments. The tabs change depending on your role:",
          ],
        },
        {
          type: "tabs",
          items: [
            {
              title: "Admin, manager, finance",
              body: "Home · Companies · Calendar · Requests · Me",
            },
            { title: "Employee", body: "Home · Tasks · Hours · Requests · Me" },
            { title: "Client", body: "Overview · Invoices · Files · Messages" },
          ],
        },
        {
          type: "phones",
          label: "Admin screens on iPhone",
          images: [
            phone("p-M03", "iPhone Home", "Home"),
            phone("p-M06", "iPhone Requests", "Requests"),
            phone("p-M07", "iPhone leave approval", "Leave request"),
            phone("p-M17", "iPhone Companies", "Companies"),
            phone("p-M19", "iPhone project detail", "Project"),
            phone("p-M29", "iPhone Payments", "Payments"),
            phone("p-M30", "iPhone Payroll", "Payroll"),
            phone("p-M30a", "iPhone Payroll confirm with Face ID", "Face ID"),
            phone("p-M11", "iPhone Ask AI", "Ask AI"),
            phone("p-M33", "iPhone Me tab", "Me"),
          ],
        },
        { type: "heading", text: "The employee version" },
        {
          type: "prose",
          paragraphs: [
            "I kept the employee version small on purpose. They can clock in, see their tasks, log hours, request leave, add an expense from a photo of the receipt and ask for an HR letter without emailing HR.",
          ],
        },
        {
          type: "phones",
          label: "Employee screens on iPhone",
          images: [
            phone("p-ME01", "Employee Home", "Employee home"),
            phone("p-ME03", "My hours", "My hours"),
            phone(
              "p-ME11",
              "Profile and HR letters",
              "Profile and HR letters",
            ),
            phone("p-M00", "Sign in", "Sign in"),
            phone("p-M00a", "Confirm with Face ID", "Face ID sign-in"),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 10
    {
      id: "foldable",
      kicker: "Foldable",
      title: "Trying a foldable layout",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I also tried out how the app would work on a foldable iPhone. Folded, it works like the normal phone app. Opened, Home turns into two columns, lists show their details next to them, and you can have two windows open, for example a project and Ask AI.",
          ],
        },
        {
          type: "figure",
          image: shot(
            "duo",
            "Foldable iPhone concept, folded and open",
            2000,
            1154,
            {
              name: "Foldable",
              caption:
                "Folded and open. When it's open, the tab bar moves to the side.",
            },
          ),
        },
      ],
    },

    // ------------------------------------------------------------------ 11
    {
      id: "arabic",
      kicker: "Arabic",
      title: "Designing for Arabic",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Most people at the company read Arabic first, so I designed the Arabic version at the same time as the English one. The layout mirrors: the sidebar moves to the right, progress bars fill from the right and back arrows flip. Numbers, times and charts stay the same way round.",
            "There's more to it than the language. Dates show the Hijri calendar next to the Gregorian one, the week starts on Sunday, working hours change during Ramadan, and leave types follow the Saudi Labour Law.",
          ],
        },
        {
          type: "split",
          image: mac("d-arabic", "Arabic Home on the Mac", {
            name: "Home, Arabic",
            caption: "Home in Arabic on the Mac.",
          }),
          phones: [
            phoneSmall("p-A4", "Arabic Home on iPhone", "And on the iPhone."),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 12
    {
      id: "portal",
      kicker: "Client portal",
      title: "The client portal",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Clients used to get their updates as email attachments. The portal gives each client a view of their own projects, invoices and shared files, and a message thread with our team. They can't see other clients, internal notes or anyone's hours.",
          ],
        },
        {
          type: "split",
          image: mac("d-portal", "Client portal on desktop", {
            name: "Client portal",
            caption: "Portal overview.",
          }),
          phones: [
            phone("p-M53", "Portal overview on iPhone", "Overview"),
            phone("p-M54", "Portal invoices on iPhone", "Invoices"),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 13
    {
      id: "states",
      kicker: "States",
      title: "Empty, loading and error states",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "I designed these for the main screens so whoever builds the app doesn't have to guess. Error messages say what went wrong and what to do about it. Uploading a new version of a spreadsheet has its own review step, so a mismatched column can't overwrite the real numbers.",
          ],
        },
        {
          type: "phones",
          label: "State screens on iPhone",
          columns: 6,
          images: [
            phone("p-M46", "Empty tasks", "Empty"),
            phone("p-M48", "Loading Home", "Loading"),
            phone("p-M49", "Upload failed", "Error"),
            phone("p-M51", "Leave approved toast", "Confirmation"),
            phone("p-M22", "File upload, match columns", "Upload: match columns"),
            phone(
              "p-M23",
              "File upload, review changes",
              "Upload: review changes",
            ),
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 14
    {
      id: "round-two",
      kicker: "Second round",
      title: "What I added after the first version",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "After the first version was done, I went through each journey map again and looked for anything people would still have to do outside the app. That gave me a second list of features. I designed each one in Figma and then added it to the prototype.",
          ],
        },
        {
          type: "figures",
          images: [
            mac("n-overtime", "Overtime screen", {
              name: "Overtime",
              captionLead: "Overtime.",
              caption:
                "Approved hours go into payroll. The rate follows article 107 of the Saudi Labour Law (the hourly wage plus 50% of the basic hourly wage), and the calculation is shown line by line.",
            }),
            mac("n-renewals", "Renewals screen", {
              name: "Renewals",
              captionLead: "Renewals.",
              caption:
                "IDs, licences, memberships and contracts in one list, with reminders 60, 30 and 7 days before they expire.",
            }),
            mac("n-milestone", "Invoice a milestone", {
              name: "Milestone invoices",
              captionLead: "Milestone invoices.",
              caption:
                "You can invoice a finished milestone from the project page, and the invoice shows up in Payments.",
            }),
            mac("n-overdue", "Overdue payments drill-down", {
              name: "Overdue payments",
              captionLead: "Overdue payments.",
              caption:
                "Tapping the overdue number on Home shows which invoices it's made of.",
            }),
            mac("n-cover", "Change leave cover", {
              name: "Leave cover",
              captionLead: "Leave cover.",
              caption:
                "Choose who covers for someone on leave, give them an acting title, and decide if they can approve things while the person is away.",
            }),
            mac("n-hrletter", "HR letter preview", {
              name: "HR letters",
              captionLead: "HR letters.",
              caption: "A preview of the letter before you request it.",
            }),
            mac("n-breakdown", "KPI breakdown", {
              name: "Breakdowns",
              captionLead: "Breakdowns.",
              caption:
                "The numbers on Home open up to show what they're made of.",
            }),
            mac("n-customise", "Customise Home", {
              name: "Customising Home",
              captionLead: "Customising Home.",
              caption: "Choose which cards appear and in what order.",
            }),
            mac("n-setupfiles", "Setup, bring your files", {
              name: "Setup",
              captionLead: "Setup.",
              caption:
                "The first-time setup accepts any kind of file, or a whole folder.",
            }),
            mac("n-voice", "Voice input in Ask AI", {
              name: "Voice",
              captionLead: "Voice.",
              caption: "You can talk to Ask AI in English or Arabic.",
            }),
          ],
        },
        {
          type: "figure",
          image: mac("n-signin-dark", "Dark mode sign in", {
            name: "Dark mode",
            captionLead: "Dark mode.",
          }),
        },
      ],
    },

    // ------------------------------------------------------------------ 15
    {
      id: "build",
      kicker: "Building it",
      title: "Building the apps",
      blocks: [
        {
          type: "prose",
          lead: true,
          paragraphs: [
            "I wanted to try the flows with real data instead of only clicking through a Figma prototype, so I built both apps in SwiftUI. I used Claude Code to help with the code.",
          ],
        },
        {
          type: "notes",
          items: [
            {
              title: "Mac",
              body: "The Mac app covers the designed screens and reads the company's real follow-up files.",
            },
            {
              title: "iPhone",
              body: "The iPhone app has all 76 screens and runs on my iPhone 18 Pro Max. It shares its data and logic with the Mac app.",
            },
            {
              title: "Screenshots",
              body: "There's a setting that swaps all the names and changes the amounts. That's how I made the screens on this page.",
            },
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "Building it brought up questions I hadn't thought about in Figma, like what a list looks like with forty items in it, what happens when an upload fails halfway, or where a button should go in Arabic. When the answer wasn't good, I went back and changed the design.",
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 16
    {
      id: "name",
      kicker: "The name",
      title: "Why it's called Diwan",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "ديوان (diwan) is the old word for the office where records and accounts were kept. It's also the name for a room where people sit together. Both fit what the app is for. It's short, and it works in Arabic and English.",
            "Since it's an internal tool, it uses the Agile Advice colours. I also made a short brand and launch book so the name and visuals stay consistent when we introduce it.",
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 17
    {
      id: "outcome",
      kicker: "Next steps",
      title: "Where it is now",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "So far there's the full design in Figma with the design system and journey maps, a working Mac app, a working iPhone app, and the brand book.",
            "It's still a prototype. Nobody is running payroll in it yet, so I don't have numbers on time saved or how many people use it. The next steps are:",
          ],
        },
        {
          type: "next",
          items: [
            {
              title: "Testing",
              body: "Test it with five people, one from each role, during a normal week.",
            },
            {
              title: "Backend",
              body: "Build the real backend, hosted in Saudi Arabia and connected to Outlook, Teams and OneDrive.",
            },
            {
              title: "Release",
              body: "Release the iPhone app, then an Android version using the same design system.",
            },
          ],
        },
      ],
    },

    // ------------------------------------------------------------------ 18
    {
      id: "reflection",
      kicker: "What I learned",
      title: "What I learned",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "With six roles, a lot of the work was deciding what each person doesn't need to see. The employee app especially got better every time I took something out.",
            "With the AI feature, I spent more time on what it shouldn't be allowed to do than on what it can do. I think that's what would make people comfortable using it for anything involving money.",
            "The local details (Hijri dates, the Sunday week, the Labour Law rules) were much easier to include from the start than they would have been to add later.",
            "And building the apps changed the design more than I expected. Using it with real data showed me problems I didn't catch when I was only looking at the screens.",
          ],
        },
      ],
    },
  ],
};
