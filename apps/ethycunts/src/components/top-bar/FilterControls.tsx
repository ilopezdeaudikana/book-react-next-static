import { Select, Radio, Flex } from '@repo/ui'
import { useEffect } from 'react'
import { LayoutMode, MapMode } from '../../types/types'
import { titleCase } from '../../utils/strings'
import { useSystemsDerivedData } from '../../hooks/useSystemsDerivedData'
import { useFiltersStore } from '../../store/useFiltersStore'
import { useMapStore } from '../../store/useMapStore'
import { DependencyPanel } from '../dependency-panel/DependencyPanel'

export const FilterControls = ({
  isError,
}: {
  isError: boolean
}) => {
  const { allUses, allCategories } = useSystemsDerivedData()
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
  const sectionClassName =
    'mt-4 flex h-18 min-w-56 flex-col justify-between gap-2 max-[65rem]:h-auto max-[65rem]:w-full [&_h2]:overflow-hidden [&_h2]:text-ellipsis [&_h2]:whitespace-nowrap'
  const selectClassName = 'max-w-64 max-[65rem]:max-w-full'

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
      label: 'Colour Code',
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

  useEffect(() => setHasFilters(), [setHasFilters])

  return (
    <Flex vertical style={{ width: '100%' }}>
      <div className="w-80 [&_h2]:mb-4">
        <h2>Mode</h2>
        <Radio
          onChange={(e) => setMapMode(e.target.value as MapMode)}
          options={modeItems}
          value={mapMode}
          disabled={isError}
        />
      </div>
      <Flex gap="2rem">
        <div className={sectionClassName}>
          <h2>Layout</h2>
          <Radio
            onChange={(e) => setLayoutMode(e.target.value as LayoutMode)}
            options={layoutItems}
            value={layoutMode}
            disabled={isError}
          />
        </div>
        {mapMode === MapMode.ColourCode && (
          <>
            <div className={sectionClassName}>
              <h2 id="data-use-label">Data use</h2>
              <Select
                className={selectClassName}
                value={selectedUses}
                disabled={isError}
                onChange={(event) => {
                  clearSelection()
                  setSelectedUses(event as string[])
                  setHasFilters()
                }}
                options={dataUseOptions}
              />
            </div>

            <div className={sectionClassName}>
              <h2 id="data-category-label">Data category</h2>
              <Select
                value={selectedCategories}
                className={selectClassName}
                disabled={isError}
                onChange={(event) => {
                  clearSelection()
                  setSelectedCategories(typeof event === 'string' ? [] : event)
                  setHasFilters()
                }}
                options={categoryOptions}
              />
            </div>

            {activeSystem && mapMode && (
              <div className="self-end justify-items-end">
                <DependencyPanel
                  dependencies={dependencies}
                  onDependencyClick={handleDependencyClick}
                />
              </div>
            )}
          </>
        )}
      </Flex>
    </Flex>
  )
}
