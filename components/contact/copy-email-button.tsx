"use client";

// Copy-to-clipboard button for the email card. The tooltip label flips
// "Copy" → "Copied!" for 2s after a successful write; clipboard failures
// (no permission, insecure context) are a graceful no-op.

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { site } from "@/lib/content";
import { CheckIcon, CopyIcon } from "./contact-icons";

const SPRING = { type: "spring", stiffness: 380, damping: 26 } as const;

export default function CopyEmailButton() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link on the card still works.
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className={`relative z-10 grid h-10 w-10 place-items-center rounded-lg border border-rule transition-colors hover:border-rule-strong hover:text-paper ${
            copied ? "text-accent-green" : "text-paper-mid"
          }`}
          {...(reduced
            ? {}
            : { whileHover: { scale: 1.08 }, whileTap: { scale: 0.94 } })}
          transition={SPRING}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : "Copy"}</TooltipContent>
    </Tooltip>
  );
}
