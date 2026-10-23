import type { CollectionConfig } from 'payload'

import { contentWrite, hideFromSales } from '../access'
import { pictureDir } from '../lib/paths'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Picture', plural: 'Pictures' },
  admin: {
    group: 'Library',
    hidden: hideFromSales,
    description:
      'Upload only photographs Meladen is allowed to publish. Do not present stock images as the company’s fleet, stations or property.',
  },
  access: {
    read: () => true,
    create: contentWrite,
    update: contentWrite,
    delete: contentWrite,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
  upload: {
    staticDir: pictureDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
    formatOptions: { format: 'webp', options: { quality: 72 } },
    resizeOptions: { width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true },
  },
}
