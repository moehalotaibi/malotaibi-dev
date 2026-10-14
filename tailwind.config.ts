import type { Config } from "tailwindcss";

// Every colour reads an RGB-channel CSS variable defined in app/globals.css,
// so the dark palette (default) and the light palette (html[data-theme=
// "light"]) swap without touching a single class name. The `<alpha-value>`
// placeholder keeps modifiers like bg-ink/70 working.
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — dark warm charcoal (never pure black) / warm paper
        ink: token("--c-ink"),
        raised: token("--c-raised"),
        // Text
        paper: token("--c-paper"),
        "paper-mid": token("--c-paper-mid"),
        "paper-dim": token("--c-paper-dim"),
        cream: token("--c-cream"),
        // Hairlines
        rule: token("--c-rule"),
        "rule-strong": token("--c-rule-strong"),
        // Overlay tint — white on the dark theme, black on the light one.
        // Use it for hover washes and faint grids instead of bg-white/…
        tint: token("--c-tint"),
        // Multi-accent palette — one accent per element, never mixed
        accent: {
          violet: token("--c-violet"),
          "violet-deep": token("--c-violet-deep"),
          amber: token("--c-amber"),
          cyan: token("--c-cyan"),
          green: token("--c-green"),
          pink: token("--c-pink"),
          blue: token("--c-blue"),
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Display = same Hanken Grotesk family; headings differ by weight.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        wordmark: ["var(--font-wordmark)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        // Deliberate scale — nothing between these steps
        micro: ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.12em" }],
        meta: ["0.8125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.65" }],
        lead: ["1.25rem", { lineHeight: "1.55" }],
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.5rem, 6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        hero: ["clamp(2.75rem, 8.5vw, 6.75rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
      },
      spacing: {
        section: "clamp(4.5rem, 10vw, 8rem)",
      },
    },
  },
  plugins: [],
};

export default config;
