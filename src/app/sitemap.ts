import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://piiss.vercel.app';

  const staticRoutes = [
    '/',
    '/admissions',
    '/results',
    '/events',
    '/faculty',
    '/gallery',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  return sitemapEntries;
}
