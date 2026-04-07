'use client'
import { Input } from '@repo/ui'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ComponentProps } from 'react'

interface SearchInputProps extends ComponentProps<typeof Input> {
  style?: React.CSSProperties
  value: string
}
export const SearchInput = ({ style, value, ...props }: SearchInputProps) => {

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
      <Input
        type='search'
        placeholder='input search text'
        onSearch={onSearch}
        style={style}
        value={value}
        {...props}
      />
    </>
  )
}