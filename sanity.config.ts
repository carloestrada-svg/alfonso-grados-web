"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "alfonso-grados",
  title: "Alfonso Grados – Contenidos",

  // IDs y dataset provenientes de variables de entorno — no se escriben aquí.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // Ruta base en la que el Studio queda montado dentro de la aplicación.
  basePath: "/admin",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenidos")
          .items([
            S.listItem()
              .title("Noticias")
              .id("noticias")
              .child(
                S.documentList()
                  .title("Noticias")
                  .filter('_type == "noticia"')
                  .defaultOrdering([{ field: "date", direction: "desc" }])
              ),
            S.listItem()
              .title("Agenda")
              .id("agenda")
              .child(
                S.documentList()
                  .title("Agenda")
                  .filter('_type == "evento"')
                  .defaultOrdering([{ field: "startDateTime", direction: "asc" }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
