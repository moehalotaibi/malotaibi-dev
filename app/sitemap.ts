import type { MetadataRoute } from "next";
import { caseStudies, projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/case-studies", "/projects", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const studyRoutes = caseStudies.map((study) => ({
    url: `${site.url}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // NYX has its own page; the others come from each project's `slug`.
  const projectRoutes = [
    "nyx",
    ...projects.flatMap((project) => (project.slug ? [project.slug] : [])),
  ].map((slug) => ({
    url: `${site.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...studyRoutes, ...projectRoutes];
}
