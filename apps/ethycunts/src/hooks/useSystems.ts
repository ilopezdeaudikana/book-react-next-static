import { useQuery } from '@tanstack/react-query'
import { SystemsService } from '../services/systems.service'
import { dedupeSystems } from '../utils/dedupeSystems'

export const useSystems = () => {

  const { data: systems, isPending, isError } = useQuery({
    queryKey: ['systems'],
    queryFn: SystemsService.fetchSystems,
    select: (data) => dedupeSystems(data)
  })

  return { systems, isPending, isError }
}
