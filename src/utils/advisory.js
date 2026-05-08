import { cacheGet, cacheSet, TTL } from './cache'

const API_URL = 'https://www.travel-advisory.info/api'

export const ADVISORY_LEVELS = {
  1: { label: 'Safe to travel',        color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)'  },
  2: { label: 'Exercise caution',      color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)' },
  3: { label: 'High risk — reconsider',color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)'  },
  4: { label: 'Do not travel',         color: '#7f1d1d', bg: 'rgba(127,29,29,0.2)',    border: 'rgba(239,68,68,0.5)'  },
}

// Bundled fallback used when the live API is unreachable
const ADVISORY_FALLBACK = {
  // Level 1 — generally safe
  AU:1, AT:1, BE:1, CA:1, HR:1, CZ:1, DK:1, EE:1, FI:1, FR:1,
  DE:1, GR:1, HU:1, IS:1, IE:1, IT:1, JP:1, KR:1, LV:1, LT:1,
  LU:1, MT:1, MU:1, NL:1, NZ:1, NO:1, PL:1, PT:1, SK:1, SI:1, ES:1,
  SE:1, CH:1, TW:1, GB:1, US:1, GE:1, IL:1, AM:1, WS:1, TO:1, PW:1,
  // Level 2 — exercise normal caution
  AR:2, AZ:2, BH:2, BD:2, BO:2, BR:2, BN:2, BZ:2, KH:2, CN:2, CO:2,
  CV:2, CY:2, DO:2, EG:2, GT:2, HN:2, IN:2, ID:2, JO:2, KE:2,
  MY:2, MA:2, MX:2, MG:2, MZ:2, OM:2, PE:2, PH:2, QA:2, RO:2, RU:2,
  SA:2, SC:2, ZA:2, LK:2, TH:2, TN:2, TZ:2, TR:2, TT:2, AE:2,
  UG:2, UY:2, UZ:2, VN:2, VE:2, ZM:2, BW:2, PK:2,
  // Level 3 — high degree of caution
  AF:3, IR:3, MM:3, SD:3, SS:3, LY:3, ML:3, NE:3, NG:3, SO:3, SY:3,
  YE:3, IQ:3,
  // Level 4 — do not travel
  KP:4,
}

// Loads all 195 countries at once, stores in sessionStorage with 24h TTL
export async function loadAdvisoryMap() {
  const cached = cacheGet('advisory:all')
  if (cached) return cached

  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Advisory API failed')
    const json = await res.json()

    // Response shape: { data: { "IN": { advisory: { score, message } }, ... } }
    const map = {}
    for (const [iso2, entry] of Object.entries(json.data ?? {})) {
      const score = parseFloat(entry?.advisory?.score ?? 0)
      if (score >= 4.5)       map[iso2] = 4
      else if (score >= 3.5)  map[iso2] = 3
      else if (score >= 2.5)  map[iso2] = 2
      else                    map[iso2] = 1
    }

    cacheSet('advisory:all', map, TTL.ADVISORY)
    return map
  } catch {
    // Live API unavailable — use bundled fallback
    return { ...ADVISORY_FALLBACK }
  }
}

export function getAdvisoryLevel(advisoryMap, iso2) {
  if (!iso2 || !advisoryMap) return null
  return advisoryMap[iso2?.toUpperCase()] ?? null
}
