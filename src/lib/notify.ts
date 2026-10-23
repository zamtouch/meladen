export type NoticeResult = { status: 'notified' | 'failed' | 'not_configured'; detail: string }

export async function notifyStaff(subject: string, text: string): Promise<NoticeResult> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_NOTIFY_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!key || !to || !from) {
    return {
      status: 'not_configured',
      detail: 'Saved without email. Set RESEND_API_KEY, ENQUIRY_FROM_EMAIL and ENQUIRY_NOTIFY_EMAIL to notify staff.',
    }
  }

  let last = 'Email was not accepted.'
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: to.split(',').map((item) => item.trim()).filter(Boolean),
          subject,
          text,
        }),
      })
      if (response.ok) return { status: 'notified', detail: 'Notification email accepted.' }
      last = `Email provider returned ${response.status}.`
    } catch (error) {
      last = error instanceof Error ? error.message : 'Email request failed.'
    }
  }
  return { status: 'failed', detail: last }
}
