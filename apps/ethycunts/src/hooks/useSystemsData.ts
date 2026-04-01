import { useEffect } from 'react'
import { useDataStore } from '../store/useDataStore'
import { DataStatus } from '../types/types'

export const useSystemsData = () => {
  const systems = useDataStore((state) => state.systems)
  const systemsMap= useDataStore((state) => state.systemsMap)
  const allUses = useDataStore((state) => state.allUses)
  const allCategories = useDataStore((state) => state.allCategories)
  const status = useDataStore((state) => state.status)
  const load = useDataStore((state) => state.load)

  useEffect(() => {
    if (status === DataStatus.Idle) {
      load()
    }
  }, [status, load])

  return { systems, systemsMap, allUses, allCategories, status }
}
