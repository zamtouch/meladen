import type { PayloadRequest } from 'payload'

export async function writeAudit(
  req: PayloadRequest,
  action: string,
  target: string,
  targetId: string,
  summary: string,
) {
  try {
    await req.payload.create({
      collection: 'audit-logs',
      overrideAccess: true,
      req,
      data: {
        actor: req.user?.email || 'system',
        action,
        target,
        targetId,
        summary: summary.slice(0, 500),
      },
    })
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'Audit log was not saved' })
  }
}
