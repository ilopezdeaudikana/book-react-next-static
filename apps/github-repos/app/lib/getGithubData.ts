import { Repo, RepoApiData } from '../../types'

export const getGithubData = async (query: string): Promise<RepoApiData> => {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
      query SearchRepos($query: String!) {
        search(first: 50, query: $query, type: REPOSITORY) {
          repositoryCount
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              ... on Repository {
                id
                name
                url
                forkCount
                stargazerCount
              }
            }
          }
        }
      }
    `,
        variables: {
          query: query
        },
      }),
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