import type { MetadataRoute } from 'next'

import { publicStories } from '@/content/news'
import { publicRoutes } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'
  const paths = [...publicRoutes, ...publicStories.map((story) => `/news/${story.slug}`)]
  return paths.map((path) => ({
    url: path === '/' ? site : `${site}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
