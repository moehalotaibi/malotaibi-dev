import type { Metadata } from "next";
import MotionReveal from "@/components/motion/motion-reveal";
import TiltCard from "@/components/motion/tilt-card";
import SectionHeader from "@/components/section-header";
import ShotFrame from "@/components/shot-frame";
import Segments from "@/components/segments";
import AboutHero from "@/components/about/about-hero";
import CapabilityGrid from "@/components/about/capability-grid";
import Timeline from "@/components/about/timeline";
import ToolkitCards from "@/components/about/toolkit-cards";
import CertificationList from "@/components/about/certification-list";
import TestimonialCards from "@/components/about/testimonial-cards";
import ContactCta from "@/components/about/contact-cta";
import CvPill from "@/components/about/cv-pill";
import { about, education, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `${site.fullName} — ${site.role}. Based in ${site.location}.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell pt-24 md:pt-28 pb-16">
        <AboutHero />
      </section>

      {/* Portrait row */}
      <section className="shell pb-section">
        <div className="grid gap-10 md:grid-cols-[300px_1fr] items-start">
          <MotionReveal>
            <TiltCard max={5}>
              <ShotFrame
                ratio="square"
                title={site.name}
                image="/work/mohammed-avatar.jpg"
                imageAlt={site.fullName}
              />
            </TiltCard>
          </MotionReveal>

          <MotionReveal delay={80}>
            <span className="label inline-block border border-rule-strong px-3 py-1.5">
              {about.roleTag}
            </span>
            <p className="mt-6 max-w-[46ch] text-lead leading-snug md:text-h3">
              <Segments segments={about.headline} />
            </p>
            <p className="mt-5 max-w-[52ch] text-meta text-paper-mid">
              {about.note}
            </p>
            <p className="label mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="whitespace-nowrap">{site.email}</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">{site.phone}</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">{site.location}</span>
            </p>
            <div className="mt-6">
              <CvPill />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* I can help you with */}
      <section className="shell pb-section" aria-labelledby="help">
        <MotionReveal>
          <SectionHeader
            id="help"
            title="I can help you with."
            accent="violet"
            center
          />
        </MotionReveal>

        <CapabilityGrid />
      </section>

      {/* Where I've worked */}
      <section className="shell pb-section" aria-labelledby="worked">
        <MotionReveal>
          <SectionHeader
            id="worked"
            title="Where I've worked."
            accent="amber"
          />
        </MotionReveal>

        <Timeline />
      </section>

      {/* Education */}
      <section className="shell pb-section" aria-labelledby="education">
        <MotionReveal>
          <SectionHeader id="education" title="Education." accent="violet" />
        </MotionReveal>

        <Timeline entries={education} />
      </section>

      {/* My toolkit */}
      <section className="shell pb-section" aria-labelledby="toolkit">
        <MotionReveal>
          <SectionHeader id="toolkit" title="My toolkit." />
        </MotionReveal>

        <ToolkitCards />
      </section>

      {/* Certifications */}
      <section className="shell pb-section" aria-labelledby="certifications">
        <MotionReveal>
          <SectionHeader
            id="certifications"
            title="Certifications."
            accent="amber"
          />
        </MotionReveal>

        <CertificationList />
      </section>

      {/* Testimonials */}
      <section className="shell pb-section" aria-labelledby="testimonials">
        <MotionReveal>
          <SectionHeader
            id="testimonials"
            title="Testimonials."
            accent="cyan"
          />
        </MotionReveal>

        <TestimonialCards />
      </section>

      {/* Contact CTA */}
      <section className="shell pb-section flex justify-end">
        <MotionReveal>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <CvPill />
            <ContactCta />
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
