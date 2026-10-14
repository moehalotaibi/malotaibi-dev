"use client";

// Footer visit counter — posts one visit per browser per day to
// /api/visits and shows the running total as a "// n visits since …"
// label. Renders nothing until a number exists (and never on failure),
// so the footer stays clean when Redis is not configured.

import { useEffect, useState } from "react";

const SINCE = "Oct 2026";

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
    <span className="label tabular-nums" title={`Counted once per browser per day since ${SINCE}`}>
      {`// ${visits.toLocaleString("en-US")} ${visits === 1 ? "visit" : "visits"} since ${SINCE}`}
    </span>
  );
}
