"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { events, type CampaignEvent } from "@/lib/data/events";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function formatEventDate(iso: string) {
  const date = new Date(iso);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return { month, day, weekday };
}

type RowProps = {
  index: number;
  event: CampaignEvent;
};

function EventRow({ index, event }: RowProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dayRef = useRef<HTMLSpanElement | null>(null);
  const monthRef = useRef<HTMLSpanElement | null>(null);
  const cityRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const indexRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const t = titleRef.current;
      const d = dayRef.current;
      const m = monthRef.current;
      const c = cityRef.current;
      const bar = barRef.current;
      const ix = indexRef.current;
      if (!el || !t || !d || !m || !c || !bar || !ix) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(t, {
          x: 8,
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(d, {
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(m, {
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
          scale: 1.25,
          duration: 0.55,
          ease: "back.out(2)"
        });
        gsap.to(bar, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.85,
          ease: "power3.out"
        });
      };
      const onLeave = () => {
        gsap.to(t, {
          x: 0,
          color: "#0A1F44",
          duration: 0.6,
          ease: "expo.out"
        });
        gsap.to(d, {
          color: "#0A1F44",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(m, {
          color: "rgba(10,31,68,0.55)",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(c, {
          color: "rgba(10,31,68,0.65)",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(ix, {
          scale: 1,
          duration: 0.55,
          ease: "power3.out"
        });
        gsap.to(bar, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.65,
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
    { scope: rootRef }
  );

  const { month, day, weekday } = formatEventDate(event.date);

  return (
    <article
      ref={rootRef}
      data-event
      className="relative grid grid-cols-[auto_1fr] gap-y-6 gap-x-6 border-t border-foreground/15 py-10 last:border-b sm:gap-x-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-16 lg:py-14"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />

      <div className="flex flex-col items-start gap-1">
        <span
          ref={monthRef}
          className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55 will-change-[color]"
        >
          <span
            ref={indexRef}
            className="inline-block origin-left font-display italic text-brand-red will-change-transform"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{month}</span>
          <span aria-hidden className="h-px w-4 bg-foreground/25" />
          <span>{weekday}</span>
        </span>
        <span
          ref={dayRef}
          className="font-display font-normal leading-[0.92] tracking-[-0.02em] text-foreground will-change-[color]"
          style={{ fontSize: "clamp(3rem, 5.5vw, 4.5rem)" }}
        >
          {day}
        </span>
      </div>

      <div className="flex flex-col gap-3 lg:max-w-xl">
        <h3
          ref={titleRef}
          className="font-display font-normal leading-[1.02] tracking-[-0.015em] text-foreground will-change-[transform,color]"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}
        >
          <Link
            href={`/events/${event.id}`}
            className="hover:text-brand-red"
          >
            {event.title}
          </Link>
        </h3>
        <span
          ref={cityRef}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/65 will-change-[color]"
        >
          <span>{event.city}</span>
          <span aria-hidden className="h-px w-4 bg-foreground/25" />
          <span className="normal-case tracking-normal text-foreground/55">
            {event.venue}
          </span>
          <span aria-hidden className="h-px w-4 bg-foreground/25" />
          <span>{event.time}</span>
        </span>
        <p className="max-w-xl text-[15px] leading-[1.6] text-foreground/60">
          {event.description}
        </p>
      </div>

      <div className="col-span-2 lg:col-span-1 lg:justify-self-end">
        <MagneticButton
          href={`/events/${event.id}`}
          variant="ghost"
          size="md"
        >
          View event
        </MagneticButton>
      </div>
    </article>
  );
}

export function EventsList() {
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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
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
              <span className="tabular-nums">01</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Upcoming</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Bring a friend. Bring a question. Bring your whole block — the
              door&rsquo;s open.
            </p>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2rem, 4.8vw, 3.1rem)" }}
              >
                Four stops,{" "}
                <em className="italic text-brand-red">one state</em>.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 flex flex-col lg:mt-24">
          {events.map((e, i) => (
            <EventRow key={e.id} index={i} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
