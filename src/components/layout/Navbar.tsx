"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/data/navigation";

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
      aria-label={label}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-2 text-[14.5px] font-bold tracking-tight transition-colors",
        active ? "text-brand-black" : "text-brand-black/75 hover:text-brand-black"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-all duration-300",
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
          className="inline-flex h-[1.2em] items-center will-change-transform font-bold"
        >
          {label}
        </span>
        <span
          ref={bottomRef}
          className="absolute left-0 top-0 inline-flex h-[1.2em] items-center will-change-transform font-bold text-brand-red"
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
        "sticky top-0 z-40 w-full bg-brand-yellow text-brand-black transition-all duration-300",
        scrolled
          ? "shadow-[0_6px_24px_-4px_rgba(0,0,0,0.12)]"
          : "shadow-none"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-black/10 transition-opacity",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-[height] duration-300",
          scrolled ? "h-[70px]" : "h-[86px]"
        )}
      >
        <Link
          href="/"
          aria-label="Alfonso Grados - Alcalde de Yanahuara"
          className="group flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.02]"
        >
          <Image
            src="/images/campaign/alfonso-grados-logo.webp"
            alt="Alfonso Grados - Alcalde de Yanahuara"
            width={390}
            height={147}
            priority
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-11 sm:h-12" : "h-12 sm:h-14"
            )}
          />
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <nav
            className="hidden items-center lg:flex"
            aria-label="Navegación principal"
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
            className="hidden h-6 w-px bg-black/15 lg:block"
          />

          <ThemeToggle />

          <MagneticButton
            href="/sumate"
            variant="solid"
            size="md"
            className="hidden sm:inline-flex !bg-brand-red !text-white !border-brand-red hover:!bg-[#c81915] font-bold shadow-sm"
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
