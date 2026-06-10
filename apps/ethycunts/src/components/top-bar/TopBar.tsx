import { useState } from 'react'
import { MobileToggles } from './MobileToggles'
import { FilterControls } from './FilterControls'

export const TopBar = ({ isMobile }: { isMobile: boolean }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const showFilters = !isMobile || filtersOpen

  return (
    <header className="sticky top-0 z-[3] flex flex-col w-full items-start border-b border-stone-200 bg-stone-50 p-4 shadow-md max-[65rem]:static max-[65rem]:items-stretch">
      {isMobile && <MobileToggles
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
      />}

      <div
        className={showFilters ? 'flex flex-1' : 'hidden'}
      >
        <FilterControls />
      </div>

    </header>
  )
}
