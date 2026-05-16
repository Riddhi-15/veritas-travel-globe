import { useEffect, useState } from 'react'
import useGlobeStore from '../store'
import { nameToIso2 } from '../utils/iso2map'
import { getCountryRow, getPlaces, getIndiaStateRow, getStatePlaces, getCityRow, getCityPlaces } from '../utils/sheets'
import FALLBACK from '../data/fallback'
import { ADVISORY_LEVELS, getAdvisoryLevel } from '../utils/advisory'
import { fetchWikiImage, getScenicQuery } from '../utils/wikiImage'

import CitySearchBar from './panel/CitySearchBar'
import LatestNews from './panel/LatestNews'
import TopPlaces from './panel/TopPlaces'
import LocalInsight from './panel/LocalInsight'
import TravelSummaryRow from './panel/TravelSummaryRow'

const COUNTRY_GRADIENTS = {
  JP: 'linear-gradient(135deg,#1a0820,#4a1040,#c06080,#e8a0b0)',
  CN: 'linear-gradient(135deg,#200808,#601010,#a02020,#c84040)',
  IN: 'linear-gradient(135deg,#1a1000,#503010,#a06020,#e0902a)',
  US: 'linear-gradient(135deg,#080c28,#101850,#182880,#2040c0)',
  BR: 'linear-gradient(135deg,#081408,#103820,#186030,#20a040)',
  AU: 'linear-gradient(135deg,#100808,#381820,#703040,#b05060)',
  FR: 'linear-gradient(135deg,#080c20,#1a1860,#2828a0,#4848e0)',
  DE: 'linear-gradient(135deg,#100800,#302000,#604000,#907020)',
  IT: 'linear-gradient(135deg,#180808,#501818,#903030,#d06040)',
  GB: 'linear-gradient(135deg,#080c20,#141840,#202870,#3040a0)',
  ES: 'linear-gradient(135deg,#200c00,#601c00,#a03000,#e06020)',
  MX: 'linear-gradient(135deg,#081a08,#103820,#186830,#20a048)',
  CA: 'linear-gradient(135deg,#180808,#481818,#882030,#c04040)',
  KR: 'linear-gradient(135deg,#08101a,#103060,#185090,#2070c0)',
  TH: 'linear-gradient(135deg,#1a0c00,#502000,#904000,#d07820)',
  ID: 'linear-gradient(135deg,#180808,#501818,#902020,#d04030)',
  TR: 'linear-gradient(135deg,#180808,#501818,#902828,#c03838)',
  EG: 'linear-gradient(135deg,#1a1000,#503000,#906010,#d09020)',
  ZA: 'linear-gradient(135deg,#081808,#103820,#206040,#309060)',
  NG: 'linear-gradient(135deg,#081808,#0c3010,#106018,#18a030)',
  GR: 'linear-gradient(135deg,#040c18,#082040,#103870,#1860b0)',
  PT: 'linear-gradient(135deg,#100808,#3a1818,#703030,#a06050)',
  NL: 'linear-gradient(135deg,#140808,#402010,#803020,#c05030)',
  CH: 'linear-gradient(135deg,#081010,#103028,#185040,#207860)',
  SE: 'linear-gradient(135deg,#080c18,#101838,#182860,#204898)',
  NO: 'linear-gradient(135deg,#080818,#101030,#181860,#202898)',
  NZ: 'linear-gradient(135deg,#040c18,#082038,#103868,#1860a8)',
  AR: 'linear-gradient(135deg,#081018,#102030,#184860,#207898)',
  PE: 'linear-gradient(135deg,#180808,#501010,#902020,#c04040)',
  MA: 'linear-gradient(135deg,#180c00,#502800,#905000,#c07820)',
  KE: 'linear-gradient(135deg,#081808,#103020,#185840,#209060)',
  VN: 'linear-gradient(135deg,#180808,#501818,#882828,#c04040)',
  PH: 'linear-gradient(135deg,#0c1018,#182040,#284880,#3870c0)',
  MY: 'linear-gradient(135deg,#100808,#381018,#702030,#c04050)',
  SG: 'linear-gradient(135deg,#100808,#381010,#702020,#c03030)',
  default: 'linear-gradient(135deg,#080c20,#101830,#1a2848,#243060)',
}

