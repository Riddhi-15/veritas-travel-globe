import { useState, useRef, useEffect } from 'react'
import { searchCity } from '../../utils/nominatim'
import { isDrilldown } from '../../constants/drilldown'
import { iso2ToName } from '../../utils/iso2map'
import useGlobeStore from '../../store'

export default function CitySearchBar({ countryName, countryIso2 }) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const setSelectedCity      = useGlobeStore((s) => s.setSelectedCity)
  const setSelectedCountry   = useGlobeStore((s) => s.setSelectedCountry)
  const setHighlightedState  = useGlobeStore((s) => s.setHighlightedState)
  const debounceRef = useRef(null)

  // Clear search bar whenever the user switches to a different country
  useEffect(() => {
    setQuery('')
    setResults([])
    clearTimeout(debounceRef.current)
  }, [countryIso2])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    if (!val.trim()) { setResults([]); return }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const found = await searchCity(val, countryName, countryIso2)
      setResults(found)
      setLoading(false)
    }, 350)
  }

  const handleSelect = (city) => {
    setQuery(city.name)
    setResults([])

    const cityIso2 = city.countryIso2 ?? countryIso2

    // If city belongs to a different country, switch the panel country first
    if (cityIso2 && cityIso2 !== countryIso2) {
      const newCountryName = iso2ToName(cityIso2) ?? city.countryDisplay ?? ''
      if (newCountryName) {
        // Synthetic feature — only properties.name is needed by CountryPanel/store
        setSelectedCountry({ properties: { name: newCountryName } })
      }
    }

    setSelectedCity({ ...city, countryIso2: cityIso2 })

    if (isDrilldown(cityIso2) && city.state) {
      setHighlightedState(city.state)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setSelectedCity(null)
  }

  return (
    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      <SectionLabel>Search City / State</SectionLabel>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={`Search any city worldwide…`}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '10px 36px 10px 14px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#ffffff',
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
            outline: 'none',
          }}
          onFocus={e  => e.target.style.borderColor = 'rgba(100,150,255,0.6)'}
          onBlur={e   => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
        />
        {loading && (
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(140,170,255,0.6)', fontSize: '14px' }}>⋯</span>
        )}
        {!loading && query && (
          <button onClick={handleClear} style={{
            position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(200,210,255,0.4)', fontSize: '14px', padding: '2px 4px',
          }}>✕</button>
        )}
      </div>

      {results.length > 0 && (
        <div style={{
          position: 'absolute', left: '20px', right: '20px',
          top: 'calc(100% - 6px)',
          background: 'rgba(14, 22, 52, 0.99)',
          border: '1px solid rgba(100,140,255,0.25)',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          zIndex: 100, overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {results.map((r, i) => {
            const isCrossCountry = r.countryIso2 && r.countryIso2 !== countryIso2
            return (
              <button key={i} onClick={() => handleSelect(r)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 16px', background: 'none', border: 'none',
                borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(100,140,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>{r.name}</span>
                  {isCrossCountry && r.countryDisplay && (
                    <span style={{
                      fontSize: '11px', padding: '1px 6px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(100,150,255,0.15)', color: 'rgba(140,180,255,0.8)',
                      border: '1px solid rgba(100,150,255,0.2)', fontFamily: 'system-ui, sans-serif',
                    }}>
                      {r.countryDisplay}
                    </span>
                  )}
                </div>
                {r.state && (
                  <span style={{ fontSize: '12px', color: 'rgba(160,185,220,0.55)', fontFamily: 'system-ui, sans-serif' }}>{r.state}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{ width: '3px', height: '14px', borderRadius: '2px', background: 'linear-gradient(180deg, #6496ff, #a78bfa)', flexShrink: 0 }} />
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(200,215,255,0.85)', fontFamily: 'system-ui, sans-serif' }}>{children}</p>
    </div>
  )
}
