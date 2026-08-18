"use client";

// A `.tag` chip with a small hover pop. Shared by the timeline and toolkit
// sections. Static under reduced motion.

import { motion, useReducedMotion } from "motion/react";

export default function TagChip({ label }: { label: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className="tag">{label}</span>;
  }

  return (
    <motion.span
      className="tag"
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      {label}
    </motion.span>
  );
}
