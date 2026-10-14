// Commits — Moe's live GitHub contribution calendar, redrawn in the site's
// own chrome (a Figma-style panel, accent-green cells, theme-aware). Server
// component: the data comes from lib/github.ts with hourly ISR, so the
// graph follows his real activity without a redeploy. Renders nothing when
// GitHub can't be read, so a hiccup never leaves a broken section.

import MotionReveal from "@/components/motion/motion-reveal";
import SectionHeader from "@/components/section-header";
import { getContributions, type ContributionLevel } from "@/lib/github";
import { socials } from "@/lib/content";

const GITHUB_URL =
  socials.find((s) => s.icon === "github")?.href ?? "https://github.com/moehalotaibi";
const GITHUB_USER = GITHUB_URL.replace(/\/+$/, "").split("/").pop() ?? "moehalotaibi";

// Level → cell fill. 0 is a faint wash of the theme tint (white on dark,
// black on light); 1–4 step up the accent green.
const FILL: Record<ContributionLevel, string> = {
  0: "rgb(var(--c-tint) / 0.07)",
  1: "rgb(var(--c-green) / 0.35)",
  2: "rgb(var(--c-green) / 0.55)",
  3: "rgb(var(--c-green) / 0.8)",
  4: "rgb(var(--c-green))",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function GithubGraph() {
  const data = await getContributions(GITHUB_USER);
  if (!data) return null;

  // One label per month, at the first week that starts in it.
  const monthLabels: { col: number; name: string }[] = [];
  let lastMonth = -1;
  data.weeks.forEach((week, col) => {
    const month = Number(week[0].date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      monthLabels.push({ col, name: MONTHS[month] });
      lastMonth = month;
    }
  });
  // Drop a first label that would collide with the second one.
  if (monthLabels.length > 1 && monthLabels[1].col - monthLabels[0].col < 3) {
    monthLabels.shift();
  }

  const columns = data.weeks.length;
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 11px)`,
  } as const;

  return (
    <section className="shell pb-section" aria-labelledby="commits">
      <MotionReveal>
        <SectionHeader id="commits" title="Commits" badge="code" />
      </MotionReveal>

      <MotionReveal delay={80}>
        <div className="card mt-10 overflow-hidden">
          {/* Chrome bar */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule px-5 py-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label normal-case tracking-normal text-paper-dim transition-colors hover:text-paper"
            >
              {`// github.com/${data.user}`}
            </a>
            <span className="label normal-case tracking-normal text-paper-dim">
              <span className="font-bold text-paper">{data.total.toLocaleString("en-US")}</span>
              {" contributions in the last year"}
            </span>
          </div>

          {/* Calendar — scrolls sideways on narrow screens */}
          <div className="overflow-x-auto px-5 pb-4 pt-5">
            <div className="w-max">
              <div
                className="mb-2 grid gap-[3px] font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper-dim"
                style={gridStyle}
                aria-hidden="true"
              >
                {monthLabels.map((m) => (
                  <span
                    key={`${m.name}-${m.col}`}
                    className="whitespace-nowrap"
                    style={{ gridColumn: `${m.col + 1} / span 3` }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              <div
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                style={gridStyle}
                role="img"
                aria-label={`GitHub contribution calendar: ${data.total} contributions between ${longDate(data.from)} and ${longDate(data.to)}`}
              >
                {data.weeks.map((week, col) =>
                  week.map((day) => (
                    <span
                      key={day.date}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{
                        backgroundColor: FILL[day.level],
                        gridColumn: col + 1,
                      }}
                      title={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${longDate(day.date)}`}
                    />
                  )),
                )}
              </div>
            </div>
          </div>

          {/* Footer — legend */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule px-5 py-3">
            <span className="label normal-case tracking-normal text-paper-dim">
              {`// last 12 months · ${longDate(data.from)} to ${longDate(data.to)} · refreshes hourly`}
            </span>
            <span
              className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper-dim"
              aria-hidden="true"
            >
              Less
              {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
                <span
                  key={level}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ backgroundColor: FILL[level] }}
                />
              ))}
              More
            </span>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
