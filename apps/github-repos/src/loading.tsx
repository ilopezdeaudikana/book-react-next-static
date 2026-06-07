import { TableSkeleton } from '@repo/ui'

export default function Loading() {
  return (
    <div className='flex flex-1'>
      <TableSkeleton rows={5}/>
    </div>
  )
}
