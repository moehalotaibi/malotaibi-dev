"use client";

// Toolkit cards — cards stagger in and tilt subtly on hover; tags get a
// hover pop. Static under reduced motion (handled by the primitives).

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import TiltCard from "@/components/motion/tilt-card";
import TagChip from "@/components/about/tag-chip";
import { accentText } from "@/lib/accents";
import { toolkit } from "@/lib/content";

export default function ToolkitCards() {
  return (
    <StaggerGroup className="mt-2 grid gap-4 sm:grid-cols-3">
      {toolkit.map((group) => (
        <StaggerItem key={group.group} className="h-full">
          <TiltCard max={4} className="h-full">
            <div className="card h-full p-6">
              <p className={`label ${accentText[group.accent]}`}>
                {group.group}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <TagChip label={item} />
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
