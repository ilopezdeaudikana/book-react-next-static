import { z } from 'zod'

export const RepoObject = z.object({
  id: z.string(),
  name: z.string(),
  fullName: z.string(),
  url: z.string(),
  description: z.string().nullable().optional(),
  forkCount: z.number(),
  stargazerCount: z.number(),
  key: z.number()
})

export type Repo = z.infer<typeof RepoObject>
