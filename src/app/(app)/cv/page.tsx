import {
  FileTextIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel";

export const metadata = {
  title: "CV",
  description: "Mohammed Alotaibi - UX Designer Resume",
};

export default function CVPage() {
  return (
    <div className="mx-auto space-y-8 pb-8 md:max-w-3xl">
      {/* Header */}
      <div className="border-x border-edge bg-background px-6 py-8">
        <h1 className="mb-4 text-4xl font-bold">Mohammed Alotaibi</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href="tel:+966553012825"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <PhoneIcon className="size-4" />
            +966 553 012 825
          </a>
          <a
            href="mailto:moe.halotaibi@gmail.com"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <MailIcon className="size-4" />
            moe.halotaibi@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-alotaibi-1aa047311/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://malotaibi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <GlobeIcon className="size-4" />
            malotaibi.dev
          </a>
        </div>

        <div className="mt-6">
          <Link
            href="https://drive.google.com/file/d/1_xw-EXWEFIBch22882AYDB2BTLOakxkG/view?usp=sharing"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <FileTextIcon className="size-4" />
            Download PDF
          </Link>
        </div>
      </div>

      {/* Summary */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Summary</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <p className="leading-relaxed text-muted-foreground">
            UX Designer with hands-on experience in designing and building
            user-centered digital interfaces. Strong ability to translate UX
            research, wireframes, and prototypes into responsive and accessible
            front-end experiences. Experienced in working on enterprise and
            government digital platforms, with a solid foundation in design
            thinking, usability, and modern UI development.
          </p>
        </PanelContent>
      </Panel>

      {/* Education */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Education</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-8">
          <div>
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Imam Mohammed Ibn Saud University
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Bachelor of Marketing and Communication
                </p>
              </div>
              <span className="text-sm whitespace-nowrap text-muted-foreground">
                Aug 2021 – Nov 2024
              </span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  User Experience Nanodegree Program
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">Udacity</p>
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>UX Research & User Flows</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>Wireframing & Interactive Prototyping</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>UI Design & Design Systems</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>Usability Testing & Iteration</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>Responsive & Mobile-First Design</span>
              </li>
            </ul>
          </div>
        </PanelContent>
      </Panel>

      {/* Work Experience */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Work Experience</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-6">
          <div>
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">UX Designer</h3>
                <p className="text-sm text-muted-foreground">Agile Advice</p>
              </div>
              <span className="text-sm whitespace-nowrap text-muted-foreground">
                Mar 2025 – Present
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Lead UX design for client digital products, translating
                  business goals into user flows, wireframes, and high-fidelity
                  prototypes in Figma.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Conduct user research and usability testing to inform design
                  decisions, delivering measurable improvements in task
                  completion and user satisfaction.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  COOP Trainee, Internship
                </h3>
                <p className="text-sm text-muted-foreground">ELM Company</p>
              </div>
              <span className="text-sm whitespace-nowrap text-muted-foreground">
                Aug 2024 – Apr 2025
              </span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Redesigned Elm Company&apos;s UI/UX using Figma and Spline,
                  creating a modern, interactive interface with improved
                  navigation and usability.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Produced a motion graphic video for Elm Company, showcasing
                  products, work culture, and challenges through engaging
                  storytelling and animation.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Led the full UI/UX design of Elm&apos;s product
                  &quot;OSTOUL&quot;, from research and wireframes to
                  interactive prototypes, emphasizing user-centric design.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-foreground">•</span>
                <span>
                  Designed an AI application, simplifying human–AI interaction
                  with intuitive flows and clean interface design.
                </span>
              </li>
            </ul>
          </div>
        </PanelContent>
      </Panel>

      {/* Graduation Project */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Graduation Projects</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-0.5 text-foreground">•</span>
              <span>
                Collage presentation providing market analysis to a local
                company in order to expand to a foreign market — &quot;Coffee
                Address&quot;.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-foreground">•</span>
              <span>
                Developed a UI/UX design concept for Elm Company&apos;s website
                as part of the Graduation Project.
              </span>
            </li>
            <li className="ml-4 flex gap-2">
              <span className="mt-0.5 text-foreground">–</span>
              <span>
                Applied user-centered design and design thinking principles to
                improve usability, navigation, and visual appeal.
              </span>
            </li>
            <li className="ml-4 flex gap-2">
              <span className="mt-0.5 text-foreground">–</span>
              <span>
                Created interactive prototypes and wireframes to showcase
                solutions for a real-world digital platform.
              </span>
            </li>
          </ul>
        </PanelContent>
      </Panel>

      {/* Skills */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Skills and Tools</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">UI Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["Visual Design", "UI Design", "Interaction Design"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">UX Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "User-Centered Design",
                "UX Research",
                "Wireframing",
                "Design Systems",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Figma",
                "Git & GitHub",
                "Cursor / VS Code",
                "Adobe Creative Cloud",
              ].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React.js",
                "Tailwind CSS",
                "Motion",
                "HTML5",
                "CSS3",
                "JavaScript ES6+",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </PanelContent>
      </Panel>

      {/* Certifications */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Certifications</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Front-End Developer Professional Certificate",
                issuer: "Meta",
              },
              { title: "Graphic Design Diploma", issuer: "" },
              { title: "UI/UX Certification", issuer: "Tuwaiq Academy" },
              { title: "UX Design Professional Certificate", issuer: "Google" },
              { title: "Adobe Creative Cloud – Professional", issuer: "" },
              { title: "Full Stack Web Development Bootcamp", issuer: "" },
            ].map((cert) => (
              <div key={cert.title} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-foreground">✓</span>
                <span className="text-muted-foreground">
                  {cert.title}
                  {cert.issuer && (
                    <span className="text-foreground/60"> — {cert.issuer}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </PanelContent>
      </Panel>

      {/* Languages */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Languages</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 font-semibold">Arabic</h3>
              <p className="text-sm text-muted-foreground">Native Language</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold">English</h3>
              <p className="text-sm text-muted-foreground">
                Professional Working Proficiency
              </p>
            </div>
          </div>
        </PanelContent>
      </Panel>
    </div>
  );
}
