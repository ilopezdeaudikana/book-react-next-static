import { z } from 'zod'

export const RepoObject = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  forkCount: z.number(),
  stargazerCount: z.number(),
  key: z.number()
})

export type Repo = z.infer<typeof RepoObject>
