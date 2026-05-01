import type { SystemWithMeta } from '../../types/types'
import styles from './DependencyPanel.module.css'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from '@repo/ui'

type DependencyPanelProps = {
  onDependencyClick: (key: string) => void
  dependencies: (SystemWithMeta | { fidesKey: string; name: string })[]
}

export const DependencyPanel = ({
  dependencies,
  onDependencyClick
}: DependencyPanelProps) => {

  const handleSelect = (key: string) => {
    onDependencyClick(key)
  }

  const items = dependencies.map(item => ({
    key: item.fidesKey, label: (
      <p onClick={() => handleSelect(item.fidesKey)}>{item.name}</p>)
  }))

  return (
    <nav className={styles.panel}>
      <div className={styles.panelList}>
        <Dropdown items={items}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {dependencies.length > 0
                ? `System Dependencies (${dependencies.length})`
                : 'No dependencies'}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </nav>
  )
}
