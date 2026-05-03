import { create } from 'zustand'
import { type SystemWithMeta } from '../types/types'

type DependencyEntry = {
  fidesKey: string
  name: string
}

type SelectionSlice = {
  dependencies: DependencyEntry[]
  setDependencies: (items: DependencyEntry[]) => void
  clearSelection: () => void
}

type MapStore = {
  activeSystem: string | null
  systemsMap: Map<string, SystemWithMeta>
  cardRefs: Map<string, HTMLElement | null>
  highlightedKeys: Set<string>
  connectedKeys: Set<string>
  filteredFidesKeys: Set<string>
  registerCardRef: (key: string, ref: HTMLElement | null) => void
  setHighlightedKeys: (keys: Set<string>) => void,
  setConnectedKeys: (keys: Set<string>) => void,
  setFilteredFidesKeys: (keys: Set<string>) => void
  selectSystem: (key: string | null) => void
}

export const useMapStore = create<MapStore & SelectionSlice>((set, get) => ({
  dependencies: [],
  activeSystem: null,
  cardRefs: new Map<string, HTMLElement | null>(),
  systemsMap: new Map(),
  highlightedKeys: new Set<string>(),
  connectedKeys: new Set<string>(),
  filteredFidesKeys: new Set<string>(),
  selectSystem: (key: string | null) => {
    const current = get().activeSystem
    set({
      activeSystem: current === key ? null : key,
    })
  },
  clearSelection: () => set({ activeSystem: null, dependencies: [] }),
  setHighlightedKeys: (keys: Set<string>) => set({ highlightedKeys: keys }),
  setConnectedKeys: (keys: Set<string>) => set({ connectedKeys: keys }),
  setFilteredFidesKeys: (keys: Set<string>) => set({ filteredFidesKeys: keys }),
  registerCardRef: (key: string, ref: HTMLElement | null) => {
    set((state) => ({
      cardRefs: new Map(state.cardRefs).set(key, ref)
    }))
  },
  setDependencies: (items) => set({ dependencies: items })
}))
