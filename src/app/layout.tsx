import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { candidate } from "@/lib/data/candidate";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/gotham-bold.otf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../public/fonts/gotham-ultra.otf",
      weight: "900",
      style: "normal"
    }
  ],
  variable: "--font-gotham",
  display: "swap"
});

const myriadPro = localFont({
  src: [
    {
      path: "../../public/fonts/myriad-pro-regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/myriad-pro-semibold-semicondensed-italic.otf",
      weight: "600",
      style: "italic"
    },
    {
      path: "../../public/fonts/myriad-pro-black.otf",
      weight: "900",
      style: "normal"
    }
  ],
  variable: "--font-myriad",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${candidate.fullName} · ${candidate.office} — ${candidate.tagline}`,
    template: `%s · ${candidate.fullName}`
  },
  description: candidate.mission,
  applicationName: `${candidate.fullName} · ${candidate.office}`,
  keywords: [
    candidate.fullName,
    candidate.office,
    candidate.district,
    candidate.region,
    candidate.country,
    "alcalde",
    "municipalidad",
    "Yanahuara",
    "Arequipa",
    "elecciones",
    "campaña"
  ],
  authors: [{ name: candidate.fullName }],
  openGraph: {
    title: `${candidate.fullName} · ${candidate.office}`,
    description: candidate.mission,
    url: siteUrl,
    siteName: `${candidate.fullName} · ${candidate.office}`,
    locale: "es_PE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidate.fullName} · ${candidate.office}`,
    description: candidate.mission
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  alternates: {
    canonical: absoluteUrl("/")
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9D500" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${myriadPro.variable} ${gotham.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
