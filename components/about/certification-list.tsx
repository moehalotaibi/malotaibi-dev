"use client";

// Certifications — a two-column (md+) list of hairline rows that stagger in;
// each row's content slides 3px on hover. Titles link out when a credential
// URL exists. Entries that share a `group` (the Tuwaiq courses, the workshop
// certificates) fold into ONE row named after the group, placed where the
// first member sits and spanning both columns; it expands on click, so the
// list stays short and nothing is lost. Static under reduced motion
// (StaggerGroup/Item render plain tags; hover slide and expand animation
// are disabled).

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { certifications, type Certification } from "@/lib/content";

const SPRING = { type: "spring", stiffness: 340, damping: 28 } as const;

function CertRow({ cert, reduced }: { cert: Certification; reduced: boolean | null }) {
  return (
    <motion.div
      className="flex items-baseline justify-between gap-4 border-t border-rule py-4"
      whileHover={reduced ? undefined : { x: 3 }}
      transition={SPRING}
    >
      {cert.href ? (
        <a
          href={cert.href}
          target="_blank"
          rel="noopener noreferrer"
          className="-my-2.5 py-2.5 text-meta font-medium text-paper underline-offset-4 hover:underline"
        >
          {cert.title}
        </a>
      ) : (
        <span className="text-meta font-medium text-paper">{cert.title}</span>
      )}
      <span className="label shrink-0 text-right">
        {cert.issuer} · {cert.year}
      </span>
    </motion.div>
  );
}

/** "2026" when every member shares a year, else "2023 – 2026". */
function yearSpan(members: Certification[]) {
  const years = [...new Set(members.map((c) => c.year))].sort();
  return years.length === 1 ? years[0] : `${years[0]} – ${years[years.length - 1]}`;
}

function GroupRow({
  name,
  members,
  reduced,
}: {
  name: string;
  members: Certification[];
  reduced: boolean | null;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-baseline justify-between gap-4 border-t border-rule py-4 text-left"
        whileHover={reduced ? undefined : { x: 3 }}
        transition={SPRING}
      >
        <span className="flex items-baseline gap-3 text-meta font-medium text-paper">
          {name}
          <span className="label normal-case tracking-normal text-paper-dim">
            {open ? "// hide" : "// show"}
          </span>
        </span>
        <span className="label shrink-0 text-right">
          {members.length} certificates · {yearSpan(members)}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            className="overflow-hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: "easeOut" }}
          >
            <ul className="grid md:grid-cols-2 md:gap-x-10">
              {members.map((cert) => (
                <li key={cert.title}>
                  <CertRow cert={cert} reduced={reduced} />
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function CertificationList() {
  const reduced = useReducedMotion();

  // Walk in data order; a group row is emitted where its first member sits.
  const rows: ({ kind: "cert"; cert: Certification } | { kind: "group"; name: string; members: Certification[] })[] = [];
  const seen = new Set<string>();
  for (const cert of certifications) {
    if (!cert.group) {
      rows.push({ kind: "cert", cert });
    } else if (!seen.has(cert.group)) {
      seen.add(cert.group);
      rows.push({
        kind: "group",
        name: cert.group,
        members: certifications.filter((c) => c.group === cert.group),
      });
    }
  }

  return (
    <StaggerGroup as="ul" className="mt-2 grid md:grid-cols-2 md:gap-x-10">
      {rows.map((row) =>
        row.kind === "cert" ? (
          <StaggerItem as="li" key={row.cert.title}>
            <CertRow cert={row.cert} reduced={reduced} />
          </StaggerItem>
        ) : (
          <StaggerItem as="li" key={`group-${row.name}`} className="md:col-span-2">
            <GroupRow name={row.name} members={row.members} reduced={reduced} />
          </StaggerItem>
        ),
      )}
    </StaggerGroup>
  );
}
