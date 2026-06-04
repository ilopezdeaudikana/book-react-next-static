import type { ColumnType } from 'antd/es/table'
import { Table as AntTable, type TableProps } from 'antd'

export const Table = <T extends object,>({ 
  testId, 
  columns, 
  data, 
  ...restProps
}: { 
  testId: string; 
  columns: ColumnType<T>[]
  data: T[]
} & TableProps<T>) => { 
  
  return (
    <AntTable<T> 
      data-testid={testId} 
      columns={columns} 
      dataSource={data} 
      {...restProps}
    />
  );
};