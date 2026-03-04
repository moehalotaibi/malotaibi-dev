"use client";

import { format } from "date-fns";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { getIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { Certification } from "../../types/certifications";

export function CertificationItem({
  className,
  certification,
}: {
  className?: string;
  certification: Certification;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasCourses = certification.courses && certification.courses.length > 0;

  return (
    <div className={cn("group/cert", className)}>
      <a
        className="flex items-center pr-2 hover:bg-accent2"
        href={certification.credentialURL}
        target="_blank"
        rel="noopener"
      >
        {certification.issuerLogoURL ? (
          <Image
            src={certification.issuerLogoURL}
            alt={certification.issuer}
            width={32}
            height={32}
            quality={100}
            className="mx-4 flex size-6 shrink-0 select-none"
            unoptimized
            aria-hidden
          />
        ) : (
          <div
            className={cn(
              "mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg select-none",
              "border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background",
              "bg-muted text-muted-foreground [&_svg]:size-4"
            )}
            aria-hidden
          >
            {getIcon(certification.issuerIconName) ?? <ShieldCheckIcon />}
          </div>
        )}

        <div className="flex-1 space-y-1 border-l border-dashed border-edge p-4 pr-2">
          <h3 className="leading-snug font-medium text-balance underline-offset-4 group-hover/cert:underline">
            {certification.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <dl>
              <dt className="sr-only">Issued by</dt>
              <dd>
                <span aria-hidden>@</span>
                <span className="ml-0.5">{certification.issuer}</span>
              </dd>
            </dl>

            <Separator
              className="data-[orientation=vertical]:h-4"
              orientation="vertical"
            />

            <dl>
              <dt className="sr-only">Issued on</dt>
              <dd>
                <time
                  dateTime={new Date(certification.issueDate).toISOString()}
                >
                  {format(new Date(certification.issueDate), "dd.MM.yyyy")}
                </time>
              </dd>
            </dl>
          </div>
        </div>

        {certification.credentialURL && (
          <ArrowUpRightIcon
            className="size-4 text-muted-foreground"
            aria-hidden
          />
        )}
      </a>

      {hasCourses && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="ml-14 flex w-full items-center gap-2 border-t border-dashed border-edge px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent2 hover:text-foreground"
          >
            <BookOpenIcon className="size-3.5" />
            <span>
              {expanded
                ? "Hide courses"
                : `View ${certification.courses!.length} courses`}
            </span>
            <ChevronDownIcon
              className={cn(
                "size-3 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>

          {expanded && (
            <div className="ml-14 animate-in border-t border-dashed border-edge duration-200 fade-in slide-in-from-top-1">
              <ul className="space-y-0">
                {certification.courses!.map((course, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {i + 1}
                    </span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
