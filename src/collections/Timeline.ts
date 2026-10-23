import type { CollectionConfig } from 'payload'

import { contentWrite, hideFromSales } from '../access'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  labels: { singular: 'Milestone', plural: 'Timeline' },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'yearLabel',
    group: 'Network',
    hidden: hideFromSales,
    description: 'Dates that are not confirmed should stay labelled as such. Do not invent a month or year.',
  },
  access: {
    read: () => true,
    create: contentWrite,
    update: contentWrite,
    delete: contentWrite,
  },
  fields: [
    { name: 'yearLabel', type: 'text', required: true },
    { name: 'detail', type: 'textarea', required: true },
    { name: 'sortOrder', type: 'number', required: true, defaultValue: 1 },
  ],
}
