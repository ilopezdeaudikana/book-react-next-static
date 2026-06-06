import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { RichRepoObject, RepoObject } from '@repo/utils'
import { fetchReadme, searchRepositories } from '../tools/github-tools'

const ReadmeSchema = z.object({
  found: z.boolean(),
  path: z.string().optional(),
  content: z.string().optional(),
  name: z.string()
})

// Step 1
const fetchStep = createStep({
  id: 'fetch-list',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData }) => {
    console.log('Fetch Step')
    return {
      repos: await searchRepositories(inputData.topic),
    }
  },
})

// Step 2
const inspectStep = createStep({
  id: 'inspect-repo',
  inputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject)
  }),
  outputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject),
    readmes: z.record(z.string(), ReadmeSchema),
  }),
  execute: async ({ inputData }) => {
    console.log('Inspect Step')
    const readmes = await Promise.all(inputData.repos.map(repo => fetchReadme(repo.fullName)))

    return {
      ...inputData,
      readmes: Object.fromEntries(readmes)
    }
  },
})

// Step 3
const evaluateStep = createStep({
  id: 'evaluate-step',
  inputSchema: z.object({
    repos: z.array(RepoObject),
    readmes: z.record(z.string(), ReadmeSchema),
    topic: z.string()
  }),
  outputSchema: z.object({
    verdict: z.string(),
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData, mastra }) => {
    // const agent = mastra.getAgentById('github-scout')

    console.log('Evaluate Step')
    const withReadme = inputData.repos.map(repo => ({...repo, readme: inputData.readmes[repo.fullName].content }))
    // const reposJson = JSON.stringify(inputData.repos)

    // const response = await agent.generate(
    //   `Topic: "${inputData.topic}"\nData: ${reposJson}`
    // )

    return {
      verdict: 'Foo', // response.text,
      repos: withReadme
    }
  }
})

export const githubWorkflow = createWorkflow({
  id: 'github-crawler-flow',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RichRepoObject),
    verdict: z.string(),
  }),
})
  .then(fetchStep)
  .map(async ({ getStepResult, getInitData }) => {
    const reposData = getStepResult(fetchStep)
    const initialData = getInitData<{ topic: string }>()
    console.log('Between steps', reposData.repos.length, initialData.topic)
    return {
      repos: reposData.repos,
      topic: initialData.topic,
    }
  })
  .then(inspectStep)
  .then(evaluateStep)
  .commit()
