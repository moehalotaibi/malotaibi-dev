"use client";

// "I can help you with" grid — cells stagger in; each cell's top rule grows
// in (scaleX 0 → 1, origin left) alongside its cell. The rule span nests
// inside StaggerItem, so it inherits the item's staggered delay via variant
// propagation. Static (plain border-t) under reduced motion.

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { capabilities } from "@/lib/content";

const GRID_CLASS = "mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4";

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
};

function CellBody({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="pt-5">
      <span className="label">{index}</span>
      <h3 className="mt-3 text-h3 font-display font-medium text-cream">
        {title}
      </h3>
      <p className="mt-3 text-meta text-paper-mid">{body}</p>
    </div>
  );
}

export default function CapabilityGrid() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={GRID_CLASS}>
        {capabilities.map((cap) => (
          <div key={cap.index} className="border-t border-rule-strong">
            <CellBody index={cap.index} title={cap.title} body={cap.body} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <StaggerGroup className={GRID_CLASS}>
      {capabilities.map((cap) => (
        <StaggerItem key={cap.index}>
          <motion.span
            aria-hidden="true"
            className="block h-px w-full origin-left bg-rule-strong"
            variants={ruleVariants}
          />
          <CellBody index={cap.index} title={cap.title} body={cap.body} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
