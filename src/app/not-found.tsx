import Link from "next/link";

import { MagneticButton } from "@/components/ui/MagneticButton";

const suggestions = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" }
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden bg-brand-cream">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <span
              aria-hidden
              className="block font-display font-normal italic leading-[0.85] tracking-[-0.03em] text-brand-red"
              style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
            >
              404
            </span>

            <h2
              className="font-display font-normal leading-[1] tracking-[-0.02em] text-foreground"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3rem)" }}
            >
              Not found.
            </h2>

            <p className="max-w-[22rem] text-[16px] leading-[1.6] text-foreground/65">
              The page you&rsquo;re looking for either moved or never
              existed. No campaign is perfect.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="font-display font-normal leading-[0.98] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)" }}
              >
                Can&rsquo;t find{" "}
                <em className="italic text-brand-red">that one</em>.
              </span>
            </h1>

            <p className="max-w-xl text-[18px] leading-[1.55] text-foreground/65">
              Head back to the homepage, or try one of the pages below.
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
                Or try —
              </span>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {suggestions.map((s, i) => (
                  <li key={s.href} className="flex items-baseline gap-3">
                    <span className="font-display text-[14px] italic text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={s.href}
                      className="text-[17px] font-display text-foreground transition-colors hover:text-brand-red"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
