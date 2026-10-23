import type { Field, GlobalConfig, Tab } from 'payload'

import { contentWrite, hideFromSales } from '../access'
import { copySchema } from '../content/copy'

const tabs = ['Home', 'About', 'Solutions', 'Stations', 'Responsibility', 'News', 'Contact']

export const PageCopy: GlobalConfig = {
  slug: 'page-copy',
  label: 'Page wording',
  admin: {
    group: 'Pages',
    hidden: hideFromSales,
    description: 'Wording for the seven public pages. Safety notes, station records and news are edited in their own sections.',
  },
  access: { read: () => true, update: contentWrite },
  fields: [
    {
      type: 'tabs',
      tabs: tabs.map((label): Tab => ({
        label,
        fields: copySchema
          .filter((field) => field.tab === label)
          .map((field): Field => (
            'textarea' in field && field.textarea
              ? { name: field.name, label: field.label, type: 'textarea' }
              : { name: field.name, label: field.label, type: 'text' }
          )),
      })),
    },
  ],
}
