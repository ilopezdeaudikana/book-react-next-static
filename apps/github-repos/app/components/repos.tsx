'use client'
import { ReposTable } from './repos-table'
import { SearchInput } from './search-input'
import { RepoApiData } from '../../types'
import { Flex, Typography, Collapse, Table } from '@repo/ui'
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
import { Repo } from '@repo/utils'

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
  const [verdict, setVerdict] = useState<ReactNode>()
  const [comparison, setComparison] = useState<ReactNode>()
  const [activeKey, openCollapsible] = useState<string[]>(['1'])
  const [, startTransition] = useTransition()
  const latestRequestId = useRef(0)
  const timeout = useRef(null)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim())
  }

  const parseMD = async (content?: string) => {
    if (!content) return ''
    const htmlString = await marked.parse(content)
    const cleanHtml = DOMPurify.sanitize(htmlString)
    return parse(cleanHtml)
  }

  const rotateRepos = (repos: Repo[]) => {
    const stats = [
      { key: 'forkCount', label: 'Forks' },
      { key: 'stargazerCount', label: 'Stars' },
      { key: 'watchersCount', label: 'Watchers' },
      { key: 'openIssues', label: 'Issues' },
      { key: 'updatedAt', label: 'Last updated' },
    ]

    const dataSource = stats.map((prop) => {
      const row = { key: prop.key, propertyLabel: prop.label }

      repos.forEach((item) => {
        row[item.id] = item[prop.key]
      })

      return row
    })

    const columns = [
      {
        title: 'Features',
        dataIndex: 'propertyLabel',
        key: 'propertyLabel',
        width: 80
      },
      ...repos.map((item) => ({
        title: item.name,
        dataIndex: item.id,
        key: item.id
      })),
    ]
    return { dataSource, columns}
  }

  const handleSelectedRepos = (repos: Repo[]) => {
    if (repos.length > 1) {
      const { columns, dataSource } = rotateRepos(repos)
      setComparison(
        <Table testId="repos-compare" columns={columns} data={dataSource} pagination={false}/>,
      )
      openCollapsible(['3'])
    }
  }

  const collapsableItems = [
    {
      key: '1',
      label: 'Recomended package',
      children: <div className="verdict">{verdict}</div>,
    },
    readme
      ? {
          key: '2',
          label: 'Readme file',
          children: (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {readme}
            </div>
          ),
        }
      : undefined,
    comparison
      ? {
          key: '3',
          label: 'Comparison',
          children: (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {comparison}
            </div>
          ),
        }
      : undefined,
  ].filter(Boolean)

  useEffect(() => {
    if (deferredQuery.length < 4) return
    if (!deferredQuery) {
      setResult({
        repos: [],
        error: 'Please enter a search topic.',
        verdict: '',
      })
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
          parseMD(nextResult.readme).then((result) => {
            setReadme(result)
          })
        }
      }, 300)
    })
  }, [deferredQuery])

  useEffect(() => {
    if (data.readme) {
      parseMD(data.readme).then((result) => {
        setReadme(result)
      })
    }
    if (data.verdict) {
      parseMD(data.verdict).then((result) => {
        setVerdict(result)
      })
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  return (
    <Flex gap="1rem" vertical>
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
          <Collapse activeKey={activeKey} items={collapsableItems} />

          <ReposTable
            data={result.repos}
            onSelectedRepos={handleSelectedRepos}
          />
        </>
      )}
    </Flex>
  )
}
