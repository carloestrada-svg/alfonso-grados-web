import { defineField, defineType } from "sanity";

export const eventoType = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    // ─── Básico ────────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Título",
      description: "Nombre del evento o actividad.",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL (slug)",
      description: "Se genera automáticamente desde el título.",
      type: "slug",
      options: { source: "title", maxLength: 100 },
      validation: (rule) => rule.required(),
    }),

    // ─── Fecha y lugar ─────────────────────────────────────────────────────────
    defineField({
      name: "startDateTime",
      title: "Fecha y hora de inicio",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "endDateTime",
      title: "Fecha y hora de finalización",
      description: "Opcional. Si el evento tiene hora de cierre.",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const doc = context.document as { startDateTime?: string } | undefined;
          if (!endDate || !doc?.startDateTime) return true;
          if (new Date(endDate) <= new Date(doc.startDateTime)) {
            return "La fecha de finalización debe ser posterior a la de inicio.";
          }
          return true;
        }),
    }),

    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
      initialValue: "Yanahuara",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "venue",
      title: "Lugar",
      description: "Nombre del local, plaza o dirección donde se realiza el evento.",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    // ─── Descripción ───────────────────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Descripción",
      description: "Detalle del evento: qué es, para quién, qué incluye.",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(20),
    }),

    defineField({
      name: "registrationLink",
      title: "Enlace de inscripción o WhatsApp",
      description: "URL de formulario de inscripción o enlace de WhatsApp para confirmar asistencia.",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    // ─── Imagen ────────────────────────────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Imagen del evento",
      description:
        "Imagen horizontal del evento. Recomendado: 1600 × 900 px (proporción 16:9), formato WebP o JPG y peso máximo recomendado de 1 MB. Mantén personas, logos y texto importante cerca del centro porque la imagen puede recortarse según el dispositivo.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          description: "Descripción de la imagen para lectores de pantalla.",
          type: "string",
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) {
                return "El texto alternativo es obligatorio cuando se incluye una imagen.";
              }
              return true;
            }),
        }),
      ],
    }),

    // ─── Destacado y estado ────────────────────────────────────────────────────
    defineField({
      name: "featured",
      title: "Actividad destacada",
      description: "Aparece en posición destacada en la agenda.",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Programada", value: "programada" },
          { title: "Cancelada", value: "cancelada" },
        ],
        layout: "radio",
      },
      initialValue: "programada",
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      startDateTime: "startDateTime",
      venue: "venue",
      city: "city",
      media: "mainImage",
      status: "status",
      featured: "featured",
    },
    prepare({ title, startDateTime, venue, city, media, status, featured }) {
      const dateStr = startDateTime
        ? new Date(startDateTime).toLocaleDateString("es-PE", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Sin fecha";
      const location = [venue, city].filter(Boolean).join(" — ");
      const statusLabel = status === "cancelada" ? " 🚫 Cancelada" : "";
      const featuredLabel = featured ? "⭐ " : "";
      return {
        title: `${featuredLabel}${title}${statusLabel}`,
        subtitle: `${dateStr} · ${location}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Fecha de inicio (más próxima)",
      name: "startDateAsc",
      by: [{ field: "startDateTime", direction: "asc" }],
    },
    {
      title: "Fecha de inicio (más reciente)",
      name: "startDateDesc",
      by: [{ field: "startDateTime", direction: "desc" }],
    },
  ],
});
