"use client";

// Walkthrough loop under a case-study hero — ShotFrame's chrome (dots,
// address strip, "// label") around a muted, looping, inline video. It
// plays only while on screen and never autoplays under reduced motion;
// a pause/play pill keeps it under the reader's control either way
// (WCAG 2.2.2). The poster is the first frame, so nothing flashes.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  src: string;
  poster: string;
  /** Address-strip text — file-chrome style, like the ShotFrame titles. */
  title: string;
  /** Bottom-left "// …" label. */
  label: string;
};

export default function CaseVideo({ src, poster, title, label }: Props) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The reader pressed pause — the observer must not restart it.
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced || userPaused) return;
    // React leaves the `muted` attribute out of server HTML; set it on the
    // element itself or the browser refuses to autoplay.
    video.muted = true;
    video.defaultMuted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced, userPaused]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.muted = true;
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-raised">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-rule px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
        </span>
        <span className="label truncate normal-case tracking-normal text-paper-dim">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="relative aspect-video bg-ink">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={title}
        />
        <span className="label absolute bottom-3 left-4 normal-case tracking-normal text-paper-dim">
          {label}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
          className="absolute bottom-3 right-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-strong bg-ink/70 px-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper backdrop-blur-sm transition-colors hover:border-paper hover:text-cream"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${playing ? "bg-accent-green" : "bg-rule-strong"}`}
            aria-hidden="true"
          />
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
