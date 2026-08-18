import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — dark warm charcoal, never pure black
        ink: "#111210",
        raised: "#191a17",
        // Text
        paper: "#eceae2",
        "paper-mid": "#a09f97",
        "paper-dim": "#6b6a62",
        cream: "#f2efe1",
        // Hairlines
        rule: "#262723",
        "rule-strong": "#363733",
        // Multi-accent palette — one accent per element, never mixed
        accent: {
          violet: "#a78bfa",
          "violet-deep": "#8b5cf6",
          amber: "#f7c34c",
          cyan: "#2fe2a8",
          green: "#4ade80",
          pink: "#f472b6",
          blue: "#60a5fa",
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
