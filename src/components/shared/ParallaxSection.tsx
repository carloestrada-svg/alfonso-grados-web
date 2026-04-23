"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Max translation in px (positive = moves up as you scroll) */
  distance?: number;
};

/**
 * Lightweight parallax wrapper. The inner element translates vertically
 * as the outer enters/exits the viewport.
 */
export function ParallaxSection({ children, className, distance = 60 }: Props) {
  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!outer.current || !inner.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { y: distance },
        {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: outer.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, outer);

    return () => ctx.revert();
  }, [distance]);

  return (
    <div ref={outer} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
