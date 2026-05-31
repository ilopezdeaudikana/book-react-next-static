'use server'

import { getGithubAgentData } from './lib/getGithubData'

export async function searchGithubRepos(query: string) {
  return getGithubAgentData(query)
}
