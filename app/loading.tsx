// Route-segment loading UI — Next.js shows this instantly while a page
// streams in (cold navigations, slow connections), swapping the real page
// in once it's ready. The visual lives in components/system/opening-file
// and is shared with the first-entry splash.

import OpeningFile from "@/components/system/opening-file";

export default function Loading() {
  return (
    <div aria-busy="true">
      {/* The one real announcement — the visual below is decorative. */}
      <p role="status" className="sr-only">
        Loading
      </p>
      <OpeningFile />
    </div>
  );
}
