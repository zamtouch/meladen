import config from '@payload-config'
import { getPayload } from 'payload'

import { blueprintCopy, type Copy } from '@/content/copy'
import { categoryVisuals, publicStories } from '@/content/news'
import { articleDrafts, company, stations as stationSeeds, timeline as timelineSeeds } from '@/content/site'

export type PublicStation = {
  slug: string
  name: string
  province: string
  status: 'operational' | 'planned' | 'temporarily-unavailable'
  summary: string
  openedLabel: string | null
  address: string | null
  phone: string | null
  hours: string | null
  latitude: number | null
  longitude: number | null
  productsNote: string | null
  amenities: string[]
  photo?: { url: string; alt: string } | null
}

export type PublicArticle = {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  kind: 'announcement' | 'insight'
  publishedOn: string | null
  dateLabel: string | null
  image: { url: string; alt: string }
}

export type PublicSettings = {
  organisation: string
  tagline: string
  email: string
  phones: string[]
  address: string[]
  logisticsPartner: string
}

export type PublicDocument = {
  title: string
  url: string
  description: string
  placement: 'about' | 'solutions' | 'responsibility'
}

function blank(value: unknown) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || null
}

function fallbackSettings(): PublicSettings {
  return {
    organisation: company.name,
    tagline: company.tagline,
    email: company.email,
    phones: company.phones,
    address: company.address,
    logisticsPartner: company.logisticsPartner,
  }
}

export async function getSettings(): Promise<PublicSettings> {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.findGlobal({ slug: 'site-settings' })
    const phones = String(doc.phones || '')
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean)
    const address = String(doc.address || '')
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean)
    return {
      organisation: doc.organisation || company.name,
      tagline: doc.tagline || company.tagline,
      email: doc.email || company.email,
      phones: phones.length ? phones : company.phones,
      address: address.length ? address : company.address,
      logisticsPartner: doc.logisticsPartner || company.logisticsPartner,
    }
  } catch (error) {
    console.error(error)
    return fallbackSettings()
  }
}

export async function getCopy(): Promise<Copy> {
  const copy = blueprintCopy()
  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({ slug: 'page-copy' })) as unknown as Record<string, unknown>
    for (const key of Object.keys(copy) as (keyof Copy)[]) {
      const value = doc[key]
      if (typeof value === 'string' && value.trim()) copy[key] = value.trim()
    }
  } catch (error) {
    console.error(error)
  }
  return copy
}

export async function getStations(): Promise<PublicStation[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'stations',
      limit: 50,
      sort: 'sortOrder',
      overrideAccess: true,
    })
    if (result.docs.length) {
      return result.docs.map((doc) => {
        const photo = doc.photo && typeof doc.photo === 'object' ? doc.photo : null
        return {
          slug: doc.slug,
          name: doc.name,
          province: doc.province,
          status: doc.status,
          summary: doc.summary,
          openedLabel: blank(doc.openedLabel),
          address: blank(doc.address),
          phone: blank(doc.phone),
          hours: blank(doc.hours),
          latitude: typeof doc.latitude === 'number' ? doc.latitude : null,
          longitude: typeof doc.longitude === 'number' ? doc.longitude : null,
          productsNote: blank(doc.productsNote),
          amenities: Array.isArray(doc.amenities)
            ? doc.amenities.flatMap((row) => (row && typeof row.label === 'string' && row.label.trim() ? [row.label.trim()] : []))
            : [],
          photo: photo && 'url' in photo && typeof photo.url === 'string'
            ? { url: photo.url, alt: typeof photo.alt === 'string' ? photo.alt : doc.name }
            : null,
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
  return stationSeeds.map((station) => ({ ...station, photo: null }))
}

export async function getTimeline() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'timeline',
      limit: 30,
      sort: 'sortOrder',
      overrideAccess: true,
    })
    if (result.docs.length) {
      return result.docs.map((doc) => ({ yearLabel: doc.yearLabel, detail: doc.detail }))
    }
  } catch (error) {
    console.error(error)
  }
  return timelineSeeds.map((item) => ({ yearLabel: item.yearLabel, detail: item.detail }))
}

function storyArticles(): PublicArticle[] {
  return publicStories.map((story) => ({
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    body: story.body,
    category: story.category,
    kind: story.kind,
    publishedOn: story.publishedOn,
    dateLabel: story.dateLabel,
    image: { url: story.image, alt: story.imageAlt },
  }))
}

function imageFor(slug: string, category: string) {
  const story = publicStories.find((item) => item.slug === slug)
  if (story) return { url: story.image, alt: story.imageAlt }
  return categoryVisuals[category] || categoryVisuals.stations
}

export async function getPublishedNews(): Promise<PublicArticle[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'news',
      limit: 40,
      sort: '-publishedOn',
      overrideAccess: true,
      where: { published: { equals: true } },
    })
    const published = result.docs
      .filter((doc) => doc.publishedOn)
      .map((doc) => ({
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        body: doc.body,
        category: doc.category,
        kind: doc.kind,
        publishedOn: doc.publishedOn || null,
        dateLabel: null,
        image: imageFor(doc.slug, doc.category),
      }))
    if (published.length) return published
  } catch (error) {
    console.error(error)
  }
  return storyArticles()
}

export async function getArticle(slug: string) {
  const articles = await getPublishedNews()
  return articles.find((item) => item.slug === slug) || null
}

export async function getDocuments(placement: PublicDocument['placement']): Promise<PublicDocument[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'documents',
      limit: 20,
      overrideAccess: true,
      where: {
        and: [{ published: { equals: true } }, { placement: { equals: placement } }],
      },
    })
    return result.docs.flatMap((doc) => {
      if (!doc.url || !doc.published) return []
      return [{
        title: doc.title || doc.filename || 'Document',
        url: doc.url,
        description: doc.alt || '',
        placement,
      }]
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export const draftTitles = articleDrafts.map((article) => article.title)
