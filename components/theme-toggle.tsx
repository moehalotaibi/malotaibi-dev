"use client";

// Light / dark switch — a round nav-chrome button beside the Contact pill.
// The theme is a `data-theme` attribute on <html> (absent = light, "dark"
// = dark); the palettes live in globals.css and every Tailwind colour reads
// them, so flipping the attribute re-themes the whole site. The choice
// persists in localStorage; an inline script in app/layout.tsx applies it
// before first paint so there is no flash. Also keeps <meta theme-color>
// in step so the mobile browser chrome matches.

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI } from "@/components/icons";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const THEME_COLOR: Record<Theme, string> = { dark: "#111210", light: "#f4f2ec" };

// Light is the default (no attribute); "dark" is the stored opt-in.
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// The <html data-theme> attribute is the single source of truth; subscribe
// to it so the button re-renders whatever flips it (this button, another
// tab's toggle via the inline script, devtools).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
const getServerTheme = (): Theme => "light";

// A soft iPhone-style switch click, synthesised in WebAudio (no audio
// file): a filtered noise tick for the "click" plus a short sine "thock"
// that pitches up for light and down for dark. Created lazily inside the
// click handler so the browser's autoplay rules are satisfied; any audio
// failure is swallowed, the toggle itself never depends on it.
let audio: AudioContext | null = null;

function playClick(theme: Theme) {
  try {
    audio ??= new AudioContext();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;

    // Tick: 20 ms of noise through a band-pass, fast decay.
    const length = Math.floor(ctx.sampleRate * 0.02);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2600;
    band.Q.value = 1.1;
    const tickGain = ctx.createGain();
    tickGain.gain.setValueAtTime(0.35, t);
    tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    noise.connect(band).connect(tickGain).connect(ctx.destination);
    noise.start(t);

    // Thock: a short sine sweep, up for light, down for dark.
    const [from, to] = theme === "light" ? [420, 640] : [520, 260];
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + 0.045);
    const thockGain = ctx.createGain();
    thockGain.gain.setValueAtTime(0.14, t);
    thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(thockGain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch {
    // No audio (unsupported, blocked, or muted): stay silent.
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}

export default function ThemeToggle() {
  const reduced = useReducedMotion();
  // Server snapshot is light; on the client the inline layout script has
  // already applied a stored "dark" before this reads the attribute.
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const toggle = () => {
    playClick(next);
    applyTheme(next);
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-rule bg-ink/80 text-paper-mid backdrop-blur-md transition-colors hover:border-rule-strong hover:text-paper max-lg:h-[44px] max-lg:w-[44px]"
      {...(reduced ? {} : { whileHover: { y: -1 }, whileTap: { scale: 0.94 } })}
    >
      <motion.span
        key={theme}
        className="flex"
        {...(reduced
          ? {}
          : {
              initial: { rotate: -40, opacity: 0, scale: 0.8 },
              animate: { rotate: 0, opacity: 1, scale: 1 },
              transition: { type: "spring", stiffness: 380, damping: 22 },
            })}
      >
        <UI name={theme === "dark" ? "sun" : "moon"} className="h-3.5 w-3.5" />
      </motion.span>
    </motion.button>
  );
}
