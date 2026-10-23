import { Pill } from '@/components/GvHeader'
import { heading, Paragraphs } from '@/components/Mark'
import { TrackedLink } from '@/components/Track'
import { company, stations, values } from '@/content/site'
import { getCopy, getDocuments, getTimeline } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const valueIcons: Record<string, string> = {
  Quality: 'M12 3 19 6v6c0 4.5-3 7.4-7 9-4-1.6-7-4.5-7-9V6z',
  'Customer Commitment': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Reliability: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2',
  Safety: 'M12 3 20 6v6c0 5-3.5 8.2-8 10-4.5-1.8-8-5-8-10V6zM9 12l2 2 4-4',
  Accessibility: 'M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  Responsibility: 'M11 20A7 7 0 0 1 4 8c6-.8 8-2 10-6 1 3 3 5 3 9a8 8 0 0 1-6 9zM8 14c2-1 4-1 6 1',
}

export const metadata = pageMeta(
  'About Meladen Energy | Our Growth in Zambia',
  'Learn about Meladen Energy, established in 2019, and its growing petroleum retail and commercial supply operations in Zambia.',
  '/about',
)

export default async function AboutPage() {
  const [copy, events, documents] = await Promise.all([getCopy(), getTimeline(), getDocuments('about')])
  const operating = stations.filter((station) => station.status === 'operational').length
  const [opening, ...rest] = copy.aboutIntro.split(/\n\n/)
  const statement = opening.split(/(?<=\.)\s+/)[0]
  const support = [opening.slice(statement.length).trim(), ...rest].filter(Boolean).join('\n\n')

  return (
    <main>
      <header className="page-banner about-banner">
        <div className="wrap about-banner-copy">
          <div>
            <h1>About Meladen</h1>
            <p className="page-banner-lead">{heading(copy.aboutTitle)}</p>
          </div>
          <dl className="about-hero-stats">
            <div><dd>{company.established}</dd><dt>Established</dt></div>
            <div><dd>{operating}</dd><dt>Operating stations</dt></div>
            <div><dd>Ndola</dd><dt>Head office</dt></div>
          </dl>
        </div>
      </header>
      <section className="wrap about-lead">
        <p className="about-statement">{statement}</p>
        <div className="about-intro">
          <Paragraphs text={support} />
        </div>
      </section>

      <section className="wrap about-aims">
        <div className="about-aims-copy">
          <article className="about-aim">
            <span className="about-icon"><Icon d="M4 22V4M4 4h11l-2 4 2 4H4" /></span>
            <h2>{heading(copy.aboutMissionTitle)}</h2>
            <Paragraphs text={copy.aboutMissionBody} />
          </article>
          <article className="about-aim">
            <span className="about-icon"><Icon d="M3 17l6-6 4 4 8-8M14 7h7v7" /></span>
            <h2>{heading(copy.aboutDirectionTitle)}</h2>
            <Paragraphs text={copy.aboutDirectionBody} />
          </article>
        </div>
      </section>

      <section className="wrap about-photo">
        <figure className="about-figure">
            <img src="/visuals/about-landscape.webp?v=2" alt="A Meladen fuel station set among trees" />
        </figure>
      </section>

      <section className="wrap about-block">
        <h2>{heading(copy.aboutValuesTitle)}</h2>
        <div className="about-value-grid">
          {values.map((value) => (
            <article key={value.title}>
              <span className="about-icon">{valueIcons[value.title] ? <Icon d={valueIcons[value.title]} /> : null}</span>
              <h3>{value.title}</h3>
              <p>{value.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap about-block">
        <h2>Milestones</h2>
        <ol className="timeline">
          {events.map((event) => (
            <li key={`${event.yearLabel}-${event.detail.slice(0, 24)}`}>
              <span className="about-mark" aria-hidden="true" />
              <div>
                <strong>{event.yearLabel}</strong>
                <span>{event.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-people-band">
        <div className="wrap">
          <span className="about-icon"><Icon d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></span>
          <h2>{heading(copy.aboutPeopleTitle)}</h2>
          <Paragraphs text={copy.aboutPeopleBody} />
        </div>
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
          <img src="/visuals/hero-forecourt.jpg" alt="" />
          <div>
            <h2>{heading(copy.aboutCloseTitle)}</h2>
            <Paragraphs text={copy.aboutCloseBody} />
            <p className="about-close-actions">
              <Pill href="/solutions" tone="light">Explore fuel solutions</Pill>
              <Pill href="/contact" tone="light">Contact the team</Pill>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
