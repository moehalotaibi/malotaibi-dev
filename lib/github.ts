// GitHub contribution calendar — fetched server-side from GitHub's public
// contributions page (the same markup github.com renders on a profile), so
// no token is needed and the graph tracks Moe's real activity. Cached with
// ISR for an hour: the home page re-renders itself with fresh data at most
// once an hour, so a commit shows up on the site within the hour.
//
// This is not an official API. The parser only relies on three stable
// pieces of markup (the day cells' data-date / data-level, the cell ids, and
// the tooltip text with the count) and returns null on any surprise, in
// which case the section simply does not render. Server-side only: it is
// imported by the async server component components/home/github-graph.tsx
// and must never be pulled into a "use client" file.

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  count: number;
  level: ContributionLevel;
};

export type Contributions = {
  user: string;
  total: number;
  /** Columns of up to seven days, oldest week first, Sunday at row 0. */
  weeks: ContributionDay[][];
  from: string;
  to: string;
};

const CELL_RE = /<td\b[^>]*\bclass="ContributionCalendar-day"[^>]*>/g;
const ATTR = (tag: string, name: string) =>
  new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];
const TIP_RE =
  /<tool-tip\b[^>]*\bfor="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g;

export async function getContributions(
  user: string,
): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: {
        "user-agent": "malotaibi.dev (portfolio contribution graph)",
        accept: "text/html",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Tooltip text per cell id → count ("No contributions on …" or
    // "3 contributions on …").
    const counts = new Map<string, number>();
    for (const m of html.matchAll(TIP_RE)) {
      const text = m[2].trim();
      const n = /^(\d[\d,]*) contribution/.exec(text);
      counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
    }

    const columns = new Map<number, ContributionDay[]>();
    let cells = 0;
    for (const m of html.matchAll(CELL_RE)) {
      const tag = m[0];
      const date = ATTR(tag, "data-date");
      const id = ATTR(tag, "id");
      const level = Number(ATTR(tag, "data-level"));
      const pos = /contribution-day-component-(\d+)-(\d+)/.exec(id ?? "");
      if (!date || !pos || !(level >= 0 && level <= 4)) continue;
      const row = Number(pos[1]);
      const col = Number(pos[2]);
      const week = columns.get(col) ?? [];
      week[row] = {
        date,
        count: counts.get(id!) ?? 0,
        level: level as ContributionLevel,
      };
      columns.set(col, week);
      cells += 1;
    }
    if (cells < 300) return null; // a year is ~365 cells; anything less means the markup moved

    const weeks = [...columns.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, days]) => days.filter(Boolean));
    const days = weeks.flat();
    return {
      user,
      total: days.reduce((sum, d) => sum + d.count, 0),
      weeks,
      from: days[0].date,
      to: days[days.length - 1].date,
    };
  } catch {
    return null;
  }
}
