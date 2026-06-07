import { Drawer as AntDrawer, type DrawerProps } from 'antd'
import type { ReactNode } from 'react'

export const Drawer = ({
  testId,
  children,
  ...restProps
}: {
  testId?: string
  children: ReactNode
} & DrawerProps) => {
  return (
    <AntDrawer data-testid={testId} {...restProps}>
      {children}
    </AntDrawer>
  )
}
