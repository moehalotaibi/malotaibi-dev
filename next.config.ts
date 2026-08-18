import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old combined /work page split into /case-studies and /projects.
    return [
      { source: "/work", destination: "/case-studies", permanent: true },
      {
        // Redirects run BEFORE the /public filesystem, and the project
        // images live under public/work/ — so the slug must exclude dots
        // (every asset filename has one) or /work/keeta.png etc. would be
        // redirected to /case-studies/ and 404, breaking next/image.
        source: "/work/:slug([^./]+)",
        destination: "/case-studies/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
