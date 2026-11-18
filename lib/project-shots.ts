// Screens for the project pages at /projects/[slug] (the four projects that
// are not case studies). Each file under public/work/projects/<slug>/ is a
// FULL page: the tile shows its top (`crop`), a click opens the whole page
// in the lightbox.
//
// Where they come from (2026-11-18):
//   agile-advice, labvision  captured from the live sites
//   grid-nova, ostoul        exported from Moe's Figma files
// Captions are page names only. Nothing here is invented copy.

import type { CaseImage } from "./case-studies";

// The tile ratio: roughly the first screenful of a 1440px-wide page.
const FOLD = 16 / 10;

const page = (
  slug: string,
  file: string,
  name: string,
  alt: string,
  width: number,
  height: number,
): CaseImage => ({
  src: `/work/projects/${slug}/${file}.jpg`,
  alt,
  width,
  height,
  name,
  caption: name,
  // Short pages (a single screen) show whole; long ones show their top,
  // from a pre-cut "-top" file so the tile never loads the full page.
  ...(width / height < FOLD
    ? { crop: FOLD, thumb: `/work/projects/${slug}/${file}-top.jpg` }
    : {}),
});

export const projectShots: Record<string, CaseImage[]> = {
  "agile-advice": [
    page("agile-advice", "home", "Home", "Agile Advice website, Home page in Arabic", 1440, 4672),
    page("agile-advice", "about", "About", "Agile Advice website, About page in Arabic", 1440, 4733),
    page("agile-advice", "services", "Services", "Agile Advice website, Services page in Arabic", 1440, 4205),
    page("agile-advice", "international", "International companies", "Agile Advice website, International companies page in Arabic", 1440, 3076),
    page("agile-advice", "diwan", "Diwan", "Agile Advice website, Diwan page in Arabic", 1440, 7037),
    page("agile-advice", "contact", "Contact", "Agile Advice website, Contact page in Arabic", 1440, 1757),
  ],
  labvision: [
    page("labvision", "home", "Home", "LABvision Academy, Home page in Arabic", 1440, 8658),
    page("labvision", "courses", "Courses", "LABvision Academy, Courses page in Arabic", 1440, 1426),
    page("labvision", "careers", "Career development", "LABvision Academy, Career development page in Arabic", 1440, 3364),
    page("labvision", "about", "About", "LABvision Academy, About page in Arabic", 1440, 2223),
  ],
  "grid-nova": [
    page("grid-nova", "home", "Home", "Grid Nova Energy website design, Home page", 1440, 8595),
    page("grid-nova", "services", "Services", "Grid Nova Energy website design, Services page", 1440, 5628),
    page("grid-nova", "projects", "Projects", "Grid Nova Energy website design, Projects page", 1440, 2892),
    page("grid-nova", "project-detail", "Project detail", "Grid Nova Energy website design, a project detail page", 1446, 3483),
    page("grid-nova", "careers", "Careers", "Grid Nova Energy website design, Careers page", 1440, 2676),
    page("grid-nova", "home-arabic", "Home, Arabic", "Grid Nova Energy website design, Arabic Home page", 1440, 8357),
  ],
  ostoul: [
    page("ostoul", "landing", "Landing page", "OSTOUL landing page design in Arabic", 1440, 3086),
    page("ostoul", "sign-up", "Sign up", "OSTOUL sign-up screen design", 1728, 1117),
    page("ostoul", "car-overview", "Car overview", "OSTOUL car overview screen design in Arabic", 1687, 1728),
    page("ostoul", "services", "Services", "OSTOUL services page design in Arabic", 1747, 1858),
    page("ostoul", "store", "Store", "OSTOUL store page design in Arabic", 1440, 2146),
    // The Analytics dashboard was removed on Moe's word (2026-11-18).
  ],
};
