import INDIA_CITIES from '../data/india-cities'

const BASE = 'https://nominatim.openstreetmap.org/search'

// NOTE: Browsers block custom User-Agent header (forbidden header name).
// Nominatim identifies the app via the Referer header sent automatically.

function searchIndiaBundled(query) {
  const q = query.toLowerCase().trim()
  return INDIA_CITIES.filter(
    (c) => c.name.toLowerCase().startsWith(q) || c.name.toLowerCase().includes(q)
  ).slice(0, 6).map((c) => ({ ...c, countryIso2: 'IN' }))
}

async function nominatimSearch(query) {
  // Global search — no country constraint so cross-country results are returned
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '6',
    addressdetails: '1',
    featuretype: 'city',
  })
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('Nominatim failed')
  const results = await res.json()
  return results.map((r) => ({
    name: r.display_name.split(',')[0].trim(),
    state: r.address?.state ?? r.address?.county ?? '',
    countryIso2: r.address?.country_code?.toUpperCase() ?? null,
    countryDisplay: r.address?.country ?? '',
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
  }))
}

export async function searchCity(query, countryName, countryIso2) {
  if (!query.trim()) return []

  // India: prefer bundled list (fast, offline) — fall through if nothing found
  if (countryIso2?.toUpperCase() === 'IN') {
    const bundled = searchIndiaBundled(query)
    if (bundled.length > 0) return bundled
  }

  try {
    return await nominatimSearch(query)
  } catch {
    return []
  }
}
