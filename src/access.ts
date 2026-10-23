import type { Access } from 'payload'

export type StaffRole = 'admin' | 'editor' | 'sales'

export function roleOf(user: unknown): StaffRole | null {
  if (!user || typeof user !== 'object') return null
  const role = (user as { role?: string }).role
  if (role === 'admin' || role === 'editor' || role === 'sales') return role
  if ('id' in user) return 'admin'
  return null
}

export const adminRole: Access = ({ req }) => roleOf(req.user) === 'admin'

export const contentWrite: Access = ({ req }) => {
  const role = roleOf(req.user)
  return role === 'admin' || role === 'editor'
}

export const inboxAccess: Access = ({ req }) => {
  const role = roleOf(req.user)
  return role === 'admin' || role === 'sales'
}

export const publishedOrEditor: Access = ({ req }) => {
  const role = roleOf(req.user)
  if (role === 'admin' || role === 'editor') return true
  return { published: { equals: true } }
}

export function hideFromSales({ user }: { user: unknown }) {
  return roleOf(user) === 'sales'
}

export function hideInbox({ user }: { user: unknown }) {
  const role = roleOf(user)
  return role !== 'admin' && role !== 'sales'
}
