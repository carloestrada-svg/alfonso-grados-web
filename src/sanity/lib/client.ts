import "server-only";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2024-03-01";

/**
 * Cliente de Sanity para consultas públicas de lectura en el frontend.
 *
 * Características:
 * - useCdn: true (lectura optimizada vía CDN edge).
 * - Sin tokens de lectura ni escritura (100% público y seguro).
 * - Retorna null si faltan las variables de entorno para activar
 *   la estrategia de respaldo estático (fallback).
 */
export const client =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true,
      })
    : null;
