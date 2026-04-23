"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  /** CSS selector to target multiple children inside the container */
  selector?: string;
  /** Disable if the user prefers reduced motion */
  respectReducedMotion?: boolean;
};

/**
 * Scroll-reveal hook.
 *
 * Returns a ref you attach to a container. Items (or the container itself)
 * fade + rise into place when they enter the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced =
      options.respectReducedMotion !== false &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Make sure nothing stays hidden if motion is disabled
      const items = options.selector
        ? ref.current.querySelectorAll<HTMLElement>(options.selector)
        : [ref.current];
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const {
        y = 24,
        x = 0,
        opacity = 0,
        duration = 0.9,
        delay = 0,
        stagger = 0.12,
        start = "top 85%",
        selector
      } = options;

      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector, ref.current!)
        : [ref.current as HTMLElement];

      gsap.fromTo(
        targets,
        { opacity, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options]);

  return ref;
}
