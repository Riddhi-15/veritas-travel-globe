import { cacheGet, cacheSet, TTL } from './cache'

// ── Wikipedia REST summary: used for sub-national regions (states, provinces) ─
// Uses the /page/summary/ endpoint which returns a clean extract with no HTML.
// Much more reliable than the MediaWiki API's exintro for state/province pages.
export async function fetchWikipedia(name) {
  if (!name) return null

  const cacheKey = `wp:${name}`
  const cached   = cacheGet(cacheKey)
  if (cached !== null) return cached

  try {
    const encoded = encodeURIComponent(name.replace(/ /g, '_'))
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`WP ${res.status}`)

    const json = await res.json()

    // 'disambiguation' pages have no useful summary
    if (!json.extract || json.type === 'disambiguation') {
      cacheSet(cacheKey, null, TTL.SESSION)
      return null
    }

    const text   = json.extract.slice(0, 600)
    const result = {
      text,
      url:    json.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encoded}`,
      title:  json.title,
      source: 'Wikipedia',
    }
    cacheSet(cacheKey, result, TTL.SESSION)
    return result
  } catch {
    return null
  }
}

// Some topojson names differ from WikiVoyage article titles
const NAME_MAP = {
  'United States of America':  'United States',
  'Dem. Rep. Congo':            'Democratic Republic of the Congo',
  'Bosnia and Herz.':           'Bosnia and Herzegovina',
  'Czech Rep.':                 'Czechia',
  'S. Sudan':                   'South Sudan',
  'Central African Rep.':       'Central African Republic',
  'Dominican Rep.':             'Dominican Republic',
  "Côte d'Ivoire":              'Ivory Coast',
  'Macedonia':                  'North Macedonia',
  'Timor-Leste':                'East Timor',
  'Trinidad and Tobago':        'Trinidad and Tobago',
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')     // remove tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export async function fetchWikiVoyage(countryName) {
  if (!countryName) return null

  const title    = NAME_MAP[countryName] ?? countryName
  const cacheKey = `wv:${title}`
  const cached   = cacheGet(cacheKey)
  if (cached !== null) return cached

  try {
    const params = new URLSearchParams({
      action:   'query',
      titles:   title,
      prop:     'extracts',
      exintro:  '1',
      exchars:  '700',
      format:   'json',
      origin:   '*',
    })

    const res = await fetch(`https://en.wikivoyage.org/w/api.php?${params}`)
    if (!res.ok) throw new Error('WV fetch failed')

    const json    = await res.json()
    const pages   = json?.query?.pages ?? {}
    const page    = Object.values(pages)[0]

    // -1 means article not found
    if (!page || page.pageid === -1 || !page.extract) {
      cacheSet(cacheKey, null, TTL.SESSION)
      return null
    }

    const text = stripHtml(page.extract).slice(0, 600)
    const result = {
      text,
      url: `https://en.wikivoyage.org/wiki/${encodeURIComponent(title)}`,
      title: page.title,
    }

    cacheSet(cacheKey, result, TTL.SESSION)
    return result
  } catch {
    return null
  }
}
