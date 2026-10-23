import type { CollectionConfig, Endpoint, PayloadRequest } from 'payload'

import { hideInbox, inboxAccess } from '../access'
import { writeAudit } from '../lib/audit'

const quoteStatuses = ['new', 'under_review', 'contacted', 'quoted', 'closed_won', 'closed_lost']
const messageStatuses = ['new', 'under_review', 'contacted', 'closed']

function csvCell(value: unknown) {
  const text = String(value ?? '')
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safe.replace(/"/g, '""')}"`
}

async function exportCsv(req: PayloadRequest, collection: 'quotes' | 'messages', filename: string) {
  if (!inboxAccess({ req })) {
    return Response.json({ message: 'Not allowed' }, { status: 403 })
  }
  const result = await req.payload.find({
    collection,
    limit: 2000,
    sort: '-createdAt',
    overrideAccess: true,
    depth: 0,
  })
  const docs = result.docs as unknown as Record<string, unknown>[]
  const columns = docs.length ? Object.keys(docs[0]).filter((key) => !['updatedAt'].includes(key)) : ['reference']
  const lines = [
    columns.join(','),
    ...docs.map((doc) => columns.map((key) => csvCell(doc[key])).join(',')),
  ]
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}

const quoteExport: Endpoint = {
  path: '/export',
  method: 'get',
  handler: (req) => exportCsv(req, 'quotes', 'meladen-bulk-enquiries.csv'),
}

const messageExport: Endpoint = {
  path: '/export',
  method: 'get',
  handler: (req) => exportCsv(req, 'messages', 'meladen-messages.csv'),
}

const noticeFields = [
  {
    name: 'notificationStatus',
    type: 'select' as const,
    defaultValue: 'not_configured',
    options: ['notified', 'failed', 'not_configured'],
    admin: { readOnly: true, description: 'Email failure does not remove the saved enquiry.' },
  },
  { name: 'notificationDetail', type: 'textarea' as const, admin: { readOnly: true } },
]

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  labels: { singular: 'Bulk enquiry', plural: 'Bulk enquiries' },
  admin: {
    useAsTitle: 'reference',
    group: 'Inbox',
    hidden: hideInbox,
    defaultColumns: ['reference', 'organisation', 'product', 'status', 'notificationStatus', 'createdAt'],
    description:
      'Submitted from Products & Bulk Supply. Status labels are internal workflow states. Download a spreadsheet at /api/quotes/export while signed in.',
  },
  access: {
    read: inboxAccess,
    create: () => false,
    update: inboxAccess,
    delete: inboxAccess,
  },
  endpoints: [quoteExport],
  hooks: {
    afterChange: [
      async ({ req, doc, operation }) => {
        if (!req.user) return
        await writeAudit(req, operation, 'quotes', String(doc.id), `${operation} enquiry ${doc.reference} (${doc.status})`)
      },
    ],
  },
  fields: [
    { name: 'reference', type: 'text', required: true, unique: true },
    { name: 'organisation', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    {
      name: 'product',
      type: 'select',
      required: true,
      options: [
        { label: '50ppm Low Sulphur Diesel', value: '50ppm' },
        { label: 'Other Requirement', value: 'other' },
      ],
    },
    { name: 'quantityLitres', type: 'number', required: true, min: 0 },
    { name: 'deliveryTown', type: 'text', required: true },
    { name: 'deliveryAddress', type: 'textarea' },
    { name: 'preferredDate', type: 'text' },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      options: [
        { label: 'One-off', value: 'one-off' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'To be discussed', value: 'discuss' },
      ],
    },
    { name: 'requirements', type: 'textarea' },
    { name: 'privacyAccepted', type: 'checkbox', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: quoteStatuses,
      admin: { description: 'Software workflow only. These labels are not a published Meladen operating procedure.' },
    },
    ...noticeFields,
  ],
}

export const Messages: CollectionConfig = {
  slug: 'messages',
  labels: { singular: 'Message', plural: 'Messages' },
  admin: {
    useAsTitle: 'reference',
    group: 'Inbox',
    hidden: hideInbox,
    defaultColumns: ['reference', 'name', 'category', 'status', 'createdAt'],
    description: 'Submitted from Contact. Download a spreadsheet at /api/messages/export while signed in.',
  },
  access: {
    read: inboxAccess,
    create: () => false,
    update: inboxAccess,
    delete: inboxAccess,
  },
  endpoints: [messageExport],
  hooks: {
    afterChange: [
      async ({ req, doc, operation }) => {
        if (!req.user) return
        await writeAudit(req, operation, 'messages', String(doc.id), `${operation} message ${doc.reference}`)
      },
    ],
  },
  fields: [
    { name: 'reference', type: 'text', required: true, unique: true },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Fuel Station Enquiry', value: 'station' },
        { label: 'Partnership or Business Enquiry', value: 'partnership' },
        { label: 'General Enquiry', value: 'general' },
        { label: 'Feedback', value: 'feedback' },
      ],
    },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'privacyAccepted', type: 'checkbox', required: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'new', options: messageStatuses },
    ...noticeFields,
  ],
}
