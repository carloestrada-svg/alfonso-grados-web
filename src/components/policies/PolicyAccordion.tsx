import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/FadeIn";
import { policies } from "@/lib/data/policies";

export function PolicyAccordion() {
  return (
    <section className="bg-background">
      <div className="container py-20 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            defaultValue={policies[0]?.slug}
            className="divide-y divide-border/60"
          >
            {policies.map((p) => {
              const Icon = p.icon;
              return (
                <AccordionItem
                  key={p.slug}
                  value={p.slug}
                  id={p.slug}
                  className="scroll-mt-24 border-none"
                >
                  <AccordionTrigger className="py-6">
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{p.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-14 space-y-4">
                      <p className="text-base leading-relaxed text-foreground/80">
                        {p.summary}
                      </p>
                      <ul className="space-y-2 text-base leading-relaxed text-muted-foreground">
                        {p.details.map((d, i) => (
                          <li key={i} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
