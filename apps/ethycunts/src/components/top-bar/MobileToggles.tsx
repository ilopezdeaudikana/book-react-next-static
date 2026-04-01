import { IconButton, Button } from '@mui/material'
import { Link, Menu } from '@mui/icons-material'
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
    <IconButton aria-label="Toggle filters" size="small" onClick={onToggleFilters}>
      <Menu fontSize="small" />
    </IconButton>
    <IconButton
      aria-label="Toggle dependency navigation"
      size="small"
      onClick={onToggleDependencies}
      disabled={dependenciesDisabled}
    >
      <Link fontSize="small" />
    </IconButton>
    <Button aria-label="Clear selection" sx={{ textTransform: 'none' }} variant="outlined" size="small" onClick={onClearSelection}>
      Reset filters
    </Button>
  </div>
)
