"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatDate } from "@/lib/utils";
import { news } from "@/lib/data/news";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NewsTeaser() {
  const ref = useRef<HTMLElement | null>(null);
  const [hero, ...rest] = news.slice(0, 4);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-news-item]", { opacity: 1, y: 0 });
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
        "[data-news-item]",
        { opacity: 0, y: 28 },
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
    <section ref={ref} className="relative bg-brand-cream">
      <div className="container py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <div
            data-reveal
            className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-foreground/55"
          >
            <span className="tabular-nums">06</span>
            <span className="h-px w-8 bg-foreground/25" />
            <span>From the campaign</span>
          </div>
          <h2
            data-reveal
            className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
          >
            <span
              className="block"
              style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
            >
              Latest news &{" "}
              <em className="italic text-brand-red">statements</em>.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <Link
            href={`/news/${hero.slug}`}
            data-news-item
            className="group flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${hero.image})` }}
              />
            </div>

            <div className="mt-7 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="text-brand-red">{hero.category}</span>
              <span className="h-px w-6 bg-foreground/25" />
              <time dateTime={hero.date}>{formatDate(hero.date)}</time>
              <span className="hidden h-px flex-1 bg-foreground/15 sm:block" />
              <span className="hidden sm:inline">{hero.readTime}</span>
            </div>

            <h3
              className="mt-5 font-display font-normal leading-[1.08] tracking-[-0.015em] text-foreground transition-colors group-hover:text-brand-red"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
            >
              {hero.title}
            </h3>

            <p className="mt-4 max-w-xl text-[16px] leading-[1.55] text-foreground/65">
              {hero.excerpt}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.24em] text-brand-red">
              <span className="font-display italic">01</span>
              <span className="h-px w-8 bg-brand-red/50" />
              Read the story
            </span>
          </Link>

          <div className="flex flex-col">
            {rest.map((item, i) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                data-news-item
                className="group flex gap-5 border-t border-foreground/15 py-6 last:border-b sm:gap-7 sm:py-7"
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                    <span className="font-display italic text-brand-red">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/70">{item.category}</span>
                    <span className="h-px w-4 bg-foreground/20" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>

                  <h3 className="mt-3 font-display text-[1.1rem] font-normal leading-[1.2] tracking-[-0.01em] text-foreground transition-colors group-hover:text-brand-red sm:text-[1.2rem]">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-foreground/60">
                    {item.excerpt}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="relative aspect-square w-20 shrink-0 overflow-hidden bg-foreground/5 sm:w-24"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              </Link>
            ))}

            <div
              data-reveal
              className="mt-10 flex justify-start lg:mt-12"
            >
              <MagneticButton href="/news" variant="ghost" size="lg">
                All news
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
