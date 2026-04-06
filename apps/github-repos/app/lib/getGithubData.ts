import { RepoApiData } from '../../types'

export const getGithubAgentData = async (query: string): Promise<RepoApiData> => {
  try {
    const response = await fetch('http://localhost:4111/summarize', {
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