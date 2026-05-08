import { cacheGet, cacheSet, TTL } from './cache'

const BASE = 'https://api.frankfurter.app/latest'

// Returns the rate: 1 unit of `from` = X INR
export async function getRateToINR(fromCurrency) {
  if (!fromCurrency || fromCurrency.toUpperCase() === 'INR') return 1

  const cacheKey = `fx:${fromCurrency.toUpperCase()}`
  const cached = cacheGet(cacheKey)
  if (cached !== null) return cached

  try {
    const res = await fetch(`${BASE}?from=${fromCurrency.toUpperCase()}&to=INR`)
    if (!res.ok) throw new Error('Frankfurter failed')
    const json = await res.json()
    const rate = json.rates?.INR ?? null
    if (rate) cacheSet(cacheKey, rate, TTL.EXCHANGE)
    return rate
  } catch {
    return null  // caller hides INR line
  }
}
