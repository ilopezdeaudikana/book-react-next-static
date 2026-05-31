'use client'
import { ReposTable } from './repos-table'
import { SearchInput } from './search-input'
import { RepoApiData } from '../../types'
import { Flex, Typography, Collapse } from '@repo/ui'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import {
  ChangeEvent,
  ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { searchGithubRepos } from '../actions'

export const Repos = ({
  data,
  queryParam,
}: {
  data: RepoApiData
  queryParam?: string
}) => {
  const initialQuery = queryParam ?? ''
  const [query, setQuery] = useState(initialQuery)
  const deferredQuery = useDeferredValue(query)
  const [result, setResult] = useState(data)
  const [readme, setReadme] = useState<ReactNode>()
  const [, startTransition] = useTransition()
  const latestRequestId = useRef(0)
  const timeout = useRef(null)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim())
  }

  const parseReadme = async (content: string) => {
    const htmlString = await marked.parse(content)
    const cleanHtml = DOMPurify.sanitize(htmlString)
    return parse(cleanHtml)
  }

  const collapsableItems = [
    {
      key: '1',
      label: 'Recomended package',
      children: <Typography variant="text">{result.selected}</Typography>,
    },
    readme
      ? {
          key: '2',
          label: 'Readme file',
          children: (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>{readme}</div>
          ),
        }
      : undefined,
  ].filter(Boolean)

  useEffect(() => {
    if (deferredQuery.length < 4) return
    if (!deferredQuery) {
      setResult({ repos: [], error: 'Please enter a search topic.' })
      return
    }

    const requestId = latestRequestId.current + 1
    latestRequestId.current = requestId
    if (timeout.current) clearTimeout(timeout.current)
    startTransition(() => {
      timeout.current = setTimeout(async () => {
        const nextResult = await searchGithubRepos(deferredQuery)

        if (latestRequestId.current === requestId) {
          setResult(nextResult)
          parseReadme(nextResult.readme?.content).then((result) => {
            setReadme(result)
          })
        }
      }, 300)
    })
  }, [deferredQuery])

  useEffect(() => {
    if (data.readme?.content) {
      parseReadme(data.readme?.content).then((result) => {
        setReadme(result)
      })
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  return (
    <Flex gap="1rem" vertical style={{ width: '90%' }}>
      <Flex vertical style={{ marginTop: '1rem' }}>
        <label htmlFor="searchInput">
          <Typography variant="text">Search for a package</Typography>
        </label>
        <SearchInput
          id="searchInput"
          value={query}
          onChange={handleSearchChange}
          onSearch={() => undefined}
        />
      </Flex>

      {result.error ? (
        <Typography data-testid="error" variant="text" type="danger">
          Error! {result.error}
        </Typography>
      ) : (
        <>
          <Collapse defaultActiveKey={['1']} items={collapsableItems} />

          <ReposTable data={result.repos} />
        </>
      )}
    </Flex>
  )
}
