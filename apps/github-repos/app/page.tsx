import { Repos } from './components/repos'

import { getGithubAgentData } from './lib/getGithubData'
import { RepoApiData } from '../types'
import { Flex, Typography } from '@repo/ui'

export default async function ReposPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  try {
    const fetchedParams = await searchParams;
    const query = fetchedParams?.query || 'typescript'

    const result: RepoApiData = await getGithubAgentData(query)

    return (
      <Flex gap="1rem" vertical style={{ width: '90%' }}>
        <Repos data={result} queryParam={query} />
      </Flex>
    );
  } catch (error) {
    return (
      <Flex gap="1rem" vertical>
        <Typography data-testid="error" variant="text" type="danger">
          Error! {error}
        </Typography>
      </Flex>
    );
  }
}
