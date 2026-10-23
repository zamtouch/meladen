import type { CollectionConfig } from 'payload'

import { adminRole } from '../access'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: { singular: 'Audit log', plural: 'Audit log' },
  admin: {
    useAsTitle: 'summary',
    group: 'Setup',
    defaultColumns: ['createdAt', 'actor', 'action', 'target', 'summary'],
    description: 'Recorded when staff change stations, news or enquiries.',
  },
  access: {
    read: adminRole,
    create: () => false,
    update: () => false,
    delete: adminRole,
  },
  fields: [
    { name: 'actor', type: 'text', required: true },
    { name: 'action', type: 'text', required: true },
    { name: 'target', type: 'text', required: true },
    { name: 'targetId', type: 'text' },
    { name: 'summary', type: 'textarea', required: true },
  ],
}
