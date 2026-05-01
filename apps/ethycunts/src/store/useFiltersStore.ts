import { create } from 'zustand'
import { LayoutMode, MapMode } from '../types/types'

type FilterSlice = {
  selectedUses: string[]
  selectedCategories: string[]
  setSelectedUses: (values: string[]) => void
  setSelectedCategories: (values: string[]) => void
  resetFilters: () => void
  setHasFilters: () => void
  hasFilters: boolean
}

type LayoutSlice = {
  layoutMode: LayoutMode
  setLayoutMode: (mode: LayoutMode) => void
}

type MapModeSlice = {
  mapMode: MapMode
  setMapMode: (mode: MapMode) => void
}

export const useFiltersStore = create<FilterSlice & LayoutSlice & MapModeSlice>((set) => ({
  hasFilters: false,
  layoutMode: LayoutMode.SystemType,
  setHasFilters: () => set(state => {
    return { hasFilters: state.selectedUses.length > 0 || state.selectedCategories.length > 0 }
  }),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  mapMode: MapMode.ColourCode,

  setMapMode: (mode) => set({ mapMode: mode }),
  selectedUses: [],
  selectedCategories: [],
  setSelectedUses: (values) => set({ selectedUses: values }),
  setSelectedCategories: (values) => set({ selectedCategories: values }),
  resetFilters: () => set({ selectedUses: [], selectedCategories: [] })
}))
