import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import type { PortableTextBlock } from "sanity";

function isValidLinkProtocol(href: string): boolean {
  if (typeof href !== "string") return false;
  // Permitir rutas relativas que inicien con un solo '/', pero rechazar '//dominio-externo'
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[16px] leading-[1.75] text-foreground/75">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-2 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-5 text-[15px] leading-[1.7] text-foreground/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative text-[15px] leading-[1.7] text-foreground/70 before:absolute before:-left-4 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-yellow">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[15px] leading-[1.7] text-foreground/70 pl-1">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "";
      if (!isValidLinkProtocol(href)) {
        return <span>{children}</span>;
      }

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        value?.openInNewTab;

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-brand-red underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.url) return null;
      const width = value.dimensions?.width || 1200;
      const height = value.dimensions?.height || 675;

      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5">
          <Image
            src={value.url}
            alt={value.alt || ""}
            width={width}
            height={height}
            className="w-full object-cover"
          />
          {value.alt && (
            <figcaption className="border-t border-foreground/10 p-3 text-center text-xs text-foreground/60">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableTextComponents} />;
}
