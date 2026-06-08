import { Collapse, Table } from '@repo/ui'
import { type ReactNode, useEffect, useState } from 'react'
import { parseMD, type RepoVm } from '@repo/utils'
import type { CollapseProps } from 'antd'

export const Suggestions = ({
  repos,
  verdict,
}: {
  repos?: RepoVm[]
  verdict?: string
}) => {
  const [parsedVerdict, setParsedVerdict] = useState<ReactNode>()
  const [comparison, setComparison] = useState<ReactNode>()
  const [activeKey, setActiveKey] = useState<string[] | undefined>()

  const rotateRepos = (repos: RepoVm[]) => {
    const stats = [
      { key: 'forkCount', label: 'Forks' },
      { key: 'stargazerCount', label: 'Stars' },
      { key: 'watchersCount', label: 'Watchers' },
      { key: 'openIssues', label: 'Issues' },
      { key: 'updatedAt', label: 'Last updated' },
    ]

    const dataSource = stats.map((prop) => {
      const row: Record<string, any> = {
        key: prop.key,
        propertyLabel: prop.label,
      }

      repos.forEach((item) => {
        row[item.id] = item[prop.key as keyof RepoVm]
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

  const collapsableItems = [
    {
      key: '1',
      label: 'Recomended package',
      children: <div className="verdict">{parsedVerdict}</div>,
    },
    comparison
      ? {
          key: '2',
          label: 'Comparison',
          children: (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {comparison}
            </div>
          ),
        }
      : undefined,
  ].filter(Boolean) as CollapseProps['items']

  useEffect(() => {
    if (verdict) {
      parseMD(verdict).then((parsed) => {
        setParsedVerdict(parsed)
      })
      setActiveKey(['1'])
    }
    if (repos && repos?.length > 1) {
      const { columns, dataSource } = rotateRepos(repos)
      setComparison(
        <Table
          testId="repos-compare"
          columns={columns}
          data={dataSource}
          pagination={false}
        />,
      )
      setActiveKey(['2'])
    } else {
      setComparison(undefined)
    }
    if(!repos && !verdict) setActiveKey(undefined)
  }, [repos, verdict])

  return (
    <>
      {collapsableItems && (
        <Collapse
          key={activeKey?.[0]}
          defaultActiveKey={activeKey}
          items={collapsableItems}
        />
      )}
    </>
  )
}
