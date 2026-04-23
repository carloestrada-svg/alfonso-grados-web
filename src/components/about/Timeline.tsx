import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { timeline } from "@/lib/data/navigation";

export function Timeline() {
  return (
    <section className="bg-brand-cream">
      <div className="container py-20 lg:py-28">
        <SectionHeader
          eyebrow="Career"
          title="A record of results."
          description="From the line at a Berkeley kitchen to the floor of the California Assembly."
          align="center"
        />

        <FadeIn
          staggerSelector="[data-event]"
          stagger={0.08}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-10">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                data-event
                className="relative grid gap-6 pl-12 md:grid-cols-2 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute left-2 top-1 h-5 w-5 rounded-full border-4 border-brand-cream bg-brand-red md:left-1/2 md:-translate-x-1/2"
                />
                {i % 2 === 0 ? (
                  <>
                    <div className="md:pr-12 md:text-right">
                      <p className="font-display text-xl font-semibold text-brand-navy">
                        {t.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold">
                        {t.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground md:pl-12">
                      {t.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground md:col-start-1 md:pr-12 md:text-right">
                      {t.description}
                    </p>
                    <div className="md:col-start-2 md:pl-12">
                      <p className="font-display text-xl font-semibold text-brand-navy">
                        {t.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold">
                        {t.title}
                      </h3>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}
