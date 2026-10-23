import type { Metadata } from 'next'

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      locale: 'en_ZM',
      type: 'website',
    },
  }
}
