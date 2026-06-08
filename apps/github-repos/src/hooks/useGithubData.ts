import { getUserFacingError } from '@repo/utils'
import type { RepoApiData } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { get, set, del } from 'idb-keyval'

// 7 days
const MAX_AGE = 7 * 24 * 60 * 60 * 1000

const MASTRA_API_URL = import.meta.env.VITE_PUBLIC_MASTRA_API_URL

const summarizeByTopic = async (query: string): Promise<RepoApiData> => {
  const cacheKey = `summary:${query}`
  const cachedRecord = await get(cacheKey)

  if (cachedRecord) {
    const isExpired = Date.now() - cachedRecord.timestamp > MAX_AGE

    if (!isExpired) {
      return cachedRecord.data
    }

    // Clear old data
    await del(cacheKey)
  }

  try {
    const response = await fetch(`${MASTRA_API_URL}summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: query })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        repos: [],
        error: getUserFacingError(result?.error),
        verdict: ''
      }
    }

    if (!result) {
      return {
        repos: [],
        error: 'We could not generate recommendations right now. Please try again.',
        verdict: ''
      }
    }

    await set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    return result

  } catch (error) {
    console.log('Unexpected error fetching repos', error)
    return {
      repos: [],
      error: 'We could not reach the recommendation service. Please try again.',
      verdict: ''
    }
  }
}
export const useGithubAgentData = (query?: string) => {

  const { data, isPending, error } = useQuery({
    queryKey: ['query', query],
    queryFn: () => summarizeByTopic(query ?? ''),
    enabled: !!query
  })

  return { data, isPending, error }
}
