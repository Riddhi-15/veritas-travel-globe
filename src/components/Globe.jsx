import { useEffect, useRef } from 'react'
import GlobeGL from 'globe.gl'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import useGlobeStore from '../store'
import { isDrilldown } from '../constants/drilldown'
import { nameToIso2 } from '../utils/iso2map'
import FALLBACK from '../data/fallback'

// ── Static bt_map: iso2 → current-month travel rating (1/2/3) ────────────────
const MONTH_KEY = [
  'bt_jan','bt_feb','bt_mar','bt_apr','bt_may','bt_jun',
  'bt_jul','bt_aug','bt_sep','bt_oct','bt_nov','bt_dec',
][new Date().getMonth()]

// Only country entries have an `iso2` field; state entries don't
const BT_MAP = Object.fromEntries(
  Object.entries(FALLBACK)
    .filter(([, v]) => v.iso2)
    .map(([iso2, data]) => [iso2, String(data[MONTH_KEY] ?? '')])
)

// Colors chosen to sit beautifully on top of the blue-marble texture
const HM = {
  '1': 'rgba(52, 211, 153, 0.44)',   // emerald green  — great time to visit
  '2': 'rgba(250, 204, 21,  0.36)',  // golden amber   — average
  '3': 'rgba(251, 113, 133, 0.40)',  // rose red       — best to avoid
}
const HM_NO_DATA = 'rgba(255,255,255,0.04)'  // near-invisible for unmapped countries

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildStarfield() {
  const count = 8000
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 3000
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, sizeAttenuation: true, transparent: true, opacity: 0.85 })
  )
}

