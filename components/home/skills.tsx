"use client";

// Experience & skills — an icon wall. Four cards in a row, one per skill:
// index, name, one line of description, then every tool as an app-style
// tile with its name under it. Tools that have a real logo show it in full
// colour on a white tile; the methods (wireframing, usability testing, …)
// get a drawn icon on a tile tinted with the skill's accent, so each card
// still reads as one family. This is the fourth version of this section:
// Moe asked for "icons" after the text-and-chips versions (rows, a ruled
// card, big coloured cards) did not land.
//
// Hover: a tile lifts and grows a touch. The cards sit on the page colour
// (`relative` + `bg-ink`) so the decorative spine passes behind them.

import MotionReveal from "@/components/motion/motion-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import SectionHeader from "@/components/section-header";
import { Brand, UI, type UIIconName } from "@/components/icons";
import { accentBg, accentBgSoft, accentText } from "@/lib/accents";
import { skills } from "@/lib/content";
import type { Accent, BrandSlug } from "@/lib/content";

// How each tool name from lib/content.ts is drawn. Anything not listed
// falls back to a plain drawn icon, so a new tag never breaks the grid.
type Mark =
  | { img: string } // full-colour logo file in public/tech
  | { brand: BrandSlug } // one-colour glyph, drawn black on the white tile
  | { icon: UIIconName } // a method: drawn icon on an accent tile
  | { adobe: string; bg: string; fg: string }; // Adobe-style lettered square

const MARKS: Record<string, Mark> = {
  Figma: { img: "/tech/figma.svg" },
  Framer: { brand: "framer" },
  Wireframing: { icon: "layout" },
  Prototyping: { icon: "pointer" },
  "Design Systems": { icon: "stack" },
  Photoshop: { img: "/tech/photoshop.svg" },
  Illustrator: { img: "/tech/illustrator.svg" },
  "After Effects": { img: "/tech/aftereffects.svg" },
  "Premiere Pro": { img: "/tech/premierepro.svg" },
  // No logo file for InDesign: its mark is the same lettered square as the
  // other Adobe apps, in InDesign's own colours.
  InDesign: { adobe: "Id", bg: "#49021f", fg: "#ff3366" },
  "UX Research": { icon: "search" },
  "User Personas": { icon: "user" },
  "Usability Testing": { icon: "check" },
  "Information Architecture": { icon: "sitemap" },
  "Design Thinking": { icon: "bulb" },
  HTML: { img: "/tech/html5.svg" },
  CSS: { img: "/tech/css3.svg" },
  JavaScript: { img: "/tech/javascript.svg" },
  TypeScript: { img: "/tech/typescript.svg" },
  React: { img: "/tech/react.svg" },
  "Next.js": { brand: "nextdotjs" },
  "Tailwind CSS": { img: "/tech/tailwindcss.svg" },
};

const TILE =
  "grid h-12 w-12 place-items-center rounded-[0.9rem] border transition-transform duration-200 ease-out group-hover/tile:-translate-y-1 group-hover/tile:scale-105";
// A real logo sits on white in both themes, with a soft drop under it.
const TILE_LOGO = `${TILE} border-rule bg-white shadow-[0_1px_0_rgb(0_0_0/0.04),0_10px_18px_-12px_rgb(0_0_0/0.35)]`;

function Tile({ name, accent }: { name: string; accent: Accent }) {
  const mark = MARKS[name] ?? { icon: "zap" as UIIconName };

  if ("img" in mark) {
    return (
      <span className={TILE_LOGO}>
        {/* Self-hosted devicon SVG, same files as the tech-stack band. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark.img} alt="" className="h-7 w-7" draggable={false} />
      </span>
    );
  }
  if ("brand" in mark) {
    return (
      <span className={`${TILE_LOGO} text-[#111]`}>
        <Brand slug={mark.brand} className="h-6 w-6" />
      </span>
    );
  }
  if ("adobe" in mark) {
    return (
      <span className={TILE_LOGO}>
        <span
          className="grid h-7 w-7 place-items-center rounded-[5px] font-sans text-[0.8125rem] font-bold leading-none"
          style={{ background: mark.bg, color: mark.fg }}
        >
          {mark.adobe}
        </span>
      </span>
    );
  }
  return (
    <span
      className={`${TILE} border-transparent ${accentBgSoft[accent]} ${accentText[accent]}`}
    >
      <UI name={mark.icon} className="h-[1.375rem] w-[1.375rem]" />
    </span>
  );
}

export default function SkillsRows() {
  return (
    <section className="shell pb-section" aria-labelledby="skills">
      <MotionReveal>
        <SectionHeader id="skills" title="Experience & Skills" accent="amber" />
      </MotionReveal>
      <StaggerGroup
        className="relative grid gap-4 bg-ink sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.07}
      >
        {skills.map((s) => (
          // The card itself is the grid item: a subgrid of three rows
          // (name, description, tools), so those line up across the row
          // whatever the length of each description.
          <StaggerItem
            key={s.index}
            className="card relative row-span-3 grid grid-rows-subgrid gap-0 p-6"
          >
            <div>
              <p className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-[2px] ${accentBg[s.accent]}`}
                  aria-hidden="true"
                />
                <span className="label tabular-nums">{s.index}</span>
              </p>
              <h3 className="mt-5 font-display text-h3 font-semibold text-cream">
                {s.word}
              </h3>
            </div>
            <p className="mt-2.5 text-meta leading-relaxed text-paper-mid">
              {s.body}
            </p>
            <ul
              className="mt-6 grid grid-cols-3 content-start gap-x-2 gap-y-4 border-t border-rule pt-6"
              aria-label={`${s.word} tools`}
            >
              {s.tags.map((tag) => (
                <li
                  key={tag}
                  className="group/tile flex flex-col items-center gap-2 text-center"
                >
                  <Tile name={tag} accent={s.accent} />
                  <span className="text-[0.6875rem] leading-tight text-paper-mid transition-colors group-hover/tile:text-paper">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
