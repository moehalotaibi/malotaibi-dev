import type { Metadata } from "next";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import ProjectRow from "@/components/project-row";
import { projects, projectsIntro, sideProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "UX Projects",
  description:
    "Featured UX design work — brand identity, product design, and live platforms.",
  alternates: { canonical: "/projects" },
};

// Server page (metadata) — interactivity lives in the client rows.
export default function ProjectsPage() {
  return (
    <>
      {/* Title */}
      <section className="shell pb-12 pt-24 md:pt-28">
        <MotionReveal>
          <SectionHeader
            as="h1"
            size="lg"
            title="UX Projects"
            badge="briefcase"
          />
        </MotionReveal>
        <MotionReveal delay={80} y={12}>
          <p className="mt-8 max-w-[48ch] text-lead text-paper-mid">
            {projectsIntro}
          </p>
        </MotionReveal>
      </section>

      {/* Projects */}
      <section className="shell pb-section" aria-label="UX projects">
        <StaggerGroup className="space-y-6" stagger={0.12}>
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <ProjectRow project={project} flipped={i % 2 === 1} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Side project */}
      <section className="shell pb-section" aria-labelledby="side-project">
        <MotionReveal>
          <SectionHeader id="side-project" title="Side Project" badge="zap" />
        </MotionReveal>
        <StaggerGroup className="space-y-6" stagger={0.12}>
          {sideProjects.map((project, i) => (
            <StaggerItem key={project.title}>
              <ProjectRow
                project={project}
                flipped={(projects.length + i) % 2 === 1}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
