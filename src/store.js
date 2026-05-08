import { create } from 'zustand'

const useGlobeStore = create((set, get) => ({
  // Selection state
  selectedCountry: null,   // topojson polygon feature
  selectedState: null,     // geojson feature (drill-down countries only)
  selectedCity: null,      // { name, state, lat, lon, countryIso2 }

  // Breadcrumb: [{label, type: 'country'|'state'|'city', data}]
  breadcrumb: [],

  // Advisory map: { [iso2]: 1|2|3|4 } — loaded once on app init
  advisoryMap: {},

  // Globe state highlight: iso2 of the currently highlighted state
  highlightedStateId: null,

  // --- Actions ---

  setSelectedCountry: (feature) => set({
    selectedCountry: feature,
    selectedState: null,
    selectedCity: null,
    highlightedStateId: null,
    breadcrumb: feature ? [{ label: feature.properties?.name ?? 'Unknown', type: 'country', data: feature }] : [],
  }),

  setSelectedState: (feature, label) => set((s) => {
    // Guard: if somehow called with no country in breadcrumb, do nothing
    if (!s.breadcrumb[0]) return {}
    return {
      selectedState: feature,
      selectedCity: null,
      breadcrumb: [
        s.breadcrumb[0],
        { label, type: 'state', data: feature },
      ],
    }
  }),

  setSelectedCity: (city) => set((s) => {
    const crumb = s.breadcrumb.filter((b) => b.type !== 'city')
    return {
      selectedCity: city,
      breadcrumb: [...crumb, { label: city.name, type: 'city', data: city }],
    }
  }),

  // Pop breadcrumb back to a given index
  navigateTo: (index) => set((s) => {
    const crumb = s.breadcrumb.slice(0, index + 1)
    const target = crumb[crumb.length - 1]
    return {
      breadcrumb: crumb,
      selectedState: target?.type === 'state' ? target.data : null,
      selectedCity: target?.type === 'city' ? target.data : null,
      highlightedStateId: target?.type === 'state' ? target.data?.id : null,
    }
  }),

  clearSelectedCountry: () => set({
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,
    breadcrumb: [],
    highlightedStateId: null,
  }),

  setAdvisoryMap: (map) => set({ advisoryMap: map }),
  setHighlightedState: (id) => set({ highlightedStateId: id }),

  // Heatmap — colours globe by current-month travel rating
  heatmapMode: false,
  toggleHeatmap: () => set((s) => ({ heatmapMode: !s.heatmapMode })),
}))

export default useGlobeStore
