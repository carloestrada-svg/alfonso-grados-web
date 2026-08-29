import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { candidate } from "@/lib/data/candidate";

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

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alfonso Grados",
      description:
        "Conoce las propuestas, prioridades, noticias y formas de participar en la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
      inLanguage: "es-PE",
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#alfonso-grados`,
      name: candidate.fullName,
      jobTitle: "Candidato a Alcalde de Yanahuara",
      description: candidate.shortBio,
      image: `${siteUrl}/images/campaign/alfonso-retrato-web.webp`,
      sameAs: [
        "https://www.facebook.com/alfonsogradosr",
        "https://www.instagram.com/alfonsogrados.candidato/",
        "https://www.tiktok.com/@alfonso.180grados"
      ],
      worksFor: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Campaña Alfonso Grados – Alcalde de Yanahuara",
      url: siteUrl,
      logo: `${siteUrl}/images/campaign/alfonso-grados-logo.png`,
      telephone: candidate.contact.phone,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: candidate.contact.phone,
          contactType: "WhatsApp",
          availableLanguage: ["es"]
        }
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: candidate.district,
        addressRegion: candidate.region,
        addressCountry: "PE"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alfonso Grados · Alcalde de Yanahuara",
    template: "%s · Alfonso Grados"
  },
  description: candidate.mission,
  applicationName: "Alfonso Grados · Alcalde de Yanahuara",
  keywords: [
    candidate.fullName,
    candidate.office,
    candidate.district,
    candidate.region,
    candidate.country,
    "alcalde",
    "municipalidad",
    "elecciones",
    "campaña"
  ],
  authors: [{ name: candidate.fullName }],
  openGraph: {
    title: "Alfonso Grados · Alcalde de Yanahuara",
    description: candidate.mission,
    url: siteUrl,
    siteName: "Alfonso Grados · Alcalde de Yanahuara",
    locale: "es_PE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Grados · Alcalde de Yanahuara",
    description: candidate.mission
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
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
        <JsonLd data={globalSchema} />
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
