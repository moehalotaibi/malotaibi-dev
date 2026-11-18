import Image from "next/image";
import { site } from "@/lib/content";

type Props = {
  /** Shown in the fake browser chrome's address strip. */
  title?: string;
  ratio?: "video" | "square" | "tall" | "phone" | "wide" | "board";
  /**
   * Natural width / height of the shot. Overrides `ratio` so the frame
   * takes the image's own proportions and nothing is cropped (app screens).
   */
  aspect?: number;
  /** Real screenshot (public/ path). Falls back to the monogram grid. */
  image?: string;
  imageAlt?: string;
  /** "contain" centers the image on a white ground — for logos. */
  fit?: "cover" | "contain";
  /**
   * next/image `sizes` — how wide the frame renders, so the right rendition
   * is fetched. Default fits the two-column project cards; the case-study
   * column passes its own (its full-span figures are ~864px, not 50vw).
   */
  sizes?: string;
  /**
   * The mono label in the shot's bottom-left corner. Pass `false` to drop it
   * on dense UI screens, where it would sit on top of real interface.
   */
  cornerLabel?: string | false;
  /** Mono note on the right of the chrome bar, e.g. "// zoom". */
  hint?: string;
  /** Load at once instead of lazily (the one shot near the fold). */
  eager?: boolean;
};

const RATIOS: Record<NonNullable<Props["ratio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  phone: "aspect-[9/19.5]",
  wide: "aspect-[5/2]",
  // Figma design boards (multi-screen mockup sheets) — near 4:3.
  board: "aspect-[4/3]",
};

/**
 * Screenshot card — a fake browser frame. With `image` it shows the real
 * shot; without, a dot-grid + wordmark placeholder. The chrome bar and the
 * "// preview" label render in both modes.
 */
export default function ShotFrame({
  title,
  ratio = "video",
  aspect,
  image,
  imageAlt,
  fit = "cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
  cornerLabel = "// preview",
  hint,
  eager = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-raised">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-rule px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
        </span>
        {title ? (
          <span className="label min-w-0 truncate normal-case tracking-normal text-paper-dim">
            {title}
          </span>
        ) : null}
        {hint ? (
          <span
            className="label ms-auto shrink-0 normal-case tracking-normal text-paper-dim"
            aria-hidden="true"
          >
            {hint}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div
        className={`relative ${aspect ? "" : RATIOS[ratio]} ${
          image ? (fit === "contain" ? "bg-white" : "") : "dot-grid"
        }`}
        style={aspect ? { aspectRatio: String(aspect) } : undefined}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title ?? ""}
            fill
            sizes={sizes}
            loading={eager ? "eager" : undefined}
            className={
              fit === "contain"
                ? "object-contain p-10"
                : "object-cover object-top"
            }
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <span
              className="select-none font-mono text-h2 font-bold tracking-tight text-rule-strong"
              aria-hidden="true"
            >
              {site.name}
            </span>
          </span>
        )}
        {cornerLabel ? (
          <span className="label absolute bottom-3 left-4 normal-case tracking-normal text-paper-dim">
            {cornerLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
