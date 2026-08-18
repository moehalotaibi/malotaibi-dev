// Icon primitives: hand-drawn stroke UI icons + brand glyphs from simple-icons.
// Server-safe (no hooks). LinkedIn's glyph is inlined — it was removed upstream.

import {
  siFigma,
  siGithub,
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siFramer,
  siCursor,
  siClaude,
  siVercel,
  siJavascript,
  siHtml5,
  siCss,
  siGit,
  siBlender,
  siMiro,
} from "simple-icons";
import type { BrandSlug } from "@/lib/content";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z";

const BRANDS: Record<BrandSlug, { title: string; path: string; hex: string }> = {
  figma: { title: siFigma.title, path: siFigma.path, hex: siFigma.hex },
  github: { title: siGithub.title, path: siGithub.path, hex: siGithub.hex },
  linkedin: { title: "LinkedIn", path: LINKEDIN_PATH, hex: "0A66C2" },
  react: { title: siReact.title, path: siReact.path, hex: siReact.hex },
  nextdotjs: { title: siNextdotjs.title, path: siNextdotjs.path, hex: siNextdotjs.hex },
  typescript: { title: siTypescript.title, path: siTypescript.path, hex: siTypescript.hex },
  tailwindcss: { title: siTailwindcss.title, path: siTailwindcss.path, hex: siTailwindcss.hex },
  framer: { title: siFramer.title, path: siFramer.path, hex: siFramer.hex },
  cursor: { title: siCursor.title, path: siCursor.path, hex: siCursor.hex },
  claude: { title: siClaude.title, path: siClaude.path, hex: siClaude.hex },
  vercel: { title: siVercel.title, path: siVercel.path, hex: siVercel.hex },
  javascript: { title: siJavascript.title, path: siJavascript.path, hex: siJavascript.hex },
  html5: { title: siHtml5.title, path: siHtml5.path, hex: siHtml5.hex },
  css: { title: siCss.title, path: siCss.path, hex: siCss.hex },
  git: { title: siGit.title, path: siGit.path, hex: siGit.hex },
  blender: { title: siBlender.title, path: siBlender.path, hex: siBlender.hex },
  miro: { title: siMiro.title, path: siMiro.path, hex: siMiro.hex },
};

/** Brand color, lightened to cream when the official hex is too dark to read
 *  on the charcoal background (Next.js, Vercel, GitHub, Cursor…). */
function brandFill(hex: string): string {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.16 ? "#f2efe1" : `#${hex}`;
}

export const BRAND_TITLES: Record<BrandSlug, string> = Object.fromEntries(
  Object.entries(BRANDS).map(([slug, b]) => [slug, b.title]),
) as Record<BrandSlug, string>;

export function Brand({
  slug,
  className = "h-4 w-4",
  colored = false,
}: {
  slug: BrandSlug;
  className?: string;
  /** Render in the brand's official color instead of currentColor. */
  colored?: boolean;
}) {
  const brand = BRANDS[slug];
  return (
    <svg
      viewBox="0 0 24 24"
      fill={colored ? brandFill(brand.hex) : "currentColor"}
      className={className}
      aria-hidden="true"
    >
      <path d={brand.path} />
    </svg>
  );
}

// ----------------------------------------------------------- UI icons

export type UIIconName =
  | "home"
  | "grid"
  | "user"
  | "mail"
  | "zap"
  | "list"
  | "briefcase"
  | "arrow-right"
  | "pen"
  | "stack"
  | "code"
  | "globe";

const STROKE_PATHS: Record<UIIconName, React.ReactNode> = {
  home: (
    <path d="M3 10.75 12 3.5l9 7.25V20a1 1 0 0 1-1 1h-5.25v-6.5h-5.5V21H4a1 1 0 0 1-1-1v-9.25Z" />
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.5-3.5 4.2-5 7.5-5s6 1.5 7.5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  zap: <path d="M13 2 4.5 12.5H11L9.5 22 19 10.5h-6.5L13 2Z" />,
  list: (
    <>
      <path d="M4 6.5h16" />
      <path d="M4 12h11" />
      <path d="M4 17.5h16" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="13" rx="2" />
      <path d="M9 7.5V5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12.5h18" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  pen: (
    <>
      <path d="m4 20 1.2-4.2L16.5 4.5a2.12 2.12 0 0 1 3 3L8.2 18.8 4 20Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  stack: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17.5 9 5 9-5" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.4 3 14.6 0 18" />
      <path d="M12 3c-3 3.4-3 14.6 0 18" />
    </>
  ),
};

export function UI({
  name,
  className = "h-4 w-4",
}: {
  name: UIIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {STROKE_PATHS[name]}
    </svg>
  );
}

/**
 * Figma cursor (user-supplied SVG) — white outline, inside filled with
 * currentColor so each annotation's accent flows through.
 */
export function CursorArrow({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="30 12 336 370" fill="none" className={className} aria-hidden="true">
      <path
        d="M39.9744 31.8759C38.2182 23.4825 47.2034 16.9545 54.6432 21.2183L351.11 191.127C358.653 195.45 357.401 206.692 349.09 209.248L205.199 253.511C202.971 254.196 201.054 255.643 199.785 257.599L127.77 368.534C122.94 375.973 111.523 373.84 109.707 365.158L39.9744 31.8759Z"
        fill="currentColor"
      />
      <path
        d="M346.169 199.749L202.277 244.012C197.821 245.383 193.988 248.277 191.449 252.188L119.434 363.121L49.7012 29.8407L346.169 199.749Z"
        stroke="#fff"
        strokeWidth="19.8759"
      />
    </svg>
  );
}
