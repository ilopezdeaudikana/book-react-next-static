import { Button } from 'antd'
import { LinkOutlined, MenuOutlined } from '@ant-design/icons'
import styles from './MobileToggles.module.css'

type MobileTogglesProps = {
  onToggleFilters: () => void
  onToggleDependencies: () => void
  dependenciesDisabled: boolean
  onClearSelection: () => void
}

export const MobileToggles = ({
  onToggleFilters,
  onToggleDependencies,
  dependenciesDisabled,
  onClearSelection,
}: MobileTogglesProps) => (
  <div className={styles.mobileToggles}>
    <Button aria-label="Toggle filters" size="small" onClick={onToggleFilters}>
      <MenuOutlined />
    </Button>
    <Button
      aria-label="Toggle dependency navigation"
      size="small"
      onClick={onToggleDependencies}
      disabled={dependenciesDisabled}
    >
      <LinkOutlined />
    </Button>
    <Button aria-label="Clear selection" variant="outlined" size="small" onClick={onClearSelection}>
      Reset filters
    </Button>
  </div>
)
