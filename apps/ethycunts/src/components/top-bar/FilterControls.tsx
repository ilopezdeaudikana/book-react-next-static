import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useEffect, useState } from 'react'
import styles from './FilterControls.module.css'
import { DataStatus, LayoutMode } from '../../types/types'
import { titleCase } from '../../utils/strings'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useFiltersStore } from '../../store/useFiltersStore'
import { useMapStore } from '../../store/useMapStore'

export const FilterControls = () => {
  const [useOpen, setUseOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { allUses, allCategories, status } = useSystemsData()
  const layoutMode = useFiltersStore((state) => state.layoutMode)
  const setLayoutMode = useFiltersStore((state) => state.setLayoutMode)
  const selectedUses = useFiltersStore((state) => state.selectedUses)
  const selectedCategories = useFiltersStore((state) => state.selectedCategories)
  const setSelectedUses = useFiltersStore((state) => state.setSelectedUses)
  const setSelectedCategories = useFiltersStore((state) => state.setSelectedCategories)
  const setHasFilters = useFiltersStore((state) => state.setHasFilters)
  const resetFilters = useFiltersStore((state) => state.resetFilters)
  const clearSelection = useMapStore((state) => state.clearSelection)

  useEffect(() => setHasFilters(),[])

  return (
    <>
      <div className={styles.topBarSection}>
        <h2>Layout</h2>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={layoutMode}
          className={styles.layoutToggle}
          disabled={status === DataStatus.Error}
          onChange={(_, value) => {
            if (value) setLayoutMode(value)
          }}
        >
          <ToggleButton value={LayoutMode.SystemType}>
            <span className={styles.toggleLabel}>System type</span>
          </ToggleButton>
          <ToggleButton value={LayoutMode.DataUse}>
            <span className={styles.toggleLabel}>Data use</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={styles.topBarSection}>
        <div className={styles.controlHeader}>
          <h2>Filter by data use</h2>
        </div>
        <FormControl size="small" fullWidth className={styles.selectControl}>
          <InputLabel id="data-use-label">Data use</InputLabel>
          <Select
            labelId="data-use-label"
            multiple
            value={selectedUses}
            label="Data use"
            disabled={status === DataStatus.Error}
            onChange={(event) => {
              clearSelection()
              setSelectedUses(typeof event.target.value === 'string' ? [] : event.target.value)
              setHasFilters()
            }}
            open={useOpen}
            onOpen={() => setUseOpen(true)}
            onClose={() => setUseOpen(false)}
            onChangeCapture={() => setUseOpen(false)}
            renderValue={(selected) =>
              selected.length === 0 ? 'All' : selected.map((value) => titleCase(value)).join(', ')
            }
          >
            {allUses.map((use) => (
              <MenuItem key={use} value={use}>
                {titleCase(use)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.topBarSection}>
        <h2>Filter by data categories</h2>
        <FormControl size="small" fullWidth className={styles.selectControl}>
          <InputLabel id="data-category-label">Data category</InputLabel>
          <Select
            labelId="data-category-label"
            multiple
            value={selectedCategories}
            label="Data category"
            disabled={status === DataStatus.Error}
            onChange={(event) => {
              clearSelection()
              setSelectedCategories(
                typeof event.target.value === 'string' ? [] : event.target.value,
              )
              setHasFilters()
            }}
            open={categoryOpen}
            onOpen={() => setCategoryOpen(true)}
            onClose={() => setCategoryOpen(false)}
            onChangeCapture={() => setCategoryOpen(false)}
            renderValue={(selected) =>
              selected.length === 0
                ? 'All'
                : selected.map((value) => titleCase(value)).join(', ')
            }
          >
            {allCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {titleCase(category)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.resetSection}>
        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} disabled={status === DataStatus.Error} onClick={() => {
          resetFilters()
          setHasFilters()
        }}>
          Reset filters
        </Button>
      </div>
    </>
  )
}
