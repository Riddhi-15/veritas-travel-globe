import { useState } from 'react'
import useGlobeStore from '../store'

const MONTHS = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December']
const CURRENT_MONTH = MONTHS[new Date().getMonth()]

export default function TopNav() {
  const heatmapMode   = useGlobeStore((s) => s.heatmapMode)
  const toggleHeatmap = useGlobeStore((s) => s.toggleHeatmap)
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: 58,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(4, 8, 20, 0.72)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      zIndex: 400,
    }}>

      {/* ── Left: mode tabs ── */}
      <div className="topnav-tabs" style={{ position: 'absolute', left: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          padding: '5px 14px', borderRadius: 20,
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
          fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
          color: '#ffffff', fontFamily: 'system-ui, sans-serif',
          cursor: 'default', userSelect: 'none',
        }}>Browse</div>

        <div title="Plan Mode — coming soon" style={{
          padding: '5px 14px', borderRadius: 20,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.10)',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.05em',
          color: 'rgba(255,255,255,0.28)', fontFamily: 'system-ui, sans-serif',
          cursor: 'not-allowed', userSelect: 'none',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Plan
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#00d4aa', background: 'rgba(0,212,170,0.12)',
            border: '1px solid rgba(0,212,170,0.30)',
            padding: '1px 5px', borderRadius: 4,
            textShadow: '0 0 8px rgba(0,212,170,0.50)',
          }}>soon</span>
        </div>
      </div>

      {/* ── Center: brand ── */}
      <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
        <h1 style={{
          margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '0.30em',
          color: '#ffffff', fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase', lineHeight: 1,
        }}>Veritas</h1>
        <p className="topnav-subtitle" style={{
          margin: '4px 0 0', fontSize: 10, fontWeight: 400,
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em',
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>3D Travel Intelligence Globe &nbsp;·&nbsp; 195 Countries</p>
      </div>

      {/* ── Right: Best Time toggle ── */}
      <div style={{ position: 'absolute', right: 20 }}>
        <button
          onClick={toggleHeatmap}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          title={heatmapMode ? 'Hide travel heat map' : `Show best time to visit for ${CURRENT_MONTH}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.05em', transition: 'all 0.2s ease',
            border: heatmapMode
              ? '1px solid rgba(52,211,153,0.55)'
              : `1px solid rgba(255,255,255,${btnHovered ? '0.22' : '0.10'})`,
            background: heatmapMode
              ? 'rgba(52,211,153,0.12)'
              : `rgba(255,255,255,${btnHovered ? '0.08' : '0.04'})`,
            color: heatmapMode ? 'rgba(52,211,153,0.95)' : 'rgba(255,255,255,0.55)',
            boxShadow: heatmapMode ? '0 0 12px rgba(52,211,153,0.15)' : 'none',
          }}
        >
          {/* Dot indicator */}
          <span style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            background: heatmapMode ? '#34d399' : 'rgba(255,255,255,0.25)',
            boxShadow: heatmapMode ? '0 0 6px #34d399' : 'none',
            transition: 'all 0.2s ease',
          }} />
          Best Time
          {heatmapMode && (
            <span style={{
              fontSize: 10, fontWeight: 500, color: 'rgba(52,211,153,0.70)',
              letterSpacing: '0.04em',
            }}>
              {CURRENT_MONTH}
            </span>
          )}
        </button>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .topnav-tabs { display: none !important; }
          .topnav-subtitle { display: none !important; }
        }
      `}</style>
    </div>
  )
}
