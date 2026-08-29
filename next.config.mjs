/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/conoce-a-alfonso",
        permanent: true
      },
      {
        source: "/events",
        destination: "/agenda",
        permanent: true
      },
      {
        source: "/volunteer",
        destination: "/sumate",
        permanent: true
      },
      {
        source: "/ask",
        destination: "/preguntale-a-alfonso",
        permanent: true
      },
      {
        source: "/contact",
        destination: "/contacto",
        permanent: true
      },
      {
        source: "/privacy",
        destination: "/politica-de-privacidad",
        permanent: true
      },
      {
        source: "/terms",
        destination: "/terminos-y-condiciones",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
