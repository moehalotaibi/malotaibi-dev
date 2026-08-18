import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/motion/motion-reveal";
import CountUp from "@/components/motion/count-up";
import CaseSection from "@/components/work/case-section";
import ReadingProgress from "@/components/work/reading-progress";
import { caseStudies } from "@/lib/content";
import { getCaseStudyDetail } from "@/lib/case-studies";
import { ACCENT_HEX, accentText } from "@/lib/accents";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

// Server page (metadata + static params) — interactivity lives in the
// imported client motion primitives.
export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  const detail = getCaseStudyDetail(slug);
  if (!study || !detail) notFound();

  return (
    <>
      <ReadingProgress colorHex={ACCENT_HEX[study.accent]} />

      {/* Hero */}
      <section className="shell pb-16 pt-24 md:pt-28">
        <MotionReveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">{study.tag}</span>
          </div>
        </MotionReveal>

        <MotionReveal delay={80}>
          <h1 className="mt-8 max-w-[28ch] font-display text-h1 font-semibold text-cream">
            {detail.headline}
          </h1>
        </MotionReveal>

        <MotionReveal delay={140} y={12}>
          <p className="mt-6 max-w-[52ch] text-lead text-paper-mid">
            {study.description}
          </p>
        </MotionReveal>

        {/* Stats */}
        <MotionReveal delay={200} y={12}>
          <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8">
            <div>
              <CountUp
                value={study.heroStat.value}
                className={`block font-mono text-h1 font-bold tabular-nums ${accentText[study.accent]}`}
              />
              <span className="label mt-2 block">{study.heroStat.label}</span>
            </div>
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block font-mono text-h3 font-bold tabular-nums text-cream"
                />
                <span className="label mt-2 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </MotionReveal>

        {/* Meta strip */}
        <MotionReveal delay={260} y={10}>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 md:grid-cols-4">
            <div>
              <span className="label block">Role</span>
              <span className="mt-1 block text-meta text-paper">
                {study.meta.role}
              </span>
            </div>
            <div>
              <span className="label block">Platform</span>
              <span className="mt-1 block text-meta text-paper">
                {study.meta.platform}
              </span>
            </div>
            <div>
              <span className="label block">Duration</span>
              <span className="mt-1 block text-meta text-paper">
                {study.meta.duration}
              </span>
            </div>
            {study.link ? (
              <div>
                <span className="label block">Link</span>
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`-mt-1.5 -mb-2.5 inline-block py-2.5 text-meta ${accentText[study.accent]} transition-opacity hover:opacity-75`}
                >
                  Visit &rarr;
                </a>
              </div>
            ) : null}
          </div>
        </MotionReveal>
      </section>

      {/* Sections — editorial two-column shells, treatment inferred from
          the data shape (quotes / numbered steps / feature rows). */}
      {detail.sections.map((section, sectionIndex) => (
        <CaseSection
          key={section.id}
          section={section}
          index={sectionIndex}
          accent={study.accent}
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
              <Link href="/case-studies" className="pill">
                All case studies
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
