import { TESTIMONIALS } from "../../data/testimonials";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { TestimonialListItem } from "./testimonial-list-item";

export function Testimonials() {
  return (
    <Panel id="testimonials">
      <PanelHeader>
        <PanelTitle>
          Testimonials
          <PanelTitleSup>({TESTIMONIALS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      {TESTIMONIALS.map((item) => (
        <div key={item.url} className="border-b border-edge">
          <TestimonialListItem testimonial={item} />
        </div>
      ))}
    </Panel>
  );
}
