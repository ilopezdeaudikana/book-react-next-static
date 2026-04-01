import type { RefObject } from 'react'
import { useEffect, useMemo } from 'react'
import styles from './MapSection.module.css'
import { GroupColumn } from './GroupColumn'
import { useFilters } from '../../hooks/useFilters'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useFiltersStore } from '../../store/useFiltersStore'
import { getDependencies } from '../../utils/getDependencies'
import { getMapSelectionState } from '../../utils/getMapSelectionState'
import { DataStatus, type SystemWithMeta } from '../../types/types'
import { ErrorMessage } from '../error/error-message'
import { useMapStore } from '../../store/useMapStore'

type MapSectionProps = {
  containerRef: RefObject<HTMLDivElement | null>
}

export const MapSection = ({
  containerRef
}: MapSectionProps) => {

  const layoutMode = useFiltersStore(state => state.layoutMode)
  const selectedUses = useFiltersStore(state => state.selectedUses)
  const selectedCategories = useFiltersStore(state => state.selectedCategories)

  const activeSystem = useMapStore(state => state.activeSystem)
  const dependencies = useMapStore(state => state.dependencies)
  const setDependencies = useMapStore(state => state.setDependencies)
  const setHighlightedKeys = useMapStore(state => state.setHighlightedKeys)
  const setConnectedKeys = useMapStore(state => state.setConnectedKeys)

  const setFilteredFidesKeys = useMapStore(state => state.setFilteredFidesKeys)
  const { systemsMap, allUses, status } = useSystemsData()
  const { filteredFidesKeys, groups, groupOrder } = useFilters(
    systemsMap,
    allUses,
    selectedUses,
    selectedCategories,
    layoutMode
  )

  const { connectedKeys, selectionKeys } = getMapSelectionState(activeSystem, systemsMap)

  const activeDependencies = getDependencies(activeSystem, systemsMap)

  useEffect(() => {
    const sameLength = activeDependencies.length === dependencies.length
    const sameKeys =
      sameLength &&
      activeDependencies.every((dep, index) => dep.fidesKey === dependencies[index]?.fidesKey)
    if (!sameKeys) {
      setDependencies(activeDependencies)
    }
  }, [activeDependencies, dependencies, setDependencies])

  useEffect(() => {
    setConnectedKeys(connectedKeys)
    setFilteredFidesKeys(filteredFidesKeys)
    setHighlightedKeys(activeSystem ? selectionKeys : filteredFidesKeys)
  }, [connectedKeys, activeSystem])

  const getSystems = (groupKey: string) => groups.get(groupKey) ?? []

  const groupedSystems = useMemo(() => {
    return groupOrder.reduce<Record<string, SystemWithMeta[]>>((acc, key) => {
      acc[key] = getSystems(key)
      return acc
    }, {})
  }, [groupOrder])


  return (
    <>
      {status === DataStatus.Loading && <div>Loading...</div>}
      {status === DataStatus.Error && <ErrorMessage />}
      {status !== DataStatus.Error && status !== DataStatus.Loading &&
        <section className={styles.map} ref={containerRef}>
          {groupOrder.map((groupKey) => {
            return <GroupColumn key={groupKey} groupKey={groupKey} systems={groupedSystems[groupKey]} />
          })}
        </section>
      }
    </>
  )
}
