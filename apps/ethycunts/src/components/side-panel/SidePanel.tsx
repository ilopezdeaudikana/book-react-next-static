import { useState, useMemo, useEffect, useRef } from 'react'
import type { InternalGraphData } from '../../types/d3-types'
import { Input } from '@repo/ui'
import { colorForGroup } from '../../utils/colors'
import { DetailsPanel } from './DetailsPanel'
import { useMapStore } from '../../store/useMapStore'

interface SidePanelProps {
  graphData: InternalGraphData
}

export const SidePanel = ({ graphData }: SidePanelProps) => {
  const [search, setSearch] = useState('')
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const activeSystem = useMapStore((state) => state.activeSystem)
  const selectSystem = useMapStore((state) => state.selectSystem)

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
    if (activeSystem) {
      const el = itemRefs.current.get(activeSystem)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeSystem])


  return (
    <div className="flex flex-col h-full w-full overflow-auto">
      <div className="p-4 flex flex-col gap-6">
        <DetailsPanel nodes={graphData.nodes} onClosePanel={(isOpen: boolean) => setIsDetailOpen(isOpen)}/>
        {/* Full scrollable list */}
        {!isDetailOpen && (
          <div>
            <Input value={search} onChange={(e) => setSearch(e.target.value)}/>
            <h3 className="mt-4 text-sm font-semibold text-foreground/80 flex items-center justify-between">
              <span>{activeSystem ? 'All Systems' : 'System Inventory'}</span>
              <span className="text-[10px]">{filteredNodes.length}</span>
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
                        onClick={() => selectSystem(node.id)}
                        className={`
                          group flex flex-col p-1 rounded-lg cursor-pointer transition-all duration-150 border
                          ${
                            activeSystem === node.id
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
          </div>
        )}
      </div>
    </div>
  )
}
