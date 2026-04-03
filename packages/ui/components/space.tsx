import { Space as AntSpace } from 'antd'
import type { ReactNode } from 'react'

export const Space = ({ vertical, size, children }: { vertical?: boolean, size?: number, children: ReactNode}) => {
  return <AntSpace vertical={vertical} size={size}>
    {children}
  </AntSpace>
}