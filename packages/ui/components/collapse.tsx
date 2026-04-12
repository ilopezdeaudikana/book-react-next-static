import { Collapse as AntCollapse, type CollapseProps as AntCollapseProps } from 'antd'

export interface CollapseProps {
  defaultActiveKey: string[]
  onChange?: () => void
  items: AntCollapseProps['items']
}

export const Collapse = ({
  defaultActiveKey,
  onChange,
  items 
}: CollapseProps) => {
  return <AntCollapse
    defaultActiveKey={defaultActiveKey}
    onChange={onChange}
    items={items}
  />
}

