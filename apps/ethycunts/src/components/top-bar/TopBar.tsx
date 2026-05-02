import { useEffect, useState } from 'react'
import { MobileToggles } from './MobileToggles'
import styles from './TopBar.module.css'
import { FilterControls } from './FilterControls'

export const TopBar = ({ isMobile }: { isMobile: boolean }) => {
  const [filtersOpen, setFiltersOpen] = useState(true)

  useEffect(() => {
    if (!isMobile) {
      setFiltersOpen(true)
    } else {
      setFiltersOpen(false)
    }
  }, [isMobile])

  return (
    <header className={styles.topBar}>
      <MobileToggles
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
      />

      <div
        className={`${
          !isMobile || filtersOpen ? styles.filtersOpen : styles.filtersClosed
        }`}
      >
        <FilterControls />
      </div>

    </header>
  )
}
