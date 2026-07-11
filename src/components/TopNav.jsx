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
    <div className="topnav-root" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: 49,
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
      <div className="topnav-tabs" style={{ position: 'absolute', left: 17, display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          padding: '4px 12px', borderRadius: 17,
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
          color: '#ffffff', fontFamily: 'system-ui, sans-serif',
          cursor: 'default', userSelect: 'none',
        }}>Browse</div>

        <div title="Plan Mode — coming soon" style={{
          padding: '4px 12px', borderRadius: 17,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.10)',
          fontSize: 10, fontWeight: 500, letterSpacing: '0.05em',
          color: 'rgba(255,255,255,0.28)', fontFamily: 'system-ui, sans-serif',
          cursor: 'not-allowed', userSelect: 'none',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          Plan
          <span style={{
            fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#00d4aa', background: 'rgba(0,212,170,0.12)',
            border: '1px solid rgba(0,212,170,0.30)',
            padding: '1px 4px', borderRadius: 4,
            textShadow: '0 0 8px rgba(0,212,170,0.50)',
          }}>soon</span>
        </div>
      </div>

      {/* ── Center: brand ── */}
      <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
        <h1 style={{
          margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '0.26em',
          color: '#ffffff', fontFamily: 'system-ui, sans-serif',
          textTransform: 'uppercase', lineHeight: 1,
        }}>Veritas</h1>
        <p className="topnav-subtitle" style={{
          margin: '6px 0 0', fontSize: 9, fontWeight: 400,
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.13em',
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>3D Travel Intelligence Globe &nbsp;·&nbsp; 195 Countries</p>
      </div>

      {/* ── Right: Best Time toggle ── */}
      <div className="topnav-btn-wrap" style={{ position: 'absolute', right: 14 }}>
        <button
          onClick={toggleHeatmap}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          title={heatmapMode ? 'Hide travel heat map' : `Show best time to visit for ${CURRENT_MONTH}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 9px', borderRadius: 17, cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.05em', transition: 'all 0.2s ease',
            border: heatmapMode
              ? '1px solid rgba(52,211,153,0.40)'
              : `1px solid rgba(255,255,255,${btnHovered ? '0.14' : '0.07'})`,
            background: heatmapMode
              ? 'rgba(52,211,153,0.08)'
              : `rgba(255,255,255,${btnHovered ? '0.05' : '0.02'})`,
            color: heatmapMode ? 'rgba(52,211,153,0.85)' : 'rgba(255,255,255,0.40)',
            boxShadow: heatmapMode ? '0 0 12px rgba(52,211,153,0.15)' : 'none',
          }}
        >
          {/* Dot indicator */}
          <span style={{
            width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
            background: heatmapMode ? '#34d399' : 'rgba(255,255,255,0.25)',
            boxShadow: heatmapMode ? '0 0 6px #34d399' : 'none',
            transition: 'all 0.2s ease',
          }} />
          Best Time
          {heatmapMode && (
            <span style={{
              fontSize: 9, fontWeight: 500, color: 'rgba(52,211,153,0.70)',
              letterSpacing: '0.04em',
            }}>
              {CURRENT_MONTH}
            </span>
          )}
        </button>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .topnav-tabs    { display: none !important; }
          .topnav-root    { height: 68px !important; align-items: flex-start !important; padding-top: 10px !important; }
          .topnav-subtitle { display: block !important; }
          .topnav-btn-wrap { top: 10px !important; }
        }
      `}</style>
    </div>
  )
}
