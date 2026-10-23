'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { footerNav, homeServices } from '@/content/site'
import type { PublicSettings } from '@/lib/content'
import { TrackedLink } from '@/components/Track'

export function Footer({ settings, established }: { settings: Omit<PublicSettings, 'email'>; established: number }) {
  return (
    <footer className="gv-foot">
      <div className="gv-foot-grid">
        <div className="gv-foot-brand">
          <Link href="/" aria-label="Meladen Energy home">
            <img src="/brand/logo.png" alt="" />
          </Link>
          <p>{settings.tagline}. Petroleum retail, distribution and bulk supply from Ndola. Established {established}.</p>
        </div>
        <div>
          <h2>Explore</h2>
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div>
          <h2>Supply</h2>
          {homeServices.map((service) => (
            <Link key={service.title} href={service.href}>{service.title}</Link>
          ))}
        </div>
        <div>
          <h2>Office</h2>
          {settings.address.map((line) => <p key={line}>{line}</p>)}
          <div className="gv-foot-phones">
            {settings.phones.map((phone) => (
              <TrackedLink key={phone} href={`tel:${phone.replace(/\s/g, '')}`} event="phone_clicked" params={{ channel: 'phone' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 8.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z" />
                </svg>
                {phone}
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
      <div className="gv-foot-bottom">
        <span>© {new Date().getFullYear()} {settings.organisation} | <a className="gv-foot-credit" href="https://cairoai.africa" target="_blank" rel="noopener noreferrer">Website by CairoAI</a></span>
        <PrivacyNotice />
      </div>
    </footer>
  )
}

export function PrivacyNotice() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const openNotice = () => setOpen(true)
    window.addEventListener('open-privacy', openNotice)
    return () => window.removeEventListener('open-privacy', openNotice)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button type="button" className="text-button" onClick={() => setOpen(true)}>Enquiry privacy notice</button>
      {open ? (
        <div className="modal-back" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="kicker">Privacy</p>
            <h2 id="privacy-title">Enquiry privacy notice</h2>
            <p>
              When you send a bulk fuel enquiry or a contact message, Meladen Energy stores the details in that form so the team can review the request and reply.
              The website does not calculate a fuel price and it does not take payment.
            </p>
            <p>
              A formal privacy policy and retention period are still to be approved by the company. Until then, enquiries are kept for follow-up.
              To ask about a saved enquiry, use the contact form or call the office.
            </p>
            <button type="button" className="button forest" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export function openPrivacy() {
  window.dispatchEvent(new Event('open-privacy'))
}
