import { TableSkeleton } from '@repo/ui'

export default async function Loading() {
  return (
    <div className='flex flex-1 m-4'>
      <TableSkeleton />
    </div>
  )
}
