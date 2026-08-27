"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { candidate } from "@/lib/data/candidate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pullQuote = "El Sol volverá a brillar en Yanahuara.";

export function Biography() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          "[data-reveal], [data-para], [data-cap], [data-quote-word]",
          { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }
        );
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
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-image]",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-cap]",
        { opacity: 0, y: 20, rotate: -4 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          delay: 0.2,
          scrollTrigger: {
            trigger: "[data-cap]",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-para]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-prose]",
            start: "top 78%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        "[data-quote-word]",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: "[data-pullquote]",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6
          }
        }
      );
    },
    { scope: ref }
  );

  const firstParagraph = candidate.longBio[0];
  const firstChar = firstParagraph.charAt(0);
  const firstRest = firstParagraph.slice(1);
  const restParagraphs = candidate.longBio.slice(1);

  const quoteWords = pullQuote.split(" ");

  return (
    <section ref={ref} className="relative bg-background">
      <div className="container py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div
            data-reveal
            className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55"
          >
            <span className="tabular-nums">01</span>
            <span className="h-px w-8 bg-foreground/25" />
            <span>Biografía</span>
          </div>

          <div data-reveal>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2rem, 4.8vw, 3.1rem)" }}
              >
                Una vida ligada a{" "}
                <em className="italic text-brand-red">Yanahuara</em>.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-5">
            <figure className="flex flex-col gap-4">
              <div
                data-image
                className="group relative aspect-[4/5] w-full overflow-hidden bg-foreground/5"
                style={{ clipPath: "inset(0 0 0 0)" }}
              >
                <Image
                  src="/images/campaign/alfonso-retrato-web.webp"
                  alt="Alfonso Grados, candidato a alcalde de Yanahuara"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top transition-all ease-out group-hover:scale-[1.04] will-change-transform [transition-duration:1200ms]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/[0.04]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-700 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 65%, rgba(10,31,68,0.08))"
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-5 left-5 h-px w-12 origin-left scale-x-0 bg-brand-red transition-transform duration-700 group-hover:scale-x-100"
                />
              </div>
              <figcaption className="flex items-center justify-between text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/50">
                <span className="flex items-center gap-2">
                  <span className="font-display italic text-brand-red">01</span>
                  <span>{candidate.fullName}</span>
                </span>
                <span>Yanahuara · 2026</span>
              </figcaption>
            </figure>
          </aside>

          <div
            data-prose
            className="flex flex-col gap-8 text-[17px] leading-[1.65] text-foreground/75 lg:col-span-7"
          >
            <p
              data-para
              className="text-[19px] leading-[1.55] text-foreground/90"
            >
              <span
                data-cap
                className="mr-2 float-left font-display italic text-brand-red will-change-transform"
                style={{
                  fontSize: "clamp(4.5rem, 8vw, 6.5rem)",
                  lineHeight: "0.82",
                  marginTop: "0.05em",
                  marginRight: "0.08em"
                }}
              >
                {firstChar}
              </span>
              {firstRest}
            </p>

            {restParagraphs.slice(0, 1).map((p, i) => (
              <p key={i} data-para>
                {p}
              </p>
            ))}

            <blockquote
              data-pullquote
              className="relative my-4 flex flex-col gap-4 border-y border-foreground/15 py-10"
            >
              <span className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="font-display italic text-brand-red">—</span>
                <span>Lema de campaña</span>
              </span>
              <p
                className="font-display font-normal italic leading-[1.18] tracking-[-0.01em] text-foreground"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.35rem)" }}
              >
                &ldquo;
                {quoteWords.map((w, i) => (
                  <span key={i} data-quote-word className="inline">
                    {w}
                    {i < quoteWords.length - 1 ? " " : ""}
                  </span>
                ))}
                &rdquo;
              </p>
            </blockquote>

            {restParagraphs.slice(1).map((p, i) => (
              <p key={i} data-para>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
