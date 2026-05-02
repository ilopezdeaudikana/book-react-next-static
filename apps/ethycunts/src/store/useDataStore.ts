import { create } from 'zustand'
import { ApiResponseSchema, type SystemDefinition, type SystemWithMeta, DataStatus } from '../types/types'
import { dedupeSystems } from '../utils/dedupeSystems'
import { addCategoriesAndUses } from '../utils/addCategoriesAndUses'

type DataState = {
  systems: SystemDefinition[]
  systemsMap: Map<string, SystemWithMeta>
  allUses: string[]
  allCategories: string[]
  status: DataStatus
  load: () => Promise<void>
  reset: () => void
}

export const useDataStore = create<DataState>((set, get) => ({
  systems: [],
  systemsMap: new Map(),
  allUses: [],
  allCategories: [],
  status: DataStatus.Idle,
  load: async () => {
    const { status } = get()
    if (status === DataStatus.Loading || status === DataStatus.Ready) return
    set({ status: DataStatus.Loading })
    try {
      const response = await fetch('./sample_data.json')

      if (!response.ok) {
        set({ status: DataStatus.Error })
        return
      }
      const rawData = (await response.json()) as SystemDefinition[]
      const { data, success } = ApiResponseSchema.safeParse(rawData)
      if (!success) {
        set({ status: DataStatus.Error })
        return
      }

      if (!Array.isArray(data)) {
        set({ status: DataStatus.Error })
        return
      }
      const systems = dedupeSystems(data)
      const { systemsWithMeta,
        allUses,
        allCategories } = addCategoriesAndUses(systems)
      const systemsMap = new Map(systemsWithMeta.map((system) => [system.fidesKey, system]))
      
      set({ systems, systemsMap, allCategories, allUses, status: DataStatus.Ready })
    } catch (e) {
      set({ status: DataStatus.Error })
    }
  },
  reset: () =>
    set({
      systems: [],
      systemsMap: new Map(),
      allUses: [],
      allCategories: [],
      status: DataStatus.Idle
    }),
}))
