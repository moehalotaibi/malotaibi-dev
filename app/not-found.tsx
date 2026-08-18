import type { Metadata } from "next";
import NotFoundPlayground from "@/components/system/not-found-playground";

export const metadata: Metadata = {
  title: "404",
  description: "This frame doesn't exist. The page was deleted, moved, or never drawn.",
  robots: { index: false },
};

// Server shell (metadata) — the playground itself is a client component.
export default function NotFound() {
  return <NotFoundPlayground />;
}
