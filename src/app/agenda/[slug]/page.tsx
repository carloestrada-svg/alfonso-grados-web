import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { getEventBySlug, getEventoSlugs } from "@/sanity/lib/events";
import { EventCover } from "@/components/events/EventCover";
import { formatEventDate, formatEventTimeRange } from "@/components/events/EventCard";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getEventoSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Actividad no encontrada · Agenda",
      robots: { index: false, follow: false },
    };
  }

  const title = `${event.title} · Agenda · Alfonso Grados`;
  const description =
    event.description.length > 160
      ? `${event.description.slice(0, 157)}...`
      : event.description;

  const imageUrl = event.mainImage?.url || "/opengraph-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/agenda/${event.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/agenda/${event.slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          alt: event.mainImage?.alt || event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isCancelled = event.status === "cancelada";
  const now = new Date();
  const endThreshold = new Date(event.endDateTime || event.startDateTime);
  const hasEnded = endThreshold < now;

  const dateFormatted = formatEventDate(event.startDateTime);
  const timeFormatted = formatEventTimeRange(event.startDateTime, event.endDateTime);

  // Datos estructurados Schema.org Event
  // Usa estrictamente los strings ISO originales de Sanity
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDateTime,
    ...(event.endDateTime ? { endDate: event.endDateTime } : {}),
    eventStatus: isCancelled
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressRegion: "Arequipa",
        addressCountry: "PE",
      },
    },
    image: event.mainImage?.url
      ? [event.mainImage.url]
      : ["https://alfonso-drab.vercel.app/opengraph-image.png"],
    organizer: {
      "@type": "Organization",
      name: "Campaña Alfonso Grados – Alcalde de Yanahuara",
      url: "https://alfonso-drab.vercel.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="bg-background">
        {/* Cabecera / Navegación */}
        <div className="border-b border-foreground/10 bg-foreground/[0.02]">
          <div className="container py-6">
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-brand-red"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a la Agenda</span>
            </Link>
          </div>
        </div>

        <article className="container py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            {/* Aviso de estado si está cancelado o concluido */}
            {isCancelled && (
              <div
                role="alert"
                className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-800 dark:text-red-300"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-semibold">Actividad cancelada</p>
                  <p className="text-sm">
                    Esta actividad programada ha sido cancelada por el equipo de campaña. Disculpa
                    las molestias que esto pueda causar.
                  </p>
                </div>
              </div>
            )}

            {!isCancelled && hasEnded && (
              <div
                role="status"
                className="mb-8 flex items-start gap-3 rounded-xl border border-foreground/15 bg-foreground/5 p-4 text-foreground/80"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground/60" />
                <div>
                  <p className="font-semibold">Actividad concluida</p>
                  <p className="text-sm">
                    Esta actividad ya se llevó a cabo. ¡Muchas gracias a los vecinos de Yanahuara
                    que participaron!
                  </p>
                </div>
              </div>
            )}

            {/* Portada */}
            <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <EventCover
                event={event}
                className="h-full w-full"
                priority
                sizes="(max-width: 1024px) 100vw, 896px)"
              />
            </div>

            {/* Metadatos y Fecha */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold sm:text-sm">
              {isCancelled && (
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-red-700 dark:text-red-400">
                  Cancelada
                </span>
              )}

              {event.featured && !isCancelled && (
                <span className="rounded-full bg-brand-yellow/30 px-3 py-1 text-foreground">
                  ⭐ Actividad destacada
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 text-foreground/75">
                <Calendar className="h-4 w-4 text-brand-red" />
                <time dateTime={event.startDateTime}>{dateFormatted}</time>
              </span>

              {timeFormatted && (
                <span className="inline-flex items-center gap-1.5 text-foreground/75">
                  <Clock className="h-4 w-4 text-brand-red" />
                  <span>{timeFormatted}</span>
                </span>
              )}
            </div>

            {/* Título Principal */}
            <h1 className="mb-6 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {event.title}
            </h1>

            {/* Ubicación destacada */}
            <div className="mb-8 flex items-start gap-2.5 rounded-xl border border-foreground/10 bg-card p-4 sm:p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <div>
                <p className="font-semibold text-foreground">{event.venue}</p>
                <p className="text-sm text-foreground/60">{event.city}, Arequipa</p>
              </div>
            </div>

            {/* Descripción detallada */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Sobre esta actividad
              </h2>
              <div className="mt-3 whitespace-pre-line text-base leading-relaxed text-foreground/80">
                {event.description}
              </div>
            </div>

            {/* Acción de Registro / Confirmación */}
            <div className="mt-10 border-t border-foreground/10 pt-8">
              {!isCancelled && !hasEnded && event.registrationLink && (
                <div className="flex flex-col gap-3 rounded-2xl bg-foreground/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                      ¿Deseas participar en este encuentro?
                    </h3>
                    <p className="text-xs text-foreground/65 sm:text-sm">
                      Confirma tu asistencia en línea para organizar mejor los espacios y materiales.
                    </p>
                  </div>
                  <a
                    href={event.registrationLink}
                    data-analytics-event="registration_click"
                    data-analytics-label={event.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <span>Inscribirme o confirmar</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              {isCancelled && (
                <p className="text-sm italic text-foreground/50">
                  Las inscripciones para esta actividad se encuentran canceladas.
                </p>
              )}

              {!isCancelled && hasEnded && (
                <p className="text-sm italic text-foreground/50">
                  Esta actividad ya concluyó. Mantente atento a la agenda para próximos eventos.
                </p>
              )}
            </div>
          </div>
        </article>
      </main>

      <CTASection />
    </>
  );
}
