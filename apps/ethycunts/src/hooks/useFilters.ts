import { LayoutMode } from '../types/types'
import type { SystemWithMeta, LayoutMode as LayoutModeType } from '../types/types'

type FiltersState = {
  filteredFidesKeys: Set<string>
  groups: Map<string, SystemWithMeta[]>
  groupOrder: string[]
}

export const useFilters = (
  systems: Map<string, SystemWithMeta>,
  allUses: string[],
  selectedUses: string[],
  selectedCategories: string[],
  layoutMode: LayoutModeType,
): FiltersState => {

  const filteredSystems = Array.from(systems).filter(([_, system]) => {
    const useMatch =
      selectedUses.length === 0 || system.uses.some((use) => selectedUses.includes(use))
    const categoryMatch =
      selectedCategories.length === 0 ||
      system.categories.some((category) => selectedCategories.includes(category))
    return useMatch && categoryMatch
  })

  const filteredFidesKeys = new Set(filteredSystems.reduce<string[]>(
    (acc, [_,system]) => {
    acc.push(system.fidesKey)
    return acc
    }
    , []))

  const groups = new Map<string, SystemWithMeta[]>()

  systems.forEach((system) => {
    if (layoutMode === LayoutMode.SystemType) {
      const key = system.systemType
      groups.set(key, [...(groups.get(key) ?? []), system])
      return
    }

    system.uses.forEach((use) => {
      groups.set(use, [...(groups.get(use) ?? []), system])
    })
  })

  const groupOrder =
    layoutMode === LayoutMode.SystemType
      ? Array.from(groups.keys()).sort((a, b) => a.localeCompare(b))
      : allUses.filter((use) => groups.has(use))
  
  return {
    filteredFidesKeys,
    groups,
    groupOrder,
  }
}
