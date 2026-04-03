
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/legal', '/admin', '/api'],
    },
    sitemap: 'https://apprutinas.com/sitemap.xml',
  }
}
