import type { SystemDefinition } from '../types/types'

export const dedupeSystems = (systems: SystemDefinition[]): SystemDefinition[] =>
  Array.from(
    new Map(systems.map((system) => [system.fidesKey, system]))
      .values()
  )