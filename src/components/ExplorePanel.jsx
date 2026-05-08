import { useState } from 'react'

const TIPS = [
  {
    icon: '↺',
    label: 'Rotate',
    desc: 'Click and drag anywhere on the globe to spin it freely in any direction.',
  },
  {
    icon: '⊕',
    label: 'Zoom',
    desc: 'Scroll up to zoom in, scroll down to zoom out.',
  },
  {
    icon: '◎',
    label: 'Select Country',
    desc: 'Click any country on the globe to open its travel info panel.',
  },
  {
    icon: '⌕',
    label: 'Search',
    desc: 'With a country selected, type a city or state in the search bar.',
  },
  {
    icon: '❯❯',
    label: 'Drill Down',
    desc: 'Explore states, regions, and local travel info across 30+ countries.',
  },
]

const PANEL_WIDTH = 300

export default function ExplorePanel() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Slide-in panel ── */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          width: PANEL_WIDTH,
          transform: open ? 'translateX(0)' : `translateX(-${PANEL_WIDTH}px)`,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'rgba(6, 10, 26, 0.94)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderRight: '1px solid rgba(255,255,255,0.09)',
          zIndex: 500,
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 20px 28px',
          gap: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 6 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.40)',
            fontFamily: 'system-ui, sans-serif',
            marginBottom: 4,
          }}>
            Guide
          </div>
          <h2 style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.02em',
          }}>
            How to Explore
          </h2>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '2px 0 6px' }} />

        {/* Tips */}
        {TIPS.map((tip) => (
          <TipRow key={tip.label} {...tip} />
        ))}
      </div>

      {/* ── Side tab trigger ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          left: open ? PANEL_WIDTH : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'rgba(6, 10, 26, 0.88)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          color: '#ffffff',
          padding: '16px 9px',
          cursor: 'pointer',
          zIndex: 501,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '4px 0 16px rgba(0,0,0,0.35)',
        }}
      >
        {/* Arrow indicator */}
        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.35s ease',
        }}>
          ❯
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          fontFamily: 'system-ui, sans-serif',
          color: 'rgba(255,255,255,0.80)',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {open ? 'Close' : 'How to Explore'}
        </span>
      </button>
    </>
  )
}

function TipRow({ icon, label, desc }) {
  return (
    <div style={{
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      padding: '13px 14px',
      borderRadius: 10,
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(255,255,255,0.03)',
    }}>
      <span style={{
        fontSize: 18,
        color: '#ffffff',
        opacity: 0.80,
        lineHeight: 1,
        flexShrink: 0,
        marginTop: 2,
        fontFamily: 'system-ui, sans-serif',
        minWidth: 22,
        textAlign: 'center',
      }}>
        {icon}
      </span>
      <div>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.04em',
          fontFamily: 'system-ui, sans-serif',
          marginBottom: 5,
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.55,
          fontFamily: 'system-ui, sans-serif',
        }}>
          {desc}
        </div>
      </div>
    </div>
  )
}
