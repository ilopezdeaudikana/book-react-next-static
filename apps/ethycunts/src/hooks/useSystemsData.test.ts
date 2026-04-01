import { renderHook, waitFor } from '@testing-library/react'
import { useSystemsData } from './useSystemsData'
import sampleData from '../data/sample_data.json'
import { useDataStore } from '../store/useDataStore'

describe('useSystemsData', () => {
  beforeEach(() => {
    useDataStore.getState().reset()
  })

  it('fetches sample data on mount', async () => {
    const { result } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(result.current.systemsMap.size).toBeGreaterThan(0)
    })
    expect(fetch).toHaveBeenCalledWith('/sample_data.json')
  })

  it('dedupes systems by fidesKey', async () => {
    const { result } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(result.current.systemsMap.size).toBeGreaterThan(0)
    })
    const keys = Array.from(result.current.systemsMap).map(([_,system]) => system.fidesKey)
    const unique = new Set(keys)
    expect(unique.size).toBe(keys.length)
  })

  it('extracts leaf categories', async () => {
    const { result } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(result.current.systemsMap.size).toBeGreaterThan(0)
    })
    const storefront = result.current.systemsMap.get('store_app')

    expect(storefront).toBeDefined()
    expect(storefront?.categories).toContain('location')
    expect(storefront?.categories).not.toContain('user.derived.identifiable.location')
  })

  it('loads the same data as sample_data.json', async () => {
    const { result } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(result.current.systemsMap.size).toBeGreaterThan(0)
    })
    const rawKeys = new Set(sampleData.map((system) => system.fides_key))
    const hookKeys = new Set(Array.from(result.current.systemsMap).map(([_,system]) => system.fidesKey))
    rawKeys.forEach((key) => expect(hookKeys.has(key)).toBe(true))
  })
})
