import { useState, useMemo, useEffect, useRef } from 'react'
import type { SystemDefinition } from '../../types/types'
import type { InternalGraphData } from '../../types/d3-types'
import { Button } from '@repo/ui'
import { GROUP_COLORS } from '../../utils/colors'

interface SidePanelProps {
  systems: SystemDefinition[]
  graphData: InternalGraphData
  selectedNodeId: string | null
  onSelectNode: (id: string | null) => void
}

function colorForGroup(group: string): string {
  return GROUP_COLORS[group.toLowerCase()] ?? '#64748b'
}

export function SidePanel({
  systems,
  graphData,
  selectedNodeId,
  onSelectNode,
}: SidePanelProps) {
  const [search, _] = useState('')
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const selectedSystem = useMemo(
    () => systems.find((s) => selectedNodeId?.includes(s.fidesKey)) ?? null,
    [systems, selectedNodeId],
  )

  const filteredNodes = useMemo(() => {
    if (!search) return graphData.nodes
    const lower = search.toLowerCase()
    return graphData.nodes.filter(
      (n) =>
        n.label.toLowerCase().includes(lower) ||
        n.group.toLowerCase().includes(lower),
    )
  }, [graphData.nodes, search])

  const groupedNodes = useMemo(() => {
    const groups: Record<string, typeof filteredNodes> = {}
    filteredNodes.forEach((node) => {
      const g = node.group
      if (!groups[g]) groups[g] = []
      groups[g].push(node)
    })
    return groups
  }, [filteredNodes])

  useEffect(() => {
    if (selectedNodeId) {
      const el = itemRefs.current.get(selectedNodeId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedNodeId])

  return (
    <div className="flex flex-col h-full w-full overflow-auto">
        <div className="p-4 flex flex-col gap-6">
          {/* Detail panel */}
          {selectedSystem && (
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
                  <h2 className="mt-2 text-lg font-bold">
                    {selectedSystem.name}
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {selectedSystem.fidesKey}
                  </p>
                </div>
                <Button
                  onClick={() => onSelectNode(null)}
                >
                  X
                </Button>
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
                      const depNode = graphData.nodes.find(
                        (n) => n.id === depKey,
                      )
                      if (!depNode) return null
                      return (
                        <button
                          key={depKey}
                          onClick={() => onSelectNode(depKey)}
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

          {/* Full scrollable list */}
          {!selectedSystem && (<div>
            <h3 className="text-sm font-semibold text-foreground/80 flex items-center justify-between">
              <span>{selectedNodeId ? 'All Systems' : 'System Inventory'}</span>
              <span className="text-[10px]">
                {filteredNodes.length}
              </span>
            </h3>

            <div className="space-y-6 mt-4">
              {Object.entries(groupedNodes).map(([group, nodes]) => (
                <div key={group}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2 py-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colorForGroup(group) }}
                    />
                    {group.replace(/_/g, ' ')}
                  </h4>
                  <div className="space-y-1">
                    {nodes.map((node) => (
                      <div
                        key={node.id}
                        ref={(el) => {
                          if (el) itemRefs.current.set(node.id, el)
                          else itemRefs.current.delete(node.id)
                        }}
                        onClick={() => onSelectNode(node.id)}
                        className={`
                          group flex flex-col p-1 rounded-lg cursor-pointer transition-all duration-150 border
                          ${
                            selectedNodeId === node.id
                              ? 'bg-secondary/40 border-border'
                              : 'bg-transparent border-transparent hover:bg-secondary/20 hover:border-border/50'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="ml-2 font-medium text-sm text-foreground/90 group-hover:opacity-80 transition-colors">
                            {node.label}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {node.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredNodes.length === 0 && (
                <div className="text-center py-12 px-4 border border-dashed border-border rounded-lg bg-background/30">
                  <p className="text-sm text-muted-foreground">
                    No systems match your filter.
                  </p>
                </div>
              )}
            </div>
          </div>)}
        </div>
    </div>
  )
}
