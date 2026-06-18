import { renderHook, waitFor } from '@testing-library/react'
import { useFilters } from './useFilters'
import { useSystemsDerivedData } from './useSystemsDerivedData'
import { LayoutMode } from '../types/types'
import { useDataStore } from '../store/useDataStore'

describe('useFilters', () => {
  beforeEach(() => {
    useDataStore.getState().reset()
    const mosckSystemsMap = new Map()
    const mosckUsedByMap = new Map()
    mosckSystemsMap.set('store_app', {
      "name": "Example.com Online Storefront",
      "description": "Storefront application to search for products, browse sales and promotions, review product information, etc.",
      "fidesKey": "store_app",
      "privacyDeclarations": [
        {
          "name": "Online Advertising",
          "dataCategories": [
            "user.derived.identifiable.device.cookie_id",
            "user.derived.identifiable.device.ip_address",
            "user.derived.identifiable.location"
          ],
          "dataSubjects": [
            "customer"
          ],
          "dataUse": "advertising.third_party"
        },
        {
          "name": "Email Marketing",
          "dataCategories": [
            "user.provided.identifiable.contact.email"
          ],
          "dataSubjects": [
            "customer"
          ],
          "dataUse": "advertising.first_party"
        },
        {
          "name": "Product Analytics",
          "dataCategories": [
            "user.derived.identifiable.device.cookie_id"
          ],
          "dataSubjects": [
            "customer"
          ],
          "dataUse": "improve.system"
        }
      ],
      "systemDependencies": [
        "app_database",
        "search_database",
        "advertising_integration",
        "email_integration",
        "analytics_integration"
      ],
      "systemType": "Application",
      "categories": [
        "cookie_id",
        "email",
        "ip_address",
        "location"
      ],
      "uses": [
        "advertising.first_party",
        "advertising.third_party",
        "improve.system"
      ]
    })

    mosckUsedByMap.set('app_database', [
      "store_app",
      "checkout_app",
      "orders_service",
      "privacy_app"
    ])
    useDataStore.setState({
      usedByMap: mosckUsedByMap, systemsMap: mosckSystemsMap, allCategories: [
        "cookie_id",
        "email",
        "financial",
        "ip_address",
        "location"
      ], allUses: [
        "advertising.first_party",
        "advertising.third_party",
        "improve.system",
        "provide.system",
        "provide.system.operations.support"
      ]
    })
  })


  it('filters systems without changing group layout', async () => {

    const { result: data } = renderHook(() => useSystemsDerivedData())

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
    const { result: data } = renderHook(() => useSystemsDerivedData())
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