const VISA_STYLES = {
  'Visa-free':        { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',    border: 'rgba(34,197,94,0.3)'   },
  'Visa on Arrival':  { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',   border: 'rgba(56,189,248,0.3)'  },
  'e-Visa Available': { color: '#c084fc', bg: 'rgba(192,132,252,0.12)',  border: 'rgba(192,132,252,0.3)' },
  'Visa Required':    { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',   border: 'rgba(251,146,60,0.3)'  },
}

export default function VisaRequirements({ row }) {
  const visaType = row?.visa_type
  const style = VISA_STYLES[visaType] ?? { color: 'rgba(200,215,255,0.7)', bg: 'rgba(100,140,255,0.08)', border: 'rgba(100,140,255,0.2)' }

  return (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>Visa — Indian Passport</SectionLabel>
      {!visaType
        ? <p style={{ margin: 0, fontSize: '13px', fontStyle: 'italic', color: 'rgba(180,190,220,0.45)', fontFamily: 'system-ui, sans-serif' }}>Visa data unavailable</p>
        : <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '20px',
            background: style.bg, border: `1px solid ${style.border}`,
            fontSize: '13px', fontWeight: 600,
            color: style.color, fontFamily: 'system-ui, sans-serif',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: style.color, flexShrink: 0 }} />
            {visaType}
          </span>
      }
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
