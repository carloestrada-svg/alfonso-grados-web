"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { policies } from "@/lib/data/policies";
import { MagneticButton } from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CardProps = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  icon: LucideIcon;
  index: number;
  isFeature: boolean;
  col: string;
  row: string;
};

const RADIUS = 16;

function PolicyCard({
  slug,
  title,
  summary,
  details,
  icon: Icon,
  index,
  isFeature,
  col,
  row
}: CardProps) {
  const rootRef  = useRef<HTMLAnchorElement | null>(null);
  const pathRef  = useRef<SVGPathElement | null>(null);
  const labelTop = useRef<HTMLSpanElement | null>(null);
  const labelBot = useRef<HTMLSpanElement | null>(null);
  const arrow    = useRef<HTMLSpanElement | null>(null);
  const iconWrap = useRef<HTMLSpanElement | null>(null);
  const numberEl = useRef<HTMLSpanElement | null>(null);

  const perimeterRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    const sync = () => {
      const { width: W, height: H } = root.getBoundingClientRect();
      const r = Math.min(RADIUS, W / 2, H / 2);
      // Inset 1px so the 2px stroke stays inside the card edge.
      const x = 1, y = 1, w = W - 2, h = H - 2;

      const d = [
        `M ${x + r} ${y + h}`,
        `L ${x + w - r} ${y + h}`,
        `A ${r} ${r} 0 0 0 ${x + w} ${y + h - r}`,
        `L ${x + w} ${y + r}`,
        `A ${r} ${r} 0 0 0 ${x + w - r} ${y}`,
        `L ${x + r} ${y}`,
        `A ${r} ${r} 0 0 0 ${x} ${y + r}`,
        `L ${x} ${y + h - r}`,
        `A ${r} ${r} 0 0 0 ${x + r} ${y + h}`,
        "Z"
      ].join(" ");

      path.setAttribute("d", d);

      const p = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
      perimeterRef.current = p;

      path.style.strokeDasharray  = String(p);
      path.style.strokeDashoffset = String(p);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const path = pathRef.current;
      const lt   = labelTop.current;
      const lb   = labelBot.current;
      const ar   = arrow.current;
      const ic   = iconWrap.current;
      const nm   = numberEl.current;
      if (!root || !path || !lt || !lb || !ar || !ic || !nm) return;

      gsap.set(lb, { yPercent: 110 });

      let borderTween: gsap.core.Tween | null = null;

      const onEnter = () => {
        if (borderTween) { borderTween.kill(); borderTween = null; }
        const p = perimeterRef.current;
        gsap.set(path, { strokeDashoffset: p });

        gsap.to(root, { y: -6,          duration: 0.55, ease: "expo.out"    });
        gsap.to(lt,   { yPercent: -110, duration: 0.4,  ease: "expo.out"    });
        gsap.to(lb,   { yPercent: 0,    duration: 0.4,  ease: "expo.out"    });
        gsap.to(ar,   { rotate: 45,     duration: 0.5,  ease: "back.out(2)" });
        gsap.to(ic,   { rotate: -8, scale: 1.06, duration: 0.55, ease: "expo.out" });
        gsap.to(nm,   { x: 4,           duration: 0.45, ease: "expo.out"    });

        borderTween = gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      };

      const onLeave = () => {
        gsap.to(root, { y: 0,          duration: 0.55, ease: "expo.out"   });
        gsap.to(lt,   { yPercent: 0,   duration: 0.45, ease: "expo.out"   });
        gsap.to(lb,   { yPercent: 110, duration: 0.45, ease: "expo.out"   });
        gsap.to(ar,   { rotate: 0,     duration: 0.5,  ease: "power3.out" });
        gsap.to(ic,   { rotate: 0, scale: 1, duration: 0.5, ease: "expo.out" });
        gsap.to(nm,   { x: 0,          duration: 0.45, ease: "expo.out"   });

        if (borderTween) { borderTween.kill(); borderTween = null; }
        const p = perimeterRef.current;
        borderTween = gsap.to(path, {
          strokeDashoffset: p,
          duration: 1.2,
          ease: "power2.in",
        });
      };

      root.addEventListener("mouseenter", onEnter);
      root.addEventListener("mouseleave", onLeave);
      return () => {
        root.removeEventListener("mouseenter", onEnter);
        root.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <Link
      ref={rootRef}
      href={`/policies#${slug}`}
      data-policy-card
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-7 transition-[background-color,border-color] duration-500 will-change-transform sm:p-8",
        col,
        row,
        isFeature
          ? "bg-foreground text-brand-cream hover:bg-[#08182e]"
          : "border border-foreground/10 bg-white text-foreground"
      )}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke={isFeature ? "#F4F1EA" : "#C8102E"}
          strokeWidth={isFeature ? 2 : 1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-3">
            <span
              ref={numberEl}
              className="inline-block font-display text-[14px] italic text-brand-red will-change-transform"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "h-px w-8",
                isFeature ? "bg-brand-cream/25" : "bg-foreground/20"
              )}
            />
          </span>

          <span
            ref={iconWrap}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full will-change-transform",
              isFeature
                ? "bg-white/10 text-brand-cream"
                : "bg-foreground/[0.06] text-foreground"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </div>

        <h3
          className={cn(
            "mt-7 font-display font-normal leading-[1.08] tracking-[-0.015em]",
            isFeature
              ? "text-[2rem] sm:text-[2.5rem] lg:text-[2.9rem]"
              : "text-[1.4rem]"
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            "mt-4 leading-[1.55]",
            isFeature ? "max-w-lg text-[16px]" : "text-[14.5px]",
            isFeature ? "text-brand-cream/70" : "text-foreground/60"
          )}
        >
          {summary}
        </p>

        {isFeature ? (
          <ul className="mt-7 space-y-3">
            {details.slice(0, 3).map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 text-[14.5px] leading-[1.5] text-brand-cream/80"
              >
                <span className="mt-[0.5em] h-px w-5 shrink-0 bg-brand-red" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.24em]",
            isFeature ? "text-brand-cream" : "text-brand-red"
          )}
        >
          <span
            aria-hidden
            className="relative inline-block overflow-hidden"
            style={{ height: "1.2em" }}
          >
            <span
              ref={labelTop}
              className="inline-flex h-[1.2em] items-center will-change-transform"
            >
              Read the plan
            </span>
            <span
              ref={labelBot}
              className="absolute left-0 top-0 inline-flex h-[1.2em] items-center will-change-transform"
            >
              Read the plan
            </span>
          </span>
          <span
            ref={arrow}
            className="inline-flex will-change-transform"
            aria-hidden
          >
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </span>
      </div>
    </Link>
  );
}

