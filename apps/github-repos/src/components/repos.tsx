import { ReposTable } from './repos-table'
import { SearchInput } from './search-input'
import type { RepoApiData } from '../../types'
import { Flex, Typography } from '@repo/ui'
import {
  type ChangeEvent,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { type RepoVm } from '@repo/utils'
import { useLocation, useNavigate } from 'react-router'
import { Suggestions } from './suggestions'

export const Repos = ({
  data,
  onQueryChange,
  query,
  isPending,
}: {
  data?: RepoApiData
  onQueryChange: (query: string) => void
  query?: string
  isPending: boolean
}) => {
  const [searchTerm, setSearchterm] = useState<string>()
  const [result, setResult] = useState<RepoApiData>()
  const [selectedRepos, setSelectedRepos] = useState<RepoVm[]>()

  const [, startTransition] = useTransition()

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string | undefined>(query)
  const deferredSearch = useDeferredValue(debouncedSearchTerm)

  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchterm(event.target.value)
    timeout.current = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearchTerm(event.target.value)
      })
    }, 300)
  }

  const handleSelectedRepos = (repos: RepoVm[]) => {
    setSelectedRepos(repos)
  }

  useEffect(() => {
    if (!deferredSearch) {
      setResult({
        repos: [],
        error: 'Please enter a search topic.',
        verdict: '',
      })
      return
    }
    if (deferredSearch.trim().length < 4) return
    onQueryChange(deferredSearch)
    setSelectedRepos(undefined)
    setResult({
      repos: [],
      error: '',
      verdict: '',
    })
    navigate(`${location.pathname}?query=${deferredSearch}`)
  }, [deferredSearch])

  useEffect(() => {
    if (query) setSearchterm(query)
    if (!data) return
    setResult(data)

    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [data])

  return (
    <Flex gap="1rem" vertical>
      <Flex vertical style={{ marginTop: '1rem' }}>
        <label htmlFor="searchInput">
          <Typography variant="text">Search for a package</Typography>
        </label>
        <SearchInput
          id="searchInput"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Flex>

      {result?.error ? (
        <Typography data-testid="error" variant="text" type="danger">
          Error! {result?.error}
        </Typography>
      ) : (
        <>
          <Suggestions repos={selectedRepos} verdict={result?.verdict} />

          <ReposTable
            key={deferredSearch}
            data={result?.repos ?? []}
            onSelectedRepos={handleSelectedRepos}
            isPending={isPending}
          />
        </>
      )}
    </Flex>
  )
}
