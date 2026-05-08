import useGlobeStore from '../../store'
import { nameToIso2 } from '../../utils/iso2map'
import { ADVISORY_LEVELS, getAdvisoryLevel } from '../../utils/advisory'

export default function AdvisoryBadge() {
  // Subscribe directly to the store — updates whenever either value changes
  const advisoryMap     = useGlobeStore((s) => s.advisoryMap)
  const selectedCountry = useGlobeStore((s) => s.selectedCountry)

  const countryName = selectedCountry?.properties?.name ?? ''
  const iso2        = nameToIso2(countryName)
  const level       = getAdvisoryLevel(advisoryMap, iso2)

  return (
    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>Travel Advisory</SectionLabel>
      {!level ? (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', borderRadius: '20px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '13px', color: 'rgba(200,210,230,0.5)',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(200,210,230,0.3)', flexShrink: 0 }} />
          Advisory data unavailable
        </span>
      ) : (() => {
        const def = ADVISORY_LEVELS[level]
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '20px',
            background: def.bg, border: `1px solid ${def.border}`,
            fontSize: '13px', fontWeight: 600,
            color: def.color, fontFamily: 'system-ui, sans-serif',
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: def.color, flexShrink: 0,
              boxShadow: `0 0 6px ${def.color}`,
            }} />
            Level {level} — {def.label}
          </span>
        )
      })()}
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
