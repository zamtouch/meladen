import { Pill } from '@/components/GvHeader'
import { heading, Paragraphs } from '@/components/Mark'
import { TrackedLink } from '@/components/Track'
import { visitorGuidance } from '@/content/site'
import { getCopy, getDocuments } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const pillars = [
  {
    key: 'quality' as const,
    icon: 'M12 3 19 6v6c0 4.5-3 7.4-7 9-4-1.6-7-4.5-7-9V6z',
    title: 'responsibilityQualityTitle' as const,
    body: 'responsibilityQualityBody' as const,
    fallback: 'Quality control is a priority throughout our supply chain, from procurement to distribution and retailing. Meladen aims to supply products that are fit for purpose and conform to applicable Zambia Compulsory Standards Agency requirements.\n\nMeladen carries out product testing and quality assurance. Customers who need documents for a specific order can contact the team.',
  },
  {
    key: 'safety' as const,
    icon: 'M12 3 20 6v6c0 5-3.5 8.2-8 10-4.5-1.8-8-5-8-10V6zM9 12l2 2 4-4',
    title: 'responsibilitySafetyTitle' as const,
    body: 'responsibilitySafetyBody' as const,
    fallback: 'We recognise that our employees, contractors and customers deserve a clean, safe and secure environment. Meladen is committed to maintaining its facilities and strengthening health and safety awareness and training.\n\nStations have trained first aiders available when needed.',
  },
  {
    key: 'environment' as const,
    icon: 'M11 20A7 7 0 0 1 4 8c6-.8 8-2 10-6 1 3 3 5 3 9a8 8 0 0 1-6 9zM8 14c2-1 4-1 6 1',
    title: 'responsibilityEnvironmentTitle' as const,
    body: 'responsibilityEnvironmentBody' as const,
    fallback: '',
  },
  {
    key: 'community' as const,
    icon: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    title: 'responsibilityCommunityTitle' as const,
    body: 'responsibilityCommunityBody' as const,
    fallback: '',
  },
]

export const metadata = pageMeta(
  'Quality, Safety & Sustainability | Meladen Energy',
  'Learn about Meladen Energy’s commitment to petroleum product quality, workplace safety, environmental responsibility and communities.',
  '/responsibility',
)

export default async function ResponsibilityPage() {
  const [copy, documents] = await Promise.all([getCopy(), getDocuments('responsibility')])

  return (
    <main>
      <header className="page-banner about-banner duty-banner">
        <div className="wrap about-banner-copy">
          <div>
            <h1>Quality & Responsibility</h1>
            <p className="page-banner-lead">{heading(copy.responsibilityTitle)}</p>
          </div>
          <dl className="about-hero-stats">
            <div><dd>Quality</dd><dt>Product standards</dt></div>
            <div><dd>Safety</dd><dt>People and facilities</dt></div>
            <div><dd>Community</dd><dt>Local relationships</dt></div>
          </dl>
        </div>
      </header>

      <section className="wrap about-lead">
        <p className="about-statement supply-statement">{copy.responsibilityIntro}</p>
      </section>

      <section className="wrap about-block">
        <div className="duty-grid">
          {pillars.map((pillar) => {
            const body = copy[pillar.body]
            const text = pillar.fallback && /profile/i.test(body) ? pillar.fallback : body
            return (
              <article className="about-aim" key={pillar.key}>
                <span className="about-icon"><Icon d={pillar.icon} /></span>
                <h2>{heading(copy[pillar.title])}</h2>
                <Paragraphs text={text} />
              </article>
            )
          })}
        </div>
      </section>

      <section className="wrap about-block">
        <h2>Visiting a station</h2>
        <ol className="supply-steps">
          {visitorGuidance.map((item, index) => (
            <li key={item}><b>{index + 1}</b><span>{item}</span></li>
          ))}
        </ol>
      </section>

      {documents.length ? (
        <section className="wrap about-block">
          <h2>Documents</h2>
          <div className="doc-grid">
            {documents.map((doc) => (
              <article className="card" key={doc.url}>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <TrackedLink className="about-download" href={doc.url} event="company_profile_downloaded" params={{ file: doc.title }}>
                  <Icon d="M12 3v12M7 11l5 5 5-5M5 21h14" />
                  Download
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="wrap about-block about-close">
        <div className="donate-band">
          <img src="/visuals/dawn-road.jpg" alt="" />
          <div>
            <h2>Ask the team</h2>
            <p>Customers who need product documentation can contact Meladen. Specific test methods are confirmed with the team.</p>
            <p className="about-close-actions"><Pill href="/contact" tone="light">Contact us</Pill></p>
          </div>
        </div>
      </section>
    </main>
  )
}
