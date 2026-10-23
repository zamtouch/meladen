import { Pill } from '@/components/GvHeader'
import { QuoteEnquiry, QuoteTrigger } from '@/components/Forms'
import { heading, Paragraphs } from '@/components/Mark'
import { TrackedLink } from '@/components/Track'
import { bulkCapabilities, faqs, quoteSteps } from '@/content/site'
import { getCopy, getDocuments } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

export const metadata = pageMeta(
  'Petroleum Products & Bulk Diesel Supply | Meladen Energy',
  'Explore Unleaded Premium, Low Sulphur Gasoil, 50ppm bulk diesel supply and petroleum logistics arrangements from Meladen Energy.',
  '/solutions',
)

export default async function SolutionsPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; email?: string; phone?: string; note?: string }>
}) {
  const [copy, documents, query] = await Promise.all([getCopy(), getDocuments('solutions'), searchParams])

  return (
    <main>
      <header className="page-banner about-banner supply-banner">
        <div className="wrap about-banner-copy">
          <div>
            <h1>Products & Supply</h1>
            <p className="page-banner-lead">{heading(copy.solutionsTitle)}</p>
          </div>
          <dl className="about-hero-stats">
            <div><dd>Premium</dd><dt>Unleaded petrol</dt></div>
            <div><dd>Gasoil</dd><dt>Low sulphur</dt></div>
            <div><dd>50ppm</dd><dt>Bulk diesel</dt></div>
          </dl>
        </div>
      </header>

      <section className="wrap about-lead">
        <p className="about-statement supply-statement">{copy.solutionsIntro}</p>
      </section>

      <section className="wrap about-aims">
        <div className="about-aims-copy">
          <article className="about-aim">
            <span className="about-icon"><Icon d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.8a2 2 0 0 0-.6-1.4L18 5" /></span>
            <h2>{heading(copy.solutionsPetrolTitle)}</h2>
            <Paragraphs text={copy.solutionsPetrolBody} />
            <p className="supply-action"><Pill href="/stations">Find a station</Pill></p>
          </article>
          <article className="about-aim">
            <span className="about-icon"><Icon d="M12 3.2s5 6 5 9.4a5 5 0 0 1-10 0C7 9.2 12 3.2 12 3.2z" /></span>
            <h2>{heading(copy.solutionsDieselTitle)}</h2>
            <Paragraphs text={/profile/i.test(copy.solutionsDieselBody) ? 'Meladen supplies Low Sulphur Gasoil for retail and commercial requirements. Premium-quality 50ppm low-sulphur diesel is part of the bulk offering.' : copy.solutionsDieselBody} />
            <p className="supply-action"><QuoteTrigger>Discuss your diesel requirements</QuoteTrigger></p>
          </article>
        </div>
      </section>

      <section className="wrap about-block supply-split">
        <div>
          <h2>{heading(copy.solutionsBulkTitle)}</h2>
          <Paragraphs text={copy.solutionsBulkBody} />
          <ul className="supply-points">
            {bulkCapabilities.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17 19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="caution">Delivery timing and stock availability are confirmed for each request. This site does not promise a fixed nationwide delivery time or guaranteed stock.</p>
        </div>
        <article className="about-aim" id="logistics">
          <span className="about-icon"><Icon d="M3 8h11v8H3zM14 11h4l3 3v2h-7M6.5 18.5a1.5 1.5 0 1 0 .1 0M17 18.5a1.5 1.5 0 1 0 .1 0" /></span>
          <h2>{heading(copy.solutionsLogisticsTitle)}</h2>
          <Paragraphs text={/profile/i.test(copy.solutionsLogisticsBody) ? 'Meladen operates alongside its sister company, Nurani Transport. Nurani Transport has invested in petroleum tankers that support delivery to Meladen stations. This arrangement is intended to contribute to supply continuity and reduce avoidable stockouts.\n\nFor commercial customers, our team can discuss delivery arrangements according to product, location and volume requirements.' : copy.solutionsLogisticsBody} />
        </article>
      </section>

      <section className="wrap about-block">
        <h2>{heading(copy.solutionsStepsTitle)}</h2>
        <ol className="supply-steps">
          {quoteSteps.map((step, index) => (
            <li key={step}><b>{index + 1}</b><span>{step}</span></li>
          ))}
        </ol>
      </section>

      <section className="wrap about-block" id="request-quote">
        <QuoteEnquiry
          title={heading(copy.solutionsFormTitle)}
          intro={copy.solutionsFormIntro}
          defaults={{ name: query.name, email: query.email, phone: query.phone, note: query.note }}
        />
      </section>

      <section className="wrap about-block">
        <h2>Questions</h2>
        {faqs.map((faq) => (
          <details className="faq" key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </section>

      {documents.length ? (
        <section className="wrap about-block">
          <h2>Documents</h2>
          <div className="doc-grid">
            {documents.map((doc) => (
              <article className="card" key={doc.url}>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <TrackedLink href={doc.url} event="company_profile_downloaded" params={{ file: doc.title }}>Download</TrackedLink>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
