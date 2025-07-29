import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/.well-known/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp'],
        allow: '/',
      },
      // Block AI training bots
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow: '/',
      },
    ],
    sitemap: 'https://lifeiscontent.net/sitemap.xml',
  }
}
