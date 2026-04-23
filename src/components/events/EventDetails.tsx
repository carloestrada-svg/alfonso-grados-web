"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ExternalLink } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { RSVPForm } from "@/components/events/RSVPForm";
import { cn } from "@/lib/utils";
import { events, type CampaignEvent } from "@/lib/data/events";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function formatLong(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatShortDay(iso: string) {
  const d = new Date(iso);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: String(d.getDate()).padStart(2, "0"),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" })
  };
}

type RelatedRowProps = {
  index: number;
  event: CampaignEvent;
};

function RelatedRow({ index, event }: RelatedRowProps) {
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const t = titleRef.current;
      const n = numberRef.current;
      const bar = barRef.current;
      if (!el || !t || !n || !bar) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(t, {
          x: 6,
          color: "#C8102E",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(n, {
          scale: 1.2,
          duration: 0.55,
          ease: "back.out(2)"
        });
        gsap.to(bar, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.out"
        });
      };
      const onLeave = () => {
        gsap.to(t, {
          x: 0,
          color: "#0A1F44",
          duration: 0.55,
          ease: "expo.out"
        });
        gsap.to(n, { scale: 1, duration: 0.5, ease: "power3.out" });
        gsap.to(bar, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.6,
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

  const { month, day, weekday } = formatShortDay(event.date);

  return (
    <Link
      ref={rootRef}
      href={`/events/${event.id}`}
      data-related
      className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-foreground/15 py-6 last:border-b"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />
      <span
        ref={numberRef}
        className="inline-block origin-left font-display italic text-brand-red will-change-transform"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4
        ref={titleRef}
        className="font-display font-normal leading-[1.15] tracking-[-0.01em] text-foreground will-change-[transform,color]"
        style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
      >
        {event.title}
      </h4>
      <span className="flex items-baseline gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
        <span>{month}</span>
        <span className="font-display not-italic text-foreground/80">
          {day}
        </span>
        <span className="hidden sm:inline">{weekday}</span>
        <span aria-hidden className="hidden h-px w-6 bg-foreground/25 sm:block" />
        <span className="hidden sm:inline">{event.city}</span>
      </span>
    </Link>
  );
}

export function EventDetails({ event }: { event: CampaignEvent }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-related]", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-related]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-related-list]",
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: ref }
  );

  const otherEvents = events.filter((e) => e.id !== event.id);
  const mapQuery = encodeURIComponent(`${event.venue}, ${event.city}, CA`);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div ref={ref}>
      <section className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div
              data-reveal
              className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55"
            >
              <span className="tabular-nums">01</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Overview</span>
            </div>

            <div data-reveal className="flex flex-col gap-8">
              <h2 className="font-display font-normal leading-[1.1] tracking-[-0.015em] text-foreground">
                <span
                  className="block"
                  style={{ fontSize: "clamp(1.85rem, 4vw, 2.75rem)" }}
                >
                  {event.description.split(".")[0]}.
                </span>
              </h2>
              <p className="max-w-2xl text-[17px] leading-[1.65] text-foreground/70">
                {event.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <MagneticButton href="#rsvp" variant="solid" size="lg">
                  RSVP now
                </MagneticButton>
                <MagneticButton href="/events" variant="ghost" size="lg">
                  All events
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div
              data-reveal
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">02</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Where & when</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Doors usually open 30 minutes early. Accessible entrance at
                the front.
              </p>
            </div>

            <dl
              data-reveal
              className="flex flex-col border-y border-foreground/15"
            >
              {[
                { index: "01", label: "Date", value: formatLong(event.date) },
                { index: "02", label: "Time", value: `${event.time} PT` },
                { index: "03", label: "City", value: event.city },
                { index: "04", label: "Venue", value: event.venue }
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
                    i < arr.length - 1 && "border-b border-foreground/15"
                  )}
                >
                  <dt className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                    <span className="font-display italic text-brand-red">
                      {row.index}
                    </span>
                    <span>{row.label}</span>
                  </dt>
                  <dd
                    className="font-display font-normal leading-[1.1] tracking-[-0.015em] text-foreground"
                    style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)" }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-reveal className="lg:col-start-2">
              <Link
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-brand-red"
              >
                <MapPin
                  className="h-4 w-4 text-brand-red"
                  strokeWidth={1.8}
                />
                <span>Open in Google Maps</span>
                <span
                  aria-hidden
                  className="h-px w-8 bg-foreground/25 transition-colors group-hover:bg-brand-red/50"
                />
                <ExternalLink
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp" className="relative bg-background">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div data-reveal className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="tabular-nums">03</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>RSVP</span>
              </div>
              <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
                Reserve your spot. Doors fill early — we&rsquo;ll hold one
                for you.
              </p>
            </div>

            <div data-reveal>
              <RSVPForm event={event} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-cream">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
            <div
              data-reveal
              className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55"
            >
              <span className="tabular-nums">04</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Other stops</span>
            </div>

            <div data-reveal>
              <h3 className="font-display font-normal leading-[1.1] tracking-[-0.015em] text-foreground">
                <span
                  className="block"
                  style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.3rem)" }}
                >
                  See{" "}
                  <em className="italic text-brand-red">
                    the rest of the trail
                  </em>
                  .
                </span>
              </h3>
            </div>
          </div>

          <div data-related-list className="mt-10 flex flex-col lg:mt-14">
            {otherEvents.map((e, i) => (
              <RelatedRow key={e.id} index={i} event={e} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
