import { cacheGet, cacheSet, TTL } from './cache'

const KEY  = import.meta.env.VITE_NEWSDATA_KEY
const BASE = 'https://newsdata.io/api/1/latest'

/**
 * Fetch latest news about a place by keyword query.
 * Does NOT use the `country` filter — that restricts to news sources
 * physically located in that country, which gives near-zero English
 * results for most nations. Keyword-only gives global coverage.
 */
export async function fetchNews({ query }) {
  if (!query) return []

  const cacheKey = `news:${query}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {
    const params = new URLSearchParams({
      apikey:   KEY,
      language: 'en',
      q:        query,
    })

    const res = await fetch(`${BASE}?${params}`)
    if (!res.ok) throw new Error(`NewsData ${res.status}`)
    const json = await res.json()

    const articles = (json.results ?? []).slice(0, 5).map((a) => ({
      title:   a.title,
      source:  a.source_id,
      link:    a.link,
      pubDate: a.pubDate,
    }))

    cacheSet(cacheKey, articles, TTL.NEWS)
    return articles
  } catch {
    return null
  }
}
