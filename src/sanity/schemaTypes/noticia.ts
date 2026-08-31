import { defineField, defineType } from "sanity";

export const noticiaType = defineType({
  name: "noticia",
  title: "Noticia",
  type: "document",
  fields: [
    // ─── Básico ────────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Título",
      description: "Título principal del artículo. Máximo 120 caracteres.",
      type: "string",
      validation: (rule) => rule.required().min(5).max(120),
    }),

    defineField({
      name: "slug",
      title: "URL (slug)",
      description: "Se genera automáticamente desde el título.",
      type: "slug",
      options: { source: "title", maxLength: 100 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Extracto",
      description: "Resumen breve que aparece en listados y tarjetas. Entre 20 y 300 caracteres.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(300),
    }),

    // ─── Clasificación ─────────────────────────────────────────────────────────
    defineField({
      name: "date",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Propuestas", value: "Propuestas" },
          { title: "Alfonso te explica", value: "Alfonso te explica" },
          { title: "Campaña", value: "Campaña" },
          { title: "Actividades", value: "Actividades" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Campaña Alfonso Grados",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "readTime",
      title: "Tiempo de lectura",
      description: 'Por ejemplo: "4 min de lectura".',
      type: "string",
    }),

    // ─── Imagen ────────────────────────────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      description:
        "Imagen horizontal principal de la noticia. Recomendado: 1600 × 900 px (proporción 16:9), formato WebP o JPG y peso máximo recomendado de 1 MB. Mantén rostros, logos y elementos importantes cerca del centro porque la imagen puede recortarse según el dispositivo.",
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

    defineField({
      name: "coverVariant",
      title: "Variante gráfica de respaldo",
      description: "Se usa cuando no hay imagen principal disponible.",
      type: "number",
      options: {
        list: [
          { title: "Variante 1 (azul)", value: 1 },
          { title: "Variante 2 (roja)", value: 2 },
          { title: "Variante 3 (dorada)", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 1,
    }),

    // ─── Contenido ─────────────────────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Contenido",
      description: "Cuerpo completo del artículo en texto enriquecido.",
      type: "array",
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error("El contenido es obligatorio y debe tener al menos un bloque."),
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Encabezado H2", value: "h2" },
            { title: "Encabezado H3", value: "h3" },
          ],
          lists: [
            { title: "Lista con viñetas", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Enlace",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Abrir en nueva pestaña",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "Imagen dentro del artículo",
          description:
            "Recomendado: 1600 px de ancho, formato WebP o JPG y peso máximo recomendado de 1 MB. La proporción puede variar. Evita imágenes demasiado pequeñas o borrosas.",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),

    // ─── Videos y publicaciones ────────────────────────────────────────────────
    defineField({
      name: "socialMedia",
      title: "Videos y publicaciones",
      description:
        "Enlaces a videos, transmisiones en vivo o publicaciones de redes sociales. Máximo 10 elementos por noticia.",
      type: "array",
      validation: (rule) => rule.max(10),
      of: [
        defineField({
          name: "socialItem",
          title: "Publicación o video",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              description: "Título visible del contenido. Máximo 120 caracteres.",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "platform",
              title: "Plataforma",
              type: "string",
              options: {
                list: [
                  { title: "YouTube", value: "YouTube" },
                  { title: "Facebook", value: "Facebook" },
                  { title: "Instagram", value: "Instagram" },
                  { title: "TikTok", value: "TikTok" },
                  { title: "X / Twitter", value: "X / Twitter" },
                  { title: "Otra", value: "Otra" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "contentType",
              title: "Tipo de contenido",
              type: "string",
              options: {
                list: [
                  { title: "Video", value: "Video" },
                  { title: "Transmisión en vivo", value: "Transmisión en vivo" },
                  { title: "Publicación", value: "Publicación" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Enlace (URL)",
              description: "Solo guardar la URL (sin códigos embed, iframes ni HTML).",
              type: "url",
              validation: (rule) =>
                rule.required().uri({
                  scheme: ["http", "https"],
                }),
            }),
            defineField({
              name: "description",
              title: "Descripción",
              description: "Breve descripción opcional. Máximo 240 caracteres.",
              type: "text",
              rows: 2,
              validation: (rule) => rule.max(240),
            }),
            defineField({
              name: "thumbnail",
              title: "Portada / Miniatura",
              description:
                "Portada opcional para la tarjeta. Recomendado: 1280 × 720 px (proporción 16:9), formato WebP o JPG y peso máximo recomendado de 800 KB. Mantén el elemento principal centrado porque la miniatura puede recortarse.",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texto alternativo",
                  description: "Obligatorio si se incluye miniatura.",
                  type: "string",
                  validation: (rule) =>
                    rule.custom((alt, context) => {
                      const parent = context.parent as { asset?: unknown } | undefined;
                      if (parent?.asset && !alt) {
                        return "El texto alternativo es obligatorio cuando se incluye una miniatura.";
                      }
                      return true;
                    }),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              platform: "platform",
              contentType: "contentType",
              media: "thumbnail",
            },
            prepare({ title, platform, contentType, media }) {
              const meta = [platform, contentType].filter(Boolean).join(" · ");
              return {
                title: title || "Sin título",
                subtitle: meta || "Publicación o video",
                media,
              };
            },
          },
        }),
      ],
    }),

    // ─── Documentos adjuntos ───────────────────────────────────────────────────
    defineField({
      name: "attachments",
      title: "Documentos adjuntos",
      description:
        "Archivos PDF relacionados con la noticia. Máximo 10 archivos PDF por noticia.",
      type: "array",
      validation: (rule) => rule.max(10),
      of: [
        defineField({
          name: "attachmentItem",
          title: "Documento adjunto",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título del documento",
              type: "string",
              description: "Máximo 120 caracteres.",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Descripción",
              description: "Breve descripción opcional. Máximo 240 caracteres.",
              type: "text",
              rows: 2,
              validation: (rule) => rule.max(240),
            }),
            defineField({
              name: "file",
              title: "Archivo PDF",
              description:
                "Adjunta únicamente archivos PDF. Peso máximo recomendado: 10 MB. Usa un nombre de archivo claro y evita documentos escaneados innecesariamente pesados.",
              type: "file",
              options: {
                accept: "application/pdf",
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
            prepare({ title, description }) {
              return {
                title: title ? `📄 ${title}` : "Documento sin título",
                subtitle: description ? `PDF · ${description}` : "Documento PDF",
              };
            },
          },
        }),
      ],
    }),

    // ─── Destacado ─────────────────────────────────────────────────────────────
    defineField({
      name: "featured",
      title: "Artículo destacado",
      description: "Aparece en posición destacada en el listado principal.",
      type: "boolean",
      initialValue: false,
    }),

    // ─── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      description: "Deja vacío para usar el título principal. Máximo 60 caracteres.",
      type: "string",
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: "seoDescription",
      title: "Descripción SEO",
      description: "Máximo 160 caracteres recomendado.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      date: "date",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, category, date, media, featured }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Sin fecha";
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${category ?? "Sin categoría"} · ${dateStr}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Fecha de publicación (más reciente)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Fecha de publicación (más antigua)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
