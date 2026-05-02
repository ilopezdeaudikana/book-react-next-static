import { Select, Radio, Flex } from '@repo/ui'
import { useEffect } from 'react'
import styles from './FilterControls.module.css'
import { DataStatus, LayoutMode, MapMode } from '../../types/types'
import { titleCase } from '../../utils/strings'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useFiltersStore } from '../../store/useFiltersStore'
import { useMapStore } from '../../store/useMapStore'
import { DependencyPanel } from '../dependency-panel/DependencyPanel'

export const FilterControls = () => {
  const { allUses, allCategories, status } = useSystemsData()
  const layoutMode = useFiltersStore((state) => state.layoutMode)
  const setLayoutMode = useFiltersStore((state) => state.setLayoutMode)

  const mapMode = useFiltersStore((state) => state.mapMode)
  const setMapMode = useFiltersStore((state) => state.setMapMode)

  const selectedUses = useFiltersStore((state) => state.selectedUses)
  const selectedCategories = useFiltersStore(
    (state) => state.selectedCategories,
  )
  const setSelectedUses = useFiltersStore((state) => state.setSelectedUses)
  const setSelectedCategories = useFiltersStore(
    (state) => state.setSelectedCategories,
  )
  const setHasFilters = useFiltersStore((state) => state.setHasFilters)
  const clearSelection = useMapStore((state) => state.clearSelection)
  const activeSystem = useMapStore((state) => state.activeSystem)
  const dependencies = useMapStore((state) => state.dependencies)

  const cardRefs = useMapStore((state) => state.cardRefs)

  const handleDependencyClick = (key: string) => {
    const node = cardRefs.get(key)
    if (!node) return
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  const layoutItems = [
    {
      value: LayoutMode.SystemType,
      label: 'System type',
    },
    {
      value: LayoutMode.DataUse,
      label: 'Data use',
    },
  ]

  const modeItems = [
    {
      value: MapMode.ColourCode,
      label: 'ColourCode',
    },
    {
      value: MapMode.D3,
      label: 'D3 visualization',
    },
  ]

  const dataUseOptions = allUses.map((use) => ({
    label: titleCase(use),
    value: use,
  }))

  const categoryOptions = allCategories.map((cat) => ({
    label: titleCase(cat),
    value: cat,
  }))

  useEffect(() => setHasFilters(), [])

  return (
    <Flex vertical style={{ width: '100%' }}>
      <div className={styles.mapMode}>
        <h2>Mode</h2>
        <Radio
          onChange={(e) => setMapMode(e.target.value as MapMode)}
          options={modeItems}
          value={mapMode}
          disabled={status === DataStatus.Error}
        />
      </div>
      <Flex gap="2rem">
        <div className={styles.topBarSection}>
          <h2>Layout</h2>
          <Radio
            onChange={(e) => setLayoutMode(e.target.value as LayoutMode)}
            options={layoutItems}
            value={layoutMode}
            disabled={status === DataStatus.Error}
          />
        </div>
        {mapMode === MapMode.ColourCode && (
          <>
            <div className={styles.topBarSection}>
              <h2 id="data-use-label">Data use</h2>
              <Select
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
                value={selectedCategories}
                className={styles.selectControl}
                disabled={status === DataStatus.Error}
                onChange={(event) => {
                  clearSelection()
                  setSelectedCategories(typeof event === 'string' ? [] : event)
                  setHasFilters()
                }}
                options={categoryOptions}
              />
            </div>

          </>
        )}
        {activeSystem && (
          <div className={styles.resetSection}>
            <DependencyPanel
              dependencies={dependencies}
              onDependencyClick={handleDependencyClick}
            />
          </div>
        )}
      </Flex>
    </Flex>
  )
}
