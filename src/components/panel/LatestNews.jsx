import { useEffect, useState } from 'react'
import useGlobeStore from '../../store'
import { fetchNews } from '../../utils/news'

const NEWS_KEY = import.meta.env.VITE_NEWSDATA_KEY
const NEWS_CONFIGURED =
  !!NEWS_KEY &&
  NEWS_KEY !== 'your_newsdata_key_here' &&
  NEWS_KEY !== 'your_newsdata_api_key_here'

export default function LatestNews() {
  const selectedCountry = useGlobeStore((s) => s.selectedCountry)
  const selectedState   = useGlobeStore((s) => s.selectedState)
  const selectedCity    = useGlobeStore((s) => s.selectedCity)

  const countryName = selectedCountry?.properties?.name ?? ''
  const stateName   = selectedState?.properties?.name ?? selectedCity?.state ?? ''

  // Priority: city name → state name → country name
  const query = selectedCity?.name
    ? `${selectedCity.name} ${countryName}`
    : stateName
      ? `${stateName} ${countryName}`
      : countryName

  const [articles, setArticles] = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(false)

  useEffect(() => {
    if (!NEWS_CONFIGURED || !countryName) {
      setArticles(null)
      setLoading(false)
      setError(false)
      return
    }

    let cancelled = false

    setArticles(null)
    setError(false)
    setLoading(true)

    fetchNews({ query }).then((data) => {
      if (cancelled) return
      setLoading(false)
      if (data === null) setError(true)
      else setArticles(data)
    })

    return () => { cancelled = true }
  }, [query, countryName])

  if (!NEWS_CONFIGURED) {
    return (
      <Section title="Latest News">
        <p style={{ ...emptyStyle, fontStyle: 'normal' }}>
          News unavailable —{' '}
          <span style={{ color: 'rgba(140,170,255,0.7)' }}>
            add your NewsData.io key to{' '}
            <code style={{
              fontSize: '12px',
              background: 'rgba(255,255,255,0.06)',
              padding: '1px 5px',
              borderRadius: '3px',
            }}>
              .env
            </code>
          </span>
        </p>
      </Section>
    )
  }

  // Panel closed — hide section entirely
  if (!countryName) return null

  return (
    <Section title="Latest News">
      {loading && <p style={emptyStyle}>Loading…</p>}

      {!loading && error && (
        <p style={emptyStyle}>Headlines unavailable — check connection</p>
      )}

      {!loading && !error && articles?.length === 0 && (
        <p style={emptyStyle}>No news found for {stateName || countryName}</p>
      )}

      {!loading && !error && articles?.map((a, i) => (
        <a
          key={i}
          href={a.link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '11px 0', textDecoration: 'none',
            borderBottom:
              i < articles.length - 1
                ? '1px solid rgba(255,255,255,0.06)'
                : 'none',
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#6496ff', flexShrink: 0, marginTop: '5px',
          }} />
          <div>
            <span style={{
              fontSize: '15px', color: 'rgba(235,240,255,0.92)',
              lineHeight: 1.55, display: 'block',
              fontFamily: 'system-ui, sans-serif',
            }}>
              {a.title}
            </span>
            {a.source && (
              <span style={{
                fontSize: '12px', color: 'rgba(140,160,210,0.65)',
                marginTop: '3px', display: 'block',
                fontFamily: 'system-ui, sans-serif',
              }}>
                {a.source}
              </span>
            )}
          </div>
        </a>
      ))}
    </Section>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <span style={{
        width: '3px', height: '14px', borderRadius: '2px',
        background: 'linear-gradient(180deg, #6496ff, #a78bfa)',
        flexShrink: 0,
      }} />
      <p style={{
        margin: 0, fontSize: '13px', fontWeight: 700,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'rgba(200,215,255,0.85)', fontFamily: 'system-ui, sans-serif',
      }}>
        {children}
      </p>
    </div>
  )
}

const emptyStyle = {
  margin: 0, fontSize: '13px', fontStyle: 'italic',
  color: 'rgba(180,190,220,0.45)', fontFamily: 'system-ui, sans-serif',
}
