"use client";

// Contact method cards — email / phone / location, styled like the home
// services cards (accent icon chip, title, value, underline sweep). Email
// and phone cards carry a full-card overlay link (mailto / tel) so the
// copy button can sit above it as a separate, keyboard-reachable control.
// Static under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import TiltCard from "@/components/motion/tilt-card";
import { UI } from "@/components/icons";
import { accentBg, accentBgSoft, accentText } from "@/lib/accents";
import type { Accent } from "@/lib/content";
import { contact, site } from "@/lib/content";
import { PhoneIcon } from "./contact-icons";
import CopyEmailButton from "./copy-email-button";

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

/** Card lifts slightly; the icon chip pops with it. */
const cardPop: Variants = {
  rest: { y: 0 },
  hover: { y: -4 },
};

const chipPop: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.12, rotate: -6 },
};

function MethodCard({
  accent,
  icon,
  title,
  value,
  overlay,
  action,
}: {
  accent: Accent;
  icon: React.ReactNode;
  title: string;
  value: string;
  /** Full-card link, rendered under the action control. */
  overlay?: { href: string; label: string };
  /** Extra control in the top-right slot (sits above the overlay). */
  action?: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <TiltCard className="h-full">
      <motion.div
        className="card group relative flex h-full flex-col p-6 transition-colors duration-300 hover:border-rule-strong"
        {...(reduced ? {} : { initial: "rest", whileHover: "hover" })}
        variants={reduced ? undefined : cardPop}
        transition={SPRING}
      >
        {overlay ? (
          <a
            href={overlay.href}
            aria-label={overlay.label}
            className="absolute inset-0 rounded-2xl"
          />
        ) : null}

        <div className="flex items-start justify-between gap-3">
          <motion.span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accentBgSoft[accent]} ${accentText[accent]}`}
            aria-hidden="true"
            variants={reduced ? undefined : chipPop}
            transition={SPRING}
          >
            {icon}
          </motion.span>
          {action}
        </div>

        <h3 className="mt-5 font-display text-h3 font-semibold text-cream">
          {title}
        </h3>
        <p className="mt-2 break-all text-meta text-paper-mid">{value}</p>

        <span className="mt-auto block pt-6" aria-hidden="true">
          <span
            className={`block h-px w-8 transition-all duration-500 ease-out group-hover:w-full ${accentBg[accent]}`}
          />
        </span>
      </motion.div>
    </TiltCard>
  );
}

export default function MethodCards({
  className = "grid gap-4 sm:grid-cols-3",
}: {
  /** Grid classes — the contact page's left rail stacks to one column. */
  className?: string;
}) {
  return (
    <StaggerGroup as="ul" className={className} stagger={0.08}>
      <StaggerItem as="li" className="h-full">
        <MethodCard
          accent="violet"
          icon={<UI name="mail" className="h-5 w-5" />}
          title={contact.methods.email}
          value={site.email}
          overlay={{ href: `mailto:${site.email}`, label: `Email ${site.email}` }}
          action={<CopyEmailButton />}
        />
      </StaggerItem>

      <StaggerItem as="li" className="h-full">
        <MethodCard
          accent="green"
          icon={<PhoneIcon className="h-5 w-5" />}
          title={contact.methods.phone}
          value={site.phone}
          overlay={{
            href: `tel:${site.phone.replace(/\s+/g, "")}`,
            label: `Call ${site.phone}`,
          }}
        />
      </StaggerItem>

      <StaggerItem as="li" className="h-full">
        <MethodCard
          accent="amber"
          icon={<UI name="globe" className="h-5 w-5" />}
          title={contact.methods.location}
          value={site.location}
        />
      </StaggerItem>
    </StaggerGroup>
  );
}
