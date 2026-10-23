import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export const projectRoot = root
export const pictureDir = path.join(root, 'public', 'uploads', 'pictures')
export const publicationDir = path.join(root, 'public', 'uploads', 'publications')
export const backupDir = path.join(root, 'data', 'backups')

export function dbFileFromUrl(url = process.env.DATABASE_URL || 'file:./meladen.db', cwd = process.cwd()) {
  const raw = url.replace(/^file:/, '')
  return path.isAbsolute(raw) ? raw : path.resolve(cwd, raw)
}
