import { Calendar, MapPin } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { events } from "@/lib/data/events";

export function EventsList() {
  return (
    <FadeIn
      staggerSelector="[data-event-card]"
      stagger={0.08}
      className="grid gap-5"
    >
      {events.map((e) => (
        <article
          key={e.id}
          data-event-card
          className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[auto_1fr_auto] sm:items-center"
        >
          <div className="flex w-20 flex-col items-center justify-center rounded-xl bg-brand-navy px-3 py-3 text-center text-white">
            <span className="text-[10px] uppercase tracking-wider text-white/70">
              {new Date(e.date).toLocaleDateString("en-US", {
                month: "short"
              })}
            </span>
            <span className="font-display text-3xl font-semibold leading-none">
              {new Date(e.date).getDate()}
            </span>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold leading-snug">
              {e.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <dt className="sr-only">Date</dt>
                <dd>
                  {formatDate(e.date)} · {e.time}
                </dd>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <dt className="sr-only">Location</dt>
                <dd>
                  {e.venue}, {e.city}
                </dd>
              </div>
            </dl>
          </div>

          <Button asChild variant="outline" className="sm:w-auto">
            <a href={e.rsvpUrl}>RSVP</a>
          </Button>
        </article>
      ))}
    </FadeIn>
  );
}
