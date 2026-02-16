import { ArrowUpRightIcon, QuoteIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { Testimonial } from "../../types/testimonials";

export function TestimonialListItem({
  className,
  testimonial,
}: {
  className?: string;
  testimonial: Testimonial;
}) {
  return (
    <a
      className={cn(
        "group/testimonial flex items-center pr-2 hover:bg-accent2",
        className
      )}
      href={testimonial.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="mx-4 flex size-6 shrink-0 select-none">
        <img
          src={testimonial.authorAvatar}
          alt={testimonial.authorName}
          className="size-6 rounded-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-1 border-l border-dashed border-edge p-4 pr-2">
        <h3 className="leading-snug font-medium underline-offset-4 group-hover/testimonial:underline">
          {testimonial.authorName}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{testimonial.authorTagline}</span>
        </div>

        <div className="flex items-start gap-1.5 pt-1 text-sm text-muted-foreground">
          <QuoteIcon
            className="mt-0.5 size-3 shrink-0 rotate-180"
            aria-hidden
          />
          <p className="line-clamp-2 italic">{testimonial.quote}</p>
        </div>
      </div>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" aria-hidden />
    </a>
  );
}
