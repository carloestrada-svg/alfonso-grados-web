"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/data/navigation";
import { candidate } from "@/lib/data/candidate";

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

function NavLink({ href, label, active }: NavLinkProps) {
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const bottomRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const top = topRef.current;
      const bot = bottomRef.current;
      if (!el || !top || !bot) return;

      gsap.set(bot, { yPercent: 110 });

      const onEnter = () => {
        gsap.to(top, { yPercent: -110, duration: 0.7, ease: "expo.out" });
        gsap.to(bot, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      };
      const onLeave = () => {
        gsap.to(top, { yPercent: 0, duration: 0.75, ease: "expo.out" });
        gsap.to(bot, { yPercent: 110, duration: 0.75, ease: "expo.out" });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <Link
      ref={rootRef}
      href={href}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-2 text-[14.5px] font-medium tracking-tight transition-colors",
        active ? "text-white" : "text-white/60 hover:text-white"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1 w-1 rounded-full transition-all duration-300",
          active ? "bg-brand-red opacity-100" : "bg-brand-red opacity-0"
        )}
      />
      <span
        aria-hidden
        className="relative inline-block overflow-hidden"
        style={{ height: "1.2em" }}
      >
        <span
          ref={topRef}
          className="inline-flex h-[1.2em] items-center will-change-transform"
        >
          {label}
        </span>
        <span
          ref={bottomRef}
          className="absolute left-0 top-0 inline-flex h-[1.2em] items-center will-change-transform"
        >
          {label}
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navItems = primaryNav.filter((n) => n.href !== "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-brand-navy text-white transition-all duration-300",
        scrolled
          ? "shadow-[0_8px_40px_-12px_rgba(10,31,68,0.5)]"
          : "shadow-none"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-white/10 transition-opacity",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className={cn(
          "container flex items-center justify-between gap-10 transition-[height] duration-300",
          scrolled ? "h-[68px]" : "h-[84px]"
        )}
      >
        <Link
          href="/"
          aria-label={`${candidate.fullName} homepage`}
          className="group flex items-baseline gap-[3px]"
        >
          <span className="font-display text-[1.8rem] leading-none tracking-tight text-white">
            {candidate.lastName}
          </span>
          <span className="font-display text-[1.8rem] leading-none text-brand-red">
            .
          </span>
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <nav
            className="hidden items-center lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={pathname.startsWith(item.href)}
              />
            ))}
          </nav>

          <span
            aria-hidden
            className="hidden h-6 w-px bg-white/15 lg:block"
          />

          <MagneticButton
            href="/volunteer"
            variant="invert"
            size="md"
            className="hidden sm:inline-flex"
          >
            Súmate
          </MagneticButton>

          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
