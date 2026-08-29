"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

import { MagneticButton } from "@/components/ui/MagneticButton";

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

      gsap.set("[data-bg]", { scale: 1.06, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to("[data-bg]", {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "expo.out"
      })
        .from(
          "[data-reveal='meta']",
          { opacity: 0, y: 12, duration: 0.8 },
          "-=1.3"
        )
        .from(
          "[data-line] > span",
          { yPercent: 115, duration: 1.15, stagger: 0.09 },
          "-=1.0"
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
        yPercent: 8,
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

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[calc(100svh-70px)] sm:min-h-[calc(100vh-86px)] lg:min-h-0 lg:h-[clamp(680px,78vh,820px)] flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F9D500] via-[#F9D500] to-[#EEEC98] text-brand-black"
    >
      {/* Desktop Image: Alfonso Saludo (Anchored flush to bottom-0 of Hero section) */}
      <div
        data-bg
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[2%] xl:right-[5%] 2xl:right-[8%] z-0 hidden h-[84%] max-h-[660px] min-h-[500px] w-[46%] max-w-[680px] items-end justify-end lg:flex will-change-transform"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/campaign/alfonso-saludo-web.webp"
            alt="Alfonso Grados saludando"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 680px"
            className="object-contain object-bottom drop-shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      <div className="container relative z-10 flex flex-1 flex-col justify-between py-4 sm:py-5 lg:py-5">
        {/* Top Eyebrow Bar */}
        <div
          data-reveal="meta"
          className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.22em] text-brand-black/75 sm:text-[13px] sm:tracking-[0.24em]"
        >
          <span className="tabular-nums">2026</span>
          <span className="hidden sm:inline">
            Yanahuara · Arequipa
          </span>
          <span className="h-px flex-1 bg-black/15" />
          <span className="hidden sm:inline">Alfonso Grados · Alcalde</span>
        </div>

        {/* Main Content: Left Column on Desktop */}
        <div className="my-auto py-2 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-2">
          {/* Left Column: Slogan, Cargo, Buttons */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h1 className="font-display font-black leading-[0.92] tracking-[-0.03em] text-brand-black">
              <span
                className="block overflow-hidden"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)" }}
                data-line
              >
                <span className="block">El Sol</span>
              </span>
              <span
                className="mt-1 block overflow-hidden"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)" }}
                data-line
              >
                <span className="block text-brand-red">
                  volverá a brillar
                </span>
              </span>
              <span
                className="mt-1 block overflow-hidden"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)" }}
                data-line
              >
                <span className="block">en Yanahuara.</span>
              </span>
            </h1>

            <p
              data-reveal="pitch"
              className="mt-3.5 max-w-xl text-[16px] font-bold leading-[1.4] text-brand-black/85 sm:mt-4 sm:text-[18px]"
            >
              Alfonso Grados · Alcalde de Yanahuara
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
              <div data-reveal="cta">
                <MagneticButton
                  href="/sumate"
                  variant="solid"
                  size="lg"
                  className="!bg-brand-red !text-white !border-brand-red hover:!bg-[#c81915] font-bold shadow-md"
                >
                  Súmate
                </MagneticButton>
              </div>
              <div data-reveal="cta">
                <MagneticButton
                  href="/conoce-a-alfonso"
                  variant="ghost"
                  size="lg"
                  className="!border-brand-black/40 !text-brand-black hover:!border-brand-black hover:!bg-black/5 font-bold"
                >
                  Conoce a Alfonso
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Image: Alfonso Retrato */}
        <div
          data-bg
          aria-hidden
          className="pointer-events-none relative -mx-4 -mb-4 mt-2 flex justify-center lg:hidden will-change-transform"
        >
          <div className="relative h-[32vh] max-h-[320px] min-h-[220px] w-full max-w-[220px]">
            <Image
              src="/images/campaign/alfonso-retrato-web.webp"
              alt="Alfonso Grados"
              fill
              sizes="(max-width: 1023px) 70vw, 220px"
              className="object-contain object-bottom drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          data-reveal="scroll"
          className="relative z-20 pointer-events-none mt-2 flex items-center justify-between border-t border-black/15 pt-3 text-[12px] font-bold uppercase tracking-[0.22em] text-brand-black/60 sm:text-[13px] sm:tracking-[0.24em]"
        >
          <span className="hidden sm:inline">
            Alfonso Grados · Yanahuara, Arequipa
          </span>
          <span className="flex items-center gap-3">
            Scroll
            <span aria-hidden className="h-px w-8 bg-black/30" />
            <ArrowDown
              className="h-4 w-4 animate-bounce text-brand-black/70"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
