import type { InternalEdge, InternalGraphData, InternalNode } from '../types/d3-types'
import type { SystemDefinition } from '../types/types'

export function systemsToGraph(systems: SystemDefinition[]): InternalGraphData {
  const keySet = new Set(systems.map((s) => s.fidesKey))

  const nodes: InternalNode[] = systems.map((s) => ({
    id: s.fidesKey,
    label: s.name,
    group: s.systemType,
    // Size proportional to number of privacy declarations
    size: 10 + s.privacyDeclarations.length * 4,
  }))

  const edges: InternalEdge[] = []
  const seen = new Set<string>()

  for (const s of systems) {
    for (const dep of s.systemDependencies) {
      if (!keySet.has(dep)) continue
      const edgeKey = [s.fidesKey, dep].sort().join("--")
      if (seen.has(edgeKey)) continue
      seen.add(edgeKey)
      edges.push({ source: s.fidesKey, target: dep, weight: 1 })
    }
  }

  return { nodes, edges }
}