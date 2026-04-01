import { useState } from 'react'
import Button from '@mui/material/Button'
import { Menu, MenuItem } from '@mui/material'
import type { SystemWithMeta } from '../../types/types'
import styles from './DependencyPanel.module.css'

type DependencyPanelProps = {
  onDependencyClick: (key: string) => void
  dependencies: (SystemWithMeta | { fidesKey: string; name: string; })[]
}

export const DependencyPanel = ({
  dependencies,
  onDependencyClick
}: DependencyPanelProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (key: string) => {
    onDependencyClick(key)
    setAnchorEl(null)
  }

  return (
    <nav className={styles.panel}>
      <h2 className={styles.panelTitle}>Selected system dependencies</h2>
      <div className={styles.panelList}>
        <Button
          size="medium"
          variant="outlined"
          color="inherit"
          sx={{ color: 'var(--highlight)', textTransform: 'none' }}
          onClick={handleOpen}
          disabled={dependencies.length === 0}
          aria-controls={isOpen ? 'dependency-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          {dependencies.length > 0
            ? `Dependencies (${dependencies.length})`
            : 'No dependencies'}
        </Button>
        <Menu
          id="dependency-menu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          slotProps={{
            list: { 'aria-label': 'Selected system dependencies' }
          }}
        >
          {dependencies.map((dependency) => (
            <MenuItem
              key={dependency.fidesKey}
              onClick={() => handleSelect(dependency.fidesKey)}
            >
              {dependency.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </nav>
  )
}
