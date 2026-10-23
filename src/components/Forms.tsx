'use client'

import { useActionState, useEffect, useId, useState } from 'react'

import { openPrivacy } from '@/components/SiteChrome'
import { contactCategories, quoteFrequencies, quoteProducts } from '@/content/site'
import { sendMessage, sendQuote, type FormState } from '@/lib/actions'
import { track } from '@/components/Track'

const empty: FormState = {}

function Honey() {
  return (
    <p className="honey">
      <label>
        Company website
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export function openQuote() {
  window.dispatchEvent(new Event('open-quote'))
  if (window.location.hash !== '#request-quote') {
    const next = `${window.location.pathname}${window.location.search}#request-quote`
    window.history.pushState(null, '', next)
  }
}

export function QuoteTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="gv-pill" onClick={openQuote}>
      {children}
      <span aria-hidden="true"><Arrow /></span>
    </button>
  )
}

export function QuoteEnquiry({
  title,
  intro,
  defaults,
}: {
  title: string
  intro: string
  defaults?: { name?: string; email?: string; phone?: string; note?: string }
}) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('open-quote', show)
    const onHash = () => setOpen(window.location.hash === '#request-quote')
    onHash()
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => {
      window.removeEventListener('open-quote', show)
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function close() {
    setOpen(false)
    if (window.location.hash === '#request-quote') {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`)
    }
  }

  return (
    <>
      <div className="supply-enquiry">
        <div>
          <h2>{title}</h2>
          <p>{intro}</p>
          <p className="caption">This request does not confirm a price, a delivery time or stock availability.</p>
          <p className="supply-action"><QuoteTrigger>Request a quotation</QuoteTrigger></p>
        </div>
        <ul className="supply-brief">
          <li><b>1</b><span>Organisation and a contact</span></li>
          <li><b>2</b><span>Product, quantity and frequency</span></li>
          <li><b>3</b><span>Delivery town, site and preferred date</span></li>
        </ul>
      </div>
      {open ? (
        <div className="modal-back" role="presentation" onClick={close}>
          <div
            className="modal quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quote-modal-bar">
              <div>
                <h2 id={titleId}>{title}</h2>
                <p>{intro}</p>
              </div>
              <button type="button" className="quote-close" onClick={close} aria-label="Close enquiry">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="quote-modal-body">
              <p className="caption">This request does not confirm a price, a delivery time or stock availability.</p>
              <QuoteForm defaults={defaults} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export function QuoteForm({
  defaults,
}: {
  defaults?: { name?: string; email?: string; phone?: string; note?: string }
}) {
  const [state, action, pending] = useActionState(sendQuote, empty)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (state.reference) track('bulk_quote_submitted')
  }, [state.reference])

  function start() {
    if (started) return
    setStarted(true)
    track('bulk_quote_started')
  }

  if (state.ok) {
    return (
      <div className="form-success" role="status">
        <p>{state.ok}</p>
      </div>
    )
  }

  return (
    <form className="stack-form" action={action} onFocus={start}>
      <Honey />
      <label>
        Organisation / business name
        <input name="organisation" required maxLength={120} autoComplete="organization" />
      </label>
      <div className="form-row">
        <label>
          Contact person’s full name
          <input name="contactName" required maxLength={80} autoComplete="name" defaultValue={defaults?.name || ''} />
        </label>
        <label>
          Email
          <input name="email" type="email" required maxLength={120} autoComplete="email" defaultValue={defaults?.email || ''} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone / WhatsApp
          <input name="phone" required maxLength={24} autoComplete="tel" defaultValue={defaults?.phone || ''} placeholder="+260 …" />
        </label>
        <label>
          Product
          <select name="product" required defaultValue="50ppm">
            {quoteProducts.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          Estimated quantity (litres)
          <input name="quantity" type="number" required min={1} step="1" inputMode="numeric" />
        </label>
        <label>
          Delivery town / district
          <input name="deliveryTown" required maxLength={80} />
        </label>
      </div>
      <label>
        Delivery address / site description
        <textarea name="deliveryAddress" maxLength={240} rows={3} />
      </label>
      <div className="form-row">
        <label>
          Preferred delivery date
          <input name="preferredDate" type="date" />
          <small>Optional. A date here is not a confirmed delivery.</small>
        </label>
        <label>
          Supply frequency
          <select name="frequency" required defaultValue="discuss">
            {quoteFrequencies.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <label>
        Additional requirements
        <textarea name="requirements" maxLength={1000} rows={4} defaultValue={defaults?.note || ''} />
      </label>
      <label className="check">
        <input name="privacy" type="checkbox" value="yes" required />
        <span>I understand Meladen Energy will store these details to review this enquiry and contact me.</span>
      </label>
      <button type="button" className="text-button" onClick={openPrivacy}>Read the enquiry privacy notice</button>
      {state.error ? <p className="form-error" role="alert">{state.error}</p> : null}
      <button className="button lime" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send Fuel Enquiry'}</button>
    </form>
  )
}

export function ContactForm({
  compact = false,
  defaults,
}: {
  compact?: boolean
  defaults?: { name?: string; email?: string; phone?: string }
}) {
  const [state, action, pending] = useActionState(sendMessage, empty)
  const [category, setCategory] = useState('general')

  useEffect(() => {
    if (state.reference) track('contact_submitted')
  }, [state.reference])
  const [name, setName] = useState(defaults?.name || '')
  const [email, setEmail] = useState(defaults?.email || '')
  const [phone, setPhone] = useState(defaults?.phone || '')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  if (state.ok) {
    return (
      <div className="form-success" role="status">
        <p>{state.ok}</p>
      </div>
    )
  }

  const bulkHref = `/solutions?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&note=${encodeURIComponent(message)}#request-quote`

  if (compact) {
    return (
      <form className="stack-form compact-form" action={action}>
        <Honey />
        <input type="hidden" name="category" value="general" />
        <input type="hidden" name="subject" value="Website request" />
        <label>
          Full name
          <input name="name" required maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email address
          <input name="email" type="email" required maxLength={120} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Request
          <textarea name="message" required minLength={10} maxLength={2000} rows={3} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can Meladen help?" />
        </label>
        <label className="check">
          <input name="privacy" type="checkbox" value="yes" required />
          <span>I understand Meladen Energy will store these details to review this request and contact me.</span>
        </label>
        {state.error ? <p className="form-error" role="alert">{state.error}</p> : null}
        <button className="button secondary" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Submit request'}</button>
        <p className="compact-note"><a href="/solutions#request-quote">Bulk fuel quotation</a></p>
      </form>
    )
  }

  return (
    <form className="stack-form" action={action}>
      <Honey />
      <div className="form-row">
        <label>
          Full name
          <input name="name" required maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email
          <input name="email" type="email" required maxLength={120} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Telephone
          <input name="phone" maxLength={24} autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          Enquiry category
          <select name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {contactCategories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>
      {category === 'bulk' ? (
        <div className="guide" role="note">
          <p>Bulk fuel quotations use a dedicated form so the team receives volume, location and product details.</p>
          <a className="button forest" href={bulkHref}>Continue to the bulk fuel form</a>
        </div>
      ) : (
        <>
          <label>
            Subject
            <input name="subject" required maxLength={120} value={subject} onChange={(event) => setSubject(event.target.value)} />
          </label>
          <label>
            Message
            <textarea name="message" required minLength={10} maxLength={2000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <label className="check">
            <input name="privacy" type="checkbox" value="yes" required />
            <span>I understand Meladen Energy will store these details to review this message and contact me.</span>
          </label>
          <button type="button" className="text-button" onClick={openPrivacy}>Read the enquiry privacy notice</button>
          {state.error ? <p className="form-error" role="alert">{state.error}</p> : null}
          <button className="button lime" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send message'}</button>
        </>
      )}
    </form>
  )
}
