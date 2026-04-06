import { ReposTable } from './components/repos-table'
import { SearchInput } from './components/search-input'
import { getGithubAgentData } from './lib/getGithubData'
import { RepoApiData } from '../types'
import { Flex } from '@repo/ui'

export default async function Repos({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {

  const fetchedParams = await searchParams
  const query = fetchedParams.query || 'typescript'

  console.log(query)
  const result: RepoApiData = await getGithubAgentData(query)

  if (!result || result?.error) return <p data-testid='error'>Error! {result?.error}</p>


  return (
    <Flex gap="2rem" vertical>
      <SearchInput />
      <p>{result.selected}</p>
      <ReposTable data={result.repos} />
    </Flex>
  )
}
