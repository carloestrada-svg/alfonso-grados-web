"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/ui/MagneticButton";
import type { NormalizedEvent } from "@/lib/ghl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function weekdayFor(raw: string): string {
  if (!raw) return "";
  const d = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

type RowProps = { index: number; event: NormalizedEvent };

function EventRow({ index, event }: RowProps) {
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dayRef = useRef<HTMLSpanElement | null>(null);
  const cityRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const indexRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const t = titleRef.current;
      const d = dayRef.current;
      const c = cityRef.current;
      const bar = barRef.current;
      const ix = indexRef.current;
      if (!el || !t || !d || !c || !bar || !ix) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(t, {
          x: 6,
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(d, {
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(c, {
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(ix, {
          scale: 1.2,
          duration: 0.55,
          ease: "back.out(2)"
        });
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto"
        });
      };
      const onLeave = () => {
        gsap.to(t, {
          x: 0,
          color: "#0A1F44",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(d, {
          color: "#0A1F44",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(c, {
          color: "rgba(10,31,68,0.65)",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(ix, { scale: 1, duration: 0.55, ease: "power3.out" });
        gsap.to(bar, {
          scaleX: 0,
          duration: 0.6,
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

  const month = event.date.month;
  const day = event.date.day;
  const weekday = weekdayFor(event.date.raw);

  return (
    <Link
      ref={rootRef}
      href={`/events/${event.id}`}
      data-event
      className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-foreground/15 py-7 last:border-b sm:gap-10 lg:py-9"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />

      <div className="flex items-baseline gap-3">
        <span
          ref={indexRef}
          className="inline-block origin-left font-display text-[13px] italic text-brand-red will-change-transform"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex items-baseline gap-2 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
          <span>{month}</span>
          <span
            ref={dayRef}
            className="font-display not-italic text-foreground/90 will-change-[color]"
            style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.1rem)" }}
          >
            {day}
          </span>
          <span className="hidden text-foreground/45 sm:inline">
            {weekday}
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          ref={titleRef}
          className="font-display font-normal leading-[1.15] tracking-[-0.015em] text-foreground will-change-[transform,color]"
          style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
        >
          {event.title}
        </h3>
        <span
          ref={cityRef}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/65 will-change-[color]"
        >
          <span>{event.city}</span>
          <span aria-hidden className="h-px w-4 bg-foreground/25" />
          <span className="normal-case tracking-normal text-foreground/55">
            {event.time}
          </span>
        </span>
      </div>

      <span className="hidden font-display text-[20px] italic text-brand-red sm:inline">
        →
      </span>
    </Link>
  );
}

export function UpcomingEvents({ events }: { events: NormalizedEvent[] }) {
  const ref = useRef<HTMLElement | null>(null);
  const upcoming = events.slice(0, 3);

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
          duration: 0.85,
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
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">06</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Upcoming events</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Town halls, canvass launches, roundtables. The door is open —
              bring a neighbor.
            </p>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
              >
                Where we&rsquo;ll be{" "}
                <em className="italic text-brand-red">this month</em>.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 flex flex-col lg:mt-24">
          {upcoming.map((e, i) => (
            <EventRow key={e.id} index={i} event={e} />
          ))}
        </div>

        <div data-reveal className="mt-12 flex">
          <MagneticButton href="/events" variant="ghost" size="md">
            See all events
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
