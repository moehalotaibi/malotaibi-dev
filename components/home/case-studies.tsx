"use client";

// Case studies — staggered rows (row internals live in CaseStudyRow,
// owned elsewhere) + magnetic all-studies pill.

import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import CaseStudyRow from "@/components/case-study-row";
import { caseStudies } from "@/lib/content";
import { PillLink } from "./motion-kit";

export default function CaseStudiesSection() {
  return (
    <section className="shell pb-section" aria-labelledby="case-studies">
      <MotionReveal>
        <SectionHeader id="case-studies" title="Case studies" badge="list" />
      </MotionReveal>
      <StaggerGroup className="border-b border-rule">
        {caseStudies.map((study) => (
          <StaggerItem key={study.slug}>
            <CaseStudyRow study={study} />
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
