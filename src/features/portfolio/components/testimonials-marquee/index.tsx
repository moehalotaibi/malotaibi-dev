import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

import { TESTIMONIALS } from "../../data/testimonials";
import { Panel } from "../panel";
import { TestimonialItem } from "./testimonial-item";

export function TestimonialsMarquee() {
  return (
    <Panel
      id="testimonials-marquee"
      className="before:z-11 after:z-10 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
    >
      <h2 className="sr-only">Testimonials</h2>

      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent>
          {TESTIMONIALS.slice()
            .sort((a, b) => a.authorName.localeCompare(b.authorName))
            .map((item) => (
              <MarqueeItem
                key={item.url}
                className="mx-0 h-full w-xs border-r border-edge"
              >
                <TestimonialItem {...item} />
              </MarqueeItem>
            ))}
        </MarqueeContent>
      </Marquee>
    </Panel>
  );
}
