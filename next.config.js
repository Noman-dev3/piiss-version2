/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  sitemap: async () => {
    const baseUrl = 'https://piiss.vercel.app';
    const staticRoutes = [
      '/',
      '/admissions',
      '/results',
      '/events',
      '/faculty',
      '/gallery',
    ];

    return staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1 : 0.8,
    }));
  },
};

module.exports = nextConfig;
