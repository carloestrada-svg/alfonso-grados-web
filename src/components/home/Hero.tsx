"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          "[data-reveal], [data-line] > span, [data-bg]",
          { opacity: 1, yPercent: 0, scale: 1 }
        );
        return;
      }

      gsap.set("[data-bg]", { scale: 1.15 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to("[data-bg]", {
        scale: 1,
        duration: 1.8,
        ease: "expo.out"
      })
        .from(
          "[data-reveal='meta']",
          { opacity: 0, y: 12, duration: 0.8 },
          "-=1.4"
        )
        .from(
          "[data-line] > span",
          { yPercent: 115, duration: 1.15, stagger: 0.09 },
          "-=1.1"
        )
        .from(
          "[data-reveal='pitch']",
          { opacity: 0, y: 18, duration: 0.85 },
          "-=0.75"
        )
        .from(
          "[data-reveal='cta']",
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
          "-=0.55"
        )
        .from(
          "[data-reveal='scroll']",
          { opacity: 0, y: 10, duration: 0.6 },
          "-=0.4"
        );

      gsap.to("[data-bg]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: root }
  );

  const [tag1] = candidate.tagline.split(". ");

  return (
    <section
      ref={root}
      className="relative isolate flex flex-col overflow-hidden bg-[#0a0a0f] text-white"
    >
      <div
        data-bg
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.75)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/70" />
      </div>

      <div className="container relative flex flex-col pb-10 pt-5 lg:pb-12 lg:pt-6">
        <div
          data-reveal="meta"
          className="flex items-center gap-5 text-[12px] font-medium uppercase tracking-[0.24em] text-white/75"
        >
          <span className="tabular-nums">01 / 2026</span>
          <span className="hidden sm:inline">
            {candidate.state} · {candidate.office.replace("U.S. ", "")}
          </span>
          <span className="h-px flex-1 bg-white/20" />
          <span className="hidden sm:inline">The Morgan Campaign</span>
        </div>

        <div className="mt-8 max-w-5xl sm:mt-10 lg:mt-12">
          <h1 className="font-display font-normal leading-[0.95] tracking-[-0.02em]">
            <span
              className="block overflow-hidden"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              data-line
            >
              <span className="block">{tag1}.</span>
            </span>
            <span
              className="mt-1 block overflow-hidden"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              data-line
            >
              <span className="block">
                A shared{" "}
                <em className="italic text-brand-red">future</em>.
              </span>
            </span>
          </h1>

          <p
            data-reveal="pitch"
            className="mt-8 max-w-xl text-[17px] leading-[1.55] text-white/80 sm:text-[18px]"
          >
            Two decades in public service — city council, state assembly,
            and now ready to fight for California in the U.S. Senate.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div data-reveal="cta">
              <MagneticButton
                href="/get-involved#donate"
                variant="invert"
                size="lg"
              >
                Chip in $10
              </MagneticButton>
            </div>
            <div data-reveal="cta">
              <MagneticButton
                href="/policies"
                variant="ghost"
                size="lg"
                className="!border-white/30 !text-white hover:!border-white"
              >
                Read the plan
              </MagneticButton>
            </div>
          </div>
        </div>

        <div
          data-reveal="scroll"
          className="pointer-events-none mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-[12px] font-medium uppercase tracking-[0.24em] text-white/55 lg:mt-14"
        >
          <span className="hidden sm:inline">
            {candidate.fullName} · Sacramento, CA
          </span>
          <span className="flex items-center gap-3">
            Scroll
            <span aria-hidden className="h-px w-10 bg-white/40" />
          </span>
        </div>
      </div>
    </section>
  );
}
