import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AuditLogs } from './collections/AuditLogs'
import { Documents } from './collections/Documents'
import { Messages, Quotes } from './collections/Enquiries'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Stations } from './collections/Stations'
import { Timeline } from './collections/Timeline'
import { Users } from './collections/Users'
import { PageCopy } from './globals/PageCopy'
import { SiteSettings } from './globals/SiteSettings'
import { backupDatabase } from './lib/backup'
import { backupDir, dbFileFromUrl } from './lib/paths'
import { seedIfEmpty } from './seed/run'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config()

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '· Meladen Energy',
      icons: [{ url: '/favicon.png', type: 'image/png' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Documents, Stations, Timeline, News, Quotes, Messages, AuditLogs],
  globals: [SiteSettings, PageCopy],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'meladen-dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./meladen.db' },
    push: true,
  }),
  sharp,
  onInit: async (payload) => {
    try {
      await seedIfEmpty(payload)
      const saved = backupDatabase(dbFileFromUrl(), backupDir)
      if (!saved.ok && saved.reason !== 'missing') payload.logger.warn(`Database backup skipped: ${saved.reason}`)
    } catch (error) {
      payload.logger.error(error)
    }
  },
})
