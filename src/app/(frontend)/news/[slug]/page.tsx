import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CopyLink } from '@/components/CopyLink'
import { Pill } from '@/components/GvHeader'
import { heading, Paragraphs } from '@/components/Mark'
import { articleMeta, NewsCard } from '@/components/NewsCards'
import { getArticle, getPublishedNews } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Update not available' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      locale: 'en_ZM',
      type: 'article',
      images: [{ url: article.image.url, alt: article.image.alt }],
    },
  }
}

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, articles] = await Promise.all([getArticle(slug), getPublishedNews()])
  if (!article) notFound()
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <main>
      <header
        className="page-banner story-banner"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(8,42,102,.78), rgba(8,42,102,.28)), url('${article.image.url}')` }}
      >
        <div className="wrap">
          <p className="kicker"><Link href="/news">News</Link> · {articleMeta(article)}</p>
          <h1>{heading(article.title)}</h1>
          <p className="page-banner-lead">{article.excerpt}</p>
        </div>
      </header>
      <article className="wrap story-body">
        <Paragraphs text={article.body} />
        <div className="reader-actions">
          <Pill href="/news">All updates</Pill>
          <CopyLink slug={article.slug} />
        </div>
      </article>
      {related.length ? (
        <section className="section wrap">
          <h2 className="story-more">More from Meladen</h2>
          <div className="news-grid-cards">
            {related.map((item) => <NewsCard article={item} key={item.slug} />)}
          </div>
        </section>
      ) : null}
    </main>
  )
}
