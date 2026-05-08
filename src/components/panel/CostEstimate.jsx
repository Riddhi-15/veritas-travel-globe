import { useEffect, useState } from 'react'
import { getRateToINR } from '../../utils/frankfurter'

const TIERS = [
  { key: 'budget',   label: 'Budget'    },
  { key: 'midrange', label: 'Mid-range' },
  { key: 'luxury',   label: 'Luxury'    },
]

function fmt(num, currency) {
  if (!num || isNaN(num)) return '—'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(num)
}
function fmtINR(num) {
  if (!num) return null
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)
}

export default function CostEstimate({ row }) {
  const [rate, setRate] = useState(null)

  useEffect(() => {
    if (!row?.currency_code) return
    getRateToINR(row.currency_code).then(setRate)
  }, [row?.currency_code])

  return (
    <Section>
      {!row
        ? <p style={emptyStyle}>Cost data unavailable</p>
        : <>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TIERS.map(({ key, label }) => {
              const localVal = parseFloat(row[`${key}_local`])
              const inrVal   = rate && localVal ? localVal * rate : null
              const currency = row.currency_code ?? 'USD'
              return (
                <div key={key} style={{
                  flex: 1, padding: '12px 8px', borderRadius: '8px', textAlign: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}>
                  <div style={{ fontSize: '11px', color: 'rgba(160,185,255,0.65)', marginBottom: '6px', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', fontFamily: 'system-ui, sans-serif', lineHeight: 1.2 }}>
                    {fmt(localVal, currency)}
                  </div>
                  {inrVal && (
                    <div style={{ fontSize: '12px', color: 'rgba(100,220,150,0.8)', marginTop: '4px', fontFamily: 'system-ui, sans-serif', fontWeight: 500 }}>
                      {fmtINR(inrVal)}
                    </div>
                  )}
                  <div style={{ fontSize: '10px', color: 'rgba(180,190,220,0.3)', marginTop: '5px', fontFamily: 'system-ui, sans-serif' }}>
                    per day
                  </div>
                </div>
              )
            })}
          </div>
          {row.currency_name && (
            <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'rgba(180,190,220,0.35)', fontFamily: 'system-ui, sans-serif' }}>
              {row.currency_name} ({row.currency_code}) · INR via Frankfurter
            </p>
          )}
        </>
      }
    </Section>
  )
}

function Section({ children }) {
  return (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>Cost Estimate</SectionLabel>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <span style={{ width: '3px', height: '14px', borderRadius: '2px', background: 'linear-gradient(180deg, #6496ff, #a78bfa)', flexShrink: 0 }} />
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(200,215,255,0.85)', fontFamily: 'system-ui, sans-serif' }}>{children}</p>
    </div>
  )
}

const emptyStyle = { margin: 0, fontSize: '13px', fontStyle: 'italic', color: 'rgba(180,190,220,0.45)', fontFamily: 'system-ui, sans-serif' }
