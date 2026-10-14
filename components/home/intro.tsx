"use client";

// Intro — one compact profile card instead of a two-column essay: a small
// portrait (tilts on hover), name, role line, the lead sentence, fact
// chips, and the magnetic About pill. The long bio lives on /about only.

import Image from "next/image";
import MotionReveal from "@/components/motion/motion-reveal";
import TiltCard from "@/components/motion/tilt-card";
import { intro, site } from "@/lib/content";
import { PillLink } from "./motion-kit";

export default function IntroSection() {
  return (
    <section className="shell pb-section pt-section" aria-label="About Mohammed">
      <MotionReveal>
        <div className="card flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
          {/* Portrait */}
          <TiltCard max={6} className="shrink-0 self-start md:self-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-rule bg-raised md:h-32 md:w-32">
              <Image
                src="/work/mohammed-avatar.jpg"
                alt={site.fullName}
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </div>
          </TiltCard>

          {/* Who */}
          <div className="min-w-0 flex-1">
            <p className="label">{"// about"}</p>
            <h2 className="mt-2 font-display text-h3 font-semibold text-cream">
              {site.fullName}
            </h2>
            <p className="label mt-1.5">
              <span className="text-accent-green">
                {intro.accentTitle.join(" · ")}
              </span>
              {` · ${site.location}`}
            </p>
            <p className="mt-4 max-w-[52ch] text-body text-paper-mid">
              {intro.lead}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="At a glance">
              {intro.chips.map((chip) => (
                <li key={chip} className="tag">
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          {/* Go deeper */}
          <div className="shrink-0 md:self-center">
            <PillLink href="/about">About Me</PillLink>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
