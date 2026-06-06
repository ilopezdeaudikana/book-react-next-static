import { Drawer as AntDrawer, DrawerProps } from 'antd'
import { ReactNode } from 'react'

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
