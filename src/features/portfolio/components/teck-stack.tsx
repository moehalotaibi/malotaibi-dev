import Image from "next/image";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

type IconKey = keyof typeof Icons;

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <TooltipProvider>
          <ul className="flex flex-wrap gap-4 select-none">
            {TECH_STACK.map((tech) => {
              const hasLocalIcon = tech.key in Icons;
              const IconComponent = hasLocalIcon
                ? Icons[tech.key as IconKey]
                : null;
              const useLocalImage = [
                "cursor",
                "after-effects",
                "illustrator",
                "indesign",
                "photoshop",
                "premiere",
              ].includes(tech.key);

              return (
                <li key={tech.key} className="flex">
                  <TooltipRoot>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tech.title}
                        />
                      }
                    >
                      {useLocalImage ? (
                        <Image
                          src={`/images/${tech.key}.png`}
                          alt={`${tech.title} icon`}
                          width={40}
                          height={40}
                          className={cn(
                            "h-10 w-10 object-contain",
                            [
                              "after-effects",
                              "illustrator",
                              "indesign",
                              "photoshop",
                              "premiere",
                            ].includes(tech.key) && "rounded-md"
                          )}
                          unoptimized
                        />
                      ) : hasLocalIcon && IconComponent ? (
                        <IconComponent className="h-10 w-10" />
                      ) : tech.theme ? (
                        <>
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`}
                            alt={`${tech.title} light icon`}
                            width={40}
                            height={40}
                            className="hidden h-10 w-10 object-contain [html.light_&]:block"
                            unoptimized
                          />
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                            alt={`${tech.title} dark icon`}
                            width={40}
                            height={40}
                            className="hidden h-10 w-10 object-contain [html.dark_&]:block"
                            unoptimized
                          />
                        </>
                      ) : (
                        <Image
                          src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                          alt={`${tech.title} icon`}
                          width={40}
                          height={40}
                          className="h-10 w-10 object-contain"
                          unoptimized
                        />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </TooltipRoot>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </PanelContent>
    </Panel>
  );
}
