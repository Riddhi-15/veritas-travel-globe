/**
 * Build script: splits Natural Earth admin-1 (states/provinces) GeoJSON
 * into one file per country under /public/geo/{iso2}.json
 *
 * Run once: node scripts/split-admin1.js
 *
 * Prerequisites:
 *   1. Download ne_10m_admin_1_states_provinces.json from Natural Earth:
 *      https://www.naturalearthdata.com/downloads/10m-cultural-vectors/
 *      Place it at: scripts/ne_admin1.json
 *   2. node scripts/split-admin1.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const INPUT  = path.join(__dirname, 'ne_admin1.json')
const OUTPUT = path.join(__dirname, '..', 'public', 'geo')

// Only generate files for the 30 drill-down countries
const DRILLDOWN = new Set([
  'IN','US','CN','BR','AU','CA','RU','DE','FR','GB',
  'IT','ES','JP','KR','MX','AR','ZA','NG','EG','ID',
  'TH','VN','TR','SA','AE','PK','BD','LK','NP','MY',
])

if (!fs.existsSync(INPUT)) {
  console.error('ERROR: scripts/ne_admin1.json not found.')
  console.error('Download from: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/')
  process.exit(1)
}

fs.mkdirSync(OUTPUT, { recursive: true })

const raw = JSON.parse(fs.readFileSync(INPUT, 'utf8'))
const byCountry = {}

for (const feature of raw.features) {
  const iso2 = feature.properties?.iso_a2 ?? feature.properties?.adm0_a3?.slice(0, 2)
  if (!iso2 || !DRILLDOWN.has(iso2)) continue
  if (!byCountry[iso2]) byCountry[iso2] = []
  byCountry[iso2].push(feature)
}

let written = 0
for (const [iso2, features] of Object.entries(byCountry)) {
  const geojson = { type: 'FeatureCollection', features }
  const outPath = path.join(OUTPUT, `${iso2.toLowerCase()}.json`)
  fs.writeFileSync(outPath, JSON.stringify(geojson))
  console.log(`✓ ${iso2.toLowerCase()}.json — ${features.length} states/provinces`)
  written++
}

console.log(`\nDone. ${written} files written to public/geo/`)
