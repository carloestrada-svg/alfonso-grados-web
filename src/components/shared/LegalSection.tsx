"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  bg?: "background" | "cream";
};

export function LegalSection({
  index,
  label,
  title,
  children,
  bg = "background"
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className={bg === "cream" ? "relative bg-brand-cream" : "relative bg-background"}
    >
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div
            data-reveal
            className="flex items-start gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55"
          >
            <span className="font-display italic text-brand-red">{index}</span>
            <span className="mt-[0.6em] h-px w-8 bg-foreground/25" />
            <span>{label}</span>
          </div>
          <div data-reveal className="flex flex-col gap-5">
            <h2
              className="font-display font-normal leading-[1.08] tracking-[-0.015em] text-foreground"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.1rem)" }}
            >
              {title}
            </h2>
            <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-foreground/70">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
