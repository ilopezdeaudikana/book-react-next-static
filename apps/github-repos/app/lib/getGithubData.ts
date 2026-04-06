import { buildGitHubBody } from '@repo/utils'
import { Repo, RepoApiData } from '../../types'


export const getGithubRestData = async (query: string): Promise<RepoApiData> => {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_TOKEN}`,
      },
      body: JSON.stringify({...buildGitHubBody(query)}),
    })

    const result = await res.json()

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      return { repos: [], error: 'GitHub query failed.' }
    }

    return {
      repos: (result.data.search.edges as Repo[]).map((item, index) => ({ ...item.node, key: index })),
      error: null
    }

  } catch (error) {
    console.log('Unexpected error fetching repos')
    return {
      repos: [],
      error: 'Failed to connect to GitHub.'
    }
  }
}

export const getGithubAgentData = async (query: string): Promise<any> => {
  try {
    const response = await fetch('http://localhost:4111/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: query }),
    })

    const { result } = await response.json()
    console.log(`Crawl result for ${query}:`, result)
    return result
  } catch (error) {
    console.log('Unexpected error fetching repos')
    return {
      repos: [],
      error: 'Failed to connect to GitHub.'
    }
  }
}