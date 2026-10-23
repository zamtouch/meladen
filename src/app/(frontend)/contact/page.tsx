import { ContactForm } from '@/components/Forms'
import { heading, Paragraphs } from '@/components/Mark'
import { TrackedLink } from '@/components/Track'
import { company } from '@/content/site'
import { getCopy, getSettings } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta(
  'Contact Meladen Energy | Ndola, Zambia',
  'Contact Meladen Energy in Ndola for bulk fuel enquiries, station information, business correspondence and general support.',
  '/contact',
)

function Pin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

function Phone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 8.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z" />
    </svg>
  )
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; email?: string; phone?: string }>
}) {
  const [copy, settings, query] = await Promise.all([getCopy(), getSettings(), searchParams])

  return (
    <main>
      <header className="page-banner about-banner contact-banner">
        <div className="wrap about-banner-copy">
          <div>
            <h1>Contact us</h1>
            <p className="page-banner-lead">{heading(copy.contactTitle)}</p>
          </div>
          <dl className="about-hero-stats">
            <div><dd>Ndola</dd><dt>Head office</dt></div>
            <div><dd>{settings.phones.length}</dd><dt>Direct lines</dt></div>
            <div><dd>{company.logisticsPartner.split(' ')[0]}</dd><dt>Logistics partner</dt></div>
          </dl>
        </div>
      </header>
      <section className="wrap section contact-layout">
        <p className="contact-intro">{copy.contactIntro}</p>
        <article className="office-card contact-office">
          <p className="contact-kicker">Head office</p>
          <h2>{settings.organisation}</h2>
          <div className="contact-address">
            <span className="about-icon"><Pin /></span>
            <div>
              {settings.address.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className="contact-phones">
            {settings.phones.map((phone) => (
              <TrackedLink key={phone} className="contact-phone" href={`tel:${phone.replace(/\s/g, '')}`} event="phone_clicked" params={{ channel: 'phone' }}>
                <span className="about-icon"><Phone /></span>
                {phone}
              </TrackedLink>
            ))}
          </div>
          <p className="caption">Sister company: {company.logisticsPartner}. A map will be added after the office location pin is verified.</p>
        </article>
        <div className="form-card contact-form">
          <h2>{heading(copy.contactFormTitle)}</h2>
          <ContactForm defaults={query} />
        </div>
        <div className="contact-close">
          <strong>{heading(copy.contactCloseTitle)}</strong>
          <Paragraphs text={copy.contactCloseBody} />
        </div>
      </section>
    </main>
  )
}
