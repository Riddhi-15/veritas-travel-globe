// The 30 countries with pre-split admin-1 GeoJSON files for state-level drill-down.
// Files live in /public/geo/{iso2}.json, lazy-loaded on click, cached in sessionStorage.
export const DRILLDOWN_COUNTRIES = new Set([
  'IN', // India
  'US', // United States
  'CN', // China
  'BR', // Brazil
  'AU', // Australia
  'CA', // Canada
  'RU', // Russia
  'DE', // Germany
  'FR', // France
  'GB', // United Kingdom
  'IT', // Italy
  'ES', // Spain
  'JP', // Japan
  'KR', // South Korea
  'MX', // Mexico
  'AR', // Argentina
  'ZA', // South Africa
  'NG', // Nigeria
  'EG', // Egypt
  'ID', // Indonesia
  'TH', // Thailand
  'VN', // Vietnam
  'TR', // Turkey
  'SA', // Saudi Arabia
  'AE', // UAE
  'PK', // Pakistan
  'BD', // Bangladesh
  'LK', // Sri Lanka
  'NP', // Nepal
  'MY', // Malaysia
])

export function isDrilldown(iso2) {
  return DRILLDOWN_COUNTRIES.has(iso2?.toUpperCase())
}
