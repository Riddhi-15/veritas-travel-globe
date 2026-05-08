import Papa from 'papaparse'
import { cacheGet, cacheSet, TTL } from './cache'
import FALLBACK, { INDIA_STATES } from '../data/fallback'
import CITIES, { cityToKey } from '../data/cities'

const SHEET_ID = import.meta.env.VITE_SHEETS_ID
const SHEETS_CONFIGURED = !!SHEET_ID && SHEET_ID !== 'your_google_sheets_id_here'

function sheetUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`
}

async function fetchSheet(sheetName) {
  const cacheKey = `sheet:${sheetName}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const res = await fetch(sheetUrl(sheetName))
  if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`)
  const text = await res.text()

  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
  cacheSet(cacheKey, data, TTL.SESSION)
  return data
}

async function getSheet(sheetName) {
  if (!SHEETS_CONFIGURED) return null
  try {
    return await fetchSheet(sheetName)
  } catch {
    return null
  }
}

// ─── Country row ─────────────────────────────────────────────────────────────
export async function getCountryRow(iso2) {
  // 1. Try Google Sheets
  const rows = await getSheet('countries')
  if (rows) {
    const row = rows.find((r) => r.iso2?.toUpperCase() === iso2?.toUpperCase())
    if (row) return row
  }
  // 2. Bundled fallback
  return FALLBACK[iso2?.toUpperCase()] ?? null
}

// ─── Places ──────────────────────────────────────────────────────────────────
export async function getPlaces(iso2) {
  // 1. Try Google Sheets
  const rows = await getSheet('places_to_visit')
  if (rows) {
    const filtered = rows
      .filter((r) => r.country_iso2?.toUpperCase() === iso2?.toUpperCase())
      .sort((a, b) => Number(a.rank) - Number(b.rank))
      .slice(0, 5)
    if (filtered.length) return filtered
  }
  // 2. Bundled fallback
  return FALLBACK[iso2?.toUpperCase()]?.places ?? []
}

// ─── India state row ─────────────────────────────────────────────────────────
export async function getIndiaStateRow(stateName) {
  if (!stateName) return null

  // 1. Try Google Sheets india_states tab
  const rows = await getSheet('india_states')
  if (rows) {
    const row = rows.find(
      (r) => r.state_name?.toLowerCase() === stateName.toLowerCase()
    )
    if (row) return row
  }

  // 2. Bundled India states fallback — try exact match, then partial
  const key = Object.keys(INDIA_STATES).find(
    (k) => k.toLowerCase() === stateName.toLowerCase()
      || stateName.toLowerCase().includes(k.toLowerCase())
      || k.toLowerCase().includes(stateName.toLowerCase())
  )
  return key ? INDIA_STATES[key] : null
}

// ─── State places ─────────────────────────────────────────────────────────────
export async function getStatePlaces(stateName) {
  if (!stateName) return []

  // Try Sheets with state-specific key like IN_RAJASTHAN
  const stateKey = `IN_${stateName.replace(/\s+/g, '_').toUpperCase()}`
  const rows = await getSheet('places_to_visit')
  if (rows) {
    const filtered = rows
      .filter((r) => r.country_iso2?.toUpperCase() === stateKey)
      .sort((a, b) => Number(a.rank) - Number(b.rank))
      .slice(0, 5)
    if (filtered.length) return filtered
  }

  // Bundled fallback — find state and return its places
  const key = Object.keys(INDIA_STATES).find(
    (k) => k.toLowerCase() === stateName.toLowerCase()
      || stateName.toLowerCase().includes(k.toLowerCase())
      || k.toLowerCase().includes(stateName.toLowerCase())
  )
  return key ? (INDIA_STATES[key]?.places ?? []) : []
}

// ─── City row ─────────────────────────────────────────────────────────────────
export async function getCityRow(cityName, iso2) {
  if (!cityName || !iso2) return null

  // 1. Try Google Sheets cities tab
  const rows = await getSheet('cities')
  if (rows) {
    const row = rows.find(
      (r) => r.city_name?.toLowerCase() === cityName.toLowerCase()
        && r.country_iso2?.toUpperCase() === iso2.toUpperCase()
    )
    if (row) return row
  }

  // 2. Bundled fallback
  const key = cityToKey(iso2, cityName)
  return CITIES[key] ?? null
}

// ─── City places ──────────────────────────────────────────────────────────────
export async function getCityPlaces(cityName, iso2) {
  if (!cityName || !iso2) return []

  const cityKey = cityToKey(iso2, cityName)

  // 1. Try Google Sheets places_to_visit with CITY_ prefix key
  const rows = await getSheet('places_to_visit')
  if (rows) {
    const filtered = rows
      .filter((r) => r.country_iso2?.toUpperCase() === `CITY_${cityKey}`)
      .sort((a, b) => Number(a.rank) - Number(b.rank))
      .slice(0, 5)
    if (filtered.length) return filtered
  }

  // 2. Bundled fallback
  return CITIES[cityKey]?.places ?? []
}

export { SHEETS_CONFIGURED }
