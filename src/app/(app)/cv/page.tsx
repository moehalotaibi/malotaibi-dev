import { FileTextIcon, MailIcon, PhoneIcon, GithubIcon, LinkedinIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "CV",
  description: "Mohammed Alotaibi - Front-End Developer & UX Designer Resume",
};

export default function CVPage() {
  return (
    <div className="mx-auto md:max-w-3xl space-y-8 pb-8">
      {/* Header */}
      <div className="border-x border-edge bg-background px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Mohammed Alotaibi</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a href="tel:+966553012825" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <PhoneIcon className="size-4" />
            +966 553 012 825
          </a>
          <a href="mailto:moe.halotaibi@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <MailIcon className="size-4" />
            moe.halotaibi@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/mohammed-alotaibi-1aa047311/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
          <a href="https://github.com/moehalotaibi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="https://drive.google.com/file/d/1jNPdiKi3FL-9der4YIIz8viogeFH8OFr/view?usp=sharing"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
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
          <p className="text-muted-foreground leading-relaxed">
            Front-End Developer and UX Designer with hands-on experience in designing and building user-centered digital interfaces. Strong ability to translate UX research, wireframes, and prototypes into responsive and accessible front-end experiences. Experienced in working on enterprise and government digital platforms, with a solid foundation in design thinking, usability, and modern UI development.
          </p>
        </PanelContent>
      </Panel>

      {/* Education */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Education</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-lg">Imam Mohammed Ibn Saud University</h3>
                <p className="text-muted-foreground">Bachelor of Marketing and Communication</p>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Aug 2021 – Nov 2024
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-lg">Full Stack Web Development Bootcamp</h3>
                <p className="text-muted-foreground">2025</p>
              </div>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>HTML, CSS, JavaScript</li>
              <li>Responsive Web Design</li>
              <li>UI Implementation from Design</li>
              <li>Project-Based Learning</li>
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
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-lg">COOP Trainee, Internship</h3>
                <p className="text-muted-foreground">ELM Company</p>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Aug 2024 – Apr 2025
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>Redesigned Elm Company's UI/UX using Figma and Spline, creating a modern, interactive interface with improved navigation and usability.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>Designed a landing page for the Ministry of Human Resources and Social Development, focusing on accessibility, clarity, and user-friendly layouts.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>Produced a motion graphic video for Elm Company, showcasing products, work culture, and challenges through engaging storytelling and animation.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>Led the full UI/UX design of Elm's product "OSTOUL", from research and wireframes to interactive prototypes, emphasizing user-centric design.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>Designed an AI application, simplifying human-AI interaction with intuitive flows and clean interface design.</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-lg">Freelancer</h3>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                Jul 2023 – Present
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Delivered professional logo designs for a variety of clients, such as the Business Services Company Agile Advice, the clothing brand and the AI startup "Rashid", and the startup business "ORO". Focused on translating each client's vision into a distinctive brand identity through creative concepts and modern design execution.
            </p>
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
              <span className="text-foreground">•</span>
              <span>Collage presentation provide market analysis to local company in order to expand to foreign market "coffee address"</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground">•</span>
              <span>Developed a UI/UX design concept for Elm Company's website as part of the Graduation Project.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground">•</span>
              <span>Applied user-centered design and design thinking principles to improve usability, navigation, and visual appeal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground">•</span>
              <span>Created interactive prototypes and wireframes to showcase solutions for a real-world digital platform.</span>
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
            <h3 className="font-semibold mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "JavaScript", "HTML", "CSS", "Motion"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-muted text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">UX Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["User-Centered Design", "UX Research", "Wireframing", "Design Systems"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-muted text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {["Figma", "Cursor", "Obsidian", "Adobe Creative Cloud"].map((tool) => (
                <span key={tool} className="px-3 py-1 bg-muted text-sm rounded-full">
                  {tool}
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
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Introduction to Front-End Development",
              "Foundations of User Experience (UX) Design",
              "Graphic Design Diploma",
              "Adobe Creative Cloud",
              "UI/UX MasterClass",
              "Introduction to Blender"
            ].map((cert) => (
              <div key={cert} className="flex items-start gap-2 text-sm">
                <span className="text-foreground">✓</span>
                <span className="text-muted-foreground">{cert}</span>
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Arabic</h3>
              <p className="text-sm text-muted-foreground">Native Language</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">English</h3>
              <p className="text-sm text-muted-foreground">Professional Working Proficiency</p>
            </div>
          </div>
        </PanelContent>
      </Panel>
    </div>
  );
}

