import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { RichRepoObject, RepoObject } from '@repo/utils'
import { fetchReadme, rankRepositories, searchRepositories } from '../tools/github-tools'

const ReadmeSchema = z.object({
  found: z.boolean(),
  path: z.string().optional(),
  content: z.string().optional(),
  name: z.string()
})

// Define Step 1
const fetchStep = createStep({
  id: 'fetch-list',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData, requestContext }) => {
    return {
      repos: await searchRepositories(inputData.topic),
    }
  },
})

// Define Step 2
const selectionStep = createStep({
  id: 'select-repo',
  inputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject),
  }),
  outputSchema: z.object({
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData }) => {
    return {
      repos: rankRepositories(inputData.topic, inputData.repos)
    }
  },
})

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
    const readmes = await Promise.all(inputData.repos.map(repo => fetchReadme(repo.fullName)))

    return {
      ...inputData,
      readmes: Object.fromEntries(readmes)
    }
  },
})

const evaluateStep = createStep({
  id: 'evaluate-step',
  inputSchema: z.object({
    repos: z.array(RepoObject),
    readmes: z.record(z.string(), ReadmeSchema),
    topic: z.string()
  }),
  outputSchema: z.object({
    verdict: z.string(),
    readme: z.string().optional(), //ReadmeSchema,
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgentById('github-scout')

    const withReadme = inputData.repos.map(repo => ({...repo, readme: inputData.readmes[repo.fullName].content }))
    const reposJson = JSON.stringify(inputData.repos)

    const response = await agent.generate(
      `Topic: "${inputData.topic}"\nData: ${reposJson}`
    )

    return {
      verdict: response.text,
      repos: inputData.repos,
      readme: withReadme[0].readme
    }
  }
})

export const githubWorkflow = createWorkflow({
  id: 'github-crawler-flow',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RichRepoObject),
    selected: z.string(),
    readme: ReadmeSchema,
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
  .map(async ({ getStepResult, getInitData }) => {
    const selectionData = getStepResult(selectionStep)
    const initialData = getInitData<{ topic: string }>()

    return {
      topic: initialData.topic,
      repos: selectionData.repos
    }
  })
  .then(inspectStep)
  .then(evaluateStep)
  .commit()
