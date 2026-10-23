'use client'

import type { ReactNode } from 'react'

type EventName =
  | 'bulk_quote_started'
  | 'bulk_quote_submitted'
  | 'contact_submitted'
  | 'station_selected'
  | 'directions_clicked'
  | 'phone_clicked'
  | 'company_profile_downloaded'

export function track(event: EventName, params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const view = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
  view.dataLayer = view.dataLayer || []
  view.dataLayer.push({ event, ...params })
  view.gtag?.('event', event, params)
}

export function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  external = false,
}: {
  href: string
  event: EventName
  params?: Record<string, string>
  className?: string
  children: ReactNode
  external?: boolean
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => track(event, params)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
