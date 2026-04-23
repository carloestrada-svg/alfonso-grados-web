"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxItem = {
  selector: string;
  y?: number | string;
  x?: number | string;
  rotate?: number;
  scale?: number;
  opacity?: number;
};

type Options = {
  items: ParallaxItem[];
  start?: string;
  end?: string;
  scrub?: boolean | number;
};

/**
 * Scroll-linked parallax. Each item drifts by the given delta as the
 * container scrolls through the viewport. Respects reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  opts: Options
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      opts.items.forEach((item) => {
        const targets = gsap.utils.toArray<HTMLElement>(
          item.selector,
          ref.current!
        );
        if (!targets.length) return;

        gsap.to(targets, {
          y: item.y ?? 0,
          x: item.x ?? 0,
          rotate: item.rotate ?? 0,
          scale: item.scale,
          opacity: item.opacity,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current!,
            start: opts.start ?? "top bottom",
            end: opts.end ?? "bottom top",
            scrub: opts.scrub ?? true
          }
        });
      });
    }, ref);

    return () => ctx.revert();
    // intentionally run once — callers pass stable option shapes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
