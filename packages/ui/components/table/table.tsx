import { Table as AntTable } from 'antd'
import type { ColumnType } from 'antd/es/table'

export const Table = <T,>({ testId, columns, data }: { testId: string, columns: ColumnType<T>[], data: T[] }) => {
  return <AntTable data-testid={testId} columns={columns} dataSource={data} />
}