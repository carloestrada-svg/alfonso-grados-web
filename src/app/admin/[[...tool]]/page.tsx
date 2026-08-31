import type { Metadata } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  robots: {
    index: false,
    follow: false
  }
};
export const viewport = studioViewport;

/**
 * Ruta catch-all que monta el Sanity Studio embebido.
 * Se accede en /admin y en cualquier ruta hija /admin/[tool].
 *
 * La autenticación de usuarios es gestionada íntegramente por Sanity.
 * No se usan SANITY_API_READ_TOKEN ni SANITY_API_WRITE_TOKEN aquí.
 */
export default function StudioPage() {
  return <StudioClient />;
}
