"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { candidate } from "@/lib/data/candidate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function animateCounter(el: HTMLElement) {
  const raw = el.dataset.value ?? el.textContent ?? "";
  const match = raw.match(/([\d,.]+)/);
  if (!match) return;

  const target = parseFloat(match[1].replace(/,/g, ""));
  if (Number.isNaN(target)) return;

  const prefix = raw.slice(0, match.index ?? 0);
  const suffix = raw.slice((match.index ?? 0) + match[1].length);
  const hasDecimal = match[1].includes(".");

  const state = { n: 0 };
  gsap.to(state, {
    n: target,
    duration: 2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    onUpdate() {
      const formatted = hasDecimal
        ? state.n.toFixed(1)
        : Math.round(state.n).toLocaleString();
      el.textContent = `${prefix}${formatted}${suffix}`;
    }
  });
}

export function Stats() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-stat]", { opacity: 1, y: 0 });
        return;
      }

      ref.current
        ?.querySelectorAll<HTMLElement>("[data-counter]")
        .forEach((el) => animateCounter(el));

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
        "[data-stat]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 76%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "expo.out",
          transformOrigin: "left center",
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
    <section
      ref={ref}
      className="relative overflow-hidden bg-foreground text-brand-cream"
    >
      <div className="container py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-brand-cream/55">
              <span className="tabular-nums">04</span>
              <span className="h-px w-8 bg-brand-cream/25" />
              <span>The Campaign</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-brand-cream/60">
              No corporate PACs. No Super PAC coordination. Just people
              chipping in what they can — average donation $28.
            </p>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-brand-cream">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
              >
                Fueled by Californians —{" "}
                <em className="italic text-brand-red">
                  zip code by zip code
                </em>
                .
              </span>
            </h2>
          </div>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <div
            data-rule
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-brand-cream/20"
          />

          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {candidate.stats.map((s, i) => (
              <div
                key={s.label}
                data-stat
                className={cn(
                  "flex flex-col gap-6 px-6 py-10 lg:px-8 lg:py-14",
                  (i === 0 || i === 2) &&
                    "border-r border-brand-cream/15",
                  i !== 3 && "lg:border-r lg:border-brand-cream/15",
                  (i === 0 || i === 1) &&
                    "border-b border-brand-cream/15 lg:border-b-0"
                )}
              >
                <dt className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-brand-cream/55">
                  <span className="font-display italic text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.label}</span>
                </dt>
                <dd
                  data-counter
                  data-value={s.value}
                  className="font-display font-normal leading-[0.95] tracking-[-0.02em] text-brand-cream"
                  style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)" }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
