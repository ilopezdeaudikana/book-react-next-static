import { ApiResponseSchema, type SystemDefinition } from '../types/types'

export const SystemsService = {
  fetchSystems: async (): Promise<SystemDefinition[]> => {
    const response = await fetch('./sample_data.json')
    const rawData = (await response.json()) as SystemDefinition[]
    const { data, success } = ApiResponseSchema.safeParse(rawData)
    if (!success) {
      throw new Error('Invalid data type')
    }

    return data
  }
}