import { Flex, TableSkeleton } from '@repo/ui'

export default async function Loading() {

  return (
    <Flex gap="2rem" vertical>
      <TableSkeleton />
    </Flex>
  )
}
