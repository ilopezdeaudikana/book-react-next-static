import { LayoutMode } from '../../types/types'
import type { SystemWithMeta } from '../../types/types'
import { titleCase } from '../../utils/strings'
import { SystemCard } from '../system-card/SystemCard'
import styles from './MapSection.module.css'
import { useFiltersStore } from '../../store/useFiltersStore'

type GroupColumnProps = {
  groupKey: string
  systems: SystemWithMeta[]
}

export const GroupColumn = ({ groupKey, systems }: GroupColumnProps) => {
  const layoutMode = useFiltersStore((state) => state.layoutMode)

  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <h2>{layoutMode === LayoutMode.SystemType ? groupKey : titleCase(groupKey)}</h2>
      </div>
      <div className={styles.groupGrid}>
        {systems.map(system => (
          <SystemCard key={`${system.fidesKey}-${groupKey}`} system={system} />
        ))}
      </div>
    </div>
  )
}
