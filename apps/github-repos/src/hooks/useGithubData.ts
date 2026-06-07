import { getUserFacingError } from '@repo/utils'
import type { RepoApiData } from '../../types'
import { useQuery } from '@tanstack/react-query'

const MASTRA_API_URL = import.meta.env.VITE_PUBLIC_MASTRA_API_URL

const summarizeByTopic = async (query: string): Promise<RepoApiData> => {
  try {
    const response = await fetch(`${MASTRA_API_URL}summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: query })
    })

    const payload = await response.json()

    if (!response.ok) {
      return {
        repos: [],
        error: getUserFacingError(payload?.error),
        verdict: ''
      }
    }

    const { result } = payload

    if (!result) {
      return {
        repos: [],
        error: 'We could not generate recommendations right now. Please try again.',
        verdict: ''
      }
    }

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
export const useGithubAgentData = (query: string) => {

  const { data, isPending, error } = useQuery({
    queryKey: ['query', query],
    queryFn: () => summarizeByTopic(query)
  })

  return { data, isPending, error }
}
