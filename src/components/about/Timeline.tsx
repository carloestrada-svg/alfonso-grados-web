"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { timeline } from "@/lib/data/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type EventProps = {
  index: number;
  year: string;
  title: string;
  description: string;
};

function TimelineEvent({ index, year, title, description }: EventProps) {
  const rootRef = useRef<HTMLLIElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const y = yearRef.current;
      const t = titleRef.current;
      const b = barRef.current;
      if (!el || !y || !t || !b) return;

      gsap.set(b, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(y, {
          color: "#E4221E",
          fontStyle: "italic",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(t, {
          x: 6,
          color: "#E4221E",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(b, {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto"
        });
      };
      const onLeave = () => {
        gsap.to(y, {
          color: "#0A0A0A",
          fontStyle: "normal",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(t, {
          x: 0,
          color: "#0A0A0A",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(b, {
          scaleX: 0,
          duration: 0.55,
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

  return (
    <li
      ref={rootRef}
      data-event
      className="relative grid grid-cols-1 gap-4 border-t border-foreground/15 py-10 last:border-b lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] lg:gap-x-20 lg:py-12"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />

      <div className="flex items-baseline gap-4">
        <span className="font-display text-[15px] italic text-brand-red">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          ref={yearRef}
          className="font-display font-normal leading-none tracking-[-0.02em] text-foreground will-change-[color,font-style]"
          style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
        >
          {year}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3
          ref={titleRef}
          className="font-display font-normal leading-[1.15] tracking-[-0.015em] text-foreground will-change-[transform,color]"
          style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.8rem)" }}
        >
          {title}
        </h3>
        <p className="max-w-2xl text-[15px] leading-[1.6] text-foreground/65">
          {description}
        </p>
      </div>
    </li>
  );
}

export function Timeline() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-event]", { opacity: 1, y: 0 });
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
        "[data-event]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={cn("relative bg-brand-cream")}>
      <div className="container py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">02</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Trayectoria</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Comunicación, experiencia pública y compromiso con Yanahuara.
            </p>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2rem, 4.8vw, 3.1rem)" }}
              >
                Experiencia puesta al{" "}
                <em className="italic text-brand-red">servicio del distrito</em>.
              </span>
            </h2>
          </div>
        </div>

        <ol className="mt-16 flex flex-col lg:mt-24">
          {timeline.map((t, i) => (
            <TimelineEvent
              key={t.year}
              index={i}
              year={t.year}
              title={t.title}
              description={t.description}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
