const MONTHS = ['J','F','M','A','M','J','J','A','S','O','N','D']
const KEYS   = ['bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun','bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec']

const BAR = {
  '1': { height: 34, color: '#22c55e' },
  '2': { height: 20, color: '#334155' },
  '3': { height: 10, color: '#ef4444' },
}
const MAX_H = 34

export default function BestTimeToVisit({ row }) {
  return (
    <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <SectionLabel>Best Time to Visit</SectionLabel>

      {!row
        ? <p style={emptyStyle}>Best time data unavailable</p>
        : <>
          {/* Bar chart */}
          <div style={{ display:'flex', gap:3, alignItems:'flex-end', marginBottom:6 }}>
            {KEYS.map((k, i) => {
              const b = BAR[String(row[k] ?? '2')] ?? BAR['2']
              return (
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{
                    width:'100%', height: b.height,
                    borderRadius:'3px 3px 2px 2px',
                    background: b.color,
                    opacity: b.height === MAX_H ? 1 : b.height === 20 ? 0.45 : 0.65,
                  }} />
                  <span style={{ fontSize:9, color:'rgba(200,210,230,0.50)', fontFamily:'system-ui,sans-serif' }}>
                    {MONTHS[i]}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ display:'flex', gap:14, marginBottom: row.peak_months ? 10 : 0 }}>
            {[['#22c55e','Peak'],['#334155','Okay'],['#ef4444','Avoid']].map(([col, lbl]) => (
              <span key={lbl} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:8, height:8, borderRadius:2, background:col, flexShrink:0 }} />
                <span style={{ fontSize:11, color:'rgba(200,215,230,0.55)', fontFamily:'system-ui,sans-serif' }}>{lbl}</span>
              </span>
            ))}
          </div>

          {row.peak_months && (
            <p style={{ margin:0, fontSize:12, color:'rgba(200,215,240,0.65)', fontFamily:'system-ui,sans-serif', lineHeight:1.5 }}>
              <span style={{ color:'#4ade80', fontWeight:700 }}>✓ {row.peak_months}</span>
              {row.avoid_months && (
                <><br /><span style={{ color:'rgba(248,113,113,0.8)', fontWeight:600 }}>✕ {row.avoid_months}</span></>
              )}
            </p>
          )}
        </>
      }
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
      <span style={{ width:3, height:14, borderRadius:2, background:'linear-gradient(180deg,#6496ff,#a78bfa)', flexShrink:0 }} />
      <p style={{ margin:0, fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(200,215,255,0.85)', fontFamily:'system-ui,sans-serif' }}>{children}</p>
    </div>
  )
}

const emptyStyle = { margin:0, fontSize:13, fontStyle:'italic', color:'rgba(180,190,220,0.45)', fontFamily:'system-ui,sans-serif' }
