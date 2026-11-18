import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/motion/motion-reveal";
import ProjectStatus from "@/components/project-status";
import ShotFrame from "@/components/shot-frame";
import CaseSection from "@/components/work/case-section";
import ReadingProgress from "@/components/work/reading-progress";
import VisitPill from "@/components/work/visit-pill";
import { projects } from "@/lib/content";
import type { CaseSection as CaseSectionData } from "@/lib/case-studies";
import { projectShots } from "@/lib/project-shots";
import { ACCENT_HEX, accentText } from "@/lib/accents";

// Project page — one per UX project that is not a case study (those link to
// /case-studies/[slug]; NYX keeps its own page beside this folder). Same
// template as the case studies, shorter: the project's own description from
// lib/content.ts, its cover, then a few full-page screens that open in the
// lightbox. All copy is the project's existing bullets, nothing new.

type Params = Promise<{ slug: string }>;

const pages = projects.filter((project) => project.slug);

export function generateStaticParams() {
  return pages.map((project) => ({ slug: project.slug as string }));
}

// Only the slugs above exist; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = pages.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.bullets[0],
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = pages.find((p) => p.slug === slug);
  if (!project) notFound();

  const [lead, ...rest] = project.bullets;
  const shots = projectShots[slug] ?? [];

  const sections: CaseSectionData[] = [];
  if (rest.length > 0) {
    sections.push({
      id: "overview",
      kicker: "Overview",
      title: "What it is",
      blocks: [{ type: "prose", paragraphs: rest }],
    });
  }
  if (shots.length > 0) {
    sections.push({
      id: "screens",
      kicker: "Screens",
      title: "A closer look",
      intro: "Each one opens full size. Long pages scroll.",
      blocks: [{ type: "figures", images: shots }],
    });
  }

  return (
    <>
      <ReadingProgress colorHex={ACCENT_HEX[project.accent]} />
      {project.href ? (
        <VisitPill
          href={project.href}
          title={project.title}
          accent={project.accent}
        />
      ) : null}

      {/* Hero */}
      <section className="shell pb-16 pt-24 md:pt-28">
        <MotionReveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">{project.category}</span>
          </div>
        </MotionReveal>

        <MotionReveal delay={80}>
          <h1 className="mt-8 max-w-[28ch] font-display text-h1 font-semibold text-cream">
            {project.title}
          </h1>
        </MotionReveal>

        <MotionReveal delay={140} y={12}>
          <p className="mt-6 max-w-[60ch] text-lead text-paper-mid">{lead}</p>
        </MotionReveal>

        {/* Meta strip */}
        <MotionReveal delay={200} y={10}>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 md:grid-cols-4">
            <div>
              <span className="label block">Type</span>
              <span className="mt-1 block text-meta text-paper">
                {project.category}
              </span>
            </div>
            <div>
              <span className="label block">Status</span>
              <ProjectStatus status={project.year} className="mt-1.5" />
            </div>
            <div>
              <span className="label block">Tools</span>
              <span className="mt-1 block text-meta text-paper">
                {project.stack}
              </span>
            </div>
            {project.href ? (
              <div>
                <span className="label block">Link</span>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`-mb-2.5 -mt-1.5 inline-block py-2.5 text-meta ${accentText[project.accent]} transition-opacity hover:opacity-75`}
                >
                  Visit &rarr;
                </a>
              </div>
            ) : null}
          </div>
        </MotionReveal>

        {/* Cover */}
        {project.image ? (
          <MotionReveal delay={260} y={14}>
            <div className="mt-14">
              <ShotFrame
                title={project.title}
                image={project.image}
                imageAlt={project.imageAlt}
                sizes="(min-width: 1200px) 1104px, calc(100vw - 2.5rem)"
              />
            </div>
          </MotionReveal>
        ) : null}
      </section>

      {/* Sections — the case studies' editorial shell. */}
      {sections.map((section, sectionIndex) => (
        <CaseSection
          key={section.id}
          section={section}
          index={sectionIndex}
          accent={project.accent}
        />
      ))}

      {/* CTA */}
      <section className="shell pb-section">
        <MotionReveal>
          <div className="card px-6 py-14 text-center md:py-20">
            <h2 className="font-display text-h2 font-semibold text-cream">
              Want to go deeper?
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-body text-paper-mid">
              Get in touch for the full walkthrough, or browse the rest of the
              work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="pill pill-solid">
                Let&apos;s Talk
              </Link>
              <Link href="/projects" className="pill">
                All projects
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
