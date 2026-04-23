import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { values } from "@/lib/data/navigation";

export function Values() {
  return (
    <section className="bg-background">
      <div className="container py-20 lg:py-28">
        <SectionHeader
          eyebrow="Values"
          title="How I work."
          description="Four commitments I've kept through twenty years of public service. Hold me to them."
          align="center"
        />

        <FadeIn
          staggerSelector="[data-value]"
          stagger={0.08}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v, i) => (
            <article
              key={v.title}
              data-value
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-4xl font-semibold text-brand-red">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl font-semibold">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {v.description}
              </p>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
