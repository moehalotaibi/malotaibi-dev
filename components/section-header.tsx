import type { Accent } from "@/lib/content";
import { accentText } from "@/lib/accents";
import { UI, type UIIconName } from "@/components/icons";
import SectionHeaderRedline from "@/components/section-header-redline";

type Props = {
  title: string;
  id?: string;
  /** Colors the title. Defaults to cream. */
  accent?: Accent;
  /** Circular cream badge sitting at the right end of the rule. */
  badge?: UIIconName;
  /** "lg" = page-title scale; "md" (default) = section scale. */
  size?: "lg" | "md";
  center?: boolean;
  /** Heading level — "h1" for page titles, "h2" (default) for sections. */
  as?: "h1" | "h2";
};

export default function SectionHeader({
  title,
  id,
  accent = "cream",
  badge,
  size = "md",
  center = false,
  as: Tag = "h2",
}: Props) {
  return (
    // `relative` anchors the decorative hover redline (client child below);
    // SectionHeader itself stays a server-compatible component.
    <div className={`relative pb-8 ${center ? "text-center" : ""}`}>
      <div
        className={`flex items-end gap-6 ${center ? "justify-center" : "justify-between"}`}
      >
        <Tag
          id={id}
          className={`font-display font-semibold ${
            size === "lg" ? "text-h1" : "text-h2"
          } ${accentText[accent]}`}
        >
          {title}
        </Tag>
        {badge ? (
          <span className="badge-circle mb-1 shrink-0" aria-hidden="true">
            <UI name={badge} className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      {!center ? <span className="rule mt-6 block" aria-hidden="true" /> : null}
      {/* Hover redline measuring the title → rule gap (pointer-fine only). */}
      {!center ? <SectionHeaderRedline /> : null}
    </div>
  );
}
