import { LayoutMode } from '../../types/types'
import type { SystemWithMeta } from '../../types/types'
import { titleCase, refineTitles } from '../../utils/strings'
import { SystemCard } from '../system-card/SystemCard'
import { useFiltersStore } from '../../store/useFiltersStore'

type GroupColumnProps = {
  groupKey: string
  systems: SystemWithMeta[]
}

export const GroupColumn = ({ groupKey, systems }: GroupColumnProps) => {
  const layoutMode = useFiltersStore((state) => state.layoutMode)

  return (
    <div className="relative z-[1] flex flex-col gap-4">
      <div className="flex items-center px-2">
        <h2>{layoutMode === LayoutMode.SystemType ? groupKey : titleCase(refineTitles(groupKey))}</h2>
      </div>
      <div className="flex flex-col gap-[1.125rem]">
        {systems.map(system => (
          <SystemCard key={`${system.fidesKey}-${groupKey}`} system={system} />
        ))}
      </div>
    </div>
  )
}
