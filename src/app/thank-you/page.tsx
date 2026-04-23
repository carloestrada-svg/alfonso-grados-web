import type { Metadata } from "next";
import Link from "next/link";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { candidate } from "@/lib/data/candidate";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for signing on — you're part of the team.",
  robots: { index: false, follow: false }
};

const nextSteps = [
  { label: "See upcoming events", href: "/events" },
  { label: "Ask Alex a question", href: "/ask" },
  { label: "Read about Alex", href: "/about" },
  { label: "Volunteer for a shift", href: "/volunteer" }
];

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden bg-brand-cream">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="tabular-nums">00</span>
              <span className="h-px w-8 bg-foreground/25" />
              <span>Received</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              A campaign is a long conversation with neighbors. Thanks for
              being part of it.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="font-display font-normal leading-[0.98] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)" }}
              >
                Thank{" "}
                <em className="italic text-brand-red">you</em>.
              </span>
            </h1>

            <p className="max-w-xl text-[17px] leading-[1.55] text-foreground/70">
              Your message is in. Someone from the campaign will reach out
              shortly. In the meantime, here&rsquo;s where to go next.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href="/" variant="solid" size="lg">
                Back to home
              </MagneticButton>
              <MagneticButton href="/events" variant="ghost" size="lg">
                See upcoming events
              </MagneticButton>
            </div>

            <div className="flex flex-col gap-4 border-t border-foreground/15 pt-8">
              <span className="text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
                What&rsquo;s next —
              </span>
              <ul className="flex flex-col gap-3">
                {nextSteps.map((s, i) => (
                  <li key={s.href} className="flex items-baseline gap-4">
                    <span className="font-display text-[14px] italic text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={s.href}
                      className="font-display text-foreground transition-colors hover:text-brand-red"
                      style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/45">
              — {candidate.fullName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
