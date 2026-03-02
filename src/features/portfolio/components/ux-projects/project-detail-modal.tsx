"use client";

import { ArrowUpRightIcon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import type { UXProject } from "../../types/ux-projects";

interface ProjectDetailModalProps {
  project: UXProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  const screenshots = project?.screenshots ?? [];
  const [lightboxSrc, setLightboxSrc] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value && lightboxSrc) {
        setLightboxSrc(null);
        return;
      }
      if (!value) {
        setLightboxSrc(null);
      }
      onOpenChange(value);
    },
    [lightboxSrc, onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {project && (
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
          <div className="max-h-[85vh] overflow-y-auto">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-5 px-6 pt-5 pb-6">
              <DialogHeader className="gap-3">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl">{project.title}</DialogTitle>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                      project.status === "operational" &&
                        "bg-green-500/10 text-green-600 dark:text-green-400",
                      project.status === "building" &&
                        "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                      project.status === "finalizing" &&
                        "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                      project.status === "completed" &&
                        "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        project.status === "operational" && "bg-green-500",
                        project.status === "building" && "bg-orange-500",
                        project.status === "finalizing" && "bg-purple-500",
                        project.status === "completed" && "bg-blue-500"
                      )}
                    />
                    {project.status === "operational" && "Operational"}
                    {project.status === "building" && "Building"}
                    {project.status === "finalizing" && "Finalizing"}
                    {project.status === "completed" && "Completed"}
                  </span>
                </div>
                <DialogDescription>{project.description}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-edge bg-muted/50 px-2.5 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Design Screenshots</h4>
                {screenshots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {screenshots.map((shot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightboxSrc(shot)}
                        className="relative aspect-video cursor-zoom-in overflow-hidden rounded-lg border border-edge bg-muted/30 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-edge py-10 text-muted-foreground">
                    <ImageIcon className="size-8 opacity-40" />
                    <p className="text-sm">No screenshots yet</p>
                  </div>
                )}
              </div>

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-edge bg-muted/50 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent2"
                >
                  View My Design
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}
            </div>
          </div>

          {lightboxSrc && (
            <div
              className="fixed inset-0 z-[200] flex animate-in items-center justify-center bg-black/90 backdrop-blur-sm duration-200 fade-in"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxSrc(null);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxSrc(null);
                }}
                className="absolute top-4 right-4 z-[201] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <XIcon className="size-5" />
              </button>
              <div
                className="relative h-[90vh] w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxSrc.src}
                  alt={lightboxSrc.alt}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
