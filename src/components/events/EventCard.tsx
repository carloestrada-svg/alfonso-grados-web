import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, ExternalLink, AlertTriangle } from "lucide-react";
import type { CampaignEvent } from "@/lib/data/events";
import { EventCover } from "./EventCover";
import { cn } from "@/lib/utils";

type Props = {
  event: CampaignEvent;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Formatea una fecha ISO a formato local peruano en zona horaria America/Lima.
 */
export function formatEventDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    const formatted = new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
    // Capitalizar primera letra
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return isoString;
  }
}

/**
 * Formatea el rango de horas del evento en zona horaria America/Lima.
 */
export function formatEventTimeRange(startIso: string, endIso?: string): string {
  try {
    const startDate = new Date(startIso);
    const startTime = new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(startDate);

    if (!endIso) {
      return startTime;
    }

    const endDate = new Date(endIso);
    const endTime = new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(endDate);

    return `${startTime} – ${endTime}`;
  } catch {
    return "";
  }
}

export function EventCard({ event, headingLevel = "h3", className }: Props) {
  const Heading = headingLevel;
  const isCancelled = event.status === "cancelada";
  const dateFormatted = formatEventDate(event.startDateTime);
  const timeFormatted = formatEventTimeRange(event.startDateTime, event.endDateTime);
  const eventUrl = `/agenda/${event.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        event.featured
          ? "border-brand-yellow/60 bg-brand-yellow/[0.03] shadow-md hover:border-brand-yellow"
          : "border-foreground/10 bg-card hover:border-foreground/20 hover:shadow-lg",
        isCancelled && "border-red-500/20 bg-red-500/[0.02]",
        className
      )}
    >
      {/* Portada */}
      <Link href={eventUrl} className="block aspect-[16/9] w-full overflow-hidden" tabIndex={-1}>
        <EventCover
          event={event}
          className="h-full w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Badges de estado / destacado */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
          {isCancelled && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" />
              Cancelada
            </span>
          )}

          {event.featured && !isCancelled && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-yellow/25 px-2.5 py-0.5 text-foreground">
              ⭐ Destacada
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-foreground/60">
            <Calendar className="h-3.5 w-3.5 text-foreground/45" />
            <time dateTime={event.startDateTime}>{dateFormatted}</time>
          </span>

          {timeFormatted && (
            <span className="inline-flex items-center gap-1 text-foreground/60">
              <Clock className="h-3.5 w-3.5 text-foreground/45" />
              <span>{timeFormatted}</span>
            </span>
          )}
        </div>

        {/* Título */}
        <Heading className="mb-2 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-red sm:text-xl">
          <Link href={eventUrl} className="focus-visible:outline-none focus-visible:underline">
            {event.title}
          </Link>
        </Heading>

        {/* Ubicación */}
        <div className="mb-3 flex items-start gap-1.5 text-xs text-foreground/65 sm:text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
          <span className="line-clamp-1">
            {event.venue} — {event.city}
          </span>
        </div>

        {/* Descripción breve */}
        <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">
          {event.description}
        </p>

        {/* Acciones */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 border-t border-foreground/10">
          <Link
            href={eventUrl}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-brand-red sm:text-sm"
          >
            <span>Ver detalles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {!isCancelled && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <span>Inscribirme</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {isCancelled && (
            <span className="ml-auto text-xs italic text-foreground/45">
              Inscripción cerrada
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
