import type { Metadata } from "next";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import CaseStudyCard from "@/components/work/case-study-card";
import { caseStudies, workIntro } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "End-to-end UX and product design work — from research to shipped product.",
};

// Server page (metadata) — interactivity lives in the client cards.
export default function CaseStudiesPage() {
  return (
    <>
      {/* Title */}
      <section className="shell pb-12 pt-24 md:pt-28">
        <MotionReveal>
          <SectionHeader as="h1" size="lg" title="Case Studies" badge="list" />
        </MotionReveal>
        <MotionReveal delay={80} y={12}>
          <p className="mt-8 max-w-[48ch] text-lead text-paper-mid">
            {workIntro}
          </p>
        </MotionReveal>
      </section>

      {/* Cards */}
      <section className="shell pb-section" aria-label="Case studies">
        <StaggerGroup className="space-y-6" stagger={0.08}>
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
