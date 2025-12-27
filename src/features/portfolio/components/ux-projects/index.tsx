"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, GlobeIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { UX_PROJECTS } from "../../data/ux-projects";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";

export function UXProjects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Panel id="ux-projects">
      <PanelHeader>
        <PanelTitle>Featured UX Projects</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {UX_PROJECTS.map((project) => {
            const isExpanded = expandedId === project.id;
            
            return (
            <div
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-edge bg-background shadow-sm transition-all hover:shadow-md"
            >
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={cn(
                      "object-contain p-4",
                      (project.id === "Keeta-redesign" || project.id === "snb-mobile") && "rounded-[35px]"
                    )}
                    unoptimized
                  />
                )}
              </div>

              {/* Project Content */}
              <div className="flex flex-1 flex-col gap-3 border-t border-edge p-4">
                {/* Title and Actions */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-tight text-balance">
                    {project.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-1">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Visit ${project.title}`}
                      >
                        <GlobeIcon className="size-4" />
                      </a>
                    )}
                    {project.status !== "building" && (
                      project.figmaUrl ? (
                        <a
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`View ${project.title} in Figma`}
                        >
                          <ArrowUpRightIcon className="size-4" />
                        </a>
                      ) : (
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`View ${project.title} details`}
                        >
                          <ArrowUpRightIcon className="size-4" />
                        </Link>
                      )
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="relative">
                  <p
                    className={cn(
                      "text-sm text-muted-foreground transition-all duration-300",
                      !isExpanded && "line-clamp-2"
                    )}
                  >
                    {project.description}
                  </p>
                  
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="mt-1 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={isExpanded ? "Show less" : "Read more"}
                  >
                    <span>{isExpanded ? "Show less" : "Read more"}</span>
                    <ChevronDownIcon
                      className={cn(
                        "size-3 transition-transform duration-300",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-edge bg-muted/50 px-2 py-0.5 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="mt-auto flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2 py-1 font-medium",
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
                        "size-1.5 rounded-full",
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
              </div>
            </div>
            );
          })}
        </div>
      </PanelContent>
    </Panel>
  );
}

