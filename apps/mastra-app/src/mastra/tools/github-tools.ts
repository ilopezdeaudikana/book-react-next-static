import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

const EXCLUDED_FILES = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.ds_store']

// TOOL 1: Search by Topic
export const searchTool = createTool({
  id: 'search-repos',
  description: 'Finds repositories by topic.',
  inputSchema: z.object({ topic: z.string() }),
  execute: async ({ topic }) => {
    const res = await fetch(`https://api.github.com/search/repositories?q=topic:${topic}&sort=stars`)
    const data = await res.json()
    return data.items.slice(0, 5).map((r: any) => ({ name: r.full_name, desc: r.description }))
  },
})

// TOOL 2: Filtered Crawler
export const crawlerTool = createTool({
  id: 'crawl-repo',
  description: 'Lists repo files, excluding lock files.',
  inputSchema: z.object({ fullName: z.string() }),
  execute: async ({ fullName }) => {
    const res = await fetch(`https://api.github.com/repos/${fullName}/contents/`)
    const files = await res.json()
    return files
      .filter((f: any) => !EXCLUDED_FILES.includes(f.name.toLowerCase()))
      .map((f: any) => ({ name: f.name, path: f.path }))
  },
})