import { Repos } from './components/repos'
import { useGithubAgentData } from './hooks/useGithubData'
import { Flex, Typography } from '@repo/ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ReposView() {
  const [query, setQuery] = useState<string>()

  const { data, error, isPending } = useGithubAgentData(query)

  const [searchParams, _] = useSearchParams()

  useEffect(() => {
    const topic = searchParams.get('query')
    if (topic) setQuery(topic)
    else setQuery('typescript')
  }, [searchParams])

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
