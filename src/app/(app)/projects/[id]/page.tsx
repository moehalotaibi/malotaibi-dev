import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel";
import { UX_PROJECTS } from "@/features/portfolio/data/ux-projects";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return UX_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = UX_PROJECTS.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = UX_PROJECTS.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
      {/* Back Button */}
      <div className="mb-4 border-x border-edge px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Portfolio
        </Link>
      </div>

      <Separator />

      {/* Project Header */}
      <Panel>
        <PanelHeader>
          <PanelTitle>{project.title}</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-6">
          {/* Project Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-edge bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Detailed Description */}
          {project.detailedDescription && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">About the Project</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.detailedDescription}
              </p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Challenges</h2>
              <ul className="space-y-2 text-muted-foreground">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-foreground">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          {project.solutions && project.solutions.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Solutions</h2>
              <ul className="space-y-2 text-muted-foreground">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-foreground">✓</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video w-full overflow-hidden rounded-lg border border-edge"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-edge bg-muted/50 px-3 py-1.5 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Status</h2>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                project.status === "operational" &&
                  "bg-green-500/10 text-green-600 dark:text-green-400",
                project.status === "building" &&
                  "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                project.status === "completed" &&
                  "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  project.status === "operational" && "bg-green-500",
                  project.status === "building" && "bg-orange-500",
                  project.status === "completed" && "bg-blue-500"
                )}
              />
              {project.status === "operational" && "All Systems Operational"}
              {project.status === "building" && "Building"}
              {project.status === "completed" && "Completed"}
            </span>
          </div>

          {/* External Link */}
          {project.link && (
            <div className="pt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-edge bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
              >
                Visit Project
                <ArrowLeftIcon className="size-4 rotate-180" />
              </a>
            </div>
          )}
        </PanelContent>
      </Panel>

      <Separator />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}

