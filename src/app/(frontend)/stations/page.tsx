import { Suspense } from 'react'

import { heading, Paragraphs } from '@/components/Mark'
import { StationsBoard } from '@/components/StationsBoard'
import { getCopy, getStations } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta(
  'Find Meladen Fuel Stations in Zambia | Locations & Amenities',
  'Explore Meladen Energy stations in Mwense, Musangu, Kabompo and Chienge, plus reported future developments in Sesheke and Solwezi.',
  '/stations',
)

export default async function StationsPage() {
  const [copy, stations] = await Promise.all([getCopy(), getStations()])
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: stations.map((station, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${station.name}, ${station.province}`,
      description: station.status === 'operational' ? 'Reported operational station' : station.status === 'planned' ? 'Planned location, not operating' : 'Temporarily unavailable',
    })),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="page-banner" style={{ backgroundImage: "linear-gradient(90deg, rgba(8,42,102,.72), rgba(8,42,102,.28)), url('/visuals/canopy-night.jpg')" }}>
        <div className="wrap">
          <p className="kicker">Fuel stations</p>
          <h1>{heading(copy.stationsTitle)}</h1>
        </div>
      </header>
      <section className="wrap page-intro">
        <Paragraphs text={copy.stationsIntro} />
      </section>
      <section className="wrap section">
        <Suspense fallback={<p>Loading the station directory…</p>}>
          <StationsBoard stations={stations} />
        </Suspense>
        <article className="card" style={{ marginTop: 28 }}>
          <h2>{heading(copy.stationsPlannedTitle)}</h2>
          <Paragraphs text={copy.stationsPlannedBody} />
        </article>
      </section>
    </main>
  )
}
