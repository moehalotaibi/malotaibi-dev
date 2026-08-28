import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/motion/motion-reveal";
import CaseSection from "@/components/work/case-section";
import ReadingProgress from "@/components/work/reading-progress";
import ShotFrame from "@/components/shot-frame";
import { nyx } from "@/lib/nyx";
import { ACCENT_HEX } from "@/lib/accents";

// NYX detail page — mirrors the case-study template with side-project
// changes: a Status meta cell instead of Duration, no external link, and
// the HUD shot framed at the top of the read.

const ACCENT = "amber" as const;

export const metadata: Metadata = {
  title: nyx.title,
  description: nyx.description,
  alternates: { canonical: "/projects/nyx" },
};

// Server page (metadata) — interactivity lives in the imported client
// motion primitives.
export default function NyxPage() {
  return (
    <>
      <ReadingProgress colorHex={ACCENT_HEX[ACCENT]} />

      {/* Hero */}
      <section className="shell pb-16 pt-24 md:pt-28">
        <MotionReveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">{nyx.tag}</span>
          </div>
        </MotionReveal>

        <MotionReveal delay={80}>
          <h1 className="mt-8 max-w-[28ch] font-display text-h1 font-semibold text-cream">
            {nyx.headline}
          </h1>
        </MotionReveal>

        <MotionReveal delay={140} y={12}>
          <p className="mt-6 max-w-[52ch] text-lead text-paper-mid">
            {nyx.description}
          </p>
        </MotionReveal>

        {/* Meta strip */}
        <MotionReveal delay={200} y={10}>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 md:grid-cols-3">
            <div>
              <span className="label block">Role</span>
              <span className="mt-1 block text-meta text-paper">
                {nyx.meta.role}
              </span>
            </div>
            <div>
              <span className="label block">Platform</span>
              <span className="mt-1 block text-meta text-paper">
                {nyx.meta.platform}
              </span>
            </div>
            <div>
              <span className="label block">Status</span>
              <span className="mt-1 block text-meta text-paper">
                {nyx.meta.status}
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* The HUD */}
        <MotionReveal delay={320} y={14}>
          <div className="mt-14">
            <ShotFrame
              ratio="wide"
              title={nyx.hud.alt}
              image={nyx.hud.src}
              imageAlt={nyx.hud.alt}
            />
          </div>
        </MotionReveal>
      </section>

      {/* Sections — same editorial two-column shells as the case studies. */}
      {nyx.sections.map((section, sectionIndex) => (
        <CaseSection
          key={section.id}
          section={section}
          index={sectionIndex}
          accent={ACCENT}
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
