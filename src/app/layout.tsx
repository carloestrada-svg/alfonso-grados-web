import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { candidate } from "@/lib/data/candidate";

import "./globals.css";

const googleTagManagerId = "GTM-TTCNSX96";

const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/gotham-bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../public/fonts/gotham-ultra.woff2",
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
      path: "../../public/fonts/myriad-pro-regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/myriad-pro-semibold-semicondensed-italic.woff2",
      weight: "600",
      style: "italic"
    },
    {
      path: "../../public/fonts/myriad-pro-black.woff2",
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
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            className="hidden invisible"
            title="Google Tag Manager"
          />
        </noscript>
        <AppShell
          jsonLd={<JsonLd data={globalSchema} />}
          navbar={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
