import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import CountUp from "@/components/motion/count-up";
import SectionHeader from "@/components/section-header";
import ShotFrame from "@/components/shot-frame";
import BeforeAfter from "@/components/work/before-after";
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
  return { title: study.title, description: study.description };
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
                  className={`mt-1 inline-block text-meta ${accentText[study.accent]} transition-opacity hover:opacity-75`}
                >
                  Visit &rarr;
                </a>
              </div>
            ) : null}
          </div>
        </MotionReveal>
      </section>

      {/* Sections */}
      {detail.sections.map((section, sectionIndex) => (
        <section
          key={section.id}
          className="shell pb-section"
          aria-labelledby={section.id}
        >
          <MotionReveal>
            <div>
              {section.kicker ? (
                <p className="label mb-4">{section.kicker}</p>
              ) : null}
              <SectionHeader
                id={section.id}
                title={section.title}
                accent={sectionIndex === 0 ? study.accent : "cream"}
              />
            </div>
          </MotionReveal>

          {section.intro ? (
            <MotionReveal delay={60} y={12}>
              <p className="max-w-[52ch] text-body text-paper-mid">
                {section.intro}
              </p>
            </MotionReveal>
          ) : null}

          {section.items ? (
            <StaggerGroup
              className={`mt-8 grid gap-4 ${
                section.items.length === 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2"
              }`}
              stagger={0.08}
            >
              {section.items.map((item, itemIndex) => (
                <StaggerItem key={item.title}>
                  <div className="card h-full p-6">
                    {section.numbered ? (
                      <span className="label mb-3 block">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    ) : null}
                    <h3
                      className={`text-meta font-medium ${accentText[item.accent ?? study.accent]}`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-meta text-paper-mid">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {section.images ? (
            <StaggerGroup
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.1}
            >
              {section.images.map((img) => (
                <StaggerItem
                  key={img.src}
                  className={
                    img.ratio === "wide" || img.ratio === "video"
                      ? "sm:col-span-2 lg:col-span-3"
                      : undefined
                  }
                >
                  <ShotFrame
                    ratio={img.ratio ?? "phone"}
                    title={img.alt}
                    image={img.src}
                    imageAlt={img.alt}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {section.beforeAfter ? (
            <MotionReveal className="mt-10" y={14}>
              <BeforeAfter
                before={section.beforeAfter.before}
                after={section.beforeAfter.after}
              />
              <p className="label mt-4 text-center">{"// drag to compare"}</p>
            </MotionReveal>
          ) : null}
        </section>
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
