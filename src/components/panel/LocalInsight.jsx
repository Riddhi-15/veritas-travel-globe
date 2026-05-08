import { useEffect, useState } from 'react'
import useGlobeStore from '../../store'
import { fetchWikiVoyage, fetchWikipedia } from '../../utils/wikivoyage'

export default function LocalInsight() {
  const selectedCountry = useGlobeStore((s) => s.selectedCountry)
  const selectedState   = useGlobeStore((s) => s.selectedState)
  const selectedCity    = useGlobeStore((s) => s.selectedCity)

  const countryName = selectedCountry?.properties?.name ?? ''
  // Prefer polygon-click state name, fall back to city's state field (from search bar)
  const stateName   = selectedState?.properties?.name ?? selectedCity?.state ?? ''

  const [data,      setData]      = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [shownFor,  setShownFor]  = useState('')   // tracks what the current data is for

  useEffect(() => {
    if (!countryName) { setData(null); setLoading(false); setShownFor(''); return }

    let cancelled = false
    setData(null)
    setLoading(true)

    async function load() {
      // Priority: city → state → country
      if (selectedCity) {
        const wpCity = await fetchWikipedia(selectedCity.name)
        if (cancelled) return
        if (wpCity) { setLoading(false); setData(wpCity); setShownFor(selectedCity.name); return }
      }
      if (stateName) {
        const wpState = await fetchWikipedia(stateName)
        if (cancelled) return
        if (wpState) { setLoading(false); setData(wpState); setShownFor(stateName); return }
      }
      const wvResult = await fetchWikiVoyage(countryName)
      if (cancelled) return
      setLoading(false); setData(wvResult); setShownFor(countryName)
    }

    load()
    return () => { cancelled = true }
  }, [selectedCity?.name, stateName, countryName])

  if (!countryName) return null

  const label = shownFor && shownFor !== countryName
    ? `Local Insight — ${shownFor}`
    : 'Local Insight'

  return (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>{label}</SectionLabel>

      {loading && <p style={mutedStyle}>Loading…</p>}

      {!loading && !data && (
        <p style={mutedStyle}>No local guide available for {countryName}</p>
      )}

      {!loading && data && (
        <>
          <p style={{
            margin: 0,
            fontSize: '14.5px',
            lineHeight: 1.7,
            color: 'rgba(215,225,255,0.85)',
            fontFamily: 'system-ui, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {data.text}
          </p>
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              marginTop: 8, fontSize: '11px', fontWeight: 600,
              color: 'rgba(100,150,255,0.70)', textDecoration: 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(140,180,255,0.95)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(100,150,255,0.70)' }}
          >
            {data.source === 'Wikipedia' ? 'Wikipedia' : 'WikiVoyage'} ↗
          </a>
        </>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{
        width: '3px', height: '14px', borderRadius: '2px',
        background: 'linear-gradient(180deg, #6496ff, #a78bfa)', flexShrink: 0,
      }} />
      <p style={{
        margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'rgba(200,215,255,0.85)',
        fontFamily: 'system-ui, sans-serif',
      }}>{children}</p>
    </div>
  )
}

const mutedStyle = {
  margin: 0, fontSize: '13px', fontStyle: 'italic',
  color: 'rgba(180,190,220,0.45)', fontFamily: 'system-ui, sans-serif',
}
