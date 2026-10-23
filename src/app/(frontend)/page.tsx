import { readdir } from 'node:fs/promises'
import path from 'node:path'

import Link from 'next/link'

import { articleMeta } from '@/components/NewsCards'
import { HeroFilm } from '@/components/HeroStage'
import { SupplyParallax } from '@/components/SupplyParallax'
import { Paragraphs } from '@/components/Mark'
import { company, homeServices, stations, values } from '@/content/site'
import { getCopy, getPublishedNews } from '@/lib/content'

function Icon({ d }: { d: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function Arrow() {
  return (
    <span aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
    </span>
  )
}

const serviceIcons = [
  'M8 21V5h7v16M8 10h7M15 7h3v7',
  'M12 3.2s5.2 6 5.2 9.6a5.2 5.2 0 0 1-10.4 0C6.8 9.2 12 3.2 12 3.2z',
  'M3 8h11v8H3zM14 11h4l3 3v2h-7M6 18.5a1.6 1.6 0 1 0 .1 0M16 18.5a1.6 1.6 0 1 0 .1 0',
  'M4 10l2-5h12l2 5M4 10h16v9H4zM10 19v-5h4v5',
]

async function homeHeroSlides() {
  try {
    const names = await readdir(path.join(process.cwd(), 'public', 'uploads', 'hero_home'))
    return names
      .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/uploads/hero_home/${encodeURIComponent(name)}`)
  } catch {
    return []
  }
}

const checks = [
  ['Unleaded Premium', 'and Low Sulphur Gasoil'],
  ['50ppm bulk diesel', 'for commercial supply'],
  ['Four operating stations', 'Mwense, Musangu, Kabompo and Chienge'],
]

export default async function HomePage() {
  const [copy, heroSlides] = await Promise.all([getCopy(), homeHeroSlides()])
  const articles = (await getPublishedNews()).slice(0, 3)
  const operating = stations.filter((station) => station.status === 'operational').length
  const planned = stations.filter((station) => station.status === 'planned').length
  const title = copy.homeHeroTitle.split(/(Progress)/g)
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: site,
    telephone: company.phoneLinks,
    foundingDate: String(company.established),
    slogan: company.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'First Floor, Room 103, Bwafwano House, Zambia National Society Building, Buteko Avenue',
      addressLocality: 'Ndola',
      addressCountry: 'ZM',
    },
  }

  return (
    <main className="gv">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gv-shell">
        <section className="gv-hero">
          <HeroFilm slides={heroSlides} />
          <div className="gv-hero-copy">
            <span className="gv-eye gv-eye-hero">{company.tagline}</span>
            <h1>
              {title.map((part, index) => part === 'Progress' ? <em key={index}>{part}</em> : <span key={index}>{part}</span>)}
            </h1>
            <p>{copy.homeHeroLede}</p>
            <Link className="gv-pill" href="/stations">Find a fuel station <Arrow /></Link>
          </div>
          <aside className="gv-feature">
            <i><Icon d="M13 2.5 6 13h6l-1 8.5L20 11h-6l-1-8.5z" /></i>
            <h2>{company.tagline}</h2>
            <p>Unleaded Premium, Low Sulphur Gasoil and 50ppm bulk diesel.</p>
            <svg className="corner" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </aside>
          <a className="gv-scroll" href="#about">Scroll <span aria-hidden="true">↓</span></a>
          <div className="gv-values">
            <div className="gv-value">
              <i><Icon d="M4 5h16v15H4zM4 9h16M8 3v4M16 3v4" /></i>
              <span><strong>{company.established}</strong><small>Established</small></span>
            </div>
            <div className="gv-value">
              <i><Icon d="M12 21s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10z" /></i>
              <span>
                <strong><Link href="/stations">{operating} stations</Link></strong>
                <small>{stations.filter((station) => station.status === 'operational').map((station) => station.name).join(', ')}</small>
              </span>
            </div>
            <div className="gv-value">
              <i><Icon d="M4 20V7l8-4 8 4v13M9 20v-6h6v6" /></i>
              <span><strong>Head Office</strong><small>Buteko Avenue, Ndola</small></span>
            </div>
            <div className="gv-value">
              <i><Icon d="M7 3h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3L16 11.5 20 13v3a2 2 0 0 1-2 2A15 15 0 0 1 5 5a2 2 0 0 1 2-2z" /></i>
              <span>
                <strong>Contact</strong>
                <small>
                  {company.phones.slice(0, 2).map((phone, index) => (
                    <a key={phone} href={`tel:${company.phoneLinks[index]}`}>{phone}</a>
                  ))}
                </small>
              </span>
            </div>
          </div>
        </section>

        <section className="gv-about gv-sec" id="about">
          <div>
            <span className="gv-eye">About us</span>
            <h2>{copy.homeIntroTitle}</h2>
            <Paragraphs text={copy.homeIntroBody} />
            <ul className="gv-checks">
              {checks.map(([titleText, detail]) => (
                <li key={titleText}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17 19 7" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                  <span><strong>{titleText}</strong><small>{detail}</small></span>
                </li>
              ))}
            </ul>
            <Link className="gv-pill" href="/about">About Meladen <Arrow /></Link>
          </div>
          <div className="gv-about-visual">
            <div className="gv-about-photo" style={{ backgroundImage: "url('/visuals/about-station.webp')" }} role="img" aria-label="Meladen fuel station" />
            <dl className="gv-stats">
              <div><dd>2019</dd><dt>Established</dt></div>
              <div><dd>{operating}</dd><dt>Operating stations</dt></div>
              <div><dd>Ndola</dd><dt>Head office</dt></div>
            </dl>
          </div>
        </section>

        <SupplyParallax src="/visuals/dawn-road.jpg">
          <span className="gv-eye">Our supply</span>
          <h2>{copy.homeServicesTitle}</h2>
          <Paragraphs text={copy.homeCommercialBody} />
        </SupplyParallax>
        <section className="gv-solutions gv-sec">
          <div className="gv-sol-grid">
            {homeServices.map((service, index) => (
              <article className="gv-sol" key={service.title}>
                <Icon d={serviceIcons[index]} />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <Link href={service.href}>{service.action} <Arrow /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="gv-impact gv-sec">
          <div className="gv-intro">
            <span className="gv-eye">Our network</span>
            <h2>{copy.homeNetworkTitle}</h2>
            <Paragraphs text={copy.homeNetworkBody} />
          </div>
          <div className="gv-impact-stats">
            <article><strong>2019</strong><span>Established</span></article>
            <article className="gv-stat-hot"><strong>{operating}</strong><span>Operating stations</span></article>
            <article><strong>{planned}</strong><span>Planned locations, not yet operating</span></article>
          </div>
          <div className="gv-impact-photo" style={{ backgroundImage: "url('/visuals/station-day.webp')" }}>
            <div className="gv-impact-copy">
              <span className="gv-eye">Stations</span>
              <h2>Four operating stations.</h2>
              <p>Mwense, Musangu, Kabompo and Chienge are operating. Sesheke and Solwezi are identified for later development and are not open.</p>
              <Link className="gv-pill" href="/stations">View stations <Arrow /></Link>
            </div>
          </div>
        </section>

        <section className="gv-why gv-sec">
          <div>
            <span className="gv-eye">Why Meladen</span>
            <h2>{copy.homeResponsibilityTitle}</h2>
            <Paragraphs text={copy.homeResponsibilityBody} />
            <div className="gv-benefits">
              {values.slice(0, 4).map((value) => (
                <article key={value.title}>
                  <i><Icon d="M5 12.5 10 17 19 7" /></i>
                  <div><h3>{value.title}</h3><p>{value.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="gv-why-visual">
            <div className="gv-orb" style={{ backgroundImage: "url('/visuals/attendant.webp')" }} role="img" aria-label="Meladen attendant fuelling a vehicle" />
            <div className="gv-float"><strong>{company.tagline}</strong></div>
          </div>
        </section>

        <section className="gv-news gv-sec">
          <div className="gv-news-head">
            <div>
              <span className="gv-eye">News</span>
              <h2>{copy.newsTitle}</h2>
            </div>
            <Link className="gv-pill" href="/news">All updates <Arrow /></Link>
          </div>
          {articles.length ? (
            <div className="gv-news-grid">
              {articles.map((article) => (
                <Link key={article.slug} href={`/news/${article.slug}`}>
                  <img src={article.image.url} alt={article.image.alt} />
                  <small>{articleMeta(article)}</small>
                  <strong>{article.title}</strong>
                  <span>{article.excerpt}</span>
                </Link>
              ))}
            </div>
          ) : <p className="gv-empty">Published updates will appear on the news page.</p>}
        </section>

        <section className="gv-close gv-sec">
          <div className="gv-close-banner" style={{ backgroundImage: "linear-gradient(90deg, rgba(8,42,102,.88), rgba(8,42,102,.35) 55%, rgba(8,42,102,.2)), url('/visuals/close-tanker.webp')" }}>
            <div>
              <span className="gv-eye">Contact</span>
              <h2>{copy.homeCloseTitle}</h2>
              <Paragraphs text={copy.homeCloseBody} />
              <Link className="gv-pill gv-pill-light" href="/contact">Contact us <Arrow /></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
