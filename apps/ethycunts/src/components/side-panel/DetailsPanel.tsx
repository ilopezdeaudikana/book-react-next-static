import { Button } from '@repo/ui'
import { colorForGroup } from '../../utils/colors'
import type { InternalGraphData } from '../../types/d3-types'
import { useMapStore } from '../../store/useMapStore'
import { useDataStore } from '../../store/useDataStore'
import { useState, useEffect } from 'react'

interface DetailsPanelProps {
  nodes: InternalGraphData['nodes']
  onClosePanel: (isOpen: boolean) => void
}

export const DetailsPanel = ({ nodes, onClosePanel }: DetailsPanelProps) => {
  const activeSystem = useMapStore((state) => state.activeSystem)
  const selectSystem = useMapStore((state) => state.selectSystem)
  const systemsMap = useDataStore((state) => state.systemsMap)

  const [isOpen, setIsOpen] = useState(true)

  const mapKeys = Array.from(systemsMap.keys())

  const normalizedKey = mapKeys.find((key) => activeSystem?.includes(key))

  const selectedSystem = systemsMap.get(normalizedKey ?? '')

  const closePanel = () => {
    setIsOpen(false)
    onClosePanel(false)
  }

  useEffect(() => {
    if (!isOpen && activeSystem) {
      setIsOpen(true)
    }
    onClosePanel(!!activeSystem)
  }, [activeSystem])

  return (
    <>
      {selectedSystem && isOpen && (
        <div className="bg-gray-200/50 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-2">
              <span
                className="uppercase text-[10px] font-semibold"
                style={{
                  backgroundColor: `${colorForGroup(selectedSystem.systemType)}20`,
                  color: colorForGroup(selectedSystem.systemType),
                }}
              >
                {selectedSystem.systemType.replace(/_/g, ' ')}
              </span>
              <h2 className="mt-2 text-lg font-bold">{selectedSystem.name}</h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {selectedSystem.fidesKey}
              </p>
            </div>
            <Button onClick={closePanel}>X</Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {selectedSystem.description}
          </p>

          {/* Privacy Declarations */}
          {selectedSystem.privacyDeclarations.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Privacy Declarations (
                {selectedSystem.privacyDeclarations.length})
              </h4>
              <div className="space-y-3">
                {selectedSystem.privacyDeclarations.map((decl, i) => (
                  <div
                    key={i}
                    className="bg-gray-100/70 rounded-lg p-3 space-y-2 overflow-hidden"
                  >
                    <p className="pb-2 text-xs font-semibold text-foreground">
                      {decl.name}
                    </p>
                    <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
                      <span className="text-muted-foreground font-medium">
                        Data Use
                      </span>
                      <span className="font-mono text-foreground break-all">
                        {decl.dataUse}
                      </span>

                      <span className="text-muted-foreground font-medium">
                        Categories
                      </span>
                      <div className="flex flex-wrap gap-1 min-w-0">
                        {decl.dataCategories.map((cat) => (
                          <span
                            key={cat}
                            className="bg-secondary/60 text-foreground/80 px-1.5 py-0.5 rounded text-[10px] font-mono truncate"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <span className="text-muted-foreground font-medium">
                        Subjects
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {decl.dataSubjects.map((sub) => (
                          <span
                            key={sub}
                            className="bg-secondary/60 text-foreground/80 px-1.5 py-0.5 rounded text-[10px] capitalize"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {selectedSystem.systemDependencies.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Dependencies ({selectedSystem.systemDependencies.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSystem.systemDependencies.map((depKey) => {
                  const depNode = nodes.find((n) => n.id === depKey)
                  if (!depNode) return null
                  return (
                    <button
                      key={depKey}
                      onClick={() => selectSystem(depKey)}
                      className="text-xs bg-gray-50 hover:bg-secondary transition-colors px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: colorForGroup(depNode.group),
                        }}
                      />
                      {depNode.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
