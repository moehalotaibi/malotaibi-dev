// Arabic words inside English copy (Diwan's ديوان). Each run gets
// lang/dir and IBM Plex Sans Arabic, so it is announced and shaped as
// Arabic instead of falling back to whatever the system picks. The font is
// not preloaded: it only downloads on pages that actually render Arabic.

import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

type ArProps = { children: ReactNode; className?: string };

export function Ar({ children, className = "" }: ArProps) {
  return (
    <span lang="ar" dir="rtl" className={`${plexArabic.className} ${className}`}>
      {children}
    </span>
  );
}

// One or more Arabic-script words, including the spaces between them.
const ARABIC_RUN = /([؀-ۿ]+(?:\s+[؀-ۿ]+)*)/;

/** Wraps every Arabic run in `text` with <Ar>; other text passes through. */
export function withArabic(text: string): ReactNode {
  if (!ARABIC_RUN.test(text)) return text;
  return text
    .split(ARABIC_RUN)
    .map((part, i) =>
      i % 2 === 1 ? <Ar key={i}>{part}</Ar> : part,
    );
}
