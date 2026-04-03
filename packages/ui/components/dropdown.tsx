import { Dropdown as AntDropdown } from 'antd'
import type { ItemType } from 'antd/es/menu/interface'
import type { ReactNode } from 'react'

export const Dropdown = ({items, children}: {items: ItemType[], children: ReactNode}) => {
  return (<AntDropdown menu={{ items }} trigger={['click']}>
    {children}
  </AntDropdown>)
}