type Span = {
  col: string;
  row: string;
  isFeature: boolean;
};

const layout: Span[] = [
  { col: "lg:col-span-7", row: "lg:row-span-2", isFeature: true },
  { col: "lg:col-span-5", row: "lg:row-span-1", isFeature: false },
  { col: "lg:col-span-5", row: "lg:row-span-1", isFeature: false },
  { col: "lg:col-span-4", row: "lg:row-span-1", isFeature: false },
  { col: "lg:col-span-4", row: "lg:row-span-1", isFeature: false },
  { col: "lg:col-span-4", row: "lg:row-span-1", isFeature: false }
];

export function KeyPolicies() {
  const ref = useRef<HTMLElement | null>(null);
  const featured = policies
    .slice(0, 6)
    .map((p, i) => ({ ...p, ...layout[i], index: i }));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-policy-card], [data-reveal]", { opacity: 1, y: 0 });
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
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      gsap.fromTo(
        "[data-policy-card]",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: { amount: 0.45 },
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
    <section ref={ref} className="relative bg-brand-cream">
      <div className="container py-24 lg:py-28">
        <div
          data-reveal
          className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-foreground/55"
        >
          <span className="tabular-nums">03</span>
          <span className="h-px w-8 bg-foreground/25" />
          <span>The Platform</span>
        </div>

        <div
          data-reveal
          className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.4rem)" }}
              >
                A plan for California&rsquo;s{" "}
                <em className="italic text-brand-red">next decade</em>.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.55] text-foreground/65">
              Every proposal is a real bill — funding identified, sponsors
              lined up, and a path to 60 votes.
            </p>
          </div>
          <MagneticButton
            href="/policies"
            variant="ghost"
            size="md"
            className="self-start md:self-end"
          >
            See all policies
          </MagneticButton>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {featured.map((p) => (
            <PolicyCard key={p.slug} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
