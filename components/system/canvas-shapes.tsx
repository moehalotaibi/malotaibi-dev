// Loose canvas shapes for the 404 playground. Server-safe (no hooks) —
// plain SVGs that read as objects someone left on the Figma canvas. Color
// flows through currentColor so each shape takes its accent from a text-*
// class on the className.

/** Pac-Man — a circle with a wedge bite taken out, mouth facing right. */
export function PacManShape({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* r=28 circle centered at (32,32); mouth opens ±30° around the +x axis */}
      <path
        d="M32 32 L56.25 18 A28 28 0 1 0 56.25 46 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Five-point star. */
export function StarShape({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l2.9 6.6L22 9.3l-5.4 4.8L18.2 21 12 17.3 5.8 21l1.6-6.9L2 9.3l7.1-.7L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Rounded square — a plain rect with generous corner radius. */
export function RoundedSquareShape({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="currentColor" />
    </svg>
  );
}

/** Rounded triangle, tip up. */
export function TriangleShape({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M21.4 6.5a3 3 0 0 1 5.2 0l17 29.5a3 3 0 0 1-2.6 4.5H6a3 3 0 0 1-2.6-4.5l17-29.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