async function fetchStateGeoJSON(iso2) {
  try {
    const res = await fetch(`/geo/${iso2.toLowerCase()}.json`)
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

function topNStates(features, n = 50) {
  if (features.length <= n) return features
  return features
    .map((f) => {
      let x0 = 180, x1 = -180, y0 = 90, y1 = -90
      const walk = (c) => {
        if (typeof c[0] === 'number') {
          if (c[0] < x0) x0 = c[0]; if (c[0] > x1) x1 = c[0]
          if (c[1] < y0) y0 = c[1]; if (c[1] > y1) y1 = c[1]
        } else c.forEach(walk)
      }
      ;(f.geometry?.coordinates ?? []).forEach(walk)
      return { f, area: (x1 - x0) * (y1 - y0) }
    })
    .sort((a, b) => b.area - a.area)
    .slice(0, n)
    .map(({ f }) => f)
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Globe() {
  const mountRef           = useRef(null)
  const globeRef           = useRef(null)
  const countryFeaturesRef = useRef(null)
  const activeIso2Ref      = useRef(null)
  const stateCacheRef      = useRef({})
  const selectedCountryRef = useRef(null)

  // Refs that the color function reads — always current, no stale closures
  const hoveredRef          = useRef(null)
  const highlightedStateRef = useRef(null)
  const heatmapModeRef      = useRef(false)

  const setSelectedCountry = useGlobeStore((s) => s.setSelectedCountry)
  const setSelectedState   = useGlobeStore((s) => s.setSelectedState)
  const highlightedStateId = useGlobeStore((s) => s.highlightedStateId)
  const selectedCountry    = useGlobeStore((s) => s.selectedCountry)
  const heatmapMode        = useGlobeStore((s) => s.heatmapMode)

  // Keep mirrors in sync every render
  selectedCountryRef.current  = selectedCountry
  highlightedStateRef.current = highlightedStateId
  heatmapModeRef.current      = heatmapMode

  // ── Single source-of-truth color function (reads from refs) ──────────────
  // Must be stable across renders — defined with useRef so the globe handler
  // always calls the same function object, which reads live refs each time.
  const colorFnRef = useRef((d) => {
    // 1. Hovered polygon — always brightest
    if (d === hoveredRef.current) return 'rgba(80,180,255,0.14)'

    // 2. State polygons
    if (d.__type === 'state') {
      return d.properties?.name === highlightedStateRef.current
        ? 'rgba(100,180,255,0.28)' : 'rgba(0,0,0,0)'
    }

    // 3. Heatmap mode — country polygons coloured by current-month bt value
    if (heatmapModeRef.current) {
      const iso2 = nameToIso2(d.properties?.name)
      const bt   = iso2 ? BT_MAP[iso2] : ''
      return HM[bt] ?? HM_NO_DATA
    }

    // 4. Default — transparent
    return 'rgba(0,0,0,0)'
  })

  // Convenience: re-registers the color function so globe re-evaluates all polygons
  // Throttled via rAF so hover events don't fire 60+ times per frame
  const rafPendingRef = useRef(false)
  const refreshColors = () => {
    if (!globeRef.current) return
    if (rafPendingRef.current) return
    rafPendingRef.current = true
    requestAnimationFrame(() => {
      rafPendingRef.current = false
      if (globeRef.current) globeRef.current.polygonCapColor(colorFnRef.current)
    })
  }

  // ── React to heatmap toggle ───────────────────────────────────────────────
  useEffect(() => { refreshColors() }, [heatmapMode])          // eslint-disable-line

  // ── React to highlighted state change ────────────────────────────────────
  useEffect(() => { refreshColors() }, [highlightedStateId])   // eslint-disable-line

  // ── Reset polygons when panel closes ─────────────────────────────────────
  useEffect(() => {
    if (!selectedCountry && globeRef.current && countryFeaturesRef.current) {
      activeIso2Ref.current = null
      globeRef.current.polygonsData(countryFeaturesRef.current)
      refreshColors()
    }
  }, [selectedCountry])   // eslint-disable-line

  // ── One-time globe setup ──────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current
    if (!el || globeRef.current) return

    const globe = GlobeGL()(el)
    globeRef.current = globe

    globe
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .showAtmosphere(true).atmosphereColor('#3fa9f5').atmosphereAltitude(0.30)
      .backgroundColor('#000000')
    globe.controls().autoRotate      = true
    globe.controls().autoRotateSpeed = 0.4
    globe.controls().enableDamping   = true
    globe.width(el.clientWidth).height(el.clientHeight)
    globe.pointOfView({ altitude: 1.8 })
    globe.scene().add(buildStarfield())

    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((world) => {
        const countries = feature(world, world.objects.countries)
        countries.features.forEach((f) => { f.__type = 'country' })
        countryFeaturesRef.current = countries.features

        globe
          .polygonsData(countries.features)
          .polygonAltitude(0.001)
          .polygonCapColor(colorFnRef.current)
          .polygonSideColor(() => 'rgba(0,0,0,0)')
          .polygonStrokeColor(() => 'rgba(80,180,255,0.45)')
          .polygonLabel(({ properties: p }) => p?.name ?? '')
          .onPolygonClick(async (polygon) => {
            globe.controls().autoRotate = false

            if (polygon.__type === 'state') {
              if (!selectedCountryRef.current) return
              setSelectedState(polygon, polygon.properties?.name ?? 'Unknown State')
              return
            }

            setSelectedCountry(polygon)
            const { lng, lat } = polygon.properties?.centroid ?? {}
            if (lat != null) globe.pointOfView({ lat, lng, altitude: 1.6 }, 800)

            const iso2 = nameToIso2(polygon.properties?.name)
            if (!iso2 || !isDrilldown(iso2)) return

            activeIso2Ref.current = iso2

            if (stateCacheRef.current[iso2]) {
              globe.polygonsData([...countryFeaturesRef.current, ...stateCacheRef.current[iso2]])
              refreshColors()
              return
            }

            const geoData = await fetchStateGeoJSON(iso2)
            if (!geoData?.features)             return
            if (activeIso2Ref.current !== iso2) return

            const stateFeatures = topNStates(
              geoData.features.map((f) => ({ ...f, __type: 'state' }))
            )
            stateCacheRef.current[iso2] = stateFeatures
            globe.polygonsData([...countryFeaturesRef.current, ...stateFeatures])
            refreshColors()
          })
          .onPolygonHover((hovered) => {
            hoveredRef.current = hovered
            globe.polygonAltitude((d) => (d === hovered ? 0.008 : 0.001))
            refreshColors()
            el.style.cursor = hovered ? 'pointer' : 'default'
          })
      })

    const handleResize = () => globe.width(el.clientWidth).height(el.clientHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSelectedCountry, setSelectedState])   // eslint-disable-line

  return <div ref={mountRef} className="w-full h-full" />
}
