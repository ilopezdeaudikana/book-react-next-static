import { Repos } from './components/repos'

import { useGithubAgentData } from './hooks/useGithubData'

import { Flex, Typography } from '@repo/ui'
import { useState } from 'react'

export default function ReposView() {
  const [query, setQuery] = useState<string>('typescript')

  const { data, error, isPending } = useGithubAgentData(query)

  return (
    <>
      <Flex gap="1rem" vertical style={{ width: '90%' }}>
        <Repos
          data={data}
          onQueryChange={setQuery}
          query={query}
          isPending={isPending}
        />
      </Flex>

      {error && (
        <Flex gap="1rem" vertical>
          <Typography data-testid="error" variant="text" type="danger">
            Error! {error.message}
          </Typography>
        </Flex>
      )}
    </>
  )
}
