import useGlobeStore from '../../store'

export default function PanelHeader({ onClose }) {
  const breadcrumb = useGlobeStore((s) => s.breadcrumb)
  const navigateTo = useGlobeStore((s) => s.navigateTo)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      flexShrink: 0,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
        {breadcrumb.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {i > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>›</span>
            )}
            <button
              onClick={() => i < breadcrumb.length - 1 && navigateTo(i)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: i < breadcrumb.length - 1 ? 'pointer' : 'default',
                color: i === breadcrumb.length - 1
                  ? '#ffffff'
                  : 'rgba(140,170,255,0.6)',
                fontSize: i === 0 ? '13px' : '13px',
                fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
                fontFamily: 'system-ui, sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px',
              }}
              title={crumb.label}
            >
              {crumb.label}
            </button>
          </span>
        ))}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close panel"
        style={{
          flexShrink: 0,
          marginLeft: '12px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: '26px',
          height: '26px',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
      >
        ✕
      </button>
    </div>
  )
}
