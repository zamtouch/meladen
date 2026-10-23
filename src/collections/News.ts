import type { CollectionConfig } from 'payload'

import { contentWrite, hideFromSales, publishedOrEditor } from '../access'
import { writeAudit } from '../lib/audit'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Article', plural: 'News' },
  defaultSort: '-publishedOn',
  admin: {
    useAsTitle: 'title',
    group: 'Updates',
    hidden: hideFromSales,
    defaultColumns: ['title', 'kind', 'category', 'published', 'publishedOn'],
    description:
      'Drafts stay off the public site. Publish only approved, dated text. Do not invent quotes, metrics or photographs. A published article opens at /news/[slug].',
  },
  access: {
    read: publishedOrEditor,
    create: contentWrite,
    update: contentWrite,
    delete: contentWrite,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const published = data?.published ?? originalDoc?.published
        const publishedOn = data?.publishedOn ?? originalDoc?.publishedOn
        if (published && !publishedOn) {
          throw new Error('Add a publication date before publishing.')
        }
        return data
      },
    ],
    afterChange: [
      async ({ req, doc, operation }) => {
        await writeAudit(req, operation, 'news', String(doc.id), `${operation} article ${doc.title}`)
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Company Milestones', value: 'milestones' },
        { label: 'Station Developments', value: 'stations' },
        { label: 'Fuel & Supply Insights', value: 'supply' },
        { label: 'Quality & Safety', value: 'quality' },
        { label: 'Community News', value: 'community' },
      ],
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'insight',
      options: [
        { label: 'Company announcement', value: 'announcement' },
        { label: 'Educational insight', value: 'insight' },
      ],
    },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'publishedOn',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
}
