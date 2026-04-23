import { FadeIn } from "@/components/shared/FadeIn";
import { candidate } from "@/lib/data/candidate";

export function Biography() {
  return (
    <section className="bg-background">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <FadeIn>
          <div
            aria-hidden
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cover bg-center shadow-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80')"
            }}
          />
        </FadeIn>

        <div className="flex flex-col justify-center gap-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
              Meet {candidate.firstName}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Twenty years of showing up.
            </h2>
          </FadeIn>
          <FadeIn
            staggerSelector="p"
            stagger={0.08}
            delay={0.1}
            className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {candidate.longBio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
