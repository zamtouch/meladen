import type { CollectionConfig } from 'payload'

import { contentWrite, hideFromSales } from '../access'
import { writeAudit } from '../lib/audit'

export const Stations: CollectionConfig = {
  slug: 'stations',
  labels: { singular: 'Station', plural: 'Stations' },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    group: 'Network',
    hidden: hideFromSales,
    defaultColumns: ['name', 'province', 'status', 'sortOrder'],
    description:
      'Four stations are reported operating: Mwense, Musangu, Kabompo and Chienge. Sesheke and Solwezi are planned. Leave unknown address, hours, phone and map fields empty.',
  },
  access: {
    read: () => true,
    create: contentWrite,
    update: contentWrite,
    delete: contentWrite,
  },
  hooks: {
    afterChange: [
      async ({ req, doc, operation }) => {
        await writeAudit(req, operation, 'stations', String(doc.id), `${operation} station ${doc.name}`)
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'province', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'operational',
      options: [
        { label: 'Operating', value: 'operational' },
        { label: 'Planned', value: 'planned' },
        { label: 'Temporarily unavailable', value: 'temporarily-unavailable' },
      ],
      admin: {
        description: 'Keep Sesheke and Solwezi as planned until they are actually operating. Temporarily unavailable is for a real site that is closed for a period.',
      },
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'openedLabel',
      type: 'text',
      admin: { description: 'Example: 2024 or December 2025. Leave empty when the date is not confirmed.' },
    },
    { name: 'address', type: 'textarea' },
    { name: 'phone', type: 'text' },
    {
      name: 'hours',
      type: 'text',
      admin: { description: 'Leave empty until verified for this site. Do not enter a 24-hour claim unless that site has been confirmed.' },
    },
    { name: 'latitude', type: 'number' },
    { name: 'longitude', type: 'number' },
    {
      name: 'productsNote',
      type: 'textarea',
      admin: { description: 'Only products confirmed at this station. Leave empty if availability is not verified.' },
    },
    {
      name: 'amenities',
      type: 'array',
      labels: { singular: 'Amenity', plural: 'Amenities' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. Use a photograph of this station that Meladen is allowed to publish.' },
    },
    { name: 'sortOrder', type: 'number', required: true, defaultValue: 1 },
  ],
}
