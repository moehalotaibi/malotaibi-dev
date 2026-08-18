"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/content";
import { UI } from "@/components/icons";
import Magnetic from "@/components/motion/magnetic";

const MotionLink = motion.create(Link);

/** Spring for the active-pill glide between nav items. */
const PILL_SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

export default function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Two nav items anchor into /work, so the active pill needs the hash too.
  // usePathname drops it; track it manually (hashchange covers back/forward,
  // onClick covers same-page anchor jumps that don't fire hashchange).
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);

  const activeHref = useMemo(() => {
    const onPath = nav.filter((item) => {
      const path = item.href.split("#")[0];
      return path === "/" ? pathname === "/" : pathname.startsWith(path);
    });
    if (onPath.length === 0) return null;
    const hashMatch = onPath.find(
      (item) =>
        item.href.includes("#") && `#${item.href.split("#")[1]}` === hash,
    );
    return (hashMatch ?? onPath[0]).href;
  }, [pathname, hash]);

  const tap = reduced ? {} : { whileTap: { scale: 0.97 } };

  return (
    <header className="sticky top-0 z-40 py-3">
      <div className="shell flex items-center justify-between gap-3">
        {/* Logo pill */}
        <Magnetic strength={0.2}>
          <MotionLink
            href="/"
            aria-label={`${site.name} home`}
            className="flex items-center gap-2 rounded-full border border-rule bg-ink/80 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-rule-strong"
            {...tap}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cream"
              aria-hidden="true"
              {...(reduced
                ? {}
                : {
                    animate: { scale: [1, 1.25, 1] },
                    transition: {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  })}
            />
            <span className="font-mono text-[0.875rem] font-bold tracking-tight text-cream">
              {site.name}
            </span>
          </MotionLink>
        </Magnetic>

        {/* Center nav pill */}
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 rounded-full border border-rule bg-ink/80 p-1.5 backdrop-blur-md">
            {nav.map((item) => {
              const active = item.href === activeHref;

              return (
                <li key={item.href}>
                  <MotionLink
                    href={item.href}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={() =>
                      setHash(
                        item.href.includes("#")
                          ? `#${item.href.split("#")[1]}`
                          : "",
                      )
                    }
                    className={`relative flex items-center gap-2 rounded-full px-3 py-2 font-mono text-micro uppercase tracking-[0.1em] transition-colors max-lg:min-h-[44px] max-lg:min-w-[44px] max-lg:justify-center sm:px-4 ${
                      active
                        ? "text-accent-blue"
                        : "text-paper-mid hover:text-paper"
                    }`}
                    {...(reduced
                      ? {}
                      : { whileHover: { y: -1 }, whileTap: { scale: 0.97 } })}
                  >
                    {active &&
                      (reduced ? (
                        <span
                          className="absolute inset-0 rounded-full bg-white/[0.06]"
                          aria-hidden="true"
                        />
                      ) : (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.06]"
                          transition={PILL_SPRING}
                          aria-hidden="true"
                        />
                      ))}
                    <UI name={item.icon} className="relative h-3.5 w-3.5" />
                    <span className="relative hidden whitespace-nowrap md:inline">
                      {item.label}
                    </span>
                  </MotionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact pill */}
        <Magnetic strength={0.2}>
          <MotionLink
            href="/contact"
            aria-label="Contact Me"
            className="flex items-center justify-center gap-2 rounded-full border border-rule bg-ink/80 px-4 py-2.5 font-mono text-micro uppercase tracking-[0.1em] text-paper-mid backdrop-blur-md transition-colors hover:border-rule-strong hover:text-paper max-lg:min-h-[44px]"
            {...(reduced
              ? {}
              : { whileHover: { y: -1 }, whileTap: { scale: 0.97 } })}
          >
            <UI name="mail" className="h-3.5 w-3.5" />
            <span className="hidden whitespace-nowrap lg:inline">Contact Me</span>
          </MotionLink>
        </Magnetic>
      </div>
    </header>
  );
}
