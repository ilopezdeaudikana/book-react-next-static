export const buildGitHubBody = (query: string): {
  query: string,
  variables: {
    query: string
  }
} => {
  return {
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
      query
    }
  }
}