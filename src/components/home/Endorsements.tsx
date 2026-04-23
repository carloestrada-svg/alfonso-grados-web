"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const groups = [
  {
    category: "Labor",
    count: 22,
    orgs: [
      "California Nurses Association",
      "SEIU 1021",
      "California Federation of Teachers",
      "United Farm Workers",
      "UAW Local 2865",
      "Teamsters Joint Council 7"
    ]
  },
  {
    category: "Advocacy",
    count: 14,
    orgs: [
      "Sierra Club California",
      "Planned Parenthood Affiliates",
      "Asian Americans Advancing Justice",
      "Working Families Party",
      "California YIMBY",
      "Equality California"
    ]
  },
  {
    category: "Community",
    count: 40,
    orgs: [
      "Oakland Rising Action",
      "LA Voice",
      "Fresno Barrios Unidos",
      "San Diego Organizing Project",
      "Community Coalition (LA)",
      "Central Valley Urban Institute"
    ]
  }
];

type OrgProps = { name: string };

function OrgRow({ name }: OrgProps) {
  const rootRef = useRef<HTMLLIElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = rootRef.current;
      const t = textRef.current;
      const bar = barRef.current;
      if (!el || !t || !bar) return;

      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      const onEnter = () => {
        gsap.to(t, {
          x: 6,
          color: "#C8102E",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(bar, {
          scaleX: 1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto"
        });
      };
      const onLeave = () => {
        gsap.to(t, {
          x: 0,
          color: "#0A1F44",
          duration: 0.5,
          ease: "expo.out"
        });
        gsap.to(bar, {
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
      className="relative border-t border-foreground/15 py-4 last:border-b"
    >
      <span
        ref={barRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-red will-change-transform"
      />
      <span
        ref={textRef}
        className="inline-block font-display text-[16px] leading-snug tracking-[-0.01em] text-foreground will-change-[transform,color]"
      >
        {name}
      </span>
    </li>
  );
}

export function Endorsements() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-group]", { opacity: 1, y: 0 });
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
        "[data-group]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
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

  const totalOrgs = groups.reduce((a, g) => a + g.count, 0);

  return (
    <section ref={ref} className="relative bg-background">
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">03</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Endorsements</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              {totalOrgs}+ organizations have signed on — representing more
              than a million Californians.
            </p>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
              >
                Backed by the people who{" "}
                <em className="italic text-brand-red">do the work</em>.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-3 lg:gap-16">
          {groups.map((g, i) => (
            <div
              key={g.category}
              data-group
              className={cn(
                "flex flex-col gap-6",
                i > 0 && "lg:border-l lg:border-foreground/15 lg:pl-12"
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                  <span className="font-display italic text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{g.category}</span>
                </h3>
                <span
                  className="font-display font-normal leading-none tracking-[-0.02em] text-foreground"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)" }}
                >
                  {g.count}
                </span>
              </div>

              <ul className="flex flex-col">
                {g.orgs.map((o) => (
                  <OrgRow key={o} name={o} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
