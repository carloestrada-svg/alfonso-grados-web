"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Split by word and stagger into place */
  splitBy?: "word" | "char";
};

/**
 * Animated heading: splits text into spans and staggers them in on scroll.
 * Falls back gracefully if reduced motion is preferred.
 */
export function AnimatedHeading({
  text,
  className,
  as: Tag = "h2",
  splitBy = "word"
}: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      ref.current
        .querySelectorAll<HTMLElement>("[data-split]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-split]",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: splitBy === "word" ? 0.06 : 0.02,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [splitBy]);

  const parts = splitBy === "word" ? text.split(" ") : Array.from(text);

  return (
    <Tag ref={ref} className={cn("font-display tracking-tight", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap justify-inherit">
        {parts.map((part, i) => (
          <span
            key={i}
            className="overflow-hidden inline-block"
            style={{ marginRight: splitBy === "word" ? "0.25em" : undefined }}
          >
            <span data-split className="inline-block opacity-0">
              {part === " " ? " " : part}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
