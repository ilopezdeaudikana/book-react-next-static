import { describe, it, expect } from 'vitest'
import { ApiResponseSchema } from '../types/types'
import sample from '../data/sample_data.json'
import { addCategoriesAndUses } from './addCategoriesAndUses'

const expectedCategories = [
  'cookie_id',
  'email',
  'financial',
  'ip_address',
  'location'
]
const expectedUses = [
  'advertising.first_party',
  'advertising.third_party',
  'improve.system',
  'provide.system']

describe('addCategoriesAndUses', () => {
  const mockSystems = [
    sample[0],
    sample[1]
  ]

  const systemDefinitions = ApiResponseSchema.parse(mockSystems)

  it('should add uses and categories to each system', () => {
    const { systemsWithMeta } = addCategoriesAndUses(systemDefinitions)

    systemsWithMeta.forEach(system => {
      expect(system.categories).toBeDefined()
    })
    expect(systemsWithMeta[0].categories).toEqual(expectedCategories.filter(cat => cat !== 'financial'))
    expect(systemsWithMeta[0].uses).toEqual(expectedUses.slice(0, 3)
    )
  })

  it('should return allUses and allCategories', () => {
    const { allUses, allCategories } = addCategoriesAndUses(systemDefinitions)
    expect(allUses).toBeDefined()
    expect(allUses).toEqual(expectedUses)

    expect(allCategories).toBeDefined()

    expect(allCategories).toEqual(expectedCategories)
  })

})