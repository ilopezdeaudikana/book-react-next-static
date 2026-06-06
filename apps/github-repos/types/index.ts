import { Repo } from '@repo/utils'

export interface RepoApiData {
  error: string | null,
  repos: Repo[],
  verdict: string
}
