"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type AppShellProps = {
  jsonLd: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

/**
 * Contenedor ligero para separar la interfaz pública de /admin.
 *
 * Cuando la ruta inicia con /admin:
 * - Omite completamente del DOM el JSON-LD, el enlace de salto accesible,
 *   la Navbar y el Footer.
 * - Permite que Sanity Studio ocupe toda la ventana sin elementos superpuestos
 *   ni interferencias en navegación por teclado.
 *
 * Para todas las demás rutas:
 * - Conserva exactamente la estructura y apariencia pública original.
 */
export function AppShell({ jsonLd, navbar, footer, children }: AppShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {jsonLd}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      {navbar}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      {footer}
    </>
  );
}
