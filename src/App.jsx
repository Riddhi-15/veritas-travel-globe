import { useEffect } from 'react'
import Globe from './components/Globe'
import CountryPanel from './components/CountryPanel'
import TopNav from './components/TopNav'
import HeatmapLegend from './components/HeatmapLegend'
import LandingOverlay from './components/LandingOverlay'
import { loadAdvisoryMap } from './utils/advisory'
import useGlobeStore from './store'

export default function App() {
  const setAdvisoryMap = useGlobeStore((s) => s.setAdvisoryMap)

  useEffect(() => {
    loadAdvisoryMap().then(setAdvisoryMap)
  }, [setAdvisoryMap])

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Globe />
      <CountryPanel />
      <TopNav />
      <HeatmapLegend />
      <LandingOverlay />
    </div>
  )
}
