import type { Segment } from "@/lib/content";
import { accentText } from "@/lib/accents";

/**
 * Renders a multi-color sentence from content Segments.
 * Accent runs get their accent color + medium weight.
 */
export default function Segments({
  segments,
}: {
  segments: readonly Segment[];
}) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.accent ? (
          <span key={i} className={`font-medium ${accentText[seg.accent]}`}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}
