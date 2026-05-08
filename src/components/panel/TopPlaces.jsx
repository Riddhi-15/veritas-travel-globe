import { useEffect, useState } from 'react'
import { fetchWikiImagesBatch, getScenicQuery, cleanPlaceName } from '../../utils/wikiImage'

const CAT_GRAD = {
  'Heritage':  'linear-gradient(135deg,#1a1008,#4a2a10,#7a5020)',
  'Nature':    'linear-gradient(135deg,#081a08,#103818,#1a6030)',
  'Beach':     'linear-gradient(135deg,#041828,#083060,#0a5888)',
  'City':      'linear-gradient(135deg,#0a0820,#201050,#382080)',
  'Adventure': 'linear-gradient(135deg,#1a0808,#4a1808,#803010)',
  'Religion':  'linear-gradient(135deg,#180818,#3a1030,#602050)',
  'default':   'linear-gradient(135deg,#080c20,#101830,#1a2848)',
}
const CAT_ICON = {
  'Heritage':'🏛','Nature':'🌿','Beach':'🏖','City':'🏙',
  'Adventure':'⛰','Religion':'🛕','default':'📍',
}

export default function TopPlaces({ places }) {
  // Batch-fetch all images in one API call instead of N separate calls
  const [imgs, setImgs] = useState({})

  useEffect(() => {
    if (!places?.length) { setImgs({}); return }
    let cancelled = false

    // Build query map: place name → wikipedia article name
    const queryMap = {}
    for (const p of places) {
      if (p.name) queryMap[p.name] = getScenicQuery(cleanPlaceName(p.name))
    }

    const articles = [...new Set(Object.values(queryMap))]
    fetchWikiImagesBatch(articles).then(results => {
      if (cancelled) return
      const imgMap = {}
      for (const [placeName, articleName] of Object.entries(queryMap)) {
        imgMap[placeName] = results[articleName] ?? null
      }
      setImgs(imgMap)
    })

    return () => { cancelled = true }
  }, [places])

  return (
    <div style={{ padding:'16px 0 16px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:20, marginBottom:14 }}>
        <SectionLabel>Top Places to Visit</SectionLabel>
      </div>

      {(!places || places.length === 0)
        ? <p style={emptyStyle}>No places data available</p>
        : (
          <div className="no-scrollbar" style={{
            display:'flex', gap:10, overflowX:'auto',
            paddingRight:20, paddingBottom:4,
          }}>
            {places.map((p, i) => <PlaceCard key={i} place={p} img={imgs[p.name] ?? null} />)}
          </div>
        )
      }
    </div>
  )
}

function PlaceCard({ place: p, img }) {
  const [loaded, setLoaded] = useState(false)

  // Reset loaded state when img URL changes
  useEffect(() => { setLoaded(false) }, [img])

  const cat  = p.category || 'default'
  const grad = CAT_GRAD[cat] ?? CAT_GRAD.default
  const icon = CAT_ICON[cat] ?? CAT_ICON.default
  const isGem = p.hidden_gem === true || String(p.hidden_gem).toLowerCase() === 'true'

  return (
    <div style={{
      flexShrink: 0, width: 150,
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.10)',
      background: 'rgba(10,14,30,0.80)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.40)',
    }}>
      {/* Photo area */}
      <div style={{
        height: 105, background: grad,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
        padding: 8,
      }}>
        {img && (
          <img
            src={img}
            alt={p.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%',
              display: 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
        {isGem && (
          <span style={{
            position: 'relative', zIndex: 1,
            fontSize: 10, fontWeight: 700,
            padding: '2px 6px', borderRadius: 6,
            background: 'rgba(251,191,36,0.85)',
            color: '#000', lineHeight: 1.4,
            fontFamily: 'system-ui,sans-serif',
          }}>✦ Gem</span>
        )}
        <span style={{
          position: 'absolute', bottom: 8, left: 10, zIndex: 1,
          fontSize: 18,
        }}>{icon}</span>
      </div>

      {/* Label */}
      <div style={{ padding:'9px 11px 10px' }}>
        <div style={{
          fontSize:13, fontWeight:600, color:'#ffffff',
          fontFamily:'system-ui,sans-serif', lineHeight:1.35,
          display:'-webkit-box', WebkitLineClamp:2,
          WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>
          {p.name}
        </div>
        <div style={{
          fontSize:10.5, marginTop:4,
          color: 'rgba(180,210,255,0.55)',
          fontFamily:'system-ui,sans-serif', textTransform:'uppercase',
          letterSpacing:'0.06em', fontWeight:600,
        }}>{cat}</div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <span style={{ width:3, height:14, borderRadius:2, background:'linear-gradient(180deg,#6496ff,#a78bfa)', flexShrink:0 }} />
      <p style={{ margin:0, fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(200,215,255,0.85)', fontFamily:'system-ui,sans-serif' }}>{children}</p>
    </div>
  )
}

const emptyStyle = { margin:0, fontSize:13, fontStyle:'italic', color:'rgba(180,190,220,0.45)', fontFamily:'system-ui,sans-serif', paddingRight:20 }
