import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { buildGitHubBody, RepoObject } from '@repo/utils'

// Define Step 1
const fetchStep = createStep({
  id: 'fetch-list',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData }) => {
    const response = await fetch(
      `https://api.github.com/graphql`, {
      method: 'POST',

      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Mastra-Crawler-App', // random name
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ ...buildGitHubBody(inputData.topic) })
    }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`GitHub API failed: ${error}`)
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      return { repos: [], error: 'GitHub query failed.' }
    }

    return {
      repos: (result.data.search.edges).map((item: any, index: number) => ({ ...item.node, key: index })),
      error: null
    }
  },
})

// Define Step 2
const selectionStep = createStep({
  id: 'pick-repo',
  inputSchema: z.object({ repos: z.array(z.lazy(() => RepoObject)) }),
  outputSchema: z.object({ selected: z.string() }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgent('githubAgent')

    const prompt = `
      I found these repositories for the topic. 
      Pick the one that seems most "production-ready" based on description and stars:
      ${JSON.stringify(inputData.repos, null, 2)}
    `
    const res = await agent.generate(prompt)
    return {
      selected: res.text,
      repos: inputData.repos
    }
  },
})


export const githubWorkflow = createWorkflow({
  id: 'github-crawler-flow',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    allRepos: z.array(z.object(RepoObject)),
    winner: z.string()
  }),
})
  .then(fetchStep)
  .map(async ({ getStepResult, getInitData }) => {
    const reposData = getStepResult(fetchStep)
    const initialData = getInitData<{ topic: string }>()
    return {
      repos: reposData.repos,
      topic: initialData.topic,
    }
  })
  .then(selectionStep)
  .commit()