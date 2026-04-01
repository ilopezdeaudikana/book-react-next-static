import {
  Button,
  Select,
  Radio,
  type RadioChangeEvent,
} from 'antd'
import { useEffect } from 'react'
import styles from './FilterControls.module.css'
import { DataStatus, LayoutMode } from '../../types/types'
import { titleCase } from '../../utils/strings'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useFiltersStore } from '../../store/useFiltersStore'
import { useMapStore } from '../../store/useMapStore'

export const FilterControls = () => {

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

  const layoutItems = [{
    value: LayoutMode.SystemType,
    label: 'System type'
  }, {
    value: LayoutMode.DataUse,
    label: 'Data use'
  }]

  const handleChangeLayout = (e: RadioChangeEvent) => {
    setLayoutMode(e.target.value as LayoutMode)
  }

  const dataUseOptions = allUses.map((use) => ({
    label: titleCase(use), value: use
  }))

  const categoryOptions = allCategories.map((cat) => ({
    label: titleCase(cat), value: cat
  }))

  useEffect(() => setHasFilters(), [])

  return (
    <>
      <div className={styles.topBarSection}>
        <h2>Layout</h2>
        <Radio.Group 
          block 
          onChange={handleChangeLayout} 
          options={layoutItems} 
          defaultValue={layoutMode} 
          optionType="button" 
          disabled={status === DataStatus.Error}
        />
      </div>
      <div className={styles.topBarSection}>
        <h2 id="data-use-label">Data use</h2>
        <Select
          mode="multiple"
          allowClear
          className={styles.selectControl}
          value={selectedUses}
          disabled={status === DataStatus.Error}
          onChange={(event) => {
            clearSelection()
            setSelectedUses(typeof event === 'string' ? [] : event)
            setHasFilters()
          }}
          options={dataUseOptions}
        />
      </div>

      <div className={styles.topBarSection}>
        <h2 id="data-category-label">Data category</h2>
        <Select
          mode="multiple"
          value={selectedCategories}
          className={styles.selectControl}
          disabled={status === DataStatus.Error}
          onChange={(event) => {
            clearSelection()
            setSelectedCategories(
              typeof event === 'string' ? [] : event,
            )
            setHasFilters()
          }}
          options={categoryOptions}
        />

      </div>

      <div className={styles.resetSection}>
        <Button variant="outlined" size="small" disabled={status === DataStatus.Error} onClick={() => {
          resetFilters()
          setHasFilters()
        }}>
          Reset filters
        </Button>
      </div>
    </>
  )
}
