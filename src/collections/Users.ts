import type { CollectionConfig } from 'payload'

import { adminRole, roleOf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Staff account', plural: 'Staff' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Setup',
    description: 'Administrator, content editor, and sales accounts. Only an administrator can change roles.',
  },
  access: {
    read: ({ req }) => {
      if (roleOf(req.user) === 'admin') return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    create: adminRole,
    update: ({ req }) => {
      if (roleOf(req.user) === 'admin') return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    delete: adminRole,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'Sales User', value: 'sales' },
      ],
      access: {
        update: ({ req }) => roleOf(req.user) === 'admin',
      },
      admin: {
        description: 'Editors manage pages, stations and news. Sales users manage enquiries. Administrators can do both.',
      },
    },
  ],
}
