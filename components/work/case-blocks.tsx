// Long-form block renderer for case studies whose content is more than
// intro + items + images (Diwan). Server-compatible: the only client pieces
// are the imported MotionReveal and Zoomable.
//
// Every block uses the site's own vocabulary (hairline rules, mono labels,
// .card, the browser-chrome ShotFrame) so a block-based study reads like
// the item-based ones beside it. Screens keep their natural proportions and
// open full size on click.

import Image from "next/image";
import MotionReveal from "@/components/motion/motion-reveal";
import ShotFrame from "@/components/shot-frame";
import { withArabic } from "@/components/work/arabic";
import Zoomable from "@/components/work/zoomable";
import type { CaseBlock, CaseImage, CaseTone } from "@/lib/case-studies";
import type { Accent } from "@/lib/content";
import {
  accentBg,
  accentBgSoft,
  accentBorder,
  accentText,
} from "@/lib/accents";

// How wide each kind of figure renders, so next/image fetches the right
// rendition. The reading column is ~864px at desktop (shell 1200 − gutters
// − 200px rail − gap).
const SIZES = {
  full: "(min-width: 1200px) 864px, (min-width: 1024px) calc(100vw - 340px), calc(100vw - 2.5rem)",
  half: "(min-width: 1200px) 422px, (min-width: 1024px) calc(50vw - 180px), (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2.5rem)",
  split:
    "(min-width: 1200px) 512px, (min-width: 1024px) calc(60vw - 210px), calc(100vw - 2.5rem)",
  phone: "(min-width: 1024px) 170px, (min-width: 640px) 22vw, 168px",
} as const;

// Phone exports already carry the device's corner radius; clip to the same
// proportion (28px on a 196px-wide screen) at any rendered size.
const PHONE_RADIUS = "rounded-[14.3%/6.6%]";

const TONE: Record<CaseTone, string> = {
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  red: "text-accent-red",
};

const pad = (n: number) => String(n).padStart(2, "0");

const BODY = "text-meta leading-relaxed text-paper-mid";

function Caption({ image }: { image: CaseImage }) {
  if (!image.caption && !image.captionLead) return null;
  return (
    <figcaption className="mt-3 max-w-[70ch] text-meta text-paper-mid">
      {image.captionLead ? (
        <b className="font-semibold text-paper">{image.captionLead}</b>
      ) : null}
      {image.captionLead && image.caption ? " " : null}
      {image.caption}
    </figcaption>
  );
}

/** A desktop screen or board in the site's browser frame, zoomable. */
function Shot({ image, sizes }: { image: CaseImage; sizes: string }) {
  return (
    <figure>
      <Zoomable
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
      >
        <ShotFrame
          title={image.name ?? image.alt}
          aspect={image.crop ?? image.width / image.height}
          image={image.thumb ?? image.src}
          imageAlt={image.alt}
          sizes={sizes}
          cornerLabel={false}
          // "full page" only when the tile really hides most of the image.
          hint={
            image.crop && image.width / image.height < image.crop * 0.8
              ? "// full page"
              : "// zoom"
          }
        />
      </Zoomable>
      <Caption image={image} />
    </figure>
  );
}

