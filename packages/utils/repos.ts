import type { JSX } from 'react'
import { z } from 'zod'

export const RichRepoObject = z.object({
  // Basic Metadata
  id: z.number(), // Note: GitHub IDs are integers, not strings
  name: z.string(),
  full_name: z.string(),
  html_url: z.string(),
  description: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(),
  language: z.string().nullable().optional(),

  // Maintenance & Health Signals
  archived: z.boolean(),
  disabled: z.boolean(), 
  is_template: z.boolean(),
  has_issues: z.boolean(),
  has_wiki: z.boolean(),
  has_pages: z.boolean(),

  // Timestamps (Crucial for verifying updates)
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),

  // Granular Popularity & Engagement Metrics
  stargazers_count: z.number(),
  watchers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),

  // Legal & License Info
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),// e.g., "MIT", "Apache-2.0"
    url: z.string().nullable(),
  }).nullable().optional(),

  // Owner/Organization Profile details
  owner: z.object({
    login: z.string(),
    id: z.number(),
    avatar_url: z.url(),
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
  updatedAt: z.string(),
  pushedAt: z.string(),
  archived: z.boolean(),
  disabled: z.boolean(),
  hasIssues: z.boolean(),
  hasWiki: z.boolean(),
  hasPages: z.boolean(),
  readme: z.string().optional()
})

export type Repo = z.infer<typeof RepoObject>
export type ApiRepo = z.infer<typeof RichRepoObject>
export type RepoVm = Omit<Repo, 'readme'> & { readme: string | JSX.Element | JSX.Element[] }
