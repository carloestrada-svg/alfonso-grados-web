"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { values } from "@/lib/data/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CardProps = {
  title: string;
  description: string;
  columnIndex: number;
};

function CommitmentCard({ title, description, columnIndex }: CardProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const pronounRef = useRef<HTMLSpanElement | null>(null);
  const restRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const pr = pronounRef.current;
      const r = restRef.current;
      const bar = barRef.current;
      if (!el || !pr || !r || !bar) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(pr, {
          x: -4,
          scale: 1.15,
          duration: 0.6,
          ease: "back.out(2)"
        });
        gsap.to(r, {
          x: 8,
          color: "#E4221E",
          duration: 0.6,
          ease: "expo.out"
        });
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto"
        });
      };
      const onLeave = () => {
        gsap.to(pr, {
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        });
        gsap.to(r, {
          x: 0,
          color: "#0A0A0A",
          duration: 0.6,
          ease: "expo.out"
        });
        gsap.to(bar, {
          scaleX: 0,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto"
        });
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

  const isRightCol = columnIndex === 1 || columnIndex === 3;

  return (
    <article
      ref={rootRef}
      data-value
      className={cn(
        "relative flex flex-col gap-8 border-t border-foreground/15 py-12 lg:py-16",
        "sm:px-8 lg:px-12",
        isRightCol && "sm:border-l sm:border-foreground/15"
      )}
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />

      <h3
        className="font-display font-normal leading-[0.98] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "clamp(2rem, 4.2vw, 3.1rem)" }}
      >
        <span
          ref={pronounRef}
          className="mr-[0.18em] inline-block origin-right italic text-brand-red will-change-transform"
        >
          —
        </span>
        <span
          ref={restRef}
          className="inline-block will-change-[transform,color]"
        >
          {title}.
        </span>
      </h3>

      <p className="max-w-md text-[15px] leading-[1.65] text-foreground/65">
        {description}
      </p>
    </article>
  );
}

export function Values() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-value]", { opacity: 1, y: 0 });
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
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-value]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 76%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-background">
      <div className="container py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">03</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Valores</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Cuatro principios que orientan su forma de trabajar y servir.
            </p>
          </div>

          <div data-reveal className="flex flex-col gap-2 self-end">
            <span
              className="font-display italic leading-none text-foreground/80"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.2rem)" }}
            >
              Compromiso con Yanahuara
            </span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:mt-24">
          {values.map((v, i) => (
            <CommitmentCard
              key={v.title}
              columnIndex={i}
              title={v.title}
              description={v.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
