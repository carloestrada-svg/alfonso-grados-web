import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Layout exclusivo de /admin.
 *
 * El contenedor AppShell en el layout raíz omite la cabecera, pie y skip link
 * públicos, permitiendo que el Studio se monte de forma limpia y a pantalla completa.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white">
      {children}
    </div>
  );
}
