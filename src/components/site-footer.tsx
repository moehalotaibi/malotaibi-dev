import { RssIcon } from "lucide-react";
import Link from "next/link";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-8" />
      </div>
    </footer>
  );
}

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
