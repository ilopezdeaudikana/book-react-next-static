import { z } from 'zod'

export const RichRepoObject = z.object({
  // Basic Metadata
  id: z.number(), // Note: GitHub IDs are integers, not strings
  name: z.string(),
  full_name: z.string(),
  html_url: z.string(),
  description: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(), // Link to docs/site
  language: z.string().nullable().optional(), // Main language (e.g., "TypeScript")

  // Maintenance & Health Signals
  archived: z.boolean(),   // true if the project is frozen/read-only
  disabled: z.boolean(),   // true if the repo is suspended
  is_template: z.boolean(),
  has_issues: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(), // Has a GitHub Pages site attached

  // Timestamps (Crucial for verifying updates)
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(), // Metadata updates
  pushed_at: z.iso.datetime(),  // Last actual code commit (the pulse check)

  // Granular Popularity & Engagement Metrics
  stargazers_count: z.number(),
  watchers_count: z.number(),      // People explicitly subscribing to notifications
  forks_count: z.number(),
  open_issues_count: z.number(),   // Total unclosed issues + pull requests

  // Legal & License Info
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),          // e.g., "MIT", "Apache-2.0"
    url: z.string().nullable(),
  }).nullable().optional(),

  // Owner/Organization Profile details
  owner: z.object({
    login: z.string(),            // Username or Org name
    id: z.number(),
    avatar_url: z.string().url(),
    type: z.enum(['User', 'Organization']),
  }),
})


export const RepoObject = z.object({
  id: z.string(),
  key: z.number(),
  name: z.string(),
  fullName: z.string(),
  url: z.string(),
  description: z.string().optional(),
  forkCount: z.number(),
  stargazerCount: z.number(),
  watchersCount: z.number(),
  openIssues: z.number(),
  updatedAt: z.iso.datetime(),
  pushedAt: z.iso.datetime(),
  archived: z.boolean(),
  disabled: z.boolean(),
  hasIssues: z.boolean(),
  hasWiki: z.boolean(),
  hasPages: z.boolean()
})

export type Repo = z.infer<typeof RepoObject>
export type ApiRepo = z.infer<typeof RichRepoObject>
