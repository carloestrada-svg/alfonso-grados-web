"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const donationTiers = [
  { amount: "$10", featured: false },
  { amount: "$25", featured: true },
  { amount: "$50", featured: false },
  { amount: "$100", featured: false },
  { amount: "$250", featured: false },
  { amount: "Other", featured: false }
];

export function CTASection() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal], [data-tier]", { opacity: 1, y: 0 });
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
        "[data-tier]",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div data-reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">07</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Get involved</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Join the 58,000+ Californians who&rsquo;ve already signed on —
              this campaign is only as strong as the people behind it.
            </p>
          </div>

          <div className="flex flex-col">
            <h2
              data-reveal
              className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground"
            >
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Campaigns are won at the{" "}
                <em className="italic text-brand-red">door</em>.
              </span>
            </h2>

            <p
              data-reveal
              className="mt-8 max-w-xl text-[18px] leading-[1.55] text-foreground/70"
            >
              Every volunteer shift. Every $5 contribution. Every
              conversation with a neighbor. That&rsquo;s how we win this
              seat.
            </p>

            <div
              data-reveal
              className="mt-12 border-t border-foreground/15 pt-8"
            >
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="font-display italic text-brand-red">01</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Quick donate</span>
                <span className="hidden h-px flex-1 bg-foreground/15 sm:block" />
                <span className="hidden sm:inline">Secure · ActBlue</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                {donationTiers.map((tier) => (
                  <Link
                    key={tier.amount}
                    href="/volunteer"
                    data-tier
                    className={cn(
                      "group inline-flex h-12 items-center justify-center rounded-full border px-7 font-display text-[16px] transition-colors duration-300",
                      tier.featured
                        ? "border-foreground bg-foreground text-brand-cream"
                        : "border-foreground/20 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04]"
                    )}
                  >
                    {tier.amount}
                  </Link>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="mt-10 border-t border-foreground/15 pt-8"
            >
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                <span className="font-display italic text-brand-red">02</span>
                <span className="h-px w-8 bg-foreground/25" />
                <span>Or lend your voice</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="/volunteer"
                  variant="solid"
                  size="lg"
                >
                  Chip in now
                </MagneticButton>
                <MagneticButton
                  href="/volunteer"
                  variant="ghost"
                  size="lg"
                >
                  Volunteer
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
