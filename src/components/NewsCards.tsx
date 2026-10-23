import Link from 'next/link'

import { heading } from '@/components/Mark'
import { newsCategories } from '@/content/site'
import type { PublicArticle } from '@/lib/content'

const labels = Object.fromEntries(newsCategories.map((item) => [item.slug, item.label]))

export function articleMeta(article: PublicArticle) {
  const label = labels[article.category] || article.category
  return article.dateLabel ? `${label} · ${article.dateLabel}` : label
}

export function NewsFeature({ article }: { article: PublicArticle }) {
  return (
    <Link className="news-feature" href={`/news/${article.slug}`}>
      <img src={article.image.url} alt={article.image.alt} />
      <div>
        <p className="news-kicker">{articleMeta(article)}</p>
        <h2>{heading(article.title)}</h2>
        <p>{article.excerpt}</p>
        <span className="news-read">Read the story</span>
      </div>
    </Link>
  )
}

export function NewsCard({ article }: { article: PublicArticle }) {
  return (
    <Link className="news-card" href={`/news/${article.slug}`}>
      <img src={article.image.url} alt={article.image.alt} />
      <div>
        <p className="news-kicker">{articleMeta(article)}</p>
        <h2>{heading(article.title)}</h2>
        <p>{article.excerpt}</p>
        <span className="news-read">Read the story</span>
      </div>
    </Link>
  )
}
