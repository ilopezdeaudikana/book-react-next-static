'use client'
import {  Input } from 'antd'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

const { Search } = Input

export const SearchInput = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    // This updates the URL without a full page reload
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <Search
        placeholder='input search text'
        onSearch={onSearch}
        enterButton
      />
    </>
  )
}