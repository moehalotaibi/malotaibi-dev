"use client";

// Intro — the profile card. Left: a small portrait (tilts on hover), the
// name set large, the role line, the lead sentence and two actions (About
// and the CV). Right: quick facts in a ruled column, so the card's right
// half carries information instead of one lonely button. The last fact
// lists his certificates, each with the issuer's small logo and a link to
// the certificate itself. The long bio lives on /about only.
//
// The portrait stays small on purpose (Moe: "my pic is so big" on an
// earlier version). The card is `relative` so the decorative spine passes
// behind it instead of drawing across it.

import Image from "next/image";
import MotionReveal from "@/components/motion/motion-reveal";
import TiltCard from "@/components/motion/tilt-card";
import CvPill from "@/components/about/cv-pill";
import { Brand } from "@/components/icons";
import { certifications, intro, roles, site } from "@/lib/content";
import { PillLink } from "./motion-kit";

// Every fact is read from the content it already lives in, so the card
// cannot drift from the About page.
const current = roles[0];
const facts = [
  { label: "Now", value: `${current.title}, ${current.org}` },
  { label: "Based in", value: site.location },
  { label: "Languages", value: intro.languages },
];

// Each named certificate, joined to its full record for the title and link.
const certified = intro.certified.map((entry) => ({
  ...entry,
  record: certifications.find((c) => c.issuer === entry.issuer),
}));

const ROW = "lg:border-t lg:border-rule lg:py-3.5";

export default function IntroSection() {
  return (
    <section className="shell pb-section pt-section" aria-label="About Mohammed">
      <MotionReveal>
        <div className="card relative grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-0">
          {/* Who */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-7 lg:pe-10">
            <TiltCard max={6} className="shrink-0 self-start">
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

            <div className="min-w-0">
              <p className="label">{"// about"}</p>
              <h2 className="mt-2 font-display text-h2 font-semibold text-cream">
                {site.fullName}
              </h2>
              <p className="label mt-2.5 text-accent-green">
                {intro.accentTitle.join(" · ")}
              </p>
              <p className="mt-5 max-w-[44ch] text-lead text-paper">
                {intro.lead}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PillLink href="/about">About Me</PillLink>
                <CvPill />
              </div>
            </div>
          </div>

          {/* Quick facts: two columns under the bio, one ruled column on lg */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 lg:grid-cols-1 lg:content-center lg:gap-y-0 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
            {facts.map((fact, i) => (
              <div key={fact.label} className={i > 0 ? ROW : "lg:pb-3.5"}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1.5 text-meta text-paper">{fact.value}</dd>
              </div>
            ))}

            {/* Certified: issuer logo + name, each linking to its certificate */}
            <div className={`col-span-2 lg:col-span-1 ${ROW} lg:pb-0`}>
              <dt className="label">Certified</dt>
              <dd className="mt-2.5">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:max-w-xs lg:max-w-none">
                  {certified.map((cert) => {
                    const mark =
                      "image" in cert ? (
                        <Image
                          src={cert.image}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-[5px]"
                        />
                      ) : (
                        <Brand slug={cert.brand} colored className="h-4 w-4" />
                      );
                    const inner = (
                      <>
                        <span className="grid h-5 w-5 shrink-0 place-items-center">
                          {mark}
                        </span>
                        {cert.label}
                      </>
                    );
                    const title = cert.record?.title ?? cert.label;
                    return (
                      <li key={cert.issuer}>
                        {cert.record?.href ? (
                          <a
                            href={cert.record.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={title}
                            aria-label={`${title}, ${cert.issuer}. Opens the certificate`}
                            className="inline-flex items-center gap-2 text-meta text-paper transition-opacity hover:opacity-70"
                          >
                            {inner}
                          </a>
                        ) : (
                          <span
                            title={title}
                            className="inline-flex items-center gap-2 text-meta text-paper"
                          >
                            {inner}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </MotionReveal>
    </section>
  );
}
