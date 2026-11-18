// Figma-style selection chrome: a hairline box with four square handles,
// drawn 6px outside whatever it sits on. It is the same vocabulary as the
// hero's Color Styles panel and the spine's anchor squares, used here as a
// hover state: pointing at a card "selects" it like a frame on the canvas.
//
// Decorative only. The parent must be `relative` and sit inside a `group`;
// the chrome fades in on group hover and on keyboard focus.

import type { Accent } from "@/lib/content";
import { accentBorder } from "@/lib/accents";

export default function SelectionCorners({ accent }: { accent: Accent }) {
  const handle = `absolute h-[7px] w-[7px] border-[1.5px] bg-ink ${accentBorder[accent]}`;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-1.5 border opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${accentBorder[accent]}`}
    >
      <span className={`${handle} -left-1 -top-1`} />
      <span className={`${handle} -right-1 -top-1`} />
      <span className={`${handle} -bottom-1 -left-1`} />
      <span className={`${handle} -bottom-1 -right-1`} />
    </span>
  );
}
