import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    // Prioriza las variables de estudio; si no están disponibles, usa las públicas.
    projectId:
      process.env.SANITY_STUDIO_PROJECT_ID ??
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:
      process.env.SANITY_STUDIO_DATASET ??
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
