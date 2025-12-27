import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { UX_PROJECTS } from "@/features/portfolio/data/ux-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/cv"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const projects = UX_PROJECTS.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...projects];
}
