import { useMemo, useState } from 'react'
import type { SystemWithMeta } from '../../types/types'
import styles from './SystemCard.module.css'
import { SystemCardDetails } from './SystemCardDetails'
import { useMapStore } from '../../store/useMapStore'
import { useFiltersStore } from '../../store/useFiltersStore'

export type SystemCardProps = {
  system: SystemWithMeta 
}

export const SystemCard = ({ system}: SystemCardProps) => {
  const activeSystem = useMapStore(state => state.activeSystem)
  const highlightedKeys = useMapStore(state => state.highlightedKeys)
  const connectedKeys = useMapStore(state => state.connectedKeys)
  const filteredFidesKeys = useMapStore(state => state.filteredFidesKeys)
  const selectSystem = useMapStore(state => state.selectSystem)
  const registerCardRef = useMapStore(state => state.registerCardRef)

  const hasFilters = useFiltersStore(state => state.hasFilters)

  const { resetFilters } = useFiltersStore()

  const [expanded, setExpanded] = useState(false)

  const { fidesKey, description, name } = system

  const isActive = activeSystem === fidesKey
  const isConnected = connectedKeys.has(fidesKey)
  const dimmed = highlightedKeys.size > 0 && !highlightedKeys.has(fidesKey)
  const isFiltered = hasFilters && filteredFidesKeys.has(fidesKey)

  const handleSelectSystem = (key: string) => {
    const isActive = activeSystem === key
    if (!isActive && hasFilters && !filteredFidesKeys.has(key)) {
      resetFilters()
    }
    selectSystem(key)
  }

  const registerRefs = (fidesKey: string, node: HTMLElement | null) => {
    registerCardRef(fidesKey, node)
  }

  const cardClassName = useMemo(() => {
    const classes = [styles.systemCard]

    if (expanded) classes.push(styles.expanded)
    if (dimmed) classes.push(styles.dimmed)
    if (isFiltered) classes.push(styles.filtered)
    if (isConnected) classes.push(styles.connected)
    if (isActive) classes.push(styles.active)

    return classes.filter(Boolean).join(' ').trim()
  }, [expanded, dimmed, isFiltered, isConnected, isActive])

  return (
    <article
      className={cardClassName}
      data-active={isActive}
      ref={(node) => registerRefs(fidesKey, node)}
      onClick={() => selectSystem(fidesKey)}
    >
      <header className={styles.header}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.systemKey}>{fidesKey}</p>
        </div>
      </header>
      <p className={styles.description} title={!expanded ? description : undefined}>
        {description}
      </p>

      <div className={styles.drawer}>
        <button
          type="button"
          className={styles.drawerToggle}
          onClick={(event) => {
            event.stopPropagation()
            if (!isActive) {
              handleSelectSystem(fidesKey)
              return
            }
            setExpanded((prev) => !prev)
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      {expanded && <SystemCardDetails uses={system.uses} categories={system.categories} systemDependencies={system.systemDependencies} />}
    </article>
  )
}
