import type { SystemDefinition, SystemWithMeta } from '../types/types'
import { leafCategory } from './strings'

export const addCategoriesAndUses = (systems: SystemDefinition[]) => {
  const systemsWithMeta: SystemWithMeta[] = systems.map((system) => {
    const categories = Array.from(
      new Set(
        system.privacyDeclarations.flatMap((declaration) =>
          declaration.dataCategories.map((category) => leafCategory(category))
        ),
      ),
    ).sort((a, b) => a.localeCompare(b))

    const uses = Array.from(
      new Set(system.privacyDeclarations.map((declaration) => declaration.dataUse)),
    ).sort((a, b) => a.localeCompare(b))

    return { ...system, categories, uses }
  })

  const allUses = Array.from(new Set(systemsWithMeta.flatMap((system) => system.uses))).sort(
    (a, b) => a.localeCompare(b),
  )

  const allCategories = Array.from(
    new Set(systemsWithMeta.flatMap((system) => system.categories)),
  ).sort((a, b) => a.localeCompare(b))

  return { systemsWithMeta, allUses, allCategories }
}