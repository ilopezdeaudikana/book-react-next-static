import type { SystemWithMeta } from '../types/types'

export const getDependencies = (
  activeSystem: string | null,
  systemsMap: Map<string, SystemWithMeta>,
) => {
  if (!activeSystem) return []
  const active = systemsMap.get(activeSystem)
  if (!active) return []
  return active.systemDependencies.map((key) => ({
    fidesKey: key,
    name: systemsMap.get(key)?.name ?? key,
  }))
}
