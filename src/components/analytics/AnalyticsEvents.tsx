"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type DataLayerEvent = {
  event: string;
  [key: string]: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const conversionPaths = new Set([
  "/contacto",
  "/preguntale-a-alfonso",
  "/sumate"
]);

const socialDomains: Array<[string, string]> = [
  ["facebook.com", "facebook"],
  ["instagram.com", "instagram"],
  ["tiktok.com", "tiktok"],
  ["twitter.com", "x"],
  ["x.com", "x"],
  ["youtube.com", "youtube"],
  ["youtu.be", "youtube"]
];

function pushDataLayer(payload: DataLayerEvent) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

function hostnameMatches(hostname: string, domain: string) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

function getSocialPlatform(hostname: string) {
  return socialDomains.find(([domain]) => hostnameMatches(hostname, domain))?.[1];
}

function getSafeIdentifier(value: string | null | undefined, fallback: string) {
  const sanitized = value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
  return sanitized || fallback;
}

export function AnalyticsEvents() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      pushDataLayer({
        event: "virtual_page_view",
        page_path: pathname,
        page_title: document.title
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      const pagePath = window.location.pathname;
      const explicitEvent = anchor.dataset.analyticsEvent;
      if (explicitEvent && /^[a-z][a-z0-9_]{1,63}$/.test(explicitEvent)) {
        pushDataLayer({
          event: explicitEvent,
          event_label: getSafeIdentifier(anchor.dataset.analyticsLabel, "unlabeled"),
          link_domain: url.hostname || "internal",
          page_path: pagePath
        });
        return;
      }

      if (
        url.protocol === "https:" &&
        ["wa.me", "whatsapp.com"].some((domain) => hostnameMatches(url.hostname, domain))
      ) {
        pushDataLayer({
          event: "contact_click",
          contact_method: "whatsapp",
          cta_location: getSafeIdentifier(
            anchor.dataset.analyticsLocation,
            "unlabeled"
          ),
          cta_text: getSafeIdentifier(
            anchor.dataset.analyticsLabel ||
              anchor.getAttribute("aria-label") ||
              anchor.textContent,
            "whatsapp"
          ),
          page_path: pagePath
        });
        return;
      }

      if (url.protocol === "tel:" || url.protocol === "mailto:") {
        pushDataLayer({
          event: "contact_click",
          contact_method: url.protocol === "tel:" ? "phone" : "email",
          page_path: pagePath
        });
        return;
      }

      const extension = url.pathname.match(/\.([a-z0-9]{2,8})$/i)?.[1]?.toLowerCase();
      if (anchor.hasAttribute("download") || extension === "pdf") {
        pushDataLayer({
          event: "file_download",
          file_extension: extension || "unknown",
          page_path: pagePath
        });
        return;
      }

      const socialPlatform = getSocialPlatform(url.hostname);
      if (socialPlatform) {
        pushDataLayer({
          event: "social_click",
          social_platform: socialPlatform,
          page_path: pagePath
        });
        return;
      }

      if (url.origin !== window.location.origin) {
        pushDataLayer({
          event: "outbound_click",
          link_domain: url.hostname,
          page_path: pagePath
        });
        return;
      }

      if (conversionPaths.has(url.pathname)) {
        pushDataLayer({
          event: "cta_click",
          destination_path: url.pathname,
          page_path: pagePath
        });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;

      pushDataLayer({
        event: "form_submit_attempt",
        form_name: getSafeIdentifier(
          event.target.dataset.analyticsName || event.target.name || event.target.id,
          "unnamed_form"
        ),
        page_path: window.location.pathname
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
