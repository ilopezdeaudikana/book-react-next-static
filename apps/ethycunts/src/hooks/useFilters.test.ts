import { renderHook, waitFor } from '@testing-library/react'
import { useFilters } from './useFilters'
import { useSystemsData } from './useSystemsData'
import { LayoutMode } from '../types/types'
import { useDataStore } from '../store/useDataStore'

describe('useFilters', () => {
  beforeEach(() => {
    useDataStore.getState().reset()
  })

  it('filters systems without changing group layout', async () => {
    const { result: data } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(data.current.systemsMap.size).toBeGreaterThan(0)
    })
    const { systemsMap, allUses } = data.current

    const { result } = renderHook(() =>
      useFilters(systemsMap, allUses, [allUses[0]], [], LayoutMode.SystemType),
    )

    const totalSystems = systemsMap.size
    const countInGroups = () =>
      Array.from(result.current.groups.values()).reduce((sum, group) => sum + group.length, 0)

    expect(countInGroups()).toBe(totalSystems)

    const expectedFiltered = Array.from(systemsMap).filter(([_, system]) =>
      system.uses.includes(allUses[0]),
    )
    expect(result.current.filteredFidesKeys.size).toBe(expectedFiltered.length)
    expect(countInGroups()).toBe(totalSystems)
  })

  it('returns filtered keys for selected categories', async () => {
    const { result: data } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(data.current.systemsMap.size).toBeGreaterThan(0)
    })
    const { systemsMap, allUses, allCategories } = data.current

    const { result } = renderHook(() =>
      useFilters(systemsMap, allUses, [], [allCategories[0]], LayoutMode.SystemType),
    )
    const filteredFidesKeys = result.current.filteredFidesKeys
    const expectedFiltered = Array.from(systemsMap).filter(([_, system]) =>
      system.categories.includes(allCategories[0]),
    )
    expectedFiltered.forEach(([_, system]) => {
      expect(filteredFidesKeys.has(system.fidesKey)).toBe(true)
    })
  })
})
