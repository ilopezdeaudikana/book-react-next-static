import { create } from 'zustand'
import { type SystemWithMeta } from '../types/types'

type DataState = {
  systemsMap: Map<string, SystemWithMeta>
  usedByMap: Map<string, string[]>
  allUses: string[]
  allCategories: string[]
  reset: () => void
  setDerivedState: (derivedState: {
    systemsMap: Map<string, SystemWithMeta>
    usedByMap: Map<string, string[]>
    allUses: string[]
    allCategories: string[]
  }) => void
}

export const useDataStore = create<DataState>((set) => ({
  systemsMap: new Map(),
  usedByMap: new Map(),
  allUses: [],
  allCategories: [],
  setDerivedState: ({
    systemsMap,
    allCategories,
    usedByMap,
    allUses
  }) =>
    set({
      systemsMap,
      allCategories,
      usedByMap,
      allUses
    })
  ,
  reset: () =>
    set({
      systemsMap: new Map(),
      allUses: [],
      allCategories: []
    }),
}))
