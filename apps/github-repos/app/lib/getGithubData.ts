import { getUserFacingError } from '@repo/utils'
import { RepoApiData } from '../../types'

export const getGithubAgentData = async (query: string): Promise<RepoApiData> => {
  const MASTRA_API_URL = process.env.MASTRA_API_URL
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
    }
  }
}
