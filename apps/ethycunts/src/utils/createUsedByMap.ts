import type { SystemDefinition } from '../types/types'

export const createUsedByMap = (allNodes: SystemDefinition[]): Map<string, string[]> => {
  const usedByMap = new Map<string, string[]>()

  allNodes.forEach(node => {
    const currentKey = node.fidesKey

    node.systemDependencies?.forEach((depKey: string) => {
      if (!usedByMap.has(depKey)) {
        usedByMap.set(depKey, [])
      }
      usedByMap.get(depKey)!.push(currentKey)
    })
  })

  return usedByMap
}