import type { GlobalConfig } from 'payload'

import { contentWrite, hideFromSales } from '../access'
import { company } from '../content/site'
import { writeAudit } from '../lib/audit'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Contact details',
  admin: {
    group: 'Setup',
    hidden: hideFromSales,
    description: 'Office details shown on the public site. Do not add registration numbers that have not been supplied.',
  },
  access: { read: () => true, update: contentWrite },
  hooks: {
    afterChange: [
      async ({ req, doc }) => {
        if (!req.user) return
        await writeAudit(req, 'update', 'site-settings', String(doc.id), 'Updated contact details')
      },
    ],
  },
  fields: [
    { name: 'organisation', type: 'text', required: true, defaultValue: company.name },
    { name: 'tagline', type: 'text', required: true, defaultValue: company.tagline },
    { name: 'email', type: 'email', required: true, defaultValue: company.email },
    {
      name: 'phones',
      type: 'textarea',
      required: true,
      defaultValue: company.phones.join('\n'),
      admin: { description: 'One telephone number per line.' },
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      defaultValue: company.address.join('\n'),
      admin: { description: 'Office address. One line per row. A map is not shown until a pin is verified.' },
    },
    { name: 'logisticsPartner', type: 'text', required: true, defaultValue: company.logisticsPartner },
  ],
}
