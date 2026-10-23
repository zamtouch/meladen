import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { NewsCard, NewsFeature } from '@/components/NewsCards'
import { heading, Paragraphs } from '@/components/Mark'
import { getCopy, getPublishedNews } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Meladen Energy News & Company Updates',
    description: 'Follow Meladen Energy’s company milestones, station developments and practical petroleum-related information.',
    alternates: { canonical: '/news' },
    openGraph: {
      title: 'Meladen Energy News & Company Updates',
      description: 'Follow Meladen Energy’s company milestones, station developments and practical petroleum-related information.',
      url: '/news',
      locale: 'en_ZM',
      type: 'website',
    },
  }
}

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ article?: string }> }) {
  const { article } = await searchParams
  if (article) redirect(`/news/${article}`)

  const [copy, articles] = await Promise.all([getCopy(), getPublishedNews()])
  const [lead, ...rest] = articles

  return (
    <main>
      <header className="page-banner" style={{ backgroundImage: "linear-gradient(90deg, rgba(8,42,102,.72), rgba(8,42,102,.28)), url('/visuals/canopy-night.jpg')" }}>
        <div className="wrap">
          <p className="kicker">News & updates</p>
          <h1>{heading(copy.newsTitle)}</h1>
        </div>
      </header>
      <header className="page-intro wrap">
        <Paragraphs text={copy.newsIntro} />
      </header>

      <section className="section wrap news-index">
        {lead ? <NewsFeature article={lead} /> : <p className="form-error">Published updates will appear here.</p>}
        {rest.length ? (
          <div className="news-grid-cards">
            {rest.map((item) => <NewsCard article={item} key={item.slug} />)}
          </div>
        ) : null}
      </section>
    </main>
  )
}
