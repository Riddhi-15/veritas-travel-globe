import useGlobeStore from '../store'

const MONTHS = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December']
const CURRENT_MONTH = MONTHS[new Date().getMonth()]

const ITEMS = [
  { color: 'rgba(52,211,153,0.85)',  dot: '#34d399', label: 'Great time to visit' },
  { color: 'rgba(250,204,21,0.85)',  dot: '#fbbf24', label: 'Average conditions'  },
  { color: 'rgba(251,113,133,0.85)', dot: '#fb7185', label: 'Best to avoid'       },
]

export default function HeatmapLegend() {
  const heatmapMode = useGlobeStore((s) => s.heatmapMode)

  if (!heatmapMode) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 300,
      background: 'rgba(6, 10, 26, 0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 40,
      padding: '9px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
      animation: 'fadeSlideUp 0.28s ease',
    }}>
      {/* Month label */}
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
        fontFamily: 'system-ui, sans-serif', paddingRight: 4,
        borderRight: '1px solid rgba(255,255,255,0.10)',
      }}>
        {CURRENT_MONTH}
      </span>

      {/* Swatches */}
      {ITEMS.map((item) => (
        <div key={item.label} style={{
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: item.dot,
            flexShrink: 0,
            boxShadow: `0 0 6px ${item.dot}80`,
          }} />
          <span style={{
            fontSize: 11.5, fontWeight: 500,
            color: item.color,
            fontFamily: 'system-ui, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            {item.label}
          </span>
        </div>
      ))}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
        }
      `}</style>
    </div>
  )
}
