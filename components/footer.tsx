"use client";

import Link from "next/link";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import Segments from "@/components/segments";
import { footerContent, nav, site, socials } from "@/lib/content";
import type { Social } from "@/lib/content";
import { accentText } from "@/lib/accents";
import { Brand, UI } from "@/components/icons";
import MotionReveal from "@/components/motion/motion-reveal";

const MotionLink = motion.create(Link);

const SPRING = { type: "spring", stiffness: 320, damping: 26 } as const;

/** CTA arrow circle: rests at 0, slides right while the row is hovered. */
const ARROW_VARIANTS = {
  rest: { x: 0 },
  hover: { x: 4 },
} as const;

/** Explore / contact rows: slight x-slide on hover. */
function FooterLinkRow({
  href,
  label,
  reduced,
}: {
  href: string;
  label: string;
  reduced: boolean;
}) {
  const props = {
    className:
      "inline-flex items-center text-meta text-paper-mid transition-colors hover:text-paper max-lg:min-h-[40px]",
    ...(reduced ? {} : { whileHover: { x: 3 }, whileTap: { scale: 0.97 } }),
    transition: SPRING,
  };

  return href.startsWith("/") ? (
    <MotionLink href={href} {...props}>
      {label}
    </MotionLink>
  ) : (
    <motion.a href={href} {...props}>
      {label}
    </motion.a>
  );
}

/** Social row: the icon circle spins a full turn once per hover. */
function SocialRow({ item, reduced }: { item: Social; reduced: boolean }) {
  const controls = useAnimationControls();

  const spin = () => {
    if (reduced) return;
    void controls
      .start({
        rotate: 360,
        transition: { type: "spring", stiffness: 260, damping: 30 },
      })
      .then(() => controls.set({ rotate: 0 }));
  };

  return (
    <motion.a
      href={item.href}
      className="flex items-center gap-2.5 text-meta text-paper-mid transition-colors hover:text-paper max-lg:min-h-[40px]"
      onHoverStart={spin}
      {...(reduced ? {} : { whileTap: { scale: 0.97 } })}
    >
      <motion.span
        animate={controls}
        className="grid h-6 w-6 place-items-center rounded-full border border-rule"
      >
        <Brand slug={item.icon} className="h-3 w-3" />
      </motion.span>
      {item.label}
    </motion.a>
  );
}

/** CTA row: arrow circle slides x+4 (motion spring) and fills cream (CSS). */
function CtaRow({
  cta,
  reduced,
}: {
  cta: (typeof footerContent.ctas)[number];
  reduced: boolean;
}) {
  const rowProps = reduced
    ? {}
    : ({
        initial: "rest",
        whileHover: "hover",
        whileTap: { scale: 0.98 },
      } as const);

  const inner = (
    <>
      <span>
        <span className="block font-display text-meta font-semibold text-paper">
          {cta.label}
        </span>
        <span className="label mt-0.5 block normal-case tracking-normal">
          {cta.sub}
        </span>
      </span>
      <motion.span
        variants={reduced ? undefined : ARROW_VARIANTS}
        transition={SPRING}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule-strong text-paper transition-colors group-hover:bg-cream group-hover:text-ink"
      >
        <UI name="arrow-right" className="h-4 w-4" />
      </motion.span>
    </>
  );

  const className = "group flex items-center justify-between gap-4";

  return cta.href.startsWith("/") ? (
    <MotionLink href={cta.href} className={className} {...rowProps}>
      {inner}
    </MotionLink>
  ) : (
    <motion.a href={cta.href} className={className} {...rowProps}>
      {inner}
    </motion.a>
  );
}

export default function Footer() {
  const reduced = useReducedMotion() ?? false;

  return (
    <footer className="mt-section">
      <div className="shell">
        <MotionReveal className="card grid grid-cols-1 gap-10 p-8 sm:grid-cols-2 md:p-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Slogan */}
          <p className="max-w-[16ch] font-display text-h3 font-medium leading-snug">
            <Segments segments={footerContent.slogan} />
          </p>

          {/* Explore */}
          <nav aria-label="Footer">
            <p
              className={`label pb-4 ${accentText[footerContent.exploreHeading.accent]}`}
            >
              {footerContent.exploreHeading.text}
            </p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <FooterLinkRow
                    href={item.href}
                    label={item.label}
                    reduced={reduced}
                  />
                </li>
              ))}
              <li>
                <FooterLinkRow
                  href="/contact"
                  label="Contact"
                  reduced={reduced}
                />
              </li>
            </ul>
          </nav>

          {/* Follow */}
          <div>
            <p
              className={`label pb-4 ${accentText[footerContent.followHeading.accent]}`}
            >
              {footerContent.followHeading.text}
            </p>
            <ul className="space-y-2.5">
              {socials.map((item) => (
                <li key={item.label}>
                  <SocialRow item={item} reduced={reduced} />
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-6">
            {footerContent.ctas.map((cta) => (
              <CtaRow key={cta.label} cta={cta} reduced={reduced} />
            ))}
          </div>
        </MotionReveal>
      </div>

      {/* Signature: the wordmark set enormous and cropped by the viewport edge. */}
      <div className="overflow-hidden" aria-hidden="true">
        <p className="-mb-[0.22em] select-none whitespace-nowrap text-center font-wordmark text-[clamp(7rem,32vw,28rem)] leading-none tracking-tight text-cream">
          {Array.from(site.name).map((letter, i) =>
            reduced ? (
              <span key={i} className="inline-block">
                {letter}
              </span>
            ) : (
              <motion.span
                key={i}
                className="inline-block"
                whileHover={{ y: -12 }}
                transition={SPRING}
              >
                {letter}
              </motion.span>
            ),
          )}
        </p>
      </div>

      <div className="border-t border-rule">
        {/* lg:pb-16 clears the fixed layers-breadcrumb chip (lg+ only). */}
        <div className="shell flex items-center justify-between py-4 lg:pb-16">
          <p className="label">
            {site.fullName} © {new Date().getFullYear()}
          </p>
          <p className="label">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