/** A phone screen: no browser chrome, just the device outline. */
function PhoneShot({ image }: { image: CaseImage }) {
  return (
    <figure className="snap-start">
      <Zoomable
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        radiusClassName={PHONE_RADIUS}
      >
        <div
          className={`overflow-hidden border border-rule bg-raised ${PHONE_RADIUS}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={SIZES.phone}
            className="h-auto w-full"
          />
        </div>
      </Zoomable>
      <Caption image={image} />
    </figure>
  );
}

function Block({ block, accent }: { block: CaseBlock; accent: Accent }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="max-w-[64ch] space-y-4">
          {block.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                block.lead && i === 0
                  ? "text-lead text-paper"
                  : "text-body text-paper-mid"
              }
            >
              {withArabic(paragraph)}
            </p>
          ))}
        </div>
      );

    case "heading":
      return (
        <>
          <h3 className="font-display text-h3 font-semibold text-cream">
            {block.text}
          </h3>
          {block.note ? (
            <p className="mt-2 max-w-[64ch] text-body text-paper-mid">
              {block.note}
            </p>
          ) : null}
        </>
      );

    case "rows":
      return (
        <ol className="border-b border-rule">
          {block.items.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-t border-rule py-5 md:grid-cols-[2.5rem_15rem_1fr]"
            >
              <span
                className={`font-mono text-meta font-bold tabular-nums ${accentText[accent]}`}
                aria-hidden="true"
              >
                {pad(i + 1)}
              </span>
              <h3 className="text-body font-semibold text-cream">
                {item.title}
              </h3>
              <p className={`col-start-2 md:col-start-3 ${BODY}`}>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      );

    case "question":
      return (
        <figure className={`border-s-2 ps-6 ${accentBorder[accent]}`}>
          <figcaption className={`label ${accentText[accent]}`}>
            {block.label}
          </figcaption>
          <p className="mt-3 max-w-[40ch] font-display text-h3 font-semibold text-cream">
            {block.text}
          </p>
        </figure>
      );

    case "quotes":
      return (
        <div className="grid gap-x-12 border-b border-rule sm:grid-cols-2">
          {block.items.map((item) => (
            <figure key={item.who} className="border-t border-rule py-5">
              <figcaption className="text-body font-semibold text-cream">
                {item.who}
              </figcaption>
              <blockquote className="mt-1.5 text-body italic text-paper-mid">
                {`“${item.quote}”`}
              </blockquote>
            </figure>
          ))}
        </div>
      );

    case "figure":
      return <Shot image={block.image} sizes={SIZES.full} />;

    case "figures":
      return (
        <div className="grid items-start gap-x-5 gap-y-10 sm:grid-cols-2">
          {block.images.map((image) => (
            <Shot key={image.src} image={image} sizes={SIZES.half} />
          ))}
        </div>
      );

    case "cards":
      return (
        <ol className="grid gap-4 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li key={item.title} className="card p-6">
              {block.numbered ? (
                <span
                  className={`block font-mono text-meta font-bold tabular-nums ${accentText[accent]}`}
                  aria-hidden="true"
                >
                  {pad(i + 1)}
                </span>
              ) : null}
              <h3
                className={`text-body font-semibold text-cream ${
                  block.numbered ? "mt-4" : ""
                }`}
              >
                {item.title}
              </h3>
              <p className={`mt-2 ${BODY}`}>{item.body}</p>
            </li>
          ))}
        </ol>
      );

    case "notes":
      return (
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.title} className="border-t border-rule pt-5">
              <div className="flex items-center gap-3">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentBg[accent]}`}
                  aria-hidden="true"
                />
                <h3 className="text-body font-medium text-cream">
                  {item.title}
                </h3>
              </div>
              <p className={`mt-2 ${BODY}`}>{item.body}</p>
            </div>
          ))}
        </div>
      );

    case "swatches":
      return (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {block.items.map((swatch) => (
            <li key={swatch.name} className="card overflow-hidden">
              <span
                className="block h-20 border-b border-rule"
                style={{ background: swatch.hex }}
                aria-hidden="true"
              />
              <div className="p-4">
                <p className="text-body font-semibold text-cream">
                  {swatch.name}
                </p>
                <p className="label mt-0.5 normal-case tracking-normal">
                  {swatch.hex}
                </p>
                <p className={`mt-2 ${BODY}`}>{swatch.use}</p>
              </div>
            </li>
          ))}
        </ul>
      );

    case "screens":
      return (
        <div className="space-y-14">
          {block.items.map((item) => (
            <article key={item.image.src}>
              <Shot image={item.image} sizes={SIZES.full} />
              <div className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-[9rem_1fr]">
                <p className="label sm:pt-2">{item.label}</p>
                <div>
                  <h3 className="font-display text-h3 font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-body text-paper-mid">
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item, i) => (
            <li key={item.title} className="border-t-2 border-rule-strong pt-4">
              <span
                className={`block font-mono text-meta font-bold tabular-nums ${accentText[accent]}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h4 className="mt-2 text-body font-semibold text-cream">
                {item.title}
              </h4>
              <p className={`mt-1.5 ${BODY}`}>{item.body}</p>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <table className="w-full border-collapse text-left">
          <thead className="max-md:hidden">
            <tr>
              {block.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="label border-b border-rule-strong pb-3 pe-4 font-normal"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr
                key={row.name}
                className="border-b border-rule align-top max-md:block max-md:py-4"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap text-body font-semibold text-cream max-md:block md:py-4 md:pe-6"
                >
                  {row.name}
                </th>
                <td className="max-md:block max-md:py-1 md:py-4 md:pe-6">
                  <span
                    className={`inline-flex items-center gap-2 whitespace-nowrap text-meta font-semibold ${TONE[row.tone]}`}
                  >
                    <span
                      className="h-2 w-2 rounded-full bg-current"
                      aria-hidden="true"
                    />
                    {row.needs}
                  </span>
                </td>
                <td
                  className={`max-md:block max-md:py-1 md:py-4 md:pe-6 ${BODY}`}
                >
                  {row.examples}
                </td>
                <td className={`max-md:block max-md:py-1 md:py-4 ${BODY}`}>
                  {row.how}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "callout":
      return (
        <div className={`rounded-2xl p-6 md:p-7 ${accentBgSoft[accent]}`}>
          <h3 className="text-body font-semibold text-cream">{block.title}</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {block.items.map((item) => (
              <p key={item.title} className={BODY}>
                <b className="mb-1 block font-semibold text-cream">
                  {item.title}
                </b>
                {item.body}
              </p>
            ))}
          </div>
        </div>
      );

    case "split":
      return (
        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Shot image={block.image} sizes={SIZES.split} />
          <div>
            {block.aside ? (
              <>
                <h3 className="text-body font-semibold text-cream">
                  {block.aside.title}
                </h3>
                <p className={`mt-1.5 ${BODY}`}>{block.aside.body}</p>
              </>
            ) : null}
            {block.phones ? (
              <div
                className={`grid gap-4 ${
                  block.phones.length > 1
                    ? "max-w-[21rem] grid-cols-2"
                    : "max-w-[13.75rem]"
                } ${block.aside ? "mt-5" : ""}`}
              >
                {block.phones.map((image) => (
                  <PhoneShot key={image.src} image={image} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      );

    case "tabs":
      return (
        <dl className="grid gap-5 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.title} className="border-t border-rule-strong pt-3">
              <dt className="text-body font-semibold text-cream">
                {item.title}
              </dt>
              <dd className={`mt-1 ${BODY}`}>{item.body}</dd>
            </div>
          ))}
        </dl>
      );

    case "phones":
      // A swipeable row on phones (it bleeds to the screen edge so the next
      // screen peeks in); a full grid from the sm breakpoint up, so nothing
      // is hidden off to the side on a laptop.
      return (
        <div
          role="group"
          aria-label={block.label}
          className={`grid snap-x snap-mandatory auto-cols-[10.5rem] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-4 max-sm:-mx-[var(--gutter)] max-sm:scroll-ps-[var(--gutter)] max-sm:px-[var(--gutter)] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-4 sm:overflow-visible sm:pb-0 ${
            block.columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"
          }`}
        >
          {block.images.map((image) => (
            <PhoneShot key={image.src} image={image} />
          ))}
        </div>
      );

    case "next":
      return (
        <ol className="grid gap-5 sm:grid-cols-3">
          {block.items.map((item, i) => (
            <li key={item.title} className="border-t-2 border-cream pt-4">
              <span
                className={`block font-mono text-meta font-bold tabular-nums ${accentText[accent]}`}
                aria-hidden="true"
              >
                {pad(i + 1)}
              </span>
              <h3 className="mt-2 text-body font-semibold text-cream">
                {item.title}
              </h3>
              <p className={`mt-1 ${BODY}`}>{item.body}</p>
            </li>
          ))}
        </ol>
      );
  }
}

// Vertical rhythm: prose hugs what it introduces, a sub-heading opens a new
// beat, everything else sits a full step below.
const GAP: Partial<Record<CaseBlock["type"], string>> = {
  prose: "mt-6",
  heading: "mt-14",
};

type Props = {
  blocks: CaseBlock[];
  /** The study accent: indexes, dots, the question spine, the callout. */
  accent: Accent;
};

export default function CaseBlocks({ blocks, accent }: Props) {
  return (
    <>
      {blocks.map((block, i) => (
        <MotionReveal
          // Blocks are static per study; position is a stable identity.
          key={`${block.type}-${i}`}
          y={12}
          className={GAP[block.type] ?? "mt-10"}
        >
          <Block block={block} accent={accent} />
        </MotionReveal>
      ))}
    </>
  );
}
