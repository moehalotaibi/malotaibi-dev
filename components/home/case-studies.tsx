"use client";

// Case studies — a stack of cards, one per study, in the same anatomy as
// the profile card at the top of the page. Card internals live in
// CaseStudyItem. Sits under UX Projects (Moe's order, 2026-11-18).
// Magnetic all-studies pill below.

import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import CaseStudyItem from "@/components/case-study-item";
import { caseStudies } from "@/lib/content";
import { PillLink } from "./motion-kit";

export default function CaseStudiesSection() {
  return (
    <section className="shell pb-section" aria-labelledby="case-studies">
      <MotionReveal>
        <SectionHeader id="case-studies" title="Case Studies" badge="list" />
      </MotionReveal>
      {/* relative + page background: the decorative spine passes behind the
          whole stack instead of showing as dashes in the gaps. */}
      <StaggerGroup className="relative space-y-3 bg-ink" stagger={0.07}>
        {caseStudies.map((study, i) => (
          <StaggerItem key={study.slug}>
            <CaseStudyItem study={study} index={i + 1} />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <MotionReveal delay={160}>
        <div className="mt-10 text-center">
          <PillLink href="/case-studies">All case studies</PillLink>
        </div>
      </MotionReveal>
    </section>
  );
}
