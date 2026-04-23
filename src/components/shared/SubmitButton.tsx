"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
  dependencies?: unknown[];
};

export function SubmitButton({
  children,
  className,
  theme = "light",
  dependencies
}: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const labelTop = useRef<HTMLSpanElement | null>(null);
  const labelBot = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);

  useGSAP(
    () => {
      const el = btnRef.current;
      const lt = labelTop.current;
      const lb = labelBot.current;
      const ic = iconRef.current;
      const ring = ringRef.current;
      if (!el || !lt || !lb || !ic || !ring) return;

      gsap.set(lb, { yPercent: 110 });
      gsap.set(ring, { strokeDashoffset: 90 });

      const onEnter = () => {
        gsap.to(lt, { yPercent: -110, duration: 0.45, ease: "expo.out" });
        gsap.to(lb, { yPercent: 0, duration: 0.45, ease: "expo.out" });
        gsap.to(ic, { rotate: 45, duration: 0.5, ease: "back.out(2)" });
        gsap.to(ring, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power3.out"
        });
      };
      const onLeave = () => {
        gsap.to(lt, { yPercent: 0, duration: 0.5, ease: "expo.out" });
        gsap.to(lb, { yPercent: 110, duration: 0.5, ease: "expo.out" });
        gsap.to(ic, { rotate: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(ring, {
          strokeDashoffset: 90,
          duration: 0.7,
          ease: "power3.out"
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: btnRef, dependencies: dependencies ?? [] }
  );

  const dark = theme === "dark";

  return (
    <button
      ref={btnRef}
      type="submit"
      className={cn(
        "group relative inline-flex items-center gap-4 rounded-full border pl-6 pr-5 py-2.5 text-[16px] font-medium tracking-tight transition-colors duration-500",
        dark
          ? "border-white bg-white text-foreground hover:border-brand-cream hover:bg-brand-cream"
          : "border-foreground bg-foreground text-background hover:border-[#08182e] hover:bg-[#08182e]",
        className
      )}
    >
      <span
        aria-hidden
        className="relative inline-block overflow-hidden"
        style={{ height: "1.4em" }}
      >
        <span
          ref={labelTop}
          className="inline-flex h-[1.4em] items-center leading-none will-change-transform"
        >
          {children}
        </span>
        <span
          ref={labelBot}
          className="absolute left-0 top-0 inline-flex h-[1.4em] items-center leading-none will-change-transform"
        >
          {children}
        </span>
      </span>

      <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
        >
          <circle
            cx="16"
            cy="16"
            r="14.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.18"
          />
          <circle
            ref={ringRef}
            cx="16"
            cy="16"
            r="14.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="90"
            strokeDashoffset="90"
            strokeLinecap="round"
          />
        </svg>
        <span
          ref={iconRef}
          className="inline-flex h-3 w-3 items-center justify-center will-change-transform"
        >
          <ArrowUpRight className="h-full w-full" strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}
