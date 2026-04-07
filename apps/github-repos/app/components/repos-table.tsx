'use client'
import { Table, Typography } from '@repo/ui'
import { Column } from '../../types'
import { ForkOutlined, StarOutlined } from '@ant-design/icons'
import { Repo } from '@repo/utils'

const columns: Column[] = [
  {
    title: 'Name',
    dataIndex: 'linkedName',
    key: 'linkedName',
    render: (_: string, record: Repo) => (
      <Typography variant="link" target='_blank' href={record.url}>
        {record.fullName}
      </Typography>
    ),
  },
  {
    title: 'Forks',
    dataIndex: 'forkCount',
    key: 'forkCount',
    render: (_: string, record: Repo) => (
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
    render: (_: string, record: Repo) => (
      <span>
        <StarOutlined />
        &nbsp;
        {record.stargazerCount}
      </span>
    ),
  },
]


export const ReposTable = ({ data }: { data: Repo[]}) => {
  return (
    <>
      <Table testId='repos' columns={columns} data={data} />
    </>
  )
}
