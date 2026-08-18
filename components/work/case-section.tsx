// Editorial section renderer for the case-study detail template.
// Server-compatible — interactivity lives in the imported client motion
// primitives (MotionReveal, StaggerGroup/Item) and BeforeAfter.
//
// Every section shares a two-column shell: a sticky left rail (ghost
// number, kicker, accent rule) and a reading column. The item treatment
// is inferred from the data shape — quotes, numbered steps, or de-boxed
// feature rows — no data changes required.

import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import ShotFrame from "@/components/shot-frame";
import BeforeAfter from "@/components/work/before-after";
import type { CaseSection as CaseSectionData } from "@/lib/case-studies";
import type { Accent } from "@/lib/content";
import { accentBg, accentBorder, accentText } from "@/lib/accents";

type Props = {
  section: CaseSectionData;
  /** Zero-based position within the study — drives the ghost number. */
  index: number;
  /** The study accent — rails, quotes, step indexes, fallback dots. */
  accent: Accent;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Sections whose item titles are quotations (curly or straight). */
const QUOTE_START = /^[“”‘’"']/;

export default function CaseSection({ section, index, accent }: Props) {
  const number = pad(index + 1);
  const isQuoteSection =
    !!section.items?.length &&
    section.items.every((item) => QUOTE_START.test(item.title));

  return (
    <section
      className={`shell pb-section ${
        index > 0 ? "border-t border-rule pt-14" : ""
      }`}
      aria-labelledby={section.id}
    >
      <div className="grid gap-4 lg:grid-cols-[200px_1fr] lg:gap-10">
        {/* Left rail — sticky furniture on lg, one inline row on mobile */}
        <MotionReveal className="self-start lg:sticky lg:top-28">
          <div className="flex items-center gap-3 lg:hidden">
            <span
              className="font-mono text-meta font-bold tabular-nums text-paper-dim"
              aria-hidden="true"
            >
              {number}
            </span>
            {section.kicker ? (
              <span className="label">{section.kicker}</span>
            ) : null}
          </div>
          <div className="hidden lg:block">
            <span
              className="block font-display text-[4rem] font-bold leading-none text-rule-strong"
              aria-hidden="true"
            >
              {number}
            </span>
            {section.kicker ? (
              <p className="label mt-4">{section.kicker}</p>
            ) : null}
            <span
              className={`mt-5 block h-px w-10 ${accentBg[accent]}`}
              aria-hidden="true"
            />
          </div>
        </MotionReveal>

        {/* Reading column */}
        <div className="min-w-0">
          <MotionReveal>
            <h2
              id={section.id}
              className={`font-display text-h2 font-semibold ${
                index === 0 ? accentText[accent] : "text-cream"
              }`}
            >
              {section.title}
            </h2>
          </MotionReveal>

          {section.intro ? (
            <MotionReveal delay={60} y={12}>
              <p className="mt-5 max-w-[58ch] text-lead leading-relaxed text-paper-mid">
                {section.intro}
              </p>
            </MotionReveal>
          ) : null}

          {section.items && isQuoteSection ? (
            // Pull-quotes — accent spine, no boxes
            <StaggerGroup
              className="mt-10 grid gap-y-10 lg:grid-cols-2 lg:gap-x-12"
              stagger={0.08}
            >
              {section.items.map((item) => (
                <StaggerItem key={item.title}>
                  <figure className={`border-s-2 ps-6 ${accentBorder[accent]}`}>
                    <blockquote className="text-lead font-medium leading-snug text-paper">
                      {item.title}
                    </blockquote>
                    <figcaption className="mt-3 text-meta text-paper-mid">
                      {item.body}
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {section.items && !isQuoteSection && section.numbered ? (
            // Numbered walkthrough — divided rows, accent indexes
            <StaggerGroup className="mt-6 divide-y divide-rule" stagger={0.08}>
              {section.items.map((item, itemIndex) => (
                <StaggerItem key={item.title}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span
                      className={`font-mono text-h3 font-bold tabular-nums ${accentText[accent]}`}
                    >
                      {pad(itemIndex + 1)}
                    </span>
                    <div>
                      <h3 className="text-body font-semibold text-cream">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-[64ch] text-meta text-paper-mid">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {section.items && !isQuoteSection && !section.numbered ? (
            // De-boxed feature rows — hairline top, accent dot
            <StaggerGroup
              className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2"
              stagger={0.08}
            >
              {section.items.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="border-t border-rule pt-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentBg[item.accent ?? accent]}`}
                        aria-hidden="true"
                      />
                      <h3 className="text-body font-medium text-cream">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-meta text-paper-mid">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {section.images ? (
            <StaggerGroup
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
        </div>
      </div>
    </section>
  );
}
