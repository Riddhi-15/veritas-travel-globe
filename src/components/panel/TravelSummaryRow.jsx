import { useEffect, useState } from 'react'
import { getRateToINR } from '../../utils/frankfurter'

const MONTHS  = ['J','F','M','A','M','J','J','A','S','O','N','D']
const BT_KEYS = ['bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun','bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec']
const BAR = {
  '1': { height: 18, color: '#22c55e' },
  '2': { height: 11, color: '#334155' },
  '3': { height:  6, color: '#ef4444' },
}

const VISA_STYLES = {
  'Visa-free':        { color: '#22c55e', bg: 'rgba(34,197,94,0.15)',    border: 'rgba(34,197,94,0.35)'   },
  'Visa on Arrival':  { color: '#38bdf8', bg: 'rgba(56,189,248,0.15)',   border: 'rgba(56,189,248,0.35)'  },
  'e-Visa Available': { color: '#c084fc', bg: 'rgba(192,132,252,0.15)',  border: 'rgba(192,132,252,0.35)' },
  'Visa Required':    { color: '#fb923c', bg: 'rgba(251,146,60,0.15)',   border: 'rgba(251,146,60,0.35)'  },
}
const VISA_DESC = {
  'Visa-free':        'No visa needed for short stays.',
  'Visa on Arrival':  'Get visa at the port of entry.',
  'e-Visa Available': 'Apply online before travelling.',
  'Visa Required':    'Apply at embassy in advance.',
}

function fmt(num, currency) {
  if (!num || isNaN(num)) return '—'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(num)
}
function fmtINR(num) {
  if (!num) return null
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)
}

export default function TravelSummaryRow({ row }) {
  const [rate, setRate] = useState(null)

  useEffect(() => {
    if (!row?.currency_code) return
    getRateToINR(row.currency_code).then(setRate)
  }, [row?.currency_code])

  const currency  = row?.currency_code ?? 'USD'
  const midLocal  = parseFloat(row?.midrange_local)
  const midINR    = rate && midLocal ? fmtINR(midLocal * rate) : null
  const visaType  = row?.visa_type
  const visaStyle = VISA_STYLES[visaType] ?? { color:'rgba(200,215,255,0.7)', bg:'rgba(100,140,255,0.08)', border:'rgba(100,140,255,0.2)' }
  const visaDesc  = VISA_DESC[visaType] ?? 'Check requirements before travel.'
  const peakShort = row?.peak_months?.split(',')[0]?.split('(')[0]?.trim() ?? '—'
  const peakDesc  = row?.peak_months?.match(/\(([^)]+)\)/)?.[1] ?? ''

  return (
    <div style={{ padding:'16px 20px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>Best Time · Cost · Visa</SectionLabel>

      <div style={{ display:'flex', gap:8, alignItems:'stretch' }}>

        {/* ── Best Time card ── */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Best Time to Visit</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#4ade80', fontFamily:'system-ui,sans-serif', lineHeight:1.2, marginBottom:4 }}>
            {peakShort}
          </div>
          <div style={cardDescStyle}>
            {peakDesc || (row?.peak_months ?? 'Data unavailable')}
          </div>
          {/* Mini bar chart at bottom */}
          {row && (
            <div style={{ display:'flex', gap:2, alignItems:'flex-end', marginTop:'auto', paddingTop:10 }}>
              {BT_KEYS.map((k, i) => {
                const b = BAR[String(row[k] ?? '2')] ?? BAR['2']
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                    <div style={{
                      width:'100%', height: b.height,
                      borderRadius:'2px 2px 1px 1px',
                      background: b.color,
                      opacity: b.height === 18 ? 1 : b.height === 11 ? 0.40 : 0.72,
                    }} />
                    <span style={{ fontSize:7, color:'rgba(200,210,230,0.38)', fontFamily:'system-ui,sans-serif', lineHeight:1 }}>
                      {MONTHS[i]}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Cost card ── */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Cost Estimate</div>
          <div style={{ fontSize:13, fontWeight:600, color:'rgba(200,220,255,0.75)', fontFamily:'system-ui,sans-serif', marginBottom:4 }}>
            Mid Range
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:'#ffffff', fontFamily:'system-ui,sans-serif', lineHeight:1.2, marginBottom:4 }}>
            {fmt(midLocal, currency)}
          </div>
          {midINR && (
            <div style={{ fontSize:11.5, color:'rgba(100,220,150,0.80)', fontFamily:'system-ui,sans-serif', marginBottom:6 }}>
              ≈ {midINR}
            </div>
          )}
          <div style={cardDescStyle}>per day · excl. flights</div>
          <div style={{ display:'flex', gap:2, marginTop:'auto', paddingTop:8 }}>
            {['$','$','$','$','$'].map((s, i) => (
              <span key={i} style={{ fontSize:13, color: i < 2 ? '#f59e0b' : 'rgba(255,255,255,0.15)', fontFamily:'system-ui,sans-serif' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── Visa card ── */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Visa Requirement</div>
          {visaType ? (
            <>
              <span style={{
                display:'inline-flex', alignItems:'center', gap:5,
                padding:'4px 10px', borderRadius:14,
                background: visaStyle.bg, border:`1px solid ${visaStyle.border}`,
                fontSize:12, fontWeight:700, color: visaStyle.color,
                fontFamily:'system-ui,sans-serif', marginBottom:8,
                alignSelf:'flex-start',
              }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:visaStyle.color, flexShrink:0 }} />
                {visaType}
              </span>
              <div style={cardDescStyle}>{visaDesc}</div>
            </>
          ) : (
            <div style={{ fontSize:11, color:'rgba(180,190,220,0.40)', fontFamily:'system-ui,sans-serif', fontStyle:'italic' }}>
              Data unavailable
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

const cardStyle = {
  flex:1, padding:'12px 11px 13px', borderRadius:10,
  background:'rgba(255,255,255,0.04)',
  border:'1px solid rgba(255,255,255,0.08)',
  display:'flex', flexDirection:'column',
}
const cardTitleStyle = {
  fontSize:10, fontWeight:700, letterSpacing:'0.07em',
  textTransform:'uppercase', color:'rgba(74,222,128,0.80)',
  fontFamily:'system-ui,sans-serif', marginBottom:8,
}
const cardDescStyle = {
  fontSize:12, color:'rgba(180,200,240,0.65)',
  fontFamily:'system-ui,sans-serif', lineHeight:1.45,
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
      <span style={{ width:3, height:14, borderRadius:2, background:'linear-gradient(180deg,#6496ff,#a78bfa)', flexShrink:0 }} />
      <p style={{ margin:0, fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(200,215,255,0.85)', fontFamily:'system-ui,sans-serif' }}>{children}</p>
    </div>
  )
}
