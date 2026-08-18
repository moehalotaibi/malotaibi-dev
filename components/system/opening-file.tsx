// The "Figma opening a file" visual — shared by the route loading UI
// (app/loading.tsx) and the first-entry splash (entry-splash.tsx).
// Server-safe: animations are scoped CSS keyframes; only the cycling
// phrase line is a client child.

import LoadingPhrases from "@/components/system/loading-phrases";

export default function OpeningFile() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      {/* Canvas backdrop — the 88px grid, dialed far down. */}
      <div
        className="line-grid dot-fade pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      {/* Sweep math: the segment is 40% of the track, so its left edge
          travels from -100% (own width, fully off-canvas left) to 250%
          (track width in segment units) to exit on the right. */}
      <style>{`
        @keyframes moe-loading-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes moe-loading-sweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(250%); }
        }
      `}</style>

      <div
        className="pointer-events-none relative flex flex-col items-center"
        aria-hidden="true"
      >
        {/* The m. monogram — soft breathing scale while the file opens. */}
        <span className="grid h-12 w-12 place-items-center rounded-full border border-rule-strong bg-raised font-mono text-meta motion-safe:animate-[moe-loading-pulse_1.6s_ease-in-out_infinite]">
          m.
        </span>

        <p className="mt-5 font-mono text-meta text-paper">
          Downloading canvas&hellip;
        </p>

        {/* Cycling status phrase — fixed-height slot so the crossfade
            never shifts the column. */}
        <div className="mt-2 flex h-5 items-center">
          <LoadingPhrases />
        </div>

        {/* Indeterminate progress — a 40% violet→cyan segment sweeping
            left→right, transform-only. Under reduced motion no animation
            applies and the segment rests as a static 40% fill. */}
        <div className="relative mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-rule">
          <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan motion-safe:animate-[moe-loading-sweep_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
