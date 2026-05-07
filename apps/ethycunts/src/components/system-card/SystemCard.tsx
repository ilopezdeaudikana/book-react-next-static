import { useMemo, useState } from 'react'
import type { SystemWithMeta } from '../../types/types'
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
    const classes = [
      'flex h-48 w-72 max-w-full flex-col gap-4 overflow-hidden rounded-[1.125rem] border bg-stone-50 p-[1.125rem] shadow-md transition-[opacity,filter,transform,box-shadow] duration-200 ease-in-out hover:-translate-y-[0.2rem] hover:shadow-md',
    ]

    if (expanded) classes.push('h-auto overflow-visible')
    if (dimmed) classes.push('opacity-35 grayscale-[0.1]')
    if (isFiltered) classes.push('border-blue-600')
    if (isConnected) classes.push('-translate-y-1 border-amber-500')
    if (isActive) classes.push('border-teal-700')

    return classes.filter(Boolean).join(' ').trim()
  }, [expanded, dimmed, isFiltered, isConnected, isActive])

  return (
    <article
      className={cardClassName}
      data-active={isActive}
      ref={(node) => registerRefs(fidesKey, node)}
      onClick={() => selectSystem(fidesKey)}
    >
      <header className="flex flex-col gap-2.5">
        <div>
          <h3 className="mb-0 mt-1 text-base text-stone-950">{name}</h3>
          <p className="mb-0 mt-1.5 text-xs text-stone-400">{fidesKey}</p>
        </div>
      </header>
      <p
        className="m-0 line-clamp-2 overflow-hidden text-ellipsis text-xs text-stone-600"
        title={!expanded ? description : undefined}
      >
        {description}
      </p>

      <div className="mt-auto flex flex-col gap-2.5">
        <button
          type="button"
          className="cursor-pointer rounded-2xl border-0 bg-stone-300 px-3 py-2 text-xs font-semibold text-gray-700 opacity-90"
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
