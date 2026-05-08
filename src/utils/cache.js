const PREFIX = 'veritas:'

export function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(PREFIX + key)
    if (!raw) return null
    const { value, expires } = JSON.parse(raw)
    if (expires && Date.now() > expires) {
      sessionStorage.removeItem(PREFIX + key)
      return null
    }
    return value
  } catch {
    return null
  }
}

export function cacheSet(key, value, ttlMs = null) {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify({
      value,
      expires: ttlMs ? Date.now() + ttlMs : null,
    }))
  } catch {
    // sessionStorage full or unavailable — silently skip
  }
}

export const TTL = {
  ADVISORY: 24 * 60 * 60 * 1000,   // 24h
  NEWS: 60 * 60 * 1000,             // 1h
  SESSION: null,                     // no expiry (session only)
  EXCHANGE: 60 * 60 * 1000,         // 1h
}
