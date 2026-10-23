import type { Payload } from 'payload'

import { blueprintCopy } from '../content/copy'
import { articleDrafts, company, stations, timeline } from '../content/site'

export async function seedIfEmpty(payload: Payload) {
  const existingStations = await payload.find({ collection: 'stations', limit: 1 })
  if (existingStations.totalDocs === 0) {
    for (const station of stations) {
      await payload.create({
        collection: 'stations',
        data: {
          name: station.name,
          slug: station.slug,
          province: station.province,
          status: station.status,
          summary: station.summary,
          sortOrder: station.sortOrder,
          ...(station.openedLabel ? { openedLabel: station.openedLabel } : {}),
          amenities: station.amenities.map((label) => ({ label })),
        },
      })
    }
  }

  const existingTimeline = await payload.find({ collection: 'timeline', limit: 1 })
  if (existingTimeline.totalDocs === 0) {
    for (const event of timeline) {
      await payload.create({ collection: 'timeline', data: event })
    }
  }

  const existingNews = await payload.find({ collection: 'news', limit: 1, overrideAccess: true })
  if (existingNews.totalDocs === 0) {
    for (const article of articleDrafts) {
      await payload.create({
        collection: 'news',
        data: { ...article, published: false },
      })
    }
  }

  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings.email) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        organisation: company.name,
        tagline: company.tagline,
        email: company.email,
        phones: company.phones.join('\n'),
        address: company.address.join('\n'),
        logisticsPartner: company.logisticsPartner,
      },
    })
  }

  const copy = await payload.findGlobal({ slug: 'page-copy' })
  if (!copy.homeHeroTitle) {
    await payload.updateGlobal({ slug: 'page-copy', data: blueprintCopy() })
  }

  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const users = await payload.find({ collection: 'users', limit: 1 })
    if (users.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Meladen Administrator', role: 'admin' },
      })
    }
  }
}
