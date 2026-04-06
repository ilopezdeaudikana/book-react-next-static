import { RepoApiData } from '../../types'

export const getGithubAgentData = async (query: string): Promise<RepoApiData> => {
  const MASTRA_API_URL = process.env.MASTRA_API_URL
  try {
    const response = await fetch(`${MASTRA_API_URL}summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: query }),
    })

    const { result } = await response.json()
 
    return result

  } catch (error) {
    console.log('Unexpected error fetching repos', error)
    return {
      repos: [],
      error: 'Failed to connect to GitHub.'
    }
  }
}