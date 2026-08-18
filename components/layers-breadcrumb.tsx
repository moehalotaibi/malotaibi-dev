"use client";

// Figma layers-panel breadcrumb — fixed chip bottom-left (lg+ only) showing
// the "layer path" of what's on the canvas: "moe. › {Page} › {Section}".
// Page derives from the route; Section tracks whichever section currently
// crosses a thin band ~40% down the viewport, via ONE IntersectionObserver
// that re-collects sections on every route change. Purely decorative
// wayfinding: aria-hidden + pointer-events-none, never blocks content.
// Segment swaps slide up/fade (instant under reduced motion).

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/case-studies": "Case Studies",
  "/projects": "UX Projects",
  "/about": "About",
  "/contact": "Contact",
};

function pageName(pathname: string | null): string {
  if (!pathname) return "Home";
  const exact = PAGE_NAMES[pathname];
  if (exact) return exact;
  if (pathname.startsWith("/case-studies/")) return "Case Study";
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return "Home";
  return seg
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Accessible-name-ish text for a heading: prefers aria-label (StaggerText
 * keeps the real string there while rendering per-char spans), skips
 * aria-hidden subtrees, and joins element children with spaces so stacked
 * hero lines don't mash together.
 */
function readableText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (!(node instanceof Element)) return "";
  if (node.getAttribute("aria-hidden") === "true") return "";
  const label = node.getAttribute("aria-label");
  if (label) return label;
  return Array.from(node.childNodes).map(readableText).join(" ");
}

const MAX_LABEL = 28;

/** Collapse whitespace, drop the trailing period, clamp for the tiny chip. */
function tidy(raw: string): string | null {
  let text = raw.replace(/\s+/g, " ").trim();
  text = text.replace(/[.\s]+$/, "");
  if (!text) return null;
  if (text.length > MAX_LABEL) {
    text = `${text.slice(0, MAX_LABEL - 1).trimEnd()}…`;
  }
  return text;
}

/**
 * Layer name for a section: aria-labelledby → referenced heading's text,
 * else its aria-label, else the first heading inside it. Null = unnamed
 * layer (skipped — the chip keeps the last named one, like Figma keeps the
 * last selected layer).
 */
function sectionLabel(section: HTMLElement): string | null {
  const labelledBy = section.getAttribute("aria-labelledby");
  if (labelledBy) {
    const heading = document.getElementById(labelledBy);
    if (heading) return tidy(readableText(heading));
  }
  const ariaLabel = section.getAttribute("aria-label");
  if (ariaLabel) return tidy(ariaLabel);
  const heading = section.querySelector("h1, h2, h3");
  return heading ? tidy(readableText(heading)) : null;
}

const SWAP = { type: "spring", stiffness: 480, damping: 42 } as const;

/** One breadcrumb segment; label changes slide the old up and the new in. */
function Segment({ label, className }: { label: string; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          className="whitespace-nowrap"
          initial={reduced ? false : { y: "1.1em", opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: reduced ? { duration: 0 } : SWAP,
          }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0 } }
              : { y: "-1.1em", opacity: 0, transition: SWAP }
          }
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Chevron() {
  return <span className="text-paper-dim">›</span>;
}

export default function LayersBreadcrumb() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  // Drop the stale section label the moment the route changes (render-time
  // state adjustment — the observer below repopulates it asynchronously).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setSection(null);
  }

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const collect = () => {
      observer?.disconnect();
      observer = null;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section"),
      );
      const labels = new Map<HTMLElement, string>();
      const order = new Map<HTMLElement, number>();
      sections.forEach((el, index) => {
        const label = sectionLabel(el);
        if (label) {
          labels.set(el, label);
          order.set(el, index);
        }
      });
      if (labels.size === 0) return;

      // A thin horizontal band ~35–45% down the viewport; the deepest
      // section overlapping it is the "selected layer".
      const visible = new Set<HTMLElement>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) visible.add(el);
            else visible.delete(el);
          }
          let current: HTMLElement | null = null;
          for (const el of visible) {
            if (!current || (order.get(el) ?? 0) > (order.get(current) ?? 0)) {
              current = el;
            }
          }
          if (current) setSection(labels.get(current) ?? null);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      for (const el of labels.keys()) observer.observe(el);
    };

    collect();
    // One late pass for route content that mounts just after navigation.
    const retry = window.setTimeout(collect, 350);

    return () => {
      window.clearTimeout(retry);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden items-center gap-1.5 rounded-full border border-rule bg-ink/80 px-3.5 py-2 font-mono text-micro uppercase text-paper-mid backdrop-blur lg:flex"
    >
      <span className="font-bold text-cream">{site.name}</span>
      <Chevron />
      <Segment label={pageName(pathname)} />
      {section ? (
        <>
          <Chevron />
          <Segment label={section} className="text-paper" />
        </>
      ) : null}
    </div>
  );
}
