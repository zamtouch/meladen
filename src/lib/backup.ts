import fs from 'fs'
import path from 'path'
import { DatabaseSync } from 'node:sqlite'

function inspect(file: string) {
  if (!fs.existsSync(file)) return 'missing'
  let db: DatabaseSync | null = null
  try {
    db = new DatabaseSync(file, { readOnly: true })
    const row = db.prepare('PRAGMA integrity_check').get() as Record<string, unknown> | undefined
    const value = row ? String(row.integrity_check ?? Object.values(row)[0] ?? '') : ''
    return value === 'ok' ? 'ok' : 'corrupt'
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return /busy|locked/i.test(message) ? 'busy' : 'corrupt'
  } finally {
    db?.close()
  }
}

export function backupDatabase(dbFile: string, dir: string, keep = 15) {
  const state = inspect(dbFile)
  if (state !== 'ok') return { ok: false as const, reason: state }
  fs.mkdirSync(dir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const dest = path.join(dir, `meladen-${stamp}.db`)
  const db = new DatabaseSync(dbFile)
  try {
    const sqlPath = dest.replace(/\\/g, '/').replace(/'/g, "''")
    db.exec(`VACUUM INTO '${sqlPath}'`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (/busy|locked/i.test(message)) return { ok: false as const, reason: 'busy' }
    throw error
  } finally {
    db.close()
  }
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.db'))
    .map((file) => path.join(dir, file))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
  for (const file of files.slice(keep)) fs.rmSync(file, { force: true })
  return { ok: true as const, file: dest }
}
