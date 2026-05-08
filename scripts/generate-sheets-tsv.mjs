/**
 * Generates tab-separated value (TSV) files for all 3 Google Sheets tabs
 * from the existing fallback data.
 *
 * Run: node scripts/generate-sheets-tsv.mjs
 * Output: scripts/out/countries.tsv, places_to_visit.tsv, india_states.tsv
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dir, 'out')
mkdirSync(outDir, { recursive: true })

// ── Load fallback data ────────────────────────────────────────────────────────
const fbPath = join(__dir, '..', 'src', 'data', 'fallback.js')
let src = readFileSync(fbPath, 'utf8')
src = src
  .replace(/^export const INDIA_STATES/m, 'const INDIA_STATES')
  .replace(/^export default FALLBACK/m, 'const _default = FALLBACK')
  + '\n globalThis.__FB = _default; globalThis.__IS = INDIA_STATES;'
new Function(src)()
const FALLBACK = globalThis.__FB
const INDIA_STATES = globalThis.__IS

// ── Load cities data ──────────────────────────────────────────────────────────
const citiesPath = join(__dir, '..', 'src', 'data', 'cities.js')
let citySrc = readFileSync(citiesPath, 'utf8')
citySrc = citySrc
  .replace(/^export function cityToKey[\s\S]*?^}/m, '')
  .replace(/^export default CITIES/m, 'const _cities = CITIES')
  + '\n globalThis.__CITIES = _cities;'
new Function(citySrc)()
const CITIES = globalThis.__CITIES

// ── 1. countries.tsv ─────────────────────────────────────────────────────────
const COUNTRY_HEADERS = [
  'iso2','name','visa_type','currency_code','currency_name',
  'bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun',
  'bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec',
  'peak_months','avoid_months',
  'budget_local','midrange_local','luxury_local',
]

const countriesRows = [COUNTRY_HEADERS.join('\t')]
for (const c of Object.values(FALLBACK)) {
  const row = COUNTRY_HEADERS.map(k => String(c[k] ?? '').replace(/\t/g, ' '))
  countriesRows.push(row.join('\t'))
}
writeFileSync(join(outDir, 'countries.tsv'), countriesRows.join('\n'), 'utf8')
console.log(`✓ countries.tsv — ${countriesRows.length - 1} countries`)

// ── 2. places_to_visit.tsv ────────────────────────────────────────────────────
const PLACES_HEADERS = ['country_iso2','rank','name','category','hidden_gem']

const placesRows = [PLACES_HEADERS.join('\t')]

// Country places
for (const c of Object.values(FALLBACK)) {
  for (const p of (c.places ?? [])) {
    placesRows.push([c.iso2, p.rank, p.name, p.category, p.hidden_gem ? 'TRUE' : 'FALSE'].join('\t'))
  }
}

// India state places  — key format: IN_STATENAME_UPPERCASE
for (const [stateName, state] of Object.entries(INDIA_STATES)) {
  const key = 'IN_' + stateName.replace(/\s+/g, '_').toUpperCase()
  for (const p of (state.places ?? [])) {
    placesRows.push([key, p.rank, p.name, p.category, p.hidden_gem ? 'TRUE' : 'FALSE'].join('\t'))
  }
}

// City places — key format: CITY_{ISO2}_{CITY_KEY}
for (const [cityKey, city] of Object.entries(CITIES)) {
  const sheetsKey = 'CITY_' + cityKey
  for (const p of (city.places ?? [])) {
    placesRows.push([sheetsKey, p.rank, p.name, p.category, p.hidden_gem ? 'TRUE' : 'FALSE'].join('\t'))
  }
}

writeFileSync(join(outDir, 'places_to_visit.tsv'), placesRows.join('\n'), 'utf8')
console.log(`✓ places_to_visit.tsv — ${placesRows.length - 1} places`)

// ── 3. india_states.tsv ───────────────────────────────────────────────────────
const STATE_HEADERS = [
  'state_name',
  'bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun',
  'bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec',
  'peak_months','avoid_months',
  'budget_local','midrange_local','luxury_local',
]

const stateRows = [STATE_HEADERS.join('\t')]
for (const s of Object.values(INDIA_STATES)) {
  const row = STATE_HEADERS.map(k => String(s[k] ?? '').replace(/\t/g, ' '))
  stateRows.push(row.join('\t'))
}
writeFileSync(join(outDir, 'india_states.tsv'), stateRows.join('\n'), 'utf8')
console.log(`✓ india_states.tsv — ${stateRows.length - 1} states`)

// ── 4. cities.tsv ─────────────────────────────────────────────────────────────
const CITY_HEADERS = [
  'city_name','country_iso2','currency_code','currency_name',
  'bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun',
  'bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec',
  'peak_months','avoid_months',
  'budget_local','midrange_local','luxury_local',
]

const cityRows = [CITY_HEADERS.join('\t')]
for (const c of Object.values(CITIES)) {
  const row = CITY_HEADERS.map(k => String(c[k] ?? '').replace(/\t/g, ' '))
  cityRows.push(row.join('\t'))
}
writeFileSync(join(outDir, 'cities.tsv'), cityRows.join('\n'), 'utf8')
console.log(`✓ cities.tsv — ${cityRows.length - 1} cities`)

console.log('\nFiles written to scripts/out/')
console.log('Open each .tsv file, select all (Ctrl+A), copy, then paste into the matching Google Sheets tab.')
console.log('For cities.tsv: create a new tab named "cities" in your Google Sheet first.')
