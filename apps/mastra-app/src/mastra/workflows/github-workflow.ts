import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'
import { RepoObject } from '@repo/utils'
import { fetchReadme, listRepoFiles, rankRepositories, searchRepositories } from '../tools/github-tools'

const RepoFileSchema = z.object({
  name: z.string(),
  path: z.string(),
  type: z.string(),
})

const ReadmeSchema = z.object({
  found: z.boolean(),
  path: z.string(),
  content: z.string(),
})

const getInterestingFiles = (files: Array<z.infer<typeof RepoFileSchema>>) =>
  files
    .filter((file) =>
      /^(readme|package\.json|tsconfig|src|docs|examples|lib|bin|app)/i.test(file.name) ||
      /\/(src|docs|examples|lib|app)$/.test(file.path)
    )
    .slice(0, 3)
    .map((file) => file.path)

const getReadmeSignal = (readme: z.infer<typeof ReadmeSchema>) => {
  if (!readme.found || !readme.content.trim()) {
    return 'README details were not available'
  }

  const firstMeaningfulLine = readme.content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith('!['))

  if (!firstMeaningfulLine) {
    return `README found at ${readme.path}`
  }

  return `README starts with "${firstMeaningfulLine.slice(0, 120)}"`
}

const buildSelectionSummary = ({
  topic,
  repos,
  selectedRepo,
  files,
  readme,
}: {
  topic: string
  repos: Array<z.infer<typeof RepoObject>>
  selectedRepo: z.infer<typeof RepoObject>
  files: Array<z.infer<typeof RepoFileSchema>>
  readme: z.infer<typeof ReadmeSchema>
}) => {
  const runnerUp = repos.find((repo) => repo.fullName !== selectedRepo.fullName)
  const fileSignals = getInterestingFiles(files)
  const parts = [
    `${selectedRepo.fullName} looks like the best match for "${topic}" based on its strong adoption signals (${selectedRepo.stargazerCount} stars, ${selectedRepo.forkCount} forks) and its focused repository name/description.`,
  ]

  if (runnerUp) {
    parts.push(`It ranks ahead of alternatives like ${runnerUp.fullName} for this query.`)
  }

  if (fileSignals.length > 0) {
    parts.push(`The repository structure includes ${fileSignals.join(', ')}.`)
  } else {
    parts.push(`${getReadmeSignal(readme)}.`)
  }

  return parts.join(' ')
}

// Define Step 1
const fetchStep = createStep({
  id: 'fetch-list',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RepoObject)
  }),
  execute: async ({ inputData }) => {
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
    repos: z.array(RepoObject),
    selectedRepo: RepoObject,
  }),
  execute: async ({ inputData }) => {
    const rankedRepos = rankRepositories(inputData.topic, inputData.repos)
    const selectedRepo = rankedRepos[0]

    if (!selectedRepo) {
      throw new Error(`No repositories found for topic "${inputData.topic}".`)
    }

    return {
      repos: rankedRepos,
      selectedRepo,
    }
  },
})

const inspectStep = createStep({
  id: 'inspect-repo',
  inputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject),
    selectedRepo: RepoObject,
  }),
  outputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject),
    selectedRepo: RepoObject,
    files: z.array(RepoFileSchema),
    readme: ReadmeSchema,
  }),
  execute: async ({ inputData }) => {
    const [files, readme] = await Promise.all([
      listRepoFiles(inputData.selectedRepo.fullName),
      fetchReadme(inputData.selectedRepo.fullName),
    ])

    return {
      ...inputData,
      files,
      readme,
    }
  },
})

const summaryStep = createStep({
  id: 'summarize-choice',
  inputSchema: z.object({
    topic: z.string(),
    repos: z.array(RepoObject),
    selectedRepo: RepoObject,
    files: z.array(RepoFileSchema),
    readme: ReadmeSchema,
  }),
  outputSchema: z.object({
    repos: z.array(RepoObject),
    selected: z.string(),
    readme: ReadmeSchema
  }),
  execute: async ({ inputData }) => {
    return {
      repos: inputData.repos,
      selected: buildSelectionSummary(inputData),
      readme: inputData.readme
    }
  },
})

export const githubWorkflow = createWorkflow({
  id: 'github-crawler-flow',
  inputSchema: z.object({ topic: z.string() }),
  outputSchema: z.object({
    repos: z.array(RepoObject),
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
      repos: selectionData.repos,
      selectedRepo: selectionData.selectedRepo,
    }
  })
  .then(inspectStep)
  .then(summaryStep)
  .commit()
