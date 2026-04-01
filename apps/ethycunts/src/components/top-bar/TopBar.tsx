import { useEffect, useState } from 'react'
import { MobileToggles } from './MobileToggles'
import styles from './TopBar.module.css'
import filterStyles from './FilterControls.module.css'
import { FilterControls } from './FilterControls'
import { DependencyPanel } from '../dependency-panel/DependencyPanel'
import { useMapStore } from '../../store/useMapStore'

export const TopBar = () => {
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [depsOpen, setDepsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const activeSystem = useMapStore((state) => state.activeSystem)
  const dependencies = useMapStore((state) => state.dependencies)
  const clearSelection = useMapStore((state) => state.clearSelection)
  const cardRefs = useMapStore(state => state.cardRefs)

  const handleDependencyClick = (key: string) => {
    const node = cardRefs.get(key)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  
  useEffect(() => {
    const media = window.matchMedia('(max-width: 65rem)')
    const apply = () => setIsMobile(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setFiltersOpen(true)
      setDepsOpen(activeSystem != null && dependencies.length > 0)
    } else {
      setFiltersOpen(false)
      setDepsOpen(false)
    }
  }, [isMobile, activeSystem, dependencies.length])

  return (
    <header className={styles.topBar}>
      <MobileToggles
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
        onToggleDependencies={() => setDepsOpen((prev) => !prev)}
        dependenciesDisabled={!activeSystem || dependencies.length === 0}
        onClearSelection={clearSelection}
      />

      <div
        className={`${styles.filtersSlot} ${filterStyles.filters} ${
          (!isMobile || filtersOpen) ? filterStyles.filtersOpen : filterStyles.filtersClosed
        }`}
      >
        <FilterControls />
      </div>

      {activeSystem && (
        <div
          className={`${styles.depsPanel} ${!isMobile || depsOpen ? styles.depsOpen : styles.depsClosed}`}
        >
          <DependencyPanel dependencies={dependencies} onDependencyClick={handleDependencyClick} />
        </div>
      )}
    </header>
  )
}
