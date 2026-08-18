# moe. — portfolio

Next.js 16 App Router · TypeScript · Tailwind v3. Dark multi-accent design: near-black ground, cream display type, and a six-color accent system (violet / amber / cyan / green / pink, blue reserved for nav-active). Server-rendered by default; the only client components are `components/nav.tsx` (needs `usePathname`) and `components/reveal.tsx` (needs `IntersectionObserver`).

## Run

```bash
npm install
npm run dev
```

## Architecture

- **`lib/content.ts`** — every word of copy and all page data. Pages contain no literal copy; edit content here.
- **`lib/accents.ts`** — accent-color class maps. Data carries an `accent` key; components look the class up here. Class strings stay literal so Tailwind's scanner sees them.
- **`components/`** — `nav` (pill nav with icons), `footer` (card grid + giant cropped wordmark), `section-header` (heading + rule + circular badge), `case-study-row`, `project-row` (bordered bullet card), `shot-frame` (fake-browser placeholder for every image slot), `segments` (multi-color sentences), `reveal` (scroll-in animation), `icons` (stroke UI icons + simple-icons brand glyphs; LinkedIn is inlined — removed upstream).

## Design decisions

- **Fonts:** Space Grotesk (display), Inter (body), Space Mono (labels and `//` comments), Archivo Black (footer wordmark only).
- **One accent per element.** Sentences get colored words via `Segment[]` data; sections, metrics, and org names each carry a single `accent` key.
- **Motion budget:** fade + 14px rise, 700ms, staggered. Hidden state is gated behind `@media (scripting: enabled)`, so crawlers and no-JS users get visible content; `prefers-reduced-motion` short-circuits it in CSS and JS.
- **Placeholders:** `ShotFrame` renders a fake browser frame wherever a real screenshot belongs (projects, timeline, portrait). Replace by swapping in `next/image` per slot when assets exist.

## Before shipping

- Replace placeholder metrics in `lib/content.ts` with real, defensible numbers.
- Fill real profile URLs in `socials` (`lib/content.ts`) — currently bare domains.
- Add `/work/[slug]` case-study pages; `case-study-row.tsx` has a note where the deep link goes back in.
- Swap `ShotFrame` placeholders for real screenshots.
- Add an `og-image.png` (1200×630) in `public/`.

## RTL

Layout uses logical properties where it matters (`margin-inline`, `padding-inline`, `border-s`/`ps-*` on the timeline), so an Arabic route mostly works by setting `dir="rtl"` on `<html>`. The hero annotations' left/right positions and `ProjectRow`'s `flipped` ordering need checking. Pair with IBM Plex Sans Arabic or Noto Kufi Arabic — neither Space Mono nor Archivo Black has Arabic coverage.
