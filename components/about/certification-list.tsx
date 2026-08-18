"use client";

// Certifications — a two-column (md+) list of hairline rows that stagger in;
// each row's content slides 3px on hover. Titles link out when a credential
// URL exists. Static under reduced motion (StaggerGroup/Item render plain
// tags; the hover slide is disabled).

import { motion, useReducedMotion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { certifications } from "@/lib/content";

export default function CertificationList() {
  const reduced = useReducedMotion();

  return (
    <StaggerGroup as="ul" className="mt-2 grid md:grid-cols-2 md:gap-x-10">
      {certifications.map((cert) => (
        <StaggerItem as="li" key={cert.title}>
          <motion.div
            className="flex items-baseline justify-between gap-4 border-t border-rule py-4"
            whileHover={reduced ? undefined : { x: 3 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            {cert.href ? (
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-meta font-medium text-paper underline-offset-4 hover:underline"
              >
                {cert.title}
              </a>
            ) : (
              <span className="text-meta font-medium text-paper">
                {cert.title}
              </span>
            )}
            <span className="label shrink-0 text-right">
              {cert.issuer} · {cert.year}
            </span>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
