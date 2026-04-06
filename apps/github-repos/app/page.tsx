import { ReposTable } from './components/repos-table'
import { SearchInput } from './components/search-input'
import { getGithubRestData, getGithubAgentData } from './lib/getGithubData'
import { RepoApiData } from '../types'
import { Flex } from '@repo/ui'

export default async function Repos({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {

  const fetchedParams = await searchParams
  const query = fetchedParams.query || '?query=react'

  const [{ repos, error }, fromAgent]: [RepoApiData, any] = await Promise.all([getGithubRestData(query), getGithubAgentData('typescript')])

  console.log(fromAgent)
  if (error || fromAgent?.error) return <p data-testid='error'>Error! {error || fromAgent.error}</p>

  return (
    <Flex gap="2rem" vertical>
      <SearchInput />
       <Flex gap="2rem">
        <ReposTable data={repos} />
        <p>{fromAgent.selected}</p>
        <ReposTable data={fromAgent.repos} />
      </Flex>
    </Flex>
  )
}
