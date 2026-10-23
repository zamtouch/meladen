'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { notifyStaff } from '@/lib/notify'

export type FormState = { error?: string; ok?: string; reference?: string }

const hits = new Map<string, { count: number; reset: number }>()

function tooFast(key: string) {
  const now = Date.now()
  const current = hits.get(key)
  if (!current || current.reset < now) {
    hits.set(key, { count: 1, reset: now + 10 * 60 * 1000 })
    return false
  }
  current.count += 1
  return current.count > 6
}

function honeypot(formData: FormData) {
  return String(formData.get('company_website') || '').trim().length > 0
}

function clean(value: FormDataEntryValue | null, max = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max)
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120
}

function validPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15 && /^[+0-9()\-\s]+$/.test(phone)
}

function reference(prefix: 'MLQ' | 'MLC') {
  const date = new Date()
  const stamp = [
    String(date.getFullYear()).slice(2),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${stamp}-${rand}`
}

async function clientKey(action: string) {
  const headerStore = await headers()
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  return `${ip}:${action}`
}

export async function sendQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  if (honeypot(formData)) {
    return { ok: 'Thank you. Your enquiry has been received.' }
  }
  if (tooFast(await clientKey('quote'))) {
    return { error: 'We could not submit your request at this time. Please retry or contact Meladen directly using the listed phone numbers.' }
  }

  const organisation = clean(formData.get('organisation'), 120)
  const contactName = clean(formData.get('contactName'), 80)
  const email = clean(formData.get('email'), 120)
  const phone = clean(formData.get('phone'), 24)
  const product = clean(formData.get('product'), 20)
  const quantity = Number(clean(formData.get('quantity'), 12))
  const deliveryTown = clean(formData.get('deliveryTown'), 80)
  const deliveryAddress = clean(formData.get('deliveryAddress'), 240)
  const preferredDate = clean(formData.get('preferredDate'), 12)
  const frequency = clean(formData.get('frequency'), 20)
  const requirements = clean(formData.get('requirements'), 1000)
  const privacy = formData.get('privacy') === 'yes'

  if (!organisation || !contactName || !validEmail(email) || !validPhone(phone) || !deliveryTown || !privacy) {
    return { error: 'Check the required fields, including a valid email, phone number and the privacy acknowledgement.' }
  }
  if (product !== '50ppm' && product !== 'other') return { error: 'Choose a product.' }
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 5000000) {
    return { error: 'Enter an estimated quantity in litres.' }
  }
  if (!['one-off', 'weekly', 'monthly', 'discuss'].includes(frequency)) return { error: 'Choose a supply frequency.' }
  if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return { error: 'Enter the preferred date as a calendar date, or leave it blank.' }
  }

  const ref = reference('MLQ')
  try {
    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'quotes',
      overrideAccess: true,
      data: {
        reference: ref,
        organisation,
        contactName,
        email,
        phone,
        product: product as '50ppm' | 'other',
        quantityLitres: quantity,
        deliveryTown,
        deliveryAddress,
        preferredDate,
        frequency: frequency as 'one-off' | 'weekly' | 'monthly' | 'discuss',
        requirements,
        privacyAccepted: true,
        status: 'new',
        notificationStatus: 'not_configured',
      },
    })
    const notice = await notifyStaff(
      `Bulk fuel enquiry ${ref}`,
      [
        `Reference: ${ref}`,
        `Organisation: ${organisation}`,
        `Contact: ${contactName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Product: ${product}`,
        `Quantity (litres): ${quantity}`,
        `Town: ${deliveryTown}`,
        deliveryAddress ? `Address: ${deliveryAddress}` : '',
        preferredDate ? `Preferred date (not guaranteed): ${preferredDate}` : '',
        `Frequency: ${frequency}`,
        requirements ? `Notes: ${requirements}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    await payload.update({
      collection: 'quotes',
      id: created.id,
      overrideAccess: true,
      data: { notificationStatus: notice.status, notificationDetail: notice.detail },
    })
  } catch (error) {
    console.error(error)
    return { error: 'We could not submit your request at this time. Please retry or contact Meladen directly using the listed phone numbers.' }
  }

  return {
    ok: `Thank you. Your enquiry has been received. Your reference is ${ref}. Our team will review the details and contact you using the information supplied.`,
    reference: ref,
  }
}

export async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  if (honeypot(formData)) return { ok: 'Thank you for getting in touch. Your message has been received. Our team will review your enquiry.' }
  if (tooFast(await clientKey('contact'))) {
    return { error: 'Your message could not be sent. Please retry or use the published telephone or email contacts.' }
  }

  const name = clean(formData.get('name'), 80)
  const email = clean(formData.get('email'), 120)
  const phone = clean(formData.get('phone'), 24)
  const category = clean(formData.get('category'), 24)
  const subject = clean(formData.get('subject'), 120)
  const message = clean(formData.get('message'), 2000)
  const privacy = formData.get('privacy') === 'yes'
  const categories = ['station', 'partnership', 'general', 'feedback']

  if (!name || !validEmail(email) || !subject || message.length < 10 || !privacy || !categories.includes(category)) {
    return { error: 'Enter your name, email, subject, message and privacy acknowledgement.' }
  }
  if (phone && !validPhone(phone)) return { error: 'Enter a valid telephone number or leave it blank.' }
  if (category === 'bulk') {
    return { error: 'Bulk fuel supply requests should use the quotation form on the Products page.' }
  }

  const ref = reference('MLC')
  try {
    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'messages',
      overrideAccess: true,
      data: {
        reference: ref,
        name,
        email,
        phone,
        category: category as 'station' | 'partnership' | 'general' | 'feedback',
        subject,
        message,
        privacyAccepted: true,
        status: 'new',
        notificationStatus: 'not_configured',
      },
    })
    const notice = await notifyStaff(
      `Website message ${ref}`,
      [`Reference: ${ref}`, `Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : '', `Category: ${category}`, `Subject: ${subject}`, '', message]
        .filter(Boolean)
        .join('\n'),
    )
    await payload.update({
      collection: 'messages',
      id: created.id,
      overrideAccess: true,
      data: { notificationStatus: notice.status, notificationDetail: notice.detail },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Your message could not be sent. Please retry or use the published telephone or email contacts.' }
  }

  return { ok: 'Thank you for getting in touch. Your message has been received. Our team will review your enquiry.', reference: ref }
}
