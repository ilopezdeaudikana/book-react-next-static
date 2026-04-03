import { ReposTable } from './components/repos-table'
import { SearchInput } from './components/search-input'
import { getGithubData } from './lib/getGithubData'
import { RepoApiData } from '../types'
import { Flex } from '@repo/ui'

export default async function Repos({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {

  const fetchedParams = await searchParams
  const query = fetchedParams.query || '?query=react'

  const { repos, error }: RepoApiData = await getGithubData(query)

  if (error) return <p data-testid='error'>Error! {error}</p>

  return (
    <Flex gap="2rem" vertical>
      <SearchInput />
      <ReposTable data={repos} />
    </Flex>
  )
}
