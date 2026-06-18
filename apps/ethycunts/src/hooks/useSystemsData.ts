import { useDataStore } from '../store/useDataStore'

export const useSystemsData = () => {
  const systemsMap= useDataStore((state) => state.systemsMap)
  const usedByMap= useDataStore((state) => state.usedByMap)
  const allUses = useDataStore((state) => state.allUses)
  const allCategories = useDataStore((state) => state.allCategories)

  return { systemsMap, allUses, allCategories, usedByMap }
}
