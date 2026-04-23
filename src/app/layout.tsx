import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { candidate } from "@/lib/data/candidate";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${candidate.fullName} for ${candidate.office} — ${candidate.tagline}`,
    template: `%s · ${candidate.lastName} for Senate`
  },
  description: candidate.mission,
  applicationName: `${candidate.lastName} for Senate`,
  keywords: [
    candidate.fullName,
    candidate.office,
    candidate.state,
    "election",
    "campaign",
    "senate",
    "democrat",
    "progressive"
  ],
  authors: [{ name: candidate.fullName }],
  openGraph: {
    title: `${candidate.fullName} for ${candidate.office}`,
    description: candidate.mission,
    url: siteUrl,
    siteName: `${candidate.lastName} for Senate`,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidate.fullName} for ${candidate.office}`,
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
    { media: "(prefers-color-scheme: light)", color: "#F4F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1F44" }
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
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
