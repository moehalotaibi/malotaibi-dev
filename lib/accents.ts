// Accent → Tailwind class lookups.
// Class strings must stay literal here so Tailwind's scanner sees them —
// never build these names dynamically.

import type { Accent } from "./content";

export const accentText: Record<Accent, string> = {
  violet: "text-accent-violet",
  amber: "text-accent-amber",
  cyan: "text-accent-cyan",
  green: "text-accent-green",
  pink: "text-accent-pink",
  blue: "text-accent-blue",
  cream: "text-cream",
};

export const accentBg: Record<Accent, string> = {
  violet: "bg-accent-violet",
  amber: "bg-accent-amber",
  cyan: "bg-accent-cyan",
  green: "bg-accent-green",
  pink: "bg-accent-pink",
  blue: "bg-accent-blue",
  cream: "bg-cream",
};

/** Soft 10% tint backgrounds — icon chips, subtle fills. */
export const accentBgSoft: Record<Accent, string> = {
  violet: "bg-accent-violet/10",
  amber: "bg-accent-amber/10",
  cyan: "bg-accent-cyan/10",
  green: "bg-accent-green/10",
  pink: "bg-accent-pink/10",
  blue: "bg-accent-blue/10",
  cream: "bg-cream/10",
};

export const accentBorder: Record<Accent, string> = {
  violet: "border-accent-violet",
  amber: "border-accent-amber",
  cyan: "border-accent-cyan",
  green: "border-accent-green",
  pink: "border-accent-pink",
  blue: "border-accent-blue",
  cream: "border-cream",
};

/**
 * Accent colours as CSS strings for inline styles (progress bar, cursor
 * tags, confetti, the spine gradient). They read the theme variables from
 * globals.css, so they follow the light/dark toggle like the classes do.
 * Only valid where CSS is parsed — `style={{…}}`, not SVG presentation
 * attributes (use `style={{ stopColor }}` / `style={{ fill }}` there).
 */
export const ACCENT_HEX: Record<Accent, string> = {
  violet: "rgb(var(--c-violet))",
  amber: "rgb(var(--c-amber))",
  cyan: "rgb(var(--c-cyan))",
  green: "rgb(var(--c-green))",
  pink: "rgb(var(--c-pink))",
  blue: "rgb(var(--c-blue))",
  cream: "rgb(var(--c-cream))",
};

/** Gradient text classes for hero lines with a two-tone fill. */
export const gradientText: Partial<Record<Accent, string>> = {
  violet: "text-gradient-violet",
  amber: "text-gradient-amber",
};
