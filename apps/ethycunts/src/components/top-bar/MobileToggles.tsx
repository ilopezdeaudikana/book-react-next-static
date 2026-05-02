import { Button } from '@repo/ui'
import { MenuOutlined } from '@ant-design/icons'
import styles from './MobileToggles.module.css'

type MobileTogglesProps = {
  onToggleFilters: () => void
}

export const MobileToggles = ({
  onToggleFilters
}: MobileTogglesProps) => (
  <div className={styles.mobileToggles}>
    <Button aria-label="Toggle filters" onClick={onToggleFilters}>
      <MenuOutlined />
    </Button>
  </div>
)