export default function CountryPanel() {
  const selectedCountry      = useGlobeStore((s) => s.selectedCountry)
  const selectedState        = useGlobeStore((s) => s.selectedState)   // ← was missing
  const selectedCity         = useGlobeStore((s) => s.selectedCity)
  const clearSelectedCountry = useGlobeStore((s) => s.clearSelectedCountry)

  const [countryRow, setCountryRow] = useState(null)
  const [places, setPlaces]         = useState([])
  const [dataLevel, setDataLevel]   = useState('country')
  const [heroImg, setHeroImg]       = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  const advisoryMap = useGlobeStore((s) => s.advisoryMap)

  const isOpen      = !!selectedCountry
  const countryName = selectedCountry?.properties?.name ?? ''
  const iso2        = nameToIso2(countryName)

  // Derive the display name: city > state > country
  const stateName  = selectedState?.properties?.name ?? null
  const displayName = selectedCity?.name ?? stateName ?? countryName

  const advisoryLevel = getAdvisoryLevel(advisoryMap, iso2)
  const advisoryDef   = advisoryLevel ? ADVISORY_LEVELS[advisoryLevel] : null

  // ── 0. Hero image — fetch from Wikipedia whenever displayed subject changes ─
  useEffect(() => {
    let cancelled = false
    if (!displayName) { setHeroImg(null); setHeroLoaded(false); return }
    setHeroLoaded(false)
    setHeroImg(null)
    const query = getScenicQuery(displayName)
    fetchWikiImage(query).then(url => {
      if (!cancelled) setHeroImg(url ?? null)
    })
    return () => { cancelled = true }
  }, [displayName])

  // ── 1. Country changes → load country-level data ─────────────────────────
  useEffect(() => {
    if (!iso2) { setCountryRow(null); setPlaces([]); return }
    setCountryRow(null)
    setPlaces([])
    setDataLevel('country')

    Promise.all([getCountryRow(iso2), getPlaces(iso2)]).then(([row, pl]) => {
      const fb = FALLBACK[iso2] ?? null
      setCountryRow(row ?? fb)
      setPlaces(pl?.length ? pl : (fb?.places ?? []))
    })
  }, [iso2])

  // ── 2. State polygon clicked → load state-level data (India only) ────────
  useEffect(() => {
    if (!selectedState || !iso2) return

    const sName   = selectedState.properties?.name ?? ''
    const isIndia = iso2 === 'IN'

    if (isIndia && sName) {
      setDataLevel('state')
      Promise.all([
        getIndiaStateRow(sName),
        getStatePlaces(sName),
      ]).then(([stateRow, statePlaces]) => {
        if (stateRow) {
          setCountryRow((prev) => ({ ...prev, ...stateRow }))
          if (statePlaces?.length) setPlaces(statePlaces)
          setDataLevel('state')
        } else {
          setDataLevel('state_no_data')
        }
      })
    }
    // For non-India drilldown countries: panel keeps country data, state name
    // shows in breadcrumb/header only — no per-state data available yet.
  }, [selectedState, iso2])

  // ── 3. City searched → load city-level data, fall back to state/country ──
  useEffect(() => {
    if (!selectedCity) {
      // Search cleared → revert to country or state level
      if (selectedState && iso2 === 'IN') {
        const sName = selectedState.properties?.name ?? ''
        setDataLevel('state')
        Promise.all([getIndiaStateRow(sName), getStatePlaces(sName)]).then(([stateRow, statePlaces]) => {
          if (stateRow) {
            setCountryRow({ ...(FALLBACK[iso2] ?? {}), ...stateRow })
            if (statePlaces?.length) setPlaces(statePlaces)
          }
        })
      } else {
        setDataLevel('country')
        if (iso2) {
          const fb = FALLBACK[iso2] ?? null
          setCountryRow((prev) => prev ?? fb)
          setPlaces((prev) => prev.length ? prev : (fb?.places ?? []))
        }
      }
      return
    }

    const cityName = selectedCity.name
    const cityIso2 = selectedCity.countryIso2?.toUpperCase() ?? iso2
    const stateName = selectedCity.state ?? ''
    const isIndia = cityIso2 === 'IN'

    // Always try city-specific data first (all countries)
    Promise.all([
      getCityRow(cityName, cityIso2),
      getCityPlaces(cityName, cityIso2),
    ]).then(([cityRow, cityPlaces]) => {
      if (cityRow) {
        // We have city-level data — use it, merged on top of country base for currency etc.
        const fb = FALLBACK[cityIso2] ?? {}
        setCountryRow({ ...fb, ...cityRow })
        if (cityPlaces?.length) setPlaces(cityPlaces)
        setDataLevel('city')
        return
      }

      // No city data — fall back to state (India) or country level
      if (isIndia && stateName) {
        setDataLevel('state')
        Promise.all([getIndiaStateRow(stateName), getStatePlaces(stateName)]).then(([stateRow, statePlaces]) => {
          if (stateRow) {
            const fb = FALLBACK[iso2] ?? {}
            setCountryRow({ ...fb, ...stateRow })
            if (statePlaces?.length) setPlaces(statePlaces)
            setDataLevel('state')
          } else {
            setDataLevel('state_no_data')
          }
        })
      } else {
        // Non-India or no state — keep country data, just mark level
        setDataLevel('city_no_data')
      }
    })
  }, [selectedCity, selectedState, iso2])

  return (
    <>
      {/* Dim overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.38)',
        zIndex: 10, pointerEvents: 'none',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
      }} />

      {/* Panel */}
      <div
        className="panel-root"
        style={{
          position: 'fixed',
          top: 58, right: 0, bottom: 0,
          width: '38vw',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(10, 14, 26, 0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Hero photo */}
        <div className="panel-hero" style={{
          position: 'relative', height: 260, flexShrink: 0, overflow: 'hidden',
          background: COUNTRY_GRADIENTS[iso2] ?? COUNTRY_GRADIENTS.default,
        }}>
          {/* Real Wikipedia photo — fades in over the gradient */}
          {heroImg && (
            <img
              src={heroImg}
              alt={displayName}
              loading="eager"
              decoding="async"
              onLoad={() => setHeroLoaded(true)}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 30%',
                display: 'block',
                opacity: heroLoaded ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            />
          )}
          {/* Close button — top left */}
          <button
            onClick={clearSelectedCountry}
            aria-label="Close panel"
            style={{
              position: 'absolute', top: 12, left: 12, zIndex: 3,
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.85)', fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.80)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
          >✕</button>

          {/* Travel Advisory badge — top right */}
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            {advisoryDef ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(0,0,0,0.72)',
                border: `1px solid ${advisoryDef.border}`,
                fontSize: 11, fontWeight: 700, color: advisoryDef.color,
                fontFamily: 'system-ui,sans-serif',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: advisoryDef.color, flexShrink: 0, boxShadow: `0 0 6px ${advisoryDef.color}` }} />
                Level {advisoryLevel} — {advisoryDef.label}
              </span>
            ) : (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(0,0,0,0.72)', border: '1px solid rgba(255,255,255,0.18)',
                fontSize: 11, fontWeight: 600, color: 'rgba(200,215,255,0.75)',
                fontFamily: 'system-ui,sans-serif',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              }}>Travel Advisory</span>
            )}
          </div>

          {/* Bottom gradient overlay + name + data level */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.85) 100%)',
            padding: '60px 16px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{
                  margin: 0, fontSize: 22, fontWeight: 700,
                  color: '#ffffff', letterSpacing: '-0.2px',
                  lineHeight: 1.2, fontFamily: 'system-ui,sans-serif',
                }}>
                  {displayName}
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(200,220,255,0.65)', fontFamily: 'system-ui,sans-serif' }}>
                  {selectedCity ? (
                    <>{selectedCity.state ? `${selectedCity.state} · ` : ''}{countryName}</>
                  ) : selectedState ? (
                    <>{countryName}</>
                  ) : iso2 ? (
                    <>{iso2}{countryRow?.currency_code ? ` · ${countryRow.currency_code}` : ''}</>
                  ) : null}
                </p>
              </div>
              {/* Data level badge */}
              {dataLevel === 'city' && <span style={dlBadge('#64b8ff','rgba(100,180,255,0.15)','rgba(100,180,255,0.25)')}>city data</span>}
              {dataLevel === 'state' && <span style={dlBadge('#64dc96','rgba(100,200,140,0.15)','rgba(100,200,140,0.25)')}>state data</span>}
              {(dataLevel === 'city_no_data' || dataLevel === 'state_no_data') && <span style={dlBadge('#ffc850','rgba(255,200,80,0.1)','rgba(255,200,80,0.2)')}>country data</span>}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <CitySearchBar countryName={countryName} countryIso2={iso2} />
          <LatestNews />
          <TopPlaces places={places} />
          <LocalInsight />
          <TravelSummaryRow row={countryRow} />

          <div style={{ padding: '14px 20px 24px' }}>
            <p style={{ margin: 0, fontSize: '10px', fontStyle: 'italic', color: 'rgba(140,160,210,0.25)', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
              Data sourced from Google Sheets · Travel Advisory API · NewsData.io · Frankfurter
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .panel-root {
            top: auto !important;
            left: 0 !important; right: 0 !important; bottom: 0 !important;
            width: 100% !important; height: 72vh !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 18px 18px 0 0 !important;
            transform: ${isOpen ? 'translateY(0)' : 'translateY(100%)'} !important;
          }
          .panel-hero { height: 160px !important; }
        }
        .panel-root ::-webkit-scrollbar { width: 3px; }
        .panel-root ::-webkit-scrollbar-track { background: transparent; }
        .panel-root ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.10);
          border-radius: 2px;
        }
        .panel-root ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.20);
        }
      `}</style>
    </>
  )
}

function dlBadge(color, bg, border) {
  return {
    fontSize: 10, padding: '3px 9px', borderRadius: 10, flexShrink: 0,
    background: bg, color, border: `1px solid ${border}`,
    fontFamily: 'system-ui,sans-serif', fontWeight: 600,
  }
}
