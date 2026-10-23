import type { CollectionConfig } from 'payload'

import { contentWrite, hideFromSales, publishedOrEditor } from '../access'
import { publicationDir } from '../lib/paths'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Document', plural: 'Documents' },
  admin: {
    group: 'Library',
    hidden: hideFromSales,
    useAsTitle: 'title',
    description: 'Approved files only. Leave unpublished until the company has cleared the document for the public site.',
  },
  access: {
    read: publishedOrEditor,
    create: contentWrite,
    update: contentWrite,
    delete: contentWrite,
  },
  upload: {
    staticDir: publicationDir,
    mimeTypes: ['application/pdf'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'alt', type: 'text', label: 'Description', required: true },
    {
      name: 'placement',
      type: 'select',
      required: true,
      defaultValue: 'about',
      options: [
        { label: 'About', value: 'about' },
        { label: 'Products & Bulk Supply', value: 'solutions' },
        { label: 'Quality & Responsibility', value: 'responsibility' },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Unpublished files stay off the public site.' },
    },
  ],
}
