import { Repos } from './components/repos'
import { useGithubAgentData } from './hooks/useGithubData'
import { Flex, Typography } from '@repo/ui'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ReposView() {
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('query')

  const [query, setQuery] = useState<string>(() => {
    if (topic) return topic
    else return 'typescript'
  })

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
