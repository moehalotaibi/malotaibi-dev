"use client";

// Click-to-zoom for case-study screenshots. Wraps any frame (children) with
// an invisible button; activating it opens the full-size image in a native
// <dialog>, which brings focus trapping, Esc to close and focus return for
// free. A click anywhere closes it again, like the frame it came from.
//
// The dialog is portalled to <body> and its scroller opts out of Lenis
// (data-lenis-prevent) so tall boards scroll natively inside it. The
// scroller is always 1px taller than the viewport: that keeps
// overscroll-behavior: contain effective even for images that fit, so the
// page behind never scrolls while the lightbox is open.

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Full-size image (public/ path) and its real pixel size. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The frame to make zoomable. */
  children: ReactNode;
  className?: string;
  /** Corner radius of the frame, so the focus ring follows it. */
  radiusClassName?: string;
};

export default function Zoomable({
  src,
  alt,
  width,
  height,
  children,
  className = "",
  radiusClassName = "rounded-xl",
}: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Phone screens are small exports; do not stretch them past their size.
  const maxWidth = width < 600 ? "min(440px, 100%)" : "min(1600px, 100%)";

  return (
    <div className={`relative ${className}`}>
      {children}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom in: ${alt}`}
        aria-haspopup="dialog"
        className={`absolute inset-0 cursor-zoom-in ${radiusClassName}`}
      />
      {open
        ? createPortal(
            <dialog
              ref={dialogRef}
              aria-label={alt}
              onClose={() => setOpen(false)}
              onClick={close}
              className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none cursor-zoom-out border-0 bg-transparent p-0 backdrop:bg-black/85"
            >
              <div
                data-lenis-prevent
                className="h-full w-full overflow-y-auto overscroll-contain"
              >
                <div className="grid min-h-[calc(100%+1px)] place-items-center px-4 pb-6 pt-16">
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    unoptimized
                    className="h-auto w-auto max-w-full rounded-lg"
                    style={{ maxWidth }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                // Fixed colours: it sits on the black backdrop in both themes.
                className="pill fixed right-4 top-4 border-white bg-white text-[#111] hover:border-white hover:bg-white/90"
              >
                Close
              </button>
            </dialog>,
            document.body,
          )
        : null}
    </div>
  );
}
