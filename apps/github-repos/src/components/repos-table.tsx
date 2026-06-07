import { Table, Typography } from '@repo/ui'
import { Table as AntTable } from 'antd'
import { ForkOutlined, StarOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import { parseMD, type Repo, type RepoVm } from '@repo/utils'
import { useEffect, useState } from 'react'
import Loading from '../loading'

const columns: TableColumnsType<RepoVm> = [
  {
    title: 'Name',
    dataIndex: 'linkedName',
    key: 'linkedName',
    render: (_: any, record: RepoVm) => (
      <Typography variant="link" target="_blank" href={record.url}>
        {record.fullName}
      </Typography>
    ),
  },
  AntTable.EXPAND_COLUMN,
  {
    title: 'Forks',
    dataIndex: 'forkCount',
    key: 'forkCount',
    render: (_: string, record: RepoVm) => (
      <span>
        <ForkOutlined /> &nbsp;
        {record.forkCount}
      </span>
    ),
  },
  {
    title: 'Stars',
    dataIndex: 'stargazerCount',
    key: 'stargazerCount',
    render: (_: string, record: RepoVm) => (
      <span>
        <StarOutlined />
        &nbsp;
        {record.stargazerCount}
      </span>
    ),
  },
]

export const ReposTable = ({
  data,
  onSelectedRepos,
  isPending,
}: {
  data: Repo[]
  onSelectedRepos: (repos: RepoVm[]) => void
  isPending: boolean
}) => {
  const [dataSource, setDataSource] = useState<RepoVm[]>()
  const rowSelection: TableProps<RepoVm>['rowSelection'] = {
    onChange: (_: React.Key[], selectedRows: RepoVm[]) => {
      onSelectedRepos(selectedRows)
    },
  }

  useEffect(() => {
    if (!data) return 
    const transformDataSource = async () => {
      return await Promise.all(
        data?.map(async (repo) => ({
          ...repo,
          readme: await parseMD(repo.readme),
        })),
      )
    }
    transformDataSource().then((result) => setDataSource(result))
  }, [data])

  return (
    <>
      {' '}
      {isPending && <Loading />}
      {!isPending && (
        <Table
          testId="repos"
          columns={columns}
          data={dataSource}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          expandable={{
            expandedRowRender: (record) => <div>{record.readme}</div>,
          }}
        />
      )}
    </>
  )
}
