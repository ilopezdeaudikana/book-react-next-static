'use client'
import { ReposTable } from './repos-table'
import { SearchInput } from './search-input'
import { RepoApiData } from '../../types'
import { Flex, Typography, Collapse, Table } from '@repo/ui'
import {
  ChangeEvent,
  ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { parseMD, RepoVm } from '@repo/utils'
import { searchGithubRepos } from '../actions'
import { useRouter } from 'next/navigation'

export const Repos = ({
  data,
  queryParam,
}: {
  data: RepoApiData
  queryParam?: string
}) => {
  const initialQuery = queryParam ?? ''

  const [searchTerm, setSearchterm] = useState(initialQuery)
  const deferredSearch = useDeferredValue(searchTerm)
  const [result, setResult] = useState(data)
  const [verdict, setVerdict] = useState<ReactNode>()
  const [comparison, setComparison] = useState<ReactNode>()
  const [activeKey, openCollapsible] = useState<string[]>(['1'])

  const [, startTransition] = useTransition()

  const latestRequestId = useRef(0)
  const timeout = useRef(null)

  const router = useRouter()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchterm(event.target.value)
  }

  const rotateRepos = (repos: RepoVm[]) => {
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
        width: 120,
      },
      ...repos.map((item) => ({
        title: item.name,
        dataIndex: item.id,
        key: item.id,
      })),
    ]
    return { dataSource, columns }
  }

  const handleSelectedRepos = (repos: RepoVm[]) => {
    if (repos.length > 1) {
      const { columns, dataSource } = rotateRepos(repos)
      setComparison(
        <Table
          testId="repos-compare"
          columns={columns}
          data={dataSource}
          pagination={false}
        />,
      )
      openCollapsible(['2'])
    } else {
      openCollapsible(['1'])
      setComparison(undefined)
    }
  }

  const collapsableItems = [
    {
      key: '1',
      label: 'Recomended package',
      children: <div className="verdict">{verdict}</div>,
    },
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
    if (deferredSearch.trim().length < 4) return
    if (!deferredSearch) {
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
        const nextResult = await searchGithubRepos(deferredSearch)

        if (latestRequestId.current === requestId) {
          router.push(`?${deferredSearch}`, { scroll: false })
          setResult(nextResult)
        }
      }, 300)
    })
  }, [deferredSearch])

  useEffect(() => {
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Flex>

      {result.error ? (
        <Typography data-testid="error" variant="text" type="danger">
          Error! {result.error}
        </Typography>
      ) : (
        <>
          <Collapse
            key={activeKey[0]}
            defaultActiveKey={activeKey}
            items={collapsableItems}
          />

          <ReposTable
            key={deferredSearch}
            data={result.repos}
            onSelectedRepos={handleSelectedRepos}
          />
        </>
      )}
    </Flex>
  )
}
