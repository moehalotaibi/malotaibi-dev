"use client";

// Footer visit counter — posts one visit to /api/visits on every page load
// and shows the running total as a "// n visits since …" label. The
// total was seeded on 2026-10-14 with the 246 visitors Vercel Analytics
// had recorded since the site launched (Nov 2025) plus 100 for the
// August–October stretch the tracker was missing. Renders nothing until a
// number exists (and never on failure), so the footer stays clean when
// Redis is not configured.

import { useEffect, useState } from "react";

const SINCE = "Nov 2025";

export default function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/visits", { method: "POST", signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { visits?: number | null } | null) => {
        if (typeof data?.visits === "number") setVisits(data.visits);
      })
      .catch(() => {
        // Offline or blocked: no counter, no error.
      });
    return () => controller.abort();
  }, []);

  if (visits === null) return null;

  return (
    <span className="label tabular-nums" title={`Page visits since ${SINCE}`}>
      {`// ${visits.toLocaleString("en-US")} ${visits === 1 ? "visit" : "visits"} since ${SINCE}`}
    </span>
  );
}
